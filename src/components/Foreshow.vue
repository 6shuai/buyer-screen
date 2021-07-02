<template>
    <!-- 底栏 抢购预告 -->
    <div class="foreshow_wrap clear">
        <div class="tody_goods text_heavy">今日宝贝</div>

        <div class="goods_list_wrap">
            <div class="goods_list_box">
                <div 
                    class="item" 
                    v-for="(item, index) in goodsListData" 
                    :key="index"
                >
                    <div class="time text_heavy">
                        <span>{{ formatTime(item.beginTime) }}</span>
                    </div>
                    <div class="goods_wrap">
                        <div class="goods_box">
                            <img :src="item.goodsCover">
                            <div class="goods_name">{{ item.goodsName }}</div>

                            <!-- <div class="price">
                                <p></p>
                            </div> -->

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="item end" v-for="item in 2" :key="item">
            <div class="time text_heavy">
                <span>18:30</span>
            </div>
            <div class="goods_wrap">
                <div class="goods_box">
                    <img src="">

                    <div class="make_bargain_price">
                        <div class="number_warp">
                            <span class="price_before text_heavy"
                                >￥</span
                            >
                            <span class="price_num text_heavy"
                                >2,088</span
                            >
                            <span class="price_after text_heavy"
                                >.00</span
                            >
                        </div>
                        <p class="make_bargain">极限成交</p>
                    </div>

                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { formatTime } from '../util/index'
import { useStore } from 'vuex'
export default {
    setup(props) {
        const store = useStore()

        const goodsListData = computed(() => {
            return store.state.goodsListData
        })

        const state = reactive({ 
            goodsListData,
            formatTime
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    @import url('../variables.less');
    .foreshow_wrap{
        width: 100%;
        height: 69px;
        background: #4c1c64;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9999;

        .tody_goods{
            width: 179px;
            line-height: 69px;
            text-align: center;
            font-size: 32px;
            color: @color_info;
            float: left;
        }

        .goods_list_wrap{
            float: left;
            width: calc(100% - 179px);

            .goods_list_box{
                width: 10000px;
            }
        }

        .item{
            margin-left: -1px;
            float: left;
            
            .time{
                width: 170px;
                line-height: 69px;
                background: #e18a68;
                transform: skew(-10deg);
                text-align: center; 
                font-size: 42px;
                color: @color_primary;
                display: inline-block;
                vertical-align: top;

                span{
                    display: inline-block;
                    transform: skew(10deg);
                }
            }

            .goods_wrap{
                margin-left: -10px;
                padding: 0 35px;
                line-height: 69px;
                background: #e7d0f5;
                transform: skew(-10deg);
                display: inline-block;

                .goods_box{
                    transform: skew(10deg);

                    img{
                        width: 114px;
                        max-height: 114px;
                        display: inline-block;
                        margin-top: -53px;
                        border: 1px solid #e5e5e5;
                        vertical-align: middle;
                        margin-right: 12px;
                    }

                    .goods_name{
                        display: inline-block;
                        font-size: 32px;
                        line-height: 69px;
                        color: @color_primary;
                    }


                    .make_bargain_price{
                        display: inline-block;
                        width: 160px;
                        padding-top: 2px;

                        .number_warp{
                            font-size: 26px;
                            line-height: 35px;
                            color: @color_info;
                        }

                        .make_bargain{
                            font-size: 20px;   
                            line-height: 24px;
                            color: @color_lightgray;
                            text-align: right;
                        }
                    }
                }
            }

            &.end{
                .time{
                    background: #5E3E70;
                    span{
                        color: @color_lightgray;
                        opacity: .6;
                    }
                }

                .goods_wrap{
                    background: @color_primary;
                }
            }
        }
    }
</style>


