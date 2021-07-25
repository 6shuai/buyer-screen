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
import { reactive, toRefs, computed, watch, onMounted } from 'vue'
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
            arraw.style.display = 'block'
            setTimeout(() => {
                console.log(arraw1.style)
                arraw1.style.transform = 'translate(120px)'
                setTimeout(() => {
                    arraw2.style.transform = 'translate(170px)'
                    setTimeout(() => {
                        arraw3.style.transform =' translate(220px)'

                        setTimeout(() => {
                            arraw.style.transform =' translate(60%)'
                            setTimeout(() => {
                                arraw.style.display = 'none'
                                arrawAnim()
                            }, 1000);
                        }, 500);

                    }, 500);
                }, 500);
            }, 1000);
        }


        //开始倒计时
        const countDownStart = (beginTime) => {
            let now = new Date().getTime() / 1000
            let startTime = new Date(beginTime).getTime() / 1000
            let num = parseInt(startTime - now)
        
            countDownFun(50)

            setTimeout(() => {
                store.state.showAdvVideo = true
            }, 20 * 1000);
        }

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

        watch(beginTime, (newData, oldData) => {
            if(newData){
                countDownStart(beginTime.value)
            }
        })

        const state = reactive({
            gameState,
            showTomorrowGoods,
            countDownTime: '00:00',
            timer: undefined
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
        
        .arraw_hight{
            height: 179px;
            transition: all 1s ease-in;
            // animation: arrawHightAnim 1.5s ease-in 1.5s infinite;

            // @keyframes arrawHightAnim {
            //     0% {transform: translate(-100vw)}
            //     100% {transform: translate(0)}
            // }
        }

        .arraw_item{
            width: 254px;
            height: 179px;
            position: absolute;
            left: -254px;
            transition: all .3s ease-in;
        }

        .arraw_hight_1{
            width: 254px;
            height: 179px;
            position: absolute;
            left: -254px;
            animation: arrawHightAnim1 3s ease-in 2s;

            // @keyframes arrawHightAnim1 {
            //     0% {transform: translate(-100vw)}
            //     100% {transform: translate(0)}
            // }
        }
        .arraw_hight_2{
            width: 254px;
            height: 179px;
            position: absolute;
            left: -254px;
            animation: arrawHightAnim2 3s ease-in 1.5s;

            // @keyframes arrawHightAnim2 {
            //     0% {transform: translate(-100vw)}
            //     100% {transform: translate(95px)}
            // }
        }
        .arraw_hight_3{
            width: 254px;
            height: 179px;
            position: absolute;
            left: -254px;
            // animation: arrawHightAnim3 3s ease-in 1s;

            // @keyframes arrawHightAnim3 {
            //     0% {transform: translate(-100vw)}
            //     100% {transform: translate(190px)}
            // }
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