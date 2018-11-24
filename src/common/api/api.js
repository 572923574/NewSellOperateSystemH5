import axios from 'axios';
import store from '@/store'
let winUrl = window.document.location.origin+":8080/mts-spa/spa";//文跟路径

function requestFn(method,url,data,callback){
    if(data && typeof data =="object"){debugger
        data.authToken = store.state.spaAccount && store.state.spaAccount.authToken;
    }
    // 封装request请求方法
    axios({
        method:'POST',
        url: winUrl+url,
        data: data
    }).then(function (response) {
        callback && callback(response.data);
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}


let Api = {
    Login:function(data,callback,method){
        // 登录方法
        let url ="/account/login";
        requestFn(method,url,data,callback);
    },

}
export default Api;