<template>
    <div 
        class="content_box buy_end clear" 
        v-if="!showRankList"
    >
        <div class="tip text_medium">抢购结束</div>
        <div class="goods_detail">
            <div class="goods_image">
                <div class="img" :style="{ background: `url(${data.goodsCover}) center no-repeat`, backgroundSize: '100% 100%' }"></div>
                <img 
                    src="../images/sell_out.png" 
                    alt="已售罄" 
                    class="sell_out"
                    :class="{ active: showSellOut }"
                >
            </div>
            <div class="goods_detail_right">
                <p class="goods_name text_overflow"><span class="text_medium">{{ data.goodsName }}</span><span class="goods_desc">{{ data.goodsDescription }}</span></p>
                <p class="goods_count text_medium">宝贝库存: 38</p>
                <p class="goods_del_price">￥{{ priceFormat(data.marketValue).int }}<span class="decimals">{{ priceFormat(data.marketValue).decimals }}</span></p>
            </div>
        </div>
        <div class="real_price_warp">
            <div class="data">极限秒杀价: <span class="price_int text_medium">{{ priceFormat(buyKing.price).int }}</span><span class="price_decimals">{{ priceFormat(buyKing.price).decimals }}</span></div>
        </div>
    </div>

</template>

<script>
import { reactive, toRefs, onMounted, computed } from 'vue'
import { priceFormat } from '../util/index'
import { useStore } from 'vuex'
import mixin from '../mixins/index'

export default {
    props: ['data'],
    setup(props) {
        const store = useStore()
        const { playJxmsSounds } = mixin()

        const buyKing = computed(() => {
            return store.state.buyKing
        })

        onMounted(() => {
            setTimeout(() => {
                store.state.showRankList = true
                store.commit('SET_VOICE_CAPTION', 'showRank02')
                playJxmsSounds.value('./voice/03_02.mp3')


            }, 20000);

            setTimeout(() => {
                state.showSellOut = true
            }, 1000);
        })

        const state = reactive({
            priceFormat,
            buyKing,
            showSellOut: false
        })
        
        return toRefs(state)
    },
}
</script>