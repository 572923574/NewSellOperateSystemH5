<template>
    <!-- 商品类型 -->
    <div class="vuePage">
        <HeadQuery>
            <InOutHead slot="headDiv" @queryList="queryList" @addFn="addGoodsFn"></InOutHead>
        </HeadQuery>
		<div class="spaTable">
			<TableDemo :tableData="tableData" @emitTableFn="emitTableFn"></TableDemo>
		</div>
		<Dialog :dialogData="dialogData" ref="InOutFormDialog" @emitSaveFn="saveFn">
			<InOutForm slot="dialogContent" :propsData="propsData"></InOutForm>
		</Dialog>
	</div>
</template>
<script>
import HeadQuery from '@/components/headQuery/HeadQuery.vue';
import InOutHead from '@/components/headQuery/InOutHead/InOutHead.vue';
import InOutForm from '@/components/form/InOutForm.vue';
import TableDemo from '@/components/table/tableDemo.vue';
import Dialog from '@/components/dialog/Dialog.vue';
import Api from '@/common/api/api.js';
export default {
    components:{
		TableDemo,
		Dialog,
        InOutHead,
		HeadQuery,
		InOutForm
	},
    data() {
		return {
            tableData:{
				theadData: [
                    {
                        label: "单号",
                        width: "150",
                        prop: "no",
                        fixed: true
					},{
                        label: "出入库类型",
                        width: "150",
                        prop: "inOutDepotTypeId",
                        fixed: true,
						formatter:true,
                    },{
                        label: "单据金额",
                        width: "150",
                        prop: "money",
                        fixed: true
					},
					{
                        label: "类型",
                        width: "150",
                        prop: "inOutDepotType",
						formatter:true,
					},
					{
                        label: "创建日期",
                        width: "150",
                        prop: "createDate",
						formatter:true,
					},{
                        label: "审核人",
                        width: "150",
                        prop: "accountName",
					},{
                        label: "备注",
                        width: "150",
                        prop: "remark",
					},{
                        label: "状态",
                        width: "150",
                        prop: "status",
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
					status:"formatterStatus",
				},
			},
			dialogData:{	
				title:"出入库",//显示弹框
			},//新增账号
			propsData:{
				id:null,
				eid:null,
				sid:null,
                no:null,
                money:null,
                inOutDepotTypeId:null,
                type:'2',//1出库，2入库
                createDate:null,
                status:"0",
                remark:null,
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
			this.$refs.InOutFormDialog.show();
		},
		queryList(searchKey){
			let that = this;
			// 查询商品列表
			const $loading = this.$loading();
			Api.goodsTypeList({
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
			Api.goodsTypeSave({
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
			this.$refs.GoodsTypeDialog.show();
		},
		deleteClick(data){
			let that = this;
			// 删除
			const $loading = this.$loading();
			Api.goodsTypeDelete({
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
