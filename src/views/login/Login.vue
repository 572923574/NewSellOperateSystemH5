<template>
  <!-- 登录系统页面 -->
  <div class="loginPage">
    <div class="loginLogo"></div>
    <div class="loginBg"></div>
    <div class="demo-ruleForm login-container">
      <h3 class="title">{{textObj.title}}</h3>

      <SCInput
        :inputData.sync="Account.mobile"
        :placeholder="textObj.mobile"
        rules="required phone"
      ></SCInput>
      <SCInput
        :inputData.sync="Account.password"
        :placeholder="textObj.password"
        :inputHeight="46"
        :bottomHeight="30"
        rules="required"
      ></SCInput>
      <el-button
        type="primary"
        style="width:100%;"
        class="loginBtn"
        @click.native="loginFn"
        :loading="logining"
      >{{textObj.login}}</el-button>
    </div>
  </div>
</template>
<script>
import Api from "@/common/api/api.js";
export default {
  data() {
    return {
      logining: false,
      textObj: {
        title: "盛传新零售运营系统",
        login: "登录",
        mobile: "手机号码",
        password: "请输入密码"
      },
      Account: {
        mobile: "",
        password: ""
      },
      ruleForm2: {
        mobile: "18682028219",
        password: "2"
      }
    };
  },
  methods: {
    loginFn() {
      let that = this; //声明全局this指针
      // 登录
      this.logining = true;
      //校验表单是否填写正确
      let errorObj = this.$checkAll();
      if (!errorObj.showErrorMessage) {
        Api.Login(
          {
            mobile: this.Account.mobile, //手机号
            password: this.Account.password //密码
          },
          resp => {
            this.logining = false;
            if (resp.result == 0) {
              // 储存账号信息
              that.$store.commit("setSpaAccount", resp.body);
              let meta = resp.body.meta;
              that.$store.commit("updateState", meta);
              sessionStorage.setItem(
                "state",
                JSON.stringify(that.$store.state)
              );
              //登陆成功，跳转到商品列表界面
              that.$router.push({ path: "/GoodsTable" });
            }
          },
          () => {
            this.logining = false;
          },
          that
        );
      } else {
        this.logining = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/style/app.less"; //全局变量存放的文件（要加~）
</style>
<style lang="less" scoped>
.loginPage {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .loginLogo {
    position: fixed;
    right: 50%;
    background: url("~@/assets/images/login/loginLo.png") no-repeat;
    z-index: 10;
    margin: auto auto;
    width: 400px;
    height: 400px;
    transform: translate(0px, 50%);
  }
  .loginBg {
    background: url("~@/assets/images/login/loginBg.png") no-repeat;
    z-index: 9;
    position: fixed;
    bottom: 0px;
    right: -45px;
    width: 1125px;
    height: 634px;
  }
  .login-container {
    margin-left: calc(50% + 20px);
    z-index: 11;
    position: relative;
    transform: translate(0, 190px);
    width: 448px;
    height: 420px;
    box-sizing: border-box;
    padding: 0px 67px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 59px 0px rgba(73, 107, 148, 0.21);
    border-radius: 10px;
    .title {
      padding: 78px 0 40px 0;
      margin: 0px;
      width: 100%;
      height: 17px;
      line-height: 17px;
      text-align: center;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      color: #3b3e45;
    }
    .loginBtn {
      height: 46px;
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 600;
      color: #f5f5f5;
    }
  }
}
</style>

