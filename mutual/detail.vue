<script setup>
import { useToast } from '@/hook/useToast'
import { useRouter, useRoute } from 'vue-router'
import { lineupconfigbyId, lineupbuy } from '@/api/common/index'
const $router = useRouter()
const route = useRoute()
const detail = ref('')
const { _toast } = useToast()
const onClickLeft = async () => {
  window.history.back()
}

const getPageInfo = async () => {
  const res = await lineupconfigbyId({ id: route.query.lineUpId })
  console.log(res)
  detail.value = res.data
}
getPageInfo()
const showJoin = ref(false)
const amount = ref('')
const needPay = ref('')
const getPayNumber = async () => {
  if (!amount.value) {
    needPay.value = ''
  } else {
    needPay.value = parseFloat(amount.value * detail.value.startRatio).toFixed(2)
  }
}

const cleanFun = async () => {
  amount.value = ''
  needPay.value = ''
}

const joinFun = async () => {
  const res = await lineupbuy({
    lineUpId: route.query.lineUpId,
    amount: amount.value
  })

  if (res.code == 200) {
    // 重置输入值和关闭弹窗
    amount.value = ''
    needPay.value = ''
    showJoin.value = false
    // 延迟显示提示
    setTimeout(() => {
      _toast('mutualInfo.m7')
    }, 500)
  } else {
    amount.value = ''
    needPay.value = ''
    showJoin.value = false
    _toast('mutualInfo.m8')
  }
}
</script>
<template>
  <div class="mutualDetailBox">
    <van-nav-bar :title="$t('mutual')" left-text="" left-arrow @click-left="onClickLeft" />
    <div class="contentBox">
      <div class="list">
        <div class="info">
          <img src="@/assets/image/sp.png" alt="" />
          <div>
            <p>{{ detail.remark }}</p>
            <p>
              <span>{{ $t('mutualInfo.m3') }}：</span> {{ detail.minAmount }} usdt
            </p>
            <p>
              <span>{{ $t('mutualInfo.m4') }}：</span> {{ detail.dayRewardRatio * 100 }}%
            </p>
          </div>
        </div>
      </div>
      <div class="cellBox">
        <div class="cell">
          <span>{{ $t('mutualInfo.m9') }}</span
          ><span>{{ detail.allTime }}{{ $t('mutualInfo.m10') }}</span>
        </div>
        <div class="cell">
          <span>{{ $t('mutualInfo.m11') }}</span
          ><span>{{ detail.lockTime }}{{ $t('mutualInfo.m10') }}</span>
        </div>
        <div class="cell">
          <span>{{ $t('mutualInfo.m12') }}</span
          ><span>{{ detail.startRatio * 100 }}%</span>
        </div>
        <div class="cell">
          <span>{{ $t('mutualInfo.m13') }}</span
          ><span>{{ detail.lockPayTime }}{{ $t('mutualInfo.m20') }}</span>
        </div>
      </div>
      <div class="button" @click="showJoin = true">{{ $t('mutualInfo.m14') }}</div>
    </div>
    <van-popup v-model:show="showJoin" @closed="cleanFun">
      <div class="joinBox">
        <p class="title">{{ $t('mutualInfo.m15') }}</p>
        <input
          type="text"
          :placeholder="$t('mutualInfo.m16')"
          @input="getPayNumber"
          v-model="amount"
        />
        <input type="text" :placeholder="$t('mutualInfo.m17')" :disabled="true" v-model="needPay" />
        <p class="tips">{{ $t('mutualInfo.m18') }} {{ detail.startRatio * 100 }}%</p>
        <div class="joinBtn" @click="joinFun">{{$t('mutualInfo.m19')}}</div>
      </div>
    </van-popup>
  </div>
</template>
<style lang="scss" scoped>
.mutualDetailBox {
  :deep(.van-popup--bottom) {
    max-width: var(--ex-max-width);
    margin: auto;
    left: 0;
    right: 0;
  }

  :deep(.van-popup) {
    border-radius: 15px;
    max-width: var(--ex-max-width);
    background: var(--ex-default-background-color);
  }

  :deep(.van-popup--left) {
    left: auto;
  }
  .joinBox {
    .textTips {
      padding: 15px 0;
    }

    .joinBtn {
      margin-top: 20px;
      width: 100%;
      height: 40px;
      background: #00a609;
      border-radius: 3px 3px 3px 3px;
      text-align: center;
      line-height: 40px;
      font-size: 16px;
      color: #ffffff;
      font-weight: 500;
    }

    .tips {
      padding-top: 10px;
      line-height: 20px;
      text-align: right;
      // padding: 15px 0;
    }

    input {
      padding: 15px;
      width: 100%;
      margin-top: 15px;
      font-size: 14px;
      background: var(--ex-home-box-background-color);
    }

    .title {
      text-align: center;
      font-size: 16px;
      font-weight: 600;
    }

    width: 300px;
    padding: 15px;
    background: var(--ex-default-background-color);
    border-radius: 15px;
    border-radius: 30px;
  }
  .button {
    width: 100%;
    height: 45px;
    text-align: center;
    line-height: 45px;
    font-size: 16px;
    font-weight: bold;
    color: #0e0f18;
    margin-top: 70px;
    background: #00d77c;
    border-radius: 3px 3px 3px 3px;
  }
  .contentBox {
    padding: 0 15px;
    .cellBox {
      padding: 15px;
      background: #131521;
      border-radius: 5px 5px 5px 5px;
      .cell {
        padding-top: 15px;
        border-bottom: 1px solid rgba(146, 149, 165, 0.18);
        padding-bottom: 15px;
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        span:nth-child(1) {
          color: #9295a5;
        }
      }
      .cell:first-child {
        padding-top: 0;
      }
      .cell:last-child {
        padding-bottom: 0;
        border: none;
      }
    }

    .list {
      .info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          width: 113px;
          height: 113px;
          margin-right: 15px;
        }
        div {
          p:nth-child(1) {
            font-weight: 500;
            color: #ffffff;
            font-size: 15px;
          }
          p:last-child {
            padding: 0 !important;
          }
          p {
            span {
              color: #9295a5 !important;
            }
            padding-bottom: 10px;
            font-size: 14px;
          }
        }
      }

      padding: 15px;
      background: #131521;
      border-radius: 5px 5px 5px 5px;
      margin-bottom: 15px;
    }
    .title {
      padding-bottom: 15px;
      font-size: 17px;
      font-weight: bold;
      color: #ffffff;
    }
    .banner {
      width: 100%;
      height: 140px;
      margin: 20px 0;
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
