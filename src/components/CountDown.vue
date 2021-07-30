<template>
    <div class="buy_count_down_wrap">
        <div class="count_down_num">
            <img 
                v-for="(item , index) in 9"
                :key="index"
                v-show="countdownNum == index+1"
                :class="{ active: countdownNum == index+1 }"
                :src="`./count_down/count_down_${index+1}.png`"
            >
            <img 
                v-if="showImgShaow && countdownNumShaow"
                class="img_shadow"
                :src="`./count_down/count_down_${countdownNumShaow}.png`"
            >
        </div>
        <div class="text">抢购马上开始!</div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted, nextTick } from 'vue'
import mixin from '../mixins/index'
export default {
    emits: ['countDown'],
    setup(props, { emit }) {
        const { pauseJxmsBgm, playJxmsSounds } = mixin()

        onMounted(() => {
            countdown()
            pauseJxmsBgm.value('================+++++++++++++++')
            console.log('停!!!')
        })

        const countdown = () => {
            if(state.countdownNum <= 1){
                clearTimeout(state.timer)
                emit('countDown', 'end')
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

        const state = reactive({
            timer: undefined,
            countdownNum: 10,
            countdownNumShaow: null,
            showImgShaow: false
        })

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

        .count_down_num{
            font-size: 340px;
            position: absolute;
            width: 100%;
            top: 50%;
            margin-top: -300px;
            text-align: center;

            img{
                height: 390px;
                display: inline-block;
                &.active{
                    animation: twinkling .3s ease-in;
                    position: absolute;
                    margin-left: -100px;
                    z-index: 10;
                }
            }

            .img_shadow{
                position: absolute;
                animation: countdownShadowAnim .8s ease-out .15s;
                margin-left: -100px;
                z-index: 12;
            }

        }

        .text{
            font-size: 100px;
            color: #ffcc01;
            padding-bottom: 100px;
        }

        
        @keyframes twinkling {
            0% {
                opacity: 0;
                transform: scale(4);
            }

            30% {
                filter: brightness(100%);
            }
 
            35% {
                opacity: 0.5;
                transform: scale(1);
                filter: brightness(9000%);
            }

            90%{
                filter: brightness(9000%);
                opacity: 1;
            }
            100%{
                filter: brightness(9000%);
                opacity: 0;
            }
        }

        @keyframes countdownShadowAnim {
            0% {
                opacity: 0;
                filter: blur(0px);
                transform: scale(1);
            }
            20% {
                opacity: 0.2;
                filter: blur(1px);
                transform: scale(1.2);
            }
            100% {
                filter: blur(3px);
                opacity: 0;
                transform: scale(3);
            }
        }
    }
</style>