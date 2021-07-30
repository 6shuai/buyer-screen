<template>
    <div 
        class="video_adv_wrap"
        :style="{ transition: `all .5s ease-in ${ showGuide ? '.3s' : '0s' }` }"
        :class="{ show: showGuide && guideStep == 1 }"
    >
        <img src="../images/guide_01.png">
    </div>

    <div 
        class="video_adv_wrap"
        :style="{ transition: `all .5s ease-in ${ showGuide ? '.3s' : '0s' }` }"
        :class="{ show: showGuide && guideStep == 2 }"
    >
        <img src="../images/guide_02.png">
    </div>

    <div 
        class="video_adv_wrap"
        :style="{ transition: `all .5s ease-in ${ showGuide ? '.3s' : '0s' }` }"
        :class="{ show: showGuide && guideStep == 3 }"
    >
        <img src="../images/guide_03.png">
    </div>


    <div class="guide_text" v-if="showGuide">{{ guideText[guideTextIndex].text }}</div>

</template>

<script>
import { reactive, toRefs, computed, watch } from 'vue'
import { useStore } from 'vuex'

export default {
    setup(props) {
        const store = useStore()
        // 在猜价阶段，扫描屏幕上的⼆维码，你可以在极限买⼿⼩程序内竞猜当前宝⻉的「极限秒杀价」，即当前宝
        // ⻉最后⼀个库存的抢购价格。猜对⼀定位数就能平分相应的现⾦。猜对的位数越多，奖⾦越丰厚！别犹豫
        // 了，赶快扫码加⼊吧！


        // 抢购是极限买⼿的核⼼玩法。在这⾥你有可能在任意价格买到你梦寐以求的宝⻉！抢购阶段开始后，当前宝
        // ⻉会从⽴刻从官⽅零售价开始实时降价！没错，是降价！每分钟降低⼀定折扣。降价期间你在任意时间以当
        // 前折扣价格购买本宝⻉。注意！极限买⼿中唯⼀未知的是每场宝⻉的库存数量。所以，你要做的就是在宝⻉
        // 被抢光前尽可能以满意的价格抢到宝⻉~

        const guideText = [
            { text: '在猜价阶段，扫描屏幕上的⼆维码', duration: 3 },
            { text: '你可以在极限买⼿⼩程序内竞猜当前宝⻉的「极限秒杀价」',duration: 5 },
            { text: '即当前宝⻉最后⼀个库存的抢购价格',duration: 4 },
            { text:  '猜对⼀定位数就能平分相应的现⾦',duration: 3 },
            { text: '猜对的位数越多，奖⾦越丰厚！',duration: 3 },
            { text: '别犹豫了，赶快扫码加⼊吧！',duration: 4 },
            { text: '抢购是极限买⼿的核⼼玩法',duration: 3 },
            { text: '在这⾥你有可能在任意价格买到你梦寐以求的宝⻉！',duration: 4 },
            { text: '抢购阶段开始后',duration: 2 },
            { text: '当前宝会从⽴刻从官⽅零售价开始实时降价！',duration: 4 }, 
            { text: '没错，是降价！',duration: 1 },
            { text: '每分钟降低⼀定折扣',duration: 2 },
            { text: '降价期间你在任意时间以当前折扣价格购买本宝⻉',duration: 5 },
            { text: '注意！极限买⼿中唯⼀未知的是每场宝⻉的库存数量',duration: 6 },
            { text: '所以，你要做的就是在宝⻉被抢光前尽可能以满意的价格抢到宝⻉~', duration: 6 }
        ]


        
        //显示教学
        const showGuide = computed(() => {
            return store.state.showGuide
        })

        const guideStep = computed(() => {
            return store.state.guideStep
        })

        //教学字幕
        const showGuideText = () => {
            state.timer = setTimeout(() => {
                state.guideTextIndex += 1

                if(state.guideTextIndex >= guideText.length){
                    clearTimeout(state.timer)
                    return
                }

                showGuideText()
            }, state.guideText[state.guideTextIndex].duration * 1000);
        }

        watch(showGuide, (newdState, oldState) => {
            if(showGuide){
                clearTimeout(state.timer)
                state.guideTextIndex = 0
                showGuideText()
            }            
        })

        const state = reactive({
            guideText,
            guideTextIndex: 0,
            showGuide,
            guideStep
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .video_adv_wrap{
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
        transform: translateY(-106%);

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
        width: 100%;
        bottom: 450px;
        text-align: center;
    }
</style>