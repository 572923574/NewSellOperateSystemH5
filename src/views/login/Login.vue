<template>
    <!-- 登陆spa页面 -->
    <div class="loginPage">
        <div class="loginDiv" v-loading="btnLoad">
            <div class="titleDiv">{{spaTitle}}</div>
            <div class="mobileDiv">
                <el-input :placeholder="placeholderObj.mobile" prefix-icon="el-icon-phone" v-model="body.mobile">
                </el-input>
            </div>
            <div class="passwordDiv">
                <el-input :placeholder="placeholderObj.password" prefix-icon="el-icon-password" type="password" v-model="body.password">
                </el-input>
            </div>
            <div class="btnDiv">
                <el-button class="btnClass" @click="loginFn" :loading="btnLoad">{{textObj.login}}</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import Api from '@/common/api/api.js';
export default {
    data() {
        return {
            spaTitle: "登录Spa",
            // 输入框提示
            placeholderObj:{
                mobile:"请输入手机号码",
                password:"请输入登录密码",
            },
            textObj:{
                login:"登录",
            },
            body:{
                mobile:"",
                password:"",
            },
            btnLoad:false,//登陆按钮是否loading
        };
    },
    methods:{
        loginFn(){
            let that = this;//声明全局this指针
            // 登录
            this.btnLoad = true;
            Api.Login({
                body:this.body
            },function(resp){
                that.btnLoad = false;
                if(resp.result == 0){
                    that.$store.commit('setSpaAccount',resp.body);
                    sessionStorage.setItem('spaAccount',JSON.stringify(resp.body));
                    //登陆成功，跳转到商品列表界面
                    that.$router.push({ path: "/GoodsTable" });
                }
            },function(error){
                that.btnLoad = false;
            },that);
        }
    }
};
</script>

<style lang="less" scoped>
.loginPage {
    position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    z-index: 199;
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
            font-size: 12px;
            .btnClass{
                font-size: 12px;
            }
        }
    }
}
</style>

