<template>
  <!-- 商户优惠列表 -->
  <section>
    <!--工具条-->
    <TableQuery :queryObj="queryObj" @queryListFn="queryListFn" @addFn="addFn"></TableQuery>
    <!--列表-->
    <el-table
      :data="dataList"
      highlight-current-row
      v-loading="listLoading"
      @selection-change="selsChange"
      style="width: 100%;"
      
      height="calc(100% - 152px)"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="名称" width="120" sortable></el-table-column>
      <el-table-column prop="mobile" label="手机" width="120" sortable></el-table-column>
      <el-table-column prop="password" label="密码" width="120" sortable></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" sortable :formatter="dateFormat"></el-table-column>
      <el-table-column prop="role" label="角色" width="120" sortable :formatter="formatRole"></el-table-column>
      <el-table-column prop="status" label="状态" width="100" :formatter="formatStatus" sortable></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="editClick(scope.$index, scope.row)">编辑</el-button>
          <el-button
            v-if="isShowDelBtn"
            type="danger"
            size="small"
            @click="delClick(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
    </el-col>
    <!--新增、编辑界面-->
    <Dialog :dialogData="dialogData" ref="AccountDialog" @emitSaveFn="saveFn">
      <AccountForm slot="dialogContent" :accountData="accountData"></AccountForm>
    </Dialog>
  </section>
</template>

<script>
import util from "@/common/js/util.js";
import Api from "@/common/api/api.js";
import AccountForm from "@/components/form/AccountForm.vue";
import Dialog from "@/components/dialog/Dialog.vue";
import TableQuery from "@/components/headQuery/TableQuery.vue";

