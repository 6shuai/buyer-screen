<template>
    <div 
        class="buy_success_member_warp"
    >
        <div 
            class="item" 
            v-for="(item, index) in danmakulist" 
            :key="index"
            :class="`danmaku_${item.danmakuId}`"
            :style="{ marginLeft: index * 50 - hideCount * 50 + 'px' }"
        >
            <div class="content">
                <div class="member_img">
                    <img :src="item.avatar">
                </div>
                <div class="member_right">
                    <p class="name text_overflow">{{ item.nickName }}</p>
                    <p class="price">秒杀价￥{{ item.price.int }}{{ item.price.decimals }}</p>

                    <div class="buy_success">抢到宝贝!</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { reactive, toRefs, onMounted, computed, watch, nextTick, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { priceFormat } from '../util/index'
import mixin from '../mixins/index'

export default {
    setup(props) {
        const windowWidth = window.innerWidth
        const store = useStore()
        const { playJxmsSounds } = mixin()

        onMounted(() => {
            danmaku()
        })

        //抢购成功的用户 弹幕
        const buySuccessData = computed(() => {
            return store.state.buySuccessMember
        })

        const danmaku = () => {
            clearInterval(state.timer)
            let mainDom = document.getElementsByClassName('buy_success_member_warp')[0].getBoundingClientRect()
            state.lineCount = parseInt((window.innerHeight - mainDom.height - 200) / 100 || 0)
            state.danmakuBottom = mainDom.height + mainDom.top
            

        
            state.timer = setInterval(()=>{
                if(!state.list.length) return
                findLstRightDistance().then(res => {
                    if(!res) return
                    let item = state.list.shift()
                    if(item){
                        item.danmakuId = state.danmakuId
                        state.danmakulist.push(item)
                        state.danmakuId = state.danmakuId + 1
                        nextTick(() => {
                            playJxmsSounds.value('./sounds/buy_success.mp3')
                        })
                        deleteDanmaku()
                    }
                })
            }, 100)
        }

        //获取最后一个弹幕 right的距离
        const findLstRightDistance = () => {
            return new Promise((resolve) => {
                if(!state.danmakulist.length) resolve(true)
                let right = 0
                let query = document.getElementsByClassName(`danmaku_${state.danmakuId - 1}`)[0]
                if(query){
                    right = query.getBoundingClientRect().right
                    if(windowWidth - right > 20){
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                }else{
                    resolve(true)
                }     
            })
        }

        //6秒后删除弹幕
        const deleteDanmaku = () => {
            setTimeout(() => {
                // state.danmakulist.splice(0, 1)
                state.hideCount += 1
            }, 6 * 1000);
        }

        //监听抢购成功 通知
        watch(buySuccessData, (newData, oldData) => {
            state.list.push({
                ...newData,
                price: priceFormat(newData.price)
            })
        })

        onUnmounted(() => {
            clearInterval(state.timer)
        })

        const state = reactive({
            danmakuId: 0,
            timer: undefined,
            list: [],   // 普通的弹幕队列
            danmakulist: [], // 当前正在执行的
            hideCount: 0
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .buy_success_member_warp{
        height: 400px;
        width: 100%;
        position: absolute;
        bottom: -30px;
        left: 0;
        z-index: 999;
        overflow: hidden;

        .item{
            width: 860px;   
            height: 390px;
            position: absolute;
            bottom: 0;
            left: 0;
            background: url('../images/member_card.png') no-repeat center;
            background-size: 100% 100%;
            animation: right2left 6s ease-in both;
            
            .content{
                padding: 55px 84px 58px 55px;
                display: flex;

                .member_img{
                    margin: 14px 23px 0 32px;
                    width: 156px;
                    height: 156px;
                    border-radius: 50%;
                    background: url('../images/head_border.png') center no-repeat;
                    background-size: 100% 100%;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    img{
                        width: 137px;
                        height: 137px;
                        border-radius: 50%;
                    }
                }

                .member_right{
                    width: 500px;
                    padding-top: 24px;

                    .name{
                        font-size: 50px;
                        font-weight: bold;
                        color: #4a2453;
                        padding-bottom: 15px;
                    }

                    .price{
                        font-size: 35px;
                        color: #4a2453;
                    }

                    .buy_success{
                        font-size: 80px;
                        font-weight: bold;
                        color: #fff;
                        padding: 36px 0 0 90px;
                    }
                }
            }

            @keyframes right2left {
                0% {transform: translate(100vw)}
                10% {transform: translate(0)}
                90% {opacity: 1}
                100% {opacity: 0}
            }
        }

       
    }
</style>