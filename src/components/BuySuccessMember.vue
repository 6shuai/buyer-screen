<template>
    <div class="buy_success_member_warp">
        <div 
            class="item" 
            v-for="(item, index) in danmakulist" 
            :key="index"
            :class="`danmaku_${index}`"
            :style="{ marginLeft: index * 50 + 'px' }"
        >
            <div class="content">
                <div class="member_img">
                    <img src="">
                </div>
                <div class="member_right">
                    <p class="name text_overflow">马冬梅{{ item.id }}</p>
                    <p class="price">秒杀价￥1,929.34</p>

                    <div class="buy_success">抢到宝贝!</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
export default {
    setup(props) {
        const windowWidth = window.innerWidth

        onMounted(() => {
            danmaku()

            setTimeout(() => {
                state.list.push({ id: 12 })
                setTimeout(() => {
                    state.list.push({ id: 13 })
                }, 500);
                setTimeout(() => {
                    state.list.push({ id: 14 })
                }, 600);
                setTimeout(() => {
                    state.list.push({ id: 15 })
                }, 630);
                setTimeout(() => {
                    state.list.push({ id: 16 })
                }, 670);
            }, 1000);
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
                    console.log(windowWidth, query.getBoundingClientRect().right)
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

        const state = reactive({
            timer: undefined,
            list: [],   // 普通的弹幕队列
            danmakulist: [], // 当前正在执行的
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
            animation: right2left 5s linear both;
            
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
                100% {transform: translate(0)}
            }
        }

       
    }
</style>