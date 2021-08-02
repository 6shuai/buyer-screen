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
		<warning v-if="showWarning && !closeWarning && gameState != gameStateId.panicBuyEnd "></warning>

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
import { gameStateId } from './util/index'

export default {
	setup(props) {
		const store = useStore()
		const { initWebsocket } = socketMixin()
		const { videoPlay, clearTimer, playJxmsBgm, pauseJxmsBgm, playJxmsSounds, jxmsAudio, guideStart } = mixin()

		//教学阶段 时长  02_01 = 5s   02_02 = 3s      rule_01 = 21s  rule_02 = 33s       5 + 3 + 21 + 33 = 62
		//猜价结束前30秒  猜价阶段即将结束，还没有参与朋友们请抓紧扫码参与。已经参与的朋友们千万不要⾛开，激动⼈⼼的抢购阶段将在30秒后开始！
		let guideDuration = 55

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
			try {
				if(jxmsAudio.value.playing()) jxmsAudio.value.unload()
			} catch (error) {
				
			}
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
			let { goodsListData, currentGoodsIndex } = store.state
			state.isLoop = false
			store.state.showAdvVideo = false;
			switch (newState) {
				case 0:
					//预热阶段
					gameBgm()
					videoPlay.value(preheatTime - 10, 0)
					gameGuessPriceStartVoice(preheatTime)
					goodsListData[currentGoodsIndex].hide = true
					break
				case 1:
					// 竞猜阶段
					store.state.showGuide = true
					store.commit('SET_VOICE_CAPTION', 1)
					playJxmsSounds.value("./voice/01_01.mp3", () => {
						setTimeout(() => {
							store.commit('SET_VOICE_CAPTION', 2)
						}, 10000);
						playJxmsSounds.value('./voice/rule_01.mp3', () => {
							playJxmsBgm.value("./sounds/guess.mp3", true)
						})
					})
					
					guideStart.value(guessTime + countdown - 9)
					// 9 = 倒计时9秒   55 =抢购教学时长 
					videoPlay.value(guessTime + countdown - 9 - guideDuration, 1)
					break
				case 2:
					// 倒计时

					break
				case 3:
					//抢购中
					store.state.showCountDown = false
					store.commit('SET_VOICE_CAPTION', 'panicBuyStart')
					playJxmsSounds.value("./voice/02_03.mp3", () => {
						playJxmsBgm.value("./sounds/buy_ing.mp3", true)
					})
					videoPlay.value(-1, 3)
					break
				case 4:
					//抢购结束
					gameEnd()
					videoPlay.value(30, 4)
					
					break
				default:
					break
			}
		})

		//预热阶段后十秒   （猜价开始前10秒）
		const gameGuessPriceStartVoice = (duration) =>{
			setTimeout(() => {
				store.commit('SET_VOICE_CAPTION', 'guessBefore')
				playJxmsSounds.value("./voice/00_02.mp3")
			}, (duration - 14)  * 1000);
		}

		//开始之前 和 结束后的 背景音乐
		const gameBgm = () => {
			playJxmsBgm.value("./sounds/before.mp3", true)
		}

		//抢购结束
		const gameEnd = () => {
			clearTimer.value()
			pauseJxmsBgm.value()
			playJxmsSounds.value("./sounds/buy_end.mp3", () => {
				store.commit('SET_VOICE_CAPTION', 'panicBuyEnd')
				playJxmsSounds.value("./voice/02_05.mp3", () => {
					setTimeout(() => {
						gameBgm()
					}, 2000)
				})
			})
		}

		watch(showAdvVideo, (newState, oldState) => {
			if (newState) {
				pauseJxmsBgm.value()
			} else {
				if(state.gameState != 4) playJxmsBgm.value(null, true)
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
			showHistryGoods,
			gameStateId
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
