<template>
    <div class="buy_count_down_wrap">
        <div class="count_down_num">{{ countdownNum }}</div>
        <div class="text">抢购马上开始!</div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
export default {
    setup(props) {
        onMounted(() => {
            countdown()
        })

        const countdown = () => {
            if(state.countdownNum <= 1){
                clearTimeout(state.timer)
                return
            }
            state.countdownNum = state.countdownNum - 1
            state.timer = setTimeout(() => {
                countdown()
            }, 1000);
        }

        const state = reactive({
            timer: undefined,
            countdownNum: 9
        })
    }
}
</script>

<style lang="less" scope>
    .buy_count_down_wrap{
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
        }

        .text{
            font-size: 100px;
            color: #ffcc01;
        }
    }
</style>