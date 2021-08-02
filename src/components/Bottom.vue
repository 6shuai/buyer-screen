<template>
    <div class="bottom_wrap">
        

        <!-- 下个宝贝 预告 -->
        <foreshow v-if="showRankList && !showTomorrowGoods"></foreshow>
        
        <div v-else>
            <!-- 箭头 -->
            <arraw-card v-if="!gameState || gameState==gameStateId.guessPrice || gameState==gameStateId.countDown || showTomorrowGoods"></arraw-card>

            <!-- 优惠进度 -->
            <sale-progress v-else-if="gameState == gameStateId.panicBuyIng"></sale-progress>

            <!-- 秒杀王 -->
            <king v-else-if="gameState == gameStateId.panicBuyEnd"></king> 

            <!-- 最底部 -->
            <bottom-danmaku></bottom-danmaku>

        </div>
    </div>
</template>

<script>
import arrawCard from './ArrawCard.vue'
import bottomDanmaku from './BottomDanmaku.vue'
import SaleProgress from '../components/SaleProgress.vue'
import King from '../components/King.vue'
import Foreshow from '../components/foreshow.vue'
import { useStore } from 'vuex'
import { reactive, toRefs, computed } from 'vue'
import { gameStateId } from '../util/index'

export default {
    setup(props) {
        const store = useStore()

        // 游戏状态
        const gameState = computed(() => {
            return store.state.gameState
        })

        const showTomorrowGoods = computed(() => {
            return store.state.showTomorrowGoods
        })

        //抢购结束 显示下个宝贝预告
        const showRankList = computed(() => {
            return store.state.showRankList
        })

        const state = reactive({
            gameState,
            showRankList,
            showTomorrowGoods,
            gameStateId
        })

        return toRefs(state)
        
    },
    components: {
        arrawCard,
        bottomDanmaku,
        SaleProgress,
        King,
        Foreshow
    }
}
</script>

<style lang="less" scope>
    .bottom_wrap{
        width: 100%;
        height: 407px;
        position: absolute;
        bottom: 0;
        left: 0;
        background: url('../images/bottom_bg.png') center no-repeat;
        z-index: 9;
        display: flex;
        flex-flow: column;
        justify-content: flex-end;
    }
</style>