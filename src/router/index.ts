import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: "/goods", // 设置路由重定向
    children: [
      {
        path: 'goods',
        name: 'goods',
        meta: {
          title: "商品列表",
          isShow: true,
        },
        component: () => import('@/views/GoodsView.vue')
      },
      {
        path: 'user',
        name: 'user',
        meta: {
          title: "用户列表",
          isShow: true,
        },
        component: () => import('@/views/UserView.vue')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          title: "角色列表",
          isShow: true,
        },
        component: () => import('@/views/RoleView.vue')
      },
      {
        path: 'authority',
        name: 'authority',
        meta: {
          title: "权限列表",
          isShow: false,
        },
        component: () => import('@/views/AuthorityView.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem('token');
  if (!token && to.path !== '/login') {
    next('login')
  } else {
    next()
  }
})


export default router
