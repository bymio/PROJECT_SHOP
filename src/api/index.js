//当前模块：API进行统一管理
import requests from './ajax'

import mockRequests from './mockAjax'

//三级联动接口
// /api/product/getBaseCategoryList get 无参数

export const reqCategoryList = () => {
  //发请求 axios发请求返回的是promise对象
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}

//mock模拟数据 获取banner
export const reqGetBannerList = () => mockRequests.get("/banner")
//mock模拟数据 获取floor
export const reqFloorList = () => mockRequests.get("/floor");

// search相关 
// 搜索商品 地址：/api/list 方式：post
// 当前这个接口传递params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
  url: '/list',
  method: 'post',
  data: params
})
//获取产品详情信息的接口 /api/item/{ skuId } get
export const reqGoodsInfo = (skuId) => requests({
  url: `/item/${ skuId }`,
  method: 'get'
})
// 将产品添加到购物车中 或者更新某一个产品的个数 /cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: "post"
})
// 获取购物车列表数据 /cart/cartList get
export const reqCartList = () => requests({
  url: '/cart/cartList',
  method: 'get'
})
//删除购物车 /cart/deleteCart/{skuId} delete
export const reqDeleteCartById = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'delete'
})
//修改产品状态 /cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})
//获取验证码 /user/passport/sendCode/{phone} get
export const reqGetCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})
//用户注册 /user/passport/register post
export const reqUserRegister = (data) => requests({
  url: '/user/passport/register',
  data,
  method: 'post'
});
//用户登录 /user/passport/login post
export const reqUserLogin = (data) => requests({
  url: '/user/passport/login',
  data,
  method: 'post'
})
//带着token向服务器获取用户登录信息 /user/passport/auth/getUserInfo
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})
//退出登录 /user/passport/logout get
export const reqLogout = () => requests({
  url: '/user/passport/logout',
  method: 'get'
})
//获取用户地址信息 /user/userAddress/auth/findUserAddressList get
export const reqAddressInfo = () => requests({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'get'
})
//获取订单交易页信息 /order/auth/trade get
export const reqOrderInfo = () => requests({
  url: '/order/auth/trade',
  method: 'get'
})