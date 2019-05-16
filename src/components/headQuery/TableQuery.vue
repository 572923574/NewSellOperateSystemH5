<template>
  <!-- 查询头部输入框 -->
  <el-col :span="24" class="querybar" style="padding-bottom: 0px;">
    <el-form :inline="true" :model="queryObj">
      <el-form-item>
        <!-- <el-input v-model="queryObj.searchKey" :placeholder="queryObj.searchText"></el-input> -->
        <SCInput
          :inputData.sync="queryObj.searchKey"
          :placeholder="queryObj.searchText"
          :rules="rules"
        ></SCInput>
      </el-form-item>
      <el-select
        class="querySelect"
        v-model="queryObj.selectKey"
        placeholder="请选择"
        v-if="queryObj.showSelect"
      >
        <el-option
          v-for="item in queryObj.selectList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-form-item>
        <el-button type="primary" v-on:click="queryListFn">查询</el-button>
      </el-form-item>
      <el-form-item v-if="!queryObj.hideAdd">
        <el-button type="primary" @click="addFn">新增</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>
<script>
export default {
  props: {
    //弹框数据
    queryObj: {
      default: {
        searchText: "", //输入框placeholder
        showSelect: false, //是否显示下来框
        selectKey: "", //下拉选中的值
        selectList: [], //下拉数组
        searchKey: "", //输入框输入的内容
        hideAdd: false //隐藏新增按钮
      }
    },
    // 校验规则字符串 rules="required phone" 校验手机号码不为空
    rules: { default: "" }
  },
  methods: {
    queryListFn: function() {
      this.$emit("queryListFn");
    },
    addFn: function() {
      this.$emit("addFn");
    }
  }
};
</script>
<style lang="less" scoped>
.querybar {
  background: #f2f2f2;
  padding: 10px;
  margin: 10px 0px;
  .querySelect {
    width: 150px;
    margin: 0px 10px 10px 0px;
  }
}
</style>

