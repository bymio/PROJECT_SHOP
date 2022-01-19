import {
  reqCartList,
  reqDeleteCartById,
  reqUpdateCheckedById
} from '@/api'
const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  //获取购物车列表
  async getCartList({
    commit
  }) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  //删除购物车产品
  async deleteCartListBySkuId({
    commit
  }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },
  //修改购物车某一个产品的状态
  async updateChecked({
    commit
  }, {
    skuId,
    isChecked
  }) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //删除全部勾选的产品
  deleteAllCheckedCart({
    dispatch,
    getters
  }) {
    //context :小仓库 commit getters dispatch state都有
    //获取购物车中全部的循环
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      //将返回的每一次promise添加到数组中
      PromiseAll.push(promise)
    })
    //返回 Promise.all 里面有一个返回失败就是失败 全部成功就是成功
    return Promise.all(PromiseAll)
  },
  //全选 修改全部商品的状态
  updateAllCartChecked({
    dispatch,
    state
  }, isChecked) {
    let PromiseAll = []
     state.cartList[0].cartInfoList.forEach(item => {
      let promise = item.isChecked == 0 ? dispatch('updateChecked', {
        skuId: item.skuId,
        isChecked
      }) : dispatch('updateChecked', {
        skuId: item.skuId,
        isChecked
      })
      PromiseAll.push(promise)
    })
    return Promise.all(PromiseAll)
  }
}
const getters = {
  //简化cartList 
  cartList(state) {
    return state.cartList[0] || {}
  },

}
export default {
  state,
  mutations,
  actions,
  getters
}