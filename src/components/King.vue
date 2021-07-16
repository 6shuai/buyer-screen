<template>
    <div class="buy_king_wrap">
        <div class="text">
            <img src="../images/king.png">
            本场极限秒杀王:
        </div>
        <div class="member_info">
            <div class="img_wrap">
                <img src="">
            </div>
            <div class="name text_overflow">马冬梅</div>
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
    .buy_king_wrap{
        padding-bottom: 32px;
        line-height: 158px;
        display: flex;
        padding-left: 90px;
        font-size: 80px;
        font-weight: bold;

        .text{
            color: #ffcc00;
            img{
                width: 120px;
                height: 88px;
                vertical-align: middle;
                margin-top: -25px;
            }
        }

        .member_info{
            margin-left: 46px;

            .img_wrap{
                width: 158px;
                height: 158px;
                background: url('../images/head_border.png') center no-repeat;
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                display: inline-block;
            }

            .name{
                width: 550px;
                display: inline-block;
                color: #fff;
                margin-left: 20px;
                vertical-align: bottom;
            }
        }
    }
</style>