<template>
  <!-- 订单列表 -->
  <section>
    <!--工具条-->
    <TableQuery :queryObj="queryObj" @queryListFn="queryListFn"></TableQuery>
    <!--列表-->
    <el-table :data="dataList" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <el-table-column prop="id" label="订单号" width="120" sortable></el-table-column>
      <el-table-column label="商品名称" width="150">
        <template
          scope="scope"
        >{{scope.row.goodsList[0].name +(scope.row.goodsList.length>1?"等":"")}}</template>
      </el-table-column>
      <el-table-column label="总计数量" width="150" :formatter="formatNum"></el-table-column>
      <el-table-column prop="memberAddress.userName" label="购买人名称" width="120" sortable></el-table-column>
      <el-table-column prop="memberAddress.telNumber" label="购买人手机" width="120" sortable></el-table-column>
      <el-table-column prop="totalMoney" label="订单金额" width="120" sortable></el-table-column>
      <el-table-column prop="realFee" label="支付金额" width="120" sortable></el-table-column>
      <el-table-column prop="flowNo" label="物流单号" width="150" sortable></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160" sortable :formatter="formatDate"></el-table-column>
      <el-table-column prop="status" label="状态" width="100" :formatter="formatStatus" sortable></el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button
            size="small"
            @click="showSendGoods(scope.$index, scope.row)"
            v-if="scope.row.status == '2'"
          >发货</el-button>
          <el-button size="small" @click="showDetail(scope.$index, scope.row)">订单明细</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum"
        :page-size="20"
        layout="total, prev, pager, next"
        style="float:right;"
        :total="total"
      ></el-pagination>
    </el-col>

    <!-- 发货界面 -->
    <el-dialog
      :title="dialogData.title"
      :visible.sync="dialogData.showDialogData"
      width="30%"
      :close-on-click-modal="false"
    >
      <div class="sendDialog">
        <!-- 是否需要发货 -->
        <div class="sendGoodsType">
          <el-radio-group v-model="sendGoodsType" size="small">
            <el-radio-button label="0">需要物流发货</el-radio-button>
            <el-radio-button label="1">不要物流发货</el-radio-button>
          </el-radio-group>
        </div>
        <SCInput
          class="flowNoDiv"
          v-model.number="order.flowNo"
          v-if="sendGoodsType == 0"
          placeholder="请输入快递/物流单号"
          rules="required posPattern"
          @inputChangeFn="inputChangeFn"
        ></SCInput>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogData.showDialogData = false">取 消</el-button>
        <el-button
          type="primary"
          @click="sendGoods"
          :disabled="sendGoodsType == '0' && !order.flowNo"
        >确 定 发 货</el-button>
      </span>
    </el-dialog>

    <!-- 订单明细界面 -->
    <el-dialog :title="inOutDepotDetail.title" :visible.sync="inOutDepotDetail.show" width="50%">
      <div class="sumLine">
        <div class="labelClass">{{textObj.totalMoney}}</div>
        <div class="valueClass">{{order.totalMoney}}</div>
        <div class="labelClass">{{textObj.realFee}}</div>
        <div class="valueClass">{{order.realFee}}</div>
      </div>
      <el-table :data="inOutDepotDetails" border show-summary style="width: 100%">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="preferencePrice" sortable label="单价"></el-table-column>
        <el-table-column prop="num" sortable label="数量"></el-table-column>
        <el-table-column prop="totalMoney" sortable label="总价"></el-table-column>
      </el-table>
      <div
        class="flowDiv"
        v-if="this.order.status != queryObj.selectList[2].value && this.order.status != queryObj.selectList[1].value"
      >
        <div class="flowTitle">{{textObj.flowTitle}}</div>
        <div class="flowData">
          <div class="flowInfoItem" v-for="(item,key) in flowData" :key="key">
            <div class="flowTime">{{item.time}}</div>
            <div class="flowContext">{{item.context}}</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import eidtForm from "@/components/form/GoodsTypeForm.vue";
import Util from "@/common/js/util.js";
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
        searchText: "输入订单号",
        selectKey: "2", //选择的内容 待发货状态
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
      },
      textObj: {
        totalMoney: "总金额:",
        realFee: "实际支付:",
        flowTitle: "物流信息:"
      },
      inOutDepotDetail: {
        title: "订单明细",
        show: false
      },
      inOutDepotDetails: [], //订单明细列表
      dataList: [], //数据集合
      total: 0, //总共数据
      pageNum: 1, //页
      listLoading: false,
      sels: [], //列表选中列
      SendGoodsIndex: 0,
      sendGoodsType: 0, //0需要发货 需要快递单号,1不需要
      order: {},
      flowData: [],//物流信息
    };
  },

  beforeMount() {
    this.queryListFn();
  },
  methods: {
    //输入框回调事件 输入订单号
    inputChangeFn: function (value) {
      this.order.flowNo = value;
    },
    //状态显示转换
    formatStatus: function (row) {
      return Util.formatStatus(row.status, this.queryObj.selectList);
    },
    /**
     * 日期转化
     */
    formatDate: function (row) {
      return Util.formatDate.format(row.createTime, 'yyyy-MM-dd hh:mm:ss');
    },
    formatNum: function (row) {
      let goodsList = row.goodsList;
      let num = 0;
      goodsList.map(goods => {
        num += goods.num;
      });
      return num;
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.queryListFn();
    },
    //查询商品列表
    queryListFn() {
      let that = this;
      this.listLoading = true;
      Api.orderList(
        {
          pageNum: this.pageNum,
          name: this.queryObj.searchKey,
          id: this.queryObj.searchKey,
          status: this.queryObj.selectKey
        },
        resp => {
          that.btnLoad = false;
          if (resp.result == 0) {
            that.dataList = resp.body;
            that.total = resp.count;
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
    showSendGoods: function (index, row) {
      this.SendGoodsIndex = index;
      this.order = row;
      this.dialogData.title = row.name ? row.name : "" + "订单发货";
      this.dialogData.showDialogData = true;
    },
    /**
     * 发货
     */
    sendGoods: function () {
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
    },
    /**
     * 展示订单明细
     */
    showDetail: function (index, row) {
      this.inOutDepotDetail.show = true;
      this.inOutDepotDetail.title = row.id + "订单明细";
      this.inOutDepotDetails = row.goodsList;
      this.order = row;

      //获取物流信息
      if (this.order.flowNo) {

        Api.getFlowInfo(this.order, res => {
          this.flowData = res.body;
        })
      }
    }
  }
};
</script>
<style lang="less" scoped>
.flowNoDiv {
  margin-top: 10px;
}
.sumLine {
  .labelClass,
  .valueClass {
    display: inline-block;
    min-width: 120px;
    line-height: 30px;
  }
}
.flowDiv {
  .flowData {
    .flowInfoItem {
        height: 30px;
        line-height: 30px;
      .flowTime {
        float: left;
        width: 50%;
      }

      .flowContext {
        float: left;
        width: 50%;
      }
    }
  }
}
</style>
