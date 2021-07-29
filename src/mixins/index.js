
import { reactive, toRefs, onUnmounted } from "vue"
import { useStore } from 'vuex'
import {Howl, Howler} from 'howler'

export default function () {
    
    const store = useStore()

    //每个状态 搁二十秒播放一次视频  duration = -1 无限次循环播放
    const videoPlay = (duration) => {
        clearTimeout(state.playTimer)
        clearTimeout(state.videoTimer)
        // if(duration / 35 >= 1){
        if (duration > 35 || duration == -1) {
            state.playTimer = setTimeout(() => {
                store.state.showAdvVideo = true
                state.videoTimer = setTimeout(() => {
                    videoPlay(duration == -1 ? duration : duration - 35)
                }, 15000);
            }, 20 * 1000)
        }
    }

    //清除定时器
    const clearTimer = () => {
        clearTimeout(state.playTimer)
        clearTimeout(state.videoTimer)
    }

    //播放背景音乐
    const playJxmsBgm = (src, loop = true, autoplay = true, volume = 1, call) => {
        if(src) state.bgmUrl = src
        try {
            state.jxmsAudio.unload()
        } catch (error) {
            
        }
        state.jxmsAudio = new Howl({
            src: [src || state.bgmUrl],
            autoplay,
            loop,
            volume,
            onend: function() {
                if(call){
                    console.log('Finished!');
                    call()
                }
            }
        })
    }

    //关闭背景音乐
    const pauseJxmsBgm = () => {
        state.jxmsAudio.fade(1, 0, 1500)
    }

    //播放音效
    const playJxmsSounds = (src, call) => {
        try {
            state.jxmsSounds.unload()
        } catch (error) {
            
        }
        state.jxmsSounds = new Howl({
            src: [src || state.bgmUrl],
            autoplay: true,
            loop: false,
            volume: 1,
            onend: function() {
                if(call){
                    console.log('Finished!');
                    call()
                }
            }
        })
    }

    onUnmounted(() => {
        clearTimer()
    })


    const state = reactive({
        playTimer: undefined,
        videoTimer: undefined,
        videoPlay,
        clearTimer,
        bgmUrl: '',
        jxmsAudio: undefined,
        jxmsSounds: undefined,
        playJxmsBgm,
        pauseJxmsBgm,
        playJxmsSounds
    })

    return toRefs(state)
}