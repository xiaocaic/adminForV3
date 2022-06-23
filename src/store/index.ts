
import { createStore } from 'vuex'

const defaultState = {
  count: 0,
  routerInfo: [{
    meta: {title: '首页', icon: 'document'},
    name: "Home",
    path: "/home",
  }],
}

// Create a new store instance.
export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState,routeList) {
      state.routerInfo = routeList
      localStorage.setItem("navList",JSON.stringify(state.routerInfo))
    },
    getRouterInfo(state: typeof defaultState, router) {
      state.routerInfo.push(router)
      let newobj = {}; 
      state.routerInfo = state.routerInfo.reduce((preVal, curVal) => {
        newobj[curVal.name] ? '' : newobj[curVal.name] = preVal.push(curVal); 
        return preVal 
      }, [])
      localStorage.setItem("navList",JSON.stringify(state.routerInfo))
    }
  },
  actions: {
    increment(context,routeList) {
      context.commit('increment',routeList)
    },
    getRouterInfo(context,router) {
      context.commit('getRouterInfo',router)
    }
  },
  getters: {
    double(state: typeof defaultState) {
      return 2 * state.count
    }
  }
})