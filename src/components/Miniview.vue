<template>
    <div class="mimiview_wrap">
        <div class="miniview_text">
            扫码查看更多宝贝, 不要错过优惠哦!
        </div>

        <!-- <div class="hight_warp">
            <img src="../images/sell_out.png" alt="" srcset="">
        </div> -->
        
    </div>
</template>

<style lang="less" scope>
    .mimiview_wrap{
        background: url('../images/miniview_bg.png') center no-repeat;
        background-size: auto 100%;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        .miniview_text{
            position: absolute;
            left: 0;
            top: 8%;
            width: 100%;
            height: 100%;
            text-align: center;
            font-weight: bold;
            font-size: 60px;
            color: #4a2453;
            z-index: 99;
        }

        .hight_warp{
            position: absolute;
            bottom: 0;
            right: -80px;
            animation: hightAnim 3s linear infinite;
        }
    }

    @keyframes hightAnim {
        0%{ transform: rotate(0deg); }
        100%{ transform: rotate(360deg); }
    }
</style>