<template>
  <!-- 新增编辑商品 -->
  <div class="formPage">
    <div class="formRow">
      <div class="formRowItem">
        <!-- 编号 -->
        <div class="rowItemLabel">{{Label.no}}</div>
        <el-input
          class="nameInput rowInput"
          v-model="propsData.no"
          :placeholder="placeholderObj.no"
        ></el-input>
      </div>
    </div>
    <div class="formRow">
      <div class="formRowItem">
        <!-- 名称 -->
        <div class="rowItemLabel">{{Label.name}}</div>
        <el-input
          class="nameInput rowInput"
          v-model="propsData.name"
          :placeholder="placeholderObj.name"
        ></el-input>
      </div>
    </div>

    <div class="formRow">
      <div class="formRowItem">
        <!-- 商品类型 -->
        <div class="rowItemLabel">{{Label.type}}</div>
        <el-select
          class="nameInput rowInput"
          v-model="propsData.type"
          :placeholder="placeholderObj.type"
        >
          <el-option
            v-for="type in goodsTypeList"
            :key="type.id"
            :label="type.typeName"
            :value="type.id"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="formRow">
      <div class="formRowItem">
        <!-- 商品初始售出数量 -->
        <div class="rowItemLabel">{{Label.saleNum}}</div>
        <el-input
          class="nameInput rowInput"
          v-model="propsData.saleNum"
          :placeholder="placeholderObj.saleNum"
          :disabled="!!propsData.id"
        ></el-input>
      </div>
    </div>
    <div class="formRow">
      <div class="formRowItem">
        <!-- 商品初始数量 -->
        <div class="rowItemLabel">{{Label.num}}</div>
        <el-input
          class="nameInput rowInput"
          v-model="propsData.num"
          :placeholder="!!propsData.id?placeholderObj.num:placeholderObj.numStart"
          :disabled="!!propsData.id"
        ></el-input>
      </div>
    </div>
    <div class="formRow">
      <div class="formRowItem">
        <!-- 商品进货价 -->
        <div class="rowItemLabel">{{Label.buyingPrice}}</div>
        <el-input
          class="nameInput rowInput"
          v-model="propsData.buyingPrice"
          :placeholder="placeholderObj.buyingPrice"
        ></el-input>
      </div>
    </div>
    <div class="formRow">
      <div class="formRowItem">
        <!-- 商品成本价 -->
        <div class="rowItemLabel">{{Label.costPrice}}</div>
        <el-input
          class="nameInput rowInput"
          v-model="propsData.costPrice"
          :placeholder="placeholderObj.costPrice"
        ></el-input>
      </div>
    </div>
    <div class="formRow">
      <div class="formRowItem">
        <!-- 商品原价 -->
        <div class="rowItemLabel">{{Label.salePrice}}</div>
        <el-input
          class="nameInput rowInput"
          v-model="propsData.salePrice"
          :placeholder="placeholderObj.salePrice"
        ></el-input>
      </div>
    </div>
    <div class="formRow">
      <div class="formRowItem">
        <!-- 商品优惠售价 -->
        <div class="rowItemLabel">{{Label.preferencePrice}}</div>
        <el-input
          class="nameInput rowInput"
          v-model="propsData.preferencePrice"
          :placeholder="placeholderObj.preferencePrice"
        ></el-input>
      </div>
    </div>
    <div class="formRow" v-if="propsData.id">
      <div class="formRowItem">
        <!-- 状态 -->
        <div class="rowItemLabel">{{Label.status}}</div>
        <el-select
          class="nameInput rowInput"
          v-model="propsData.status"
          :placeholder="placeholderObj.status"
        >
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="formRow shareRow">
      <div class="formRowItem">
        <!-- 启用分享立减 -->
        <div class="rowItemLabel">
          <el-checkbox v-model="propsData.shareEnable">启用分享立减</el-checkbox>
        </div>
        <el-input
          class="nameInput rowInput"
          v-model="propsData.shareReduce"
          :placeholder="placeholderObj.shareReduce"
        ></el-input>元
      </div>
    </div>
    <!-- 团购 -->
    <div class="formRow groupBuyingRow">
      <div class="formRowItem">
        <!-- 启用团购 -->
        <div class="rowItemLabel">
          <el-checkbox v-model="propsData.groupBuyingEnable">启用团购方案</el-checkbox>
        </div>
        <el-input
          class="nameInput rowInput groupBuyingNumber"
          v-model="propsData.groupBuyingNumber"
          :placeholder="placeholderObj.groupBuyingNumber"
        ></el-input>
        <div class="groupText">人团购价</div>
        <el-input
          class="nameInput rowInput groupBuyingPrice"
          v-model="propsData.groupBuyingPrice"
          :placeholder="placeholderObj.groupBuyingPrice"
        ></el-input>

        <div class="groupText">元,</div>
        <el-input
          class="nameInput rowInput groupBuyingTime"
          v-model="propsData.groupBuyingTime"
          :placeholder="placeholderObj.groupBuyingTime"
        ></el-input>
        <div class="groupText">小时内成团,否则</div>
        <el-radio-group v-model="propsData.groupBuyingOverTime" class="groupBuyingOverTimeClass">
          <el-radio-button label="0">自动成团</el-radio-button>
          <el-radio-button label="1">自动退款</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="formRow describeTextRow">
      <div class="formRowItem">
        <!-- 描述 -->
        <div class="rowItemLabel">{{Label.describeText}}</div>
        <el-input
          class="nameInput rowInput describeText"
          v-model="propsData.describeText"
          type="textarea"
          maxlength="20"
          :placeholder="placeholderObj.describeText"
        ></el-input>
      </div>
    </div>
    <div class="formRow imageRow">
      <div class="formRowItem">
        <!-- 商品主照片 -->
        <div class="rowItemLabel">{{Label.goodsImg}}</div>
        <div class="rightImgDiv">
          <el-button
            class="addImg"
            size="small"
            type="primary"
            @click="xiuxiuFn"
          >{{Label.uploadImg}}</el-button>
          <div class="imgList">
            <div
              class="spaImgDiv"
              @mouseover="ImgOverFn"
              @mousemove="ImgMoveFn"
              v-for="(spaImg,index) in propsData.goodsImgs"
              :key="index"
            >
              <img :src="spaImg.imgUrl" alt class="spaImg">
              <div class="deleteImg" @click="deleteImg(spaImg,index)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="formRow imageRow">
      <div class="formRowItem">
        <!-- 商品详情照片 -->
        <div class="rowItemLabel">{{Label.goodsDetailImg}}</div>
        <div class="rightImgDiv">
          <el-button
            class="addImg"
            size="small"
            type="primary"
            @click="xiuxiuDetailFn"
          >{{Label.uploadImg}}</el-button>
          <div class="imgList">
            <div
              class="spaImgDiv"
              @mouseover="ImgOverFn"
              @mousemove="ImgMoveFn"
              v-for="(spaImg,index) in propsData.goodsDetailImgs"
              :key="index"
            >
              <img :src="spaImg.imgUrl" alt class="spaImg">
              <div class="deleteImg" @click="deleteDetailImg(spaImg,index)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <XiuXiu ref="xiuxiu" @returnImg="returnImgFn" :height="800" :width="800" :pixel="pixel"></XiuXiu>
  </div>
