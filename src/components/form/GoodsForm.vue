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
                <div class="rowItemLabel">{{Label.barCode}}</div>
                <el-input class="nameInput rowInput" v-model="propsData.barCode" :placeholder="placeholderObj.barCode"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 商品类型 -->
                <div class="rowItemLabel">{{Label.type}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.type" :placeholder="placeholderObj.type" >
                    <el-option v-for="type in goodsTypeList" :key="type.id" :label="type.typeName" :value="type.id"> </el-option>
                </el-select>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 商品子类型 -->
                <div class="rowItemLabel">{{Label.son_type}}</div>
                <el-select class="nameInput rowInput" v-model="propsData.son_type" :placeholder="placeholderObj.son_type" >
                    <el-option v-for="item in goodsSubTypeList" :key="item.id" :label="item.subTypeName" :value="item.id"> </el-option>
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
                barCode:"商品条码",
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
                barCode:"请输入商品条码",
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
            showSubType:true,//展示子类型选择框
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
        goodsSubTypeList:function(){
            // 商品小类
            let meta = this.$store.state.spaAccount.meta;
            let that = this;
            meta = meta || {goodsSubTypeList:[]};
            let allSubTypes = meta.goodsSubTypeList;
            if(allSubTypes && allSubTypes.length){
                this.showSubType = true;
            }else{
                this.showSubType = false;
            }
            let bool = false;
            let sonTypes = allSubTypes.filter(function(subType){
                if(subType.typeId == that.propsData.type && subType.id == that.propsData.son_type){
                    bool = true;
                }
                return subType.typeId == that.propsData.type;
            })
            if(!bool){
                that.propsData.son_type = null;
            }
            return sonTypes;
        },
    },
    beforeMount:function(){
        // 获取单位、规格
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

