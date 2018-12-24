<template>
    <div class="headDiv">
        <div class="searchDiv">
            <el-input :placeholder="searchText" prefix-icon="el-icon-search" v-model="searchKey">
            </el-input>
        </div>
        <div class="searchBtnDiv">
            <el-button icon="el-icon-search" @click="queryList">查询</el-button>
        </div>
        <div class="addBtnDiv">
            <el-button icon="el-icon-plus" @click="addFn">新增</el-button>
        </div>
    </div>
</template>
<script>
export default {
    date(){
        return{
            searchText:"输入名称或手机号查询",//搜索提示
			searchKey:"",//搜索输入内容
        }
    }
}
</script>
<style lang="less" scoped>
.headDiv{
    padding: 0px 10px;
    height: 30px;
    margin-bottom:10px;
    .searchDiv{
        width: 180px;
        float: left;
    }
    .searchBtnDiv{
        float: left;
        margin-left: 10px;
    }
    .addBtnDiv{
        float: left;
        margin-left: 10px;
    }
}
</style>


