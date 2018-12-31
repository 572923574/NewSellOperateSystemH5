<template>
    <!-- 商品子类型 -->
    <div class="vuePage">
        <HeadQuery>
            <GoodsSubTypeHead slot="headDiv" @queryList="queryList" @addFn="addGoodsFn"></GoodsSubTypeHead>
        </HeadQuery>
		<div class="spaTable">
			<TableDemo :tableData="tableData" @emitTableFn="emitTableFn"></TableDemo>
		</div>
		<Dialog :dialogData="dialogData" ref="GoodsSubTypeDialog" @emitSaveFn="saveFn">
			<GoodsSubTypeForm slot="dialogContent" :propsData="propsData">我是呵呵</GoodsSubTypeForm>
		</Dialog>
	</div>
</template>
<script>
import HeadQuery from '@/components/headQuery/HeadQuery.vue';
import GoodsSubTypeHead from '@/components/headQuery/GoodsSubTypeHead/GoodsSubTypeHead.vue';
import GoodsSubTypeForm from '@/components/form/GoodsSubTypeForm.vue';
import TableDemo from '@/components/table/tableDemo.vue';
import Dialog from '@/components/dialog/Dialog.vue';
import Api from '@/common/api/api.js';
export default {
    components:{
		TableDemo,
		Dialog,
        GoodsSubTypeHead,
		HeadQuery,
		GoodsSubTypeForm
	},
    data() {
		return {
            tableData:{
				theadData: [
                    {
                        label: "类型",
                        width: "150",
                        prop: "typeId",
						fixed: true,
						formatter:true,
					},
                    {
                        label: "子类型编号",
                        width: "150",
                        prop: "subTypeNo",
                        fixed: true
					},
					{
                        label: "子类型名称",
                        width: "150",
                        prop: "subTypeName",
                        fixed: true
					},
					{
                        label: "状态",
                        width: "150",
                        prop: "status",
						fixed: true,
						formatter:true,
					}
				],
				tbodyData: [
					
				],
				tableInfo:{
					maxHeight:"100%",
					border:true,
					showRightBtnColumn:true,
				},
				formatterCol:{
					typeId:"formatterTypeName",
					status:"formatterStatus",
				},
			},
			dialogData:{	
				title:"新增类型",//显示弹框
			},//新增账号
			propsData:{
				id:null,
				eid:null,
				sid:null,
				typeName:null,
                typeNo:null,
                status:"0",
			},
        }
    
    },
    beforeMount(){
		this.queryList();//查询数据
    },
    methods:{
		addGoodsFn(){
			// 新增账号弹框
			this.propsData = Object.assign(this.$options.data().propsData, this.$options.data());//重置数组
			this.$refs.GoodsSubTypeDialog.show();
		},
		queryList(searchKey){
			let that = this;
			// 查询商品列表
			const $loading = this.$loading();
			Api.goodsSubTypeList({
                body:{
					typeName:searchKey,
					typeNo:searchKey,
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
		saveFn(){
			// 新增账号
			let that = this;
			this.loading = true;
			let propsData = JSON.parse(JSON.stringify(this.propsData)); 
			Api.goodsSubTypeSave({
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
			this.$refs.GoodsSubTypeDialog.show();
		},
		deleteClick(data){
			let that = this;
			// 删除
			const $loading = this.$loading();
			Api.goodsSubTypeDelete({
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
