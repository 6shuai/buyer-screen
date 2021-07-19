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
            <p class="goods_count">宝贝库存: 23</p>
            <p class="goods_del_price">￥{{ priceFormat(data.marketValue).int }}{{ priceFormat(data.marketValue).decimals }}</p>
        </div>
    </div>
    <div class="real_price_warp">
        <div class="data">极限秒杀价: <span class="price_int">￥1,929</span><span class="price_decimals">.34</span></div>
    </div>
</div>


<div class="content_box clear" v-if="showRankList">
    <div class="tip">抢购结束</div>
    <div class="goods_detail">

        <div class="goods_image">
            <img :src="data.goodsCover" class="img">
            <img src="../images/sell_out.png" alt="已售罄" class="sell_out">
        </div>
        <p class="goods_name text_overflow">{{ data.goodsName }}</p>
        <p class="goods_desc text_overflow">{{ data.goodsDescription }}</p>
    </div>
    <div class="goods_price_wrap">
        <!-- 买手榜 -->
        <member-list></member-list>
    </div>
</div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from 'vue'
import { priceFormat } from '../util/index'
import { useStore } from 'vuex'
import MemberList from './MemberList.vue'
export default {
    props: ['data'],
    setup(props) {
        const store = useStore()

        const showRankList = computed(() => {
            return store.state.showRankList
        })
        
        onMounted(() => {
            setTimeout(() => {
                store.state.showRankList = true
            }, 5000);
        })

        const state = reactive({
            showRankList,
            priceFormat 
        })
        
        return toRefs(state)
    },

    components: {
        MemberList
    }
}
</script>