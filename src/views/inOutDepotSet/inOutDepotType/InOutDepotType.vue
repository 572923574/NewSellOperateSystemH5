<template>
    <!-- 出入库类型 -->
    <div class="vuePage">
        <HeadQuery>
            <InOutTypeHead slot="headDiv" @queryList="queryList" @addFn="addFn"></InOutTypeHead>
        </HeadQuery>
		<!-- <div class="spaTable"> -->
			<TableDemo :tableData="tableData" @emitTableFn="emitTableFn"></TableDemo>
		<!-- </div> -->
		<Dialog :dialogData="dialogData" ref="InOutTypeFormDialog" @emitSaveFn="saveFn">
			<InOutTypeForm slot="dialogContent" :propsData="propsData"></InOutTypeForm>
		</Dialog>
	</div>
</template>
<script>
import HeadQuery from '@/components/headQuery/HeadQuery.vue';
import InOutTypeHead from '@/components/headQuery/InOutTypeHead/InOutTypeHead.vue';
import InOutTypeForm from '@/components/form/InOutTypeForm.vue';
import TableDemo from '@/components/table/tableDemo.vue';
import Dialog from '@/components/dialog/Dialog.vue';
import Api from '@/common/api/api.js';
export default {
    components:{
		TableDemo,
		Dialog,
        InOutTypeHead,
		HeadQuery,
		InOutTypeForm
	},
    data() {
		return {
            tableData:{
				theadData: [
                    {
                        label: "编号",
                        width: "150",
                        prop: "no",
                        // fixed: true
					},{
                        label: "出入库类型名称",
                        width: "150",
                        prop: "name",
                        // fixed: true,
						formatter:true,
                    },{
                        label: "类型",
                        width: "150",
                        prop: "type",
						// formatter:true,
					},{
                        label: "状态",
                        width: "150",
                        prop: "status",
						// formatter:true,
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
                    type:"formatInOutDepotType",
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
		addFn(){
			// 新增弹框
			this.propsData = Object.assign(this.$options.data().propsData, this.$options.data());//重置数组
			this.$refs.InOutTypeFormDialog.show();
		},
		queryList(searchKey){
			let that = this;
			// 查询商品列表
			const $loading = this.$loading();
			Api.InOutDepotTypeList({
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
            },that,true);
		},
		saveFn(){
			// 新增
			let that = this;
			this.loading = true;
			let propsData = JSON.parse(JSON.stringify(this.propsData)); 
			Api.inoutDepotTypeSave({
                body:propsData
			},function(resp){
                that.btnLoad = false;
                if(resp.result == 0){
					that.tableData.tbodyData = resp.body;
					that.loading= false;
                }
            },function(){
                that.btnLoad = false;
            },that,true);
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
			this.$refs.InOutTypeFormDialog.show();
		},
		deleteClick(data){
			let that = this;
			// 删除
			const $loading = this.$loading();
			Api.inoutDepotTypeDetele({
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
