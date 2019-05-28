<template>
  <div
    :class="showErrorMessage?'SCInputDivClass SCDivClassHeight':'SCInputDivClass' "
    :style="{'height':(inputHeight + bottomHeight)+'px'}"
  >
    <el-input
      :class="showErrorMessage?'SCInputClass errorBoder':'SCInputClass' "
      :style="{'height':inputHeight+'px'}"
      v-model="inputItem"
      :placeholder="placeholder"
      @blur.native="inputBlurFn"
      :rules="rules"
    ></el-input>
    <div class="errorMessage" v-if="showErrorMessage" :style="{'height':bottomHeight+'px','line-height':bottomHeight+'px'}">{{errorMessage}}</div>
  </div>
</template>
<script>
// 校验文件 方法
// import ValidatorFn from "@/common/js/validator";
export default {
  data() {
    return {
      errorMessage: "", //错误提示信息
      showErrorMessage: false, //是否展示错误提示信息 false 不展示 校验成功,true 展示 校验失败
      inputItem: "" //输入
    };
  },
  props: {
    //输入框双向绑定的值
    inputData: {
      default: ""
    },
    //输入框默认高度
    inputHeight: {
      default: 46,
      type: Number
    },
    //底部留白默认高度
    bottomHeight: {
      default: 30,
      type: Number
    },
    placeholder: { default: "" },
    // 校验规则字符串 rules="required phone" 校验手机号码不为空
    rules: { default: "" }
  },
  watch: {
    inputData: function (inputData) {
      this.inputItem = inputData;
    },
    inputItem(val) {
      this.$emit("update:inputData", val);
    }
  },
  mounted: function () {
    $(this.$el)
      .find("input")
      .on("blur", this.inputBlurFn);
  },
  methods: {
    /**
     * 失去焦点时校验
     */
    inputBlurFn: function () {
      let errorObj = this.$ValidatorFn(this.rules, this.inputItem);
      this.errorMessage = errorObj.errorMessage; //错误提示语
      this.showErrorMessage = errorObj.showErrorMessage; //校验是否失败
    }
  }
};
</script>
<style lang="less">
.SCInputDivClass {
  height: 50px;
  .SCInputClass {
    input {
      height: 100%;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(211, 215, 225, 1);
      border-radius: 4px;
    }
    // height: 40px;
  }
  .SCInputClass.errorBoder input {
    border: 1px solid #e33f4c;
  }
  .errorMessage {
    font-size: 12px;
    color: #e33f4c;
    width:100%;
    text-align: left;
font-family:MicrosoftYaHei;
font-weight:400;
  }
}
.SCDivClassHeight {
  height: 65px;
}
</style>

