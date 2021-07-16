<template>
    <div class="danmaku_wrap">
        <div class="text">
            对宝贝不感兴趣?没关系,参与宝贝猜价可能赢得现金奖励哦!
        </div>

        <!-- <div class="danmaku_list">
            <div 
                class="item"
                v-for="(item, index) in danmakulist"
                :key="index"
                :class="`danmaku_${index}`"
            >
                <div class="head_img"><img src=""></div>
                <div class="name">{{ item.name }}</div>
                <div class="price">
                    <span v-if="false">猜对4位:<span class="num cash">赢得现金￥4.31</span></span>
                    <span>已报价:<span class="num">1,2???</span></span>
                </div>
            </div>
        </div> -->

    </div>

</template>

<script>
import { reactive, toRefs, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(props) {
        const windowWidth = window.innerWidth
        const store = useStore()

        // 游戏状态
        const gameState = computed(() => {
            return store.state.gameState
        })

        onMounted(() => {
        //    danmaku() 

            setTimeout(() => {
                state.list.push({ name: 'madongmei' })
                setTimeout(() => {
                    state.list.push({ name: 'madongmei222' })
                    setTimeout(() => {
                        state.list.push({ name: 'madongmei3333' })
                        setTimeout(() => {
                            state.list.push({ name: 'madongmei4444' })
                        }, 100);
                    }, 100);
                }, 1000);
            }, 1000);
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

        const state = reactive({
            list: [],   // 普通的弹幕队列
            danmakulist: [], // 当前正在执行的
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

            .item{
                position: absolute;
                left: 0;
                height: 80px;
                line-height: 80px;
                font-size: 35px;
                padding: 10px 0;
                animation: danmakuAnim 10s linear both;

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
                }
            }


            @keyframes danmakuAnim {
                0% {transform: translate(100vw)}
                100% {transform: translate(-100%);}
            }
        }
    }
</style>