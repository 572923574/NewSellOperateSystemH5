<template>
    <!-- 表格组件 -->
    <el-table :class="[{ tableWidth: fullWidth }, 'tableDemo']" :data="tableData1" :maxHeight="tableInfo.maxHeight" border>
		<el-table-column prop="name"  label="name"  width="180"></el-table-column>
        <el-table-column prop="address"  label="address" width="180"></el-table-column>
       <el-table-column v-for="(head,key) in theadData1" :prop="head.prop" :label="head.label"  width="190" :key="key">
    </el-table-column>
     <!-- <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column> -->
        <!-- <el-table-column prop="name" label="姓名" width="180"></el-table-column> -->
        <!-- <el-table-column v-for="(headerItem,key) in theadData" :fixed="false?headerItem.fixed:false" :label="headerItem.label" :prop="headerItem.prop" :width="headerItem.width" :key="key" :formatter="headerItem.formatter?formatter:noFormatter"></el-table-column> -->
        <!-- <el-table-column v-if="tableInfo.showRightBtnColumn" :fixed="fullWidth?rightBtnObj.fixed:fullWidth" min-width="30" :label="rightBtnObj.label" :width="rightBtnObj.width" >
      		<template slot-scope="scope">
        		<el-button class="tableBtn" @click="tableClick(scope.row,btn.clickFunction)" :type="btn.type" :size="btn.size" v-for="(btn,btnKey) in rightBtnObj.btns" :key="btnKey">{{btn.btnText}}</el-button>
      		</template>
    	</el-table-column> -->
    </el-table>
</template>

<script>
export default {
    props:['tableData'],//表格数据
	data() {
		return {
            theadData1:[{prop:'date',label:'date',width:190},{prop:'sex',label:'sex',width:190}],
             tableData1: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          sex:"m"
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          sex:"m"
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          sex:"m"
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          sex:"m"
        }],
            tableInfoDefaults:{
                maxHeight:"300",
                border:true,
                showRightBtnColumn:false,
            },
            rightBtnObjDefaults:{
                fixed:"right",
                label:"操作",
                width:"122",
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
            },
            fullWidth:false,//宽度100%
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
        formatterCol:function(){
            // 格式化列
            let formatterCol = this.tableData.formatterCol;
            return formatterCol;
        },
        rightBtnObj:function(){
			// 表格右边按钮组
			let rightBtnObj = this.tableData.rightBtnObj;
			if(this.tableInfo.showRightBtnColumn){
				rightBtnObj = rightBtnObj?rightBtnObj:this.rightBtnObjDefaults;
			}
            return rightBtnObj;
        },
        goodsTypeList:function(){
            // 商品大类
            let meta = this.$store.state.spaAccount.meta;
            meta = meta || {goodsTypeList:[]};
            return meta.goodsTypeList;
        },
        inOutDepotTypeList:function(){
            // 出入库类型
            return this.$store.state.inOutDepotTypeList;
        },
    },
    beforeMount:function(){
        this.tableData;
        this.initTableData();
    },
	methods:{
		tableClick(data,callFn){
            // 触发父组件监听方法
            this.$emit("emitTableFn",callFn,data);
        },
        initTableData(){

        },
		formatter(row,col,cellValue){
            // 格式化方法
            let formatValue = cellValue;
            if(this.formatterCol){
                let formatterFn = this.formatterCol[col.property];
                if(formatterFn){
                    formatValue = this[formatterFn](cellValue);
                }
            }      
            return formatValue;
        },
        noFormatter(row,col,cellValue){
            // 无格式化
            return cellValue;
        },
        formatterTypeName(cellValue){
            // 格式化商品类型名称
            let goodsType = {};
            for(let i = 0;i< this.goodsTypeList.length;i++){
                let type = this.goodsTypeList[i];
                if(type.id == cellValue){
                    goodsType = type;
                    break;
                }
            }
            return goodsType.typeName;
        },
        formatterStatus(cellValue){
            let Str = cellValue;
            // 格式化状态
            switch (cellValue){
                case '0':
                    Str = '正常';
                    break;
                case '1':
                    Str = '禁用';
                    break;
                case '2':
                    Str = '删除';
                    break;
            }
            return Str;
        },
        formatDate(cellValue){
            // 格式化日期
            return new Date(cellValue).toLocaleDateString();
        },
        formatInOutDepotType(cellValue){
            let Str = cellValue;
            // 格式化出、入库
            switch (cellValue){
                case '1':
                    Str = '出库';
                    break;
                case '2':
                    Str = '入库';
                    break;
            }
            return Str;
        },
        formatterInOutTypeName(cellValue){
            let Str = cellValue;
            // 格式化出入库类型
            for(let i = 0;i<this.inOutDepotTypeList.length;i++){
                let obj = this.inOutDepotTypeList[i];
                if(obj.id == cellValue){
                    Str = obj.name;
                }
            }
            return Str;
        }
	}
};
</script>
<style lang="less">
	.tableDemo{
		div{
			table{
				td,th {
					padding:0px; 
					font-size:12px;
					div.cell{
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        .tableBtn{
                            padding:0px 10px !important;
                        }
					}
                }
                th{
                    text-align:center;
                }
			}
		}
		
	}
</style>

