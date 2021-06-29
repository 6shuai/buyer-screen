<template>
	<div class="main" @click="handleClickPage">

		<!-- 抢购 -->
		<panic-buy ref="mainRef"></panic-buy>
		
		<!-- 底栏 预告列表 -->
		<fore-show></fore-show>

		<!-- 广告 -->
		<adv-stage v-if="gameState == 0"></adv-stage>
		
		<!-- 弹幕 -->
		<danmaku></danmaku>
		
	</div>
</template>

<script>
import Danmaku from './components/Danmaku.vue'
import ForeShow from  './components/Foreshow.vue'
import PanicBuy from './components/Main.vue'
import AdvStage from './components/stage/Adv.vue'

import { reactive, toRefs, computed, onMounted, ref } from 'vue'
import mixin from './mixins/socket'
import { useStore } from 'vuex'

export default {
	setup(props) {
		const store = useStore()
		const mainRef = ref(null)
		const { initWebsocket } = mixin()
		
		//游戏状态
		const gameState = computed(() => {
			return store.state.gameState
		})

		onMounted(() => {
			initWebsocket.value()
		})

		const handleClickPage = () => {
			state.mainRef.hasPlayAudio()
		}

		const state = reactive({
			gameState,
			mainRef,
			handleClickPage
		})

		return toRefs(state)
	},
	components: {
		Danmaku,
		ForeShow,
		PanicBuy,
		AdvStage
	}
}

</script>

<style lang="less" scope>
	.main{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: rgba(0, 0, 0, 0.4);
	}
</style>