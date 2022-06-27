import store from '@/store'
import router from '../router'
// 通过beforeEach钩子来判断用户是否登陆过 有无token
const whiteList = ['/login'] // 不重定向白名单
// const userInfo = getUserInfo()
const list = store.state.authList //判断当前登录人是否有对应菜单权限
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