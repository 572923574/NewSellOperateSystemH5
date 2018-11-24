<template>
    <!-- 登陆spa页面 -->
    <div class="loginPage">
        <div class="loginDiv">
            <div class="titleDiv">{{spaTitle}}</div>
            <div class="mobileDiv">
                <el-input :placeholder="placeholderObj.mobile" prefix-icon="el-icon-phone" v-model="body.mobile">
                </el-input>
            </div>
            <div class="passwordDiv">
                <el-input :placeholder="placeholderObj.password" prefix-icon="el-icon-password" v-model="body.password">
                </el-input>
            </div>
            <div class="btnDiv">

            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            spaTitle: "登录Spa",
            // 输入框提示
            placeholderObj:{
                mobile:"请输入手机号码",
                password:"请输入登录密码",
            },
            body:{
                mobile:"",
                password:"",
            }
        };
    },
};
</script>

<style lang="less" scoped>
.loginPage {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 9999;
    background-color: #545c64;
    .loginDiv {
        height: 170px;
        width: 20%;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-left: -100px;
        margin-top: -200px;
        background-color: #fff;
        border-radius: 10px;
        border: 1px solid #f8f8f8;
        padding: 10px;
        .titleDiv {
            height: 30px;
            font-size: 14px;
            line-height: 30px;
            font-weight: bold;
            margin-top: 10px;
        }
        .mobileDiv {
            height: 30px;
            line-height: 30px;
            margin-top: 10px;
            padding: 0px 15%;
        }
        .passwordDiv {
            height: 30px;
            line-height: 30px;
            margin-top: 10px;
            padding: 0px 15%;
        }
        .btnDiv {
            height: 30px;
            line-height: 30px;
            margin-top: 10px;
        }
    }
}
</style>

