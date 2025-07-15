<script setup>
import { onMounted, ref } from 'vue'
import { useMainStore } from '@/store/index.js'
import { useUserStore } from '@/store/user/index'
import { storeToRefs } from 'pinia'
import { showToast } from 'vant'
import { bindUp } from '@/api/common/index'
import { useToast } from '@/hook/useToast'
import Header from './components/FrontPage/header.vue'
import HeaderDiff from './components/FrontPage/headerDiff.vue'
import Menu from './components/FrontPage/menu.vue'
import Footer from './components/FrontPage/footer.vue'
import { DIFF_HOME_BANNER } from '@/config/index'  // Ensure this is imported
const { _toast } = useToast()
// Store instances
const mainStore = useMainStore()
const userStore = useUserStore()
const { userInfo, isSign } = storeToRefs(userStore)
const code = ref('')
const show = ref(false)

// Function to handle binding
const bindFun = async () => {
  if (code.value == '') {
    _toast('bind.b1')
    return
  }

  const res = await bindUp({ code: code.value })
  if (res.code == 200) {
    show.value = false
    _toast('bind.b2')
  }else if(res.code == 514){
    _toast('bind.b4')
  }
}

// Fetch user info and settings on page load
onMounted(async () => {

  if (isSign.value) {
    await userStore.getUserInfo()  // Fetch the latest user info
  }
  await mainStore.getSettingConfig()  // Fetch additional settings

  // Check if the user info indicates additional actions
  if (isSign.value && userInfo.value.user.appParentIds == null) {
    // show.value = true
  }
})
</script>

<template>
  <HeaderDiff v-if="DIFF_HOME_BANNER.includes(_getConfig('_APP_ENV'))"></HeaderDiff>
  <Header v-else></Header>
  <Menu></Menu>
  <Footer></Footer>
  <van-popup v-model:show="show" :round="true" :close-on-click-overlay="false">
    <div class="bindAddressBox">
      <p class="title">{{ $t('bind.b3') }}</p>
      <input type="text" :placeholder="$t('plug_shareCode')" v-model="code">
      <div class="btnBox" @click="bindFun()">
        <p class="fw-bold">{{ _t18('btnConfirm') }}</p>
      </div>
    </div>
  </van-popup>
</template>

<style lang="scss" scoped>
.bindAddressBox {
  .btnBox {
    padding: 15px 20px;
    background-color: var(--ex-div-bgColor1);
    text-align: center;

    p {
      color: var(--ex-font-color);
      font-size: 16px;
    }
  }

  input {
    width: 100%;
    margin-bottom: 30px;
    border: 1px solid var(--ex-input-border-color);
    padding: 15px;
    border-radius: 5px;
    font-size: 14px;
  }

  .title {
    text-align: center;
    color: var(--ex-input-label-color);
    font-size: 16px;
    padding-bottom: 15px;
  }

  width: 300px;
  padding:15px;
  background: var(--ex-home-box-background-color);
}

.van-popup {
  background: none;
}
</style>
