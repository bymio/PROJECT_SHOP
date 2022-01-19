// search 仓库
import {
  reqGetSearchInfo
} from "@/api"
const state = {
  searchList: {}
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  // 获取serach模块数据
  async getSearchList({
    commit
  }, params = {}) {
    // params是dispatch第二个参数 payload传递过来的 至少是空对象
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
//计算属性:在项目中为了简化数据而生
const getters = {
  //state当前仓库的state  不是大仓库的
  goodsList(state) {
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}