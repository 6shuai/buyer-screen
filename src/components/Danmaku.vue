<template>
    <!-- 猜价 抢购成功 弹幕 -->
    <div class="danmaku_wrap">
        <div class="danmaku_item danmaku_animation" 
            v-for="(item, index) in danmakulist" 
            :class="`danmaku_${index}`"
            :style="{ 
                top: item.line <= lineCount / 2 ? (item.line-1) * 100 + 'px' : danmakuBottom + (item.line-1 - parseInt(lineCount / 2)) * 100 + 'px',
            }"
            :key="index"
        >
            <div 
                class="buy_success_member"
                :class="{
                    guess_price: item.type == 1,
                    guess_price_red_envelope: item.type == 2
                }"
            >
                <img :src="item.avatar" class="member_head_img" />
                <div class="member_info">
                    <div class="title text_overflow">
                        <text class="name">{{ item.nickName }}</text>
                        <text class="desc" v-if="item.type==1">已猜价</text>
                        <text class="desc" v-if="item.type==2">猜对{{ item.correctDigit }}位</text>
                        <text class="desc" v-if="item.type==3">抢到宝贝</text>
                    </div>
                    <div class="number_warp text_heavy">
                        <span class="red_envelope" v-if="item.type==2">获得红包</span>
                        <text class="price_before text_size_12"
                            >￥</text
                        >
                        <text class="price_num"
                            >{{ item.price.int }}</text
                        >
                        <text class="price_after"
                            >{{ item.price.decimals }}</text
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { reactive, toRefs, onMounted, computed, watch } from 'vue'
import { priceFormat } from '../util/index'
import { useStore } from 'vuex'

export default {
    setup(props) {
        const windowWidth = window.innerWidth
        const store = useStore()

        onMounted(() => {
            danmaku()
        })

        //抢购成功的用户 弹幕
        const buySuccessData = computed(() => {
            return store.state.buySuccessMember
        })

        //猜价成功 获得红包的用户  弹幕
        const guessPriceData = computed(() => {
            return store.state.guessPriceMemberList
        })

        //猜价通知
        const guessNotice = computed(() => {
            return store.state.guessNotice
        })

        const danmaku = () => {
            clearInterval(state.timer)
            let mainDom = document.getElementsByClassName('main_wrap')[0].getBoundingClientRect()
            state.lineCount = parseInt((window.innerHeight - mainDom.height - 200) / 100 || 0)
            state.danmakuBottom = mainDom.height + mainDom.top
            

            if(state.idx > state.lineCount) state.idx = state.lineCount
        
            state.timer = setInterval(()=>{
                if(!state.list.length) return
                findLstRightDistance().then(res => {
                    if(!res) return
                    let item = state.list.shift()
                    if(item){
                        item.line = state.idx
                        state.idx = (state.idx % state.lineCount + 1)
                        state.danmakulist.push(item)
                        console.log(item)
                    }
                })
            }, 500)
        }

        //获取最后一个弹幕 right的距离
        const findLstRightDistance = () => {
            return new Promise((resolve) => {
                if(!state.danmakulist.length) resolve(true)
                let right = 0
                let query = document.getElementsByClassName(`danmaku_${state.danmakulist.length-1}`)[0]
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

        //监听抢购成功 通知
        watch(buySuccessData, (newData, oldData) => {
            state.list.push({
                ...newData,
                type: 3,
                price: priceFormat(newData.price)
            })
        })

        //猜价结果 通知
        watch(guessPriceData, (newData, oldData) => {
            newData.forEach(item => {
                state.list.push({
                    ...item,
                    type:2,
                    price: priceFormat(item.award)
                })
            })
        })

        //猜价通知
        watch(guessNotice, (newData, oldData) => {
            state.list.push({
                ...newData,
                type: 1,
                price: priceFormat(newData.price) 
            })
        })

        const state = reactive({
            timer: undefined,
            lineCount: null,        //弹幕总共分多少行
            danmakuBottom: null,    //底部的弹幕 距离顶部的距离
            list: [],   // 普通的弹幕队列
            danmakulist: [], // 当前正在执行的
            idx: 2,
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    @import url('../variables.less');

    .danmaku_wrap{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99999999;
        width: 100%;
        height: 100%;
        position: relative;
    }
    .danmaku_item{
        height: 103px;
        white-space: nowrap;
        user-select: none;
        position: absolute;
        top:0;
        left:0;
    }
    .danmaku_item.data_line_1{
        top: 10px
    }
    .danmaku_item.data_line_2{
        top: 60px
    }
    .danmaku_item.data_line_3{
        top: 120px
    }
    .danmaku_item.data_line_4{
        top: 180px
    }
    .danmaku_item.data_line_5{
        top: 200px
    }
    .danmaku_animation{
        animation: right2left 10s linear both;
    }

    @keyframes right2left {
        0% {transform: translate(100vw)}
        100% {transform: translate(-100%);}
    }


    .buy_success_member{
        height: 103px;
        padding-right: 49px;
        overflow: hidden;
        border-radius: 52px;
        background: #B06D60;
        box-shadow: 0px 0px 24px rgba(0,0,0,0.2);
        box-shadow: 0px 0px 8px rgba(0,0,0,0.2), inset -1px -1px;

        .member_head_img{
            width: 79px;
            height: 79px;
            border: 3px solid #F2F2F2;
            border-radius: 50%;
            margin: 9px;
            display: inline-block;
            vertical-align: top;
        }

        .member_info{
            padding: 6px 0 6px 3px;
            display: inline-block;

            .title{
                font-size: 24px;
                line-height: 33px;
                padding-top: 2px;
                
                .name{
                    color: @color_lightgray;
                }
            }
            
            .number_warp{
                font-size: 42px;
                line-height: 58px;

                .price_after{
                    font-size: 36px;
                }

                .red_envelope{
                    font-size: 36px;
                    padding-right: 3px;
                }
            }

            
            .desc{
                margin-left: 6px;
                padding-left: 6px;
                color: @color_primary;
            }

        }

        &.guess_price{
            background: #6834BB;

            .member_info .title .desc{
                color: @color_info;
            }

            .number_warp{
                color: @color_info;
            }
            
            .desc{
                color: @color_info;
            }
        }

        &.guess_price_red_envelope{
            background: #942A61;

            .member_info .title .desc{
                color: @color_info;
            }

            .number_warp{
                color: @color_info;
            }
            
            .desc{
                color: @color_info;
            }
        }
    }
</style>