import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
const routerView = () =>import('@/layout/index.vue')
const routerViewTable = () =>import('@/layout/table.vue')
const home = () =>import('@/views/home/index.vue')
const table1 = () =>import('@/views/table/index.vue')
const about1 = () =>import('@/views/about/index.vue')
const btn = () => import('@/views/btn/index.vue')
// let routerMap = {
//   routerView,
//   routerViewTable,
//   home,
//   table1,
//   about1,
// }
// export let getComponent = (code) => {
//   return routerMap[code]
// }
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/layout/login.vue')
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/home',
    component: routerView,
    meta: {
      title: '首页',
      icon:'document'
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title:'首页'
        },
        component: home
      },
      {
        path: '/table',
        name: 'table',
        meta: {
          title:'table'
        },
        redirect: '/home',
        component: routerViewTable,
        children: [
          {
            path: '/table/table1',
            name: 'table1',
            meta: {
              title:'table1'
            },
            component: table1
          }
        ]
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    redirect: '/about1',
    meta: {
      title:'关于',
      icon:'location'
    },
    component: routerView,
    children: [
      {
        path: '/about1',
        name: 'about1',
        meta: {
          title: '关于',
        },
        component: about1
      },
      {
        path: '/btn',
        name: 'btn',
        meta: {
          title: '按钮',
        },
        component: btn
      },
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import('@/views/errorPage/404.vue'),
  },
  
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router