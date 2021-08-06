<template>
	<div 
		class="right_wrap"
		:class="{ 'hideRight': showCountDown }"
		:style="{ transition: `all .3s ease-in ${ !showCountDown ? '0s' : '.5s'}` }"
	>

		<!-- 实时热度 -->
		<div 
			class="hot_wrap"
			:class="
				gameState == gameStateId.guessPrice || gameState == gameStateId.countDown
					? 'hide_hot'
					: 'show_hot'
				"
		>
			<div class="hot_title">
				<span class="text text_medium">实时热度</span>
				<span class="count">{{ hotNum }}</span>
			</div>

			<div class="member_list clearfix">
				<div 
					class="item" 
					v-for="(item, index) in memberList" 
					:key="index"
					:style="{ zIndex: item.index }"
				>
					<div class="mask"></div>
					<img :src="item.avatar" :alt="item.nickname">
				</div>
			</div>
		</div>


		<div class="guess_count_down">
			<div
				class="state_info"
				:class="
					(gameState == gameStateId.guessPrice || gameState == gameStateId.countDown) && !showCountDown
						? 'show_guess'
						: 'hide_guess'
				"
			>
				<p class="text">竞猜进行中</p>
				<p class="count_down">{{ countDownNum }}</p>
			</div>
		</div>
		
		<div class="qrcode_wrap column_qrcode">
			<div class="logo">
				<img src="../images/logo_jxms.png" alt="logo" />
			</div>
			<div class="qrcode_box">
				<p class="sao_text">微信扫一扫</p>
				<img src="../images/qrcode.png" />
			</div>
		</div>
	</div>

	<div class="qrcode_wrap fixed_qrcode">
		<div class="qrcode_box">
			<p class="sao_text">微信扫一扫</p>
			<img src="../images/qrcode.png" />
		</div>
	</div>

</template>

<script>
import { reactive, toRefs, computed, watch } from "vue"
import { useStore } from "vuex"
import { translatesToHoursMinutesSeconds, gameStateId } from "../util/index"
import mixin from '../mixins/index'

export default {
	setup(props) {
		const store = useStore();
		const { playJxmsSounds } = mixin()

		//显示倒计时
		const showCountDown = computed(() => {
			return store.state.showCountDown
		})

		//游戏状态
		const gameState = computed(() => {
			//猜价阶段
			if (store.state.gameState == state.gameStateId.guessPrice) {
				//抢购详情   拿到猜价时长 做倒计时
				countDownFun(
					store.state.goodsDataDetail.guessTime +
						store.state.goodsDataDetail.countdown
				)
			}

			return store.state.gameState
		})

		//玩家参与抢购通知
		const panicBuyMember = computed(() => {
			return store.state.panicBuyMember
		})

		//实时热度  大于9999显示x.xx万
		const hotNum = computed(() => {
			let value = state.memberList.length
			let num
			if(value > 9999){
				num = (Math.floor(value / 1000) / 10)
			}else{
				num = value
			}
			return num
		})

		//倒计时
		const countDownFun = (num) => {
			if (num < 0) {
				clearTimeout(state.timer)
				return
			}else if(num < 10){
                //还剩最后十秒
                store.state.showCountDown = true
                clearTimeout(state.timer)
                return
            }else if(num == 13){
				store.commit('SET_VOICE_CAPTION', 'countDownBefore')
				playJxmsSounds.value('./voice/02_02.mp3')
			}
			state.countDownNum = translatesToHoursMinutesSeconds(num)
			num -= 1
			state.timer = setTimeout(() => {
				countDownFun(num)
			}, 1000)
		}

		watch(panicBuyMember, (newProp, oldProp) => {
			if(state.memberList.length > 100) return
			state.memberList.unshift({
				index: state.memberList.length,
				...newProp
			})
		})

		const state = reactive({
			timer: undefined,
			countDownNum: 0, //倒计时
			gameState,
			showCountDown,
			store,
			gameStateId,
			memberList: [],
			hotNum
		})

		return toRefs(state)
	},
};
</script>

<style lang="less" scope>
.right_wrap {
	height: 100%;
	padding: 22px 43px;
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	background: url("../images/sidebar_right.png") no-repeat center;
	background-size: 100% 100%;

	&.hideRight{
		transform: translate(100%);
	}

	.hot_wrap{
		transition: all 0.5s ease-in;
		flex: 1;
		&.show_hot{
			transform: translate(0);
			position: relative;
		}

		&.hide_hot{
			transform: translate(100vw);
			position: absolute;
		}
	}

	.hot_title{
		width: 309px;
		height: 60px;
		background: url('../images/hot_bg.png') center no-repeat;
		background-size: 100% 100%;
		margin: 0 auto;
		line-height: 60px;
		color: #fff;
		text-align: center;

		.text{
			font-size: 40px;
		}

		.count{
			font-size: 30px;
			padding-left: 15px;
		}
	}

	.member_list{
		height: calc(100% - 120px);
		margin-top: 20px;
		background: url("../images/qrcode_card.png") center no-repeat;
		background-size: 100% 100%;
		padding: 20px 25px 20px 75px;
		overflow: hidden;

		.item{
			width: 82px;
			height: 82px;
			line-height: 82px;
			border-radius: 50%;
			float: left;
			background: url('../images/head_border.png') center no-repeat;
			background-size: 100% 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: -45px;
			margin-bottom: 10px;
			position: relative;

			.mask{
				position: absolute;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.3);
				border-radius: 50%;
			}
			
			&:first-child{
				.mask{
					background: rgba(0, 0, 0, 0);
				}
			}

			img{
				width: 72px;
				height: 72px;
				border-radius: 50%;
			}
		}
	}

	.logo {
		width: 317px;
		height: 86px;
		margin: 0 auto;
		margin-bottom: 25px;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.guess_count_down {
		width: 100%;
		// height: 226px;
	}

	.state_info {
		width: 100%;
		// height: 226px;
		background: url("../images/count_down_card.png") center no-repeat;
		background-size: 100% 100%;
		text-align: center;
		// margin-top: 40px;
		transition: all 0.5s ease-in .5s;

		&.show_guess {
			transform: translate(0);
			height: 226px;
		}

		&.hide_guess {
			transform: translate(100vw);
			height: 0px;
		}

		.text {
			font-size: 50px;
			color: #4a2453;
			padding-top: 30px;
		}

		.count_down {
			font-size: 100px;
			font-weight: bold;
			color: #ffcc00;
			padding-top: 20px;
		}
	}
}

.qrcode_wrap {
	width: 364px;
	text-align: center;
	margin-top: 38px;

	&.column_qrcode .qrcode_box{
		opacity: 0;
	}

	&.fixed_qrcode{
		position: fixed;
		z-index: 999;
		bottom: 0;
		right: 43px;
	}

	.qrcode_box {
		padding: 19px;
		background: url("../images/qrcode_card.png") center no-repeat;
		background-size: 100% 100%;
		margin-bottom: 42px;

		.sao_text {
			font-size: 40px;
			color: #4a2453;
			text-align: justify;
			text-align-last: justify;
			padding-bottom: 19px;
		}

		img {
			width: 322px;
			height: 322px;
		}
	}
}
</style>