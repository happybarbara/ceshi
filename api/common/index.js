/**
 * 公共api
 */

import {
  post,
  get,
  baseURL
} from '@/utils/request'
import {
  useUserStore
} from '@/store/user/index'
import axios from 'axios'

// 获取侧边栏信息
export const sidebarList = () => post('/api/common/getAppSidebarSetting')

/**
 * 获取平台配置文件
 * @returns {AxiosPromise}
 */
export const getPlatFormConfigApi = () => {
  return axios({
    // url: `${location.origin}/platform/${window.__config._APP_ENV}/config.js?${+new Date()}`,
    url: `${location.origin}/platform/dev/config.js?${+new Date()}`,
    method: 'get'
  })
}
/**
 * 获取配置项
 */
export const getSettingConfigApi = () => post('api/common/getAllSetting')
// export const getLanguageList = post();
/**
 * 上传图片
 */
export const uploadImg = (data) => {
  let userStore = useUserStore()
  return axios({
    url: baseURL + '/api/common/upload/OSS',
    method: 'post',
    headers: {
      'content-type': 'multipart/form-data;charset=UTF-8',
      authorization: userStore.token,
      satoken: userStore.token
    },
    data
  })
}
/**
 * 字典查询
 */
export const dict = (dictType) => post(`/api/common/type/${dictType}`)

/**
 *
 * @param {*} key INFORMATION_NOTICE == 公告信息  ACTIVITY_NOTICE == 活动公告   ROLL_NOTICE == 首页滚动公告
 * @returns 通知公告接口(公共一个参数)
 */
export const noticeList = (key) => post(`/api/notice/list?key=${key}`)

/**
 *
 * @param {*} key
 * @param {*} modelKey
 * @returns 通知公告接口(公共两个参数)
 */
export const publiceNotice = (key, modelKey) =>
  post(`/api/notice/list?key=${key}&modelKey=${modelKey}`)

/**
 * TERMS_CLAUSE --服务条款
 * PERIOD_EXPLAIN --秒合约说明
 * COIN_EXPLAIN --币币交易说明
 * AGENCY_ACTIVITY --代理活动
 * U_STANDARD_EXPLAIN --U本位合约说明
 * REGISTRY_PRIVACY --注册隐私政策
 * REGISTRY_CLAUSE --注册使用条款
 * LOANS_RULE --贷款规则
 * @returns 获取前台文本配置
 */
export const rulesList = (key) => post(`/api/option/rules/list?key=${key}`)

/**
 *
 * @returns 客服列表
 */
export const getCustomerService = () => post(`/api/common/getCustomerService`)

/**
 *
 * @returns 获取时区
 */
export const getTimeZone = () => post(`/api/timezone/getTimeZone`)

/**
 * 获取白皮书
 */
export const getWhitePaperUrl = () => post(`api/common/getWhitePaperSetting`)

/**
 * 获取轮播详情
 */
export const noticeDetail = (noticeId) => get(`api/notice/${noticeId}`)


/**
 * 获取我的nft
 */
export const hold = () => post(`api/nft/hold`)

/**
 * 获取所有nft
 */
export const nftList = () => post(`api/nft/list`)

/**
 * 购买nft
 */
export const buyNfT = (parmas) => post('api/nft/buyNfT', parmas)

/**
 * 购买nft
 */
export const pageInfo = () => post('api/nft/pageInfo')

export const tj = () => post('api/nft/tj')

export const trs = (parmas) => post('api/nft/trs', parmas)

export const trsInfo = (parmas) => post('api/nft/trsInfo', parmas)

export const trsRecord = (parmas) => post('api/nft/trsRecord', parmas)

export const insuranceList = (parmas) => post('api/insurance/list', parmas)

export const buyInsurance = (parmas) => post('api/insurance/buyInsurance', parmas)

export const insuranceHold = (parmas) => post('api/insurance/hold', parmas)

export const tuoguanList = (parmas) => post('api/tuoguan/list', parmas)

export const tuoguanBuy = (parmas) => post('api/tuoguan/buy', parmas)

export const tuoguanRecord = (parmas) => post('api/tuoguan/record', parmas)

export const bindUp = (parmas) => post('/api/nft/bindUp', parmas)

export const lineuplist = (parmas) => post('/api/line/up/list', parmas)

export const lineupconfigbyId = (parmas) => post('/api/line/up/config/byId', parmas)

export const lineupholdbyId = (parmas) => post('/api/line/up/hold/byId', parmas)

export const lineupbuy = (parmas) => post('/api/line/up/buy', parmas)

export const lineuphold = (parmas) => post('/api/line/up/hold', parmas)

export const lineupbeforLockPay = (parmas) => post('/api/line/up/beforLockPay', parmas)