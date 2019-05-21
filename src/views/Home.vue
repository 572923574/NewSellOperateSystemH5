<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <!-- 左上角店铺名称 -->
      <el-col :span="10" :class="collapsed?'logo-collapse-width logo':'logo-width logo'">
        <span v-show="collapsed"></span>
        <span v-show="!collapsed">{{shop.name}}</span>
      </el-col>
      <!-- 收缩左侧菜单栏标志 -->
      <el-col :span="10">
        <div class="tools" @click.prevent="collapseFn">
          <i :class="collapsed?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
        </div>
      </el-col>
      <!-- 右侧顶部退出登录 logo -->
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <!-- <img :src="this.sysUserAvatar"> -->
            {{spaAccount.name}}{{spaAccount.mobile}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>我的消息</el-dropdown-item> -->
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <!--导航菜单-->
      <el-menu
        :default-active="defaultActive"
        class="leftMenu el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="collapsed"
        unique-opened
        router
        :collapse-transition="false"
      >
        <template v-for="(item,index) in $router.options.routes">
          <el-submenu :index="index+''" v-if="!item.leaf && !item.hidden" :key="index">
            <template slot="title">
              <i :class="item.iconCls"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <template v-for="child in item.children">
              <el-menu-item
                :index="child.path"
                :key="child.path"
                v-if="!child.hidden"
              >{{child.name}}</el-menu-item>
            </template>
          </el-submenu>
        </template>
      </el-menu>
      <!-- 右侧显示列表 -->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <!-- 列表区域 -->
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import Api from "@/common/api/api.js";
export default {
  data() {
    return {
      // 门店信息
      shop: {
        name: "盛传新零售"
      },
      // 默认选择
      defaultActive: "/GoodsTable",
      collapsed: false, //左侧导航栏折叠还是展开
      spaAccount: {
        name: "李建"
      },
      sysUserAvatar: ""
    };
  },
  beforeMount() {
    if (
      this.$router.history &&
      this.$router.history.current &&
      this.$router.history.current.path
    ) {
      this.defaultActive = this.$router.history.current.path;
    }
    this.defaultActive = this.defaultActive || "/GoodsTable";
    //获取账号信息
    this.spaAccount = this.$store.state.spaAccount;
  },
  methods: {
    //退出登录
    logout: function() {
      var that = this;
      this.$confirm("确认退出吗?", "提示", {})
        .then(() => {
          that.goLogin();
        })
        .catch(() => {});
    },
    // 退出登录，跳转页面
    goLogin: function() {
      Api.loginOut({}, () => {
        this.$store.commit("setSpaAccount", {});
        sessionStorage.clear();
        this.$router.push({ path: "/Login" });
      });
    },
    //折叠导航栏
    collapseFn: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: @color-primary;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 200px;
    }
    .logo-collapse-width {
      width: 65px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    // display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    .leftMenu:not(.el-menu--collapse) {
      width: 200px;
    }
    .el-menu {
      height: 100%;
      float: left;
    }

    .content-container {
      //   flex: 1;
      overflow-y: scroll;
      padding: 20px;
      height: 100%;
      box-sizing: border-box;
      .grid-content {
        width: 100%;
        height: 100%;
        .breadcrumb-container {
          height: 20px;
          line-height: 20px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          height: calc(100% - 20px);
          width: 100%;
          position: relative;
          background-color: #fff;
          box-sizing: border-box;
          overflow: hidden;
        }
      }
    }
  }
}
</style>