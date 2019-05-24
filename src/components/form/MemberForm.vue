<template>
    <!-- 新增、编辑账号弹框 -->
    <div id="memberForm">
        <div class="clearfix">
            <!--工具条-->
            <TableQuery :queryObj="queryObj" @queryListFn="queryListFn"></TableQuery>
        </div>
        <div class="clearfix">
            <el-form ref="form" label-width="100px">
                <el-form-item :label="accountLabel.avatarLable">
                    <img :src="accountData.avatarUrl" width="25" height="25" alt="会员头像" class="head_pic"/>
                </el-form-item>
                <el-form-item :label="accountLabel.nameLabel">
                    <span class="w200">{{accountData.name}}</span>
                </el-form-item>
                <el-form-item :label="accountLabel.mobileLabel">
                    <span class="w200">{{accountData.mobile}}</span>
                </el-form-item>
                <el-form-item :label="accountLabel.recommendOneIdLabel">
                    <span class="w200">{{accountData.recommendOneId}}</span>
                </el-form-item>
                <el-form-item :label="accountLabel.recommendTwoIdLabel">
                    <span class="w200">{{accountData.recommendTwoId}}</span>
                </el-form-item>
                <el-form-item :label="accountLabel.recommendThreeIdLabel">
                    <span class="w200">{{accountData.recommendThreeId}}</span>
                </el-form-item>
                <el-form-item :label="accountLabel.createTimeLable">
                    <span class="w200">{{dateFormat(accountData,'createTime')}}</span>
                </el-form-item>
                <el-form-item :label="accountLabel.totalMoneyLabel">
                    <span class="w200">{{moneyFormat(accountData,'totalMoney')}}</span>
                </el-form-item>
                <el-form-item :label="accountLabel.balanceLabel">
                    <span class="w200">{{moneyFormat(accountData,'balance')}}</span>
                </el-form-item>
                <el-form-item :label="accountLabel.afterPayLabel">
                    <span class="w200">{{formatPay(accountData)}}</span>
                </el-form-item>
                <el-form-item :label="accountLabel.statusLabel">
                    <span class="w200">{{formatStatus(accountData)}}</span>
                </el-form-item>
                <el-form-item :label="accountLabel.memberAddressLabel">
                    <span class="w200">{{accountData.memberAddress}}</span>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
    import TableQuery from "@/components/headQuery/TableQuery.vue";
    import util from "@/common/js/util.js";
    import Api from "@/common/api/api.js";

    export default {
        components: {
            TableQuery,
        },
        data() {
            return {
                //查询条件
                queryObj: {
                    searchKey: "",
                    searchText: "推荐人手机号",
                    showSelect: false,
                    hideAdd: true
                },
                // label对象
                accountLabel: {
                    nameLabel: "名称",
                    recommendOneIdLabel: "第一推荐人id",
                    recommendTwoIdLabel: "第二推荐人id",
                    recommendThreeIdLabel: "第三推荐人id",
                    avatarLable: '头像',
                    mobileLabel: "手机",
                    createTimeLable: "创建时间",
                    totalMoneyLabel: "推荐总金额",
                    balanceLabel: "推荐可用金额",
                    afterPayLabel: "是否挂账",
                    statusLabel: "状态",
                    memberAddressLabel: "地址",
                },
                //状态集合
                statusList: [{
                    value: '0',
                    label: '正常',
                }, {
                    value: '1',
                    label: '禁用',
                }, {
                    value: '-1',
                    label: '删除',
                }],
            }
        },
        props: ['accountData'],
        computed: {},
        methods: {
            //是否挂账
            formatPay(row) {
                return row.afterPay == 0 && row.afterPay != '' ? "正常支付订单" : row.afterPay == 1 ? "挂账订单" : '';
            },
            //金钱格式化
            moneyFormat(row, key) {
                if (!row || (!row[key] && row[key] != 0)) return '';
                return ('' + row[key]).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            },
            //table中的时间格式化
            dateFormat(row, key, cellValue, index) {
                const daterc = row[key] + '';
                if (!daterc || daterc == null) return;
                const dateMat = new Date(daterc / 1000);
                return util.formatDate.format(dateMat, 'yyyy-MM-dd hh:mm:ss');
            },
            //状态显示转换
            formatStatus(row) {
                return row.status == 0 ? "正常" : row.status == 1 ? "禁用" : row.status == -1 ? "删除" : '';
            },
            //查询账号列表
            queryListFn() {
                let that = this;
                this.listLoading = true;
                if (!this.queryObj.searchKey) return;
                Api.spaMemberList(
                    {
                        mobile: this.queryObj.searchKey,
                    },
                    resp => {
                        that.btnLoad = false;
                        if (resp.result == 0) {
                            if (!resp.body || resp.body.length == 0) return;
                            let {openid, recommendOneId, recommendTwoId} = resp.body[0];
                            that.accountData.recommendOneId = openid;
                            that.accountData.recommendTwoId = recommendOneId;
                            that.accountData.recommendThreeId = recommendTwoId;
                            that.loading = false;
                        }
                        this.listLoading = false;
                    },
                    () => {
                        that.btnLoad = false;
                        this.listLoading = false;
                    },
                    that
                );
            },
        }
    }
</script>

<style lang="less" scoped>
    .formRow {
        // 表单行
        width: 100%;
        display: block;

        .formRowItem {
            min-height: 30px;
            padding-bottom: 10px;

            .rowItemLabel {
                // 输入框label
                width: 100px;
                float: left;
                line-height: 30px;
                text-align: right;
                padding: 0 10px;
            }

            .rowInput {
                width: 200px;
                float: left;
                margin: 0 10px;
            }

            .optGroup, .menuGroup {
                text-align: left;
            }
        }

    }

    .w200 {
        width: 98%;
        display: inline-block;
        word-break: break-all;
        padding-right: 20px;
    }

    .head_pic {
        border-radius: 50%;
        margin-top: 5px;
    }

    /deep/ .el-form-item__content {
        margin-bottom: 10px !important;
    }

    .clearfix:after {
        content: ".";
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
        font-size: 0;
    }
</style>

