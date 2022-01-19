// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 使用插件
Vue.use(VueRouter)
//引入store
import store from '@/store'

//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重新push与replace
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch(err => err)
}
VueRouter.prototype.replace = function replace(location) {
  return originReplace.call(this, location).catch(err => err)
}
// 配置路由
let router = new VueRouter({
  //配置路由
  routes,
  //滚动行为
  scrollBehavior(to, from, savedPosition) {
    return {
      // y 滚动条去最上方
      x: 0,
      y: 0
    }
  }
})

// 全局首位 前置守卫 路由跳转之前进行判断
router.beforeEach(async (to, from, next) => {
  // to 获取跳转到哪个路由的信息
  // from 从哪个路由来的
  // next ：放行 next()直接放行 next('/xxx')放行到指定的路由 next(false)
  //用户登陆了才有token
  next()
  let token = store.state.user.token
  //用户信息
  let name = store.state.user.userInfo.name
  if(token){
    //用户已经登陆但是进不去
    if(to.path=='/login'){
      next('/home')
    }else{
      //有用户信息
      if(name){
        next()
      }else{
        try {
          //获取用户信息
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          //token失效
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  }else{

  }

})

export default router