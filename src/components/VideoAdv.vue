<template>
    <div class="video_adv_wrap">
        <video src="https://static.xfengjing.com/video/2021/07/13/01a7fef3-67c1-48cb-af77-de94201661f0.mp4"></video>
    </div>
</template>

<script>
export default {
    setup(props) {
        
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