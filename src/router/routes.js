// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
export default [
  //重定向
  {
    path: "*",
    redirect: "/home"
  },
  {
    path: "/home",
    component: Home,
    meta: {
      show: true
    }
  },
  {
    name: 'detail',
    path: "/detail/:skuid",
    component: Detail,
  },
  {
    path: "/trade",
    component: Trade,
  },
  {
    path: "/pay",
    component: Pay,
  },
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta:{
      show:true
    }
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta:{
      show:true
    }
  },
  {
    path: "/login",
    component: Login,
    meta: {
      show: false
    }
  },
  {
    path: "/register",
    component: Register,
    //路由信息key
    meta: {
      show: false
    }
  },
  {
    // prarms参数后面加?表示可传可不传
    path: "/search/:keyword?",
    component: Search,
    meta: {
      show: true
    },
    name: "search",
    // 路由组件传递props数据
    // 1.布尔值写法 params
    // props: true
    // 2.对象写法
    // props: {
    //   a: 1,
    //   b: 2
    // }
    // 3.函数写法
    props: ($route) => {
      return {
        keyword: $route.params.keyword,
        k: $route.query.k
      }
    }
  },
]