<template>
  <div class="SCInputDivClass">
    <el-input
      class="SCInputClass"
      v-model="inputItem"
      :placeholder="placeholder"
      @blur="inputBlurFn"
    ></el-input>
    <div class="errorMessage" v-if="showErrorMessage">{{errorMessage}}</div>
  </div>
</template>
<script>
import ValidatorFn from "@/common/js/validator";
export default {
  data() {
    return {
      errorMessage: "", //错误提示信息
      showErrorMessage: false, //是否展示错误提示信息 false 不展示 校验成功,true 展示 校验失败
      inputItem: "" //输入
    };
  },
  props: {
    inputData: {
      default: ""
    },
    placeholder: { default: "" },
    rules: { default: "" }
  },
  watch: {
    inputData: function(inputData) {
      this.inputItem = inputData;
    },
    inputItem(val) {
      this.$emit("update:inputData", val);
    }
  },
  methods: {
    /**
     * 失去焦点时校验
     */
    inputBlurFn: function() {
      let errorObj = ValidatorFn(this.rules,this.inputItem);
      this.errorMessage = errorObj.errorMessage; //错误提示语
      this.showErrorMessage = errorObj.showErrorMessage; //校验是否失败
    }
  }
};
</script>

