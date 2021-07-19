<template>
    <div class="arraw_wrap">
        <img src="../images/arraw_02.png" class="arraw_hight" />
        <!-- 即将开始  倒计时 -->
        <div 
            class="about_begin" 
            v-if="!gameState"
        >
            <div class="text">即将开始</div>
            <div class="count_down">{{ countDownTime }}</div>
        </div>

        <!-- 开始竞猜 -->
        <div 
            class="guess_price" 
            v-if="gameState == 1"
        >
            <div class="msg">参与竞猜<span class="msg_01">平分</span><span class="cash">现金大礼!</span></div>
        </div>

    </div>
</template>

<script>
import { reactive, toRefs, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { translatesToHoursMinutesSeconds } from '../util/index'
export default {
    setup(props) {
        const store = useStore()

        //游戏状态
        const gameState = computed(() => {
            return store.state.gameState
        })

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
                return
            }else if(num < 10){
                //还剩最后十秒
                store.state.showCountDown = true
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
            gameState,
            countDownTime: '00:00',
            timer: undefined
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .arraw_wrap{
        height: 179px;
        margin: 0 23px 30px 23px;
        background: url('../images/arraw.png') center no-repeat;
        background-size: 100% 100%;

        .arraw_hight{
            width: 254px;
            height: 179px;
            position: absolute;
            animation: arrawHightAnim 2s linear infinite;

            @keyframes arrawHightAnim {
                0% {transform: translate(0)}
                100% {transform: translate(1200px)}
            }
        }

        .about_begin{
            padding: 15px 0 0 350px;
            display: flex;

            .text{
                font-size: 50px;
                line-height: 66px;
                color: #e9b085;
                font-weight: bold;
                padding-right: 58px;
            }

            .count_down{
                font-size: 150px;
                color: #ffcc00;
            }
        }

        .guess_price{
            padding: 0 0 0 430px;
            line-height: 179px;
            
            .msg{
                font-size: 70px;
                color: #e9b085;
                font-weight: bold;

                &_01{
                    padding: 0 25px 0 40px;
                }

                .cash{
                    font-size: 90px;
                    color: #ffcc00;
                }
            }
        }
    }

    @keyframes cardHide {
        0% {
            transform: translate(0);
            // opacity: 1;
        }
        100%{
            transform: translate(100%);
            // opacity: 0;
        }
    }

    @keyframes cardShow {
        0% {
            transform: translate(-100%);
            // opacity: 0;
        }
        100%{
            transform: translate(0);
            // opacity: 1;
        }
    }
</style>