<template>
    <!-- 商品列表 -->
    <div class="vuePage">
        <HeadQuery>
            <GoodsTableHead slot="headDiv" @queryList="queryGoodsList" @addFn="addGoodsFn"></GoodsTableHead>
        </HeadQuery>
		<div class="spaTable">
			<TableDemo :tableData="tableData" @emitTableFn="emitTableFn"></TableDemo>
		</div>
		<Dialog :dialogData="dialogData" ref="GoodsDialog" @emitSaveFn="saveGoods">
			<GoodsForm slot="dialogContent" :propsData="propsData">我是呵呵</GoodsForm>
		</Dialog>
	</div>
</template>
<script>
import HeadQuery from '@/components/headQuery/HeadQuery.vue';
import GoodsTableHead from '@/components/headQuery/goodsTableHead/GoodsTableHead.vue';
import GoodsForm from '@/components/form/GoodsForm.vue';
import TableDemo from '@/components/table/tableDemo.vue';
import Dialog from '@/components/dialog/Dialog.vue';
import Api from '@/common/api/api.js';
export default {
    components:{
		TableDemo,
		Dialog,
        GoodsTableHead,
		HeadQuery,
		GoodsForm
	},
    data() {
		return {
            tableData:{
				theadData: [
                    {
					label: "编号",
					width: "150",
					prop: "no",
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
			dialogData:{	
				title:"新增商品",//显示弹框
			},//新增账号
			propsData:{
				id:null,
				eid:null,
				sid:null,
				name:null,
                no:null,
                bar_code:null,
				numStart:null,
				type:null,
				son_type:null,
                num:null,
                buyingPrice:null,
                costPrice:null,
                salePrice:null,
                unit:null,
                spec:null,
                goodsCompanyId:null,
                supplierId:null,
                status:"0",
			},
        }
    
    },
    beforeMount(){
		this.queryGoodsList();//查询数据
    },
    methods:{
		addGoodsFn(){
			// 新增账号弹框
			this.propsData = Object.assign(this.$options.data().propsData, this.$options.data());//重置数组
			this.$refs.GoodsDialog.show();
		},
		queryGoodsList(searchKey){
			let that = this;
			// 查询商品列表
			const $loading = this.$loading();
			Api.goodsList({
                body:{
					name:searchKey,
					No:searchKey,
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
			let propsData = JSON.parse(JSON.stringify(this.propsData)); 
			Api.goodsSave({
                body:propsData
			},function(resp){
                that.btnLoad = false;
                if(resp.result == 0){
					that.tableData.tbodyData = resp.body;
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
			// 编辑
			this.propsData = data;
			this.$refs.GoodsDialog.show();
		},
		deleteClick(data){
			let that = this;
			// 删除
			const $loading = this.$loading();
			Api.goodsDelete({
                body:data
			},function(resp){
				that.tableData.tbodyData = resp.body;
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
