<template>
    <div class="buy_count_down_wrap">

        <div class="hight_wrap">
            <img class="hight_1" src="../images/count_down_hight.png">
            <img class="hight_2" src="../images/count_down_hight.png">
        </div>

        <div class="count_down_num">
            <img 
                v-if="showImgShaow && countdownNumShaow"
                class="img_shadow"
                :src="`./count_down/count_down_${countdownNumShaow}.png`"
            >
        </div>
        <!-- <div class="text">抢购马上开始!</div> -->
    </div>
</template>

<script>
import { reactive, toRefs, onMounted, nextTick } from 'vue'
import mixin from '../mixins/index'
import { useStore } from "vuex"
export default {
    emits: ['countDown'],
    setup(props, { emit }) {
        const store = useStore();
        const { pauseJxmsBgm, playJxmsSounds } = mixin()

        const state = reactive({
            timer: undefined,
            countdownNum: 10,
            countdownNumShaow: null,
            showImgShaow: false
        })

        onMounted(() => {
            setTimeout(() => {
                countdown()
            }, 1000);
            pauseJxmsBgm.value()
            console.log('倒计时开始, 暂停背景音乐')
        })

        //倒计时
        const countdown = () => {
            if(state.countdownNum <= 1){
                clearTimeout(state.timer)
                emit('countDown', 'end')

                store.commit('SET_GAME_STATE', 3)
                store.state.showCountDown = false
                return
            }

            nextTick(() => {
                state.countdownNum = state.countdownNum - 1
                state.showImgShaow = true
                setTimeout(() => {
                    state.countdownNumShaow = state.countdownNum
                    playJxmsSounds.value(`./voice/digi_${state.countdownNum}.mp3`)
                }, 100);
            })

            emit('countDown')

            state.timer = setTimeout(() => {
                state.showImgShaow = false
                countdown()
            }, 1000);
        }

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .buy_count_down_wrap{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        font-weight: bold;
        display:flex;
        flex-flow: column;
        justify-content: flex-end;
        overflow: hidden;

        .hight_wrap{
            width: 100%;
            height: 100%;

            img{
                width: 1858px;
                height: 1858px;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -929px;
                margin-left: -929px;

                &.hight_1{
                    animation: countHightAnim 10s linear infinite;
                }

                &.hight_2{
                    animation: countHightAnim2 10s linear infinite;
                }
            }
        }

        .count_down_num{
            position: absolute;
            width: 100%;
            top: 50%;
            margin-top: -298px;
            text-align: center;

            img{
                height: 595px;
                display: inline-block;
            }

            .img_shadow{
                animation: countdownShadowAnim 1s ease-in;
                z-index: 12;
            }

        }

        .text{
            font-size: 100px;
            color: #ffcc01;
            padding-bottom: 100px;
        }


        @keyframes countdownShadowAnim {
            0% {
                // filter: blur(0px);
                transform: scale(0);
            }
            60% {
                // filter: blur(3px);
                transform: scale(2);
            }
            90% {
                opacity: 1;
            }
            100% {
                filter: blur(2px);
                opacity: 0;
                transform: scale(50);
            }
        }
    }

    @keyframes countHightAnim {
        0%{ transform: rotate(0deg); }
        100%{ transform: rotate(360deg); }
    }
    @keyframes countHightAnim2 {
        0%{ transform: rotate(360deg); }
        100%{ transform: rotate(0deg); }
    }
</style>