<template>
    <!-- 预告  下个宝贝 -->
    <div class="next_goods_wrap" v-if="nextGoods">
        <div class="goods_card">
            <div class="next_text text_medium">
                <p class="text">下个宝贝</p>
                <p class="time">
                    {{ formatTime(nextGoods.beginTime) }}
                </p>
            </div>
            <div class="goods_img">
                <div 
                    class="img" 
                    :style="{ background: `url(${nextGoods.goodsCover}) center no-repeat`, backgroundSize: '100% 100%' }"
                ></div>
            </div>
        </div>

        <div class="goods_info">
            <div class="goods_name text_overflow">
                <span class="text_medium">{{ nextGoods.goodsName }}</span>
                <span class="goods_description">{{ nextGoods.goodsDescription }}</span>
            </div>
            <div class="price_s text_medium">
                <span class="int">
                    ￥{{ priceFormat(nextGoods.marketValue).int }}
                </span>
                <span class="decimals">
                    {{ priceFormat(nextGoods.marketValue).decimals }}
                </span>
                <span class="price_text_qi">起</span>
            </div>
            <div class="price_d text_medium">每分钟直降 
                ￥{{ priceFormat(nextGoods.priceDeclineRate).int }}
                <span class="decimals">
                    {{ priceFormat(nextGoods.priceDeclineRate).decimals }}
                </span>
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

export default {
    setup(props) {
        const store = useStore()
        const { pauseJxmsBgm, playJxmsSounds } = mixin()

        const state = reactive({
            nextGoods: undefined
        })

        onMounted(() => {
            let { currentGoodsIndex, goodsListData } = store.state

            //后面还有宝贝
            if(currentGoodsIndex < goodsListData.length-1){
                state.nextGoods = goodsListData[currentGoodsIndex]

                setTimeout(() => {
                    //重置数据  开始下一轮抢购
                    store.state.currentGoodsIndex += 1
                    store.state.showTomorrowGoods = false
                    store.state.showAdvVideo = false
                    store.state.showRankList = false
                    store.commit('SET_GAME_STATE', null)
                }, 60 * 1000);

            }else{
                //后面没有宝贝

                setTimeout(() => {
                    //明天有宝贝
                    store.commit('SET_VOICE_CAPTION', 'gameOver01')
                    pauseJxmsBgm.value()
                    playJxmsSounds.value('./voice/04_01.mp3', () => {
                        store.state.showTomorrowGoods = true
                        store.state.showAdvVideo = true
                    })

                    //明天没有宝贝  显示历史抢购
                    // setTimeout(() => {
                        // store.commit('SET_VOICE_CAPTION', 'gameOver02')
                    //     store.state.showAdvVideo = false
                    //     store.state.showHistryGoods = true
                    //     playJxmsSounds.value('./voice/04_02.mp3')
                    // }, 60 * 1000);


                }, 60 * 1000)

            }
        })
        
        return {
            ...toRefs(state),
            formatTime,
            priceFormat
        }
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
            display: flex;

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
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                
                .img{
                    width: 228px;
                    height: 228px;
                    display: inline-block;
                    margin: 11px;
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

                .goods_description{
                    font-size: 40px;
                    color: #e9b086;
                    font-weight: normal;
                    margin-left: 10px;
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