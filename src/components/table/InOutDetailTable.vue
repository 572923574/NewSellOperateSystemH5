<template>
	<el-table
		ref="multipleTable"
		:data="goodsList"
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
				<el-input v-model="scope.row.num" class="offBorder"  @change="getSumFn"></el-input>
			</template>
		</el-table-column>
	</el-table>
</template>
<script>
import Api from '@/common/api/api.js';
export default {
  data() {
    return {
      goodsList: [
      ],
      InoutDetailList: [],//出入库明细
    };
	},
	beforeMount(){
		let that = this;
		Api.goodsList({},function(data){
				that.goodsList = data.body;
		},null,that,true);
	},
  methods: {
    selectGoods: function(arr) {
			//选择商品
			this.InoutDetailList = arr;
			
		},
		getTableDataFn:function(){
			// 将商品明细传出
			return this.InoutDetailList;
        },
        getSumFn:function(row,k,m,j){
            
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



