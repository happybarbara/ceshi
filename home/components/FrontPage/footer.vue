<template>
  <div class="footer">
    <!-- 热门币种 -->
    <!-- <h1 class="title" @click="handelShowTab(0)">{{ _t18('coinbase_h_l_hot') }}</h1> -->
    <!-- <div class="tab_title">
      <h1 :class="showTab===0?'active title':'title'" @click="handelShowTab(0)">{{ _t18('coinbase_h_l_hot') }}<i></i></h1>
      <h1 :class="showTab===1?'active title':'title'" @click="handelShowTab(1)">外汇币种<i></i></h1>
    </div> -->
    <div class="headerChoose">
      <van-tabs
        v-model:active="showTab"
        line-width="20"
        line-height="2"
        title-active-color="#00D77C"
        color="#00D77C"
        title-inactive-color="#5d626d"
        @click-tab="handelShowTab(showTab)"
        shrink
      >
        <van-tab v-for="(item, index) in headerList" :key="index">
          <template #title>
            <div v-if="item.show">{{ item.name }}</div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="main">
      <!-- 名称 最新价 涨跌幅 -->
      <div class="header-list">
        <div class="item" @click="toDealSort">
          <div>{{ _t18(`home_currencyName`, ['latcoin']) }}</div>
          <div class="arrows" v-if="['latcoin'].includes(_getConfig('_APP_ENV'))">
            <svg-load v-if="arrowList.firstIcon === 0" name="moren" class="itemImg"></svg-load>
            <svg-load v-if="arrowList.firstIcon === 1" name="gao" class="itemImg"></svg-load>
            <svg-load v-if="arrowList.firstIcon === 2" name="di" class="itemImg"></svg-load>
          </div>
        </div>
        <div class="item" @click="toUpSort">
          <div>{{ _t18(`home_newPrice`, ['latcoin']) }}</div>
          <div class="arrows" v-if="['latcoin'].includes(_getConfig('_APP_ENV'))">
            <svg-load v-if="arrowList.secondIcon === 0" name="moren" class="itemImg"></svg-load>
            <svg-load v-if="arrowList.secondIcon === 1" name="gao" class="itemImg"></svg-load>
            <svg-load v-if="arrowList.secondIcon === 2" name="di" class="itemImg"></svg-load>
          </div>
        </div>
        <div class="item" @click="toRafSort">
          <div>{{ _t18(`home_upDown`, ['latcoin', 'aams']) }}</div>
          <div class="arrows" v-if="['latcoin'].includes(_getConfig('_APP_ENV'))">
            <svg-load v-if="arrowList.thirdIcon === 0" name="moren" class="itemImg"></svg-load>
            <svg-load v-if="arrowList.thirdIcon === 1" name="gao" class="itemImg"></svg-load>
            <svg-load v-if="arrowList.thirdIcon === 2" name="di" class="itemImg"></svg-load>
          </div>
        </div>
      </div>

      <!-- <div v-if="tradeStore.secondContractCoinList.length">
          <CurrencyItem
            v-for="(item, index) in tradeStore.secondContractCoinList"
            :key="index"
            :currencyItem="item"
            @click="linkTo(item)"
          ></CurrencyItem>
      </div>
      <Nodata v-else></Nodata> -->

      <div v-if="showTab === 0 && headerList[0].show">
        <div v-if="currentCoinList0.length">
          <CurrencyItem
            v-for="(item, index) in currentCoinList0"
            :key="index"
            :currencyItem="item"
            @click="linkTo(item)"
          ></CurrencyItem>
        </div>
        <Nodata v-else></Nodata>
      </div>
      <div v-if="showTab === 1 && headerList[1].show">
        <div v-if="currentCoinList1.length">
          <CurrencyItem
            v-for="(item, index) in currentCoinList1"
            :key="index"
            :currencyItem="item"
            @click="linkTo(item)"
          ></CurrencyItem>
        </div>
        <Nodata v-else></Nodata>
      </div>
      <div v-if="showTab === 2 && headerList[2].show">
        <div v-if="currentCoinList2">
          <CurrencyItem
            v-for="(item, index) in currentCoinList2"
            :key="index"
            :currencyItem="item"
            @click="linkTo(item)"
          ></CurrencyItem>
        </div>
        <Nodata v-else></Nodata>
      </div>
    </div>
    <div class="contentBox">
      <p class="colorTitle">{{$t('footer.f1')}}</p>
      <div class="colorContentBox">
        <div class="colorContent">
          <div class="dataBgColor"></div>
          <div class="colorInfo">
            <div class="colorData">
              <div>
                <p>780{{$t('footer.f2')}}</p>
                <p>{{$t('footer.f3')}}</p>
              </div>
              <div>
                <p>190+</p>
                <p>{{$t('footer.f4')}}</p>
              </div>
              <div>
                <p>$207B+</p>
                <p>{{$t('footer.f5')}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="buyBox">
        <p class="title">{{$t('footer.f6')}}</p>

        <div class="buyInfo">
          <div class="buyOne">
            <img src="@/assets/image/icon1.png" alt="" /> 
            <span>{{$t('footer.f7')}} Robin {{$t('footer.f8')}}</span>
          </div>
          <div class="buyTwo">
            <img src="@/assets/image/jt.png" alt="" />
          </div>
          <div class="buyThree">
            <img src="@/assets/image/icon2.png" alt="" />
            <p>{{$t('footer.f9')}}</p>
          </div>
          <div class="buyFour">
            <img src="@/assets/image/jt2.png" alt="" />
          </div>
          <div class="buyFive">
            <img src="@/assets/image/icon3.png" alt="" />
            <p>{{$t('footer.f10')}}</p>
          </div>
          <div class="buySix">
            <img src="@/assets/image/jt3.png" alt="" />
          </div>
          <div class="buySeven">
            <span>{{$t('footer.f11')}}</span>
            <img src="@/assets/image/icon4.png" alt="" />
          </div>
        </div>
      </div>

      <div class="nftBox">
        <p>{{$t('footer.f12')}}</p>
        <p>{{$t('footer.f13')}}</p>
      </div>
      <div class="nftBtn">
        <span>{{$t('footer.f14')}}</span>
      </div>

      <div class="friendBox">
        <p class="titleOne">{{$t('footer.f15')}}</p>
        <p class="titleTwo">{{$t('footer.f16')}}</p>
        <div class="threeBox">
          <div>
            <img src="@/assets/image/cbj.png" alt="" />
            <p>{{$t('footer.f17')}}</p>
            <p>{{$t('footer.f18')}}</p>
          </div>
          <div>
            <img src="@/assets/image/lcc.png" alt="" />
            <p>{{$t('footer.f19')}}</p>
            <p>{{$t('footer.f20')}}</p>
          </div>
          <div>
            <img src="@/assets/image/bhjj.png" alt="" />
            <p>{{$t('footer.f21')}}</p>
            <p>{{$t('footer.f22')}}</p>
          </div>
        </div>
        <div class="fourBox">
          <div>
            <p>{{$t('footer.f23')}}</p>
            <p>
              {{$t('footer.f24')}}
            </p>
            <img src="@/assets/image/js.png" alt="" />
          </div>
          <div>
            <p>{{$t('footer.f25')}}</p>
            <p>{{$t('footer.f26')}}</p>
            <img src="@/assets/image/hz.png" alt="" />
          </div>
          <div>
            <p>{{$t('footer.f27')}}</p>
            <p>{{$t('footer.f28')}}</p>
            <img src="@/assets/image/qqh.png" alt="" />
          </div>
          <div>
            <p>{{$t('footer.f30')}}</p>
            <p>{{$t('footer.f29')}}</p>
            <img src="@/assets/image/jl.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {
  letterSmallToLarge,
  letterLargeToSmall,
  LatestpriceLargeToSmall,
  LatestpriceSmallToLarge,
  filterKeyWord
} from '@/utils/filters'
import CurrencyItem from '@/components/CurrencyList/currencyItem.vue'
import { useTradeStore } from '@/store/trade/index'
import { useMainStore } from '@/store/index.js'
import { useRouter } from 'vue-router'
import { _t18 } from '@/utils/public'
const tradeStore = useTradeStore()
const mainStroe = useMainStore()
const $router = useRouter()
const linkTo = (item) => {
  if (!['latcoin'].includes(__config._APP_ENV)) {
    mainStroe.setTradeStatus(Number(0))
    $router.push(`/trade?symbol=${item.coin}`)
  } else {
    mainStroe.setTradeStatus(Number(0))
    $router.push(`/tradeU?symbol=${item.coin}`)
  }
}
const headerList = computed(() => {
  return [
    {
      name: _t18(`coinbase_h_l_hot`, ['latcoin']),
      show: true
    },
    {
      name: _t18(`coinbase_h_l_out`, ['latcoin']),
      show: true
    },
    {
      name: _t18(`coinbase_h_l_gold`),
      show: ['latcoin'].includes(__config._APP_ENV) ? false : true
    }
  ]
})
const currentCoinList0 = ref(
  tradeStore.secondContractCoinList.filter((it, inx) => {
    return it.coinType == 2
  })
)
const currentCoinList1 = ref(
  tradeStore.secondContractCoinList.filter((it, inx) => {
    return it.coinType == 1
  })
)
const currentCoinList2 = ref(
  tradeStore.secondContractCoinList.filter((it, inx) => {
    return it.coinType == 3
  })
)
// 筛选
let arrowList = ref({
  firstIcon: 0,
  secondIcon: 0,
  thirdIcon: 0
})
// 切换名称
const toDealSort = () => {
  arrowList.value.secondIcon = 0
  arrowList.value.thirdIcon = 0
  console.log(arrowList.value)
  if (arrowList.value.firstIcon == 0) {
    arrowList.value.firstIcon = 1
    currentCoinList0.value = letterSmallToLarge(currentCoinList0.value, 'coin')
    currentCoinList1.value = letterSmallToLarge(currentCoinList1.value, 'coin')
    currentCoinList2.value = letterSmallToLarge(currentCoinList2.value, 'coin')
  } else if (arrowList.value.firstIcon == 1) {
    arrowList.value.firstIcon = 2
    currentCoinList0.value = letterLargeToSmall(currentCoinList0.value, 'coin')
    currentCoinList1.value = letterLargeToSmall(currentCoinList1.value, 'coin')
    currentCoinList2.value = letterLargeToSmall(currentCoinList2.value, 'coin')
  } else if (arrowList.value.firstIcon == 2) {
    arrowList.value.firstIcon = 0
    currentCoinList0.value = tradeStore.secondContractCoinList.filter((it, inx) => {
      return it.coinType == 2
    })
    currentCoinList1.value = tradeStore.secondContractCoinList.filter((it, inx) => {
      return it.coinType == 1
    })
    currentCoinList2.value = tradeStore.secondContractCoinList.filter((it, inx) => {
      return it.coinType == 3
    })
  }
}
// 切换最新价
const toUpSort = () => {
  arrowList.value.firstIcon = 0
  arrowList.value.thirdIcon = 0
  console.log(arrowList.value)
  if (arrowList.value.secondIcon == 0) {
    arrowList.value.secondIcon = 1
    currentCoinList0.value = LatestpriceLargeToSmall(
      currentCoinList0.value,
      tradeStore.allCoinPriceInfo,
      'close'
    )
    currentCoinList1.value = LatestpriceLargeToSmall(
      currentCoinList1.value,
      tradeStore.allCoinPriceInfo,
      'close'
    )
    currentCoinList2.value = LatestpriceLargeToSmall(
      currentCoinList2.value,
      tradeStore.allCoinPriceInfo,
      'close'
    )
  } else if (arrowList.value.secondIcon == 1) {
    arrowList.value.secondIcon = 2
    currentCoinList0.value = LatestpriceSmallToLarge(
      currentCoinList0.value,
      tradeStore.allCoinPriceInfo,
      'close'
    )
    currentCoinList1.value = LatestpriceSmallToLarge(
      currentCoinList1.value,
      tradeStore.allCoinPriceInfo,
      'close'
    )
    currentCoinList2.value = LatestpriceSmallToLarge(
      currentCoinList2.value,
      tradeStore.allCoinPriceInfo,
      'close'
    )
  } else if (arrowList.value.secondIcon == 2) {
    arrowList.value.secondIcon = 0
    currentCoinList0.value = tradeStore.secondContractCoinList.filter((it, inx) => {
      return it.coinType == 2
    })
    currentCoinList1.value = tradeStore.secondContractCoinList.filter((it, inx) => {
      return it.coinType == 1
    })
    currentCoinList2.value = tradeStore.secondContractCoinList.filter((it, inx) => {
      return it.coinType == 3
    })
  }
}
// 切换涨跌
const toRafSort = () => {
  arrowList.value.firstIcon = 0
  arrowList.value.secondIcon = 0
  if (arrowList.value.thirdIcon === 0) {
    arrowList.value.thirdIcon = 1
    currentCoinList0.value = LatestpriceLargeToSmall(
      currentCoinList0.value,
      tradeStore.allCoinPriceInfo,
      'change',
      1
    )
    currentCoinList1.value = LatestpriceLargeToSmall(
      currentCoinList1.value,
      tradeStore.allCoinPriceInfo,
      'change',
      1
    )
    currentCoinList2.value = LatestpriceLargeToSmall(
      currentCoinList2.value,
      tradeStore.allCoinPriceInfo,
      'change',
      1
    )
  } else if (arrowList.value.thirdIcon === 1) {
    arrowList.value.thirdIcon = 2
    currentCoinList0.value = LatestpriceSmallToLarge(
      currentCoinList0.value,
      tradeStore.allCoinPriceInfo,
      'change',
      1
    )
    currentCoinList1.value = LatestpriceSmallToLarge(
      currentCoinList1.value,
      tradeStore.allCoinPriceInfo,
      'change',
      1
    )
    currentCoinList2.value = LatestpriceSmallToLarge(
      currentCoinList2.value,
      tradeStore.allCoinPriceInfo,
      'change',
      1
    )
  } else if (arrowList.value.thirdIcon === 2) {
    arrowList.value.thirdIcon = 0
    currentCoinList0.value = tradeStore.secondContractCoinList.filter((it, inx) => {
      return it.coinType == 2
    })
    currentCoinList1.value = tradeStore.secondContractCoinList.filter((it, inx) => {
      return it.coinType == 1
    })
    currentCoinList2.value = tradeStore.secondContractCoinList.filter((it, inx) => {
      return it.coinType == 3
    })
  }
}
const showTab = ref(['ebc'].includes(__config._APP_ENV) ? 1 : 0)
const handelShowTab = (item) => {
  showTab.value = item
}
</script>
<style lang="scss" scoped>
.footer {
  .friendBox {
    .fourBox {
      div {
        img {
          position: absolute;
          width: 35px;
          height: 35px;
          right: 0;
          top: 0;
        }
        p:nth-child(1){
          font-size: 14px;color: #FFFFFF;font-weight: 500;
          padding-bottom:10px;
        }
        p:nth-child(2){
          width: 312px;color: #7F7F81;line-height: 18px;font-size: 13px;font-weight: 500;
        }
        position: relative;
        width: 345px;
        height: 114px;
        background: #131521;
        border-radius: 10px 10px 10px 10px;
        padding: 15px 10px;
        margin: auto;
        margin-bottom: 15px;
      }
    }
    .threeBox {
      margin-bottom: 35px;
      div {
        position: relative;
        width: 345px;
        height: 188px;
        position: relative;
        p:nth-child(2) {
          text-align: center;
          font-size: 18px;
          color: #ffffff;
          font-weight: 500;
          padding-top: 64px;
          padding-bottom: 25px;
        }
        p:nth-child(3) {
          font-size: 14px;
          color: #7f7f81;
          font-weight: 500;
          width: 212px;
          margin: auto;
          text-align: center;
        }
        img {
          width: 95px;
          height: 95px;
          position: absolute;
          left: 50%;
          top: -48px;
          margin-left: -47.5px;
        }
        margin: auto;

        background: url('@/assets/image/friendBg.png');
        background-size: 100% 100%;
      }
      div:nth-child(2) {
        margin: 63px auto;
      }
    }

    .titleOne {
      font-weight: 500;
      font-size: 18px;
      color: var(--ex-font-color6);
      padding-bottom: 15px;
      
      text-align: center;
    }
    .titleTwo {
      font-weight: 400;
      font-size: 12px;
      padding:0 10px;
     color: var(--ex-font-color6);
      padding-bottom: 73px;
      text-align: center;
    }
  }
  .nftBtn {
    width: 178px;
    height: 35px;
    margin: auto;
    margin-bottom: 50px;
    line-height: 35px;
    span {
      padding-top: 8px;
      color:#ffffff;
      padding-left: 22px;
    }
    background: url('@/assets/image/nftBtn.png');
    background-size: 100% 100%;
  }
  .nftBox {
    p:nth-child(1) {
      padding-top: 32px;
      padding-left: 12px;
      font-weight: 500;
      font-size: 20px;
       color: var(--ex-font-color6);
    }
    p:nth-child(2) {
      padding-left: 12px;
      padding-top: 10px;
      width: 142px;
      height: 37px;
      font-weight: bold;
      font-size: 12px;
      line-height: 24px;
      color: #3ea7be;
    }

    width: 345px;
    height: 138px;
    background: url('@/assets/image/nftBg.png');
    background-size: 100% 100%;
    margin: auto;
    margin-top: 39px;
    margin-bottom: 21px;
  }

  .buyBox {
    height: 300px;
    .buyInfo {
      width: 352px;
      position: relative;
      margin: auto;
      .buyOne {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          width: 70px;
          height: 70px;
        }
        span {
          font-weight: bold;
          font-size: 12px;
          padding-left: 18px;
          color: #7f7f81;
        }
        position: absolute;
        left: 0;
        top: 0;
      }
      .buyTwo {
        position: absolute;
        left: 28px;
        top: 70px;
        img {
          width: 48px;
          height: 37px;
        }
      }
      .buyThree {
        position: absolute;
        left: 70px;
        top: 90px;
        text-align: center;
        img {
          width: 70px;
          height: 70px;
        }

        p {
          font-weight: bold;
          padding-top: 10px;
          text-align: left;
          position: absolute;
          font-size: 12px;
          color: #7f7f81;
          width: 400px;
        }
      }
      .buyFour {
        position: absolute;
        left: 132px;
        img {
          width: 98px;
          height: 20px;
        }
        top: 127px;
      }
      .buyFive {
        text-align: center;
        position: absolute;
        right: 55px;
        top: 125px;
        img {
          width: 70px;
          height: 70px;
        }
        p {
          font-weight: bold;
          text-align: left;
          font-size: 12px;
          width: 400px;
          padding-top: 10px;
          color: #7f7f81;
          position: absolute;
        }
      }
      .buySix {
        position: absolute;
        right: 30px;
        top: 90px;
        img {
          width: 44px;
          height: 57px;
        }
      }
      .buySeven {
        position: absolute;
        right: 0;
        top: 30px;
        display: flex;
        justify-content: right;
        img {
          width: 70px;
          height: 70px;
        }

        align-items: center;
        span {
          font-weight: bold;
          padding-right: 18px;
          font-size: 12px;
          color: #7f7f81;
        }
      }
    }
    .title {
      font-size: 18px;
       color: var(--ex-font-color6);
      font-weight: 500;
      padding-top: 40px;
      padding-bottom: 15px;
      text-align: center;
    }
  }
  .contentBox {
    .dataBgColor {
      width: 200%;
      height: 100%;
      content: '';
      position: absolute;

      top: 0;
      left: 0;

      background-image: linear-gradient(
        92deg,
        #048ffb 9%,
        #01cbcb 25.61%,
        #2757fb 46.95%,
        #7e58f4 66.47%,
        #962eed 80.54%,
        #214aff 96.15%
      );
      background-size: 50% 100%;
      animation: mover-border 0.75s linear infinite;
    }
    .mover-border {
      animation-duration: 0.75s;
      animation-timing-function: linear;
      animation-delay: 0s;
      animation-iteration-count: infinite;
      animation-direction: normal;
      animation-fill-mode: none;
      animation-play-state: running;
      animation-name: mover-border;
      animation-timeline: auto;
      animation-range-start: normal;
      animation-range-end: normal;
    }
    @keyframes mover-border {
      100% {
        transform: translate(-50%);
      }
    }
    .colorContent {
      width: 342px;
      position: relative;
      margin: auto;
      overflow: hidden;
      border-radius: 100px;
      height: 81px;

      .colorInfo {
        .colorData {
          padding: 20px;
          text-align: center;
          div {
            width: 33.33%;
            p:nth-child(1) {
              font-size: 14px;
              font-weight: bold;
              color: #ffffff;
            }
            p:nth-child(2) {
              font-weight: bold;
              font-size: 12px;
              color: #7f7f81;
            }
          }
          display: flex;
          justify-content: space-between;
        }

        width: 332px;
        height: 71px;
        margin: 5px;
        background: #141427;
        position: absolute;
        z-index: 9;
        border-radius: 100px;
      }
    }
    .colorTitle {
      font-weight: 500;
      font-size: 18px;
      color: var(--ex-font-color6);
      padding-top: 57px;
      padding-bottom: 20px;
      text-align: center;
    }
  }
  padding-bottom: 120px;
  // .tab_title {
  //   display: flex;
  //   background-color: #fbfbfb;
  // }
  // .title {
  //   padding: 20px 15px 20px;
  //   font-size: 16px;
  //   color: #838b9c;

  //   font-weight: bold;
  // }
  h1.active {
    color: var(--ex-default-font-color);
    position: relative;

    i {
      background-color: var(--ex-active-font-color);
      position: absolute;
      width: 20px;
      height: 2px;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      transition: all 0.2s;
    }

    // font-size: 18px;
  }

  .main {
    background-color: var(--ex-default-background-color);
    // padding-top: 10px;
  }

  .header-list {
    padding: 15px 15px 5px;
    font-size: 12px;
    color: var(--ex-home-list-ftcolor2);
    display: flex;
    justify-content: space-between;

    .item {
      display: flex;
      align-items: center;
      .arrows {
        display: flex;
        flex-direction: column;
        margin-left: 5px;
        .itemImg {
          width: 6px;
          height: 8px;
        }
      }
    }
    .item:nth-child(2) {
      flex: 1;
      text-align: right;
      justify-content: right;
    }

    .item:nth-child(3) {
      margin-left: 20px;
      max-width: 80px;
      min-width: 80px;
      text-align: right;
      justify-content: flex-end;
    }
  }
}

.headerChoose {
  display: flex;
  padding: 5px 10px;
  background: var(--ex-home-list-bgcolor);

  :deep(.van-tab) {
    flex: none;
    font-size: 16px;
    margin-right: 20px;
    padding: 0;
    color: var(--ex-home-list-ftcolor) !important;
  }
  :deep(.van-tabs__nav) {
    background: var(--ex-home-list-bgcolor) !important ;
  }

  // :deep(.van-tab__text) {
  //   font-size: 16px;
  //   color: var(--ex-home-list-ftcolor);
  //   // color: var(--ex-home-list-ftcolor);
  // }

  :deep(.van-tab--active) {
    font-weight: normal;
    color: var(--ex-home-list-ftcolor3) !important;
  }
}
</style>
