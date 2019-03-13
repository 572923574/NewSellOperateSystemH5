<template>
    <div class="xiuXiuPage" v-show="showXiuXiu" @click="showXiuXiu = false">
        <!-- 图片上传遮罩层 -->
            <div id="xiuxiuEditor"></div>
    </div>
</template>

<script>
import Api from "@/common/api/api.js";
export default {
  data() {
    return {
      showXiuXiu: false //展示美图秀秀页面
    };
  },
  props: ["width", "height"],
  methods: {
    xiuxiuInit: function(type) {
      let width = this.width || "800",
        height = this.height || "800";
      if (!type) {
        xiuxiu.setLaunchVars("cropPresets", "750x750");
      } else {
        xiuxiu.setLaunchVars("cropPresets", "750x350");
      }
    xiuxiu.setLaunchVars("cameraEnabled", 0); //禁用摄像头
    xiuxiu.setLaunchVars("customMenu", []); //隐藏左侧的优化
      this.showXiuXiu = true;
      /*第1个参数是加载编辑器div容器，第2个参数是编辑器类型，第3个参数是div容器宽，第4个参数是div容器高*/
      xiuxiu.embedSWF("xiuxiuEditor", 5, width, height);
      //修改为您自己的图片上传接口
      xiuxiu.setUploadURL(Api.xiuXiuUploadURL());
      xiuxiu.setUploadType(2);
      xiuxiu.setUploadDataFieldName("upload_file");
      xiuxiu.onInit = function() {
        xiuxiu.loadPhoto("http://open.web.meitu.com/sources/images/1.jpg");
      };
      xiuxiu.onUploadResponse = function(data, id) {
        debugger;
        //alert("上传响应" + data);  可以开启调试
      };
      xiuxiu.onSaveBase64Image= function(data, fileName, fileType, id) {
          debugger
      }
      xiuxiu.onBeforeUpload = function(data, id) {
        debugger;
      };
      xiuxiu.onUpload = function(id) {
        debugger;
        //   点击上传按钮
      };
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
