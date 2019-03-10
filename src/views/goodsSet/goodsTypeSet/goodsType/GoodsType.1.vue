<template>
<!-- 商品类型 -->
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
            <el-table-column prop="no" label="编号" width="120" sortable></el-table-column>
            <el-table-column prop="name" label="名称" width="120" sortable></el-table-column>
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
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :page-size="20"
                :total="total"
                style="float:right;"
            ></el-pagination>
        </el-col>
        <!--新增、编辑界面-->
        <Dialog :dialogData="dialogData" ref="GoodsDialog" @emitSaveFn="saveFn">
            <GoodsForm slot="dialogContent" :propsData="propsData">我是呵呵</GoodsForm>
        </Dialog>
    </section>
</template>
<script>
import GoodsTypeForm from '@/components/form/GoodsTypeForm.vue';
// import util from "@/common/js/util.js";
import Api from "@/common/api/api.js";
import GoodsForm from "@/components/form/GoodsForm.vue";
import Dialog from "@/components/dialog/Dialog.vue";
import TableQuery from "@/components/headQuery/TableQuery.vue";
export default {
    components:{
		GoodsForm,
		Dialog,
        TableQuery,
	},
    data() {
		return {
            tableData:{
				theadData: [
                    {
                        label: "编号",
                        width: "150",
                        prop: "typeNo",
                        fixed: true
					},
					{
                        label: "名称",
                        width: "150",
                        prop: "typeName",
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
			this.$refs.GoodsTypeDialog.show();
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