</template>
<script>
// import Constant from "@/common/constant/constant.js";
import XiuXiu from "@/components/ImgComponents/XiuXiuImg.vue";
export default {
  components: {
    XiuXiu
  },
  data() {
    return {
      // label对象
      Label: {
        name: "商品名称",
        no: "商品编号",
        type: "商品类型",
        son_type: "商品子类型",
        barCode: "商品条码",
        numStart: "初始数量",
        num: "商品数量",
        saleNum: "已售数量",
        buyingPrice: "进货价",
        costPrice: "成本价",
        salePrice: "商品原价",
        preferencePrice: "优惠售价",
        unit: "商品单位",
        spec: "商品规格",
        goodsCompanyId: "商品品牌",
        supplierId: "供货商",
        goodsImg: "商品照片",
        goodsDetailImg: "商品详情照片",
        uploadImg: "上传图片",
        status: "商品状态",
        describeText: "商品描述"
      },
      // placeholder提示对象
      placeholderObj: {
        name: "请输入商品名称",
        no: "请输入商品编号",
        type: "请选择商品类型",
        son_type: "请选择商品子类型",
        barCode: "请输入商品条码",
        numStart: "请输入初始数量",
        num: "请输入商品数量",
        saleNum: "请输入已售商品数量",
        buyingPrice: "请输入进货价",
        costPrice: "请输入成本价",
        salePrice: "请输入商品原价",
        preferencePrice: "请输入优惠售价",
        unit: "请选择商品单位",
        spec: "请选择商品规格",
        goodsCompanyId: "请选择商品品牌",
        supplierId: "请选择供货商",
        status: "请输入商品状态",
        describeText: "请输入商品描述"
      },
      //状态集合
      statusList: [
        {
          value: "0",
          label: "正常"
        },
        {
          value: "1",
          label: "停售"
        },
        {
          value: "2",
          label: "删除"
        }
      ],
      unitList: [], //单位集合
      specList: [], //规格数组
      supplierList: [], //供货商集合
      goodsCompanyList: [], //品牌公司集合
      showSubType: true, //展示子类型选择框
      type: 1, //1商品主图 2商品详情图
      pixel: "1500:1500"
    };
  },

  props: ["propsData"],
  computed: {
    goodsTypeList: function() {
      // 商品大类
      let meta = this.$store.state.spaAccount.meta;
      meta = meta || {
        goodsTypeList: []
      };
      return meta.goodsTypeList;
    }
  },
  beforeMount: function() {
    // 获取单位、规格
    // this.unitList = Constant.unitList;
    // this.specList = Constant.specList;
  },
  methods: {
    xiuxiuFn: function() {
      this.type = 1;
      this.pixel = "1500:1500";
      this.$refs.xiuxiu.xiuxiuShow();
    },
    xiuxiuDetailFn: function() {
      this.type = 2;
      this.pixel = "";
      this.$refs.xiuxiu.xiuxiuShow();
    },
    //美图秀秀上传返回的图片
    returnImgFn(spaImg) {
      if (this.type == 1) {
        spaImg.type = "1"; //商品主图
        this.propsData.goodsImgs.push(spaImg); //上传图片
      } else {
        spaImg.type = "2"; //商品详情图
        this.propsData.goodsDetailImgs.push(spaImg); //上传图片
      }
    },
    deleteImg(spaImg, index) {
      this.propsData.goodsImgs.splice(index, 1);
    },
    deleteDetailImg(spaImg, index) {
      this.propsData.goodsDetailImgs.splice(index, 1);
    },
    ImgOverFn(spaImg) {
      spaImg.detele = true;
    },
    ImgMoveFn(spaImg) {
      spaImg.detele = false;
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  .formRow {
    // 表单行
    width: 50%;
    float: left;

    .formRowItem {
      height: 40px;
      padding-bottom: 10px;

      .rowItemLabel {
        // 输入框label
        width: 100px;
        float: left;
        line-height: 40px;
        text-align: right;
        padding: 0 10px;
        height: 40px;
      }

      .rowInput {
        width: 200px;
        float: left;
        margin: 0 10px;
      }

      .optGroup,
      .menuGroup {
        text-align: left;
      }
    }
    .groupText{
        float: left;
        line-height: 40px;
    }
    .rightImgDiv {
      .addImg {
        margin: 6px 10px !important;
        float: left;
      }

      .imgList {
        float: left;
        width: calc(100% - 90px);
        .spaImgDiv {
          width: 150px;
          height: auto;
          float: left;
          margin: 0px 10px 10px 0px;
          position: relative;
          .spaImg {
            width: 150px;
          }
          .deleteImg {
            position: absolute;
            top: 0px;
            right: 0px;
            width: 20px;
            height: 20px;
            background-color: red;
          }
        }
      }
    }
  }
  .shareRow.formRow {
    width: 100%;
  }
  .groupBuyingRow.formRow {
    width: 100%;
    .groupBuyingNumber {
      width: 100px;
      float: left;
    }
    .groupBuyingPrice {
      width: 100px;
      float: left;
    }
    .groupBuyingTime {
      width: 100px;
      float: left;
    }
    .groupBuyingOverTimeClass {
        margin-left: 10px;
      float: left;
    }
  }
  .describeTextRow.formRow {
    width: 100%;
  }
  .imageRow.formRow {
    width: 100%;
  }
}
</style>