<template>
    <div>
        <div class="formRow">
            <div class="formRowItem">
                <div class="rowItemLabel">{{accountLabel.nameLabel}}</div>
                <el-input class="nameInput rowInput" v-model="input" placeholder="请输入内容"></el-input>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            accountLabel:{
                nameLabel:"名称",
            }
        }
    }
}
</script>

<style lang="less" scoped>
.rowItemLabel{
    // 输入框label
    width: 100px;
    float: left;
    line-height: 30px;
    text-align: right;
}
.rowInput{
    width: 200px;
    float: left;
    margin:0 10px;
}
</style>

