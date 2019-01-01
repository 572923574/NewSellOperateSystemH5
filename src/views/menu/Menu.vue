<template>
    <!-- //左侧菜单 -->
    <div class="leftMenu">
        <div class="shopAndAccount">
            <!-- //店名与账号 -->
            <div class="shopImg"></div>
            <!-- 店铺图片 -->
            <div class="nameDiv">
                <!-- 店铺名称 -->
                <div class="shopName" :title="shopName">{{shopName}}</div>
                <div class="accountDiv">
                    <!-- 账号名称 -->
                    <div class="accountName" :title="accountName">{{accountName}}</div>

                </div>
            </div>
            <!-- 推出登陆 -->
            <div class="exitBtn" @click="loginOut">{{exitText}}</div>
        </div>
        <el-menu :default-active="defaultActive" class="leftMenuDiv" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{titleObj.goodsSet}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :index="pathObj.goodsTable">{{titleObj.goodsTable}}</el-menu-item>
                    <el-menu-item :index="pathObj.goodsCompany">{{titleObj.goodsCompany}}</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <template slot="title">{{titleObj.goodsTypeSet}}</template>
                    <el-menu-item :index="pathObj.goodsType">{{titleObj.goodsType}}</el-menu-item>
                    <el-menu-item :index="pathObj.goodsSubType">{{titleObj.goodsSubType}}</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">库存设置</span>
            </el-menu-item>
            <el-menu-item :index="pathObj.account">
                <i class="el-icon-setting"></i>
                <span slot="title">账号设置</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import Api from '@/common/api/api.js';
export default {
    data() {
        return {
            menuOneItem: "系统设置",
            shopName: "微信商城分销系统",
            accountName: "分销达人",
            exitText: "退出",
            titleObj:{
                goodsSet:"商品设置",
                goodsTable:"商品列表",
                goodsCompany:"产品公司",
                goodsTypeSet:"商品类型",
                goodsType:"商品大类",
                goodsSubType:"商品小类",
            },
            //   路径对象
            pathObj: {
                account: "/Account",//账号设置
                goodsTable:"/GoodsTable",//商品列表
                goodsCompany:"/GoodsCompany",//产品公司
                goodsType:"/GoodsType",//商品类型
                goodsSubType:"/GoodsSubType",//商品小类型
            },
            // 默认选择
            defaultActive:"/GoodsTable",
        };
    },
    methods: {
        handleOpen() { },
        changePage(path) {
            this.$router.push({ path: path });
        },
        handleClose() { },
        loginOut(){
            let that = this;
            // 退出登录
            Api.loginOut({},function(){
                that.$store.commit('setSpaAccount',{});
                sessionStorage.clear();
                that.$router.push({ path: "/Login" });
            });
        },
    },
    beforeMount(){
        if(this.$router.history && this.$router.history.current && this.$router.history.current.path){
            this.defaultActive = this.$router.history.current.path;
        }
        this.defaultActive = this.defaultActive || "/GoodsTable";
    },
};
</script>
<style lang="less" scoped>
.leftMenu {
    // 左侧菜单
	height: 100%;
	background-color: rgb(84, 92, 100);
	.shopAndAccount {
        // 店铺与账号
		height: 40px;
		padding: 10px;
		max-width: calc(100% - 20px);
		color: gold;
		.shopImg {
            // 店铺图片
			width: 40px;
			height: 40px;
			background-color: gold;
			float: left;
		}
		.nameDiv {
            // 名称div
			float: left;
			padding-left: 10px;
			max-width: calc(100% - 90px);
			.shopName {
                // 店铺名称
				height: 20px;
				line-height: 20px;
                text-align: left;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
			}
			.accountDiv {
                // 账号div
				height: 20px;
				.accountName {
                    // 账号名称
					float: left;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
				}
			}
		}
		.exitBtn {
            // 退出按钮
			float: right;
			width: 40px;
			text-align: right;
			height: 100%;
			line-height: 40px;
			font-size: 14px;
		}
	}
	.leftMenuDiv {
        // 左侧导航树
		text-align: left;
		border-right: none;
		width: 100%;
		.el-submenu {
			.el-menu-item {
				min-width: auto;
			}
		}
	}
}
</style>
