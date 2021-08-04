<template>
    <!-- 当前宝贝 -->
    <div 
        class="current_goods_content"
        :class="{ hide: beforeContentIsShow() }"
        :style="{ transition: `all .5s ease-in ${showAdvVideo || showCountDown ? '0s' : '.3s'}` }"
    >
        <!-- 未开始 -->
        <div 
            class="content_box clear"
            v-if="(!gameState || gameState==gameStateId.guessPrice || gameState == gameStateId.countDown) && currentGoods"
        >
            <div class="tip text_medium">当前宝贝</div>
            <div class="goods_detail">
                <div class="goods_image">
                    <div class="img" :style="{ background: `url(${currentGoods.goodsCover}) center no-repeat`, backgroundSize: '100% 100%' }"></div>
                </div>
                <p class="goods_name text_overflow text_medium">{{ currentGoods.goodsName }}</p>
                <p class="goods_desc text_overflow">{{ currentGoods.goodsDescription }}</p>
            </div>
            <div class="goods_price_wrap">
                <div class="real_price text_medium">
                    <span class="int">￥{{ priceFormat(currentGoods.marketValue).int }}</span>
                    <span class="decimals">{{ priceFormat(currentGoods.marketValue).decimals }}</span>
                    <span class="price_text_qi">起</span>
                </div>
                <div class="price_down_wrap text_medium">   
                    <img src="../images/light_blue.png" class="light">
                    <div class="text_wrap">
                        <p class="down_text">每分钟<span>直降</span></p>
                        <p class="down_price">￥{{ priceFormat(currentGoods.priceDeclineRate).int }}<span class="decimals">{{ priceFormat(currentGoods.priceDeclineRate).decimals }}</span></p>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- 抢购中 -->
    <div 
        class="current_goods_content"
        :class="{ hide: panicBuyContentIsShow() }"
        :style="{ transition: `all .5s ease-in ${showAdvVideo || gameState== gameStateId.panicBuyIng ? '0s' : '.3s'}` }"
    >
        <div 
            class="content_box buy_in clear"
            v-if="gameState == gameStateId.panicBuyIng"
        >
            <panic-buy :data="currentGoods"></panic-buy>
        </div>
    </div>

    <!-- 抢购结束 -->
    <div 
        class="current_goods_content"
        :class="{ hide: panicBuyEndContentIsShow() }"
        :style="{ transition: `all .5s ease-in ${showAdvVideo || gameState != gameStateId.panicBuyEnd ? '0s' : '.3s'}` }"
    >
        <!-- 抢购结束 -->
        <buy-end :data="currentGoods" v-if="gameState == gameStateId.panicBuyEnd"></buy-end>

    </div>

    <!-- 抢购排行榜 -->
    <div 
        class="current_goods_content"
        :class="{ hide: panicBuyRankContentIsShow() }"
        :style="{ transition: `all .5s ease-in ${showAdvVideo || gameState != gameStateId.panicBuyEnd ? '0s' : '.3s'}` }"
    >

        <rank :data="currentGoods" v-if="gameState == gameStateId.panicBuyEnd && !showTomorrowGoods"></rank>

    </div>

    <!-- 视频广告 -->
    <video-adv v-if="!showCountDown"></video-adv>

    <!-- 游戏教学 -->
    <guide></guide>

    <!-- 底部 -->
    <bottom-info v-show="!showCountDown"></bottom-info>

    <!-- 抢购成功  弹幕 -->
    <buy-success-member v-if="gameState == gameStateId.panicBuyIng || gameState == gameStateId.panicBuyEnd"></buy-success-member>

</template>

<script>
import { reactive, toRefs, computed, onMounted } from 'vue'
import VideoAdv from '../components/VideoAdv.vue'
import BottomInfo from '../components/Bottom.vue'
import BuySuccessMember from '../components/BuySuccessMember.vue'

import PanicBuy from '../components/PanicBuy.vue'
import BuyEnd from '../components/BuyEnd.vue'
import Rank from '../components/Rank.vue'
import Guide from '../components/Guide.vue'

import { useStore } from 'vuex'
import { priceFormat, gameStateId } from '../util/index'

