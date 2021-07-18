<template>
    <div class="bottom_wrap">
        
        <!-- 箭头 -->
        <arraw-card v-if="!gameState || gameState==1"></arraw-card>

        <!-- 优惠进度 -->
        <sale-progress v-if="gameState==3"></sale-progress>

        <!-- 秒杀王 -->
        <king v-if="gameState == 4"></king>

        <!-- 最底部 -->
        <bottom-danmaku></bottom-danmaku>

        <!-- 下个宝贝 预告 -->
        <!-- <foreshow></foreshow> -->

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

export default {
    setup(props) {
        const store = useStore()

        // 游戏状态
        const gameState = computed(() => {
            return store.state.gameState
        })

        const state = reactive({
            gameState
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