<template>
    <!-- 商品类型新增编辑 -->
    <div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 编号 -->
                <div class="rowItemLabel">{{Label.no}}</div>
                <SCInput class="nameInput rowInput" rules="required" v-model="propsData.typeNo" :placeholder="placeholderObj.no"></SCInput>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 名称 -->
                <div class="rowItemLabel">{{Label.name}}</div>
                <SCInput class="nameInput rowInput" rules="required" v-model="propsData.typeName" :placeholder="placeholderObj.name"></SCInput>
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
                name:"类型名称",
                no:"类型编号",
                status:"类型状态",
            },
            // placeholder提示对象
            placeholderObj:{
                name:"请输入类型名称",
                no:"请输入类型编号",
                status:"请选择类型状态",
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
                value:'-1',
                label:'删除',
            }],
        }
    },
    props:['propsData'],
    computed:{

    },
    beforeMount:function(){
    }
}
</script>