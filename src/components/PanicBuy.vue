<template>
	<div class="tip text_medium">当前宝贝</div>
	<div class="goods_detail">
		<div class="goods_image">
			<div
				class="img"
				:style="{
					background: `url(${data.goodsCover}) center no-repeat`,
					backgroundSize: '100% 100%',
				}"
			></div>
		</div>
		<div class="goods_detail_right">
			<p class="goods_name text_overflow">
				<span 
					class="name text_medium text_overflow"
					:class="{ 
                        'text_length_7': data.goodsName.length > 7,
                        'text_length_10': data.goodsName.length > 9
                     }"
				>
					{{ data.goodsName }}
				</span>
				<span class="goods_desc text_overflow">{{ data.goodsDescription }}</span>
			</p>
			<div class="buy_in_price">
				<span class="int"
					>￥{{ priceFormat(data.marketValue).int }}</span
				>
				<span class="decimals">{{
					priceFormat(data.marketValue).decimals
				}}</span>
				<span class="price_text_qi">起</span>
			</div>
			<p class="buy_in_price_down text_medium">
				每分钟直降<span
					>￥{{ priceFormat(data.priceDeclineRate).int
					}}{{ priceFormat(data.priceDeclineRate).decimals }}</span
				>
			</p>
		</div>
	</div>
	<div
		class="real_price_warp"
		:class="{ sell_out_crad: gameState == gameStateId.panicBuyEnd }"
	>	
		<div class="light_bg">
			<img src="../images/light_red.png" class="light">
		</div>
		<div class="data" v-if="gameState == gameStateId.panicBuyEnd">
			已售罄
		</div>
		<div class="data text_medium" v-else>
			<div class="text">实时价格: </div>
			<div class="price_num_wrap">
				<span class="price_int">￥{{ realTimePrice.int }}</span>
				<span class="price_decimals">{{ realTimePrice.decimals }}</span>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, toRefs, onMounted, computed, onUnmounted, nextTick } from "vue";
import { priceFormat, gameStateId } from "../util/index";
import { useStore } from "vuex";
export default {
	props: ["data"],
	setup(props) {
		const store = useStore();

		// 游戏状态
		const gameState = computed(() => {
			return store.state.gameState;
		});

		//currentPrice              抢购价格
		//priceDeclineRate          每分钟下降金额
		//priceDecline              每次下降多少钱
		//priceDeclineFrequency     多少时间下降一次
		let {
			currentPrice,
			priceDeclineRate,
			priceDecline,
			priceDeclineFrequency,
		} = store.state.goodsDataDetail;

		onMounted(() => {
			state.marketValue = currentPrice;
			setRealTimePrice(currentPrice, priceDeclineFrequency);
		})


		//实时价格
		const setRealTimePrice = (price, priceDeclineFrequency) => {
			clearTimeout(state.timer)

			priceDownDiff(price, price - priceDecline)




			let newPrice = price - priceDecline

			if (newPrice <= 0) {
				newPrice = 0
				return
			}
			// state.realTimePrice = priceFormat(newPrice);
			// store.commit("SET_REAL_TIME_PRICE", state.realTimePrice);

			state.timer = setTimeout(() => {
				setRealTimePrice(newPrice, priceDeclineFrequency)
			}, priceDeclineFrequency * 1000);
		};

		//下降差值计算
		const priceDownDiff = (startNum, endNum) => {
			clearInterval(state.diffTimer)
			let num = 0.01
			let time = 1
			let sNum = startNum
			if(priceDecline < 0.1){
				time = 0.01
			}else if(priceDecline < 1){
				time = priceDecline / 10
			}else if(priceDecline < 10){
				time = priceDecline / 100
			}else if(priceDecline < 100){
				time = priceDecline / 1000
			}
			num =  priceDecline / (1000 / (time * 1000))

			state.diffTimer = setInterval(() => {
				sNum -= num
				nextTick(() => {
					state.realTimePrice = priceFormat(sNum);
					store.commit("SET_REAL_TIME_PRICE", state.realTimePrice);
					if(sNum <= endNum){
						clearInterval(state.diffTimer)
					}
				})
			}, time * 1000);

		}

		onUnmounted(() => {
			clearTimeout(state.timer);
		});

		const state = reactive({
			gameState,
			priceFormat,
			gameStateId,
			timer: undefined,
			diffTimer: undefined,
			realTimePrice: priceFormat(currentPrice),
		});

		return toRefs(state);
	},
};
</script>
