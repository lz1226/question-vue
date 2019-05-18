import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: resolve => require(['../components/page/Dashboard.vue'], resolve)
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: resolve => require(['../components/common/Home.vue'], resolve)
    // },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    // {
    //   path: '/',
    //   redirect: '/dashboard'
    // },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children:[
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },
        // {
        //   // 权限页面
        //   path: '/permission',
        //   component: resolve => require(['../components/page/Permission.vue'], resolve),
        //   meta: { title: '权限测试', permission: true }
        // },
        // {
        //   path: '/404',
        //   component: resolve => require(['../components/page/404.vue'], resolve),
        //   meta: { title: '404' }
        // },
        // {
        //   path: '/403',
        //   component: resolve => require(['../components/page/403.vue'], resolve),
        //   meta: { title: '403' }
        // }
      ]
    },
    // 重定向

    {
      path: '/helloword',
      name: 'helloword',
      component: HelloWorld
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
