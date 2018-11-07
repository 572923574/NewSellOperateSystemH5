<template>
    <div class="vuePage">
		<div class="headDiv">
			<div class="searchDiv">
				<el-input :placeholder="searchPlaceholder" prefix-icon="el-icon-search" v-model="searchKey">
  				</el-input>
			</div>
			
		</div>
		<div>
			<TableDemo :tableData="tableData"></TableDemo>
		</div>
	</div>
</template>

<script>
import TableDemo from '@/components/table/tableDemo.vue';
export default {
	components:{
		TableDemo
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
			searchPlaceholder:"请输入名称或手机号码查询",//搜索提示
			searchKey:"",//搜索输入内容
		};
	},
	methods:{
		tableClick(){
			console.log();
		}
	}
};
</script>
<style lang="less" scoped>
.vuePage{
	padding: 10px;
	.headDiv{
		padding: 0px 10px;
		margin-bottom:10px;
	}
	
}
</style>
