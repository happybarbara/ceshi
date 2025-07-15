<script setup>
import { lineuphold } from '@/api/common/index'
import { useRouter, useRoute } from 'vue-router'
const $router = useRouter()
const list = ref('')
const getPageInfo = async () => {
  const res = await lineuphold()
  console.log(res)
  list.value = res.data
}
getPageInfo()
const onClickLeft = async () => {
  window.history.back()
}
const onClickRight = async () => {
  $router.push('/mutualOrder')
}
const goJoin = async (info) => {
  $router.push('/mutualOrderDeatail?lineUpOrderId=' + info.lineUpOrderId)
}
</script>
<template>
  <div class="mutualBox">
    <van-nav-bar :title="$t('mutualInfo.m1')" left-text="" left-arrow @click-left="onClickLeft" />
    <div class="contentBox">
      <div class="list" v-for="item in list">
        <div class="info">
          <img src="@/assets/image/sp.png" alt="" />
          <div>
            <p>{{ item.remark }}</p>
            <p><span>{{$t('mutualInfo.m3')}}：</span> {{ item.minAmount }}usdt</p>
            <!-- <p><span>最小参与金额：</span> 100usdt</p> -->
            <p><span>{{$t('mutualInfo.m4')}}：</span> {{ item.dayRewardRatio * 100 }}%</p>
          </div>
        </div>
        <div class="button" @click="goJoin(item)">{{$t('mutualInfo.m6')}}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mutualBox {
  .contentBox {
    padding: 0 15px;

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
      .button {
        width: 100%;
        height: 45px;
        text-align: center;
        line-height: 45px;
        font-size: 16px;
        font-weight: bold;
        color: #0e0f18;
        margin-top: 20px;
        background: #00d77c;
        border-radius: 3px 3px 3px 3px;
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
