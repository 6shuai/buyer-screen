<template>
    <div 
        class="goods_list_wrap"
        :class="{ 'hideLeft': showCountDown }"
        :style="{ transition: `all .3s ease-in ${ !showCountDown ? '0s' : '.5s'}` }"
    >

        <!-- 当前宝贝 -->
        <div 
            v-if="!showTomorrowGoods"
            class="current_goods_box"
            :class="currentGoodsIsShow() ? 'current_goods_card_anim_show' : 'current_goods_card_anim_hide' "
        >
            <div 
                class="current_goods_wrap"
            >
                <div class="title_card current_goods_title_card text_medium">{{ gameState == gameStateId.panicBuyEnd ? '抢购结束' : '当前宝贝' }}</div>
                <div 
                    class="goods_detail buy_end" 
                    :class="gameState == gameStateId.panicBuyIng ? 'real_time' : ''"
                    v-if="currentGoods">
                    <div class="goods_detail_top">
                        <div class="goods_img" :style="{ background: `url(${currentGoods.goodsCover}) center no-repeat`, backgroundSize: '100% 100%' }">
                            <img 
                                v-show="gameState == gameStateId.panicBuyEnd && showAdvVideo"
                                src="../images/sell_out.png" 
                                class="sell_out_img"
                            >
                        </div>
                        <p class="goods_name">{{ currentGoods.goodsName }}</p>
                        <p class="goods_desc">{{ currentGoods.goodsDescription }}</p>
                    </div>

                    <div class="goods_detail_bottom text_medium" v-if="!gameState || gameState < gameStateId.panicBuyIng">
                        <div class="price_start">
                            <span class="int">￥{{ priceFormat(currentGoods.marketValue).int }}</span>
                            <span class="decimals">{{ priceFormat(currentGoods.marketValue).decimals }}</span>
                            <span class="price_text_qi">起</span>
                        </div>
                        <p class="price_down_text">每分钟直降</p>
                        <div class="price">
                            <span class="int">￥{{ priceFormat(currentGoods.priceDeclineRate).int }}</span>
                            <span class="decimals">{{ priceFormat(currentGoods.priceDeclineRate).decimals }}</span>
                        </div>
                    </div>

                    <!-- 抢购中 实时价格 -->
                    <div class="goods_detail_bottom real_time_price text_medium" v-if="gameState == gameStateId.panicBuyIng">
                        <img src="../images/light_red.png" class="light">
                        <div class="real_time_content">
                            <p class="real_time_text">实时价格</p>
                            <div class="price" v-if="realTimePrice">
                                <span class="int">
                                    <span>￥</span>
                                    <span 
                                        v-for="(item, index) in priceFormat(realTimePrice).int" 
                                        :key="index"
                                        :class="{ number_int: item != ',' }"
                                    >
                                        {{ item }}
                                    </span>
                                </span>
                                <span class="decimals">
                                    <span 
                                        v-for="(item, index) in priceFormat(realTimePrice).decimals" 
                                        :key="index"
                                        :class="{ number_decimals: item != '.' }"
                                    >
                                        {{ item }}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- 抢购结束 -->
                    <div class="goods_detail_bottom end text_medium" v-if="gameState == gameStateId.panicBuyEnd">
                        <p class="goods_count">宝贝库存: 23</p>
                        <p class="price_text">极限秒杀价</p>
                        <div class="del_price">
                            <span class="int">￥{{ priceFormat(currentGoods.marketValue).int }}</span>
                            <span class="decimals">{{ priceFormat(currentGoods.marketValue).decimals }}</span>
                        </div>
                        <div class="price">
                            <span class="int">￥{{ priceFormat(buyKing.price).int }}</span>
                            <span class="decimals">{{ priceFormat(buyKing.price).decimals }}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>


        <!-- 即将开始  class  put_away  收起-->
        <div 
            class="goods_list"
            :class="{ put_away: currentGoodsIsShow() }"
            v-if="goodsList.length && !showTomorrowGoods"
        >
            <div class="title_card text_medium">即将开始</div>
            <div class="goods_item" 
                v-for="(item, index) in goodsList"
                v-show="!item.hide"
                :key="index"
            >
                <div class="goods_info">
                    <div class="goods_img" :style="{ background: `url(${item.goodsCover}) center no-repeat`, backgroundSize: '100% 100%' }"></div>
                    <div class="info text_overflow">
                        <p class="time">{{ formatTime(item.beginTime) }}</p>
                        <p class="goods_name">{{ item.goodsName }}</p>
                    </div>
                </div>
                
                <div class="goods_bottom text_medium">
                    <div class="price">
                        <span class="int">￥{{ priceFormat(item.marketValue).int }}</span>
                        <span class="decimals">{{ priceFormat(item.marketValue).decimals }}</span>
                        <span class="price_text_qi">起</span>
                    </div>
                    <p class="down_text">每分钟直降</p>
                    <div class="down_price">
                        <span class="int">￥{{ priceFormat(item.priceDeclineRate).int }}</span>
                        <span class="decimals">{{ priceFormat(item.priceDeclineRate).decimals }}</span>
                    </div>
                </div>

            </div>
        </div>

        <!-- 明日宝贝 -->
        <div 
            class="goods_list tomorrow_list"
            v-if="showTomorrowGoods && tomorrowData.length && !showHistryGoods"
        >
            <div class="title_card text_medium">明日宝贝</div>
            <div 
                class="goods_item" 
                v-for="(item, index) in tomorrowData" 
                :key="index"
                :style="{ animation: `tomorrow_item_anim_${index} .5s ease-in ${index * 0.3}s both` }"
            >
                <div class="goods_info">
                    <div class="goods_img" :style="{ background: `url(${item.goodsCover}) center no-repeat`, backgroundSize: '100% 100%' }"></div>
                    <div class="info text_overflow">
                        <p class="time">明日 {{ formatTime(item.beginTime) }}</p>
                        <p class="goods_name">{{ item.goodsName }}</p>
                    </div>
                </div>
                
                <div class="goods_bottom text_medium">
                    <div class="price">
                        <span class="int">￥{{ priceFormat(item.marketValue).int }}</span>
                        <span class="decimals">{{ priceFormat(item.marketValue).decimals }}</span>
                        <span class="price_text_qi">起</span>
                    </div>
                    <p class="down_text">每分钟直降</p>
                    <div class="down_price">
                        <span class="int">￥{{ priceFormat(item.priceDeclineRate).int }}</span>
                        <span class="decimals">{{ priceFormat(item.priceDeclineRate).decimals }}</span>
                    </div>
                </div>

            </div>
        </div>

        <!-- 竞拍历史 -->
        <div 
            class="goods_list tomorrow_list history"
            v-if="showHistryGoods"
        >
            <div class="title_card text_medium">竞拍历史</div>
            <div 
                class="goods_item" 
                v-for="(item, index) in historyGoodsData" 
                :key="index"
                :style="{ animation: `tomorrow_item_anim_${index} .5s ease-in ${index * 0.3}s both` }"
            >
                <div class="goods_info">
                    <div class="goods_img" :style="{ background: `url(${item.goodsCover}) center no-repeat`, backgroundSize: '100% 100%' }"></div>
                    <div class="info text_overflow">
                        <p class="time">{{ formatTime(item.beginTime, true) }}</p>
                        <p class="goods_name">{{ item.goodsName }}</p>
                    </div>
                </div>
                
                <div class="goods_bottom text_medium">
                    <p class="price">极限秒杀价</p>
                    <div class="del_price">
                        <span class="int">￥{{ priceFormat(item.marketValue).int }}</span>
                        <span class="decimals">{{ priceFormat(item.marketValue).decimals }}</span>
                    </div>
                    <div class="down_price">
                        <span class="int">￥{{ priceFormat(item.priceDeclineRate).int }}</span>
                        <span class="decimals">{{ priceFormat(item.priceDeclineRate).decimals }}</span>
                    </div>
                </div>

            </div>
        </div>


    </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { formatTime, priceFormat, screenSize, gameStateId } from '../util/index'
