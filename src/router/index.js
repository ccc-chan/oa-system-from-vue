import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Index from '@/components/index'
import User from '@/components/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
        path: '/index',
        name: 'index',
        component: Index
    },
    {
        path: '/user',
        name: 'user',
        component: User
    },
  ]
})
