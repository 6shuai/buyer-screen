<template>
    <!-- 猜价阶段 -->
    <div class="guess_price_wrap">
        <p class="title text_heavy">竞猜本宝贝极限秒杀价</p>

        <div class="rule_wrap">
            <!--  -->
            <swiper
                :autoplay= {delay:5000} 
                loop
            >
                <swiper-slide
                    class="rule_item"
                    v-for="(item, index) in guessRules"
                    :key="index"
                >
                    <div class="card_warp">
                        <div 
                            v-for="(num, numIndex) in 7" 
                            :key="numIndex"
                            class="item"
                            :class="item.rule.includes(numIndex) ? 'success' : 'error'"
                        >
                        </div>
                    </div>
                    <div class="desc">
                        <div class="count">
                            猜对任意<span class="light">{{ item.correctDigit }}位</span>
                        </div>
                        <div class="price">
                            平分<span class="light">{{ item.award }}元</span>现金红包
                        </div>
                    </div>
                </swiper-slide>
            </swiper>

        </div>

    </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from 'vue'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.less'
SwiperCore.use([Autoplay])

export default {
    props: ['gameData'],
    setup(props) {

        onMounted(() => {
            setTimeout(() => {
                state.currentIndex += 1
            }, 5000);
        })

        const guessRules = computed(() => {
            let rules = []
            props.gameData.guessRules.forEach(item => {
                rules.push({
                    ...item,
                    rule: setPosition(item.correctDigit)
                })
            });
            return rules
        })

        //猜对的位置 
        const setPosition = (num = 3) => {
            let arr = []
            switch (num) {
                case 1:
                    arr = [2]
                    break;
                case 2:
                    arr = [2, 5]
                    break;
                case 3:
                    arr = [0, 2, 5]
                    break;
                case 4:
                    arr = [0, 2, 3, 5]
                    break;
                case 5:
                    arr = [0, 2, 3, 5, 6]
                    break;
                case 6:
                    arr = [0, 1, 2, 3, 5, 6]
                    break;
                default:
                    break;
            }

            console.log(num, arr)
            return arr
        }

        const state = reactive({
            currentIndex: 0,
            setPosition,
            guessRules
        })

        return toRefs(state)
    },
    components: { 
        Swiper, 
        SwiperSlide 
    },
}
</script>

<style lang="less" scope>
    @import url('../../variables.less');
    .guess_price_wrap{
        padding: 24px;
        text-align: center;
        opacity: .8;

        .title{
            font-size: 48px;
            color: @color_lightgray;
            line-height: 65px;
        }

        .rule_wrap{
            padding-top: 37px;

            .rule_item{
                text-align: center;

                .card_warp{
                    display: flex;
                    justify-content: center;
                    align-items: baseline;
                    margin-left: -12px;

                    .item{
                        width: 60px;
                        height: 81px;
                        margin-left: 12px;
                        border-radius: 12px;

                        &.success{
                            background: #5FB890 url('../../images/icon_success.png') center no-repeat;
                        }

                        &.error{
                            background: #BB2A44 url('../../images/icon_error.png') center no-repeat;
                        }

                        &:nth-child(5){
                           width: 18px;
                           height: 18px;
                           border-radius: 50%;
                           background: @color_primary;
                        }
                    }
                }

                .desc{
                    height: 71px;
                    display: flex;
                    justify-content: center;
                    margin-top: 18px;
                    line-height: 71px;
                    font-size: 36px;
                    color: @color_lightgray;
        
                    .light{
                        height: 71px;
                        padding: 0 6px;   
                        background: rgba(49, 17, 61, .8);
                        color: @color_info;
                        border-radius: 3px;
                        margin: 0 6px;
                    }
        
                    .price{
                        margin-left: 42px;
                    }
                }
                
            }
        }
    }
</style>