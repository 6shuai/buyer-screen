<template>
    <div class="goods_list_wrap">

        <!-- 当前宝贝 -->
        <div 
            class="current_goods_box"
            :class="{ current_goods_card_anim: showAdvVideo }"
        >
            <div 
                class="current_goods_wrap"
            >
                <div class="title_card">{{ gameState == 4 ? '抢购结束' : '当前宝贝' }}</div>
                <div class="goods_detail buy_end" v-if="goodsDataDetail.goods">
                    <div class="goods_detail_top">
                        <img :src="goodsDataDetail.goods.cover" class="goods_img">
                        <p class="goods_name">{{ goodsDataDetail.goods.displayName }}</p>
                        <p class="goods_desc">{{ goodsDataDetail.goods.description }}</p>
                    </div>

                    <div class="goods_detail_bottom" v-if="!gameState || gameState < 3">
                        <p class="price_start">￥{{ priceFormat(goodsDataDetail.marketValue).int }}{{ priceFormat(goodsDataDetail.marketValue).decimals }}起</p>
                        <p class="price_down_text">每分钟直降</p>
                        <p class="price">￥{{ priceFormat(goodsDataDetail.priceDeclineRate).int }}{{ priceFormat(goodsDataDetail.priceDeclineRate).decimals }}</p>
                    </div>

                    <!-- 抢购中 实时价格 -->
                    <div class="goods_detail_bottom real_time_price" v-if="gameState == 3">
                        <p class="real_time_text">实时价格</p>
                        <p class="price" v-if="realTimePrice">￥{{ priceFormat(realTimePrice).int }}{{ priceFormat(realTimePrice).decimals }}</p>
                    </div>

                    <!-- 抢购结束 -->
                    <div class="goods_detail_bottom end" v-if="gameState == 4">
                        <p class="goods_count">宝贝库存: 23</p>
                        <p class="price_text">极限秒杀价</p>
                        <p class="del_price">￥{{ priceFormat(goodsDataDetail.marketValue).int }}{{ priceFormat(goodsDataDetail.marketValue).decimals }}</p>
                        <p class="price">￥{{ priceFormat(buyKing.price).int }}{{ priceFormat(buyKing.price).decimals }}</p>
                    </div>

                </div>
            </div>
        </div>


        <!-- 即将开始  class  put_away  收起-->
        <div 
            class="goods_list"
            :class="{ put_away: showAdvVideo }"
        >
            <div class="title_card">即将开始</div>
            <div class="goods_item" 
                v-for="(item, index) in goodsList" 
                :key="index"
            >
                <div class="goods_info">
                    <img :src="item.goodsCover" class="goods_img">
                    <div class="info text_overflow">
                        <p class="time">{{ formatTime(item.beginTime) }}</p>
                        <p class="goods_name">{{ item.goodsName }}</p>
                    </div>
                </div>
                
                <div class="goods_bottom">
                    <p class="price">￥{{ priceFormat(item.marketValue).int }}{{ priceFormat(item.marketValue).decimals }}起</p>
                    <p class="down_text">每分钟直降</p>
                    <p class="down_price">￥{{ priceFormat(item.priceDeclineRate).int }}{{ priceFormat(item.priceDeclineRate).decimals }}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { formatTime, priceFormat } from '../util/index'
import { useStore } from 'vuex'
export default {
    setup(props){
        const store = useStore()

        //抢购状态
        const gameState = computed(() => {
            return store.state.gameState
        })

        //是否显示视频
        const showAdvVideo = computed(() => {
            return store.state.showAdvVideo
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

        const state = reactive({
            goodsList,
            formatTime,
            priceFormat,
            gameState,
            showAdvVideo,
            realTimePrice,
            goodsDataDetail,
            buyKing
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
        }

        .current_goods_box{
            height: 0;
            overflow: hidden;
            transition: all .2s;

            &.current_goods_card_anim{
                display: block;
                height: 643px;
                animation: currentGoodsCardAnim .5s linear both;
            }
        }

        .current_goods_wrap{
            margin-top: 66px;
            position: relative;
            
            .title_card{
                position: absolute;
                top: -70px;
                left: 0;
                right: 0;
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
                    font-weight: bold;

                    .price_start{
                        font-size: 35px;
                        color: #4a2453;
                        line-height: 68px;
                    }

                    .price_down_text{
                        font-size: 40px;
                        color: #fff;
                        line-height: 70px;
                    }

                    .price{
                        font-size: 60px;
                        color: #fff;
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
                        }
                    }
                }

            }
        }

    }
    .goods_list{
        height: 100%;
        // display:flex;
        // flex-flow: column;
        // justify-content: space-around;
        transition: all .3s ease-in-out;

        .goods_item{
            margin: 15px 0;
            width: 100%;
            height: 296px;
            min-height: 296px;
            background: url('../images/goods_card_01.png') no-repeat center;
            border-radius: 10px;
            overflow: hidden;
            transition: all .3s ease-in-out;
            
            &.mini{
                animation: goodsItemAnim 1s linear both;
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
                transition: all .3s ease-in-out;

                .price{
                    font-size: 35px;
                    color: #4a2453;
                    padding: 15px 0 25px 0;
                }

                .down_text{
                    color: #fff;
                    font-size: 30px;
                }

                .down_price{
                    font-size: 50px;
                    color: #fff;
                    padding-top: 8px;
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

        @keyframes currentGoodsCardAnim {
            0% {transform: translate(calc(100% + 45px))}
            100% {transform: translate(0)}
        }
    }
</style>