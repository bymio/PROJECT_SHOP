//登录与注册模块
import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from '@/api'
import {
  setToken,
  removeToken
} from '@/utils/token'
const state = {
  code: '',
  token: localStorage.getItem('TOKEN'),
  userInfo: {}
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 清除本地数据
  CLEAR(state) {
    state.token = ''
    state.userInfo = ''
    removeToken()
  }
}
const actions = {
  //获取验证码
  async getCode({
    commit
  }, phone) {
    let result = await reqGetCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户注册
  async userRegister({
    commit
  }, user) {
    let result = await reqUserRegister(user)
    console.log(result)
    if (result.code == 200) {
      return "ok"
    } else {
      return Promise.reject(new Error("faile"))
    }
  },
  //用户登录 [token]
  async userLogin({
    commit
  }, data) {
    let result = await reqUserLogin(data)
    //服务器下发的token 用户唯一标识符
    if (result.code == 200) {
      // 用户登录成功获取token 
      commit('USERLOGIN', result.data.token)
      // 本地持久化存储token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //退出登录
  async userLogout({ commit }) {
    let result = await reqLogout()
    if (result.code == 200) {
      //actions不能操作state 在mutations里面操作
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }

  },
  //带着token向服务器获取用户登录信息
  async getUserInfo({
    commit
  }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  }

}
const getters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}