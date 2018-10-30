<template>
    <div id="app">
        <el-col :span="3">
            <Menu></Menu>
        </el-col>
        <el-col :span="21">
            <router-view></router-view>
        </el-col>
    </div>
</template>

<script>
import Menu from "@/views/menu/Menu.vue";

export default {
  name: "app",
  components: {
    Menu
  }
};
</script>

<style lang="less">
html,body {
  height: 100%;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  font-size: 12px;
  >div{
    height: 100%;
  }
}
* {
  margin: 0px;
  padding: 0px;
}
</style>
