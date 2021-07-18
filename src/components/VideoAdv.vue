<template>
    <div class="video_adv_wrap">
        <video id="video" autoplay :src="videoUrl"></video>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(props) {
        const store = useStore()

        onMounted(() => {
            state.resData = store.state.goodsDataDetail

            let num = state.resData.preheatTime
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

        const state = reactive({
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

        video{
            width: 1168px;
            height: 648px;
            object-fit: fill;
            margin-top: -34px;
        }
    }
</style>