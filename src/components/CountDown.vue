<template>
    <div class="buy_count_down_wrap">
        <div class="count_down_num">
            <img :src="`/src/images/count_down_${countdownNum}.png`">
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
            color: #fe0000;

            img{
                height: 390px;
            }
        }

        .text{
            font-size: 100px;
            color: #ffcc01;
        }
    }
</style>