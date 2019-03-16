<template>
    <div class="xiuXiuPage" v-show="showXiuXiu" @click="showXiuXiu = false">
        <!-- 图片上传遮罩层 -->
        <div id="xiuxiuEditor"></div>
    </div>
</template>

<script>
import Api from "@/common/api/api.js";
var Qiniu = require("qiniu-js");
var Base64 = require("js-base64").Base64;
var URLSafeBase64 = require("urlsafe-base64");
var hmacsha1 = require("hmacsha1");
export default {
  data() {
    return {
      showXiuXiu: false, //展示美图秀秀页面
      pixel: "1500x700" //像素 "1500x700",比例 "16:9"
    };
  },
  props: ["width", "height"],
  beforeMount() {
    (this.width = this.width || "800"), (this.height = this.height || "800");
    let spaAccount = this.$store.state.spaAccount;
    let fileName = spaAccount.eid + "-" + spaAccount.appid + "-";
    xiuxiu.setLaunchVars("cameraEnabled", 0); //禁用摄像头
    xiuxiu.setLaunchVars("customMenu", []); //隐藏左侧的优化
    xiuxiu.setLaunchVars("sizeTipVisible", 1);
    xiuxiu.setLaunchVars("quality", 100); //图片质量
    xiuxiu.setLaunchVars("file_name", fileName); //名称
    //修改为您自己的图片上传接口
    xiuxiu.setUploadURL(Api.xiuXiuUploadURL());
    xiuxiu.setUploadType(2); //以表单形式上传文件
    xiuxiu.setUploadDataFieldName("upload_file"); //上传表单名称
    xiuxiu.onUploadResponse = (data, id)=> {
      let SpaImg = JSON.parse(data).body;
      SpaImg.eid = spaAccount.eid;
      SpaImg.appid = spaAccount.appid;
      this.$emit("returnImg", SpaImg);
      this.xiuxiuHide();
    };
    xiuxiu.onBeforeUpload = function(data, id) {
      var size = data.size;
      if (size > 10 * 1024 * 1024) {
        // alert("图片不能超过10M");
        return false;
      }
      return true;
    };
  },
  methods: {
    xiuxiuShow: function(pixel) {
      this.pixel = pixel || this.pixel; //设置图片上传像素
      xiuxiu.setLaunchVars("cropPresets", this.pixel); //设置图片裁剪像素
      /*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
      xiuxiu.embedSWF("xiuxiuEditor", 5, this.width, this.height);
      this.showXiuXiu = true; //展示图片上传
    },
    xiuxiuHide: function() {debugger
      this.showXiuXiu = false; //影藏图片上传
    }
  }
};
</script>

<style lang="less" scoped>
.xiuXiuPage {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  #xiuxiuEditor {
    //   background: #ffffff;
  }
}
</style>
