<template>
    <!-- 新增编辑 -->
    <div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 名称 -->
                <div class="rowItemLabel">{{Label.name}}</div>
                <el-input
                    class="nameInput rowInput"
                    v-model="propsData.name"
                    :placeholder="placeholderObj.name"
                ></el-input>
            </div>
        </div>
        <!-- 启用新零售层级 -->
        <div class="formRow">
            <div class="formRowItem">
                <div class="rowItemLabel">{{Label.bonusNum}}</div>
                <el-select
                    class="nameInput rowInput"
                    v-model="propsData.bonusNum"
                    :placeholder="placeholderObj.bonusNum"
                >
                    <el-option
                        v-for="type in bonusNumList"
                        :key="type.value"
                        :label="type.label"
                        :value="type.value"
                    ></el-option>
                </el-select>
            </div>
        </div>
        <!-- 新零售提成 -->
        <div class="formRow" v-if="propsData.bonusNum">
            <div class="formRowItem shopBonusListRow">
                <div class="rowItemLabel">{{Label.shopBonusList}}</div>
                <div class="shopBonusListDiv">
                    <div class="shopBonusRow">
                        <div class="bonusLevel">第一级</div>
                        <el-select
                            class="bonusType rowInput"
                            v-model="propsData.shopBonusList[0].bonusType"
                            :placeholder="placeholderObj.bonusNum"
                        >
                            <el-option
                                v-for="type in bonusTypeList"
                                :key="type.value"
                                :label="type.label"
                                :value="type.value"
                            ></el-option>
                        </el-select>
                        <el-input
                            class="bonusValue rowInput"
                            v-model="propsData.shopBonusList[0].bonusValue"
                            :placeholder="placeholderObj.name"
                        ></el-input>
                    </div>
                    <div class="shopBonusRow" v-if="propsData.bonusNum>1">
                        <div class="bonusLevel">第二级</div>
                        <el-select
                            class="bonusType rowInput"
                            v-model="propsData.shopBonusList[1].bonusType"
                            :placeholder="placeholderObj.bonusNum"
                        >
                            <el-option
                                v-for="type in bonusTypeList"
                                :key="type.value"
                                :label="type.label"
                                :value="type.value"
                            ></el-option>
                        </el-select>
                        <el-input
                            class="bonusValue rowInput"
                            v-model="propsData.shopBonusList[1].bonusValue"
                            :placeholder="placeholderObj.name"
                        ></el-input>
                    </div>
                    <div class="shopBonusRow" v-if="propsData.bonusNum>2">
                        <div class="bonusLevel">第三级</div>
                        <el-select
                            class="bonusType rowInput"
                            v-model="propsData.shopBonusList[2].bonusType"
                            :placeholder="placeholderObj.bonusType"
                        >
                            <el-option
                                v-for="type in bonusTypeList"
                                :key="type.value"
                                :label="type.label"
                                :value="type.value"
                            ></el-option>
                        </el-select>
                        <el-input
                            class="bonusValue rowInput"
                            v-model="propsData.shopBonusList[2].bonusValue"
                            :placeholder="placeholderObj.name"
                        ></el-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem bigRow">
                <!-- 商户地址 -->
                <div class="rowItemLabel">{{Label.address}}</div>
                <div class="rowRightDiv">
                    <div class="addressRow">
                        <el-input
                            class="userName rowInput"
                            v-model="propsData.address.userName"
                            :placeholder="placeholderObj.userName"
                        ></el-input>
                        <el-input
                            class="telNumber rowInput"
                            v-model="propsData.address.telNumber"
                            :placeholder="placeholderObj.telNumber"
                        ></el-input>
                    </div>
                    <div class="addressRow">
                        <el-select
                            class="provinceName rowInput"
                            v-model="propsData.address.provinceName"
                            :placeholder="placeholderObj.provinceName"
                            @change="changeProvince"
                        >
                            <el-option
                                v-for="type in provinceNameList"
                                :key="type.fullname"
                                :label="type.fullname"
                                :value="type.fullname"
                            ></el-option>
                        </el-select>
                        <el-select
                            class="cityName rowInput"
                            v-model="propsData.address.cityName"
                            :placeholder="placeholderObj.cityName"
                            @change="changeCity"
                        >
                            <el-option
                                v-for="type in cityNameList"
                                :key="type.fullname"
                                :label="type.fullname"
                                :value="type.fullname"
                            ></el-option>
                        </el-select>
                        <el-select
                            class="countyName rowInput"
                            v-model="propsData.address.countyName"
                            :placeholder="placeholderObj.countyName"
                            v-if="cityNameItem.cidx"
                        >
                            <el-option
                                v-for="type in countyNameList"
                                :key="type.fullname"
                                :label="type.fullname"
                                :value="type.fullname"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="addressRow">
                        <el-input
                            class="detailInfo rowInput"
                            v-model="propsData.address.detailInfo"
                            :placeholder="placeholderObj.detailInfo"
                        ></el-input>
                    </div>
                </div>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem bigRow">
                <!-- 仓库地址 -->
                <div class="rowItemLabel">{{Label.depotAddress}}</div>
                <div class="rowRightDiv">
                    <div class="addressRow">
                        <el-input
                            class="userName rowInput"
                            v-model="propsData.depotAddress.userName"
                            :placeholder="placeholderObj.userName"
                        ></el-input>
                        <el-input
                            class="telNumber rowInput"
                            v-model="propsData.depotAddress.telNumber"
                            :placeholder="placeholderObj.telNumber"
                        ></el-input>
                    </div>
                    <div class="addressRow">
                        <el-select
                            class="provinceName rowInput"
                            v-model="propsData.depotAddress.provinceName"
                            :placeholder="placeholderObj.provinceName"
                            @change="changeDepotProvince"
                        >
                            <el-option
                                v-for="type in depotProvinceNameList"
                                :key="type.fullname"
                                :label="type.fullname"
                                :value="type.fullname"
                            ></el-option>
                        </el-select>
                        <el-select
                            class="cityName rowInput"
                            v-model="propsData.depotAddress.cityName"
                            :placeholder="placeholderObj.cityName"
                            @change="changeDepotCity"
                        >
                            <el-option
                                v-for="type in depotCityNameList"
                                :key="type.fullname"
                                :label="type.fullname"
                                :value="type.fullname"
                            ></el-option>
                        </el-select>
                        <el-select
                            class="countyName rowInput"
                            v-model="propsData.depotAddress.countyName"
                            :placeholder="placeholderObj.countyName"
                            v-if="depotCityNameItem.cidx"
                        >
                            <el-option
                                v-for="type in depotCountyNameList"
                                :key="type.fullname"
                                :label="type.fullname"
                                :value="type.fullname"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="addressRow">
                        <el-input
                            class="detailInfo rowInput"
                            v-model="propsData.depotAddress.detailInfo"
                            :placeholder="placeholderObj.detailInfo"
                        ></el-input>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Constant from "@/common/constant/constant.js";
