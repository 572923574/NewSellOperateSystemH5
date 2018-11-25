import axios from 'axios';
import store from '@/store'
let winUrl = window.document.location.origin+":8080/mts-spa/spa";//文跟路径

function requestFn(method,url,data,callback,errorFn,that){debugger
    if(data && typeof data =="object"){
        data.authToken = store.state.spaAccount && store.state.spaAccount.authToken;
    }
    // 封装request请求方法
    axios({
        method:'POST',
        url: winUrl+url,
        data: data
    }).then(function (response) {
        // 请求成功，触发回调
        callback && callback(response.data);
        console.log(response.data);
    })
    .catch(function (error) {
        // 请求失败
        // 后期可以做一个日志，将失败请求传入数据库
        that.$message({
            showClose: true,
            message: '网络请求失败!请稍后再试。',
            type: 'error',
            duration:2000
          });
        errorFn && errorFn(error);
    });
}


let Api = {
    Login:function(data,callback,error,that,method){
        // 登录方法
        let url ="/account/login";
        requestFn(method,url,data,callback,error,that);
    },

}
export default Api;