<template>
    <div class="qrcode_wrap clear">
        <div class="qrcode">
            <img src="../images/qrcode.png">
        </div>
        <div class="desc overflow">
            <p>抢宝贝</p>
            <p>赢红包</p>
            <p class="wchat_scan">微信扫一扫</p>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
export default {
    setup(props) {
        const store = useStore()
        
        const gameState = computed(() => {
            return store.state.gameState
        })

        const state = reactive({
            gameState
        })

        return toRefs(state)
    }
}
</script>
<style lang="less" scope>
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

        .desc{
            float: right;
            margin-right: 18px;
            font-size: 48px;
            line-height: 58px;
            text-align: right;

            .wchat_scan{
                padding-top: 145px;
            }
        }
    }
</style>