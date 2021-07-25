<template>
    <div class="progress_wrap" v-if="realTimePrice">
        <div class="progress">
            <div 
                class="progress_bar"
                :style="{ animation: `progressAnim ${progressWidth}s ease-in` }"
            >
                <img src="../images/loading_bar.png">
            </div>

            <div class="sale_data">已优惠: {{(100 - realTimePrice.full / marketValue * 100).toFixed(2) }}%</div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(props) {
        const store = useStore()

        //currentPrice              抢购价格
        //priceDeclineRate          每分钟下降金额
        //priceDecline              每次下降多少钱
        //priceDeclineFrequency     多少时间下降一次
        let { marketValue, priceDeclineRate, priceDecline, priceDeclineFrequency } = store.state.goodsDataDetail

        //实时价格
        const realTimePrice = computed(() => {
            return store.state.realTimePrice
        })

        onMounted(() => {
            //比真实价格  进度条快 10%
            state.progressWidth = marketValue / priceDeclineRate * 60 * 0.9
        })


        const state = reactive({
            timer: undefined,
            realTimePrice,
            marketValue,
            progressWidth: 100
        })

        onUnmounted(() => {
            clearTimeout(state.timer)
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .progress_wrap{
        width: 100%;
        text-align: center;
        padding-bottom: 32px;
        
        .progress{
            width: 1442px;
            height: 141px;
            line-height: 141px;
            display: inline-block;
            background: url('../images/loading_bg.png') center no-repeat;
            background-size: 100% 100%;
            position: relative;

            .progress_bar{
                width: 100%;
                height: 100%;
                overflow: hidden;
                transition: all .3s ease-in;

                img{
                    width: 1437px;
                }
            }

            .sale_data{
                font-size: 80px;
                font-weight: bold;
                color: #ffcc00;
                width: 100%;
                text-align: center;
                position: absolute;
                top: 0;
            }
        }

        @keyframes progressAnim {
            0%{ width: 100% }
            100%{ width: 0%}
        }

    }
</style>