
import { reactive, toRefs, computed, watch } from "vue"
import { socketId } from '../util/socketId'
import { useStore } from 'vuex'

export default function () {
    
    const store = useStore()

    //初始化websocket
    const initWebsocket = () => {
        closeSocket();
        const wsuri = 'wss://nbb.xfengjing.com/wss/';
        state.websock = new WebSocket(wsuri);

        state.websock.onopen = function (event) {
            websocketopen(event);
        };

        state.websock.onmessage = function (event) {
            websocketonmessage(event);
        };

        state.websock.onerror = function (event) {
            websocketerror(event);
        };

        state.websock.onclose = function (event) {
            websocketclose(event);
        };
    }


    //websocket连接成功
    const websocketopen = data => {
        clearInterval(state.reconnectionTimer)
        heartBeat();
        login();
    }

    //socket 发送消息
    const websocketSendData = data =>{
        try {
            state.websock.send(JSON.stringify(data));
        } catch (error) {
            console.log(data)
        }
    }
    
    //socket 收到消息
    const websocketonmessage = event => { 
        if(!event || !event.data) return
        let data = JSON.parse(event.data);
        let code = data.id

        console.log('收到消息 ------->', data)

        switch (code) {
            //心跳回应
            case socketId.HeartbeatPong:
                setPongTime()
                break;
            // 抢购列表
            case socketId.ScreenAuctionListNotice:
                // store.commit('SET_GOODS_LIST', data.auctionList)
                console.log(getQueryString('id'))
                if(getQueryString('id') == 22){
                    store.commit('SET_GOODS_LIST', [{
                        beginTime: 1627642800000,
                        goodsCover: "https://static.xfengjing.com/picture/2021/07/30/99312731-4922-49c5-903e-ef7062c48a89.png",
                        goodsDescription: "红蓝续航增强版",
                        goodsName: "任天堂Switch",
                        marketValue: 2099,
                        priceDeclineRate: 100,
                        totalGuessAward: 0
                    }])
                }else{
                    store.commit('SET_GOODS_LIST', [{
                        beginTime: 1627644600000,
                        goodsCover: "https://static.xfengjing.com/picture/2021/07/31/ad6d9432-74a9-4c47-befc-dc66e557d3ba.png",
                        goodsDescription: "HD08 中国红",
                        goodsName: "戴森吹风机",
                        marketValue: 3190,
                        priceDeclineRate: 200,
                        totalGuessAward: 0
                    }]
                )
                }
                test()
                break;
            // 抢购详情
            case socketId.GoodsDataDetail:
                store.commit('SET_GOODS_DETAIL', data)
                break;
            // 抢购状态
            case socketId.GameStateChangeNotice:
                store.commit('SET_GAME_STATE', data.gameState)
                break;
            //猜价通知  某个已猜价的用户
                case socketId.GuessNotice:
                store.commit('SET_GUESS_NOTICE', data)
                break;
            // 弹幕显示  抢购成功的用户 
            case socketId.BoughtSuccessfulNotice:
                store.commit('SET_BUY_SUCCESS_MEMBER', data.info)
                //显示库存预警
                if(!store.state.closeWarning) store.commit('SET_SHOW_WRRNING', true)
                break;
            //已购买的用户列表  抢购结束后 结算页展示
            case socketId.BidResultNotice:         
                store.commit('SET_GAME_STATE', 4)
                store.commit('SET_BUY_MEMBER_LIST', data.result)
                store.state.showWarning = false
                break;
            //已猜价的用户列表  抢购结束后 结算页展示
            case socketId.GuessResultNotice:   
                store.commit('SET_GUESS_PRICE_MEMBER_LIST', data.result)
                break;

            //预览 返回
            case socketId.PreviewResponse:
                // store.commit('SET_PREVIEW_ID', data.auctionId)
                break;

            //库存预警, 显示3秒后消失,然后直到下一个用户抢购成功再次触发
            case socketId.InventoryForewarnNotice:
                store.commit('SET_SHOW_WRRNING', true)
                break;
            //用户参加抢购通知  实时热度
            case socketId.ParticipateAuctionNotice:
                store.commit('SET_MEMBER_LIST', data)
                break;
            default:
                break;
        }
        
    }

    //websocket关闭
    const websocketclose = event => {
        state.reconnectionIng = false;
        reconnection();
    }

    //websocket连接失败
    const websocketerror = event => {  
        state.reconnectionIng = false;
        reconnection();
    }

    const closeSocket = () => {
        try {
            state.websock.close();
        } catch (error) {
            
        }
    }
    
    //websocket断线重连  10秒重连一次
    const reconnection = () => {
        clearInterval(state.reconnectionTimer)
        state.pongTime = undefined;

        state.connectNumber += 1;
        if(state.reconnectionIng) return;
        state.reconnectionIng = true;
        if(state.connectNumber > state.maxConnectNumber){
            return false;
        }

        state.reconnectionTimer = setInterval(() => {
            initWebsocket();
            state.reconnectionIng = false;
        }, 10000);
    }

    //websocket心跳  10秒一次
    const heartBeat = () => {
        clearTimeout(state.heartBeatTimer)
        let date = new Date().getTime();
        if(state.pongTime && ((date - state.pongTime) / 1000) > state.overtime){
            console.log('连接超时')
            websocketclose();
        }
        
        websocketSendData({
            id: socketId.HeartbeatPing
        });

        state.heartBeatTimer = setTimeout(() => {
            heartBeat();
        }, 10000);
    }

    //心跳回应时间
    const setPongTime = () => {
        state.pongTime = new Date().getTime();
    }

    //屏幕端 连接登录请求  获取游戏基本信息请求
    const login = () => {
        let data = {
            "id": socketId.ScreenLoginRequest,
            "screenId": 29,
        }
        websocketSendData(data);
    }


    const state = reactive({
        websock: null,
        heartBeatTimer: undefined,     //发送心跳定时器
        reconnectionTimer: undefined,  //重连定时器
        connectNumber: 0,             //断线重连次数
        maxConnectNumber: 360,         //最大重连次数
        pongTime: undefined,          //心跳收到回复 时间
        reconnectionIng: false,
        overtime: 30,                //超时时间
        initWebsocket,
        websocketSendData
    })

    const getQueryString = (name) => {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }


    const test = () => {
        
        //预览
        setTimeout(() => {
            let data = {
                id: socketId.Preview,
                auctionId: getQueryString('id') || 22
            }
            websocketSendData(data);
        }, 20 * 1000);
        return

        setTimeout(() => {
            


            setTimeout(() => {
                
                store.commit('SET_GOODS_DETAIL', {
                    "auctionId":675026,
                    "beginTime":1624944864000,
                    "countdown":10,
                    "currentPrice":2099,
                    "depositRatio":2,
                    "gameStateId":0,
                    "getGameStateTimer":9,
                    "goods":{
                        "cover":"https://quiz.xfengjing.com/picture/2021/06/09/7881b66d-d556-4f21-8dd1-a3124e56be0a.jpeg",
                        "description":"小米电视大师",
                        "displayName":"小米电视",
                        "id":5,
                        "showPicture":"https://quiz.xfengjing.com/picture/2021/06/16/3012d5a2-f0d0-4fec-8ff4-2856541824d6.jpg",
                        "skuId":7,
                        "video":[{"id":11,"url":"https://static.xfengjing.com/video/2021/07/30/5b5be1a9-8ee9-4a9b-975c-0780b4d38d01.mp4","usage":2, duration: 15},
                        {"id":12,"url":"https://static.xfengjing.com/video/2021/07/30/b78fdc33-1bd7-422f-852f-1c10973919e8.mp4","usage":2, duration: 15}]
                    },
                    "guessRules":[{"award":30.0,"correctDigit":3,"id":13},{"award":20.0,"correctDigit":2,"id":12},{"award":10.0,"correctDigit":1,"id":11}],
                    "guessTime":20,
                    "id":7005,
                    "marketValue":2099,
                    "orderExpiration":30,
                    "paymentMethod":1,
                    "pickUpAddresses":[{"address":"酷乐潮玩  上海市宝山区  宝山龙湖天街B1-104号","deliverType":1,"id":35,"placeId":15}],
                    "preheatTime":30,
                    "priceDecline": 0.16666666666666666,
                    "priceDeclineFrequency": 0.1,
                    "priceDeclineRate": 100
                })

                setTimeout(() => {
                    store.commit('SET_GAME_STATE', 0)
                }, 200);

                setTimeout(() => {
                    store.commit('SET_GAME_STATE', 1)

    



                    setTimeout(() => {
                        store.commit('SET_GAME_STATE', 3)
                        store.state.showCountDown = false

                        // return


                        setTimeout(() => {
                            store.commit('SET_GAME_STATE', 4)
                            store.commit('SET_BUY_MEMBER_LIST', [{"avatar":"999.jpg","nickName":"小钱","price":3.0},{"avatar":"555.jpg","nickName":"小王","price":3.1},{"avatar":"333.jpg","nickName":"小花","price":3.2},{"avatar":"888.jpg","nickName":"小赵","price":3.5},{"avatar":"111.jpg","nickName":"小红","price":3.6},{"avatar":"444.jpg","nickName":"小翠","price":3.7},{"avatar":"777.jpg","nickName":"小韩","price":3.8},{"avatar":"1100.jpg","nickName":"随便","price":3.9},{"avatar":"1000.jpg","nickName":"小王八","price":4.0},{"avatar":"222.jpg","nickName":"小吕","price":4.3}, 
                            {"avatar":"999.jpg","nickName":"小钱","price":3.0},{"avatar":"555.jpg","nickName":"小王","price":3.1},{"avatar":"333.jpg","nickName":"小花","price":3.2},{"avatar":"888.jpg","nickName":"小赵","price":3.5},{"avatar":"111.jpg","nickName":"小红","price":3.6},{"avatar":"444.jpg","nickName":"小翠","price":3.7},{"avatar":"777.jpg","nickName":"小韩","price":3.8},{"avatar":"1100.jpg","nickName":"随便","price":3.9},{"avatar":"1000.jpg","nickName":"小王八","price":4.0},{"avatar":"222.jpg","nickName":"小吕","price":4.3},
                            {"avatar":"999.jpg","nickName":"小钱","price":3.0},{"avatar":"555.jpg","nickName":"小王","price":3.1},{"avatar":"333.jpg","nickName":"小花","price":3.2},{"avatar":"888.jpg","nickName":"小赵","price":3.5},{"avatar":"111.jpg","nickName":"小红","price":3.6},{"avatar":"444.jpg","nickName":"小翠","price":3.7},{"avatar":"777.jpg","nickName":"小韩","price":3.8},{"avatar":"1100.jpg","nickName":"随便","price":3.9},{"avatar":"1000.jpg","nickName":"小王八","price":4.0},{"avatar":"222.jpg","nickName":"小吕","price":4.3}
                            ])

                            store.commit('SET_GUESS_PRICE_MEMBER_LIST', [
                                {
                                    nickName: '王钢蛋', // 抢购的人的名字
                                    avatar: 'https://ec.xfengjing.com/picture/2020/12/09/804e982b-a0ce-4e0b-bfac-845c910b7d20.png',// 头像
                                    correctDigit: '2', // 猜中位数
                                    award: '12.3' // 获得奖金
                                },
                                {
                                    nickName: '刘海柱', // 抢购的人的名字
                                    avatar: 'https://ec.xfengjing.com/picture/2020/12/09/804e982b-a0ce-4e0b-bfac-845c910b7d20.png',// 头像
                                    correctDigit: '4', // 猜中位数
                                    award: '35.45' // 获得奖金
                                }
                            ])

                            setTimeout(() => {
                                store.commit('SET_BUY_SUCCESS_MEMBER', {
                                    nickName: '马冬梅',
                                    avatar: 'https://ec.xfengjing.com/picture/2020/12/09/804e982b-a0ce-4e0b-bfac-845c910b7d20.png',// 头像
                                    price: '56.78'// 买下的金额
    
                                })
                                setTimeout(() => {
                                    store.commit('SET_BUY_SUCCESS_MEMBER', {
                                        nickName: '哈哈哈',
                                        avatar: 'https://ec.xfengjing.com/picture/2020/12/09/804e982b-a0ce-4e0b-bfac-845c910b7d20.png',// 头像
                                        price: '56.78'// 买下的金额
        
                                    })
                                    setTimeout(() => {
                                        store.commit('SET_BUY_SUCCESS_MEMBER', {
                                            nickName: '哈哈哈2',
                                            avatar: 'https://ec.xfengjing.com/picture/2020/12/09/804e982b-a0ce-4e0b-bfac-845c910b7d20.png',// 头像
                                            price: '56.78'// 买下的金额
            
                                        })
                                    }, 3000);
                                    setTimeout(() => {
                                        store.commit('SET_BUY_SUCCESS_MEMBER', {
                                            nickName: '哈哈哈3',
                                            avatar: 'https://ec.xfengjing.com/picture/2020/12/09/804e982b-a0ce-4e0b-bfac-845c910b7d20.png',// 头像
                                            price: '56.78'// 买下的金额
            
                                        })
                                    }, 3000);
                                    setTimeout(() => {
                                        store.commit('SET_BUY_SUCCESS_MEMBER', {
                                            nickName: '哈哈哈4',
                                            avatar: 'https://ec.xfengjing.com/picture/2020/12/09/804e982b-a0ce-4e0b-bfac-845c910b7d20.png',// 头像
                                            price: '56.78'// 买下的金额
            
                                        })
                                    }, 3000);
                                    setTimeout(() => {
                                        store.commit('SET_BUY_SUCCESS_MEMBER', {
                                            nickName: '哈哈哈5',
                                            avatar: 'https://ec.xfengjing.com/picture/2020/12/09/804e982b-a0ce-4e0b-bfac-845c910b7d20.png',// 头像
                                            price: '56.78'// 买下的金额
            
                                        })
                                    }, 3000);
                                }, 1000);
    
    
                                setTimeout(() => {
                                    store.state.showTomorrowGoods = true
                                    store.state.showAdvVideo = true
                                }, 40000);
    
                            }, 2000);

                        }, 60 * 1000);

                        


                    }, 30 * 1000);

                }, 30 * 1000);

            }, 2 * 1000)


        }, 1000);
        
    }
    

    return toRefs(state)
}