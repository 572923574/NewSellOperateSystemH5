<template>
    <!-- 出入库类型新增编辑 -->
    <div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 出、入库-->
                <div class="rowItemLabel">{{Label.type}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.type" :placeholder="placeholderObj.type">
                    <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 出入库类型编号 -->
                <div class="rowItemLabel">{{Label.no}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.no" :placeholder="placeholderObj.no"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 出入库类型名称 -->
                <div class="rowItemLabel">{{Label.name}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.name" :placeholder="placeholderObj.name"></el-input>
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
                no:"类型编号",
                status:"类型状态",
                type:"出入库类型",
            },
            // placeholder提示对象
            placeholderObj:{
                name:"请输入类型名称",
                no:"请输入入库编号",
                status:"请选择类型状态",
                type:"请选择出库还是入库类型",
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
                label:'出库',
            },{
                value:'2',
                label:'入库',
            }],
        }
    },
    props:['propsData'],
    computed:{
    },
    beforeMount:function(){
    },
    methods:{
       

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

