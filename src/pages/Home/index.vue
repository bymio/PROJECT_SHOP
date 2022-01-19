<template>
  <div>
    <!-- 三级联动组件 -->
    <TypeNav />

    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand  />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

import { mapState } from "vuex";

export default {
  mounted() {
    //获取floor组件数据
    this.$store.dispatch("getFloorList");
    //获取用户信息在首页展示
    this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
};
</script>

<style scoped>
</style>
