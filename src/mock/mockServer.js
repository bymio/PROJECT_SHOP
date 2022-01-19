import Mock from 'mockjs'
//把json数据格式引入进来
import banner from './banner.json'
import floor from './floor.json'

//请求地址 请求数据
Mock.mock("/mock/banner", {
  code: 200,
  data: banner
}) 
//首页大的轮播图的数据
Mock.mock("/mock/floor", {
  code: 200,
  data: floor
})