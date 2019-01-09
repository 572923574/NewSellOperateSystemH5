import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
        spaAccount: {}, //储存账号
        goodsTypeList: [],//商品大类
        goodsSubTypeList: [],//商品小类
        inOutDepotTypeList:[],//出入库类型
	},
	mutations: {
		setSpaAccount(state, spaAccount) {
			// 设置账号
			state.spaAccount = spaAccount;
		},
		changeObj(state, key, objKey, objValue) { //默认第一个参数是state
			// 修改内容
			state[key][objKey] = objValue;
		},
		updateState(state,newState){
			for(var key in newState){
				state[key] = newState[key];
			}
			
		}
	},
	actions: {

	}
})