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
        method: 'POST',
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
            errorFn && errorFn(error);
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
    }

}
export default Api;