<template>
    <!-- 新增编辑商品 -->
    <div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 名称 -->
                <div class="rowItemLabel">{{Label.name}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.name" :placeholder="placeholderObj.name"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 编号 -->
                <div class="rowItemLabel">{{Label.no}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.no" :placeholder="placeholderObj.no"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 商品编码 -->
                <div class="rowItemLabel">{{Label.bar_code}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.bar_code" :placeholder="placeholderObj.bar_code"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 商品类型 -->
                <div class="rowItemLabel">{{Label.type}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.type" :placeholder="placeholderObj.type" >
                    <el-option v-for="type in goodsTypeList" :key="type.value" :label="type.label" :value="type.value"> </el-option>
                </el-select>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 商品子类型 -->
                <div class="rowItemLabel">{{Label.son_type}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.son_type" :placeholder="placeholderObj.son_type" >
                    <el-option v-for="item in sonTypeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 商品初始数量 -->
                <div class="rowItemLabel">{{Label.num}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.num" :placeholder="!!propsData.id?placeholderObj.num:placeholderObj.numStart" :disabled="!!propsData.id"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 商品进货价 -->
                <div class="rowItemLabel">{{Label.buyingPrice}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.buyingPrice" :placeholder="placeholderObj.buyingPrice"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 商品成本价 -->
                <div class="rowItemLabel">{{Label.costPrice}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.costPrice" :placeholder="placeholderObj.costPrice"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 商品销售价 -->
                <div class="rowItemLabel">{{Label.salePrice}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.salePrice" :placeholder="placeholderObj.salePrice"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 商品单位 -->
                <div class="rowItemLabel">{{Label.unit}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.unit" :placeholder="placeholderObj.unit" >
                    <el-option v-for="item in unitList" :key="item" :label="item" :value="item"> </el-option>
                </el-select>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 商品规格spec -->
                <div class="rowItemLabel">{{Label.spec}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.spec" :placeholder="placeholderObj.spec" >
                    <el-option v-for="item in specList" :key="item" :label="item" :value="item"> </el-option>
                </el-select>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 商品品牌 -->
                <div class="rowItemLabel">{{Label.goodsCompanyId}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.goodsCompanyId" :placeholder="placeholderObj.goodsCompanyId" >
                    <el-option v-for="item in goodsCompanyList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 供货商 -->
                <div class="rowItemLabel">{{Label.supplierId}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.supplierId" :placeholder="placeholderObj.supplierId" >
                    <el-option v-for="item in supplierList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
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
                name:"商品名称",
                no:"商品编号",
                type:"商品类型",
                son_type:"商品子类型",
                bar_code:"商品条码",
                numStart:"初始数量",
                num:"商品数量",
                buyingPrice:"进货价",
                costPrice:"成本价",
                salePrice:"销售价",
                unit:"商品单位",
                spec:"商品规格",
                goodsCompanyId:'商品品牌',
                supplierId:'供货商',
                status:"商品状态",
            },
            // placeholder提示对象
            placeholderObj:{
                name:"请输入商品名称",
                no:"请输入商品编号",
                type:"请选择商品类型",
                son_type:"请选择商品子类型",
                bar_code:"请输入商品条码",
                numStart:"请输入初始数量",
                num:"请输入商品数量",
                buyingPrice:"请输入进货价",
                costPrice:"请输入成本价",
                salePrice:"请输入销售价",
                unit:"请选择商品单位",
                spec:"请选择商品规格",
                goodsCompanyId:'请选择商品品牌',
                supplierId:'请选择供货商',
                status:"请输入商品状态",
            },
            //状态集合
            statusList:[{
                value:'0',
                label:'正常',
            },{
                value:'1',
                label:'停售',
            }
            ,{
                value:'2',
                label:'删除',
            }],
            unitList:[],//单位集合
            specList:[],//规格数组
            supplierList:[],//供货商集合
            goodsCompanyList:[],//品牌公司集合
            goodsTypeList:[{label:'洗发类',value:1}],//商品类型集合
            sonTypeList:[{label:'店用洗发',value:1},{label:'家用洗发',value:2}],//商品子类型集合
        }
    },
    props:['propsData'],
    computed:{

    },
    beforeMount:function(){
        this.unitList = Constant.unitList;
        this.specList = Constant.specList;
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

