<template>
    <div 
        class="guide_wrap"
        :style="{ transition: `all .5s ease-in ${ showGuide ? '.3s' : '0s' }` }"
        :class="{ show: showGuide && guideStep == 1 }"
    >
        <img src="../images/guide_01.png">
    </div>

    <div 
        class="guide_wrap"
        :style="{ transition: `all .5s ease-in ${ showGuide ? '.3s' : '0s' }` }"
        :class="{ show: showGuide && guideStep == 2 }"
    >
        <img src="../images/guide_02.png">
    </div>

    <div 
        class="guide_wrap"
        :style="{ transition: `all .5s ease-in ${ showGuide ? '.3s' : '0s' }` }"
        :class="{ show: showGuide && guideStep == 3 }"
    >
        <img src="../images/guide_03.png">
    </div>


    <div class="guide_subtitle text_medium" v-if="guideStep">
        <p>{{ guideText[guideTextIndex].text }}</p>
    </div>

</template>

<script>
import { reactive, toRefs, computed, watch } from 'vue'
import { useStore } from 'vuex'

export default {
    setup(props) {
        const store = useStore()

        const text = {
            //开始前每次广告播放结束后
            beforeText: [
                { text: '猜价赢奖金，低价抢好物！这里是全国首款线下大型降价抢购互动，极限买手。', duration: 7 },
                { text: '我们的抢购活动马上开始， 赶快扫码参与，不要错过心仪的宝贝哦！', duration: 5 }
            ],

            //猜价开始前10秒
            guessBefore: [
                { text: '大家好，欢迎参加全国首款线下大型降价抢购互动，极限买手！', duration: 5 },
                { text: '当前宝贝的猜价马上开始，快掏出你的手机扫码参与吧！', duration: 5 },
            ],

            //猜价阶段 插入广告前
            advPlayBefore: [
                { text: '猜价正在紧张进行中，大家一起看段视频，了解下当前宝贝吧~', duration: 4 },
            ],

            //猜价阶段 插入广告后  ⼴告切回⾄宝贝信息
            advPlayEnd: [
                { text: '大家好，欢迎回到极限买手！', duration: 2 },
                { text: '现在进行的是极限买手的猜价阶段', duration: 3 }
            ],

            //倒计时开始前
            countDownBefore: [
                { text: '那么，各位准备好了吗？倒计时', duration: 2 }
            ],

            //抢购开始
            panicBuyStart: [
                { text: '宝贝抢购，现在开始！', duration: 2 }
            ],

            //库存紧张（闪屏动画播放完成后）
            inventoryWarning: [
                { text: '宝贝库存不多了！还没下手的朋友们快抓紧时机抢购吧！', duration: 4 }
            ],

            //库存紧张（闪屏动画播放完成后）
            inventoryWarning2: [
                { text: '当前的宝贝价格已经非常优惠了！还在犹豫的朋友，要赶快下单了哦~', duration: 5 }
            ],

            //库存紧张（闪屏动画播放完成后）
            inventoryWarning3: [
                { text: '现在已经进入了宝贝抢购的高峰期，还不下单就要错过抢购机会了哦！', duration: 5 }
            ],

            //第一个宝贝已被抢走
            firstBuy : [
                { text: '本场第一个宝贝已被抢走！让我们恭喜这位朋友！', duration: 3 }
            ],

            //抢购结束  宝贝售罄了
            panicBuyEnd: [
                { text: '本场宝贝售罄了！让我们恭喜本场的极限秒杀王~', duration: 4 }
            ],

            //排行榜出现, （后面还有宝贝）
            showRank01: [
                { text: '以下是本场宝贝的抢购结果。你抢到自己心仪的宝贝了吗？', duration: 4 },
                { text: '不要走开，后面还有更多宝贝等你抢购，下一个宝贝马上开始！', duration: 5 }
            ],

            //排行榜出现, （后面没有宝贝）-
            showRank02: [
                { text: '以下是本场宝贝的抢购结果。你抢到自己心仪的宝贝了吗？', duration: 4 }
            ],

            //活动结束 （明天还有宝贝）
            gameOver01: [
                { text: '朋友们，今天抢购已经结束了。明天还有更多宝贝等你抢哦~', duration: 4 },
                { text: '记得扫描大屏上的二维码关注小风景科技公众号和极限买手小程序', duration: 7 },
                { text: '祝你在极限买手以最心动的价格抢到最喜欢的宝贝，各位购物愉快！', duration: 5 }
            ],

            //活动结束 （明天没有宝贝）
            gameOver02: [
                { text: '朋友们，今天抢购已经结束了。想参与更多宝贝的抢购活动吗？', duration: 5 },
                { text: '扫描大屏上的二维码关注小风景科技公众号和极限买手小程序', duration: 5 },
                { text: '实时关注极限买手的抢购宝贝和活动时间', duration: 3 },
                { text: '祝你在极限买手以最心动的价格抢到最喜欢的宝贝，各位购物愉快！', duration: 6 }
            ],

            // 猜价阶段开始
            guessStart: [
                { text: '宝贝猜价阶段，现在开始！', duration: 2 }
            ],

            //猜价教学
            guideText1: [
                { text: '在猜价阶段，扫描屏幕上的二维码', duration: 3 },
                { text: '你可以在极限买手小程序内竞猜当前宝贝的「极限秒杀价」',duration: 4 },
                { text: '即当前宝贝最后一个库存的抢购价格',duration: 3 },
                { text: '猜对一定位数就能平分相应的现金',duration: 3 },
                { text: '猜对的位数越多，奖金越丰厚！',duration: 2 },
                { text: '别犹豫了，赶快扫码加入吧！',duration: 2 }
            ],

            //抢购教学开始前
            panicBuyBefore : [
                { text: '猜价阶段即将结束，还没有参与朋友们请抓紧扫码参与',duration: 4 },
                { text: '已经参与的朋友们千万不要走开，激动人心的抢购即将开始！',duration: 5 },
                { text: '首先请由我介绍一下抢购的游戏规则',duration: 3 }
            ],

            //抢购教学
            guideText2: [
                { text: '抢购是极限买手的核心玩法',duration: 2 },
                { text: '在这里你有可能在任意价格买到你梦寐以求的宝贝！',duration: 4 },
                { text: '抢购阶段开始后',duration: 2 },
                { text: '当前宝贝会立刻从官方零售价开始实时降价！',duration: 2 }, 
                { text: '没错，是降价！',duration: 2 },
                { text: '每分钟降低一定折扣',duration: 2 },
                { text: '降价期间你在任意时间以当前折扣价格购买本宝贝',duration: 4 },
                { text: '注意！极限买手中唯一未知的是每场宝贝的库存数量',duration: 5 },
                { text: '所以，你要做的就是在宝贝被抢光前尽可能以满意的价格抢到宝贝~', duration: 5 }
            ]

        }

        
        //显示教学
        const showGuide = computed(() => {
            return store.state.showGuide
        })

        const guideStep = computed(() => {
            return store.state.guideStep
        })

        //教学字幕
        const showGuideText = (value) => {
            switch (state.guideStep) {
                case 1:
                case 2:
                    state.guideText = text.guideText1
                    break;
                case 3:
                    state.guideText = text.guideText2
                    break;
                default:
                    state.guideText = text[state.guideStep]
                    break;
            }


            if(state.guideTextIndex > state.guideText.length - 1){
                store.commit('SET_VOICE_CAPTION', null)
                store.state.showGuide = false
                clearTimeout(state.timer)
                return
            }
            
            state.timer = setTimeout(() => {

                state.guideTextIndex += 1
                
                showGuideText()
            }, state.guideText[state.guideTextIndex].duration  * 1000);
        }

        watch(showGuide, (newdState, oldState) => {
            if(newdState){
                clearTimeout(state.timer)
                state.guideTextIndex = 0
                showGuideText()
            }            
        })

        watch(guideStep, (newProp, oldProp) => {
            if(newProp && typeof newProp=='string'){
                clearTimeout(state.timer)
                state.guideTextIndex = 0
                showGuideText()
            }
        })

        const state = reactive({
            guideText: '',
            guideTextIndex: 0,
            showGuide,
            guideStep
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .guide_wrap{
        width: 1324px;
        height: 790px;
        background: url('../images/video_bg.png') center no-repeat;
        background-size: 100% 100%;
        position: absolute;
        z-index: 99;
        top: 6%;
        left: 50%;
        margin-left: -662px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateY(-100vh);

        &.show{
            transform: translateY(0);
        }


        img{
            width: 1168px;
            height: 648px;
            margin-top: -34px;
        }
    }

    .guide_subtitle{
        font-size: 50px;
        color: #fff;
        text-align: center;
        position: absolute;
        bottom: 450px;
        width: 100%;
        display: flex;
        justify-content: center;
        z-index: 9999;
        
        p{
            display: inline-block;
            text-align: center;
            padding: 10px 25px;
            -webkit-text-stroke-color: #4a2453;
            -webkit-text-stroke-width: 2px;
        }
    }
</style>