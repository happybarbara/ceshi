<!-- 首页 -->
<template>
  <div>
    <van-popup v-model:show="show" position="left" class="sidebar" @close="closeSideBar">
      <SideBar @closeSideBar="closeSideBar"></SideBar>
    </van-popup>
    <div class="carousel">
      <video autoplay muted loop playsinline class="video-bg">
        <source
          src="https://videos.mocortech.com/%E9%A6%96%E9%A1%B5%E8%A7%86%E9%A2%911080_1.mp4"
          type="video/mp4"
        />
      </video>
      <img src="@/assets/image/phone.gif" alt="" class="phone" />
      <img src="@/assets/image/wd.png" alt="" class="mine" @click="openSideBar"/>
      <img src="@/assets/image/logo.png" alt="" class="logo" />
      <div class="text">
        <p>{{$t('banner1')}}</p>
        <p>Robin</p>
        <p>{{$t('banner2')}}</p>
      </div>
      <!-- <van-swipe :autoplay="3000" lazy-render :loop="true" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in carouselList" :key="index">
          <image-load :filePath="item.imgUrl" alt="" class="carouselItem" @click="linkto(item)" />
        </van-swipe-item>
      </van-swipe>
      <div class="top">
        <div>
          <Logo></Logo>
         
        </div>
        <div class="right">
         
          <svg-load name="user" class="rightImg" @click="openSideBar"></svg-load>
        </div>
      </div> -->
    </div>
    <div class="currentList">
      <div
        class="item centerItem"
        v-for="(item, index) in dataList.filter((it, idx) => {
          return idx < 4
        })"
        :key="index"
        @click="linkTo(item)"
      >
        <div class="itemTop fw-num">{{ item.showSymbol }}</div>
        <div
          :class="[
            _isRFD(
              tradeStore.allCoinPriceInfo[item.coin]?.openPrice,
              tradeStore.allCoinPriceInfo[item.coin]?.close
            ),
            'rfd-sign itemMain fw-num'
          ]"
        >
          {{ tradeStore.allCoinPriceInfo[item.coin]?.priceChangePercent }}%
        </div>
        <div
          :class="[
            _isRFD(
              tradeStore.allCoinPriceInfo[item.coin]?.open,
              tradeStore.allCoinPriceInfo[item.coin]?.close
            ),
            'itemFooter fw-num'
          ]"
        >
          {{ tradeStore.allCoinPriceInfo[item.coin]?.close }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useTradeStore } from '@/store/trade/index'
import { useMainStore } from '@/store/index.js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { publiceNotice } from '@/api/common/index'
import { computed } from 'vue'
import SideBar from '@/views/home/sidebar/index.vue'
const show = ref(false)
const openSideBar = () => {
  show.value = true
}
const isDarkMode = ref(false)
const changeStyle = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.setAttribute('theme', isDarkMode.value ? 'dark' : 'light')
}
const closeSideBar = () => {
  show.value = false
}
const tradeStore = useTradeStore()
const mainStroe = useMainStore()
const $router = useRouter()

const dataList = computed(() => {
  // let tempFilterKey = Object.keys(tradeStore.allCoinPriceInfo)
  //   .filter((key) => tradeStore.allCoinPriceInfo[key]?.priceChangePercent > 0)
  //   .slice(0, 3)
  let tempData = []
  let tempFilterKey = mainStroe.getHomeCoinList.map((item) => {
    if (item.isOpen == 'true') {
      return item.coin
    }
  })
  // let tempData = tradeStore.secondContractCoinList.filter((elem) =>
  //   tempFilterKey.includes(elem.coin)
  // )
  tempFilterKey.forEach((elem) => {
    tradeStore.secondContractCoinList.forEach((elem2) => {
      if (elem2.coin == elem) {
        tempData.push(elem2)
      }
    })
  })
  return tempData
})

const linkTo = (item) => {
  mainStroe.setTradeStatus(Number(0))
  $router.push(`/trade?symbol=${item.coin}`)
}
const carouselList = ref([])
// 轮播图跳转
const linkto = (detail) => {
  if (detail.noticeContent && detail.noticeContent !== '<p><br></p>') {
    $router.push(`/broadcastDetails?id=${detail.noticeId}`)
  } else {
    $router.push(`${detail.detailUrl}`)
  }
}

onMounted(async () => {
  try {
    const res = await publiceNotice('ACTIVITY_NOTICE', 'HOME_ACTIVITY ')
    if (res.code === 200) {
      carouselList.value = res.data.filter((item) => {
        return item.status != '1'
      })
    }
  } catch (error) {}
})
</script>
<style lang="scss" scoped>
:deep(.sidebar) {
  margin-top: -1px;
  max-width: var(--ex-max-width);
  width: 100%;
  left: auto;
  height: 100%;
}

.carousel {
  height: 235px;
  position: relative;
  .logo {
    position: absolute;
    width: 35px;
    height: 35px;
    top: 30px;
    left: 30px;
  }
  .mine {
    position: absolute;
    width: 22px;
    height: 22px;
    top: 35px;
    right: 27px;
  }
  .text{
    color:#ffffff;
    position: absolute;
    top:83px;
    left:44px;font-size: 12px;line-height: 20px;font-weight: bold;
  }
  .phone {
    width: 79px;
    position: abs($number: 0);
    height: 160px;
    position: absolute;
    z-index: 99;
    right: 63px;
    top: 39px;
  }
  .video-bg {
    position: absolute;
    width: 100%;
    z-index: 0;
    min-width: 100%;
    height: 235px;
    -o-object-fit: cover;
    object-fit: cover;
    -o-object-position: center center;
    object-position: center center;
  }

  // .right{
  //   display: flex;
  //   justify-content: right;
  //   align-items: center;
  //   i:nth-child(1){
  //     margin-right:10px;
  //   }
  // }

  // .carouselItem {
  //   height: 200px;
  //   width: 100%;
  //   object-fit: cover;
  // }

  // .top {
  //   height: 52px;
  //   background: var(--ex-home-box-background-color3);
  //   border-radius: 5px;
  //   padding: 15px 10px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   position: absolute;
  //   top: 20px;
  //   left: 50%;
  //   transform: translateX(-50%);
  //   width: calc(100% - 30px);

  //   /* 减去两侧的间距 */
  //   .leftImg {
  //     width: 25px;
  //     height: 25px;
  //   }

  //   .centerImg {
  //     width: 56px;
  //     height: 14px;
  //     margin-left: 5px;
  //   }

  //   .rightImg {
  //     width: 24px;
  //     height: 24px;
  //   }
  // }
}

.currentList {
  z-index: 999;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 30px);
  /* 减去两侧的间距 */
  box-sizing: border-box;
  top: 172px;
  background-color: var(--ex-home-box-background-color);
  box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  padding: 20px 0;

  .item {
    flex: 1;
    display: flex;
    flex-direction: column;

    .itemTop {
      font-size: 14px;
      color: var(--ex-default-font-color);
      font-weight: 400;
    }

    .itemMain {
      margin-top: 5px;
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 400;

      .itemMainImg {
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }

    .itemFooter {
      display: flex;
      font-size: 16px;
      margin-top: 5px;
    }
  }

  .centerItem {
    justify-content: center;
    align-items: center;
  }
}
</style>
