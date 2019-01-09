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
                    <el-option v-for="item in inOutDepotTypeList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
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
            <div class="formRowItem ">
                <!-- 选择商品 -->
                <div class="rowItemLabel">
                    <el-button @click="showGoodsFn">{{seleteGoodsBtn}}</el-button>
                </div>
            </div>
        </div>
        <div class="detailMaxHeight">
            <div class="detailHead">
                <div class="no">编号</div>
                <div class="name">名称</div>
                <div class="barCode">条码</div>
                <div class="salePrice">单价</div>
                <div class="num">数量</div>
                <div class="sum">小计</div>
                <div class="sum">操作</div>
            </div>
            <div v-for="detail in InoutDetailList" :key="detail.id" class="detailHead">
                <div class="no">{{detail.no}}</div>
                <div class="name">{{detail.name}}</div>
                <div class="barCode">{{detail.barCode}}</div>
                <div class="salePrice">{{detail.salePrice}}</div>
                <div class="num">{{detail.num}}</div>
                <div class="sum">{{detail.salePrice * detail.num}}</div>
                <div class="sum">删除</div>
            </div>
        </div>
        <Dialog :dialogData="dialogData" ref="selectGoodsDialog" @emitSaveFn="getTableDataFn">
            <InOutDetailTable ref="InOutDetailTable" :slot="dialogData.dialogContent"></InOutDetailTable>
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
            InoutDetailList:[],//出入库明细
        }
    },
    props:['propsData'],
    computed:{
        inOutDepotTypeList:function(){
            let that = this;
            let inOutDepotTypeData= this.$store.state.inOutDepotTypeList;
            // 出入库类型名称集合
            let inOutDepotTypeList = inOutDepotTypeData.filter(function(inOutDepotType){
                return that.propsData.type == inOutDepotType.type;
            });
            return inOutDepotTypeList;
        }
    },
    
    beforeMount(){
        this.initData();
    },
    beforeUpdate:function(){
        this.initData();
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
            // 重置选择的出入库类型
            this.propsData.inOutDepotTypeId = this.inOutDepotTypeList&&this.inOutDepotTypeList.length ? this.inOutDepotTypeList[0].id:"";
        },
        showGoodsFn:function(){
            //展示选择商品弹框
            this.$refs.selectGoodsDialog.show();
        },
        getTableDataFn:function(){
            // 获取选择的商品明细
            this.InoutDetailList = this.$refs.InOutDetailTable.getTableDataFn();
            this.propsData.goodsList = this.InoutDetailList;
        },
        initData(){
            if(!this.propsData.no){
                //新增单据时自动生成出入库单号 
                this.propsData.no = "No" + new Date().getTime();
            }
            if(!this.propsData.inOutDepotTypeId){
                //新增单据时默认选择一个出入库类型
                this.propsData.inOutDepotTypeId =this.inOutDepotTypeList&&this.inOutDepotTypeList.length ? this.inOutDepotTypeList[0].id:"";
            }
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
.detailMaxHeight{
    .detailHead{
        height: 30px;
        line-height: 30px;
        .no,.name,.barCode,.salePrice,.num,.sum{
            float: left;
            height: 30px;
            line-height: 30px;
        }
        .no{
            width: 50px;
        }.name{
            width: 100px;
        }.barCode{
            width: 100px;
        }.salePrice{
            width: 100px;
        }.num{
            width: 100px;
        }.sum{
            width: 100px;
        }
    }
}
</style>

