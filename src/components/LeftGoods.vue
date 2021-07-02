<template>
    <div 
        v-if="goodsData"
        class="left_goods_wrap"
    >
        <div class="goods_info">
            <img :src="goodsData.goodsCover">
            <div class="goods_right">
                <p class="goods_name text_heavy overflow">{{ goodsData.goodsName }}</p>
                <p class="desc overflow">{{ goodsData.goodsDescription }}</p>
            </div>
        </div>    

        <div 
            v-if="goodsState != 4"
            class="price_info"
        >
            <div class="price_content overflow">
                <div class="number_warp">
                    <span class="price_before text_heavy"
                        >￥</span
                    >
                    <span class="price_num text_heavy"
                        >{{ priceFormat(goodsData.marketValue).int }}</span
                    >
                    <span class="price_after text_heavy"
                        >{{ priceFormat(goodsData.marketValue).decimals }}</span
                    >
                    <span class="text opacity_08">起</span>
                </div>

                <div class="number_warp down">
                    <span class="text opacity_08">每分钟降</span>
                    <span class="price_before text_heavy"
                        >￥</span
                    >
                    <span class="price_num text_heavy"
                        >{{ priceFormat(goodsData.priceDeclineRate).int }}</span
                    >
                    <span class="price_after text_heavy"
                        >{{ priceFormat(goodsData.priceDeclineRate).decimals }}</span
                    >
                </div>

            </div>
        </div>

        <!-- 极限秒杀价 -->
        <div v-if="goodsState == 4">
            <div class="sale_wrap">
                <div class="price_content overflow">
                    <p class="text">极限秒杀价</p> 
                    <div class="number_warp">
                        <span class="price_before text_heavy"
                            >￥</span
                        >
                        <span class="price_num text_heavy"
                            >{{ priceFormat(buyMemberListNo1.price).int }}</span
                        >
                        <span class="price_after text_heavy"
                            >{{ priceFormat(buyMemberListNo1.price).decimals }}</span
                        >
                    </div>
                </div>
            </div>

            <div class="sell_out_wrap">
                <div class="sell_out">已售罄</div>
            </div>
        </div>

    </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { priceFormat } from '../util/index'
export default {
    setup(props) {
        const store = useStore()

        //抢购数据
        const goodsData = computed(() => {
            return store.state.goodsListData[store.state.currentGoodsIndex]
        })

        //抢购状态
        const goodsState = computed(() => {
            return store.state.gameState
        })

        //抢购成功的用户列表 排名第一 秒杀王
        const buyMemberListNo1 = computed(() => {
            return store.state.buyMemberList[0]
        })

        const state = reactive({
            goodsData,
            goodsState,
            priceFormat,
            buyMemberListNo1
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    @import url('../variables.less');
    .left_goods_wrap{
        width: 100%;
        height: 100%;
        position: relative;

        .goods_info{
            padding: 0 48px;
            height: 194px;

            img{
                width: 386px;
                max-height: 386px;
                margin-right: 48px;
                margin-top: -50%;
                display: inline-block;
            }

            .goods_right{
                width: calc(100% - 482px);
                padding-top: 37px;
                display: inline-block;

                .goods_name{
                    font-size: 64px;
                    line-height: 88px;
                }

                .desc{
                    font-size: 40px;
                    line-height: 55px;
                    padding-top: 7px;
                }
            }
        }

        .price_info{
            height: 98px;
            line-height: 98px;
            background: rgba(235, 155, 66, .6);
            float: right;
            transform: skew(-9deg);
            margin-right: 5.5%;
            margin-top: 75px;

            .price_content{
                transform: skew(9deg);
                padding: 0 98px;

                .number_warp{
                    display: inline-block;
                    font-size: 42px;;
    
                    .price_after{
                        font-size: 36px;
                    }

                    .text{
                        font-size: 36px;
                        padding-left: 6px;
                    }

                    &.down{
                        padding: 0 6px 0 18px;
                        font-size: 48px;

                        .text{
                            font-size: 42px;
                        }

                        .price_after{
                            font-size: 42px;
                        }
                    }
                }
            }
        }

        .sale_wrap, .price_info{
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }

        .sale_wrap{
            height: 169px;
            background: rgba(235, 155, 66, .8);
            transform: skew(-10deg);
            margin-right: 5.1%;
            float: right;

            .price_content{
                transform: skew(10deg);
                padding: 0 67px;
                
                .text{
                    font-size: 42px;
                    line-height: 50px;
                    padding: 6px 0;
                }

                .number_warp{
                    padding: 6px 12px 8px 12px;
                    font-size: 67px;
                    line-height: 93px;

                    .price_after{
                        font-size: 58px;
                    }
                }

            }
        }

        .sell_out_wrap{
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            overflow: hidden;

            .sell_out{
                position: absolute;
                left: -30px;
                bottom: 20px;
                font-size: 160px;
                color: @color_info;
                opacity: .62;
                transform: rotate(-18deg);
            }
        }

    }
</style>