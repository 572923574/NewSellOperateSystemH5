import Vue from 'vue'
import Router from 'vue-router'

import Account from '@/views/accountSet/Account.vue';
import GoodsTable from '@/views/goodsSet/goodsTable/GoodsTable.vue';
import GoodsCompany from '@/views/goodsSet/goodsCompany/GoodsCompany.vue';
import GoodsType from '@/views/goodsSet/goodsTypeSet/goodsType/GoodsType.vue';
import GoodsSubType from '@/views/goodsSet//goodsTypeSet/goodsSubType/GoodsSubType.vue';

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
	]
})
router.beforeEach((to, from, next) => {
	if(to.path ==="/"){
		// /访问goodsTable页面
		next({ path: '/GoodsTable' });
	}else{
		next();
	}
})

export default router;