import store from '@/store'
import Axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'
const baseURL = 'https://api.github.com'
import useStore from 'vuex'
const axios = Axios.create({
  baseURL,
  timeout: 20000 // 请求超时 20s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error,"error")
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  }
)


// 通过beforeEach钩子来判断用户是否登陆过 有无token
const whiteList = ['/login'] // 不重定向白名单
// const userInfo = getUserInfo()
const list = store.state.authList
router.beforeEach((to, from, next) => {
  // 判断是否有登录过
  if (localStorage.getItem("pass")) {
    if (to.path === '/login') {
      next()
    } else {
      if (to.matched.length === 0) {
        next('/404') 
      }
      let isTrue = false
      list.forEach(item => {
        if (to.name == item) {
          isTrue = true
          } 
      })
      if (isTrue) {
        next()
      } else {
        next('/login')
      }
    }
  // 没有登录
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      if (to.path.slice(1) !== '') {
        if (to.matched.length === 0) {
          router.push({
            path: '/login'
          })
        } else {
          router.push({
            path: '/login',
            query: {
              redirect: to.path.slice(1)
            }
          })
        }
      } else {
        router.push({
          path: '/login'
        })
      }
    }
  }
})
export default axios