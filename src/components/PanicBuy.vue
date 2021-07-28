<template>
	<div class="tip">当前宝贝</div>
	<div class="goods_detail">
		<div class="goods_image">
			<img :src="data.goodsCover" class="img" />
		</div>
		<div class="goods_detail_right">
			<p class="goods_name text_overflow text_medium">
				{{ data.goodsName
				}}<span class="goods_desc">{{ data.goodsDescription }}</span>
			</p>
			<div class="buy_in_price">
				<span class="int">￥{{ priceFormat(data.marketValue).int }}</span>
				<span class="decimals">{{ priceFormat(data.marketValue).decimals }}</span>
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
	<div class="real_price_warp" :class="{ sell_out_crad: gameState == 4 }">
		<div class="data" v-if="gameState == 4">已售罄</div>
		<div class="data text_medium" v-else>
			实时价格: <span class="price_int">￥{{ realTimePrice.int }}</span
			><span class="price_decimals">{{ realTimePrice.decimals }}</span>
		</div>
	</div>
</template>

<script>
import { reactive, toRefs, onMounted, computed, onUnmounted } from "vue";
import { priceFormat } from "../util/index";
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
		});

		//实时价格
		const setRealTimePrice = (price, priceDeclineFrequency) => {
			clearTimeout(state.timer);
			let newPrice = price - priceDecline;

			if (newPrice <= 0) {
				newPrice = 0;
				return;
			}
			state.realTimePrice = priceFormat(newPrice);
			store.commit("SET_REAL_TIME_PRICE", state.realTimePrice);

			state.timer = setTimeout(() => {
				setRealTimePrice(newPrice, priceDeclineFrequency);
			}, priceDeclineFrequency * 1000);
		};

		onUnmounted(() => {
			clearTimeout(state.timer);
		});

		const state = reactive({
			gameState,
			priceFormat,
			timer: undefined,
			realTimePrice: priceFormat(currentPrice),
		});

		return toRefs(state);
	},
};
</script>