export default {
    setup(props) {
        const store = useStore()

        //是否显示视频
        const showAdvVideo = computed(() => {
            return store.state.showAdvVideo
        })

        //是否显示游戏教学
        const showGuide = computed(() => {
            return store.state.showGuide
        })

        //游戏状态
        const gameState = computed(() => {
            return store.state.gameState
        })

        //是否显示倒计时
        const showCountDown = computed(() => {
            return store.state.showCountDown
        })

        //当前宝贝
        const currentGoods = computed(() => {
            return store.state.goodsListData[store.state.currentGoodsIndex]
        }) 

        //抢购结束  显示抢购排行榜
        const showRankList = computed(() => {
            return store.state.showRankList
        })

        onMounted(() => {
            let { bottom , height } = document.getElementsByClassName('current_goods_content')[0].getBoundingClientRect()
            if((bottom - height) < 200){
                let content = document.getElementsByClassName('current_goods_content')
                
                for(let i = 0; i < content.length; i++){
                    document.getElementsByClassName('current_goods_content')[i].style.top = `calc(50% - 100px)`
                }
                
            }
        })

        //未开始
        const beforeContentIsShow = () => {
            return state.showAdvVideo || state.showGuide ||  state.showCountDown || (state.gameState && state.gameState!=1 && state.gameState != gameStateId.countDown)
        }
        
        //抢购中
        const panicBuyContentIsShow = () => {
            return state.showAdvVideo || state.showCountDown || (state.gameState != gameStateId.panicBuyIng)
        }

        //抢购结束
        const panicBuyEndContentIsShow = () => {
            return state.showAdvVideo || state.gameState != gameStateId.panicBuyEnd || state.showRankList || state.showTomorrowGoods
        }

        //抢购排行榜
        const panicBuyRankContentIsShow = () => {
            return state.showAdvVideo || !state.showRankList || state.showTomorrowGoods
        }

        const state = reactive({
            showAdvVideo,
            showGuide,
            gameState,
            showCountDown,
            currentGoods,
            priceFormat,
            gameStateId,
            showRankList,
            beforeContentIsShow,
            panicBuyContentIsShow,
            panicBuyEndContentIsShow,
            panicBuyRankContentIsShow
        })

        return toRefs(state)
    },
    components: {
        VideoAdv,
        BottomInfo,
        BuySuccessMember,
        PanicBuy,
        BuyEnd,
        Rank,
        Guide
    }
}


</script>

