<template>
    <div class="arraw_wrap">
        <!-- 即将开始  倒计时 -->
        <div class="about_begin" v-if="!gameState">
            <div class="text">即将开始</div>
            <div class="count_down">09:32</div>
        </div>

        <!-- 开始竞猜 -->
        <div class="guess_price" v-if="gameState==1">
            <div class="msg">参与竞猜<span class="msg_01">平分</span><span class="cash">现金大礼!</span></div>
        </div>

    </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(props) {
        const store = useStore()

        //游戏状态
        const gameState = computed(() => {
            return store.state.gameState
        })

        const state = reactive({
            gameState
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .arraw_wrap{
        height: 179px;
        margin: 0 23px;
        background: url('../images/arraw.png') center no-repeat;
        background-size: 100% 100%;

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
</style>