<template>
    <div class="tip">当前宝贝</div>
    <div class="goods_detail">
        <div class="goods_image">
            <img :src="data.goodsCove" class="img">
        </div>
        <div class="goods_detail_right">
            <p class="goods_name text_overflow">{{data.goodsName}}<span class="goods_desc">{{ data.goodsDescription }}</span></p>
            <p class="buy_in_price">￥{{ priceFormat(data.marketValue).int }}{{ priceFormat(data.marketValue).decimals }}起</p>
            <p class="buy_in_price_down">每分钟直降<span>￥{{ priceFormat(data.priceDeclineRate).int }}{{ priceFormat(data.priceDeclineRate).decimals }}</span></p>
        </div>
    </div>
    <div class="real_price_warp sell_out_crad">
        <div class="data">实时价格: <span class="price_int">￥{{ realTimePrice.int }}</span><span class="price_decimals">{{ realTimePrice.decimals }}</span></div>
        <!-- <div class="data">已售罄</div> -->
    </div>
</template>

<script>
import { reactive, toRefs, onMounted  } from 'vue'
import { priceFormat } from '../util/index'
import { useStore } from 'vuex'
export default {
    props: ['data'],
    setup(props) {
        const store = useStore()
        //currentPrice              抢购价格
        //priceDeclineRate          每分钟下降金额
        //priceDecline              每次下降多少钱
        //priceDeclineFrequency     多少时间下降一次
        let { marketValue, priceDeclineRate, priceDecline, priceDeclineFrequency } = store.state.goodsDataDetail
        // let currentPrice = 5000
        // let priceDeclineRate = 1000
        // let priceDecline = 666
        // let priceDeclineFrequency = 2   
        onMounted(() => {
            state.marketValue = marketValue
            setRealTimePrice(marketValue, priceDeclineFrequency)
        })

        //实时价格
        const setRealTimePrice = (price, priceDeclineFrequency) => {
            clearTimeout(state.timer)
            let newPrice = price - priceDecline
            
            if(newPrice <= 0){
                newPrice = 0
                return
            }
            state.realTimePrice = priceFormat(newPrice)
            store.commit('SET_REAL_TIME_PRICE', state.realTimePrice)

            state.timer = setTimeout(() => {
                setRealTimePrice(newPrice, priceDeclineFrequency)
            }, priceDeclineFrequency * 1000)
        }

        const state = reactive({
            priceFormat,
            timer: undefined,
            realTimePrice: priceFormat(marketValue)

        })

        return toRefs(state)
    }
}
</script>