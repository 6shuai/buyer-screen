<template>
    <div class="warning_wrap" v-if="show">
        <div class="warning_img_wrap">
            <img src="../images/warning.png">
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed, watch, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import mixin from '../mixins/index'
import {Howl, Howler} from 'howler'

export default {
    setup(props) {
        const store = useStore()
        const { playJxmsSounds } = mixin()

        onMounted(() => {
            state.warningAudio = new Howl({
                src: ['./sounds/warning.mp3'],
                onend: function() {
                    store.commit('SET_VOICE_CAPTION', 'inventoryWarning')

                    
                    state.warningEndAudio.play()

                }
            })

            state.warningEndAudio = new Howl({
                src: ['./voice/02_04.mp3'],
                onend: function() {
                    store.state.showWarning = false
                }
            })

            //正在播放广告时, 等待广告播放结束后,  播放警告视效和音效
            if(!store.state.showAdvVideo){
                init()
            }else{
                state.show = false
            }


        })


        const init = () => {
            state.show = true

            state.warningAudio.play()
        }
        

        //是否显示视频
        const showAdvVideo = computed(() => {
            return store.state.showAdvVideo
        })

        watch(showAdvVideo, (newProp, oldProp) => {
            if(newProp){
                
                //显示警告状态时, 插入广告,关闭警告音效,保留警告效果
                state.warningAudio.fade(1, 0, 1000)
                try {
                    state.warningEndAudio.fade(1, 0, 1000)
                } catch (error) {
                    console.log(error)
                }
            }else if(!newProp && store.state.showWarning){
                
                init()
            }
        })

        onUnmounted(() => {
            state.warningAudio.fade(1, 0, 1000)
            try {
                state.warningEndAudio.fade(1, 0, 1000)
            } catch (error) {
                
            }
        })


        const state = reactive({
            show: false,
            showAdvVideo,
            warningAudio: null,
            warningEndAudio: null
        })
        
        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .warning_wrap{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99999;
        animation: shadowAnim .5s ease-in both;
        animation-iteration-count: infinite;
        // box-shadow:inset 0px 0px 100px 40px red;

        .warning_img_wrap{
            width: 100%;
            text-align: center;

            img{
                display: inline-block;
            }
        }


        @keyframes shadowAnim {
            0%{
                box-shadow: inset 0px 0px 100px 40px rgba(255, 0, 0, 0.2);
            }
            75%{
                box-shadow:inset 0px 0px 100px 40px red;
            }
            100%{
                box-shadow:inset 0px 0px 100px 40px rgba(255, 0, 0, 0.5);
            }
        }
        
    }
</style>