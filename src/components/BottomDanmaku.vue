<template>
    <div class="danmaku_wrap">
        <div class="text" v-if="gameState == null">
            对宝贝不感兴趣?没关系,参与宝贝猜价可能赢得现金奖励哦!
        </div>
        <div class="danmaku_list" v-show="showDanmaku">
            <div 
                class="item"
                v-for="(item, index) in danmakulist"
                :key="index"
                :class="`danmaku_${index}`"
            >
                <div class="head_img"><img :src="item.avatar"></div>
                <div class="name">{{ item.nickName }}</div>
                <div class="price">
                    <span v-if="item.type == 1">已报价:
                        <span class="num">{{ item.price.int }}<span class="decimals">{{ item.price.decimals }}</span></span>
                    </span>
                    <span v-if="item.type == 2">猜对{{ item.correctDigit }}位:
                        <span class="num cash">赢得现金￥{{ item.price.int }}<span class="decimals">{{ item.price.decimals }}</span></span>
                    </span>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import { reactive, toRefs, computed, onMounted, watch, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { priceFormat } from '../util/index'
export default {
    setup(props) {
        const windowWidth = window.innerWidth
        const store = useStore()

        // 游戏状态
        const gameState = computed(() => {
            return store.state.gameState
        })

        const showDanmaku = computed(() => {
            return store.state.showDanmaku
        })

        //猜价通知
        const guessNotice = computed(() => {
            return store.state.guessNotice
        })

        //猜价成功 获得红包的用户  弹幕
        const guessPriceData = computed(() => {
            return store.state.guessPriceMemberList
        })

        const showRankList = computed(() => {
            return store.state.showRankList
        })

        onMounted(() => {

            // setTimeout(() => {
            //     state.list.push({ name: 'madongmei' })
            //     setTimeout(() => {
            //         state.list.push({ name: 'madongmei222' })
            //         setTimeout(() => {
            //             state.list.push({ name: 'madongmei3333' })
            //             setTimeout(() => {
            //                 state.list.push({ name: 'madongmei4444' })
            //             }, 100);
            //         }, 100);
            //     }, 1000);
            // }, 1000);
        })

        const danmaku = () => {
            clearInterval(state.timer)
            let mainDom = document.getElementsByClassName('danmaku_list')[0].getBoundingClientRect()
            state.lineCount = parseInt((window.innerHeight - mainDom.height - 200) / 100 || 0)
            state.danmakuBottom = mainDom.height + mainDom.top
            
            state.timer = setInterval(()=>{
                if(!state.list.length) return
                findLstRightDistance().then(res => {
                    if(!res) return
                    let item = state.list.shift()
                    if(item){
                        state.danmakulist.push(item)
                    }
                })
            }, 200)
        }

        //获取最后一个弹幕 right的距离
        const findLstRightDistance = () => {
            return new Promise((resolve) => {
                if(!state.danmakulist.length) resolve(true)
                let right = 0
                let query = document.getElementsByClassName(`danmaku_${state.danmakulist.length-1}`)[0]
                if(query){
                    right = query.getBoundingClientRect().right
                    if(windowWidth - right > 0){
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                }else{
                    resolve(true)
                }
                
            })
        }

        //游戏状态
        watch(gameState, (newState, oldState) => {
            if(newState != null && !store.state.showDanmaku){
                store.state.showDanmaku = true
                danmaku() 
            }
            if(newState == null || state.showRankList){
                store.state.showDanmaku = false
            }
        })

         //猜价通知
        watch(guessNotice, (newData, oldData) => {
            state.list.push({
                ...newData,
                type: 1,
                price: priceFormat(newData.price, true) 
            })
        })

        //猜价结果 通知
        watch(guessPriceData, (newData, oldData) => {
            newData.forEach(item => {
                state.list.push({
                    ...item,
                    type:2,
                    price: priceFormat(item.award, true)
                })
            })
        })

        onUnmounted(() => {
            clearInterval(state.timer)  
        })


        const state = reactive({
            timer: undefined,
            gameState,
            list: [],   // 普通的弹幕队列
            danmakulist: [], // 当前正在执行的
            showDanmaku,
            showRankList,
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .danmaku_wrap{
        width: 100%;
        height: 100px;
        z-index: 100;

        .text{
            font-size: 30px;
            color: #e9b085;
            text-align: center;
            line-height: 100px;
        }

        .danmaku_list{
            width: 100%;
            height: 100%;
            background: #4a2453;
            overflow: hidden;
            position: relative;
            z-index: 99;

            .item{
                position: absolute;
                left: 0;
                height: 80px;
                line-height: 80px;
                font-size: 35px;
                padding: 10px 0;
                transform: translateZ(0);
                animation: danmakuAnim 5s ease-in both;

                .head_img{
                    width: 80px;
                    height: 80px;
                    display: inline-block;
                    background: url('../images/head_border.png') center no-repeat;
                    background-size: 100% 100%;
                    border-radius: 50%;
                    overflow: hidden;
                    vertical-align: top;

                    img{
                        width: 70px;
                        height: 70px;
                        margin: 5px;
                        border-radius: 50%;
                    }
                }

                .name{
                    display: inline-block;
                    color: #fff;
                    font-weight: bold;
                    padding: 0 15px;
                }

                .price{
                    display: inline-block;
                    color: #e9b085;

                    .num{
                        margin-left: 5px;
                    }

                    .cash{
                        color: #ffcc00;
                    }

                    .decimals{
                        font-size: 30px;
                    }
                }
            }


            @keyframes danmakuAnim {
                0% {transform: translate(100vw)}
                100% {transform: translate(-100%);}
            }
        }
    }
</style>