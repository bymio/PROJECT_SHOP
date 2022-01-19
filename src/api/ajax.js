//对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'

// 1.利用axios对象的方法create，去创建一个zxios实例
// 2.request就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径
  baseURL: "/api",
  // 代表请求超时的时间 5s
  timeout: 5000,
});

//在当前模块中引入store
import store from '@/store'

// 请求拦截器
requests.interceptors.request.use((config) => {
  // config：配置对象，对象里有一个属性很重要，headers请求头
  
  if(store.state.detail.uuid_token){
    //给请求头加字段（userTempId） 给后端商量好名字
    config.headers.userTempId = store.state.detail.uuid_token
  }
  //携带token给服务器 获取用户登录信息
  if(store.state.user.token){
    config.headers.token = store.state.user.token
  }
  //进度条开始动
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 成功调用回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做到一些事情
  //进度条结束
  nprogress.done()
  return res.data
}, (error) => {
  return Promise.reject(new Error('faile'))
})
//对外暴漏
export default requests;