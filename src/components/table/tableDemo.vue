<template>
    <el-table class="tableDemo" :data="tbodyData" style="width: 100%" :maxHeight="tableInfo.maxHeight" border>
		<el-table-column type="index" width="50" label="No" :fixed="true"></el-table-column>
        <el-table-column v-for="(headerItem,key) in theadData" :fixed="headerItem.fixed" :label="headerItem.label" :prop="headerItem.prop" :width="headerItem.width" :key="key" ></el-table-column>
        <el-table-column v-if="tableInfo.showRightBtnColumn" :fixed="rightBtnObj.fixed" min-width="30" :label="rightBtnObj.label" :width="rightBtnObj.width">
      		<template slot-scope="scope">
        		<el-button @click="tableClick(scope.row,btn.clickFunction)" :type="btn.type" :size="btn.size" v-for="(btn,btnKey) in rightBtnObj.btns" :key="btnKey">{{btn.btnText}}</el-button>
      		</template>
    	</el-table-column>
    </el-table>
</template>

<script>
export default {
    props:['tableData'],
	data() {
		return {
            tableInfoDefaults:{
                maxHeight:"300",
                border:true,
                showRightBtnColumn:false,
            },
            rightBtnObjDefaults:{
                fixed:"left",
                label:"操作",
                width:"100",
                btns:[
                    {
                        btnText:"编辑",
                        type:"text",
                        size:"small",
                        clickFunction:"editClick",
					},
					{
                        btnText:"删除",
                        type:"text",
                        size:"small",
                        clickFunction:"deleteClick",
                    }
                ]
            }
		};
    },
    computed:{
        //计算属性
        theadData:function(){
            // 表头
            let theadData = this.tableData.theadData;
            return theadData;
        },
        tbodyData:function(){
            // 表格tboty内容行
            let tbodyData = this.tableData.tbodyData;
            return tbodyData;
        },
        tableInfo:function(){
            // 表格信息
            let tableInfo = this.tableData.tableInfo?this.tableData.tableInfo:this.tableInfoDefaults;
            tableInfo.maxHeight = tableInfo.maxHeight?tableInfo.maxHeight:"300";
            return tableInfo;
        },
        rightBtnObj:function(){
			// 表格右边按钮组
			let rightBtnObj = this.tableData.rightBtnObj;
			if(this.tableInfo.showRightBtnColumn){
				rightBtnObj = rightBtnObj?rightBtnObj:this.rightBtnObjDefaults;
			}
            return rightBtnObj;
        }
    },
    beforeMount:function(){
        this.initTableData();
    },
	methods:{
		tableClick(data,callFn){
            // 触发父组件监听方法
            this.$emit(callFn,data);
        },
        initTableData(){

        }
	}
};
</script>
<style lang="less" scoped>


</style>
<style lang="less">

	.tableDemo{
		div{
			table{
				td,th {
					padding:0px; 
					font-size:12px;
					div.cell{
	// 					padding:0px;
	// 					padding-left: 0px !important;
						    overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
					}
				}
			}
		}
		
	}
</style>

