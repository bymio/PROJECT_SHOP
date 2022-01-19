import Vue from 'vue'
import App from './App.vue'

//三级联动组件 全局组件
import TypeNav from '@/components/TypeNav';
import Carsouel from '@/components/Carousel';
import Pagination from '@/components/Pagination'

//第一个参数 组件名字 第二个参数 那个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carsouel.name, Carsouel);
Vue.component(Pagination.name, Pagination)

//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//引入MockServer.js
import '@/mock/mockServer'
//引入swiper轮播图
import 'swiper/css/swiper.css'

new Vue({
  render: h => h(App),
  beforeCreate() {
    // 配置全局事件总线
    Vue.prototype.$bus = this;
  },
  //注册路由
  router,
  // 注册仓库，组件实例多了一个属性 $store
  store
}).$mount('#app')