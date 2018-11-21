<template>
    <!-- 新增、编辑账号弹框 -->
    <div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 名称 -->
                <div class="rowItemLabel">{{accountLabel.nameLabel}}</div>
                <el-input class="nameInput rowInput" v-model="accountData.name" :placeholder="placeholderObj.name"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 手机 -->
                <div class="rowItemLabel">{{accountLabel.mobileLabel}}</div>
                <el-input class="nameInput rowInput" v-model="accountData.mobile" :placeholder="placeholderObj.mobile"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 密码 -->
                <div class="rowItemLabel">{{accountLabel.passwordLabel}}</div>
                <el-input class="nameInput rowInput" v-model="accountData.password" :placeholder="placeholderObj.password"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 权限 -->
                <div class="rowItemLabel">{{accountLabel.rightLabel}}</div>
                <el-input class="nameInput rowInput" v-model="accountData.right" :placeholder="placeholderObj.right"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 状态 -->
                <div class="rowItemLabel">{{accountLabel.statusLabel}}</div>
                <el-input class="nameInput rowInput" v-model="accountData.status" :placeholder="placeholderObj.status"></el-input>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // label对象
            accountLabel:{
                nameLabel:"名称",
                mobileLabel:"手机",
                passwordLabel:"密码",
                rightLabel:"权限",
                statusLabel:"状态",
            },
            // 数据对象
            accountData:{
                name:'',
                mobile:"",
                password:"",
                right:"",
                status:"",
            },
            // placeholder提示对象
            placeholderObj:{
                name:'请输入名称',
                mobile:"请输入手机",
                password:"请输入密码",
                right:"请选择权限",
                status:"请输入名称",
            }
        }
    }
}
</script>

<style lang="less" scoped>
.formRow{
    // 表单行
    width: 100%;
    display: block;
    .formRowItem{
        height: 30px;
        padding-bottom: 10px;
        .rowItemLabel{
            // 输入框label
            width: 100px;
            float: left;
            line-height: 30px;
            text-align: right;
            padding: 0 10px;
        }
        .rowInput{
            width: 200px;
            float: left;
            margin:0 10px;
        }
    }
    
}
</style>

