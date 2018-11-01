<template>
    <div>
		<div></div>
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
			}
		};
	},
	methods:{
		tableClick(){
			console.log();
		}
	}
};
</script>