<template>
	<div class="main">
		
		<div class="left_goods_list">
			<left-goods-list></left-goods-list>
		</div>

		<div class="goods_content">
			<!-- 抢购 -->
			<goods-content></goods-content>
			<!-- <div class="goods_box">
				<div class="card card1"></div>
				<div class="card card2"></div>
			</div> -->

		</div>

		<div class="right_info">
			<right-info></right-info>
		</div>

		<!-- 数量不多了 警告 -->
		<warning v-if="showWarning"></warning>

	</div>
</template>

<script>
import { reactive, toRefs, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import LeftGoodsList from './layout/left.vue'
import GoodsContent from './layout/content.vue'
import RightInfo from './layout/right.vue'
import Warning from './components/Warning.vue'
import mixin from './mixins/socket'

export default {
	setup(props) {
		const store = useStore()
		const { initWebsocket } = mixin()

		//游戏状态
		const gameState = computed(() => {
			return store.state.gameState
		})

		//是否显示  库存不足警告
		const showWarning = computed(() => {
			return store.state.showWarning
		})

		onMounted(() => {
			initWebsocket.value()
		})

		const state = reactive({
			showWarning
		})

		return toRefs(state)
	},
	components: {
		LeftGoodsList,
		GoodsContent,
		RightInfo,
		Warning
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
