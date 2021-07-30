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

	showGuide: false,
	guideStep: 1,
	videoAdvDuration: 0,
	linshi: false,
	currentVideoIndex: 0,            //当前视频

	tomorrowData: [            //明日宝贝
		{
			beginTime: 1627641000000,
			goodsCover: "./索尼85寸液晶电视.png",
			goodsDescription: "索尼85⼨液晶电视",
			goodsName: "索尼电视",
			marketValue: 15999,
			priceDeclineRate: 2000,
			totalGuessAward: 0
		},
		{
			beginTime: 1627642800000,
			goodsCover: "./Dior口红套装.png",
			goodsDescription: "Dior⼝红套装",
			goodsName: "Dior⼝红",
			marketValue: 1299,
			priceDeclineRate: 200,
			totalGuessAward: 0
		},
		{
			beginTime: 1627644600000,
			goodsCover: "./戴森无绳吸尘器V11.png",
			goodsDescription: "戴森⽆绳吸尘器V11",
			goodsName: "戴森⽆绳吸尘器",
			marketValue: 5299,
			priceDeclineRate: 500,
			totalGuessAward: 0
		},
		{
			beginTime: 1627646400000,
			goodsCover: "./戴森无绳吸尘器V11.png",
			goodsDescription: "戴森⽆绳吸尘器V11",
			goodsName: "戴森⽆绳吸尘器",
			marketValue: 5299,
			priceDeclineRate: 500,
			totalGuessAward: 0
		}
	],

	historyGoodsData: [            //竞拍历史
		{
			beginTime: 1626350400000,
			goodsCover: "./索尼85寸液晶电视.png",
			goodsDescription: "索尼85⼨液晶电视",
			goodsName: "索尼电视",
			marketValue: 15999,
			priceDeclineRate: 9800,
			totalGuessAward: 0
		},
		{
			beginTime: 1626436800000,
			goodsCover: "./Dior口红套装.png",
			goodsDescription: "Dior⼝红套装",
			goodsName: "Dior⼝红",
			marketValue: 1299,
			priceDeclineRate: 860,
			totalGuessAward: 0
		},
		{
			beginTime: 1626523200000,
			goodsCover: "./戴森无绳吸尘器V11.png",
			goodsDescription: "戴森⽆绳吸尘器V11",
			goodsName: "戴森⽆绳吸尘器",
			marketValue: 5299,
			priceDeclineRate: 4299,
			totalGuessAward: 0
		},
		{
			beginTime: 1626609600000,
			goodsCover: "./戴森无绳吸尘器V11.png",
			goodsDescription: "戴森⽆绳吸尘器V11",
			goodsName: "戴森⽆绳吸尘器",
			marketValue: 5299,
			priceDeclineRate: 4580,
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
