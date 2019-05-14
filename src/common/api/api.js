import axios from 'axios';
import store from '@/store'

let winUrl = window.document.location.origin + ":8080/mts-spa/spa"; //文跟路径winUrl = "https://dev.sentree.shop/mts-spa/spa";
// winUrl = "https://dev.sentree.shop/mts-spa/spa";
function requestFn(method, url, data, callback, errorFn, that, loading) {
    let req = {
        body: {},
        eid: "",
        appid: "",
        token: "",
    }; //请求参数
    // 封装请求token 、eid 、appid
    let spaAccount = {};
    if (store.state.spaAccount && store.state.spaAccount.token) {
        spaAccount = store.state.spaAccount;
    } else {
        let state = sessionStorage.getItem('state');
        state = state ? JSON.parse(state) : {
            spaAccount: {}
        };
        that.$store.commit("updateState", state);
        spaAccount = state.spaAccount || {};
    }
    if (data && typeof data == "object") {
        data.eid = spaAccount.eid;
        data.appid = spaAccount.appid;
    }

    req.eid = spaAccount.eid;
    req.appid = spaAccount.appid;
    req.token = spaAccount.token;
    req.body = data || {
        eid: spaAccount.eid,
        appid: spaAccount.appid
    }; //请求body部分
    //请求loading
    let $loading = "";
    if (loading) {
        $loading = that.$loading();
    }
    // 封装request请求方法
    axios({
        method: method ? method : 'POST',
        url: winUrl + url,
        // url: url, //vue.config.js配置跨域后，不用再拼接winUrl,winUrl用路径别名api来代替了,例如：'api/account/login'
        data: req
    }).then(function (response) {
        if (loading) {
            $loading.close();
        }
        if (response.data && response.data.result) {
            that.$message({
                showClose: true,
                message: response.data.msg,
                type: 'error',
                duration: 2000
            });
            if (response.data.result == 2) {
                that.$store.commit('setSpaAccount', {});
                sessionStorage.clear();
                that.$router.push({
                    path: "/Login"
                });
            }
            errorFn && errorFn(response);
            return;
        } else {
            // 请求成功，触发回调
            callback && callback(response.data);
            console.log(url + "请求返回：", response.data);
            return;
        }
    }, function (response) {
        if (loading) {
            $loading.close();
        }
        // 请求失败
        // 后期可以做一个日志，将失败请求传入数据库
        that.$message({
            showClose: true,
            message: '网络请求失败!请稍后再试。',
            type: 'error',
            duration: 2000
        });
        errorFn && errorFn(response.data);
    });
}


