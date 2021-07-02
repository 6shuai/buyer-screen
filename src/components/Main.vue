<template>
    <div class="main_wrap">

        <!-- 阶段提示 -->
        <stage-tip></stage-tip>
        
        <div class="panic_buy_left">
            <div class="card_content">
                <left-goods></left-goods>
            </div>
        </div>

        <div 
            class="panic_buy_center"
            :class="{
                panic_buy: gameState == 3,
                end: gameState == 4,
            }"
        >
            <div class="card_content">

                <!-- 即将开始  倒计时 -->
                <before v-if="!gameState"  @countDown="countDown"></before>

                <!-- 竞猜阶段 -->
                <guess-price 
                    v-if="gameState == 1 || gameState == 2"
                    :gameData="gameData"
                ></guess-price>

                <!-- 抢购阶段 -->
                <panic-buy 
                    v-if="gameState == 3"
                    :gameData="gameData"
                ></panic-buy>

                <!-- 抢购结束 -->
                <panic-buy-end v-if="gameState == 4"></panic-buy-end>

            </div>
        </div>

        <div class="panic_buy_right">
            <div class="card_content">
                <!-- 二维码 -->
                <right-qrcode></right-qrcode>
            </div>
        </div>

        <div class="tip" v-if="!gameState">
            <div class="text">对宝贝不感兴趣？没关系，参与宝贝猜价可能赢得现金奖励哦！</div>
            <div class="arraw"></div>
        </div>

    </div>

    <!-- 背景音乐 -->
	<audio :src="audioUrl" autoplay :loop="isLoop"></audio>

</template>

<script>
import { reactive, toRefs, computed, onMounted, nextTick } from 'vue'
import LeftGoods from './LeftGoods.vue'
import Before from './stage/Before.vue'
import GuessPrice from './stage/GuessPrice.vue'
import PanicBuy from './stage/PanicBuy.vue'
import PanicBuyEnd from './stage/End.vue';
import StageTip from './stage/StageTip.vue'
import RightQrcode from './RightQrcode.vue'

import { useStore } from 'vuex'


export default {
    setup(props) {
        const store = useStore()

        onMounted(() => {
            // playAudio(true, '/static/sounds/before.mp3')  
        })

        //抢购状态
        const gameState = computed(() => {
            switch (store.state.gameState) {
                case 0:
                    state.audioUrl = ''
                    break;
                case 1:
                    state.audioUrl = './sounds/guess.mp3'
                    state.isLoop = true
                    break; 
                case 2:
                    // state.audioUrl = ''
                    break;
                case 3:
                    state.isLoop = true
                    state.audioUrl = './sounds/buying.mp3'
                    break;
                default:
                    break;
            }
            return store.state.gameState
        })

        //倒计时
        const countDown = (e) => {
            if(store.state.gameState == null){
                state.audioUrl = ''
                nextTick(() => {
                    if(e == 'end'){
                        state.audioUrl = './sounds/count_down_end.wav'
                    }else{
                        state.audioUrl = './sounds/count_down_num.wav'
                    }
                    state.isLoop = false
                })
            }
        }

        //抢购详情数据
        const gameData = computed(() => {
            return store.state.goodsDataDetail
        })

        //播放音频
        const playAudio = (isLoop=true, url) => {
            // let audio = document.getElementsByTagName('audio')[0]
            // audio.loop = isLoop
            nextTick(() => {
                state.audioUrl = url
                audio.play()
            })
        }

        //暂停音频
        const pauseAudio = () => {
            let audio = document.getElementsByTagName('audio')[0]
            var playPromise = audio.play();
 
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // 这个时候可以安全的暂停
                    audio.pause();
                })
                .catch(error => {
                
                });
            }
        }

        //是否播放音频
        const hasPlayAudio = () => {
            let audio = document.getElementsByTagName('audio')[0]
            if(audio.paused){
                audio.play()
            }
        }


        const state = reactive({
            gameState,
            gameData,
            audioUrl: './sounds/before.mp3',
            isLoop: true,
            countDown,
            hasPlayAudio
        })

        return toRefs(state)
    },
    components: {
        LeftGoods,
        Before,
        GuessPrice,
        PanicBuy,
        PanicBuyEnd,
        StageTip,
        RightQrcode
    }    
}
</script>

<style lang="less" scope>
    .main_wrap{
        width: 100%;
        height: 398px;
        position: absolute;
        z-index: 99;
        top: 50%;
        transform: translateY(-50%);

        .panic_buy_center{
            width: 36%;
            height: 418px;
            background: url('../images/card_center.png') no-repeat center;
            background-size: 100% 100%;
            margin-left: 38.6%;
            margin-top: -10px;

            .card_content{
                height: 374px;
                padding: 22px 0;
                position: relative;
            }

            &.panic_buy{
                background: url('../images/card_center_02.png') no-repeat center;
                background-size: 100% 414px;
            }

            &.end{
                background: url('../images/card_center_03.png') no-repeat center;
                background-size: 100% 374px;
            }
        }

        .panic_buy_left, .panic_buy_right{
            height: 100%;
            position: absolute;
            top: 0;
            z-index: 99;

            .card_content{
                height: 386px;
                margin: 6px 0;
                position: relative;
            }
        }

        .panic_buy_left{
            width: 42.44%;
            left: 0;
            background: url('../images/card_left.png') no-repeat center;
            background-size: 100% 100%;
        }

        .panic_buy_right{
            width: 29.27%;
            right: 0;
            background: url('../images/card_right.png') no-repeat center;
            background-size: 100% 100%;
        }

        .tip{
            position: absolute;
            top: -60px;
            right: 40px;
            padding: 6px 12px;
            background: rgba(235, 155, 66, 0.6);
            border-radius: 6px;
            font-size: 32px;
            letter-spacing: 0.6px;

            .arraw{
                position: absolute;
                bottom: -15px;
                right: 20px;
                width: 40px;
                height: 15px;
                background: url('../images/arraw.png') center no-repeat;
            }
        }
    }
</style>