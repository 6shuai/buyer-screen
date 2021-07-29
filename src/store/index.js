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
	showRankList: false,       //抢购结束  显示排行榜
	showAdvVideo: false,          //显示视频广告
	showWarning: false,         //库存不足 警告
	closeWarning: true,
	showTomorrowGoods: false,   //显示明日预告
	showHistryGoods: false,      //显示竞拍历史
	showDanmaku: false,         //显示猜价弹幕

	tomorrowData: [            //明日宝贝
		{
			beginTime: 1626863400000,
			goodsCover: "https://ec.xfengjing.com/picture/2021/06/30/3da039a0-aa74-4c28-a713-753bdd7a3aaf.jpg",
			goodsDescription: "小米手机Ultra",
			goodsName: "小米手机",
			marketValue: 10,
			priceDeclineRate: 6,
			totalGuessAward: 0
		},
		{
			beginTime: 1626865200000,
			goodsCover: "https://ec.xfengjing.com/picture/2021/06/30/3da039a0-aa74-4c28-a713-753bdd7a3aaf.jpg",
			goodsDescription: "小米手机Ultra",
			goodsName: "小米手机",
			marketValue: 10,
			priceDeclineRate: 6,
			totalGuessAward: 0
		},
		{
			beginTime: 1626867000000,
			goodsCover: "https://ec.xfengjing.com/picture/2021/06/30/3da039a0-aa74-4c28-a713-753bdd7a3aaf.jpg",
			goodsDescription: "小米手机Ultra",
			goodsName: "小米手机",
			marketValue: 10,
			priceDeclineRate: 6,
			totalGuessAward: 0
		},
		{
			beginTime: 1626867000000,
			goodsCover: "https://ec.xfengjing.com/picture/2021/06/30/3da039a0-aa74-4c28-a713-753bdd7a3aaf.jpg",
			goodsDescription: "小米手机Ultra",
			goodsName: "小米手机",
			marketValue: 10,
			priceDeclineRate: 6,
			totalGuessAward: 0
		}
	],

	historyGoodsData: [            //竞拍历史
		{
			beginTime: 1626350400000,
			goodsCover: "https://ec.xfengjing.com/picture/2021/06/30/3da039a0-aa74-4c28-a713-753bdd7a3aaf.jpg",
			goodsDescription: "小米手机Ultra",
			goodsName: "小米手机",
			marketValue: 3999,
			priceDeclineRate: 2450,
			totalGuessAward: 0
		},
		{
			beginTime: 1626436800000,
			goodsCover: "https://ec.xfengjing.com/picture/2021/06/30/3da039a0-aa74-4c28-a713-753bdd7a3aaf.jpg",
			goodsDescription: "小米手机Ultra",
			goodsName: "小米手机",
			marketValue: 3999,
			priceDeclineRate: 2605,
			totalGuessAward: 0
		},
		{
			beginTime: 1626523200000,
			goodsCover: "https://ec.xfengjing.com/picture/2021/06/30/3da039a0-aa74-4c28-a713-753bdd7a3aaf.jpg",
			goodsDescription: "小米手机Ultra",
			goodsName: "小米手机",
			marketValue: 3999,
			priceDeclineRate: 2846,
			totalGuessAward: 0
		},
		{
			beginTime: 1626609600000,
			goodsCover: "https://ec.xfengjing.com/picture/2021/06/30/3da039a0-aa74-4c28-a713-753bdd7a3aaf.jpg",
			goodsDescription: "小米手机Ultra",
			goodsName: "小米手机",
			marketValue: 3999,
			priceDeclineRate: 2556,
			totalGuessAward: 0
		}
	],

}


const mutations = {
    //设置抢购列表
	SET_GOODS_LIST(state, data){
		state.goodsListData = data
	},

	//设置抢购详情
	SET_GOODS_DETAIL(state, data){
		state.goodsDataDetail = data
		state.gameState = data.gameStateId
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

	//库存不足 警告
	SET_SHOW_WRRNING(state, data){
		state.showWarning = data
		state.closeWarning = false
	}

}


const actions = {

}

const store = createStore({
	state,
	mutations,
	actions
})

export default store
