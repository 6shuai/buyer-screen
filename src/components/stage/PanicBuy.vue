<template>
    <!-- 抢购阶段 -->
    <div class="panic_buy_wrap">
        <ul class="light_top">
            <li 
                class="light_item"
                v-for="(item, index) in testArr"
                :key="index"
                :class="{ active: item }"
            ></li>
        </ul>

        <div class="panic_buy_content">
            <p class="title">实时价格</p>
            <div class="price">
                <div class="number_warp">
                    <span class="price_before text_heavy"
                        >￥</span
                    >
                    <span class="price_num text_heavy"
                        >{{ realTimePrice.int }}</span
                    >
                    <span class="price_after text_heavy"
                        >{{ realTimePrice.decimals }}</span
                    >
                </div>
            </div>
            <p class="discounts text_heavy">已优惠 {{(100 - realTimePrice.full / marketValue * 100).toFixed(2) }}%</p>
        </div>
        <ul class="light_bottom">
            <li 
                class="light_item"
                v-for="(item, index) in testArr2"
                :key="index"
                :class="{ active: item }"
            ></li>
        </ul>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { priceFormat } from '../../util/index'
import { useStore } from 'vuex'
export default {
    props: ['goodsData'],
    setup(props) {

        const store = useStore()

        //currentPrice              抢购价格
        //priceDeclineRate          每分钟下降金额
        //priceDecline              每次下降多少钱
        //priceDeclineFrequency     多少时间下降一次
        let { marketValue, priceDeclineRate, priceDecline, priceDeclineFrequency } = store.state.goodsDataDetail
        // let currentPrice = 5000
        // let priceDeclineRate = 1000
        // let priceDecline = 666
        // let priceDeclineFrequency = 2   
        onMounted(() => {
            state.marketValue = marketValue
            setRealTimePrice(marketValue, priceDeclineFrequency)
        })

        //实时价格
        const setRealTimePrice = (price, priceDeclineFrequency) => {
            clearTimeout(state.timer)
            let newPrice = price - priceDecline
            
            if(newPrice <= 0){
                newPrice = 0
                light(newPrice)
                return
            }
            light(newPrice)

            state.timer = setTimeout(() => {
                setRealTimePrice(newPrice, priceDeclineFrequency)
            }, priceDeclineFrequency * 1000)
        }

        //跑马灯
        const light = (newPrice) => {
            state.testArr = new Array(20)
            state.testArr2 = new Array(20)
            let i = 0

            let timer = setInterval(() => {
                if(i < 20){
                    state.testArr[i] = true
                }else{
                    state.testArr2[40-i-1] = true
                }
                if(i > 40){
                    clearInterval(timer)
                    state.realTimePrice = priceFormat(newPrice)
                    return
                }
                i+=1
            }, priceDeclineFrequency * 1000 / 40);
        }



        const state = reactive({
            testArr: new Array(20),
            testArr2: new Array(20),
            marketValue,
            realTimePrice: priceFormat(marketValue)
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .panic_buy_wrap{
        ul{
            // width: 85%;
            margin: -32px 5% 0 10%;
            display: flex;
           
            li{
                flex: 1 1;
                width: 102px;
                height: 102px;
                background: url('../../images/light_2.png') center no-repeat;

                &.active{
                    background: url('../../images/light_1.png') top 2px center no-repeat;
                }
            }

            &.light_bottom{
                margin: -40px 10% 0 5%;
            }
        }

        .panic_buy_content{
            padding: 0 12%;
            margin-top: -40px;
        }

        p.title{
            font-size: 48px;   
            line-height: 58px;
            padding-bottom: 6px;
        }

        .price{
            font-size: 120px;
            line-height: 165px;
            text-align: right;
            padding-right: 18px;

            .price_after{
                font-size: 100px;
            }
        }

        .discounts{
            padding-top: 12px;
            font-size: 48px;
            line-height: 65px;
            text-align: right;
            opacity: .6;
        }
    }
</style>