import { useStore } from 'vuex'
export default {
    setup(props){
        const store = useStore()

        //抢购状态
        const gameState = computed(() => {
            return store.state.gameState
        })

        //倒计时
        const showCountDown = computed(() => {
            return store.state.showCountDown
        })

        //是否显示视频
        const showAdvVideo = computed(() => {
            return store.state.showAdvVideo
        })

        //是否显示教学
        const showGuide = computed(() => {
            return store.state.showGuide
        })

        //是否显示抢购结束
        const showRankList = computed(() => {
            return store.state.showRankList
        })

        //当前宝贝
        const currentGoods = computed(() => {
            return store.state.goodsListData[store.state.currentGoodsIndex]
        }) 

        //抢购详情
        const goodsDataDetail = computed(() => {
            return store.state.goodsDataDetail
        })

        //实时价格
        const realTimePrice = computed(() => {
            return store.state.realTimePrice
        })

        //极限秒杀价
        const buyKing = computed(() => {
            return store.state.buyKing
        })

        //即将开始的 抢购列表
        const goodsList = computed(() => {
            return store.state.goodsListData
        })

        //抢购结束  显示明日宝贝
        const showTomorrowGoods = computed(() => {
            return store.state.showTomorrowGoods
        })
    
        //明日宝贝
        const tomorrowData = computed(() => {
            let data = JSON.parse(JSON.stringify(store.state.tomorrowData))
            if(screenSize()){
                data.splice(3, 1)
            }
            return data
        })

        //竞拍历史
        const historyGoodsData = computed(() => {
            let data = JSON.parse(JSON.stringify(store.state.historyGoodsData))
            if(screenSize()){
                data.splice(3, 1)
            }
            return data
        })

        //是否显示竞拍历史
        const showHistryGoods = computed(() => {
            return store.state.showHistryGoods
        })

        //当前宝贝 是否可显示   (显示当前宝贝  即将开始列表折叠)
        const currentGoodsIsShow = () => {
            return state.showAdvVideo || state.showGuide || state.showRankList || state.showCountDown
        }

        const state = reactive({
            goodsList,
            currentGoods,
            formatTime,
            priceFormat,
            gameStateId,
            showCountDown,
            gameState,
            showRankList,
            showAdvVideo,
            showGuide,
            realTimePrice,
            goodsDataDetail,
            buyKing,
            showTomorrowGoods,
            tomorrowData,
            historyGoodsData,
            showHistryGoods,
            currentGoodsIsShow
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .goods_list_wrap{
        height: 100%;
        padding: 0 45px;
        overflow: hidden;
        background: url("../images/sidebar_left.png") no-repeat center;
		background-size: 100% 100%;
        transition: all .3s ease-in .5s;

        &.hideLeft{
            transform: translate(-100%);
        }

        .current_goods_wrap{
            margin-top: 66px;
            position: relative;
        }

        .price_text_qi{
            padding-left: 5px;
        }
        
        .title_card{
            font-size: 40px;
            width: 226px;
            line-height: 62px;
            text-align: center;
            font-weight: bold;
            border-radius: 12px;
            color: #fff;
            margin: 0 auto;
            background: #6b2891;
            margin-top: 26px;

            &.current_goods_title_card{
                position: absolute;
                top: -70px;
                left: 0;
                right: 0;
            }
        }

        .goods_list{
            height: 100%;
            transition: all .3s ease-in;
    
            .goods_item{
                margin: 15px 0;
                width: 100%;
                height: 296px;
                min-height: 296px;
                background: url('../images/goods_card_01.png') no-repeat center;
                background-size: 100% 100%;
                border-radius: 10px;
                overflow: hidden;
                transition: all .3s ease-in;
                
                &.mini{
                    animation: goodsItemAnim 1s ease-in both;
                }
    
                &:last-child{
                    margin-bottom: 34px !important;
                }
                
                .goods_info{
                    width: 100%;
                    height: 120px;
                    display: flex;
    
                    .goods_img{
                        width: 75px;
                        height: 75px;
                        display: inline-block;
                        margin: 25px 15px;
                        vertical-align: top
                    }
    
                    .info{
                        display: inline-block;
                        // width: 240px;
                        padding-top: 30px;
    
                        .time{
                            font-size: 30px;
                            color: #4a2453;
                        }
    
                        .goods_name{
                            color: #fff;
                            font-size: 30px;
                            padding-top: 10px;
                        }
                    }
                }
    
                .goods_bottom{
                    text-align: center;
                    font-weight: bold;
                    transition: all .3s ease-in;
    
                    .price{
                        font-size: 35px;
                        color: #4a2453;
                        padding: 15px 0 25px 0;

                        .decimals, .price_text_qi{
                            font-size: 30px;
                        }
                    }
    
                    .down_text{
                        color: #fff;
                        font-size: 30px;
                    }
    
                    .down_price{
                        font-size: 50px;
                        color: #fff;
                        padding-top: 8px;

                        .decimals{
                            font-size: 40px;
                        }
                    }
                }
            }
    
    
            &.put_away{
                height: calc(100% - 646px);
                justify-content: flex-end;
                overflow: hidden;
                .title_card{
                    margin-bottom:2px;
                }
                .goods_item{
                    height: 96px;
                    min-height: 96px;
                    background: url('../images/put_away.png') no-repeat top;
                    background-size: 100% 100%;
                    overflow: hidden;
                    margin: 4px 0;
    
                    .goods_info{
                        width: 100%;
                        height: 96px;
                        display: flex;
    
                        .goods_img{
                            width: 75px;
                            height: 75px;
                            display: inline-block;
                            margin: 12px 10px;
                            vertical-align: top
                        }
    
                        .info{
                            display: inline-block;
                            // width: 240px;
                            margin-left: 10px;
                            padding-top: 10px;
    
                            .time{
                                font-size: 30px;
                                color: #4a2453;
                            }
    
                            .goods_name{
                                color: #fff;
                                font-size: 30px;
                                padding-top: 10px;
                            }
                        }
                    }
    
                    .goods_bottom{
                        opacity: 0;
                    }
                }
            }
    
            @keyframes currentGoodsCardAnimHide {
                0% {transform: translate(0)}
                90% {transform: translate(calc(100% + 45px)); height: 643px;}
                100% {height: 0;}
            }
    
            @keyframes currentGoodsCardAnimShow {
                0% {transform: translate(calc(100% + 45px))}
                100% {transform: translate(0)}
            }
            
    
            &.tomorrow_list{
                display:flex;
                flex-flow: column;
                .goods_item{
                    background: url('../images/goods_card_02.png') no-repeat center;
                    background-size: 100% 100%;
                }
    
    
                @keyframes tomorrow_item_anim_0 {
                    0% {
                        transform: translate(100vw);
                    }
                    100% {
                        transform: translate(0);
                    }
                }
                @keyframes tomorrow_item_anim_1 {
                    0% {
                        transform: translate(100vw);
                    }
                    100% {
                        transform: translate(0);
                    }
                }
                @keyframes tomorrow_item_anim_2 {
                    0% {
                        transform: translate(100vw);
                    }
                    100% {
                        transform: translate(0);
                    }
                }
                @keyframes tomorrow_item_anim_3 {
                    0% {
                        transform: translate(100vw);
                    }
                    100% {
                        transform: translate(0);
                    }
                }
            }
    
            &.history{
                .goods_bottom .price{
                    font-size: 35px;
                    color: #4a2453;
                    padding: 15px 0 15px 0;
                }
                .del_price{
                    font-size: 35px;
                    color: #4a2453;
                    text-decoration:line-through;
                    line-height: 40px;
                    font-weight: normal;

                    .decimals{
                        font-size: 30px;
                    }
                }
            }
        }
    
        .current_goods_box{
            height: 0;
            overflow: hidden;
            transition: all .2s;
    
            &.current_goods_card_anim_hide{
                display: block;
                height: 643px;
                animation: currentGoodsCardAnimHide .5s ease-in both;
            }
    
            &.current_goods_card_anim_show{
                display: block;
                height: 643px;
                animation: currentGoodsCardAnimShow .5s ease-in both;
            }
        }
    
    
        .goods_detail{
            height: 577px;
            background: url('../images/current_goods_blue.png') center no-repeat;
            background-size: 100% 100%;
    
            .goods_detail_top{
                height: 364px;
                color: #4a2453;
                text-align: center;
    
                .goods_img{
                    display: inline-block;
                    width: 228px;
                    height: 228px;
                    margin: 20px 0 15px 0;
                    position: relative;
    
                    .sell_out_img{
                        width: 80px;
                        height: 80px;
                        position: absolute;
                        right: -20px;
                        bottom: 20px;
                    }
                }
    
                .goods_name{
                    font-size: 35px;
                    font-weight: bold;
                    line-height: 50px;
                }
    
                .goods_desc{
                    font-size: 30px;
                }
            }
    
            .goods_detail_bottom{
                text-align: center;
    
                .price_start{
                    font-size: 35px;
                    color: #4a2453;
                    line-height: 68px;

                    .decimals, .price_text_qi{
                        font-size: 30px;
                    }
                }
    
                .price_down_text{
                    font-size: 40px;
                    color: #fff;
                    line-height: 70px;
                }
    
                .price{
                    font-size: 60px;
                    color: #fff;

                    .decimals{
                        font-size: 50px;
                    }
                }
            }
    
            // 抢购中   实时价格
            &.real_time{
                background: url('../images/current_goods_red.png') center no-repeat;
                background-size: 100% 100%;
    
                .real_time_text{
                    font-size: 40px;
                    color: #fff;
                    line-height: 110px;
                }
                
                .real_time_price{
                    height: 220px;
                    position: relative;
                    border-bottom-left-radius: 25px;
                    border-bottom-right-radius: 25px;
                    overflow: hidden;

                    .light{
                        height: 100%;
                        position: absolute;
                        left: 0;
                        animation: leftLightRedAnim 2s ease-out infinite;
                    }

                    .real_time_content{
                        position: absolute;
                        width: 100%;
                        z-index: 99;
                    }
                    .price{
                        width: 100%;
                        padding-top: 15px;
                        
                        .int{
                            .number_int{
                                display: inline-block;
                                width: 36px;
                                text-align: center;
                            }
                        }

                        .number_decimals{
                            display: inline-block;
                            width: 28px;
                            text-align: center;
                        }
                    }
                } 
            }
    
            //抢购结束
            &.buy_end{
                .end{
                    .goods_count{
                        font-size: 35px;
                        color: #fff;
                        font-weight: bold;
                        line-height: 50px;
                    }
    
                    .price_text{
                        font-size: 30px;
                        color: #4a2453;
                        font-weight: bold;
                        padding-top: 15px;
                    }
    
                    .del_price{
                        font-size: 35px;
                        color: #4a2453;
                        font-weight: normal;
                        text-decoration:line-through;
                        line-height: 50px;

                        .decimals{
                            font-size: 30px;
                        }
                    }
                }
            }
    
        }
    }

    @keyframes leftLightRedAnim {
        0%{ transform: translate(-10vw) }
        20%{ transform: translate(15vw) }
        100%{ transform: translate(15vw) }
    }
</style>