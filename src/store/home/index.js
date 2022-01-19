// home仓库
//state 仓库存储数据的地方
//mutations: 修改state的唯一手段
//action:处理action，可以书写自己的业务逻辑，可以处理异步请求
//getters 理解为计算属性 简化仓库数据，让组件获取仓库的数据更加方便

import {
  reqCategoryList,
  reqGetBannerList,
  reqFloorList,
} from "@/api"
const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}
const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  },
}
const actions = {
  //通过api里面的接口函数，向服务器发请求获取数据
  async categoryList({
    commit
  }) {
    let result = await reqCategoryList()
    if (result.code == 200) {
      //提交mutation
      commit('CATEGORYLIST', result.data)
    }
  },

  //轮播图
  async getBannerList({
    commit
  }) {
    let result = await reqGetBannerList()
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  },

   //获取floor数据
   async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      //提交mutation
      commit("GETFLOORLIST", result.data);
    }
  },

}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}