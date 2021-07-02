<template>
    <div class="stage_wrap">
        <div 
            v-if="gameState == 1 || gameState == 2"
            class="guess_price_stage">
            猜价阶段<span class="count_down text_heavy">{{ countDownNum }}</span>
        </div>    
        <div 
            v-if="gameState == 3"
            class="guess_price_stage">
            抢购阶段
        </div>     
        <div 
            v-if="gameState == 4"
            class="guess_price_stage end">
            抢购结束
        </div>    
    </div>
</template>

<script>
    import { reactive, toRefs, computed } from 'vue'
    import { useStore } from 'vuex'
    import { translatesToHoursMinutesSeconds } from '../../util/index'
export default {
    setup(props, { emit }) {
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
    @import url('../../variables.less');
    .stage_wrap{
        position: absolute;
        top: -80px;
        left: 41.6%;
        height: 92px;
        line-height: 92px;
        font-size: 36px;
        
        .guess_price_stage{
            padding: 0 42px;
            background: url('../../images/stage_bg.png') center no-repeat;
            background-size: 100% 100%;

            .count_down{
                padding-left: 12px;
            }

            &.end{
                color: @color_info;
                background: url('../../images/stage_bg_02.png') center no-repeat;
            }
        }
    }
</style>