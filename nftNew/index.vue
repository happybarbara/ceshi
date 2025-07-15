<template>
  <div class="newNftBox">
    <van-nav-bar
      title="NFT"
      left-text=""
      :right-text="$t('nft.n1')"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <div class="contentBox">
      <div class="nftInfo">
        <img src="@/assets/image/nft.gif" alt="" />
        <div class="name">
          <p>
            <span v-if="myNft.length != list.length">{{ $t('nftNext') }}：</span>{{ fristNft.name }}
          </p>
          <p v-if="myNft.length != list.length">
            <span>{{ fristNft.price }}</span>
            <span>USDT</span>
          </p>
        </div>
      </div>
      <div class="timeOut" v-if="time > 0">
        <p>{{$t('nft.n36')}}</p>
        <van-count-down :time="time" :format="'DD ' + $t('day') + ' HH ' + ': mm ' + ': ss'" />
      </div>
      <div class="currentBox">
        <p>{{ currentNum }}%</p>
        <van-progress
          :percentage="currentNum"
          stroke-width="10"
          color="#00D77C"
          :show-pivot="false"
          track-color="#d9d9d9"
        />
      </div>

      <div
        class="btn"
        @click="makeNft"
        :class="{ disabled: isButtonDisabled }"
        v-if="myNft.length != list.length"
      >
        {{ $t('nft.n2') }}
      </div>
    </div>

    <van-overlay :show="isButtonDisabled">
      <div class="content">
        <van-loading size="42" color="#ffffff" />
      </div>
    </van-overlay>
  </div>
</template>

<script setup>
import { _t18 } from '@/utils/public'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from '@/hook/useToast'
import { ref, onMounted } from 'vue'
import { hold, nftList, buyNfT, tj } from '@/api/common/index'
import { Loading, Overlay, Progress, CountDown } from 'vant'
const app = createApp()
app.use(Overlay)
app.use(Loading)
// 使用 Toast
const { _toast } = useToast()
const $router = useRouter()

const time = ref()
// 创建响应式数据
const list = ref('')
const myNft = ref('')
const fristNft = ref('')
const current = ref('')
const currentNum = ref(0)

// 按钮禁用状态
const isButtonDisabled = ref(false)

// 获取页面信息
const getPageInfo = async () => {
  const res = await hold()
  myNft.value = res.data

  const res1 = await nftList()
  list.value = res1.data.filter((item) => item.isShow === 'Y')

  if (myNft.value.length === 0) {
    fristNft.value = res1.data[0]
  } else if (myNft.value.length != list.value.length) {
    fristNft.value = res1.data[myNft.value.length]
  } else if (myNft.value.length == list.value.length) {
    fristNft.value = res1.data[myNft.value.length - 1]
  }

  const res2 = await tj()
  console.log(res)
  current.value = res2.data

  if (myNft.value.length > 0) {
    // 获取数组中的最后一个元素
    const currentNft = myNft.value[myNft.value.length - 1]
    const createTime = new Date(currentNft.createTime.replace(/-/g, '/')).getTime()
    const currentMilliseconds = new Date().getTime()
    const nftTimeOutMilliseconds = res2.data.nftTimeOut * 24 * 60 * 60 * 1000
    const endTime = createTime + nftTimeOutMilliseconds
    time.value = endTime - currentMilliseconds
  }

  currentNum.value = parseFloat(current.value.creatbonuse / current.value.allNft).toFixed(2)
  currentNum.value = currentNum.value * 100
}

// 处理购买 NFT
const makeNft = async () => {
  if (isButtonDisabled.value) {
    // 如果按钮被禁用了，就返回
    return
  }

  isButtonDisabled.value = true // 显示遮罩层
  const params = {
    nftId: fristNft.value.nftId
  }

  const timeout = setTimeout(() => {
    isButtonDisabled.value = false // 10秒后强制隐藏遮罩层
  }, 10000)

  try {
    const res = await buyNfT(params)

    if (res.code == '501') {
      _toast('nft.n3')
    } else if (res.code == '200') {
      _toast('nft.n4')
      getPageInfo()
    }

    // 3秒后隐藏遮罩层
    setTimeout(() => {
      isButtonDisabled.value = false
      clearTimeout(timeout) // 如果接口返回，取消最大超时
    }, 5000)
  } catch (error) {
    console.error(error)
    // 在发生错误时，也要确保在10秒内解除遮罩
  }
}

// 在组件挂载时获取页面信息
onMounted(getPageInfo)

// 定义点击方法
const onClickLeft = () => {
  window.history.back()
}

const onClickRight = () => {
  $router.push('/release')
}
</script>

<style lang="scss" scoped>
.newNftBox {
  .timeOut {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    p {
      padding: 15px 0;
    }
    color: var(--ex-default-font-color);
    .van-count-down {
      font-size: 14px;
      color: var(--ex-default-font-color);
    }
  }
  .currentBox {
    padding-top: 15px;
    p {
      font-size: 15px;
      color: var(--ex-default-font-color);
      font-weight: 500;
      padding-bottom: 15px;
    }
  }
  .content {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  .contentBox {
    position: relative;
    padding: 15px;
    .btn {
      position: fixed;
      bottom: 68px;
      width: 345px;
      height: 40px;
      background: #00a609;
      border-radius: 3px 3px 3px 3px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      color: #ffffff;
      font-weight: 500;
    }
    .nftInfo {
      display: flex;
      justify-content: flex-start;
      // align-items: center;
      padding: 15px;
      .name {
        p:nth-child(1) {
          font-size: 15px;
          color: var(--ex-default-font-color);
          font-weight: 500;
          padding-bottom: 20px;
        }
        p:nth-child(2) {
          display: flex;
          justify-content: flex-start;

          span:nth-child(1) {
            font-weight: 400;
            font-size: 23px;
            color: var(--ex-default-font-color);
          }
          span:nth-child(2) {
            padding-top: 8px;
            padding-left: 5px;
            font-size: 13px;
            color: var(--ex-default-font-color);
            font-weight: 400;
          }
        }
      }
      img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #707070;
      }
      background: var(--ex-home-box-background-color);
      box-shadow: 0px 6 7px 1px rgba(0, 0, 0, 0.1);
      border-radius: 5px 5px 5px 5px;
    }
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
