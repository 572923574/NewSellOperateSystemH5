<template>
    <div class="vuePage">
		<div class="headDiv">
			<div class="searchDiv">
				<el-input :placeholder="searchPlaceholder" prefix-icon="el-icon-search" v-model="searchKey">
  				</el-input>
			</div>
			<div class="searchBtnDiv">
				<el-button icon="el-icon-search" >查询</el-button>
			</div>
			<div class="addBtnDiv">
				<el-button icon="el-icon-plus" @click="addAccountFn">新增</el-button>
			</div>
			
		</div>
		<div>
			<TableDemo :tableData="tableData"></TableDemo>
		</div>
		<Dialog :dialogData="dialogData" ref="AccountDialog">
			<AccountForm slot="dialogContent">我是呵呵</AccountForm>
		</Dialog>
	</div>
</template>

<script>
import TableDemo from '@/components/table/tableDemo.vue';
import Dialog from '@/components/dialog/Dialog.vue';
import AccountForm from '@/components/form/AccountForm.vue';
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
					{
					date: "2016-05-03",
					name: "王小虎",
					mobile: "18123456789",
					status: "0",
					address: "上海市普陀区金沙江路 1518 弄",
					zip: 200333
					},
					{
					date: "2016-05-02",
					name: "chali",
					mobile: "18123456789",
					status: "0",
					address: "上海市普陀区金沙江路 1518 弄",
					zip: 200333
					},
					{
					date: "2016-05-04",
					name: "xl",
					mobile: "18123456789",
					status: "0",
					address: "上海市普陀区金沙江路 1518 弄",
					zip: 200333
					},
					{
					date: "2016-05-01",
					name: "王小虎1",
					mobile: "18123456789",
					status: "0",
					address: "上海市普陀区金沙江路 1518 弄",
					zip: 200333
					},
					{
					date: "2016-05-08",
					name: "王小虎2",
					mobile: "18123456789",
					status: "0",
					address: "上海市普陀区金沙江路 1518 弄",
					zip: 200333
					},
					{
					date: "2016-05-06",
					name: "王小虎3",
					mobile: "18123456789",
					status: "0",
					address: "上海市普陀区金沙江路 1518 弄",
					zip: 200333
					},
					{
					date: "2016-05-07",
					name: "王小虎4",
					mobile: "18123456789",
					status: "0",
					address: "上海市普陀区金沙江路 1518 弄",
					zip: 200333
					}
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
		};
	},
	methods:{
		addAccountFn(){
			// 新增账号方法
			debugger
			this.$refs.AccountDialog.show();
		},
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
