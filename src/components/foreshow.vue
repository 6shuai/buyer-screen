<template>
    <!-- 预告  下个宝贝 -->
    <div class="next_goods_wrap" v-if="nextGoods">
        <div class="goods_card">
            <div class="next_text text_medium">
                <p class="text">下个宝贝</p>
                <p class="time">{{ formatTime(nextGoods.beginTime) }}</p>
            </div>
            <div class="goods_img">
                <img :src="nextGoods.goodsCover">
            </div>
        </div>

        <div class="goods_info">
            <div class="goods_name text_overflow text_medium">
                {{ nextGoods.goodsName }}
                <span>{{ nextGoods.goodsDescription }}</span>
            </div>
            <div class="price_s text_medium">
                <span class="int">￥{{ priceFormat(nextGoods.marketValue).int }}</span>
                <span class="decimals">{{ priceFormat(nextGoods.marketValue).decimals }}</span>
                <span class="price_text_qi">起</span>
            </div>
            <div class="price_d text_medium">每分钟直降 
                ￥{{ priceFormat(nextGoods.priceDeclineRate).int }}
                <span class="decimals">{{ priceFormat(nextGoods.priceDeclineRate).decimals }}</span>
            </div>
        </div>
    </div>

    <div class="next_goods_wrap text_medium" v-else>
        <p class="end_text">本场抢购已结束</p>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
import { formatTime, priceFormat } from '../util/index'
import mixin from '../mixins/index'
import socketMixin from "../mixins/socket"

export default {
    setup(props) {
        const store = useStore()
        const { pauseJxmsBgm, playJxmsSounds } = mixin()
        const { websocketSendData } = socketMixin()

        onMounted(() => {
            let { currentGoodsIndex, goodsListData } = store.state
            // if(currentGoodsIndex < goodsListData.length-1){
            //     state.nextGoods = goodsListData[1]
            // }else{
                
                setTimeout(() => {
                    //明天还有宝贝
                    pauseJxmsBgm.value()
                    playJxmsSounds.value('./voice/04_01.mp3', () => {
                        store.state.showTomorrowGoods = true
                        store.state.showAdvVideo = true
                    })

                    //明天没有宝贝
                    // setTimeout(() => {
                    //     store.state.showAdvVideo = false
                    //     store.state.showHistryGoods = true
                    //     playJxmsSounds.value('./voice/04_02.mp3')
                    // }, 60 * 1000);

                }, 120 * 1000);

            // }
        })
        
        const state = reactive({
            nextGoods: undefined,
            formatTime,
            priceFormat
        })
        
        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .next_goods_wrap{
        height: 250px;
        margin-bottom: 36px;
        font-weight: bold;
        display: flex;
        padding: 0 88px;

        .goods_card{
            width: 519px;
            height: 250px;
            background: url('../images/foreshow.png') center no-repeat;
            background-size: 100% 100%;

            .next_text{
                width: 270px;
                padding: 60px 0;
                display: inline-block;
                text-align: center;
                vertical-align: top;

                .text{
                    font-size: 40px;
                    color: #ffcc00;
                }

                .time{
                    font-size: 80px;
                    color: #fff;
                    padding-top: 20px;
                }
            }

            .goods_img{
                height: 100%;
                display: inline-block;
                text-align: center;
                
                img{
                    width: 228px;
                    height: 228px;
                    display: inline-block;
                    margin: 11px 0;
                }
            }

        }

        .goods_info{
            flex: 1;
            width: 900px;
            margin-left: 30px;

            .goods_name{
                font-size: 60px;
                color: #fff;
                line-height: 60px;
                padding-bottom: 42px;

                span{
                    font-size: 40px;
                    color: #e9b086;
                    font-weight: normal;
                }
            }

            .price_s{
                font-size: 40px;
                color: #ffcc00;
                line-height: 60px;

                .decimals{
                    font-size: 35px;
                }
            }

            .price_d{
                display: inline-block;
                height: 80px;
                line-height: 80px;
                padding: 0 28px;
                background: url('../images/buy_in_price_down.png') center no-repeat;
                background-size: 100% 100%;
                font-size: 50px;
                color: #fff;

                &.decimals{
                    font-size: 45px;
                }
            }
        }

        .end_text{
            font-size: 100px;
            color: #e9b086;
            margin: 0 auto;
            line-height: 250px;
        }
    }
    
</style>