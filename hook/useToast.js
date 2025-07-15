import { useI18n } from 'vue-i18n'
import { showToast } from 'vant'
import { _t18 } from '@/utils/public'

export const useToast = () => {
  const i18n = useI18n()

  // _toast 函数增加 duration 参数，默认值为 1500 毫秒
  const _toast = (name, platform = [], duration = 3000) => {
    let translatedText = ''
    if (name) {
      translatedText = _t18(name, platform, i18n)
    }
    showToast({
      message: translatedText,
      duration: duration  // 设置显示时长
    })
  }

  const _showName = (name, platform = []) => {
    return _t18(name, platform, i18n)
  }

  return {
    _toast,
    _showName
  }
}
