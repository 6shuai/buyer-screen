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


    <div class="guide_text" v-if="guideStep">
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
                { text: '猜价赢奖⾦，低价抢好物！这⾥是全国⾸款线下⼤型降价抢购互动，极限买⼿。', duration: 9 },
                { text: '我们的抢购活动⻢上开始， 赶快扫码参与，不要错过⼼仪的宝⻉哦！', duration: 5 }
            ],

            //猜价开始前10秒
            guessBefore: [
                { text: '⼤家好，欢迎参加全国⾸款线下⼤型降价抢购互动，极限买⼿！', duration: 6 },
                { text: '当前宝⻉的猜价⻢上开始，快掏出你的⼿机扫码参与吧！', duration: 5 },
            ],

            //猜价阶段 插入广告前
            advPlayBefore: [
                { text: '猜价正在紧张进⾏中，还没有参与的⼈快扫码猜价吧！', duration: 5 },
                { text: '已经猜价的朋友们请看个⼴告休息⼀下~', duration: 3 }
            ],

            //猜价阶段 插入广告后  ⼴告切回⾄宝⻉信息
            advPlayEnd: [
                { text: '⼤家好，欢迎回到极限买⼿！现在进⾏的极限买⼿的猜价阶段。', duration: 6 }
            ],

            //倒计时开始前
            countDownBefore: [
                { text: '那么，各位准备好了吗？倒计时', duration: 3 }
            ],

            //抢购开始
            panicBuyStart: [
                { text: '宝⻉抢购，现在开始！', duration: 3 }
            ],

            //库存紧张（闪屏动画播放完成后）
            inventoryWarning: [
                { text: '宝⻉库存不多了！还没下⼿的朋友们快抓紧时机抢购吧！', duration: 4 }
            ],

            //抢购结束  宝⻉售罄了
            panicBuyEnd: [
                { text: '本场宝⻉售罄了！让我们恭喜本场的极限秒杀王~', duration: 4 }
            ],

            //排行榜出现, （后⾯还有宝⻉）
            showRank01: [
                { text: '以下是本场宝⻉的拍卖结果。你抢到⾃⼰⼼仪的宝⻉了吗？', duration: 4 },
                { text: '不要⾛开，后⾯还有更多宝⻉等你抢购，下⼀个宝⻉⻢上开始！', duration: 7 }
            ],

            //排行榜出现, （后⾯没有宝⻉）-
            showRank02: [
                { text: '以下是本场宝⻉的拍卖结果。你抢到⾃⼰⼼仪的宝⻉了吗？', duration: 4 }
            ],

            //活动结束 （明天还有宝⻉）
            gameOver01: [
                { text: '朋友们，今天抢购已经结束了。明天还有更多宝⻉等你抢哦~', duration: 4 },
                { text: '记得扫描⼤屏上的⼆维码关注⼩⻛景科技公众号和极限买⼿⼩程序', duration: 7 },
                { text: '祝你在极限买⼿以最⼼动的价格抢到最喜欢的宝⻉，各位购物愉快！', duration: 7 }
            ],

            //活动结束 （明天没有宝⻉）
            gameOver02: [
                { text: '朋友们，今天抢购已经结束了。想参与更多宝⻉的抢购活动吗？', duration: 4 },
                { text: '扫描⼤屏上的⼆维码关注⼩⻛景科技公众号和极限买⼿⼩程序', duration: 6 },
                { text: '实时关注极限买⼿的抢购宝⻉和活动时间', duration: 4 },
                { text: '祝你在极限买⼿以最⼼动的价格抢到最喜欢的宝⻉，各位购物愉快！', duration: 6 }
            ],

            // 猜价阶段开始
            guessStart: [
                { text: '宝⻉猜价阶段，现在开始！', duration: 2.6 }
            ],

            //猜价教学
            guideText1: [
                { text: '在猜价阶段，扫描屏幕上的⼆维码', duration: 3 },
                { text: '你可以在极限买⼿⼩程序内竞猜当前宝⻉的「极限秒杀价」',duration: 5 },
                { text: '即当前宝⻉最后⼀个库存的抢购价格',duration: 4 },
                { text:  '猜对⼀定位数就能平分相应的现⾦',duration: 3 },
                { text: '猜对的位数越多，奖⾦越丰厚！',duration: 3 },
                { text: '别犹豫了，赶快扫码加⼊吧！',duration: 4 }
            ],

            //抢购教学开始前
            panicBuyBefore : [
                { text: '猜价阶段即将结束，还没有参与朋友们请抓紧扫码参与',duration: 5 },
                { text: '已经参与的朋友们千万不要⾛开，激动⼈⼼的抢购即将开始！',duration: 5 },
                { text: '⾸先请由我介绍⼀下抢购的游戏规则',duration: 3 }
            ],

            //抢购教学
            guideText2: [
                { text: '抢购是极限买⼿的核⼼玩法',duration: 3 },
                { text: '在这⾥你有可能在任意价格买到你梦寐以求的宝⻉！',duration: 4 },
                { text: '抢购阶段开始后',duration: 2 },
                { text: '当前宝贝会从⽴刻从官⽅零售价开始实时降价！',duration: 4 }, 
                { text: '没错，是降价！',duration: 1 },
                { text: '每分钟降低⼀定折扣',duration: 2 },
                { text: '降价期间你在任意时间以当前折扣价格购买本宝⻉',duration: 5 },
                { text: '注意！极限买⼿中唯⼀未知的是每场宝⻉的库存数量',duration: 6 },
                { text: '所以，你要做的就是在宝⻉被抢光前尽可能以满意的价格抢到宝⻉~', duration: 6 }
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

    .guide_text{
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
            background: rgba(74, 36, 83);
            border-radius: 10px;
        }
    }
</style>