let Api = {
    Login: function (data, callback, error, that, loading, method) {
        // 登录方法
        let url = "/account/login";
        requestFn(method, url, data, callback, error, that, loading);
    },
    loginOut: function (data, callback, error, that, loading, method) {
        // 退出登录方法
        let url = "/account/loginOut";
        requestFn(method, url, data, callback, error, that, loading);
    },
    spaAccountList: function (data, callback, error, that, loading, method) {
        // 获取账号列表
        let url = "/account/list";
        requestFn(method, url, data, callback, error, that, loading);
    },
    spaAccountSave: function (data, callback, error, that, loading, method) {
        // 新增或者编辑账号
        let url = "/account/save";
        requestFn(method, url, data, callback, error, that, loading);
    },
    spaAccountDelete: function (data, callback, error, that, loading, method) {
        // 删除账号
        let url = "/account/delete";
        requestFn(method, url, data, callback, error, that, loading);
    },
    goodsList: function (data, callback, error, that, loading, method) {
        // 查询商品资料列表
        let url = "/goods/list";
        requestFn(method, url, data, callback, error, that, loading);
    },
    goodsSave: function (data, callback, error, that, loading, method) {
        // 保存商品资料
        let url = "/goods/save";
        requestFn(method, url, data, callback, error, that, loading);
    },
    goodsDelete: function (data, callback, error, that, loading, method) {
        // 删除商品
        let url = "/goods/delete";
        requestFn(method, url, data, callback, error, that, loading);
    },
    goodsTypeList: function (data, callback, error, that, loading, method) {
        // 查询商品类型集合
        let url = "/goodsType/list";
        requestFn(method, url, data, callback, error, that, loading);
    },
    goodsTypeSave: function (data, callback, error, that, loading, method) {
        // 保存商品类型
        let url = "/goodsType/save";
        requestFn(method, url, data, callback, error, that, loading);
    },
    goodsTypeDelete: function (data, callback, error, that, loading, method) {
        // 删除商品类型
        let url = "/goodsType/delete";
        requestFn(method, url, data, callback, error, that, loading);
    },
    goodsSubTypeList: function (data, callback, error, that, loading, method) {
        // 查询商品类型集合
        let url = "/goodsSubType/list";
        requestFn(method, url, data, callback, error, that, loading);
    },
    goodsSubTypeSave: function (data, callback, error, that, loading, method) {
        // 保存商品子类型
        let url = "/goodsSubType/save";
        requestFn(method, url, data, callback, error, that, loading);
    },
    goodsSubTypeDelete: function (data, callback, error, that, loading, method) {
        // 删除商品子类型
        let url = "/goodsSubType/delete";
        requestFn(method, url, data, callback, error, that, loading);
    },
    InOutDepotList: function (data, callback, error, that, loading, method) {
        // 查询出入库列表
        let url = "/inoutDepot/list";
        requestFn(method, url, data, callback, error, that, loading);
    },
    InOutDepotSave: function (data, callback, error, that, loading, method) {
        // 保存出入库
        let url = "/inoutDepot/save";
        requestFn(method, url, data, callback, error, that, loading);
    },
    InOutDetailQueryByInOutNo: function (data, callback, error, that, loading, method) {
        // 保存出入库
        let url = "/inoutDepotDetail/queryByInOutNo";
        requestFn(method, url, data, callback, error, that, loading);
    },
    InOutDepotTypeList: function (data, callback, error, that, loading, method) {
        // 查询出入库类型列表
        let url = "/inoutDepotType/list";
        requestFn(method, url, data, callback, error, that, loading);
    },
    inoutDepotTypeSave: function (data, callback, error, that, loading, method) {
        // 编辑出入库类型
        let url = "/inoutDepotType/save";
        requestFn(method, url, data, callback, error, that, loading);
    },
    inoutDepotTypeDetele: function (data, callback, error, that, loading, method) {
        // 删除出入库类型
        let url = "/inoutDepotType/delete";
        requestFn(method, url, data, callback, error, that, loading);
    },
    uploadImg: function (data, callback, error, that, loading, method) {
        // 上传图片
        let url = "/file/upload";
        requestFn(method, url, data, callback, error, that, loading);
    },
    shopList: function (data, callback, error, that, loading, method) {
        // 查询门店列表
        let url = "/shop/list";
        requestFn(method, url, data, callback, error, that, loading);
    },
    shopEdit: function (data, callback, error, that, loading, method) {
        // 编辑门店
        let url = "/shop/edit";
        requestFn(method, url, data, callback, error, that, loading);
    },
    xiuXiuUploadURL: function () {
        //获取美图秀秀上传链接  
        let url = "/file/upload";
        return winUrl + url;
    },
    deteleImgs: function (data, callback, error, that, loading, method) {
        // 编辑门店
        let url = "/shop/edit";
        requestFn(method, url, data, callback, error, that, loading);
    },
    shopPreferentialList: function (data, callback, error, that, loading, method) {
        // 查询优惠列表
        let url = "/shopPreferential/list";
        requestFn(method, url, data, callback, error, that, loading);
    },
    shopPreferentialDelete: function (data, callback, error, that, loading, method) {
        // 批量删除
        let url = "/shopPreferential/deleteList";
        requestFn(method, url, data, callback, error, that, loading);
    },
    shopPreferentialEdit: function (data, callback, error, that, loading, method) {
        // 新增、编辑优惠
        let url = "/shopPreferential/edit";
        requestFn(method, url, data, callback, error, that, loading);
    },
    getMoneyList: function (data, callback, error, that, loading, method) {
        // 查询提现列表
        let url = "/getMoney/list";
        requestFn(method, url, data, callback, error, that, loading);
    },
    passGetMoney:function (data, callback, error, that, loading, method) {
        // 审核提现单
        let url = "/getMoney/passGetMoney";
        requestFn(method, url, data, callback, error, that, loading);
    },
    orderList:function (data, callback, error, that, loading, method) {
        // 查询提现列表
        let url = "/mallOrder/list";
        requestFn(method, url, data, callback, error, that, loading);
    },
    sendGoods:function (data, callback, error, that, loading, method) {
        // 查询提现列表
        let url = "/mallOrder/sendGoods";
        requestFn(method, url, data, callback, error, that, loading);
    },
    shopCouponList:function (data, callback, error, that, loading, method) {
        // 查询提现列表
        let url = "/shopCoupon/list";
        requestFn(method, url, data, callback, error, that, loading);
    },
    shopCouponCreate:function (data, callback, error, that, loading, method) {
        // 查询提现列表
        let url = "/shopCoupon/edit";
        requestFn(method, url, data, callback, error, that, loading);
    },
    shopCouponDelete:function (data, callback, error, that, loading, method) {
        // 查询提现列表
        let url = "/shopCoupon/deleteList";
        requestFn(method, url, data, callback, error, that, loading);
    },
}
export default Api;