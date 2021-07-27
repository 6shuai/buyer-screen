<template>
    <div class="arraw_wrap">
        <div class="arraw_hight">
            <img src="../images/arraw_02.png" class="arraw_item arraw_hight_1" />
            <img src="../images/arraw_02.png" class="arraw_item arraw_hight_2" />
            <img src="../images/arraw_02.png" class="arraw_item arraw_hight_3" />
        </div>

        <!-- 即将开始  倒计时 -->
        <div 
            class="about_begin" 
            v-if="gameState == null"
        >
            <div class="text">即将开始</div>
            <div class="count_down">{{ countDownTime }}</div>
        </div>

        <!-- 开始竞猜 -->
        <div 
            class="guess_price" 
            v-else-if="gameState <= 2"
        >
            <div class="msg">参与竞猜<span class="msg_01">平分</span><span class="cash">现金大礼!</span></div>
        </div>

        <!-- 明日精彩继续 -->
        <div 
            class="guess_price tomorrow" 
            v-if="showTomorrowGoods"
        >
            <div class="msg">明日精彩继续</div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, computed, watch, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { translatesToHoursMinutesSeconds } from '../util/index'
export default {
    setup(props) {
        const store = useStore()

        //游戏状态
        const gameState = computed(() => {
            return store.state.gameState
        })

        //开始时间
        const beginTime = computed(() => {
            return store.state.goodsListData[store.state.currentGoodsIndex] ? store.state.goodsListData[store.state.currentGoodsIndex].beginTime : null
        })

        const showTomorrowGoods = computed(() => {
            return store.state.showTomorrowGoods
        })

        onMounted(() => {
            arrawAnim()
        })

        //箭头动画
        const arrawAnim = () => {
            let arraw1 = document.getElementsByClassName('arraw_hight_1')[0]
            let arraw2 = document.getElementsByClassName('arraw_hight_2')[0]
            let arraw3 = document.getElementsByClassName('arraw_hight_3')[0]
            let arraw = document.getElementsByClassName('arraw_hight')[0]

            arraw.classList.remove("active");
            arraw1.classList.remove("active");
            arraw2.classList.remove("active");
            arraw3.classList.remove("active");

            state.timer1 = setTimeout(() => {
                arraw.style.display = 'block'
                state.timer2 = setTimeout(() => {
                    arraw1.classList.add("active")
                    state.timer3 = setTimeout(() => {
                        arraw2.classList.add("active")
                        state.timer4 = setTimeout(() => {
                            arraw3.classList.add("active")
    
                            state.timer5 = setTimeout(() => {
                                arraw.classList.add("active");
                                state.timer6= setTimeout(() => {
                                    arraw.style.display = 'none'
                                    arrawAnim()
                                }, 1000);
                            }, 500);
    
                        }, 200);
                    }, 200);
                }, 200);
            }, 100);
        }


        //计算当前时间距离游戏开始还有多少秒
        const countDownStart = (beginTime) => {
            let now = new Date().getTime() / 1000
            let startTime = new Date(beginTime).getTime() / 1000
            let num = parseInt(startTime - now)

            console.log('距离游戏开始还有---->(', num , ')秒')
        
            countDownFun(50)

            setTimeout(() => {
                store.state.showAdvVideo = true
            }, 20 * 1000);
        }

        //游戏开始前 倒计时
        const countDownFun = (num) => {
            num -= 1
            state.countDownTime = translatesToHoursMinutesSeconds(num)
            if(num <= 0){
                clearTimeout(state.timer)
                return
            }else if(num < 10){
                //还剩最后十秒
                store.state.showCountDown = true
                clearTimeout(state.timer)
                return
            }
            state.timer = setTimeout(() => {
                countDownFun(num)
            }, 1000);
        }

        //抢购开始时间
        watch(beginTime, (newData, oldData) => {
            if(newData){
                countDownStart(beginTime.value)
            }
        })

        //组件卸载时
        onUnmounted(() => {
            clearTimeout(state.timer)
            clearTimeout(state.timer1)
            clearTimeout(state.timer2)
            clearTimeout(state.timer3)
            clearTimeout(state.timer4)
            clearTimeout(state.timer5)
            clearTimeout(state.timer6)
        })

        const state = reactive({
            gameState,
            showTomorrowGoods,
            countDownTime: '00:00',
            timer: undefined,
            timer1: undefined,
            timer2: undefined,
            timer3: undefined,
            timer4: undefined,
            timer5: undefined,
            timer6: undefined
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .arraw_wrap{
        height: 179px;
        margin: 0 23px 30px 23px;
        background: url('../images/arraw.png') center no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        
        .arraw_hight{
            height: 179px;
            transition: all 1s ease-in;
            position: absolute;
            
            &.active{
                transform: translate(50vw);
            }
        }

        .arraw_item{
            height: 100%;
            position: absolute;
            left: -277px;
            transition: all .3s ease-in;
        }

        .arraw_hight_1{
            // animation: arrawHightAnim1 3s ease-in 2s;

            // @keyframes arrawHightAnim1 {
            //     0% {transform: translate(-100vw)}
            //     100% {transform: translate(0)}
            // }
            &.active{
                transform: translate(15vw)
            }
        }
        .arraw_hight_2{
            // animation: arrawHightAnim2 3s ease-in 1.5s;

            // @keyframes arrawHightAnim2 {
            //     0% {transform: translate(-100vw)}
            //     100% {transform: translate(95px)}
            // }

            &.active{
                transform: translate(13vw)
            }
        }
        .arraw_hight_3{
            // animation: arrawHightAnim3 3s ease-in 1s;

            // @keyframes arrawHightAnim3 {
            //     0% {transform: translate(-100vw)}
            //     100% {transform: translate(190px)}
            // }

            &.active{
                transform: translate(11vw)
            }
        }

        .about_begin{
            padding: 15px 0 0 350px;
            display: flex;

            .text{
                font-size: 50px;
                line-height: 66px;
                color: #e9b085;
                font-weight: bold;
                padding-right: 58px;
            }

            .count_down{
                font-size: 150px;
                color: #ffcc00;
            }
        }

        .guess_price{
            padding: 0 0 0 430px;
            line-height: 179px;

            &.tomorrow{
                padding: 0;
                text-align: center;
            }
            
            .msg{
                font-size: 70px;
                color: #e9b085;
                font-weight: bold;

                &_01{
                    padding: 0 25px 0 40px;
                }

                .cash{
                    font-size: 90px;
                    color: #ffcc00;
                }
            }
        }
    }

    @keyframes cardHide {
        0% {
            transform: translate(0);
            // opacity: 1;
        }
        100%{
            transform: translate(100%);
            // opacity: 0;
        }
    }

    @keyframes cardShow {
        0% {
            transform: translate(-100%);
            // opacity: 0;
        }
        100%{
            transform: translate(0);
            // opacity: 1;
        }
    }
</style>