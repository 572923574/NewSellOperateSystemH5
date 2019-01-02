<template>
    <!-- 商品子类型新增、编辑 -->
    <div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 编号 -->
                <div class="rowItemLabel">{{Label.no}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.subTypeNo" :placeholder="placeholderObj.no"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 名称 -->
                <div class="rowItemLabel">{{Label.name}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.subTypeName" :placeholder="placeholderObj.name"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 所属类型 -->
                <div class="rowItemLabel">{{Label.typeName}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.typeId" :placeholder="placeholderObj.typeName" >
                    <el-option v-for="item in goodsTypeList" :key="item.id" :label="item.typeName" :value="item.id"> </el-option>
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
    </div>
</template>
<script>
import Constant from "@/common/constant/constant.js";
export default {
    data(){
        return{
            // label对象
            Label:{
                name:"子类型名称",
                no:"子类型编号",
                typeName:"所属类型",
                status:"子类型状态",
            },
            // placeholder提示对象
            placeholderObj:{
                name:"请输入类型名称",
                no:"请输入类型编号",
                typeName:"请选择所属类型",
                status:"请选择子类型状态",
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
        }
    },
    props:['propsData'],
    computed:{
        goodsTypeList:function(){
            // 商品大类
            let meta = this.$store.state.spaAccount.meta;
            meta = meta || {goodsTypeList:[]};
            return meta.goodsTypeList;
        },
    },
    beforeMount:function(){
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

