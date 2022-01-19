<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>
    <!-- 在Home Search下显示 在登录、注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  mounted() {
    //通知Vuex发送请求，获取商品分类数据，存储仓库 只执行一次
    this.$store.dispatch("categoryList");
  },
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>
</style>
