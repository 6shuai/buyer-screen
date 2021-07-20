<template>
    <div class="warning_wrap">
        <div class="warning_img_wrap">
            <img src="../images/warning.png">
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(props) {
        const store = useStore()
        onMounted(() => {
            setTimeout(() => {
                store.state.showWarning = false
            }, 4000);  
        })
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
        animation: shadowAnim .5s linear both;
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