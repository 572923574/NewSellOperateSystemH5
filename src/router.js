import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Account',
      component: () => import(/* webpackChunkName: "about" */ './views/accountSet/Account.vue')
    },
    // {
    //   path: '/Account',
    //   name: 'Account',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/accountSet/Account.vue')
    // }
  ]
})
