<template>
    <div class="adv_mask">
        <div class="adv_wrap">
            
            <div class="adv_left">
                <div class="card_content" v-if="resData.goods">
                    <div class="adv_goods">
                        <p class="title text_heavy">{{ resData.goods.displayName }}</p>
                        <p class="desc">马上开始</p>
                    </div>
                    <div class="count_down text_heavy">{{ countDownTime }}</div>
                </div>
            </div>

            <div class="adv_center">
                <div class="card_content">
                    <div class="video_wrap">
                        <video 
                            id="video"
                            autoplay
                            :src="videoUrl"
                        ></video>
                    </div>
                </div>
            </div>

            <div class="adv_right">
                <div class="card_content">
                    <div class="qrcode_wrap clear">
                        <div class="qrcode">
                            <img src="../../images/qrcode.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from 'vue'
import RightQrcode from '../RightQrcode.vue'
import { useStore } from 'vuex'
import { translatesToHoursMinutesSeconds } from '../../util/index'
export default {
    props: ['showAdv'],
    setup(props) {
        const store = useStore()

        const show = computed(() => {
            return props.showAdv
        })

        onMounted(() => {
            state.resData = store.state.goodsDataDetail

            let num = state.resData.preheatTime
            countDownFun(num)
            videoPlay()

            var elevideo = document.getElementById("video");
            
            elevideo.addEventListener('ended', () => { //结束.
                let videoTotal = state.resData.goods.video.length
                console.log('视频播放结束')
                state.currentVideoIndex = state.currentVideoIndex + 1 >= videoTotal ? 0 : state.currentVideoIndex + 1
                videoPlay()
            }, false);

        })

        //播放视频
        const videoPlay = () => {
            state.videoUrl = state.resData.goods.video[state.currentVideoIndex].url
            console.log(state.videoUrl)
        } 



        //倒计时
        const countDownFun = (num) => {
            if(num <= 0){
                clearTimeout(state.timer)
                return
            }
            state.countDownTime = translatesToHoursMinutesSeconds(num)
            num -= 1
            state.timer = setTimeout(() => {
                countDownFun(num)
            }, 1000);
        }

        const state = reactive({
            show,
            videoUrl: '',
            currentVideoIndex: 0,
            resData: {},
            countDownTime: '',
            timer: undefined
        })

        return toRefs(state)
    },
    components: {
        RightQrcode
    }

}
</script>

<style lang="less" scope>
    .adv_mask{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 999;

        &:before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(8px);
        }
    }

    .adv_wrap{
        width: 100%;
        height: 398px;
        position: absolute;
        z-index: 999;
        top: 50%;
        transform: translateY(-50%);

        .adv_center{
            width: 64.36%;
            height: 792px;
            background: url('../../images/adv_bg_03.png') no-repeat center;
            background-size: 100% 100%;
            position: absolute;
            left: 17.9%;
            top: -50%;
            margin-top: -10px;

            .card_content{
                // height: 374px;
                position: relative;

                .video_wrap{
                    height: 720px;
                    margin: 36px 10.6%;
                    background: #000;

                    video{
                        width: 100%;
                        height: 100%;
                        object-fit: fill;
                    }
                }
            }
        }

        .adv_left, .adv_right{
            height: 100%;
            position: absolute;
            top: 0;
            z-index: 999;

            .card_content{
                height: 386px;
                margin: 6px 0;
                position: relative;
            }
        }

        .adv_left{
            width: 22%;
            left: 0;
            background: url('../../images/adv_bg_01.png') no-repeat center;
            background-size: 100% 100%;

            .adv_goods{
                padding-top: 79px;
                text-align: center;

                .title{
                    font-size: 48px;
                    line-height: 65px;
                }

                .desc{
                    font-size: 72px;
                    line-height: 86px;
                    padding-top: 6px;
                }
            }

            .count_down{
                font-size: 42px;
                line-height: 58px;
                padding-top: 68px;
                text-align: right;
                margin-right: 18%;
            }
        }

        .adv_right{
            width: 22%;
            right: 0;
            background: url('../../images/adv_bg_02.png') no-repeat center;
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

    .qrcode_wrap{
        padding: 35px 40px 35px 0;
        
        .qrcode{
            float: right;
            width: 316px;
            height: 316px;

            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>