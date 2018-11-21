<template>
    <!-- //左侧菜单 -->
    <div class="leftMenu">
        <div class="shopAndAccount">
            <!-- //店名与账号 -->
            <div class="shopImg"></div>
            <!-- 店铺图片 -->
            <div class="nameDiv">
                <!-- 店铺名称 -->
                <div class="shopName">{{shopName}}</div>
                <div class="accountDiv">
                    <!-- 账号名称 -->
                    <div class="accountName">{{accountName}}</div>

                </div>
            </div>
            <!-- 推出登陆 -->
            <div class="exitBtn">{{exitText}}</div>
        </div>
        <el-menu default-active="2" class="leftMenuDiv" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{titleObj.goodsSet}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">{{titleObj.goodsTable}}</el-menu-item>
                    <el-menu-item index="1-2">{{titleObj.goodsCompany}}</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <template slot="title">{{titleObj.goodsTypeSet}}</template>
                    <el-menu-item index="1-4-1">{{titleObj.goodsType}}</el-menu-item>
                    <el-menu-item index="1-4-2">{{titleObj.goodsSubType}}</el-menu-item>
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
            <el-menu-item index="4" @click="changePage(pathObj.account)">
                <i class="el-icon-setting"></i>
                <span slot="title">账号设置</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
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
            }
        };
    },
    methods: {
        handleOpen() { },
        changePage(path) {            debugger
            this.$router.push({ path: path });
        },
        handleClose() { }
    }
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
			}
			.accountDiv {
                // 账号div
				height: 20px;
				.accountName {
                    // 账号名称
					float: left;
					max-width: calc(100% - 20px);
				}
			}
		}
		.exitBtn {
            // 退出按钮
			float: right;
			width: 40px;
			text-align: right;
			padding-right: 10px;
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
		.el-submenu__title {
			// text-align: left;
		}
		.el-submenu {
			// text-align: left;
			.el-menu-item {
				min-width: auto;
			}
		}
		.el-menu-item {
			// text-align: left;
		}
	}
}
</style>
