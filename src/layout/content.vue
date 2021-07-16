<template>
    <!-- 当前宝贝 -->
    <div class="current_goods_content">
        <!-- 未开始 -->
        <div 
            class="content_box clear"
            v-if="(!gameState || gameState==1) && currentGoods"
        >
            <div class="tip">当前宝贝</div>
            <div class="goods_detail">
                <div class="goods_image">
                    <img :src="currentGoods.goodsCover" class="img">
                </div>
                <p class="goods_name text_overflow">{{ currentGoods.goodsName }}</p>
                <p class="goods_desc text_overflow">{{ currentGoods.goodsDescription }}</p>
            </div>
            <div class="goods_price_wrap">
                <div class="real_price">
                    <span class="int">￥{{ priceFormat(currentGoods.marketValue).int }}</span>
                    <span class="decimals">{{ priceFormat(currentGoods.marketValue).decimals }}</span>
                    <span class="price_text_qi">起</span>
                </div>
                <div class="price_down_wrap">   
                    <p class="down_text">每分钟<span>直降</span></p>
                    <p class="down_price">￥{{ priceFormat(currentGoods.priceDeclineRate).int }}<span class="decimals">{{ priceFormat(currentGoods.priceDeclineRate).decimals }}</span></p>
                </div>
            </div>
        </div>

        <!-- 抢购中 -->
        <div 
            class="content_box buy_in clear"
            v-if="gameState == 3"
        >
            <div class="tip">当前宝贝</div>
            <div class="goods_detail">
                <div class="goods_image">
                    <img src="" class="img">
                </div>
                <div class="goods_detail_right">
                    <p class="goods_name text_overflow">任天堂Switch<span class="goods_desc">国行红蓝版</span></p>
                    <p class="buy_in_price">￥2,099.00起</p>
                    <p class="buy_in_price_down">每分钟直降<span>￥150.00</span></p>
                </div>
            </div>
            <div class="real_price_warp sell_out_crad">
                <div class="data">实时价格: <span class="price_int">￥1,929</span><span class="price_decimals">.34</span></div>
                <div class="data">已售罄</div>
            </div>
        </div>


        <!-- 抢购结束 -->
        <div 
            class="content_box buy_end clear" 
            v-if="gameState == 4"
        >
            <div class="tip">抢购结束</div>
            <div class="goods_detail">
                <div class="goods_image">
                    <img src="" class="img">
                    <img src="../images/sell_out.png" alt="已售罄" class="sell_out">
                </div>
                <div class="goods_detail_right">
                    <p class="goods_name text_overflow">任天堂Switch<span class="goods_desc">国行红蓝版</span></p>
                    <p class="goods_count">宝贝库存: 23</p>
                    <p class="goods_del_price">￥2099.00</p>
                </div>
            </div>
            <div class="real_price_warp">
                <div class="data">极限秒杀价: <span class="price_int">￥1,929</span><span class="price_decimals">.34</span></div>
            </div>
        </div>


        <div class="content_box clear" v-if="false">
            <div class="tip">抢购结束</div>
            <div class="goods_detail">

                <div class="goods_image">
                    <img src="" class="img">
                    <img src="../images/sell_out.png" alt="已售罄" class="sell_out">
                </div>
                <p class="goods_name text_overflow">任天堂Switch</p>
                <p class="goods_desc text_overflow">国行红蓝版</p>
            </div>
            <div class="goods_price_wrap">
                <!-- 买手榜 -->
                <member-list></member-list>
            </div>
        </div>


    </div>

    <!-- 视频广告 -->
    <video-adv v-if="false"></video-adv>

    <!-- 倒计时 -->
    <count-down v-if="false"></count-down>

    <!-- 底部 -->
    <bottom-info></bottom-info>

    <!-- 抢购成功  弹幕 -->
    <buy-success-member v-if="false"></buy-success-member>

</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import VideoAdv from '../components/VideoAdv.vue'
import BottomInfo from '../components/Bottom.vue'
import CountDown from '../components/CountDown.vue'
import BuySuccessMember from '../components/BuySuccessMember.vue'
import MemberList from '../components/MemberList.vue'
import { useStore } from 'vuex'
import { priceFormat } from '../util/index'

export default {
    setup(props) {
        const store = useStore()

        //游戏状态
        const gameState = computed(() => {
            return store.state.gameState
        })

        //当前宝贝
        const currentGoods = computed(() => {
            return store.state.goodsListData[store.state.currentGoodsIndex]
        })

        const state = reactive({
            gameState,
            currentGoods,
            priceFormat
        })

        return toRefs(state)
    },
    components: {
        VideoAdv,
        BottomInfo,
        CountDown,
        BuySuccessMember,
        MemberList
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
        top: 50%;
        margin-top: -352px;
        position: relative;
        z-index: 99;

        .content_box{
            padding: 13px 32px 112px 108px;
            display: flex;
            position: relative;
            
            .tip{
                font-size: 40px;
                font-weight: bold;
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

                    .data{
                        padding-left: 86px;
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
                        padding-left: 86px;
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

                .down_text{
                    font-size: 80px;
                    padding-top: 25px;

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
</style>