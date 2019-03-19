<template>
    <el-dialog
        :custom-class="dialogData.half?'DialogCss half':'DialogCss'"
        :title="dialogData.title"
        :visible.sync="showDialog"
        :close-on-click-modal="false"
        :append-to-body="dialogData.appendToBody"
    >
        <slot name="Mobile" v-if="showDialog"></slot>
        <slot :name="dialogData.dialogContent" v-if="showDialog"></slot>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelFn">取 消</el-button>
            <el-button class="dialogOk" type="primary" @click="okFn">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
export default {
  props: ["dialogData"], //弹框数据
  data() {
    return {
      showDialog: false //显示弹窗
    };
  },
  beforeMount() {
    this.dialogData.appendToBody = !!this.dialogData.appendToBody; //弹框是否加载到body上，用于嵌套弹框
    this.dialogData.dialogContent = this.dialogData.dialogContent
      ? this.dialogData.dialogContent
      : "dialogContent";
  },
  methods: {
    show() {
      // 初始化数据
      this.showDialog = true;
    },
    cancelFn() {
      // 取消方法
      this.showDialog = false;
    },
    okFn() {
      //确定方法
      this.showDialog = false;
      this.$emit("emitSaveFn");
    }
  }
};
</script>
<style lang="less">
.el-dialog.DialogCss {
  position: fixed;
  z-index: 999;
  right: 0px;
  top: 60px;
  bottom: 0px;
  margin-top: 0px !important;
  margin-bottom: 0px;
  width: calc(100% - 230px);
  .el-dialog__header {
    text-align: left;
    border-bottom: 1px solid #eeeeee;
    font-weight: 500;
  }
  .el-dialog__body {
    height: calc(100% - 141px);
    padding: 10px 30px;
    overflow: hidden; 
  }
  .el-dialog__footer {
    border-top: 1px solid #eeeeee;
    background-color: #ffffff;
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    text-align: center;
    padding: 15px 20px 20px 20px;
    .dialogOk {
      margin-left: 20%;
    }
  }
}
.el-dialog.DialogCss.half{
    width: 50%;
}
</style>
