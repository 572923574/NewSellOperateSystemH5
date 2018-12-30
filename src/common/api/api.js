import axios from 'axios';
import store from '@/store'
let winUrl = window.document.location.origin + ":8080/mts-spa/spa"; //文跟路径

function requestFn(method, url, data, callback, errorFn, that) {
    if (data && typeof data == "object") {
        let spaAccount = {};
        if(store.state.spaAccount && store.state.spaAccount.token){
            spaAccount = store.state.spaAccount;
        }else{
            spaAccount = sessionStorage.getItem('spaAccount');
            spaAccount = spaAccount ?JSON.parse(spaAccount):{};
        }
        data.token = spaAccount.token;
        data.body.eid = spaAccount.eid;
        data.body.sid = spaAccount.sid;
    }
    // 封装request请求方法
    axios({
        method: method?method:'POST',
        url: winUrl + url,
        data: data
    }).then(function (response) {
        if (response.data && response.data.result) {
            that.$message({
                showClose: true,
                message: response.data.msg,
                type: 'error',
                duration: 2000
            });
            if(response.data.result ==2){
                that.$store.commit('setSpaAccount',{});
                sessionStorage.setItem('spaAccount',{});
                that.$router.push({ path: "/Login" });
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
    Login: function (data, callback, error, that, method) {
        // 登录方法
        let url = "/account/login";
        requestFn(method, url, data, callback, error, that);
    },
    spaAccountList: function (data, callback, error, that, method) {
        // 获取账号列表
        let url = "/account/list";
        requestFn(method, url, data, callback, error, that);
    },
    spaAccountSave: function (data, callback, error, that, method) {
        // 获取账号列表
        let url = "/account/save";
        requestFn(method, url, data, callback, error, that);
    },
    spaDelete: function (data, callback, error, that, method) {
        // 删除账号
        let url = "/account/delete";
        requestFn(method, url, data, callback, error, that);
    },
    goodsList: function (data, callback, error, that, method) {
        // 查询商品资料列表
        let url = "/goods/list";
        requestFn(method, url, data, callback, error, that);
    },
    goodsSave: function (data, callback, error, that, method) {
        // 保存商品资料
        let url = "/goods/save";
        requestFn(method, url, data, callback, error, that);
    },
    goodsDelete: function (data, callback, error, that, method) {
        // 删除商品
        let url = "/goods/delete";
        requestFn(method, url, data, callback, error, that);
    },
    goodsTypeList: function (data, callback, error, that, method) {
        // 查询商品类型集合
        let url = "/goodsType/list";
        requestFn(method, url, data, callback, error, that);
    },
    goodsTypeSave: function (data, callback, error, that, method) {
        // 保存商品类型
        let url = "/goodsType/save";
        requestFn(method, url, data, callback, error, that);
    },
    goodsTypeDelete: function (data, callback, error, that, method) {
        // 删除商品类型
        let url = "/goodsType/delete";
        requestFn(method, url, data, callback, error, that);
    },
    goodsSubTypeList: function (data, callback, error, that, method) {
        // 查询商品类型集合
        let url = "/goodsSubType/list";
        requestFn(method, url, data, callback, error, that);
    },
    goodsSubTypeSave: function (data, callback, error, that, method) {
        // 保存商品类型
        let url = "/goodsSubType/save";
        requestFn(method, url, data, callback, error, that);
    },
    goodsSubTypeDelete: function (data, callback, error, that, method) {
        // 删除商品类型
        let url = "/goodsSubType/delete";
        requestFn(method, url, data, callback, error, that);
    },

}
export default Api;