import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/Login.vue';
import Home from '@/views/Home.vue';
import Account from '@/views/accountSet/Account.vue';
import GoodsTable from '@/views/goodsSet/goodsTable/GoodsTable.vue';
// import GoodsCompany from '@/views/goodsSet/goodsCompany/GoodsCompany.vue';

import Shop from '@/views/shop/Shop.vue';
import GoodsType from '@/views/goodsSet/goodsTypeSet/goodsType/GoodsType.vue';
import ShopPreferential from '@/views/set/ShopPreferential/ShopPreferential.vue';

import ShopCoupon from '@/views/set/ShopCoupon/ShopCoupon.vue';
import GetMoneyList from '@/views/orderAndGetMoney/getMoneyList/GetMoneyList.vue';
import OrderList from '@/views/orderAndGetMoney/orderList/OrderList.vue';

import store from './store';

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            // 登陆Spa页面
            path: '/Login',
            name: 'Login',
            component: Login,
            hidden: true
        },
        {
            // 主页
            path: '/',
            name: '订单与提现',
            component: Home,
            iconCls: 'el-icon-message',//图标样式class
            children: [
                { path: '/OrderList', component: OrderList, name: '订单发货' },
                { path: '/GetMoneyList', component: GetMoneyList, name: '推广提现' },
            ]
        },
        {
            path: '/',
            name: '商品管理',
            component: Home,
            iconCls: 'el-icon-message',//图标样式class
            children: [
                { path: '/GoodsTable', component: GoodsTable, name: '商品列表' },
            ]
        },{
            path: '/',
            name: '图表',
            component: Home,
            iconCls: 'el-icon-message',//图标样式class
            children: [
                
            ]
        },{
            path: '/',
            name: '设置',
            component: Home,
            iconCls: 'el-icon-message',//图标样式class
            children: [
                { path: '/Shop', component: Shop, name: '商户列表' },
                { path: '/Account', component: Account, name: '账号列表' },
                { path: '/GoodsType', component: GoodsType, name: '商品类型' },
                { path: '/ShopPreferential', component: ShopPreferential, name: '商户活动' },
                { path: '/ShopCoupon', component: ShopCoupon, name: '商户优惠券' },
                { path: '/ShopCoupon', component: ShopCoupon, name: '会员列表' },
            ]
        },
        {
            path: '*',
            hidden: true,
            redirect: { path: '/' }
        }
        
        
        // {
        //     //产品公司
        //     path: '/GoodsCompany',
        //     name: 'GoodsCompany',
        //     component: GoodsCompany,
        // },
        // {
        //     //商品类型
        //     path: '/GoodsType',
        //     name: 'GoodsType',
        //     component: GoodsType,
        // },
        // {
        //     //出入库表
        //     path: '/InOutDepot',
        //     name: 'InOutDepot',
        //     component: InOutDepot,
        // },
        // {
        //     //出入库类型
        //     path: '/InOutDepotType',
        //     name: 'InOutDepotType',
        //     component: InOutDepotType,
        // },
    ]
})

router.beforeEach((to, from, next) => {
    var token = '';
    if (store.state && store.state.spaAccount && store.state.spaAccount.token) {
        token = store.state.spaAccount.token;
    } else {
        let state = sessionStorage.getItem('state');
        state = state ? JSON.parse(state) : {};
        token = state.spaAccount ? state.spaAccount.token : '';
    }
    console.log(token);
    if (!token && to.path != "/Login") {
        sessionStorage.clear();
        next({
            path: '/Login'
        });
        return;
    }
    // if (to.path === "/") {
    //     // /访问goodsTable页面
    //     next({
    //         path: '/'
    //     });
    // } else {
    //     next();
    // }
    next();
})

export default router;