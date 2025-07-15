<template>
  <div class="insuranceBox">
    <van-nav-bar :title="$t('insurance.i1')" left-text="" left-arrow @click-left="onClickLeft" right-text="记录"  @click-right="onClickRight"/>
    <div class="productBox">
      <div class="product" v-for="(item, index) in list" :key="index">
        <img src="@/assets/image/baoxian.png" alt="" />
        <div class="info">
          <p class="title">{{ $t('insurance.i1') }}{{ index + 1 }}</p>
          <div class="text">{{ $t('insurance.i2') }}{{ item.config }}</div>
          <div class="text">{{ $t('insurance.i3') }}{{ item.price }}</div>
          <div class="btn" @click="buyFun(item)">
            {{ $t('insurance.i4') }}
          </div>
         
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { _t18 } from '@/utils/public'
import { useToast } from '@/hook/useToast'
import { insuranceList, buyInsurance, insuranceHold } from '@/api/common/index'
import { useRouter } from 'vue-router'
import { createApp } from 'vue'
import { NavBar } from 'vant'

const { _toast } = useToast()
const app = createApp()
app.use(NavBar)

// 定义点击方法
const onClickLeft = () => {
  window.history.back()
}

const $router = useRouter()
const list = ref([]) // 存储处理后的保险列表

const buyFun = async (info) => {
  try {
    const res = await buyInsurance({ insuranceId: info.insuranceId }) // 修正传参
    console.log(res)
    if (res.code == '501') {
      _toast('nft.n3')
    } else if (res.code == '200') {
      _toast('nft.n4')
      getPageInfo()
    } else if (res.code == '509') {
      _toast('insurance.i6')
    }
  } catch (error) {
    console.error('Error buying insurance:', error)
  }
}

// 获取页面信息
const getPageInfo = async () => {
  try {
    const res = await insuranceHold() // 获取已拥有的保险
    console.log('Owned Insurance:', res)

    const res1 = await insuranceList() // 获取全部保险
    console.log('All Insurance:', res1)

    // 进行比对并更新列表
    list.value = res1.data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const onClickRight = () => {
  $router.push('/insuranceRecords')
}

onMounted(getPageInfo)
</script>

<style lang="scss" scoped>
.insuranceBox {
  .dis {
    background: #cccccc !important;
  }
  .productBox {
    .btn {
      width: 118px;
      height: 40px;
      background: #00a609;
      //   #3E404A
      border-radius: 3px 3px 3px 3px;
      text-align: center;
      line-height: 40px;
      margin: auto;
      margin-top: 20px;
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
    .text {
      font-weight: 500;
      font-size: 13px;
      color: #9295a5;
    }
    .product {
      margin-top: 15px;
      border-radius: 5px;
      background: var(--ex-home-sidebar-address-bgcolor);
    }
    .info {
      padding: 10px;
      .title {
        font-weight: bold;
        font-size: 16px;
        color: var(--ex-default-font-color);
        padding-bottom: 10px;
      }
    }
    img {
      width: 100%;
    }
    padding: 0 15px;
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
