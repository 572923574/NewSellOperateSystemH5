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
        <!-- 优惠券适用范围 -->
        <div class="rowItemLabel">{{Label.useType}}</div>
        <el-select
          class="nameInput rowInput"
          v-model="propsData.useType"
          :placeholder="placeholderObj.useType"
        >
          <el-option
            v-for="useType in useTypeList"
            :key="useType.value"
            :label="useType.label"
            :value="useType.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="formRow" v-if="propsData.useType > 1">
      <div class="formRowItem">
        <!-- 优惠券适用商品 -->
        <div class="rowItemLabel">{{Label.useKey}}</div>
        <el-select
          class="nameInput rowInput"
          v-model="propsData.useKey"
          :placeholder="placeholderObj.useKey"
        >
          <el-option
            v-for="useKey in useKeyList"
            :key="useKey.id"
            :label="useKey.typeName"
            :value="useKey.id"
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
        <!-- 总优惠券数量 -->
        <div class="rowItemLabel">{{Label.totalNum}}</div>
        <el-input
          class="nameInput rowInput"
          v-model="propsData.totalNum"
          :placeholder="placeholderObj.totalNum"
        ></el-input>
      </div>
    </div>
    <div class="formRow">
      <div class="formRowItem">
        <!-- 剩余优惠券数量 -->
        <div class="rowItemLabel">{{Label.oddNum}}</div>
        <el-input
          class="nameInput rowInput"
          v-model="propsData.oddNum"
          :placeholder="placeholderObj.oddNum"
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
          v-if="condition ==1"
          class="nameInput rowInput"
          v-model="propsData.maxMoney"
          :placeholder="placeholderObj.maxMoney"
        ></el-input>
        <el-input
          v-else
          class="nameInput rowInput"
          v-model="propsData.num"
          :placeholder="placeholderObj.num"
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
          v-if="content ==1"
          class="nameInput rowInput"
          v-model="propsData.preFee"
          :placeholder="placeholderObj.preFee"
        ></el-input>
        <el-input
          v-else
          class="nameInput rowInput"
          v-model="propsData.discount"
          :placeholder="placeholderObj.discount"
        ></el-input>
      </div>
    </div>
    <div class="formRow">
      <div class="formRowItem">
        <!-- 优惠开始时间 -->
        <div class="rowItemLabel">{{Label.startTime}}</div>
        <el-date-picker
          class="timeInput rowInput"
          v-model="propsData.startTime"
          type="date"
          :placeholder="placeholderObj.startTime"
          format="yyyy 年 MM 月 dd 日 HH:mm:ss"
          value-format="timestamp"
        ></el-date-picker>
      </div>
    </div>
    <div class="formRow">
      <div class="formRowItem">
        <!-- 优惠结束时间 -->
        <div class="rowItemLabel">{{Label.endTime}}</div>
        <el-date-picker
          class="timeInput rowInput"
          v-model="propsData.endTime"
          type="date"
          :placeholder="placeholderObj.endTime"
          format="yyyy 年 MM 月 dd 日 HH:mm:ss"
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
        status: "状态",
        useType: "适用范围",
        useKey: "适用商品",
        totalNum: "优惠券总数量",
        oddNum: "优惠券剩余数量"
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
        status: "状态",
        useType: "请选则优惠券适用范围",
        useKey: "请选则优惠券适用商品",
        totalNum: "请输入优惠券优惠券总数量",
        oddNum: "请输入优惠券优惠券剩余数量"
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
      useTypeList: [
        {
          label: "全部商品",
          value: "0"
        },
        {
          label: "非活动商品",
          value: "1"
        },
        {
          label: "某类商品",
          value: "2"
        },
        {
          label: "某个商品",
          value: "3"
        }
      ],
      condition: 1, //1满金额，2满件数
      content: 1 //1优惠金额，2优惠折扣
    };
  },

  props: ["propsData"],
  computed: {
    useKeyList: {
      get() {
        let useKeyList = [];
        if (this.propsData.useType == "2") {
          //指定类型商品
          let meta = this.$store.state.spaAccount.meta;
          meta = meta || {
            goodsTypeList: []
          };
          useKeyList = meta.goodsTypeList;
        } else if (this.propsData.useType == "3") {
          //指定单个商品
        }
        return useKeyList;
      },
      set(newValue) {
        return newValue;
      }
    }
  },
  watch: {
    propsData: {
      handler(cval, oval) {
        this.useKeyList = [];
        if (this.propsData.useType == "2") {
          //指定类型商品
          let meta = this.$store.state.spaAccount.meta;
          meta = meta || {
            goodsTypeList: []
          };
          this.useKeyList = meta.goodsTypeList;
        } else if (this.propsData.useType == "3") {
          //指定单个商品
        }
        this.useKeyList = this.useKeyList.concat();
        cval = Object.assign({}, cval);
      },
      deep: true
    }
  },
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
#app .formRow {
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
    .rowInput.timeInput {
      width: 250px;
    }

    .optGroup,
    .menuGroup {
      text-align: left;
    }
  }
}
</style>