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
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="type" label="类型" width="120" sortable></el-table-column>
            <el-table-column prop="name" label="名称" width="120" sortable></el-table-column>
            <el-table-column prop="maxMoney" label="达标金额" width="120" sortable></el-table-column>
            <el-table-column prop="preFee" label="减免金额" width="120" sortable></el-table-column>
            <el-table-column prop="num" label="达标数量" width="120" sortable></el-table-column>
            <el-table-column prop="discount" label="优惠折扣" width="120" sortable></el-table-column>
            <el-table-column prop="describeText" label="优惠描述" width="120" sortable></el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="120" sortable></el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="120" sortable></el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="100"
                :formatter="formatStatus"
                sortable
            ></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="editClick(scope.$index, scope.row)">编辑</el-button>
                    <el-button
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
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="20"
                :total="total"
                style="float:right;"
            ></el-pagination>
        </el-col>
        <!--新增、编辑界面-->
        <Dialog :dialogData="dialogData" ref="GoodsDialog" @emitSaveFn="saveFn">
            <ShopsPreferencetialForm slot="dialogContent" :propsData="propsData">我是呵呵</ShopsPreferencetialForm>
        </Dialog>
    </section>
</template>

<script>
// import util from "@/common/js/util.js";
import Api from "@/common/api/api.js";
import ShopsPreferencetialForm from "@/components/form/ShopsPreferencetialForm.vue";
import Dialog from "@/components/dialog/Dialog.vue";
import TableQuery from "@/components/headQuery/TableQuery.vue";
export default {
  components: {
    Dialog,
    ShopsPreferencetialForm,
    TableQuery,
  },
  data() {
    return {
      avatarUrl2: null,
      showCropper: true,
      //查询条件
      queryObj: {
        searchKey: "",
        searchText: "名称查询"
      },
      dialogData: {
        title: "新增优惠", //显示弹框
        half:true,//弹框宽度
      }, //新增优惠
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
        name: null,
        startTime: null,
        endTime: null,
        maxMoney: null,
        preFee: null,
        num: null,
        discount: null,
        type: null,
        describeText: null,
        status: "0",
      }
    };
  },
  methods: {
    //性别显示转换
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
      Api.shopPreferentialList(
        {
          name: this.queryObj.searchKey,
        },
        resp => {
          that.btnLoad = false;
          if (resp.result == 0) {
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
          Api.shopPreferentialDelete(
            [row],
            resp => {
              this.refeshData(resp.body);
              this.$message({
                message: "删除成功",
                type: "success"
              });

              this.listLoading = false;
            },
            () => {
              this.listLoading = false;
            },
            that
          );
        })
        .catch(() => {});
    },
    // 保存方法
    saveFn() {
      this.listLoading = true;
      let propsData = Object.assign({}, this.propsData);
      Api.shopPreferentialEdit(
        propsData,
        resp => {
          if (resp.result == 0) {
            this.refeshData(resp.body);
            this.listLoading = false;
          }
        },
        () => {
          this.btnLoad = false;
          this.listLoading = false;
        },
        this
      );
    },
    //显示编辑界面
    editClick: function(index, row) {
      // 编辑
      this.dialogData.title = "编辑商品";
      this.propsData = Object.assign({}, JSON.parse(JSON.stringify(row)));
      this.$refs.GoodsDialog.show();
    },
    //显示新增界面
    addFn: function() {
      this.dialogData.title = "新增商品";
      this.$refs.GoodsDialog.show();
      this.propsData = Object.assign({}, this.$options.data().propsData); //重置数组
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
          Api.shopPreferentialDelete(
            this.sels,
            resp => {
              this.refeshData(resp.body);
              this.$message({
                message: "删除成功",
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