<template>
	<div
		class="main"
	>
		<div class="left_goods_list">
			<left-goods-list></left-goods-list>
		</div>

		<div class="goods_content">
			<!-- 倒计时 -->
			<count-down
				v-if="showCountDown"
				@countDown="countDown"
			></count-down>

			<!-- 竞拍历史 扫码查看更多宝贝 -->
			<miniview v-else-if="showHistryGoods"></miniview>

			<!-- 抢购 -->
			<div v-if="!showHistryGoods">
				<goods-content></goods-content>
			</div>
		</div>

		<div class="right_info">
			<right-info></right-info>
		</div>

		<!-- 数量不多了 警告 -->
		<warning v-if="showWarning && !closeWarning"></warning>

	</div>
</template>

<script>
import {
	reactive,
	toRefs,
	computed,
	onMounted,
	nextTick,
	watch,
	ref,
} from "vue"
import { useStore } from "vuex"
import LeftGoodsList from "./layout/left.vue"
import GoodsContent from "./layout/content.vue"
import RightInfo from "./layout/right.vue"
import Warning from "./components/Warning.vue"
import CountDown from "./components/CountDown.vue"
import Miniview from "./components/Miniview.vue"
import socketMixin from "./mixins/socket"
import mixin from "./mixins/index"

export default {
	setup(props) {
		const store = useStore()
		const { initWebsocket } = socketMixin()
		const { videoPlay, clearTimer, playJxmsBgm, pauseJxmsBgm, playJxmsSounds, jxmsAudio } = mixin()

		//是否显示倒计时
		const showCountDown = computed(() => {
			return store.state.showCountDown
		})

		//游戏状态
		const gameState = computed(() => {
			return store.state.gameState
		})
		

		//倒计时
		const countDown = (e) => {
			if(jxmsAudio.value.playing()) jxmsAudio.value.unload()
			nextTick(() => {
				if (e == "end") {
					playJxmsSounds.value("./sounds/count_down_end.wav")
				} else {
					playJxmsSounds.value("./sounds/count_down_num.mp3")
				}
			})
		}

		//是否显示  库存不足警告
		const showWarning = computed(() => {
			return store.state.showWarning
		})

		const closeWarning = computed(() => {
			return store.state.closeWarning
		})

		//是否显示竞拍历史
		const showHistryGoods = computed(() => {
			return store.state.showHistryGoods
		})

		const showAdvVideo = computed(() => {
			return store.state.showAdvVideo
		})

		onMounted(() => {
			//socket 初始化 连接
			initWebsocket.value();

			//开始之前 背景音乐
			gameBgm()
			
		})

		watch(gameState, (newState, oldState) => {
			let { guessTime, countdown, preheatTime } =
				store.state.goodsDataDetail
			state.isLoop = false
			store.state.showAdvVideo = false;
			switch (newState) {
				case 0:
					//预热阶段
					gameBgm()
					videoPlay.value(preheatTime)
					break
				case 1:
					// 竞猜阶段
					playJxmsBgm.value("./sounds/guess.mp3", true)
					
					videoPlay.value(guessTime + countdown - 9)
					break
				case 2:
					// 倒计时

					break
				case 3:
					//抢购中
					store.state.showCountDown = false
					playJxmsBgm.value("./sounds/buy_ing.mp3", true)
					videoPlay.value(-1)
					break
				case 4:
					//抢购结束
					gameEnd()
					videoPlay.value(75)
					
					break
				default:
					break
			}
		});

		//开始之前 和 结束后的 背景音乐
		const gameBgm = () => {
			playJxmsBgm.value("./sounds/before.mp3", true)
		}

		//抢购结束
		const gameEnd = () => {
			playJxmsSounds.value("./sounds/buy_end.mp3")
			clearTimer.value()
			setTimeout(() => {
				gameBgm()
			}, 2000)
		}

		watch(showWarning, (newState, oldState) => {
			console.log('showWarning-------->', newState)
			if (newState) {
				playJxmsSounds.value("./sounds/warning.mp3")
			}
		});

		watch(showAdvVideo, (newState, oldState) => {
			if (newState) {
				if(state.gameState != 3) pauseJxmsBgm.value()
			} else {
				playJxmsBgm.value(null, true)
			}
		});

		const state = reactive({
			gameState,
			showCountDown,
			showWarning,
			closeWarning,
			isLoop: false,
			audioUrl: "",
			playTimer: undefined,
			countDown,
			showHistryGoods
		})

		return toRefs(state)
	},
	components: {
		LeftGoodsList,
		GoodsContent,
		RightInfo,
		Warning,
		CountDown,
		Miniview,
	}
}
</script>

<style lang="less" scope>
.main {
	width: 100%;
	height: 100%;
	overflow: hidden;
	display: flex;

	&.miniview {
		background: url("./images/miniview_bg.png") center no-repeat;
		// background-size: 100% 100%;
		overflow: hidden;
	}

	.left_goods_list,
	.right_info {
		width: 17.8%;
		min-width: 17.8%;
		height: 100%;
		background: url("./images/sidebar_left.png") no-repeat center;
		background-size: 100% 100%;
	}

	.right_info {
		background: url("./images/sidebar_right.png") no-repeat center;
		background-size: 100% 100%;
	}

	.goods_content {
		flex: 1;
		height: 100%;
		position: relative;
		overflow: hidden;

		.goods_box {
			width: 100%;
			height: 100%;
			position: relative;
		}

		.card {
			width: 100%;
			height: 100px;
			position: absolute;
			bottom: -100%;
			left: 0;
			background: #000;

			&1 {
				animation: cardHide 1s ease-in;
			}
			&2 {
				animation: cardShow 1s ease-out;
			}
		}

		@keyframes cardHide {
			0% {
				bottom: 0px;
				opacity: 1;
			}
			100% {
				bottom: 100px;
				opacity: 0;
			}
		}

		@keyframes cardShow {
			0% {
				bottom: -100px;
				opacity: 0;
			}
			100% {
				bottom: 0px;
				opacity: 1;
			}
		}
	}
}
</style>
