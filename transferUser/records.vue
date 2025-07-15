<template>
  <div class="releaseBox">
    <van-nav-bar title="记录" left-text="" right-text="" left-arrow @click-left="onClickLeft" />
    <div class="contentBox">
      <div class="listBox">
        <div class="tr">
          <span>{{ $t('nft.n29') }}</span> <span>{{ $t('nft.n30') }}</span>
          <span>{{ $t('nft.n31') }}</span> <span>uid</span>
        </div>
        <div v-for="item in recordList" :key="item" class="td">
          <span>{{ item.amount }}</span>
          <span>{{ item.symbol }}</span>
          <span>{{ item.createTime }}</span>
          <span>{{ item.remark }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { trsRecord } from '@/api/common/index'
import { ref } from 'vue'
import { createApp } from 'vue'
import { NavBar, List } from 'vant'
const $router = useRouter()
const app = createApp()
app.use(NavBar)
app.use(List)

const record = ref({})
const coinInfo = ref({})
const recordList = ref([])

const fetchData = async () => {
  const route = useRoute()
  const parmas = {
    coin: route.query.coin,
    type: '105',
    page: '1',
    size: '9999'
  }
  const res = await trsRecord(parmas)
  recordList.value = res.data
}

// 初始化数据
fetchData()

const onClickLeft = () => {
  window.history.back()
}

const onClickRight = () => {
  console.log('右侧按钮被点击')
}
</script>
<style lang="scss" scoped>
.releaseBox {
  :deep(.van-tab__text) {
    font-size: 16px;
  }
  :deep(.van-tabs__nav) {
    background: none !important;
  }
  :deep(.van-tabs__line) {
    display: none;
  }
  :deep(.van-tab--active) {
    font-weight: normal;
  }
  :deep(.van-tab) {
    color: var(--ex-home-list-ftcolor) !important;
  }
  :deep(.van-tab--active) {
    color: var(--ex-home-list-ftcolor3) !important;
  }
  :deep(.van-tabs__nav) {
    padding: 0;
  }
  :deep(.van-tab--shrink) {
    padding: 0 15px 10px 0;
  }
  .listBox {
    font-size: 12px;
    .td {
      span {
        width: 25%;
        text-align: center;
      }
      span:nth-child(1) {
        text-align: left;
      }
      span:nth-child(4) {
        text-align: right;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
    }
    .tr {
      span {
        width: 25%;
        text-align: center;
      }
      span:nth-child(1) {
        text-align: left;
      }
      span:nth-child(4) {
        text-align: right;
      }
      padding-top: 15px;
      display: flex;
      color: #9295a5;
      justify-content: space-between;
      padding-bottom: 15px;
    }
    padding: 15px;
    background: var(--ex-home-sidebar-address-bgcolor);
    border-radius: 5px 5px 5px 5px;
  }
  .contentBox {
    .balanceBox {
      display: flex;
      padding-top: 60px;
      padding-bottom: 35px;
      justify-content: space-around;
    }
    .balance {
      text-align: center;
      p:nth-child(1) {
        padding-bottom: 5px;
        font-size: 25px;
        color: #ffffff;
        font-weight: bold;
      }
      p:nth-child(2) {
        color: #b0b4b3;
        font-size: 15px;
        font-weight: 400;
      }
    }
    padding: 15px;
  }
  :deep .van-hairline--bottom:after {
    border: none;
  }
  :deep .van-nav-bar__text {
    color: #9295a5;
  }
 :deep .van-nav-bar__title {
    color: var(--ex-default-font-color);
  }
  :deep .van-icon-arrow-left {
    color: var(--ex-default-font-color);
  }
  :deep .van-nav-bar__content {
   background: var(--ex-default-background-color) !important ;
  }
}
</style>
