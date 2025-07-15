<script setup>
import { DIFF_ISFREEZE } from '@/config/index'
import { useMainStore } from '@/store/index.js'
import { useUserStore } from '@/store/user/index.js'
import { socketDict } from '@/config/dict'
import Loading from '@/components/common/Loading/index.vue'
import ActivityPopup from '@/components/Defi/ActivityPopup.vue'
import { getShowDefiActivityNoticeApi } from './api/defi'
import ServicePopup from '@/components/CustomerService/ServicePopup.vue'
import { useToast } from './hook/useToast'
import { _t18, _toView } from '@/utils/public'
import { useRouter } from 'vue-router'
import { initWebSocket } from '@/plugin/socket'
import { showDialog } from 'vant'
import PubSub from 'pubsub-js'

const router = useRouter()

/**
 * 客服弹窗
 */
const showServicePopup = ref(false)

/**
 * defi 空投弹窗
 */
const showDefiActivityPopup = ref(false)

/**
 * 活动详情
 */
const activityInfo = ref({})

/**
 * 申购订阅Key
 */
const ownCoinKey = ref('')

/**
 * 申购通知
 */
const ownCoinKeyNotification = () => {
  ownCoinKey.value = PubSub.subscribe(socketDict.OWNCOIN, (key, data) => {
    showDialog({
      title: data.amountLimit, // 额度
      message: data.msg
    }).then(() => {
      // 点击确认进入认购页
    })
  })
}
ownCoinKeyNotification()

/**
 * 判断屏幕宽度是否大于 750px
 * 如果大于则跳转到PC端链接
 */
const checkScreenWidth = () => {
  const screenWidth = window.innerWidth
  if (screenWidth > 750) {
    window.location.href = 'https://pc.robin.lol/#/home/index'
  }
}

/**
 * 监听屏幕宽度变化
 */
const handleResize = () => {
  checkScreenWidth()
}

/**
 * 用户状态改变Key
 */
const userStatusKey = ref('')

/**
 * 用户状态改变通知
 */
const userStatusNotification = () => {
  userStatusKey.value = PubSub.subscribe(socketDict.USER_STATUS, (key, data) => {
    userStore.token && userStore.getUserInfo()
  })
}
userStatusNotification()

/**
 * 获取活动通知
 */
const getShowDefiActivityNotice = async () => {
  const res = await getShowDefiActivityNoticeApi(userStore.userInfo.user.userId)
  if (res.code == 200 && res.data.length) {
    res.data = res.data[0]
    res.data.days = Math.ceil((res.data.endTimeS - res.data.beginTimeS) / (24 * 60 * 60 * 1000))
    activityInfo.value = res.data
    showDefiActivityPopup.value = true
  }
}

const userStore = useUserStore()
const mainStroe = useMainStore()
const isLoading = ref(false)
const currentRoute = computed(() => useRoute())
const tabbarPathNameList = computed(() =>
  mainStroe.getTabbarList
    .filter((elt) => {
      return elt.isOpen === true
    })
    .map((elem) => {
      return elem.key.charAt(0).toUpperCase() + elem.key.slice(1)
    })
)

const { _toast } = useToast()

/**
 * 冻结弹窗 isFreeze= '2'
 */
const showIsFreezePopup = ref(false)

/**
 * 事件处理函数: toast 改变事件
 */
const event_toastChange = (event) => {
  console.log('Toast change event triggered', event)
}

/**
 * 事件处理函数: 客服改变事件
 */
const event_serviceChange = (event) => {
  console.log('Service change event triggered', event)
}

/**
 * 事件处理函数: 用户信息改变事件
 */
const event_userInfoChange = (event) => {
  console.log('User info change event triggered', event)
}

/**
 * 事件处理函数: 冻结弹窗事件
 */
const event_freezePopup = (event) => {
  console.log('Freeze popup event triggered', event)
}

onMounted(() => {
  userStore.token && userStore.getUserInfo()

  // 在 mounted 生命周期中检查屏幕宽度并添加 resize 监听器
  checkScreenWidth()
  window.addEventListener('resize', handleResize)

  document.addEventListener('event_toastChange', event_toastChange)
  document.addEventListener('event_serviceChange', event_serviceChange)
  document.addEventListener('event_userInfoChange', event_userInfoChange)
  document.addEventListener('event_freezePopup', event_freezePopup)
})

onUnmounted(() => {
  // 在 unmounted 生命周期中移除 resize 监听器
  window.removeEventListener('resize', handleResize)

  document.removeEventListener('event_toastChange', event_toastChange)
  document.removeEventListener('event_serviceChange', event_serviceChange)
  document.removeEventListener('event_freezePopup', event_freezePopup)

  ownCoinKey && PubSub.unsubscribe(ownCoinKey)
  userStatusKey && PubSub.unsubscribe(userStatusKey)
})
</script>

<template>
  <div>
    <loading v-if="isLoading" :loading="isLoading"></loading>
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <div :key="route.name">
          <keep-alive :include="[...tabbarPathNameList]">
            <component :is="Component" :key="route.path"></component>
          </keep-alive>
        </div>
      </transition>
    </router-view>
  </div>
  <Tabbar v-if="tabbarPathNameList.includes(currentRoute.name)"></Tabbar>
  <!-- 幸运活动 -->
  <ActivityPopup v-model:value="showDefiActivityPopup" :data="activityInfo"></ActivityPopup>
  <!-- 客服弹窗 -->
  <ServicePopup
    v-model:value="showServicePopup"
    :data="mainStroe.getCustomerServiceList"
  ></ServicePopup>
  <!-- 冻结弹窗 -->
  <van-dialog
    v-model:show="showIsFreezePopup"
    :title="_t18('notify')"
    :message="_t18('account_frozen')"
    theme="round-button"
    confirmButtonColor="#00D77C"
    :confirmButtonText="_t18('btnConfirm')"
    @confirm="confirmFreezeDialog"
  >
  </van-dialog>
</template>

<style lang="scss">
// .fade-enter-active {
//   animation: fadeIn 0.1s ease-in;
// }

// .fade-leave-active {
//   animation: fadeOut 0.01s ease-in;
// }
/*
.fade-enter {
  animation: fadeIn 0.3s ease-in;
}

.fade-leave-to {
  animation: fadeOut 0.3s ease-out;
} */

/* 绿涨 */
.rise {
  color: var(--ex-rfd-rise) !important;

  &.rfd-sign::before {
    content: '+';
    padding-right: 2px;
    display: inline-block;
  }

  &.rfd-bg {
    background-color: var(--ex-rfd-rise-bg) !important;
    /* color: var(--ex-white) !important; */
  }
}

/* 红跌 */
.fall {
  color: var(--ex-rfd-fall) !important;

  &.rfd-sign::before {
    content: '-';
    padding-right: 2px;
    display: inline-block;
  }

  &.rfd-bg {
    background-color: var(--ex-rfd-fall-bg) !important;
    /* color: var(--ex-white) !important; */
  }
}

.draw {
  color: var(--ex-rfd-draw) !important;

  &.rfd-bg {
    background-color: var(--ex-rfd-draw-bg) !important;
  }
}

.sidebar {
  background: var(--ex-default-background-color) !important;
}
.van-dialog__header,
.van-dialog__content {
  background: #fff;
}
</style>
