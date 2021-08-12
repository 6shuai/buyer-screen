<template>
    <div class="content_box clear">
        <div class="tip text_medium">抢购结束</div>
        <div class="goods_detail">

            <div class="goods_image">
                <div class="img" :style="{ background: `url(${data.goodsCover}) center no-repeat`, backgroundSize: '100% 100%' }"></div>
                <img src="../images/sell_out.png" alt="已售罄" class="sell_out">
            </div>
            <p 
                class="goods_name text_overflow base_color"
                :class="{ 
                    'text_length_7': data.goodsName.length > 7,
                    'text_length_10': data.goodsName.length > 9
                }"
            >
                {{ data.goodsName }}
            </p>
            <p class="goods_desc text_overflow">{{ data.goodsDescription }}</p>
        </div>
        <div class="goods_price_wrap">
            <!-- 买手榜 -->
            <member-list v-if="gameState == gameStateId.panicBuyEnd"></member-list>
        </div>
    </div>
</template>


<script>
import MemberList from './MemberList.vue'
import { toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { gameStateId } from '../util/index'
 
export default {
    props: ['data'],
    setup(props) {
        const store = useStore()

        const gameState = computed(() => {
            return store.state.gameState
        })

        return toRefs({
            gameState,
            gameStateId
        })

    },

    components: {
        MemberList
    }
}
</script>