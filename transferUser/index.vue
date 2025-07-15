<template>
  <div class="transferBox">
    <van-nav-bar
      :title="$t('nft.n12')"
      left-text=""
      :right-text="$t('nft.n28')"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="contentBox">
      <div class="cellInput">
        <input type="text" :placeholder="$t('nft.n13')" v-model="toId" />
      </div>
      <div class="cellInput" @click="show = true">{{ coin }}</div>
      <div class="cellInput">
        <input type="text" :placeholder="$t('nft.n14')" v-model="amount" />
      </div>
      <div class="cellBox">
        <span>{{ $t('nft.n15') }}</span
        ><span>{{ transferInfo.amount || 0 }}</span>
      </div>
      <div class="cellBox">
        <span>{{ $t('nft.n16') }}</span
        ><span> {{ transferInfo.fee || 0 }}</span>
      </div>
      <div class="btn" @click="conFun">{{ $t('nft.n17') }}</div>
    </div>

    <van-popup v-model:show="show" position="bottom">
      <van-picker title="" :columns="columns" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>
<script setup>
import { _t18 } from '@/utils/public'
import { trs, trsInfo } from '@/api/common/index'
import { useRouter, useRoute } from 'vue-router'
import { createApp } from 'vue'
import { NavBar, Popup, Picker } from 'vant'
import { useToast } from '@/hook/useToast'
const app = createApp()
app.use(NavBar)
app.use(Popup)
app.use(Picker)
const { _toast } = useToast()

const coin = ref('RBC')

const $router = useRouter()

// 定义点击方法
const onClickLeft = () => {
  window.history.back()
}

const columns = [
  { text: 'RBC', value: 'RBC' },
  { text: 'USDT', value: 'USDT' }
]

const onConfirm = ({ selectedValues }) => {
  coin.value = selectedValues.join(',')
  show.value = false
  getPageInfo()
}

const toId = ref('')
const amount = ref('')

const show = ref(false)

const transferInfo = ref({})

const onClickRight = async () => {
  $router.push('/transferRecord?coin=' + coin.value)
}

// 获取页面信息
const getPageInfo = async () => {
  const params = {
    coin: coin.value
  }
  const res = await trsInfo(params)
  transferInfo.value = res.data
}

onMounted(getPageInfo)

const conFun = async () => {
  if (!toId.value) {
    return _toast('nft.n18')
  }
  if (!amount.value) {
    return _toast('nft.n19')
  }

  var params = {
    amount: amount.value,
    toId: toId.value,
    coin: coin.value
  }

  const res = await trs(params)
  console.log(res)
  if (res.code == '503') {
    return _toast('nft.n20')
  } else if (res.code == '501') {
    _toast('nft.n21')
  } else if (res.code == '200') {
    _toast('nft.n22')
  } else if (res.code == '505') {
    _toast('nft.n23')
  } else if (res.code == '511') {
    _toast('nft.n32')
  }
  amount.value = ''
  toId.value = ''
  getPageInfo()
}
</script>
<style lang="scss" scoped>
.transferBox {
  .contentBox {
    .btn {
      height: 40px;
      background: #00a609;
      text-align: center;
      line-height: 40px;
      margin-top: 20px;
      border-radius: 3px 3px 3px 3px;
      font-size: 16px;
      color: #ffffff;
      width: 100%;
    }
    .cellBox {
      span:nth-child(1) {
        color: #9295a5;
      }
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: var(--ex-default-font-color);
      font-weight: 500;
      padding-bottom: 10px;
    }
    .cellInput {
      margin-bottom: 15px;
      background: var(--ex-home-sidebar-address-bgcolor);
      border-radius: 5px 5px 5px 5px;
      padding: 15px;
      select {
        width: 100%;
        background: var(--ex-home-sidebar-address-bgcolor);
        font-size: 14px;
        color: var(--ex-default-font-color);
      }

      input {
        background: var(--ex-home-sidebar-address-bgcolor);
        font-size: 14px;
        width: 100%;
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
