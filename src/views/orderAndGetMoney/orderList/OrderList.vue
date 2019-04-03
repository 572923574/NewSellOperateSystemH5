<template>
    <!-- 订单列表 -->
    <section>
        <!--工具条-->
        <TableQuery :queryObj="queryObj" @queryListFn="queryListFn"></TableQuery>
        <!--列表-->
        <el-table
            :data="dataList"
            highlight-current-row
            v-loading="listLoading"
            style="width: 100%;"
        >
            <el-table-column prop="id" label="订单号" width="120" sortable></el-table-column>
            <el-table-column label="商品名称" width="150">
                <template
                    scope="scope"
                >{{scope.row.goodsList[0].name +(scope.row.goodsList.length>1?"等":"")}}</template>
            </el-table-column>
            <el-table-column label="总计数量" width="150" :formatter="formatNum"></el-table-column>
            <el-table-column prop="name" label="购买人名称" width="120" sortable></el-table-column>
            <el-table-column prop="mobile" label="购买人手机" width="120" sortable></el-table-column>
            <el-table-column prop="totalMoney" label="订单金额" width="120" sortable></el-table-column>
            <el-table-column prop="realFee" label="支付金额" width="120" sortable></el-table-column>
            <el-table-column prop="flowNo" label="物流单号" width="120" sortable></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120" sortable></el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="100"
                :formatter="formatStatus"
                sortable
            ></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="showSendGoods(scope.$index, scope.row)"
                        v-if="scope.row.status == '2'"
                    >发货</el-button>
                    <el-button size="small" @click="delClick(scope.$index, scope.row)">订单明细</el-button>
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
        <!-- 发货界面 -->
        <el-dialog :title="dialogData.title" :visible.sync="dialogData.showDialogData" width="30%">
            <div class="sendDialog">
                <!-- 是否需要发货 -->
                <div class="sendGoodsType">
                    <el-radio-group v-model="sendGoodsType" size="small">
                        <el-radio-button label="0">需要物流发货</el-radio-button>
                        <el-radio-button label="1">不要物流发货</el-radio-button>
                    </el-radio-group>
                </div>
                <el-input
                    class="flowNoDiv"
                    v-model.number="order.flowNo"
                    v-if="sendGoodsType == 0"
                    placeholder="请输入快递/物流单号"
                    autofocus
                ></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogData.showDialogData = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="sendGoods"
                    :disabled="sendGoodsType == '0'&& !order.flowNo"
                >确 定 发 货</el-button>
            </span>
        </el-dialog>
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
        selectKey: "2", //选择的内容
        showSelect: true, //展示选择框
        hideAdd: true, //隐藏新增
        selectList: [
          {
            value: "",
            label: "全部"
          },
          {
            value: "1",
            label: "待支付"
          },
          {
            value: "2",
            label: "待发货"
          },
          {
            value: "3",
            label: "待收货"
          },
          {
            value: "4",
            label: "已完成"
          }
        ] //选择列表
      },
      dialogData: {
        title: "订单发货", //显示弹框
        showDialogData: false
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
      },
      SendGoodsIndex: 0,
      sendGoodsType: 0, //0需要发货 需要快递单号,1不需要
      order: {}
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
    formatNum: function(row) {
      let goodsList = row.goodsList;
      let num = 0;
      goodsList.map(goods => {
        num += goods.num;
      });
      return num;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.queryListFn();
    },
    //查询商品列表
    queryListFn() {
      let that = this;
      this.listLoading = true;
      Api.orderList(
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

    //显示发货界面
    showSendGoods: function(index, row) {
      this.SendGoodsIndex = index;
      this.order = row;
      this.dialogData.title = row.name ? row.name : "" + "订单发货";
      this.dialogData.showDialogData = true;
    },
    /**
     * 发货
     */
    sendGoods: function() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      Api.sendGoods(this.order, res => {
        this.dataList[this.SendGoodsIndex].flowNo = this.order.flowNo;
        this.dataList[this.SendGoodsIndex].status = "3";
        loading.close();
        this.dialogData.showDialogData = false;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.flowNoDiv {
  margin-top: 10px;
}
</style>
