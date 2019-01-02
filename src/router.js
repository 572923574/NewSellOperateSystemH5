import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/Login.vue';
import Account from '@/views/accountSet/Account.vue';
import GoodsTable from '@/views/goodsSet/goodsTable/GoodsTable.vue';
import GoodsCompany from '@/views/goodsSet/goodsCompany/GoodsCompany.vue';
import GoodsType from '@/views/goodsSet/goodsTypeSet/goodsType/GoodsType.vue';
import GoodsSubType from '@/views/goodsSet//goodsTypeSet/goodsSubType/GoodsSubType.vue';
import InOutDepot from '@/views/inOutDepotSet/inOutDepot/InOutDepot.vue';
import InOutDepotType from '@/views/inOutDepotSet/inOutDepotType/InOutDepotType.vue';

import store from './store';

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'Account',
			component: () => import( /* webpackChunkName: "about" */ './views/accountSet/Account.vue')
		},
		{
			// 登陆Spa页面
			path: '/Login',
			name: 'Login',
			component: Login,
		},
		{
			// 账号列表
			path: '/Account',
			name: 'Account',
			component: Account,
		},
		{
			// 商品列表
			path: '/GoodsTable',
			name: 'GoodsTable',
			component: GoodsTable,
		},
		{
			//产品公司
			path: '/GoodsCompany',
			name: 'GoodsCompany',
			component: GoodsCompany,
		},
		{
			//商品类型
			path: '/GoodsType',
			name: 'GoodsType',
			component: GoodsType,
		},
		{
			//商品小类型
			path: '/GoodsSubType',
			name: 'GoodsSubType',
			component: GoodsSubType,
		},
		{
			//出入库表
			path: '/InOutDepot',
			name: 'InOutDepot',
			component: InOutDepot,
		},
		{
			//出入库类型
			path: '/InOutDepotType',
			name: 'InOutDepotType',
			component: InOutDepotType,
		},
	]
})

router.beforeEach((to, from, next) => {
	var token = '';
	if(store.state.spaAccount && store.state.spaAccount.token){
		token = store.state.spaAccount.token;
	}else{
		let state = sessionStorage.getItem('state');
		state = state ?JSON.parse(state):{};
		token = state.spaAccount?state.spaAccount.token:'';
	}
	console.log(token);
	if(!token && to.path !="/Login"){
		sessionStorage.clear();
		next({ path: '/Login' });
		return;
	}
	if(to.path ==="/"){
		// /访问goodsTable页面
		next({ path: '/Account' });
	}else{
		next();
	}
})

export default router;