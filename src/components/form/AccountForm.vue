<template>
    <!-- 新增、编辑账号弹框 -->
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item :label="accountLabel.nameLabel">
                <SCInput :inputData.sync="accountData.name" :placeholder="placeholderObj.name"
                         rules="required"></SCInput>
            </el-form-item>
            <el-form-item :label="accountLabel.mobileLabel">
                <SCInput :inputData.sync="accountData.mobile" :placeholder="placeholderObj.mobile"
                         rules="phone"></SCInput>
            </el-form-item>
            <el-form-item :label="accountLabel.passwordLabel">
                <SCInput :inputData.sync="accountData.password" :placeholder="placeholderObj.password"
                         rules="required"></SCInput>
            </el-form-item>
            <el-form-item :label="accountLabel.memuLabel">
                <el-checkbox-group
                        v-model="accountData.menuStr"
                        size="mini"
                >
                    <el-checkbox-button
                            v-for="menu in menuList"
                            :label="menu.value"
                            :key="menu.value"
                    >{{menu.text}}
                    </el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item :label="accountLabel.optLabel">
                <el-checkbox-group
                        v-model="accountData.optStr"
                        size="mini"
                >
                    <el-checkbox-button
                            v-for="opt in optList"
                            :label="opt.value"
                            :key="opt.value"
                    >{{opt.text}}
                    </el-checkbox-button>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item :label="accountLabel.statusLabel">
                <el-select
                        class="nameInput rowInput"
                        v-model="accountData.status"
                        :placeholder="placeholderObj.status"
                >
                    <el-option
                            v-for="item in statusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="accountLabel.roleLabel">
                <el-select
                        class="nameInput rowInput"
                        v-model="accountData.role"
                        :placeholder="placeholderObj.role"
                >
                    <el-option
                            v-for="item in roleList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                // label对象
                accountLabel: {
                    nameLabel: "名称",
                    mobileLabel: "手机",
                    passwordLabel: "密码",
                    memuLabel: "菜单权限",
                    optLabel: "操作权限",
                    statusLabel: "状态",
                    roleLabel: "角色",
                },
                // placeholder提示对象
                placeholderObj: {
                    name: '请输入名称',
                    mobile: "请输入手机",
                    password: "请输入密码",
                    menuStr: "请选择菜单权限",
                    optStr: "请选择操作权限",
                    status: "请选择状态",
                    role: "请选择角色",
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
                }
                ],
                //角色集合
                roleList: [{
                    value: '0',
                    label: '超级管理员',
                }, {
                    value: '1',
                    label: '管理员',
                }, {
                    value: '2',
                    label: '操作员',
                }
                ],
//操作权限
                optList: [
                    {text: '操作门店到期日期等信息', value: 'O0'},
                    {text: '发货', value: 'O0101'},
                    {text: '审核提现', value: "O0201"},
                    {text: '新增、编辑商品', value: "O0301"},
                    {text: '会员编辑推荐人', value: "O0401"},
                    {text: '修改商户信息', value: "O0501"},
                    {text: '新增、编辑账号权限', value: "O0601"},
                    {text: '新增、编辑商品类型权限', value: "O0701"},
                    {text: '新增、编辑商户活动权限', value: "O0801"},
                    {text: '新增、编辑商户优惠券权限', value: "O0901"},
                ],
                //菜单权限
                menuList: [
                    {text: '显示新增商户按钮', value: 'M0'},
                    {text: '订单发货', value: 'M01'},
                    {text: '推广提现', value: "M02"},
                    {text: '商品管理', value: "M03"},
                    {text: '会员列表', value: "M04"},
                    {text: '商户列表', value: "M05"},
                    {text: '账号列表', value: "M06"},
                    {text: '商品类型', value: "M07"},
                    {text: '商户活动', value: "M08"},
                    {text: '商户优惠券', value: "M09"},
                ]
            }
        },
        props: ['accountData'],
        computed: {}
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

    /*.mutipleCheckRow {*/
    /*    min-height: 50px !important;*/
    /*    margin-bottom: 30px;*/
    /*}*/

    /*.mr10 {*/
    /*    margin-right: 10px;*/
    /*}*/

    /*.el-checkbox-button {*/
    /*    margin: 8px 0;*/
    /*}*/

    /*.mutipleCheckRow .el-checkbox-button {*/
    /*    margin: 5px 0;*/
    /*}*/
</style>

