<template>
	<div class="progress_wrap">
		<div class="progress">
			<div
				class="progress_bar"
				ref="progressRef"
			>
				<!-- :style="{ animation: `progressAnim ${progressWidth}s ease-in` }" -->
				<img src="../images/loading_bar.png" />
			</div>

			<div class="sale_data text_medium" v-if="realTimePrice">
				已优惠:
				{{
					changeTwoDecimal_f(100 - (realTimePrice.full / marketValue) * 100)
				}}%
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, toRefs, computed, onMounted, onUnmounted, ref } from "vue"
import { useStore } from "vuex"
export default {
	setup(props) {
		const store = useStore()
		const progressRef = ref(null)

		//marketValue               原价
		//currentPrice              当前抢购价格
		//priceDeclineRate          每分钟下降金额
		//priceDecline              每次下降多少钱
		//priceDeclineFrequency     多少时间下降一次
		let {
			marketValue,
			currentPrice,
			priceDeclineRate,
			priceDecline,
			priceDeclineFrequency,
		} = store.state.goodsDataDetail

		//实时价格
		const realTimePrice = computed(() => {
			return store.state.realTimePrice
		})

		onMounted(() => {
			//进度条比真实价格  进度条快 10%
			// state.progressWidth = (marketValue / priceDeclineRate) * 60 * 0.9

			// const kfs = findKeyframesRule("progressAnim")

			//删除动画
			// kfs.deleteRule(6)

			//添加动画
			// kfs.insertRule(`@keyframes progressAnim {
            //         0%{ width: ${(currentPrice / marketValue) * 100}% }
            //         100%{ width: 0%}
            //     }`)

			state.progressRef.style.width = `${(currentPrice / marketValue) * 100}%`
			progress()
		})
			
			
		//进度条
		const progress = () => {
				
			state.progressWidth = (state.realTimePrice.full / marketValue) * 100
			if(state.progressWidth < 10){
				state.progressWidth * 1.05
			}else{
				state.progressWidth * 0.95
			}

			if(state.progressWidth <= 0){
				clearTimeout(state.progressTimer)
				return
			}

			state.progressRef.style.width = `${(state.progressWidth)}%`
			state.progressTimer = setTimeout(() => {
				progress()
			}, 100)
		}

		//获取 css animation @keyframes属性值
		const findKeyframesRule = (rule) => {
			//此处过滤非同源的styleSheet，因为非同源的无法访问cssRules，会报错
			var ss = Array.from(document.styleSheets).filter(
				(styleSheet) =>
					!styleSheet.href ||
					styleSheet.href.startsWith(window.location.origin)
			)
			for (var i = 0; i < ss.length; ++i) {
				for (var j = 0; j < ss[i].cssRules.length; ++j) {
					if (
						ss[i].cssRules[j].type ===
							window.CSSRule.KEYFRAMES_RULE &&
						ss[i].cssRules[j].name === rule
					) {
						return ss[i]
					}
				}
			}
			return null
		}

		//保留小数点后两位
		const changeTwoDecimal_f = (x) => {
			var f_x = parseFloat(x)
			var f_x = Math.floor(x * 100) / 100
			var s_x = f_x.toString();
			var pos_decimal = s_x.indexOf('.');
			if (pos_decimal < 0) {
				pos_decimal = s_x.length
				s_x += '.'
			}
			while (s_x.length <= pos_decimal + 2) {
				s_x += '0'
			}
			return s_x
		}

		const state = reactive({
			timer: undefined,
			progressTimer: undefined,
			realTimePrice,
			marketValue,
			progressWidth: 100,
			progressRef,
			changeTwoDecimal_f
		})

		onUnmounted(() => {
			clearTimeout(state.timer)
			clearTimeout(state.progressTimer)
		})

		return toRefs(state)
	},
};
</script>

<style lang="less" scope>
.progress_wrap {
	width: 100%;
	text-align: center;
	padding-bottom: 32px;

	.progress {
		width: 1442px;
		height: 141px;
		line-height: 141px;
		display: inline-block;
		background: url("../images/loading_bg.png") center no-repeat;
		background-size: 100% 100%;
		position: relative;

		.progress_bar {
			width: 100%;
			height: 100%;
			overflow: hidden;
			transition: all 1s linear;

			img {
				width: 1437px;
			}
		}

		.sale_data {
			font-size: 80px;
			font-weight: bold;
			color: #ffcc00;
			width: 100%;
			text-align: center;
			position: absolute;
			top: 0;
		}
	}

	@keyframes progressAnim {
		0% {
			width: 100%;
		}
		100% {
			width: 0%;
		}
	}
}
</style>