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
        </div>
        <div class="text">抢购马上开始!</div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
export default {
    emits: ['countDown'],
    setup(props, { emit }) {
        onMounted(() => {
            countdown()
        })

        const countdown = () => {
            if(state.countdownNum <= 1){
                clearTimeout(state.timer)
                emit('countDown', 'end')
                return
            }
            state.countdownNum = state.countdownNum - 1
            emit('countDown')
            state.timer = setTimeout(() => {
                countdown()
            }, 1000);
        }

        const state = reactive({
            timer: undefined,
            countdownNum: 10
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
        justify-content: space-around;

        .count_down_num{
            font-size: 340px;

            img{
                height: 390px;
                &.active{
                    animation: twinkling .5s ease-in-out;
                }
            }

        }

        .text{
            font-size: 100px;
            color: #ffcc01;
        }

        
        @keyframes twinkling {
            0% {
                opacity: 0.5;
                transform: scale(2.6);
            }
 
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    }
</style>