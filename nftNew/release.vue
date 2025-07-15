<template>
  <div class="releaseBox">
    <van-nav-bar title="NFT" left-text="" right-text="" left-arrow @click-left="onClickLeft" />
    <div class="contentBox">
      <!-- <div class="balanceBox"> -->
      <div class="balance">
        <p>{{ $t('nft.n5') }}</p>
        <p>{{ coinInfo.total || 0 }} <font>RBC</font></p>
      </div>

      <!-- </div> -->
      <div class="balance">
        <p>{{ $t('nft.n6') }}</p>
        <p>{{ coinInfo.del || 0 }} <font>RBC</font></p>
      </div>
      <div class="balance">
        <p>{{ $t('nft.n7') }}</p>
        <p>{{ coinInfo.creatbonuse || 0 }} <font>RBC</font></p>
      </div>
      <div class="listBox">
        <div class="tr">
          <span>{{ $t('nft.n8') }}</span
          ><span>{{ $t('nft.n9') }}</span
          ><span>{{ $t('nft.n10') }}</span
          ><span>{{ $t('nft.n11') }}</span>
          <span>{{ $t('nft.n35') }}</span>
        </div>
        <div v-for="item in teamInfo" :key="item" class="td">
          <span>{{ item.createTime }}</span>
          <span>{{ item.amount }}</span>
          <span>{{ item.symbol }}</span>
          <span>{{ item.userId }}</span>
          <span v-if="item.type == '103'">{{ $t('nft.n33') }}</span>
          <span v-if="item.type == '106'">{{ $t('nft.n34') }}</span>
        </div>
        <!-- <van-tabs active="{{ active }}" bind:change="onChange">
          <van-tab :title="$t('nft.n25')"
            ><div class="tr">
              <span>{{ $t('nft.n8') }}</span
              ><span>{{ $t('nft.n9') }}</span
              ><span>{{ $t('nft.n10') }}</span
              ><span>{{ $t('nft.n11') }}</span>
            </div>
            <div v-for="item in teamInfo.l1list" :key="item" class="td">
              <span>{{ item.createTime }}</span>
              <span>{{ item.point }}</span>
              <span>RBC</span>
              <span>{{ item.userId }}</span>
            </div>
          </van-tab>
          <van-tab :title="$t('nft.n26')"
            ><div class="tr">
              <span>{{ $t('nft.n8') }}</span
              ><span>{{ $t('nft.n9') }}</span
              ><span>{{ $t('nft.n10') }}</span
              ><span>{{ $t('nft.n11') }}</span>
            </div>
            <div v-for="item in teamInfo.l2list" :key="item" class="td">
              <span>{{ item.createTime }}</span>
              <span>{{ item.point }}</span>
              <span>RBC</span>
              <span>{{ item.userId }}</span>
            </div></van-tab
          >
          <van-tab :title="$t('nft.n27')"
            ><div class="tr">
              <span>{{ $t('nft.n8') }}</span
              ><span>{{ $t('nft.n9') }}</span
              ><span>{{ $t('nft.n10') }}</span
              ><span>{{ $t('nft.n11') }}</span>
            </div>
            <div v-for="item in teamInfo.l3list" :key="item" class="td">
              <span>{{ item.createTime }}</span>
              <span>{{ item.point }}</span>
              <span>RBC</span>
              <span>{{ item.userId }}</span>
            </div></van-tab
          >
        </van-tabs> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { pageInfo, tj, trsRecord } from '@/api/common/index'
import { ref } from 'vue'
import { createApp } from 'vue'
import { NavBar, List } from 'vant'

const app = createApp()
app.use(NavBar)
app.use(List)

const teamInfo = ref({})
const coinInfo = ref({})
const list = ref([])

const fetchData = async () => {
  // const res = await pageInfo()
  // teamInfo.value = res.data

  const parmas = {
    coin: 'USDT',
    type: '103&106',
    page: '1',
    size: '9999'
  }
  const res = await trsRecord(parmas)
  teamInfo.value = res.data

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
      span:nth-child(5) {
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
      span:nth-child(5) {
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
      color: var(--ex-default-font-color);
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
