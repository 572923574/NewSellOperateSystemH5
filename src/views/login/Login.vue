<template>
    <!-- 登录系统页面 -->
    <el-form
            :model="ruleForm2"
            :rules="rules2"
            ref="ruleForm2"
            label-position="left"
            label-width="0px"
            class="demo-ruleForm login-container"
    >
        <h3 class="title">{{textObj.title}}</h3>
        <el-form-item prop="mobile">
            <el-input
                    type="text"
                    v-model="ruleForm2.mobile"
                    auto-complete="off"
                    :placeholder="textObj.mobile"
            ></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input
                    type="password"
                    v-model="ruleForm2.password"
                    auto-complete="off"
                    :placeholder="textObj.password"
            ></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
            <el-button
                    type="primary"
                    style="width:100%;"
                    @click.native.prevent="loginFn"
                    :loading="logining"
            >{{textObj.login}}
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import Api from "@/common/api/api.js";

    export default {
        data() {
            return {
                logining: false,
                textObj: {
                    title: "系统登录",
                    login: "登录",
                    mobile: "手机号码",
                    password: "登录密码"
                },
                ruleForm2: {
                    mobile: "18682028219",
                    password: "2"
                },
                rules2: {
                    mobile: [
                        {required: true, message: "请输入手机号码", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: "请输入登录密码", trigger: "blur"}
                    ]
                }
            };
        },
        methods: {
            loginFn() {
                let that = this; //声明全局this指针
                // 登录
                this.logining = true;
                Api.Login(
                    {
                        mobile: this.ruleForm2.mobile,//手机号
                        password: this.ruleForm2.password,//密码
                    },
                    resp => {
                        this.logining = false;
                        if (resp.result == 0) {
                            // 储存账号信息
                            that.$store.commit("setSpaAccount", resp.body);
                            let meta = resp.body.meta;
                            that.$store.commit("updateState", meta);
                            sessionStorage.setItem("state", JSON.stringify(that.$store.state));
                            //登陆成功，跳转到商品列表界面
                            that.$router.push({path: "/GoodsTable"});
                        }
                    },
                    () => {
                        this.logining = false;
                    },
                    that
                );
            }
        }
    };
</script>
<style lang="less" scoped>
    @import '~@/style/app.less'; //全局变量存放的文件（要加~）
</style>
<style lang="less" scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;

        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }

        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>

