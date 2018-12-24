<template>
    <!-- 商品列表 -->
    <div class="vuePage">
        <HeadQuery>
            <GoodsTableHead slot="headDiv" ></GoodsTableHead>
        </HeadQuery>
		<div class="spaTable">
			<TableDemo :tableData="tableData" @emitTableFn="emitTableFn"></TableDemo>
		</div>
		<!-- <Dialog :dialogData="dialogData" ref="AccountDialog" @emitSaveFn="saveAccount">
			<AccountForm slot="dialogContent" :accountData="accountData">我是呵呵</AccountForm>
		</Dialog> -->
	</div>
</template>
<script>
import HeadQuery from '@/components/headQuery/HeadQuery.vue';
import GoodsTableHead from '@/components/headQuery/goodsTableHead/GoodsTableHead.vue';
import TableDemo from '@/components/table/tableDemo.vue';
import Dialog from '@/components/dialog/Dialog.vue';
import Api from '@/common/api/api.js';
export default {
    components:{
		TableDemo,
		Dialog,
        GoodsTableHead,
        HeadQuery
	},
    data() {
		return {
            tableData:{
				theadData: [
                    {
					label: "编号",
					width: "150",
					prop: "No",
					fixed: true
					},
					{
					label: "名称",
					width: "150",
					prop: "name",
					fixed: true
					},
					{
					label: "销售价",
					width: "150",
					prop: "salePrice",
					fixed: true
                    },
                    {
					label: "进货价",
					width: "150",
					prop: "buyingPrice",
					fixed: true
                    },
                    {
					label: "成本价",
					width: "150",
					prop: "costPrice",
					fixed: true
					},
					{
					label: "数量",
					width: "150",
					prop: "num",
					fixed: true
					},
					{
					label: "状态",
					width: "150",
					prop: "status",
					fixed: true
					}
				],
				tbodyData: [
					
				],
				tableInfo:{
					maxHeight:"100%",
					border:true,
					showRightBtnColumn:true,
				}
			},
        }
    
    },
    beforeMount(){
		this.queryGoodsList();//查询数据
    },
    methods:{
		addAccountFn(){
			// 新增账号弹框
			this.$refs.AccountDialog.show();
		},
		queryGoodsList(){
			let that = this;
			// 查询账号列表
			this.loading = true;
			const $loading = this.$loading();
			Api.goodsList({
                body:{
					name:this.searchKey,
					mobile:this.searchKey,
				}
			},function(resp){
                that.btnLoad = false;
                if(resp.result == 0){
					that.tableData.tbodyData = resp.body;
					that.loading= false;
				}
				$loading.close();
            },function(){
				that.btnLoad = false;
				$loading.close();
            },that);
		},
		saveGoods(){
			// 新增账号
			let that = this;
			this.loading = true;
			let accountData = JSON.parse(JSON.stringify(this.accountData));
			accountData.optStr = this.accountData.optStr && typeof this.accountData.optStr == 'object'?JSON.stringify(this.accountData.optStr):"[]";
			accountData.menuStr = this.accountData.menuStr && typeof this.accountData.menuStr == 'object'?JSON.stringify(this.accountData.menuStr):"[]";
			Api.goodsSave({
                body:accountData
			},function(resp){
                that.btnLoad = false;
                if(resp.result == 0){
					that.loading= false;
                }
            },function(){
                that.btnLoad = false;
            },that);
		},
		emitTableFn(fn,data){
			// 监听表格方法
			if(fn){
				this[fn](data);
			}
		},
		editClick(data){
			// 编辑账号
			this.accountData = data;
			this.accountData.optStr = this.accountData.optStr && typeof this.accountData.optStr == 'string'?JSON.parse(this.accountData.optStr):[];
			this.accountData.menuStr = this.accountData.menuStr && typeof this.accountData.menuStr == 'string'?JSON.parse(this.accountData.menuStr):[];
			this.$refs.AccountDialog.show();
		},
		deleteClick(data){
			let that = this;
			// 删除账号
			const $loading = this.$loading();
			Api.spaDelete({
                body:data
			},function(){
				$loading.close();
            },function(){
				$loading.close();
            },that);
		}
	}
}
</script>
<style lang="less" scoped>
.vuePage{
	padding: 10px;
}
</style>
