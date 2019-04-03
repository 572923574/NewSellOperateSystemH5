<template>
    <!-- 查询头部输入框 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="queryObj">
            <el-form-item>
                <el-input v-model="queryObj.searchKey" :placeholder="queryObj.searchText"></el-input>
            </el-form-item>
            <el-select class="querySelect" v-model="queryObj.selectKey" placeholder="请选择" v-if="queryObj.showSelect">
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
  props: ["queryObj"], //弹框数据
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
.querySelect{
    width: 150px;
    margin: 0px 10px 10px 0px;
}
</style>

