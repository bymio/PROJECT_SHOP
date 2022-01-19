<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li v-if="searchParams.categoryName" class="with-x">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <li v-if="searchParams.keyword" class="with-x">
              {{ searchParams.keyword }} <i @click="removeKeyword">x</i>
            </li>
            <li v-if="searchParams.trademark" class="with-x">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">x</i>
            </li>
            <li
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
              class="with-x"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector 商品信息-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details 筛选-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li @click="changeOrder('1')" :class="{ active: isOne }">
                  <a
                    >综合
                    <span
                      v-show="isOne"
                      class="iconfont"
                      :class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"
                    ></span
                  ></a>
                </li>
                <li @click="changeOrder('2')" :class="{ active: isTwo }">
                  <a
                    >价格
                    <span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{ 'icon-UP': isAsc, 'icon-DOWN': isDesc }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`">
                      <img :src="goods.defaultImg"/>
                    </router-link>
                    
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      //带给服务器参数
      searchParams: {
        // 一级分类id
        category1Id: "",
        // 二级分类id
        category2Id: "",
        // 三级分类id
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序 默认综合降序
        order: "1:desc",
        // 当前第几页
        pageNo: 1,
        // 每一页显示的数量
        pageSize: 5,
        // 平台售卖属性操作带来的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  beforeMount() {
    // 发请求之前带给服务器参数【search参数发生变化有数值带给服务器】
    // 复杂的写法
    // this.searchParams.category1Id = this.$route.query.category1Id
    // Object.assign es6语法 合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters(["goodsList", "trademarkList", "attrsList"]),
    //获取search模块展示产品的总数居
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),

    //判断排序
    isOne() {
      return this.searchParams.order.indexOf("1") !== -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") !== -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") !== -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") !== -1;
    },
  },

  watch: {
    // 监听路由变化
    $route(newValue, oldValue) {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getData();
      // 每一次请求完毕 把把相应的123级分类id清空以便接收新的
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
  },
  components: {
    SearchSelector,
  },
  methods: {
    //向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },

    // 删除分类名字
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      if (this.$route.params) {
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      }
    },
    //删除搜索关键字
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getData();
      // 通知兄弟组件header清楚关键字
      this.$bus.$emit("clear");
      // 进行路由跳转
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 删除品牌信息
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
    // 删除商品标签
    removeAttr(index) {
      console.log(index);
      console.log(this.searchParams.props[index]);
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    // 自定义事件回调 点击品牌跳转
    trademarkInfo(trademark) {
      // 整理参数
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    // 点击商品属性跳转
    attrInfo(attr, attrValue) {
      // 判断属性有没 数组去重
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
      }
      this.getData();
    },
    //排序操作
    changeOrder(flag) {
      //flag代表用户点击的是综合还是价格
      //初始数据
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      let newOrder = "";
      //判断多次点击是不是同一个按钮
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        //点击的不是同一个按钮
        newOrder = `${flag}:${(originSort = "desc")}`;
      }
      // 将新的order赋给searchParams
      this.searchParams.order = newOrder;
      this.getData();
    },
    getPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                // 价格样式不标准自己添加
                em {
                  padding-right: 5px;
                }
                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>