<style lang="less" scope>
    .current_goods_content{
        margin: 116px 58px 0 -20px;
        height: 704px;
        background: url('../images/content_card.png') center no-repeat;
        background-size: 100% 100%;
        position: absolute;
        width: calc(100% - 38px);
        top: 50%;
        margin-top: -352px;
        z-index: 99;
        transition: all .5s ease-in;

        &.hide{
            transform: translate(-120%);
        }

        .content_box{
            padding: 13px 32px 112px 108px;
            display: flex;
            position: relative;
            
            .tip{
                font-size: 40px;
                position: absolute;
                top: 38px;
                left: 108px;
                width: 274px;
                height: 66px;
                line-height: 66px;
                text-align: center;
                color: #fff;
                background: #6b2891;
                border-top-right-radius: 15px;
                border-bottom-right-radius: 15px;
                z-index: 20;
            }


            // 抢购中
            &.buy_in{
                position: relative;
                .goods_detail{
                    .goods_image{
                        display: inline-block;
                        vertical-align: top;
                        animation: goodsImgAnim 5s linear infinite alternate;
                    }
                    .goods_detail_right{
                        display: inline-block;
                        margin-left: 50px;
                        width: 750px;

                        .goods_name{
                            padding-top: 60px;
                            .goods_desc{
                                font-weight: normal;
                                margin-left: 15px;
                            }
                        } 

                        .buy_in_price{
                            font-size: 40px;
                            color: #4A2453;
                            padding-top: 20px;

                            .decimals{
                                font-size: 35px;
                            }
                        }

                        .buy_in_price_down{
                            display: inline-block;
                            margin-top: 15px;
                            font-size: 50px;
                            font-weight: bold;
                            color: #fff;
                            padding: 0 26px;
                            height: 73px;
                            line-height: 73px;
                            background: url('../images/buy_in_price_down.png') center no-repeat;
                            background-size: 100% 100%;

                            span{
                                padding-left: 40px;
                                display: inline-block;
                                width: 400px;
                            }
                        }   
                    }
                }

                .real_price_warp{
                    width: 1407px;
                    height: 241px;
                    line-height: 241px;
                    background: url('../images/price_card_red.png') no-repeat center;
                    background-size: 100% 100%;
                    position: absolute;
                    bottom: 0;
                    right: -32px;
                    border-top-right-radius: 18px;
                    border-bottom-right-radius: 18px;
                    overflow: hidden;

                    .light{
                        height: 100%;
                        position: absolute;
                        left: 0;
                        animation: lightRedAnim 2s ease-out infinite;
                    }

                    .data{
                        text-align: center;
                        font-size: 50px;
                        font-weight: bold;
                        color: #fff;
                        display: flex;
                        align-items: baseline;
                        position: absolute;
                        z-index: 99;
                        
                        .text{
                            padding-left: 100px;
                        }

                        .price_num_wrap{
                            flex: 1;
                        }

                        .price_int{
                            font-size: 170px;
                            padding-left: 50px;
                        }

                        .price_decimals{
                            font-size: 130px;
                        }
                    }

                    &.sell_out_crad{
                        background: url('../images/price_card_gray.png') no-repeat center;
                        text-align: center;
                        
                        .data{
                            font-size: 170px;
                            color: #ccc;
                        }
                    }
                }
            }

            // 抢购结束
            &.buy_end{

                .goods_detail{
                    .goods_image{
                        display: inline-block;
                        vertical-align: top;
                        position: relative;

                        .img{
                            width: 500px;
                            height: 500px;
                        }
                    }
                    .goods_detail_right{
                        display: inline-block;
                        margin-left: 50px;
                        width: 750px;

                        .goods_name{
                            padding-top: 60px;
                            .goods_desc{
                                font-weight: normal;
                                margin-left: 15px;
                            }
                        } 
                    }
                }

                .goods_count{
                    font-size: 60px;
                    color: #fff;
                    font-weight: bold;
                    line-height: 80px;
                }

                .goods_del_price{
                    font-size: 50px;
                    color: #4A2453;
                    text-decoration:line-through;

                    .decimals{
                        font-size: 45px;
                    }
                }


                .real_price_warp{
                    width: 1407px;
                    height: 241px;
                    line-height: 241px;
                    background: url('../images/price_card_yellow.png') no-repeat center;
                    background-size: 100% 100%;
                    position: absolute;
                    bottom: 0;
                    right: -32px;

                    .data{
                        text-align: center;
                        font-size: 50px;
                        font-weight: bold;
                        color: #fff;

                        .price_int{
                            font-size: 170px;
                            padding-left: 50px;
                        }

                        .price_decimals{
                            font-size: 130px;
                        }
                    }
                }
            }

        }

        .goods_detail{
            // width: 540px;
            display: inline-block;
            padding: 0 31px 66px 95px;
            

            .goods_image{
                margin-top: -82px;
                position: relative;

                .img{
                    width: 500px;
                    height: 500px;
                }

                .sell_out{
                    width: 173px;
                    height: 173px;
                    position: absolute;
                    bottom: 120px;
                    right: -20px;
                    z-index: 99;

                    transform-origin: 50% 50%;
                    transform: rotate(-2deg) scale(5);
                    transition: all .3s cubic-bezier(0.6, 0.04, 0.98, 0.335);
                    opacity: 0;

                    &.active{
                        opacity: 1;
                        transform: rotate(-15deg) scale(1);
                    }
                }
            }

            .goods_name{
                font-size: 70px;
                color: #4A2453;
                padding: 30px 0 18px 0;
                font-weight: bold;
            }

            .goods_desc{
                font-size: 40px;
                color: #6A2890;
            }
        }

        .goods_price_wrap{
            // width: 806px;
            padding: 114px 0 58px 0;
            position: relative;
            flex: 1;

            .real_price{
                padding-bottom: 80px;
                color: #4A2453;
                font-weight: bold;
                text-align: center;

                .int{
                    font-size: 100px;
                }

                .decimals{
                    font-size: 80px;
                }

                .price_text_qi{
                    font-size: 40px;
                    margin-left: 30px;
                }

            }

            .price_down_wrap{
                width: 712px;
                height: 300px;
                padding-left: 125px;
                position: absolute;
                background: url('../images/price_down_card.png') center no-repeat;
                background-size: 100% 100%;
                right: -35px;
                font-weight: bold;
                color: #fff;
                overflow: hidden;
                border-top-right-radius: 18px;
                border-bottom-right-radius: 18px;
                
                .light{
                    height: 100%;
                    position: absolute;
                    left: 0;
                    animation: lightBlueAnim 2s ease-out infinite;
                }

                .text_wrap{
                    position: absolute;
                    z-index: 99;
                }

                .down_text{
                    font-size: 80px;
                    padding-top: 25px;
                    z-index: 99;

                    span{
                        font-size: 100px;
                    }
                }

                .down_price{
                    font-size: 150px;
                    padding-top: 20px;

                    .decimals{
                        font-size: 120px;
                    }
                }
            }
        }
    }

    @keyframes lightBlueAnim {
        0%{ transform: translate(0) }
        30%{ transform: translate(35vw) }
        100%{ transform: translate(35vw) }
    }

    @keyframes lightRedAnim {
        0%{ transform: translate(0) }
        50%{ transform: translate(58vw) }
        100%{ transform: translate(58vw) }
    }

    @keyframes goodsImgAnim {
        0% { transform: translate(0, 0) }
        100% { transform: translate(0, -6%) }
    }
</style>