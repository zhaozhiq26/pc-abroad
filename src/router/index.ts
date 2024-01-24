import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '@/stores'
export const routes: any = [
  {
    path: '/display',
    component: () => import('@/views/display/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '资源'
    }
  },
  {
    path: '/personalCen',
    name: 'PersonalCen',
    component: () => import('@/views/personalCen/index.vue'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/customizedSer',
    name: 'CustomizedSer',
    component: () => import('@/views/customizedSer/index.vue'),
    meta: {
      title: '定制服务'
    }
  },
  {
    path: '/placeOrder',
    name: 'PlaceOrder',
    component: () => import('@/views/placeOrder/index.vue'),
    meta: {
      title: '发布订单'
    }
  },
  {
    path: '/paymentChannel',
    name: 'PaymentChannel',
    component: () => import('@/views/paymentChannel/index.vue'),
    meta: {
      title: '支付'
    }
  },
  {
    path: '/user/agreement',
    component: () => import('@/views/user/userAgreement.vue'),
    meta: {
      title: '用户协议'
    }
  },
  {
    path: '/user/privacy',
    component: () => import('@/views/user/privacyPolicy.vue'),
    meta: {
      title: '隐私协议'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 前置守卫
// router.beforeEach((to, form) => {
//   const userStore = useUserStore()
//   if (userStore.loginInfo?.access_token) {
//     return userStore.SetUserInfo()
//   }
// })

// 后置守卫
router.afterEach((to, form) => {
  document.title = '微企传媒-' + to.meta.title
})

export default router
