<template>
    <div class="mimiview_wrap">

        <div class="hight_bottom"></div>

        <div class="miniview_02"></div>

        <!-- <div class="miniview_02"></div> -->

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
        position: relative;;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .hight_bottom{
            position: absolute;
            width: 3885px;
            height: 3885px;
            bottom: -160%;
            left: -10%;
            background: url('../images/miniview_01.png') center no-repeat;
            background-size: 3885px 3885px;
            z-index: 90;
            // animation: hightAnim 3s linear infinite;
        }

        .miniview_02{
            position: absolute;
            width: 100%;
            height: 100%;
            background: url('../images/miniview_02.png') center no-repeat;
            background: auto 100%;
            z-index: 92;
        }


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