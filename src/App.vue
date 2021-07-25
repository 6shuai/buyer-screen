<template>
	<div 
		class="main"
		:class="showHistryGoods ? 'miniview' : ''"
	>
		
		<div class="left_goods_list">
			<left-goods-list></left-goods-list>
		</div>

		<div class="goods_content">
			<!-- 倒计时 -->
			<count-down v-if="showCountDown" @countDown="countDown"></count-down>
			
			<!-- 竞拍历史 扫码查看更多宝贝 -->
			<miniview v-if="showHistryGoods"></miniview>

			<!-- 抢购 -->
			<goods-content v-else></goods-content>


		</div>

		<div class="right_info">
			<right-info></right-info>
		</div>

		<!-- 数量不多了 警告 -->
		<warning v-if="showWarning && !closeWarning"></warning>

		<!-- 背景音乐 -->
		<audio :src="bgmUrl" autoplay :loop="isLoop"></audio>

		<!-- 音效 -->
		<audio :src="audioUrl" autoplay></audio>

	</div>
</template>

<script>
import { reactive, toRefs, computed, onMounted, nextTick, watch } from 'vue'
import { useStore } from 'vuex'
import LeftGoodsList from './layout/left.vue'
import GoodsContent from './layout/content.vue'
import RightInfo from './layout/right.vue'
import Warning from './components/Warning.vue'
import CountDown from './components/CountDown.vue'
import Miniview from './components/Miniview.vue'
import mixin from './mixins/socket'

export default {
	setup(props) {
		const store = useStore()
		const { initWebsocket } = mixin()

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
            if(store.state.gameState == null){
                state.bgmUrl = ''
                nextTick(() => {
                    if(e == 'end'){
                        state.bgmUrl = './sounds/count_down_end.mp3'
                    }else{
                        state.bgmUrl = './sounds/count_down.mp3'
                    }
                    state.isLoop = false
                })
            }
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


		//每个状态 搁二十秒播放一次视频
		const videoPlay = (duration) => {
			clearTimeout(state.playTimer)
			// if(duration / 35 >= 1){
				state.playTimer = setTimeout(() => {
					store.state.showAdvVideo = true
				}, 20  * 1000);
			// }
		}
		

		onMounted(() => {
			initWebsocket.value()
		})

		watch(gameState, (newState, oldState) => {
			let { guessTime, countdown } = store.state.goodsDataDetail
			state.isLoop = false
			store.state.showAdvVideo = false
			switch (newState) {
                case 0:
					store.state.showAdvVideo = true
					store.state.showCountDown = false
                    state.bgmUrl = ''
                    break;
                case 1:
					store.state.showCountDown = false
					videoPlay(guessTime + countdown)
                    break; 
                case 2:

                    break;
                case 3: 
					state.isLoop = true
					state.bgmUrl = './sounds/buy_ing.mp3'
					videoPlay()
                    break;
				case 4: 
					state.bgmUrl = './sounds/buy_end.mp3'
                    break;
                default:
                    break;
            }
		})

		watch(showWarning, (newState, oldState) => {
			if(newState){
				state.audioUrl = './sounds/warning.mp3'
			}
		})

		const state = reactive({
			gameState,
			showCountDown,
			showWarning,
			closeWarning,
			isLoop: false,
			bgmUrl: '',
			audioUrl: '',
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
		Miniview
	}
}
</script>

<style lang="less" scope>
	.main{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;

		&.miniview{
			background: url('./images/miniview_bg.png') center no-repeat;
			background-size: 100% 100%;
			overflow: hidden;
		}

		.left_goods_list, .right_info{
			width: 17.8%;
			min-width: 17.8%;
			height: 100%;
			background: url('./images/sidebar_left.png') no-repeat center;
			background-size: 100% 100%;
		}

		.right_info{
			background: url('./images/sidebar_right.png') no-repeat center;
			background-size: 100% 100%;
		}
		
		.goods_content{
			flex: 1;
			height: 100%;
			position: relative;
			overflow: hidden;

			.goods_box{
				width: 100%;
				height: 100%;
				position: relative;
			}

			.card{
				width: 100%;
				height: 100px;
				position: absolute;
				bottom: -100%;
				left: 0;
				background: #000;
				

				&1{
					animation: cardHide 1s ease-in;
				}
				&2{
					animation: cardShow 1s ease-out;
				}
			}

			@keyframes cardHide {
				0% {
					bottom: 0px;
					opacity: 1;
				}
				100%{
					bottom: 100px;
					opacity: 0;
				}
			}

			@keyframes cardShow {
				0% {
					bottom: -100px;
					opacity: 0;
				}
				100%{
					bottom: 0px;
					opacity: 1;
				}
			}
		}
	}
</style>
