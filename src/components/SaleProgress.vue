<template>
	<div class="progress_wrap smiley">
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
				<span 
					v-for="(item, index) in changeTwoDecimal_f(100 - (realTimePrice.full / marketValue) * 100)" 
					:key="index"
					:class="{ number: item != '.' }"
				>
					{{ item }}
				</span>
				%
			</div>

		</div>
	</div>
	<div 
		class="sale_wrap"
		:class="{ active: showSale }"
	>
		<div 
			class="sale_count text_medium base_color"
			:class="{ show_sale_count: showSale }"
		>
			已达
			<span class="count">{{ 10 - saleNum + 1 }}</span>
			<span class="text">折!</span>
		</div>
	</div>
</template>

<script>
import { reactive, toRefs, computed, onMounted, onUnmounted, ref } from "vue"
import { useStore } from "vuex"
import mixin from '../mixins/index'

export default {
	setup(props) {
		const store = useStore()
		const progressRef = ref(null)
		const { playJxmsSounds } = mixin()

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
			state.progressWidth = 100
			progress()
		})
			
			
		//进度条
		const progress = () => {
				
			// state.progressWidth = (state.realTimePrice.full / marketValue) * 100
			// state.progressWidth -= currentPrice / priceDeclineRate / 60 / 10
			let priceDeclineCopy = JSON.parse(JSON.stringify(priceDecline))

			let time = 100

			if(priceDeclineFrequency != 0.1){
				priceDeclineCopy = priceDecline / (priceDeclineFrequency * 1000 / time)
			}

			if(state.progressWidth < 20){
				priceDeclineCopy = priceDeclineCopy * 0.2
			}else{
				priceDeclineCopy = priceDeclineCopy * 1.5
			}

			state.progressWidth -= priceDeclineCopy / marketValue * 100



			if(state.progressWidth <= 0){
				clearTimeout(state.progressTimer)
				return
			}

			state.progressRef.style.width = `${(state.progressWidth)}%`
			state.progressTimer = setTimeout(() => {
				progress()
			}, time)
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

			if(s_x >= state.saleNum * 10){
				state.showSale = true
				state.saleNum += 1
				let saleNum = 10 - state.saleNum + 1
				playJxmsSounds.value(`./voice/discount${saleNum}.mp3`)

				hideSale()
			}

			return s_x
		}


		const hideSale = () => {
			clearTimeout(state.saleTimer)
			state.saleTimer = setTimeout(() => {
				state.showSale = false
			}, 3000);
		}

		const state = reactive({
			timer: undefined,
			progressTimer: undefined,
			realTimePrice,
			marketValue,
			progressWidth: 100,
			progressRef,
			changeTwoDecimal_f,
			saleTimer: undefined,
			saleNum: 1,         //折扣
			showSale: false     //是否显示折扣
		})

		onUnmounted(() => {
			clearTimeout(state.timer)
			clearTimeout(state.progressTimer)
			clearTimeout(state.saleTimer)
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

			.number{
				display: inline-block;
				width: 48px;
				text-align: center;
			}
		}
		
	}
}

.sale_wrap{
	position: absolute;
	bottom: 100px;
	left: 0;
	width: 100%;
	height: 324px;
	background: url('../images/sale_bg.png') no-repeat center;
	background-size: 100% 100%;
	z-index: 99999;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: all .1s ease-in;

	&.active{
		opacity: 1;
	}

	.sale_count{
		display: inline-block;
		font-size: 60px;
		transform: translate(-100vw);


		&.show_sale_count{
			animation: saleCountAnim 3s ease-in;
		}

		.count{
			font-size: 180px;
			color: #fff;
			padding: 0 5px;
		}

		.text{
			color: #fff;
		}
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

@keyframes saleAnim {
	0% {
		transform: rotate(-15deg) scale(5);
		opacity: 0;
	}
	6% {
		transform: rotate(0deg) scale(1);
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

@keyframes saleCountAnim {
	0%{
		transform: translate(-100vw);
	}
	5%{
		transform: translate(0);
	}
	90%{
		transform: translate(6vw);
	}
	100%{
		transform: translate(100vw);
	}
}
</style>