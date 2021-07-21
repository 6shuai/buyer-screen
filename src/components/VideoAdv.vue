<template>
    <div 
        class="video_adv_wrap"
        :style="{ transition: `all .5s ease-in-out ${showAdvVideo ? '.3s' : '0s'}` }"
        :class="{ show: showAdvVideo }"
    >
        <video id="video" :autoplay="showAdvVideo" :loop="isLoop" :src="videoUrl"></video>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed, watch, nextTick } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(props) {
        const store = useStore()

        //抢购状态
        const gameState = computed(() => {
            return store.state.gameState
        })

        //是否显示视频
        const showAdvVideo = computed(() => {
            return store.state.showAdvVideo
        })
        
        //显示明日宝贝
        const showTomorrowGoods = computed(() => {
            return store.state.showTomorrowGoods
        })

        //播放视频
        const videoPlay = () => {
            // state.videoUrl = state.resData.goods.video[state.currentVideoIndex].url
            state.videoUrl = 'https://static.xfengjing.com/video/2021/07/18/b90a8065-143f-4ed8-837b-28b35aa2462f.mp4'
            var elevideo = document.getElementById("video");

            nextTick(() => {
                elevideo.play()
            })

            if(state.showTomorrowGoods || state.gameState == 0){
                state.isLoop = true
                return
            }
            // state.isLoop = false
            setTimeout(() => {
                store.state.showAdvVideo = false
            }, 15 * 1000);
        } 

         //猜价通知
         watch(showAdvVideo, (newData, oldData) => {
            var elevideo = document.getElementById("video");
            if(newData){
                state.resData = store.state.goodsDataDetail

                let num = state.resData.preheatTime
                videoPlay()
                // elevideo.addEventListener('ended', () => { //结束.
                //     let videoTotal = state.resData.goods.video.length
                //     console.log('视频播放结束')
                //     state.currentVideoIndex = state.currentVideoIndex + 1 >= videoTotal ? 0 : state.currentVideoIndex + 1
                //     videoPlay()
                // }, false);
            }else{
                elevideo.pause()
            }
        })


        const state = reactive({
            gameState,
            showAdvVideo,
            showTomorrowGoods,
            videoUrl: '',
            isLoop: true,
            currentVideoIndex: 0,
            resData: {},
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


        video{
            width: 1168px;
            height: 648px;
            object-fit: fill;
            margin-top: -34px;
        }
    }
</style>