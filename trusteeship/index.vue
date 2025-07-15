<template>
    <div class="trusteeshipBox">
        <van-nav-bar :title="$t('trusteeship')" left-text="" right-text="托管订单" left-arrow @click-left="onClickLeft"
            @click-right="onClickRight" />
        <!-- <van-nav-bar :title="$t('trusteeship')" left-text="" left-arrow @click-left="onClickLeft" /> -->
        <div class="contentBox">
            <div class="btnBox">
                <!-- <div @click="changeList('0')" :class="{ 'activeClass': key == '0' }">{{ $t('trusteeshipInfo.t1') }}
                </div> -->
                <!-- <div @click="changeList('1')" :class="{ 'activeClass': key == '1' }">{{ $t('trusteeshipInfo.t2') }}
                </div> -->
            </div>
            <div class="listBox" v-if="key == '0' && dataList && dataList.downTime >= 0">
                <div class="list">
                    <div class="cell">
                        <span>{{ $t('trusteeshipInfo.t3') }}</span>
                        <div>{{ dataList.code }}</div>
                    </div>
                    <div class="cell">
                        <span>{{ $t('trusteeshipInfo.t4') }}</span>
                        <div><van-count-down :time="dataList.downTime" format="HH:mm:ss" @finish="fetchData" /></div>
                    </div>
                    <div class="cell">
                        <span>{{ $t('trusteeshipInfo.t5') }}</span>
                        <div>{{ dataList.start }}</div>
                    </div>
                    <div class="cell">
                        <span>{{ $t('trusteeshipInfo.t6') }}</span>
                        <div>{{ dataList.coin }}</div>
                    </div>
                    <div class="cell">
                        <span>{{ $t('trusteeshipInfo.t7') }}</span>
                        <div>{{ dataList.max }}</div>
                    </div>
                    <div class="cell">
                        <span>{{ $t('trusteeshipInfo.t8') }}</span>
                        <div>{{ dataList.price }}</div>
                    </div>
                </div>
            </div>
            <div class="listBox" v-if="key == '1'">
                <div class="list" v-for="item in overList">
                    <div class="cell">
                        <span>{{ $t('trusteeshipInfo.t3') }}</span>
                        <div>{{ item.code }}</div>
                    </div>
                    <div class="cell">
                        <span>{{ $t('trusteeshipInfo.t4') }}</span>
                        <div>{{ item.end }}</div>
                    </div>
                    <div class="cell">
                        <span>{{ $t('trusteeshipInfo.t5') }}</span>
                        <div>{{ item.start }}</div>
                    </div>
                    <div class="cell">
                        <span>{{ $t('trusteeshipInfo.t6') }}</span>
                        <div>{{ item.coin }}</div>
                    </div>
                    <div class="cell">
                        <span>{{ $t('trusteeshipInfo.t7') }}</span>
                        <div>{{ item.max }}</div>
                    </div>
                    <div class="cell">
                        <span>{{ $t('trusteeshipInfo.t8') }}</span>
                        <div>{{ item.price }}</div>
                    </div>
                </div>
            </div>
            <div class="btn" @click="showJoin = true" v-if="key == '0' && dataList && dataList.downTime >= 0">
                {{ $t('trusteeshipInfo.t9') }}
            </div>
        </div>

        <van-popup v-model:show="showJoin" position="center">
            <div class="joinBox">
                <p class="title">{{ $t('trusteeshipInfo.t10') }}</p>
                <div class="inputBox">
                    <input type="text" :placeholder="$t('trusteeshipInfo.t11')" v-model="amount">
                </div>
                <div class="joinBtn">
                    <div @click="conJoin">{{ $t('trusteeshipInfo.t12') }}</div>
                    <div @click="showJoin = false, amount = ''">{{ $t('trusteeshipInfo.t13') }}</div>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script setup>
import { _t18 } from '@/utils/public'
import { useRouter, useRoute } from 'vue-router'
import { showToast, CountDown } from 'vant'
import { useToast } from '@/hook/useToast'
import { tuoguanList, tuoguanBuy } from '@/api/common/index'

const { _toast } = useToast()
const key = ref('0')
const showJoin = ref(false)
const $router = useRouter()
const dataList = ref('')
const amount = ref('')
const overList = ref([])

