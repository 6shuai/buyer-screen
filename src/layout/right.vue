<template>
    <div class="right_wrap">
        <div class="logo">
            <img src="../images/logo.png" alt="logo">
        </div>

        <div class="guess_count_down">
            <div class="state_info" v-if="gameState == 1 || gameState == 2">
                <p class="text">竞猜进行中</p>
                <p class="count_down">{{ countDownNum }}</p>
            </div>
        </div>

        <div class="qrcode_wrap">
            <p class="title">抢宝贝赢红包</p>
            <div class="qrcode_box">
                <p class="sao_text">微信扫一扫</p>
                <img src="">
            </div>
        </div>

    </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { translatesToHoursMinutesSeconds } from '../util/index'
export default {
    setup(props) {
        const store = useStore()

        //游戏状态
        const gameState = computed(() => {

            //猜价阶段 
            if(store.state.gameState == 1){
                //抢购详情   拿到猜价时长 做倒计时
                countDownFun(store.state.goodsDataDetail.guessTime + store.state.goodsDataDetail.countdown)
            }

            return store.state.gameState
        })

        //倒计时
        const countDownFun = (num) => {
            if(num < 0){
                clearTimeout(state.timer)
                return
            }
            state.countDownNum = translatesToHoursMinutesSeconds(num)
            num -= 1
            state.timer = setTimeout(() => {
                countDownFun(num)
            }, 1000);
        }

        const state = reactive({
            timer: undefined,
            countDownNum: 0,    //倒计时
            gameState
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .right_wrap{
        height: 100%;
        padding: 22px 43px;
        display: flex;
        flex-flow: column;
        justify-content: space-around;

        .logo{
            width: 317px;
            height: 174px;
            margin: 0 auto;

            img{
                width: 100%;
                height: 100%;
            }
        }

        .guess_count_down{
            width: 100%;
            height: 226px;
        }

        .state_info{
            width: 100%;
            height: 226px;
            background: url('../images/count_down_card.png') center no-repeat;
            background-size: 100% 100%;
            text-align: center;
            margin-top: 40px;

            .text{
                font-size: 50px;
                color: #4a2453;
                padding-top: 30px;
            }

            .count_down{
                font-size: 100px;
                font-weight: bold;
                color: #ffcc00;
                padding-top: 20px;
            }
        }

        .qrcode_wrap{
            width: 100%;
            text-align: center;
            margin-top: 50px;

            .title{
                font-size: 60px;
                font-weight: bold;
                color: #fff;
                padding-bottom: 28px;
            }

            .qrcode_box{
                padding: 19px;
                background: url('../images/qrcode_card.png') center no-repeat;
                background-size: 100% 100%;
                margin-bottom: 42px;

                .sao_text{
                    font-size: 40px;
                    color: #4a2453;
                    text-align: justify;
                    text-align-last: justify;
                    padding-bottom: 19px;
                }

                img{
                    width: 322px;
                    height: 322px;
                }
            }
        }
    }
</style>