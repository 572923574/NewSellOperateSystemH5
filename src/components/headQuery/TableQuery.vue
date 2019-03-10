<template>
    <!-- 查询头部输入框 -->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="queryObj">
            <el-form-item>
                <el-input v-model="queryObj.searchKey" :placeholder="queryObj.searchText"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="queryListFn">查询</el-button>
            </el-form-item>
            <el-form-item>
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
