<template>
<!-- 店铺列表（企业店铺） -->
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
            <el-table-column prop="name" label="名称" width="120" sortable></el-table-column>
            <el-table-column prop="createDate" label="创建日期" width="120" sortable></el-table-column>
            <el-table-column prop="endDate" label="失效日期" width="120" sortable></el-table-column>
            
            <el-table-column prop="address.userName" label="负责人" width="120" sortable></el-table-column>
            <el-table-column prop="address.telNumber" label="负责人电话" width="120" sortable></el-table-column>
            <el-table-column prop="depotAddress.userName" label="仓库联系人" width="120" sortable></el-table-column>
            <el-table-column prop="depotAddress.telNumber" label="仓库电话" width="120" sortable></el-table-column>
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
                    >续费</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量续费</el-button>
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="20"
                :total="total"
                style="float:right;"
            ></el-pagination>
        </el-col>
        <!--新增、编辑界面-->
        <Dialog :dialogData="dialogData" ref="Dialog" @emitSaveFn="saveFn">
            <eidtForm slot="dialogContent" :propsData="propsData">我是呵呵</eidtForm>
        </Dialog>
    </section>
</template>
<script>
import eidtForm from '@/components/form/ShopForm.vue';
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
        searchText:"名称或编号",
        hideAdd:true,//隐藏新增按钮
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
        secret:null,//小程序secret
        name: null,
        createDate:null,
        endDate:null,
        openMoney:20000,//商户新开接入费用
        reNewMoney:10000,//商户每年续费费用
        address:{

        },//商户地址
        depotAddress:{

        },//发货仓库地址
        bonusNum:'0',//新零售层级
        shopBonusList:[{bonusLevel:1,bonusType:1,bonusValue:0},{bonusLevel:2,bonusType:1,bonusValue:0},{bonusLevel:3,bonusType:1,bonusValue:0}],//提成机制
        status: "0",
      },
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
    //查询列表
    queryListFn() {
      let that = this;
      this.listLoading = true;
      Api.shopList(
        {
          name: this.queryObj.searchKey,
        },
        resp => {
          that.btnLoad = false;
          if (resp.result == 0) {
            that.dataList = resp.body;
            that.dataList.map((item)=>{
                if(!item.address){
                    item.address = {};
                }
                if(!item.depotAddress){
                    item.depotAddress = {};
                }
                if(!item.shopBonusList || !item.shopBonusList.length){
                    item.shopBonusList = [{bonusLevel:1,bonusType:1,bonusValue:0},{bonusLevel:2,bonusType:1,bonusValue:0},{bonusLevel:3,bonusType:1,bonusValue:0}];
                }
            });
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
          Api.goodsTypeDelete(
            [row],
            (resp)=> {
              this.dataList = resp.body;
              this.$message({
                message: "删除成功",
                type: "success"
              });

              this.listLoading = false;
            },()=>{
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
      Api.shopEdit(
        propsData,
        resp => {
          if (resp.result == 0) {
            this.dataList = resp.body;
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
      debugger;
      // 编辑
      this.dialogData.title="编辑商品类型";
      this.propsData = Object.assign({}, row);
      this.$refs.Dialog.show();
    },
    //显示新增界面
    addFn: function() {
      this.dialogData.title="新增商品类型";
      this.$refs.Dialog.show();
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
          Api.goodsTypeDelete(
            this.sels,
            (resp)=> {
              this.dataList = resp.body;
              this.$message({
                message: "删除成功",
                type: "success"
              });

              this.listLoading = false;
            },()=>{
              this.listLoading = false;
            },
            this
          );
        })
        .catch(() => {});
    }
  },
};
</script>