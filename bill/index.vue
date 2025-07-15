<template>
  <div class="releaseBox">
    <van-nav-bar
      :title="$t('bill')"
      left-text=""
      right-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="contentBox">
      <div class="listBox">
        <van-tabs v-model:active="active" bind:change="onChange" @change="changeTab">
          <van-tab :title="$t('billInfo.b1')"> </van-tab>
          <van-tab :title="$t('billInfo.b2')"></van-tab>
          <van-tab :title="$t('billInfo.b3')"></van-tab>
        </van-tabs>
        <div class="tr">
          <span>{{ $t('nft.n8') }}</span>
          <span>{{ $t('billInfo.b4') }}</span>
          <span>{{ $t('nft.n10') }}</span>
          <span>{{ $t('billInfo.b5') }}</span>
        </div>
        <div v-for="item in billList" :key="item" class="td">
          <span>{{ item.createTime }}</span>
          <span>{{ item.amount }}</span>
          <span>{{ item.symbol }}</span>
          <span v-if="item.type == '1'">{{ $t('billInfo.b6') }}</span>
          <span v-if="item.type == '2'">{{ $t('billInfo.b7') }}</span>
          <span v-if="item.type == '5'">{{ $t('billInfo.b8') }}</span>
          <span v-if="item.type == '7'">{{ $t('financial') }}+</span>
          <span v-if="item.type == '8'">{{ $t('billInfo.b9') }}</span>
          <span v-if="item.type == '9'">{{ $t('billInfo.b10') }}</span>
          <span v-if="item.type == '10'">{{ $t('billInfo.b11') }}</span>
          <span v-if="item.type == '11'">{{ $t('billInfo.b12') }}</span>
          <span v-if="item.type == '12'">{{ $t('billInfo.b13') }}</span>
          <span v-if="item.type == '13'">{{ $t('billInfo.b14') }}</span>
          <span v-if="item.type == '14'">{{ $t('billInfo.b15') }}</span>
          <span v-if="item.type == '15'">{{ $t('billInfo.b16') }}</span>
          <span v-if="item.type == '21'">{{ $t('billInfo.b17') }}</span>
          <span v-if="item.type == '22'">{{ $t('billInfo.b18') }}</span>
          <span v-if="item.type == '32'">{{ $t('billInfo.b19') }}</span>
          <span v-if="item.type == '34'">{{ $t('billInfo.b20') }}</span>
          <span v-if="item.type == '36'">{{ $t('billInfo.b21') }}</span>
          <span v-if="item.type == '37'">{{ $t('billInfo.b22') }}</span>
          <span v-if="item.type == '52'">{{ $t('billInfo.b23') }}</span>
          <span v-if="item.type == '101'">{{ $t('billInfo.b24') }}</span>
          <span v-if="item.type == '102'">{{ $t('billInfo.b25') }}</span>
          <span v-if="item.type == '103'">{{ $t('billInfo.b26') }}</span>
          <span v-if="item.type == '104'">{{ $t('billInfo.b27') }}</span>
          <span v-if="item.type == '105'">{{ $t('billInfo.b28') }}</span>
          <span v-if="item.type == '106'">{{ $t('billInfo.b29') }}</span>
          <span v-if="item.type == '107'">{{ $t('billInfo.b30') }}</span>
          <span v-if="item.type == '108'">{{ $t('billInfo.b31') }}</span>
          <span v-if="item.type == '109'">{{ $t('billInfo.b32') }}</span>
          <span v-if="item.type == '110'">{{ $t('billInfo.b33') }}</span>
          <span v-if="item.type == '28'">{{ $t('billInfo.b34') }}</span>
          <span v-if="item.type == '27'">{{ $t('billInfo.b35') }}</span>
          <span v-if="item.type == '120'">{{ $t('billInfo.b36') }}</span>
          <span v-if="item.type == '121'">{{ $t('billInfo.b37') }}</span>
          <span v-if="item.type == '122'">{{ $t('billInfo.b38') }}</span>
          <span v-if="item.type == '35'">{{ $t('transfer') }}</span>
          <span v-if="item.type == '171'">购买预约起始支付</span>
          <span v-if="item.type == '172'">预约订单锁仓前支付</span>
          <span v-if="item.type == '173'">预约订单发放奖励</span>
        </div>
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

const active = ref(0)
const billList = ref({})
const coinInfo = ref({})
const list = ref([])

const changeTab = async () => {
  fetchData()
}
const fetchData = async () => {
  const type = ref('')
  //资金账户
  if (active.value == '0') {
    type.value =
      '171&172&173&1&2&5&6&7&8&9&10&11&12&13&14&15&21&22&27&28&29&32&34&36&37&52&53&54&101&102&103&104&105&106&107&108&109&110&120&121&122&35'
  } else if (active.value == '1') {
    type.value = '6&7&55'
  } else if (active.value == '2') {
    type.value = '27&28&29&53&54'
  }

  const parmas = {
    type: type.value,
    page: '1',
    size: '9999'
  }
  const res = await trsRecord(parmas)
  billList.value = res.data

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