import axios from "axios";
export default {
  props: ["propsData"],
  data() {
    return {
      // label对象
      Label: {
        name: "名称",
        bonusNum: "新零售层级",
        shopBonusList: "新零售提成",
        address: "地址",
        depotAddress: "仓库地址"
      },
      // placeholder提示对象
      placeholderObj: {
        name: "请输入商品名称",
        no: "请输入商品编号",
        type: "请选择商品类型",
        son_type: "请选择商品子类型",
        barCode: "请输入商品条码",
        numStart: "请输入初始数量",
        num: "请输入商品数量",
        saleNum: "请输入已售商品数量",
        buyingPrice: "请输入进货价",
        costPrice: "请输入成本价",
        salePrice: "请输入商品原价",
        preferencePrice: "请输入优惠售价",
        unit: "请选择商品单位",
        spec: "请选择商品规格",
        goodsCompanyId: "请选择商品品牌",
        supplierId: "请选择供货商",
        status: "请输入商品状态",
        describeText: "请输入商品描述"
      },
      //新零售层级
      bonusNumList: [
        {
          value: 0,
          label: "不启用新零售"
        },
        {
          value: 1,
          label: "启用一级新零售"
        },
        {
          value: 2,
          label: "启用二级新零售"
        },
        {
          value: 3,
          label: "启用三级新零售"
        }
      ], 
       //新零售类型
      bonusTypeList: [
        {
          value: "1",
          label: "订单金额比例"
        },
        {
          value: "2",
          label: "订单利润比例"
        },
        {
          value: "3",
          label: "每单固定奖励"
        }
      ],
      hideCountyName: false, //隐藏第三级
      qqMap: [], //腾达省市区信息
      provinceNameItem: {}, //选中的省
      cityNameItem: {}, //选中的市
      depotProvinceNameItem: {}, //仓库选中的省
      depotCityNameItem: {} //仓库选中的市
    };
  },
  computed: {
    provinceNameList: function() {
      let list = this.qqMap.length ? this.qqMap[0] : [];
      list.map(pro => {
        if (pro.fullname == this.propsData.address.provinceName) {
          this.provinceNameItem = pro;
        }
      });
      // 省
      return list;
    },
    cityNameList: function() {
      // 市
      let list = [];
      let cidx = this.provinceNameItem.cidx;
      if (cidx) {
        list = this.qqMap[1].slice(cidx[0], cidx[1]);
      }
      list.map(pro => {
        if (pro.fullname == this.propsData.address.cityName) {
          this.cityNameItem = pro;
        }
      });
      return list;
    },
    countyNameList: function() {
      // 区
      let list = [];
      let cidx = this.cityNameItem.cidx;
      if (cidx) {
        list = this.qqMap[2].slice(cidx[0], cidx[1]);
      }
      return list;
    },
    depotProvinceNameList: function() {
      let list = this.qqMap.length ? this.qqMap[0] : [];
      list.map(pro => {
        if (pro.fullname == this.propsData.address.provinceName) {
          this.depotProvinceNameItem = pro;
        }
      });
      // 仓库省
      return list;
    },
    depotCityNameList: function() {
      // 仓库市
      let list = [];
      let cidx = this.depotProvinceNameItem.cidx;
      if (cidx) {
        list = this.qqMap[1].slice(cidx[0], cidx[1]);
      }
      list.map(pro => {
        if (pro.fullname == this.propsData.address.cityName) {
          this.depotCityNameItem = pro;
        }
      });
      return list;
    },
    depotCountyNameList: function() {
      // 仓库区
      let list = [];
      let cidx = this.cityNameItem.cidx;
      if (cidx) {
        list = this.qqMap[2].slice(cidx[0], cidx[1]);
      }
      return list;
    }
  },
  beforeMount: function() {debugger
    axios({
      method: "GET",
      url:
        "https://apis.map.qq.com/ws/district/v1/list?key=DLSBZ-DT6HX-DNH4V-TE4QH-EGH3E-CEFDE"
    }).then(
      response => {
        this.qqMap = response.data.result;
      },
      response => {
        // 请求失败
        // 后期可以做一个日志，将失败请求传入数据库
        this.$message({
          showClose: true,
          message: "网络请求失败!请稍后再试。",
          type: "error",
          duration: 2000
        });
      }
    );
  },
  methods: {
    changeProvince: function(value) {
      this.propsData.address.cityName = "";
      this.propsData.address.countyName = "";
    },
    changeCity: function(value) {
      this.propsData.address.countyName = "";
    },
    changeDepotProvince: function(value) {
      this.propsData.depotAddress.cityName = "";
      this.propsData.depotAddress.countyName = "";
    },
    changeDepotCity: function(value) {
      this.propsData.depotAddress.countyName = "";
    }
  }
};
</script>
<style lang="less" scoped>
#app .formRow {
  .shopBonusListRow {
      height: 140px;
    .shopBonusListDiv {
      float: right;
      width: calc(100% - 120px);
      .shopBonusRow{
          height: 40px;
          padding-bottom: 10px;
      .bonusLevel{
          width: 50px;
          float: left;
          padding-left: 10px;
          height: 40px;
          line-height: 40px;
      }
      .bonusType{

          width: 150px;
      }
      .bonusValue{
          width: 120px;
      }

      }
    }
  }
  .formRowItem.bigRow {
    height: 140px;
    .rowRightDiv {
      width: calc(100% - 120px);
      float: right;
      .addressRow {
        height: 40px;
        padding-bottom: 10px;
        .userName {
          width: 100px;
        }
        .telNumber {
          width: 120px;
        }
        .provinceName {
          width: calc((100% - 30px) / 3);
        }
        .cityName {
          width: calc((100% - 30px) / 3);
        }
        .countyName {
          width: calc((100% - 30px) / 3);
        }
        .detailInfo {
          width: calc(100% - 10px);
        }
      }
    }
  }
}
</style>
