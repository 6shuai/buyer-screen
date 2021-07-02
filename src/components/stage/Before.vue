<template>
    <!-- 即将开始 -->
    <div class="before_wrap">
        <p class="text">即将开始</p>
        <p class="count_down text_heavy">{{ countDownTime }}</p>
    </div>
</template>

<script>
import { reactive, toRefs, computed, watch } from 'vue'
import { translatesToHoursMinutesSeconds } from '../../util/index'
import { useStore } from 'vuex'
export default {
    emits: ['countDown'],
    setup(props, { emit }) {

        const store = useStore()
        
        //开始时间
        const beginTime = computed(() => {
            return store.state.goodsListData[store.state.currentGoodsIndex] ? store.state.goodsListData[store.state.currentGoodsIndex].beginTime : null
        })

        //开始倒计时
        const countDownStart = (beginTime) => {
            let now = new Date().getTime() / 1000
            let startTime = new Date(beginTime).getTime() / 1000
            let num = parseInt(startTime - now)
            
            if(num > 0){
                // countDownFun(num)
            }
            countDownFun(30)
        }

        const countDownFun = (num) => {
            num -= 1
            state.countDownTime = translatesToHoursMinutesSeconds(num)
            if(num <= 0){
                clearTimeout(state.timer)
                emit('countDown', 'end')
                return
            }else if(num <= 10){
                emit('countDown')
            }
            state.timer = setTimeout(() => {
                countDownFun(num)
            }, 1000);
        }

        watch(beginTime, (newData, oldData) => {
            if(newData){
                countDownStart(beginTime.value)
            }
        })

        const state = reactive({
            countDownTime: '00:00',
            timer: undefined
        })

        return toRefs(state)

    }
}
</script>

<style lang="less">
    .before_wrap{
        width: 100%;
        height: 100%;
        opacity: .8;
        
        .text{
            font-size: 48px;
            padding: 65px 0 0 186px;
        }

        .count_down{
            font-size: 156px;
            line-height: 187px;
            display: table;
            margin: 0 auto;
        }
    }
</style>