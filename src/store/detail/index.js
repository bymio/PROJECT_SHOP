import {
  reqGoodsInfo,
  reqAddOrUpdateShopCart
} from "@/api";
import {getUUID} from '@/utils/uuid_token'
const state = {
  goodInfo: {},
  //游客临时身份
  uuid_token: getUUID()

}
const mutations = {
  GETGOODSINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  },
}
const actions = {
  //获取产品信息
  async getGoodsInfo({
    commit
  }, skuId) {
    const result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  //加入购物车的||修改某一个产品的个数
  async addOrUpdateShopCart({
    commit
  }, {
    skuId,
    skuNum
  }) {
    //发请求:前端带一些参数给服务器【需要存储这些数据】，存储成功了，没有给返回数据
    //不需要在三连环（仓库存储数据了）
    //注意:async函数执行返回的结果一定是一个promise【要么成功，要么失败】
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      //返回的是成功的标记
      return "ok";
    } else {
      //返回的是失败的标记
      return Promise.reject(new Error("faile"));
    }
  },
}
const getters = {
  // 路径导航的简化
  categoryView(state) {
    //如果初始对象是空对象，返回的是undefined 所以需要加||{}
    return state.goodInfo.categoryView || {}
  },
  // 产品信息的简化
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  //产品售卖属性的简化
  spuSaleAttrList() {
    return state.goodInfo.spuSaleAttrList || {}
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}