<script setup>

import ButtonBar from '@/components/common/ButtonBar/index.vue'
import {updateFundPwd} from '@/api/user'
import { showToast } from 'vant'
import { ref, reactive } from 'vue'
import { _t18 } from '@/utils/public'
import { useToast } from '@/hook/useToast'
const { _toast } = useToast()
const newPwd = ref(false)
const oldPwd = ref(false)
const NPwd = ref(false)
const form = ref({
  newPwd: '',
  oldPwd: '',
  NPwd:''
})
const setKeyVal = (val) => {
  if (val == 'oldPwd') {
    oldPwd.value = !oldPwd.value
  } else if(val == 'newPwd') {
    newPwd.value = !newPwd.value
  }else {
    NPwd.value = !NPwd.value
  }
}
const emit = defineEmits(['setPwd'])
// form.pwd.value = !form.pwd.value
const success = ref(false)
watch(success, (newValue) => {
  emit('setPwd', newValue)
})
const showPwdDiff = ref(false)
const pwdDiff = () => {
  showPwdDiff.value = !(form.value.newPwd == form.value.NPwd)
}
const changePwd = () => {
  
  if (form.value.oldPwd == '') {
    // showToast('请输入旧密码')
    _toast('Fund_password_pleaseOld')
    return
  }
  if (form.value.newPwd == '') {
    // showToast('请输入新密码')
    _toast('Fund_password_pleaseNew')
    return
  }
  if (form.value.newPwd !== form.value.NPwd) {
    // showToast('两次密码不一致')
    _toast('register_pwd_diff')
    return
  }
  updateFundPwd(form.value.oldPwd,form.value.newPwd,1).then(res => {
    if (res.code == '200') {
      // showToast('资金密码修改成功')
      _toast('Fund_password_update_success')
      success.value = true
    } else {
      showToast(res.msg)
    }
  })
}
</script>
<template>
  <div class="content">
    <div class="tip">{{ _t18('Old_Password') }}</div>
    <div class="input">
      <svg-load name="mima" class="icon"></svg-load>
      <input :type="oldPwd ? 'text' : 'password'" v-model="form.oldPwd" :placeholder="_t18('login_please')" />
      <svg-load
        :name="oldPwd ? 'openeyes' : 'closeeyse'"
        class="icon"
        @click="setKeyVal('oldPwd')"
      ></svg-load>
    </div>
    <div class="tip">{{ _t18('New_Password') }}</div>
    <div class="input">
      <svg-load name="mima" class="icon"></svg-load>
      <input :type="newPwd ? 'text' : 'password'" v-model="form.newPwd" :placeholder="_t18('login_please')"/>
      <svg-load
        :name="newPwd ? 'openeyes' : 'closeeyse'"
        class="icon"
        @click="setKeyVal('newPwd')"
      ></svg-load>
    </div>
    <div class="tip">{{ _t18('Confirm_Password') }}</div>
    <div class="input">
      <svg-load name="mima" class="icon"></svg-load>
      <input :type="NPwd ? 'text' : 'password'" v-model="form.NPwd" @input="pwdDiff" :placeholder="_t18('login_please')"/>
      <svg-load
        :name="NPwd ? 'openeyes' : 'closeeyse'"
        class="icon"
        @click="setKeyVal('NPwd')"
      ></svg-load>
    </div>
    <p class="pwdDiff" v-if="showPwdDiff">*{{ _t18('register_pwd_diff') }}</p>
    <div class="btnBox" @click="changePwd">
      <ButtonBar :btnValue="_t18('btnConfirm',['bitmake'])"/>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  padding: 30px 15px 0 15px;
  .tip {
    font-size: 14px;
    color: var(--ex-font-color16);
    margin-bottom: 10px;
    text-align: left;
  }
  .input {
    padding: 0 15px;
    width: 100%;
    height: 50px;
    background: var(--ex-default-background-color);
    border-radius: 3px;
    border: 1px solid var(--ex-border-color1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    input {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 10px;
      font-size: 14px;
      color: var(--ex-default-font-color);
    }
  }
  .icon {
    font-size: 16px;
  }

  .btnBox {
    margin-top: 50px;
  }
  .pwdDiff {
    color: var(--ex-font-color14);
  }
}
</style>
