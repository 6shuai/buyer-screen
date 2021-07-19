<template>
    <div class="progress_wrap" v-if="realTimePrice">
        <div class="progress">
            <div 
                class="progress_bar"
                :style="{ width: 100 - (100 - realTimePrice.full / marketValue * 100).toFixed(2) + '%' }"
            >
                <img src="../images/loading_bar.png">
            </div>

            <div class="sale_data">已优惠: {{(100 - realTimePrice.full / marketValue * 100).toFixed(2) }}%</div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(props) {
        const store = useStore()
        let { marketValue } = store.state.goodsDataDetail
        
        //实时价格
        const realTimePrice = computed(() => {
            return store.state.realTimePrice
        })

        const state = reactive({
            realTimePrice,
            marketValue
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
                transition: all .3s ease-in-out;

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

    }
</style>