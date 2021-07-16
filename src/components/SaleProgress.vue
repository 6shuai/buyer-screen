<template>
    <div class="progress_wrap">
        <div class="progress">
            <div class="progress_bar">
                <img src="../images/loading_bar.png">
            </div>

            <div class="sale_data">已优惠: 12.23%</div>
        </div>
    </div>
</template>

<script>
export default {
    setup(props) {
        
    }
}
</script>

<style lang="less" scope>
    .progress_wrap{
        width: 100%;
        text-align: center;
        
        .progress{
            width: 1442px;
            height: 141px;
            line-height: 141px;
            display: inline-block;
            background: url('../images/loading_bg.png') center no-repeat;
            background-size: 100% 100%;
            position: relative;

            .progress_bar{
                width: 80%;
                height: 100%;
                overflow: hidden;

                img{
                    width: 1437px;
                }
            }

            .sale_data{
                font-size: 80px;
                font-weight: bold;
                color: #ffcc00;
                width: 100%;
                text-align: center;
                position: absolute;
                top: 0;
            }
        }

    }
</style>