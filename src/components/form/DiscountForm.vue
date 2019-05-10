<template>
    <!-- 商品营销 -->
    <div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 名称 -->
                <div class="rowItemLabel">{{accountLabel.nameLabel}}</div>
                <el-input class="nameInput rowInput" v-model="accountData.name" :placeholder="placeholderObj.name"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 手机 -->
                <div class="rowItemLabel">{{accountLabel.mobileLabel}}</div>
                <el-input class="nameInput rowInput" v-model="accountData.mobile" :placeholder="placeholderObj.mobile"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 密码 -->
                <div class="rowItemLabel">{{accountLabel.passwordLabel}}</div>
                <el-input class="nameInput rowInput" v-model="accountData.password" :placeholder="placeholderObj.password"></el-input>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 菜单权限 -->
                <div class="rowItemLabel">{{accountLabel.memuLabel}}</div>
                <el-checkbox-group class="nameInput rowInput menuGroup" v-model="accountData.menuStr" size="mini">
                    <el-checkbox-button v-for="opt in menuList" :label="opt.value" :key="opt.value">{{opt.text}}</el-checkbox-button>
                </el-checkbox-group>
            </div>
        </div>
        <div class="formRow">
            <div class="formRowItem">
                <!-- 操作权限 -->
                <div class="rowItemLabel">{{accountLabel.optLabel}}</div>
                <el-checkbox-group class="nameInput rowInput optGroup" v-model="accountData.optStr" size="mini">
                    <el-checkbox-button v-for="opt in optList" :label="opt.value" :key="opt.value">{{opt.text}}</el-checkbox-button>
                </el-checkbox-group>
            </div>
        </div>
        <div class="formRow" v-if="accountData.id">
            <div class="formRowItem">
                <!-- 状态 -->
                <div class="rowItemLabel">{{accountLabel.statusLabel}}</div>
                <!-- <el-input class="nameInput rowInput" v-model="accountData.status" :placeholder="placeholderObj.status"></el-input> -->
                <el-select class="nameInput rowInput" v-model="accountData.status" :placeholder="placeholderObj.status" >
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            // label对象
            accountLabel:{
                nameLabel:"名称",
                mobileLabel:"手机",
                passwordLabel:"密码",
                memuLabel:"菜单权限",
                optLabel:"操作权限",
                statusLabel:"状态",
            },
            // placeholder提示对象
            placeholderObj:{
                name:'请输入名称',
                mobile:"请输入手机",
                password:"请输入密码",
                menuStr:"请选择菜单权限",
                optStr:"请选择操作权限",
                status:"请输入名称",
            },
            //状态集合
            statusList:[{
                value:'0',
                label:'正常',
            },{
                value:'1',
                label:'禁用',
            }],
            //操作权限
            optList:[{text:'账号',value:'O21'},{text:'出入库明细',value:"O18"}],
            //菜单权限
            menuList:[{text:'账号',value:'M21'},{text:'出入库明细',value:"M18"}]
            
        }
    },
    props:['accountData'],
    computed:{

    }
}
</script>

<style lang="less" scoped>
.formRow{
    // 表单行
    width: 100%;
    display: block;
    .formRowItem{
        height: 30px;
        padding-bottom: 10px;
        .rowItemLabel{
            // 输入框label
            width: 100px;
            float: left;
            line-height: 30px;
            text-align: right;
            padding: 0 10px;
        }
        .rowInput{
            width: 200px;
            float: left;
            margin:0 10px;
        }
        .optGroup,.menuGroup{
            text-align: left;
        }
    }
    
}
</style>

