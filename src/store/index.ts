
import { createStore } from 'vuex'
const defaultState = {
  count: 0,
  routerInfo: [{
    meta: { title: '首页'},
    name: "Home",
    path: "/home",
  }],//导航菜单
  getRouterList: [{
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
      icon: 'Camera'
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'Camera'
        },
      },
      {
        path: '/table',
        name: 'table',
        meta: {
          title: 'table',
          icon: 'Bicycle'
        },
        component: "",
        children: [
          {
            path: '/table/table1',
            name: 'table1',
            meta: {
              title: 'table1',
              icon: 'Bicycle'
            },
          }
        ]
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于',
      icon: 'Camera'
    },
    children: [
      {
        path: '/about1',
        name: 'about1',
        meta: {
          title: '关于',
          icon: 'Basketball'
        },
      },
      {
        path: '/btn',
        name: 'btn',
        meta: {
          title: '按钮',
          icon: 'Cellphone'
        },
      },
    ]
  },
  ], //左侧菜单
  navList: [],//导航菜单缓存
  authList:['Home','table','table1','about','about1','btn']  //登录鉴权
}

const permission = (data) => {
  data.forEach(item => {
    if (item.children) {
      item.children = permission(item.children)
    }
  })
  return data
}
// Create a new store instance.
export default createStore({
 
  state() {
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState, routeList) {
      state.routerInfo = routeList
      localStorage.setItem("navList", JSON.stringify(state.routerInfo))
    },
    getRouterInfo(state: typeof defaultState, router) {
      state.routerInfo.push(router)
      let newobj = {};
      state.routerInfo = state.routerInfo.reduce((preVal, curVal) => {
        newobj[curVal.name] ? '' : newobj[curVal.name] = preVal.push(curVal);
        return preVal
      }, [])
      localStorage.setItem("navList", JSON.stringify(state.routerInfo))
    },
    getRouter(state) {
      let data = permission(state.getRouterList)
      state.navList = data
    }
  },
  actions: {
    getrouterList(context) {
      context.commit("getRouter")
    },
    increment(context, routeList) {
      context.commit('increment', routeList)
    },
    getRouterInfo(context, router) {
      context.commit('getRouterInfo', router)
    }
  },
  getters: {
  }
})