export default {
  components: {
    Dialog,
    AccountForm,
    TableQuery
  },
  data() {
    return {
      isShowDelBtn: true,
      avatarUrl2: null,
      showCropper: true,
      //查询条件
      queryObj: {
        searchKey: "",
        selectKey: "0",
        searchText: "名称查询",
        showSelect: true,
        selectList: [
          {
            value: "0",
            label: "正常"
          },
          {
            value: "1",
            label: "禁用"
          },
          {
            value: "-1",
            label: "删除"
          }
        ]
      },
      dialogData: {
        title: "新增账号", //显示弹框
        half: true //弹框宽度
      }, //新增优惠
      dataList: [], //数据集合
      listLoading: false,
      sels: [], //列表选中列
      //编辑界面数据
      accountData: {
        id: null,
        eid: null,
        appid: null,
        name: null,
        startTime: null,
        endTime: null,
        totalNum: 0,
        oddNum: 0,
        useType: "0",
        useKey: null,
        maxMoney: null,
        preFee: null,
        num: null,
        discount: null,
        type: null,
        describeText: null,
        status: "0",
        menuStr: [],
        optStr: []
      },
      //操作权限
      optList: [
        { text: "操作门店到期日期等信息", value: "O0" },
        { text: "发货", value: "O0101" },
        { text: "审核提现", value: "O0201" },
        { text: "新增、编辑商品", value: "O0301" },
        { text: "会员编辑推荐人", value: "O0401" },
        { text: "修改商户信息", value: "O0501" },
        { text: "新增、编辑账号权限", value: "O0601" },
        { text: "新增、编辑商品类型权限", value: "O0701" },
        { text: "新增、编辑商户活动权限", value: "O0801" },
        { text: "新增、编辑商户优惠券权限", value: "O0901" }
      ],
      //菜单权限
      menuList: [
        { text: "显示新增商户按钮", value: "M0" },
        { text: "订单发货", value: "M01" },
        { text: "推广提现", value: "M02" },
        { text: "商品管理", value: "M03" },
        { text: "会员列表", value: "M04" },
        { text: "商户列表", value: "M05" },
        { text: "账号列表", value: "M06" },
        { text: "商品类型", value: "M07" },
        { text: "商户活动", value: "M08" },
        { text: "商户优惠券", value: "M09" }
      ]
    };
  },
  methods: {
    //菜单权限转换
    menuPermissions(row) {
      if (!row || !row.menuStr || row.menuStr === "[]") return "---";
      let arr = row.menuStr.split(",");
      let filterArr = [];
      arr.forEach(item => {
        let arr1 = this.menuList.filter(item1 => {
          return item == item1.value;
        });
        if (arr1.length > 0) {
          filterArr.push(arr1[0]);
        }
      });
      if (filterArr.length == 0) {
        return "---";
      }
      let menuStrArr = [];
      filterArr.forEach(item => {
        menuStrArr.push(item.text);
      });
      return menuStrArr.join("、");
    },
    optPermissions(row) {
      if (!row || !row.optStr || row.optStr === "[]") return "---";
      let arr = row.optStr.split(",");
      let filterArr = [];
      arr.forEach(item => {
        let arr1 = this.optList.filter(item1 => {
          return item == item1.value;
        });
        if (arr1.length > 0) {
          filterArr.push(arr1[0]);
        }
      });
      if (filterArr.length == 0) {
        return "---";
      }
      let optStrArr = [];
      filterArr.forEach(item => {
        optStrArr.push(item.text);
      });
      return optStrArr.join("、");
    },
    //table中的时间格式化
    dateFormat(row, column, cellValue, index) {
      const daterc = row[column.property] + "";
      if (!daterc || daterc == null) return;
      const dateMat = new Date(daterc / 1000);
      return util.formatDate.format(dateMat, "yyyy-MM-dd hh:mm:ss");
    },
    //状态显示转换
    formatRole(row) {
      return row.role == 0
        ? "超级管理员"
        : row.role == 1
        ? "管理员"
        : row.role == 2
        ? "操作员"
        : "未知";
    },
    //角色显示转换
    formatStatus(row) {
      return row.status == 0
        ? "正常"
        : row.status == 1
        ? "禁用"
        : row.status == -1
        ? "删除"
        : "未知";
    },
    //查询账号列表
    queryListFn() {
      let that = this;
      this.listLoading = true;
      Api.spaAccountList(
        {
          name: this.queryObj.searchKey,
          status: this.queryObj.selectKey
        },
        resp => {
          that.btnLoad = false;
          if (resp.result == 0) {
            this.queryObj.selectKey == -1
              ? (this.isShowDelBtn = false)
              : (this.isShowDelBtn = true);
            this.refeshData(resp.body);
            that.loading = false;
          }
          this.listLoading = false;
        },
        () => {
          that.btnLoad = false;
          this.listLoading = false;
        },
        that
      );
    },
    //删除
    delClick: function(index, row) {
      let that = this;
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          Api.spaAccountDelete(
            [row],
            resp => {
              this.refeshData(resp.body);
              this.$message({
                message: "删除成功",
                type: "success"
              });

              this.listLoading = false;
              this.queryListFn();
            },
            () => {
              this.listLoading = false;
              this.queryListFn();
            },
            that
          );
        })
        .catch(() => {});
    },
    // 保存方法
    saveFn() {
      this.listLoading = true;
      let accountData = Object.assign({}, this.accountData);
      accountData.optStr = accountData.optStr.join(",");
      accountData.menuStr = accountData.menuStr.join(",");
      Api.spaAccountSave(
        accountData,
        resp => {
          if (resp.result == 0) {
            this.refeshData(resp.body);
            this.listLoading = false;
            this.queryListFn();
          }
        },
        () => {
          this.btnLoad = false;
          this.listLoading = false;
          this.queryListFn();
        },
        this
      );
    },
    //显示编辑界面
    editClick: function(index, row) {
      // 编辑
      this.dialogData.title = "编辑账号";
      this.accountData = Object.assign({}, JSON.parse(JSON.stringify(row)));

      this.accountData.menuStr = this.accountData.menuStr.split(",");
      this.accountData.optStr = this.accountData.optStr.split(",");
      this.$refs.AccountDialog.show();
    },
    //显示新增界面
    addFn: function() {
      this.dialogData.title = "新增账号";
      this.$refs.AccountDialog.show();
      this.accountData = Object.assign({}, this.$options.data().accountData); //重置数组
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    //批量删除
    batchRemove: function() {
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          Api.spaAccountDelete(
            this.sels,
            resp => {
              this.refeshData(resp.body);
              this.$message({
                message: "删除成功",
                type: "success"
              });

              this.listLoading = false;
              this.queryListFn();
            },
            () => {
              this.listLoading = false;
              this.queryListFn();
            },
            this
          );
        })
        .catch(() => {});
    },
    //刷新数据
    refeshData(data) {
      data.map(item => {
        item.goodsImgs = item.goodsImgs || [];
        item.goodsDetailImgs = item.goodsDetailImgs || [];
      });
      this.dataList = data;
      this.$store.commit("updateState", { goodsList: data });
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    }
  },
  mounted() {
    this.queryListFn();
  }
};
</script>