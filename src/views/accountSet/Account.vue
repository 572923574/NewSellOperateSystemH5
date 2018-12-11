<template>
    <div class="vuePage">
		<div class="headDiv">
			<div class="searchDiv">
				<el-input :placeholder="searchPlaceholder" prefix-icon="el-icon-search" v-model="searchKey">
  				</el-input>
			</div>
			<div class="searchBtnDiv">
				<el-button icon="el-icon-search" @click="queryAccountList">查询</el-button>
			</div>
			<div class="addBtnDiv">
				<el-button icon="el-icon-plus" @click="addAccountFn">新增</el-button>
			</div>
			
		</div>
		<div>
			<TableDemo :tableData="tableData" v-loading="loading"></TableDemo>
		</div>
		<Dialog :dialogData="dialogData" ref="AccountDialog" @emitSaveFn="saveAccount">
			<AccountForm slot="dialogContent" :accountData="accountData">我是呵呵</AccountForm>
		</Dialog>
	</div>
</template>

<script>
import TableDemo from '@/components/table/tableDemo.vue';
import Dialog from '@/components/dialog/Dialog.vue';
import AccountForm from '@/components/form/AccountForm.vue';

import Api from '@/common/api/api.js';
export default {
	components:{
		TableDemo,
		Dialog,
		AccountForm
	},
	data() {
		return {
			tableData:{
				theadData: [
					{
					label: "名称",
					width: "150",
					prop: "name",
					fixed: true
					},
					{
					label: "手机",
					width: "150",
					prop: "mobile",
					fixed: true
					},
					{
					label: "角色",
					width: "150",
					prop: "role",
					fixed: true
					},
					{
					label: "加入日期",
					width: "150",
					prop: "date",
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
			searchPlaceholder:"输入名称或手机号查询",//搜索提示
			searchKey:"",//搜索输入内容
			dialogData:{	
				title:"新增账号",//显示弹框
			},//新增账号
			// 数据对象
			accountData:{
				id:"",
				name:'',
				mobile:"",
				password:"",
				status:"0",
				memuStr:"",
				optStr:"",
			},
			loading:false,//加载
		};
	},
	beforeMount(){
		this.queryAccountList();//查询数据
	},
	methods:{
		addAccountFn(){
			// 新增账号弹框
			debugger
			this.$refs.AccountDialog.show();
		},
		queryAccountList(){
			let that = this;
			// 查询账号列表
			this.loading = true;
			Api.spaAccountList({
                body:{
					name:this.searchKey,
					mobile:this.searchKey,
				}
			},function(resp){debugger
                that.btnLoad = false;
                if(resp.result == 0){
					that.tableData.tbodyData = resp.body;
					that.loading= false;
                }
            },function(error){
                that.btnLoad = false;
            },that);
		},
		saveAccount(){
			// 新增账号
			let that = this;
			this.loading = true;
			Api.spaAccountSave({
                body:this.accountData
			},function(resp){debugger
                that.btnLoad = false;
                if(resp.result == 0){
					that.loading= false;
					that.queryAccountList();
                }
            },function(error){
                that.btnLoad = false;
            },that);
		}
	}
};
</script>
<style lang="less" scoped>
.vuePage{
	padding: 10px;
	.headDiv{
		padding: 0px 10px;
		height: 30px;
		margin-bottom:10px;
		.searchDiv{
			width: 180px;
			float: left;
		}
		.searchBtnDiv{
			float: left;
			margin-left: 10px;
		}
		.addBtnDiv{
			float: left;
			margin-left: 10px;
		}
	}
	
}
</style>