const fetchData = async () => {
    const res = await tuoguanList()
    if (res.data && res.data.length > 0) {
        const firstItem = res.data[res.data.length - 1]
           
        // 计算结束时间与当前时间的毫秒差，并添加到数据对象
        const endTime = new Date(firstItem.end).getTime()
        const now = Date.now()
        const downTime = endTime - now

        dataList.value = { ...firstItem, downTime }
        overList.value = res.data.filter(item => item.over == true)
    } else {
        dataList.value = ''
    }
}
fetchData()

const conJoin = async () => {

    if (!amount.value) {
        return _toast("trusteeshipInfo.t14")
    }
    if (amount.value > dataList.value.max) {
        return _toast("trusteeshipInfo.t15")
    }
    if (amount.value < dataList.value.price) {
        return _toast("trusteeshipInfo.t16")
    }

    const params = {
        amount: amount.value,
        tgId: dataList.value.tuoguanId
    }

    try {
        const res = await tuoguanBuy(params) // 使用 await 等待请求完成
        console.log(res.code)
        if (res.code == 501) {
            _toast("trusteeshipInfo.t17")
        } else if (res.code == 521) {
            _toast("trusteeshipInfo.t18")
        } else if (res.code == 200) {
            _toast("trusteeshipInfo.t19")
            fetchData()
        }
        amount.value = ''
        showJoin.value = false
    } catch (error) {
        console.error('请求失败:', error)
        showToast('请求失败，请稍后重试')
    }
}

const onClickRight = () => {
    $router.push('/trusteeshipRecord')
}
const onClickLeft = () => {
    window.history.back()
}
const changeList = (index) => {
    key.value = index
}
</script>

<style lang="scss" scoped>
.trusteeshipBox {
    .van-count-down {
        padding: 0 !important;
        font-size: 12px;
    }

    .van-popup {
        background: none !important;
    }

    .joinBox {
        .joinBtn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;
            margin-top: 30px;

            div:nth-child(1) {
                width: 120px;
                line-height: 45px;
                height: 45px;
                background: #00D77C;
                border-radius: 5px 5px 5px 5px;
                text-align: center;
                font-weight: 500;
                font-size: 14px;
            }

            div:nth-child(2) {
                width: 120px;
                line-height: 45px;
                height: 45px;
                background: #191C2B;
                border-radius: 5px 5px 5px 5px;
                text-align: center;
                font-weight: 500;
                font-size: 14px;
            }
        }

        .inputBox {
            width: 255px;
            height: 45px;
            background: #0F0F19;
            border-radius: 5px 5px 5px 5px;
            padding: 0 15px;
            margin: auto;
            display: flex;
            justify-content: space-between;
            align-items: center;

            input {
                width: 105px;
                height: 25px;
                font-size: 14px;
            }

            span {
                font-size: 14px;
                color: #00D77C;
                font-weight: 500;
            }
        }

        .title {
            font-size: 16px;
            font-weight: bold;
            color: #FFFFFF;
            text-align: center;
            padding-top: 15px;
            padding-bottom: 30px;
        }

        width: 285px;
        // height: 260px;
        padding-bottom:15px;
        background: #131521;
        border-radius: 5px 5px 5px 5px;
    }

    .btn {
        width: 345px;
        height: 45px;
        background: #00D77C;
        border-radius: 3px 3px 3px 3px;
        margin-top: 30px;
        line-height: 45px;
        text-align: center;
        font-weight: 500;
        color: #0F0F19;
        font-size: 16px;
    }

    .activeClass {
        background: #00D77C !important;
        color: #0F0F19 !important;
    }

    .contentBox {
        padding: 15px;

        .list {
            .cell:last-child {
                margin-bottom: 0;
            }

            .cell {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;

                div {
                    line-height: 45px;
                    padding: 0 10px;
                    width: 233px;
                    height: 45px;
                    background: #0F0F19;
                    border-radius: 5px 5px 5px 5px;
                    color: #ffffff;
                }

                span {
                    font-weight: 500;
                    font-size: 12px;
                    color: #9295A5;
                }
            }

            margin-top: 15px;
            border-radius: 5px 5px 5px 5px;
            background: #131521;
            padding: 15px;
            background: #131521;
        }

        .btnBox {
            display: flex;
            justify-content: flex-start;

            div {
                width: 82px;
                height: 32px;
                border-radius: 20px 20px 20px 20px;
                background: #131521;
                font-weight: 500;
                font-size: 14px;
                color: #9295A5;
                margin-right: 15px;
                text-align: center;
                line-height: 32px;
            }
        }
    }

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
    background: var(--ex-default-background-color) !important;
}
</style>