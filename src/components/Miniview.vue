<template>
    <div class="mimiview_wrap">

        <div class="hight_bottom"></div>

        <div class="miniview_02"></div>
        
        <img src="../images/miniview_03.png" class="miniview_03" />

        <img src="../images/miniview_04.png" class="miniview_04" />

        <div class="miniview_text">
            扫码查看更多宝贝, 不要错过优惠哦!
        </div>

    </div>
</template>

<style lang="less" scope>
    .mimiview_wrap{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .hight_bottom{
            position: absolute;
            width: 3885Px;
            height: 3885Px;
            bottom: -160%;
            left: -15.8%;
            background: url('../images/miniview_01.png') center no-repeat;
            background-size: 3885Px 3885Px;
            z-index: 90;
            animation: hightAnim 30s linear infinite;
        }

        .miniview_02{
            position: absolute;
            width: 100%;
            height: 100%;
            background: url('../images/miniview_02.png') center no-repeat;
            background-size: auto 100%;
            z-index: 92;
        }

        .miniview_03{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 93;
            width: 1423px;
            height: 1244px;
            bottom: -160px;
            left: 50%;
            margin-left: -711.5px;
            animation: shaowAnim .2s ease-in infinite alternate;
        }

        .miniview_04{
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 94;
            width: 1379px;
            height: 1250px;
            bottom: -200px;
            left: 50%;
            margin-left: -689.5px;
        }


        .miniview_text{
            position: absolute;
            left: 0;
            top: 8%;
            width: 100%;
            height: 214px;
            line-height: 160px;
            text-align: center;
            font-weight: bold;
            font-size: 60px;
            color: #4a2453;
            z-index: 99;
            background: url('../images/miniview_text.png') top no-repeat;
            background-size: 1064px 214px;
        }
    }

    @keyframes hightAnim {
        0%{ transform: rotate(0deg); }
        100%{ transform: rotate(360deg); }
    }

    @keyframes shaowAnim {
        0%{ transform: scale(1); }
        100%{ transform: scale(1.02); }
    }
</style>