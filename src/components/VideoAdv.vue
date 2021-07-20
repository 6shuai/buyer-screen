<template>
    <div 
        class="video_adv_wrap"
        :style="{ transition: `all .5s ease-in-out ${showAdvVideo ? '.3s' : '0s'}` }"
        :class="{ show: showAdvVideo }"
    >
        <video id="video" :autoplay="showAdvVideo" :src="videoUrl"></video>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed, watch } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(props) {
        const store = useStore()

        //是否显示视频
        const showAdvVideo = computed(() => {
            return store.state.showAdvVideo
        })

        //播放视频
        const videoPlay = () => {
            console.log(state.resData.goods.video)
            state.videoUrl = state.resData.goods.video[state.currentVideoIndex].url
        } 

         //猜价通知
         watch(showAdvVideo, (newData, oldData) => {
            var elevideo = document.getElementById("video");
            if(newData){
                state.resData = store.state.goodsDataDetail

                let num = state.resData.preheatTime
                videoPlay()
                if(state.videoUrl) elevideo.play()
                elevideo.addEventListener('ended', () => { //结束.
                    let videoTotal = state.resData.goods.video.length
                    console.log('视频播放结束')
                    state.currentVideoIndex = state.currentVideoIndex + 1 >= videoTotal ? 0 : state.currentVideoIndex + 1
                    videoPlay()
                }, false);
            }else{
                elevideo.pause()
            }
        })


        const state = reactive({
            showAdvVideo,
            videoUrl: '',
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