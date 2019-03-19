<template>
    <!-- 新增编辑商户优惠 -->
    <div class="allWidth">
        <div class="formRow">
            <div class="formRowItem">
                <!-- 优惠类型 -->
                <div class="rowItemLabel">{{Label.type}}</div>
                <el-select
                    class="nameInput rowInput"
                    v-model="propsData.type"
                    :placeholder="placeholderObj.type"
                >
                    <el-option
                        v-for="type in typeList"
                        :key="type.value"
                        :label="type.label"
                        :value="type.value"
                    ></el-option>
                </el-select>
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
                <!-- 优惠达成条件：满多少钱、满多少件 -->
                <div class="rowItemLabel">{{Label.condition}}</div>
                <el-radio-group v-model="condition" class="conditionClass">
                    <el-radio-button label="1">{{Label.maxMoney}}</el-radio-button>
                    <el-radio-button label="2">{{Label.num}}</el-radio-button>
                </el-radio-group>
                <el-input
                    class="nameInput rowInput"
                    :v-model="condition ==1?propsData.maxMoney:propsData.num"
                    :placeholder="condition ==1?placeholderObj.maxMoney:placeholderObj.num"
                ></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 优惠金额、折扣 -->
                <div class="rowItemLabel">{{Label.content}}</div>
                <el-radio-group v-model="content" class="conditionClass">
                    <el-radio-button label="1">{{Label.preFee}}</el-radio-button>
                    <el-radio-button label="2">{{Label.discount}}</el-radio-button>
                </el-radio-group>
                <el-input
                    class="nameInput rowInput"
                    :v-model="content ==1?propsData.preFee:propsData.discount"
                    :placeholder="content ==1?placeholderObj.preFee:placeholderObj.discount"
                ></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 优惠开始时间 -->
                <div class="rowItemLabel">{{Label.startTime}}</div>
                <el-date-picker
                    class="nameInput rowInput"
                    v-model="propsData.startTime"
                    type="date"
                    :placeholder="placeholderObj.startTime"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp"
                ></el-date-picker>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 优惠结束时间 -->
                <div class="rowItemLabel">{{Label.endTime}}</div>
                <el-date-picker
                    class="nameInput rowInput"
                    v-model="propsData.endTime"
                    type="date"
                    :placeholder="placeholderObj.endTime"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="timestamp"
                ></el-date-picker>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 描述 -->
                <div class="rowItemLabel">{{Label.describeText}}</div>
                <el-input
                    class="nameInput rowInput"
                    v-model="propsData.describeText"
                    :placeholder="placeholderObj.describeText"
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
      img: "",
      showCropper: false,
      // label对象
      Label: {
        name: "优惠名称",
        type: "优惠类型",
        num: "达标数量",
        condition: "优惠生效条件",
        content: "优惠内容",
        maxMoney: "达标金额",
        preFee: "优惠金额",
        discount: "优惠折扣",
        startTime: "开始时间",
        endTime: "结束时间",
        describeText: "优惠描述",
        status: "状态"
      },
      // placeholder提示对象
      placeholderObj: {
        name: "请输入优惠名称",
        type: "请选择优惠类型",
        num: "满多少件优惠才生效",
        maxMoney: "满多少金额优惠才生效",
        preFee: "优惠金额",
        discount: "优惠折扣",
        startTime: "优惠开始时间",
        endTime: "优惠结束时间",
        describeText: "请输入优惠描述",
        status: "状态"
      },
      //状态集合
      statusList: [
        {
          value: "0",
          label: "正常"
        },
        {
          value: "1",
          label: "禁用"
        },
        {
          value: "-1",
          label: "删除"
        }
      ],
      typeList: [
        {
          label: "满减优惠",
          value: "0"
        }
      ],
      condition: 1, //1满金额，2满件数
      content: 1 //1优惠金额，2优惠折扣
    };
  },

  props: ["propsData"],
  computed: {},
  beforeMount: function() {
    // 默认选择优惠类型
    this.propsData.type = "0";
  },
  methods: {
    getImgs(data) {
      this.img = data;
      this.showCropper = false;
      console.log("data=========", data);
    },
    uploadImg() {
      this.showCropper = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    xiuxiuFn: function() {
      this.type = 1;
      this.$refs.xiuxiu.xiuxiuShow();
    },
    xiuxiuDetailFn: function() {
      this.type = 2;
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
.allWidth {
  width: 100%;
}
.conditionClass {
  float: left;
  margin-left: 10px;
}
.formRow {
  // 表单行
  width: 100%;
  display: block;

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

  .rightImgDiv {
    .addImg {
      margin: 6px 10px !important;
      float: left;
    }
    .spaImgDiv {
      width: 150px;
      height: 150px;
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
</style>