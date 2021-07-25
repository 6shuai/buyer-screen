<template>
    <div 
        class="content_box buy_end clear" 
        v-if="!showRankList"
    >
    <div class="tip">抢购结束</div>
    <div class="goods_detail">
        <div class="goods_image">
            <img :src="data.goodsCover" class="img">
            <img src="../images/sell_out.png" alt="已售罄" class="sell_out">
        </div>
        <div class="goods_detail_right">
            <p class="goods_name text_overflow">{{ data.goodsName }}<span class="goods_desc">{{ data.goodsDescription }}</span></p>
            <p class="goods_count">宝贝库存: 10</p>
            <p class="goods_del_price">￥{{ priceFormat(data.marketValue).int }}{{ priceFormat(data.marketValue).decimals }}</p>
        </div>
    </div>
    <div class="real_price_warp">
        <div class="data">极限秒杀价: <span class="price_int">{{ priceFormat(buyKing.price).int }}</span><span class="price_decimals">{{ priceFormat(buyKing.price).decimals }}</span></div>
    </div>
</div>

</template>

<script>
import { reactive, toRefs, onMounted, computed } from 'vue'
import { priceFormat } from '../util/index'
import { useStore } from 'vuex'
export default {
    props: ['data'],
    setup(props) {
        const store = useStore()

        const buyKing = computed(() => {
            return store.state.buyKing
        })

        onMounted(() => {
            setTimeout(() => {
                store.state.showRankList = true
            }, 10000);
        })

        const state = reactive({
            priceFormat,
            buyKing
        })
        
        return toRefs(state)
    },
}
</script>