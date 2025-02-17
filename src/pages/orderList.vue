<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <Loading v-if="loading"></Loading>
          <div class="order" v-for="(order, index) in orderList" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{ order.createTime }}
                <span>|</span>
                {{ order.receiverName }}
                <span>|</span>
                订单号：{{ order.orderNo }}
                <span>|</span>
                {{ order.paymentTypeDesc }}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{ order.payment }}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div
                  class="good-list"
                  v-for="(item, index) in order.orderItemVoList"
                  :key="index"
                >
                  <div class="good-img">
                    <img :src="item.productImage" alt="" />
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{ item.productName }}</div>
                    <div class="p-money">
                      {{ item.totalPrice + ' ' + item.quantity }}元
                    </div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status == 20">
                <a href="javascript:;">{{ order.statusDesc }}</a>
              </div>
              <div class="good-state fr" v-if="order.status == 10">
                <a href="javascript:;" @click="goPay(order.orderNo)">{{
                  order.statusDesc
                }}</a>
              </div>
            </div>
          </div>
          <!-- 第一种分页方式 点击加载拼接数据显示-->
          <div class="load-button" v-if="false">
            <el-button type="primary" @click="loadMore" :loading="loading" v-show="loading">加载更多</el-button>
          </div>
          <!-- 第二种分页器 滚动加载 拼接第二页数据-->
          <div
            v-if="false"
            class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="true"
            infinite-scroll-distance="410"
          >
            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading" />
          </div>
          <!-- 第三种分页 element分页 -->
          <el-pagination class="pagination" background :pageSize="pageSize"  @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
          </el-pagination>
          <Nodata v-if="!loading && orderList.length == 0"></Nodata>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading.vue'
import Nodata from './../components/Nodata.vue'
import { Pagination, Button } from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  name: 'order-list',
  components: {
    OrderHeader,
    Loading,
    Nodata,
    [Pagination.name]: Pagination,
    [Button.name]: Button
  },
  directives: { infiniteScroll },
  data() {
    return {
      loading: true,
      orderList: [],
      pageSize: 10,
      total: 0,
      pageNum: 1,
      busy: false
    }
  },
  mounted() {
    this.busy = true
    this.goOrderList()
  },
  methods: {
    goOrderList() {
      this.axios
        .get('/orders', {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        })
        .then(res => {
          // 拼接分页的数组
          // this.orderList = this.orderList.concat(res.list)
          this.orderList = res.list
          this.total = res.total
          this.loading = false
          this.busy = false
          this.$message.success('获取订单列表成功')
        })
        .catch(err => {
          this.$message.error(err)
          this.loading = false
        })
    },
    goPay(orderNo) {
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo
        }
      })
    },
    // element 分页器
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum
      this.goOrderList()
    },
    // 点击加载更多 拼接数组
    loadMore() {
      this.pageNum++
      this.goOrderList()
    },
    // 滚动加载  通过npm插件实现
    scrollMore() {
      this.busy = true
      setTimeout(() => {
        this.pageNum++
        this.getList()
      }, 500)
    },
    //专门给scroll使用
      getList() {
        this.loading = true
      this.axios
        .get('/orders', {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        })
        .then(res => {
          this.loading = false 
          this.orderList = this.orderList.concat(res.list)
          this.$message.success('获取订单列表成功')
          if(res.hasNextPage){
            this.busy = false
          }else{
            this.busy = true
          }
        })
        .catch(err => {
          this.$message.error(err)
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
@import './../assets/scss/config.scss';
@import './../assets/scss/mixin.scss';
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
      .pagination {
        text-align: right;
      }
      .load-button {
        text-align: center;
      }
    }
  }
}
</style>
