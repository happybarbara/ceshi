<template>
  <div class="releaseBox">
    <van-nav-bar title="保险" left-text="" right-text="" left-arrow @click-left="onClickLeft" />
    <div class="contentBox">
      <div class="listBox">
        <div class="tr"><span>{{$t('insurance.i8')}}</span><span>{{$t('insurance.i9')}}</span><span>{{$t('insurance.i10')}}</span></div>
        <div v-for="item in buyList" :key="item" class="td">
          <span>{{ item.createTime }}</span>
          <span v-if="item.state == 'Running'">{{$t('insurance.i11')}}</span>
          <span v-if="item.state == 'Error'">{{$t('insurance.i12')}}</span>
          <span v-if="item.state == 'Loading'">{{$t('insurance.i13')}}</span>
          <span v-if="item.state == 'Over'">{{$t('insurance.i14')}}</span>
          <span>{{ item.lose }} USDT</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { insuranceList, buyInsurance, insuranceHold } from '@/api/common/index'
import { pageInfo, tj, trsRecord } from '@/api/common/index'
import { ref } from 'vue'
import { createApp } from 'vue'
import { NavBar, List } from 'vant'

const app = createApp()
app.use(NavBar)
app.use(List)

const buyList = ref({})
const coinInfo = ref({})
const list = ref([])

const fetchData = async () => {
  // const res = await pageInfo()
  // teamInfo.value = res.data

  const res = await insuranceHold()
  buyList.value = res.data

  const res1 = await tj()
  coinInfo.value = res1.data
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
        width: 20%;
        text-align: center;
      }
      span:nth-child(1) {
        text-align: left;
      }
      span:nth-child(3) {
        text-align: right;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
    }
    .tr {
      span {
        width: 20%;
        text-align: center;
      }
      span:nth-child(1) {
        text-align: left;
      }
      span:nth-child(3) {
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
      font {
        font-weight: 800;
        font-size: 16px;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 30px 0;
      text-align: center;
      p:nth-child(1) {
        padding-bottom: 5px;
        font-size: 25px;
        padding-right: 10px;
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
