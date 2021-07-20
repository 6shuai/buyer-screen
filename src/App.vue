<template>
	<div class="main">
		
		<div class="left_goods_list">
			<left-goods-list></left-goods-list>
		</div>

		<div class="goods_content">

			<!-- 倒计时 -->
			<count-down v-if="showCountDown" @countDown="countDown"></count-down>

			<!-- 抢购 -->
			<goods-content></goods-content>
		</div>

		<div class="right_info">
			<right-info></right-info>
		</div>

		<!-- 数量不多了 警告 -->
		<warning v-if="showWarning"></warning>

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

		onMounted(() => {
			initWebsocket.value()
		})

		watch(gameState, (newState, oldState) => {
			state.isLoop = false
			store.state.showAdvVideo = false
			switch (newState) {
                case 0:
					store.state.showAdvVideo = true
                    state.bgmUrl = ''
                    break;
                case 1:

                    break; 
                case 2:

                    break;
                case 3: 
					state.isLoop = true
					state.bgmUrl = './sounds/buy_ing.mp3'
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
			isLoop: false,
			bgmUrl: '',
			audioUrl: '',
			countDown
		})

		return toRefs(state)
	},
	components: {
		LeftGoodsList,
		GoodsContent,
		RightInfo,
		Warning,
		CountDown
	}
}
</script>

<style lang="less" scope>
	.main{
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;

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
					animation: cardHide 1s ease-in-out;
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
