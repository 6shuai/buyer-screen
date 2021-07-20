<template>
    <div class="miniview_wrap">
        <img src="../images/logo.png">
        <div class="text">关注小风景  参与更多精彩活动!</div>
    </div>
</template>

<style lang="less" scope>
    .miniview_wrap{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        font-weight: bold;
        display:flex;
        flex-flow: column;
        justify-content: space-around;
        
        img{
            width: 100%;
            height: 100%;
        }

        .text{
            font-size: 100px;
            color: #e9b085;
            text-align: center;
        }
    }
</style>