<template>
	<el-table
		ref="multipleTable"
		:data="tableData3"
		tooltip-effect="dark"
		style="width: 100%"
		@selection-change="selectGoods"
		class="InoutDetailTable"
	>
		<el-table-column type="selection" width="55"></el-table-column>
		<el-table-column prop="no" label="编号" width="120"></el-table-column>
		<el-table-column prop="name" label="名称" width="120"></el-table-column>
		<el-table-column prop="barCode" label="条码" width="120"></el-table-column>
		<el-table-column label="单价" width="120" class-name="noPadingClass">
			<template slot-scope="scope">
				<el-input v-model="scope.row.salePrice" class="offBorder"></el-input>
			</template>
		</el-table-column>
		<el-table-column label="数量" width="120" class-name="noPadingClass">
			<template slot-scope="scope">
				<el-input v-model="scope.row.num" class="offBorder"></el-input>
			</template>
		</el-table-column>
		<el-table-column label="小计" width="120" class-name="noPadingClass">
			<template slot-scope="scope">
				<el-input v-model="scope.row.sum" class="offBorder"></el-input>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData3: [
        {
          id: 1,
          eid: 1,
          sid: 1,
          name: "中文",
          no: "1",
          barCode: "1",
          type: 2,
          son_type: 1,
          unit: "瓶",
          spec: "10ml",
          num: 20.0,
          buyingPrice: 200.0,
          costPrice: 300.0,
          salePrice: 500.0,
          goodsCompanyId: null,
          goodsCompany: null,
          supplierId: null,
          supplier: null,
          status: "2"
        },
        {
          id: 2,
          eid: 1,
          sid: 1,
          name: "中文2",
          no: "2",
          barCode: "2",
          type: 2,
          son_type: null,
          unit: "包",
          spec: "50ml",
          num: 20.0,
          buyingPrice: 200.0,
          costPrice: 300.0,
          salePrice: 500.0,
          goodsCompanyId: null,
          goodsCompany: null,
          supplierId: null,
          supplier: null,
          status: "2"
        },
        {
          id: 3,
          eid: 1,
          sid: 1,
          name: "产品1",
          no: "2234",
          barCode: "2234",
          type: 2,
          son_type: null,
          unit: "双",
          spec: "50",
          num: 20.0,
          buyingPrice: 200.0,
          costPrice: 300.0,
          salePrice: 500.0,
          goodsCompanyId: 11,
          goodsCompany: null,
          supplierId: 11,
          supplier: null,
          status: "0"
        },
        {
          id: 5,
          eid: 1,
          sid: 1,
          name: "产品2",
          no: "2235",
          barCode: "2235",
          type: 2,
          son_type: null,
          unit: "双",
          spec: "50",
          num: 40.0,
          buyingPrice: 200.0,
          costPrice: 300.0,
          salePrice: 500.0,
          goodsCompanyId: 11,
          goodsCompany: null,
          supplierId: 11,
          supplier: null,
          status: "0"
        },
        {
          id: 6,
          eid: 1,
          sid: 1,
          name: "产品3",
          no: "2236",
          barCode: "2236",
          type: 2,
          son_type: null,
          unit: "双",
          spec: "50",
          num: 50.0,
          buyingPrice: 200.0,
          costPrice: 300.0,
          salePrice: 500.0,
          goodsCompanyId: 11,
          goodsCompany: null,
          supplierId: 11,
          supplier: null,
          status: "0"
        }
      ],
      InoutDetailList: [],//出入库明细
    };
  },
  methods: {
    selectGoods: function(arr) {debugger
			//选择商品
			this.InoutDetailList = arr;
			
		},
		getTableDataFn:function(){
			// 将商品明细传出
			return this.InoutDetailList;
		}
  }
};
</script>
<style lang="less">
.InoutDetailTable {
  .noPadingClass {
    // padding-top: 0;
    // padding-bottom: 0;
    .offBorder input {
      border: none;
      border-radius: 0;
      background: yellow;
    }
  }
  table {
    td,
    th {
      padding: 0px;
      font-size: 12px;
      div.cell {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .tableBtn {
          padding: 0px 10px !important;
        }
      }
    }
    th {
      text-align: center;
    }
  }
}
</style>



