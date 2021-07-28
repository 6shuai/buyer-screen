
import { reactive, toRefs, onUnmounted } from "vue"
import { useStore } from 'vuex'

export default function () {
    
    const store = useStore()

    //每个状态 搁二十秒播放一次视频  duration = -1 无限次循环播放
    const videoPlay = (duration) => {
        clearTimeout(state.playTimer)
        clearTimeout(state.videoTimer)
        // if(duration / 35 >= 1){
        if (duration > 35 ||duration == -1) {
            state.playTimer = setTimeout(() => {
                store.state.showAdvVideo = true
                state.videoTimer = setTimeout(() => {
                    videoPlay(duration - 35)
                }, 15000);
            }, 20 * 1000)
        }
    }

    //清除定时器
    const clearTimer = () => {
        clearTimeout(state.playTimer)
        clearTimeout(state.videoTimer)
    }

    onUnmounted(() => {
        clearTimer()
    })


    const state = reactive({
        playTimer: undefined,
        videoTimer: undefined,
        videoPlay,
        clearTimer
    })

    return toRefs(state)
}