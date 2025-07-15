<template>
    <div class="trusteeshipBox">
        <van-nav-bar :title="$t('trusteeship')" left-text="" left-arrow @click-left="onClickLeft" />
        <div class="contentBox">
            <!-- <div class="btnBox">
                <div @click="changeList('0')" :class="{ 'activeClass': key == '0' }">进行中</div>
                <div @click="changeList('1')" :class="{ 'activeClass': key == '1' }">已结束</div>
            </div> -->

            <div class="listBox">

                <div class="list" v-for="item in dataList">
                    <div v-if="item.more">
                        <div class="cell">
                            <span>{{ $t('trusteeshipInfo.t3') }}</span>
                            <div>{{ item.more.code }}</div>
                        </div>
                        <div class="cell">
                            <span>{{ $t('trusteeshipInfo.t4') }}</span>
                            <div>{{ item.more.end }}</div>
                        </div>
                        <div class="cell">
                            <span>{{ $t('trusteeshipInfo.t5') }}</span>
                            <div>{{ item.more.start }}</div>
                        </div>
                        <div class="cell">
                            <span>{{ $t('mining_status') }}</span>
                            <div v-if="item.more.over == false">{{ $t('pledge_in_progress') }}</div>
                            <div v-if="item.more.over == true">{{ $t('In_over') }}</div>
                        </div>
                        <div class="cell" v-if="item.more.over == true">
                            <span>{{ $t('trusteeshipRecord.t1') }}</span>
                            <div v-if="item.more.win == true">{{ $t('trusteeshipRecord.t2') }}</div>
                            <div v-if="item.more.win == false">{{ $t('trusteeshipRecord.t3') }}</div>
                        </div>
                        <div class="cell">
                            <span>{{ $t('trusteeshipInfo.t6') }}</span>
                            <div>{{ item.more.coin }}</div>
                        </div>
                        <div class="cell">
                            <span>{{ $t('trusteeshipRecord.t4') }}</span>
                            <div>{{ item.amount }}</div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { showToast, CountDown } from 'vant'
import { _t18 } from '@/utils/public'
import { useToast } from '@/hook/useToast'
const { _toast } = useToast()
import { tuoguanList, tuoguanBuy, tuoguanRecord } from '@/api/common/index'
const key = ref('0')
const showJoin = ref(false)

const dataList = ref([])

const amount = ref('')
const overList = ref([])

const fetchData = async () => {
    const res = await tuoguanRecord({
        size: '9999',
        page: '1'
    })
    if (res.data && res.data.length > 0) {
        dataList.value = res.data

    }
}
fetchData()

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