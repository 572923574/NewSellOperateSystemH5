<template>
    <!-- 出入库新增编辑 -->
    <div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 出、入库-->
                <div class="rowItemLabel">{{Label.type}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.type" :placeholder="placeholderObj.type" @change="selectInOutTypeFn">
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 出入库单号 -->
                <div class="rowItemLabel">{{Label.no}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.no" :placeholder="placeholderObj.no"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 出入库类型名称 -->
                <div class="rowItemLabel">{{Label.inOutDepotTypeId}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.inOutDepotTypeId" :placeholder="placeholderObj.inOutDepotTypeId" >
                    <el-option v-for="item in inOutDepotTypeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
        </div>
        <div class="formRow" v-if="propsData.id">
            <div class="formRowItem">
                <!-- 状态 -->
                <div class="rowItemLabel">{{Label.status}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.status" :placeholder="placeholderObj.status" >
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 选择商品 -->
                <div class="rowItemLabel">
                    <el-button @click="showGoodsFn">{{seleteGoodsBtn}}</el-button>
                </div>
            </div>
        </div>
        <Dialog :dialogData="dialogData" ref="selectGoodsDialog" @emitSaveFn="selectGoodsFn">
            <InOutDetailTable :slot="dialogData.dialogContent" ></InOutDetailTable>
		</Dialog>
    </div>
</template>
<script>
import Constant from "@/common/constant/constant.js";
import Dialog from '@/components/dialog/Dialog.vue';
import InOutDetailTable from '@/components/table/InOutDetailTable.vue';

export default {
    components:{
        Dialog,
        InOutDetailTable,
	},
    data(){
        return{
            // label对象
            Label:{
                name:"类型名称",
                no:"入库编号",
                status:"类型状态",
                type:"单据类型",
                inOutDepotTypeId:"入库类型",
            },
            // placeholder提示对象
            placeholderObj:{
                name:"请输入类型名称",
                no:"请输入入库编号",
                status:"请选择类型状态",
                type:"请选择单据类型",
                inOutDepotTypeId:"请选择入库类型",
            },
            //状态集合
            statusList:[{
                value:'0',
                label:'正常',
            },{
                value:'1',
                label:'禁用',
            }
            ,{
                value:'2',
                label:'删除',
            }],
            // 单据类型
            typeList:[{
                value:'1',
                label:'出库单',
            },{
                value:'2',
                label:'入库单',
            }],
            seleteGoodsBtn:"选择商品",
            dialogData:{	
                title:"选择商品",//显示弹框
                appendToBody:true,//弹框内嵌套弹框
                dialogContent:"inOutTable",
			},
        }
    },
    props:['propsData'],
    computed:{
        inOutDepotTypeList:function(){
            return [{
                value:'1',
                label:'购买出库',
            },{
                value:'2',
                label:'进货入库',
            }];
        }
    },
    beforeMount:function(){debugger
        if(!this.propsData.no){
            //新增单据时自动生成出入库单号 
            this.propsData.no = "No" + new Date().getTime();
        }
    },
    methods:{
        selectInOutTypeFn:function(value){
            //选择单据类型
            if(value == "1"){
                this.Label.inOutDepotTypeId = "出库类型";
                this.placeholderObj.inOutDepotTypeId = "请选择出库类型";
                this.Label.no = "出库单号";
                this.placeholderObj.inOutDepotTypeId = "请输入出库单号";
            }else{
                this.Label.inOutDepotTypeId = "入库类型";
                this.placeholderObj.inOutDepotTypeId = "请选择入库类型";
                this.Label.no = "入库单号";
                this.placeholderObj.inOutDepotTypeId = "请输入入库单号";
            }
            this.propsData.inOutDepotTypeId = null;
        },
        showGoodsFn:function(){
            //展示选择商品弹框
            this.$refs.selectGoodsDialog.show();
        },
        selectGoodsFn:function(){

        }
    }
}
</script>

<style lang="less" scoped>
.formRow{
    // 表单行
    width: 100%;
    display: block;
    .formRowItem{
        height: 30px;
        padding-bottom: 10px;
        .rowItemLabel{
            // 输入框label
            width: 100px;
            float: left;
            line-height: 30px;
            text-align: right;
            padding: 0 10px;
        }
        .rowInput{
            width: 200px;
            float: left;
            margin:0 10px;
        }
        .optGroup,.menuGroup{
            text-align: left;
        }
    }
    
}
</style>

