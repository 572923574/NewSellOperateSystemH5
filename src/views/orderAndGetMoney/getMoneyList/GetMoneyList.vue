<template>
  <!-- 推广人员提现列表 -->
  <section>
    <!--工具条-->
    <TableQuery :queryObj="queryObj" @queryListFn="queryListFn"></TableQuery>
    <!--列表-->
    <el-table :data="dataList" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="name" label="名称" width="120" sortable></el-table-column>
      <el-table-column prop="mobile" label="手机" width="120" sortable></el-table-column>
      <el-table-column prop="getMoney" label="提现金额" width="120" sortable></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120" sortable></el-table-column>
      <el-table-column prop="status" label="状态" width="100" :formatter="formatStatus" sortable></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" v-if="scope.row.status == 0" @click="editClick(scope.$index, scope.row)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="20"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>
    <!--新增、编辑界面-->
    <!-- <Dialog :dialogData="dialogData" ref="Dialog" @emitSaveFn="saveFn">
            <eidtForm slot="dialogContent" :propsData="propsData">我是呵呵</eidtForm>
    </Dialog>-->
  </section>
</template>
<script>
import eidtForm from "@/components/form/GoodsTypeForm.vue";
// import util from "@/common/js/util.js";
import Api from "@/common/api/api.js";
import Dialog from "@/components/dialog/Dialog.vue";
import TableQuery from "@/components/headQuery/TableQuery.vue";
export default {
  components: {
    Dialog,
    eidtForm,
    TableQuery
  },
  data() {
    return {
      //查询条件
      queryObj: {
        searchKey: "",
        searchText: "名称或编号",
        selectKey: "0", //选择的内容
        showSelect: true, //展示选择框
        hideAdd: true, //隐藏新增
        selectList: [
          {
            value: "0",
            label: "待审核"
          },
          {
            value: "1",
            label: "已审核"
          },
          {
            value: "2",
            label: "已完成"
          }
        ] //选择列表
      },
      dialogData: {
        title: "新增商品类型" //显示弹框
      }, //新增商品
      dataList: [], //数据集合
      total: 0, //总共数据
      page: 1, //页
      listLoading: false,
      sels: [], //列表选中列
      //编辑界面数据
      propsData: {
        id: null,
        eid: null,
        appid: null,
        typeName: null,
        typeNo: null,
        status: "0"
      }
    };
  },

  beforeMount() {
    this.queryListFn();
  },
  methods: {
    //状态显示转换
    formatStatus: function(row) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    handleCurrentChange(val) {
      this.page = val;
      this.queryListFn();
    },
    //查询商品列表
    queryListFn() {
      let that = this;
      this.listLoading = true;
      Api.getMoneyList(
        {
          pageNum: this.page,
          name: this.queryObj.searchKey,
          mobile: this.queryObj.searchKey,
          status: this.queryObj.selectKey
        },
        resp => {
          that.btnLoad = false;
          if (resp.result == 0) {
            that.dataList = resp.body;
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
    /**
     * 审核提现订单
     */
    editClick: function(index, row) {
      let that = this;
      this.propsData = Object.assign({}, row);
      this.$confirm("确认提现,并已转账？", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          Api.passGetMoney(
            this.propsData,
            resp => {
              that.dataList = resp.body;
              this.$message({
                message: "审核成功",
                type: "success"
              });

              this.listLoading = false;
            },
            () => {
              this.listLoading = false;
            },
            this
          );
        })
        .catch(() => {});
    }
  }
};
</script>
