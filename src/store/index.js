import { createStore } from 'vuex'

const state = {
	showCountDown: false,      //显示倒计时页
	goodsListData: [],         //今日抢购列表
	currentGoodsIndex: 0,      //当前开始抢购 索引
	goodsDataDetail: {},       //抢购详情
	gameState: null,           //抢购状态  游戏的状态，0预热阶段，1竞猜阶段，2开始倒计时，3出价阶段 ,4结束
	buySuccessMember: {},      //抢购成功的用户信息
	guessNotice: {},           //猜价通知
	
	buyMemberList: [],         //抢购用户列表
	buyKing: {},               //秒杀王
	guessPriceMemberList: [],  //猜价用户列表
	realTimePrice: null,       //实时价格
}


const mutations = {
    //设置抢购列表
	SET_GOODS_LIST(state, data){
		state.goodsListData = data
	},

	//设置抢购详情
	SET_GOODS_DETAIL(state, data){
		state.goodsDataDetail = data
	},

	//设置抢购状态
	SET_GAME_STATE(state, data){
		state.gameState = data
	},

	//抢购成功弹幕
	SET_BUY_SUCCESS_MEMBER(state, data){
		state.buySuccessMember = data
	},

	//抢购的用户列表
	SET_BUY_MEMBER_LIST(state, data){
		state.buyMemberList = data
		state.buyKing = data[0]
	},

	//猜价的用户列表
	SET_GUESS_PRICE_MEMBER_LIST(state, data){
		state.guessPriceMemberList = data
	},

	//收到某个用户的猜价 通知
	SET_GUESS_NOTICE(state, data){
		state.guessNotice = data
	},

	//实时价格
	SET_REAL_TIME_PRICE(state, data){
		state.realTimePrice = data
	},
}


const actions = {

}

const store = createStore({
	state,
	mutations,
	actions
})

export default store
