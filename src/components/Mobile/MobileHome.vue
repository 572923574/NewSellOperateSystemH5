<template>
    <!-- 手机小程序主页模拟器 -->
    <div class="MobilePage">
        <div class="mobileTopDiv">
            <div class="iconsDiv"></div>
            <div class="titleDiv">
                <div class="goBack"></div>
                <div class="title">{{propsData.name}}</div>
            </div>
        </div>
        <div class="mobileContentDiv">
            <div class="goodsImgsDiv">
                <el-carousel height="175px">
                    <el-carousel-item v-for="(spaImg,index) in propsData.shopImgs" :key="index">
                        <img :src="spaImg.imgUrl" alt="" class="spaImg">
                    </el-carousel-item>
                </el-carousel>
            </div>
            
        </div>
        <div class="mobileFootDiv"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      title: "商品详情"
    };
  },
  props: ["propsData"]
};
</script>

<style lang="less" scoped>
.MobilePage {
  .selector::-webkit-scrollbar {
    width: 0;
  }
  height: calc(100% - 2px);
  width: 375px;
  background: #f6f8f8;
  float: left;
  position: relative;
  border: 1px solid #f6f8f8;
  border-radius: 2px;
  overflow-x: hidden; overflow-y: auto;
  .mobileTopDiv {
    width: 100%;
    height: 64px;
    position: absolute;
    top: 0px;
    background: #ffffff;
    .iconsDiv {
      height: 24px;
      width: 100%;
    }
    .titleDiv {
      height: 40px;
      width: 100%;
      line-height: 40px;
      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }
  }
  .mobileContentDiv {
    width: 100%;
    position: absolute;
    top: 64px;
    bottom: 50px;
    .goodsImgsDiv {
      .spaImg {
        width: 375px;
        height: 375px;
      }
      float: left;
      width: 100%;
    }
    .goodsInfo {
      background: #ffffff;
      float: left;
      width: 100%;
      padding-bottom: 3px;
      border-bottom: 1px solid #f1f1f1;
      .topDiv {
        .nameAndDescribeText {
          float: left;
          margin-left: 14px;
          width: 290px;
          .name {
            line-height: 22.5px;
            font-size: 16px;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: #333333;
            line-height: 22.5px;
            margin: 11px 0 6px 0px;
          }
          .describeText {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #909090;
            line-height: 20px;
            margin-bottom: 11px;
          }
        }
        .rightIconDiv {
          float: right;
          width: 50px;
          height: 56px;
          border-left: 1px solid #f1f1f1;
          margin-top: 20px;
        }
      }
      .priceAndNum {
        height: 30px;
        line-height: 30px;
        margin-bottom: 10px;
        float: left;
        width: calc(100% - 28px);
        padding: 0px 14px;
        .preferencePrice {
          float: left;
          color: #bb0707;
          font-size: 15px;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          .preferencePriceSpan {
            font-size: 14px;
          }
        }
        .salePrice {
          float: left;
          margin-left: 8px;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #909090;
        }
        .saleNum {
          float: right;
          margin-right: 8px;

          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #333333;
        }
        .num {
          float: right;
          font-size: 12px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #333333;
        }
      }
    }
    .goodsDetailDiv {
      background: #ffffff;
      width: 100%;
      float: left;
      .title {
        height: 15px;
        font-size: 11px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #909090;
        line-height: 15px;
        padding: 13px 0px 11px 14px;
      }
      .details {
        padding: 0px 11px;
        .detailImg {
          width: 353px;
        }
      }
    }
  }
  .mobileFootDiv {
    width: 100%;
    position: absolute;
    height: 50px;
    bottom: 0px;
  }
}
</style>

