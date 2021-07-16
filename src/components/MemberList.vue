<template>
    <div class="member_list_wrap">
        <div class="member_box">
            <div class="member_list">
                <div 
                    class="item"
                    v-for="(item, index) in 5"
                    :key="index"
                    :style="{ animation: `listAnmi_${index} 1s linear ${index * 0.2}s both` }"
                >
                    <div class="index">{{ index + 1 }}</div>
                    <div class="head_img">
                        <img src="">
                    </div>
                    <div class="name text_overflow">马冬梅</div>
                    <div class="price">￥1,534.59</div>
                </div>
            </div>
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
    .member_list_wrap{
        width: 837px;
        height: 521px;
        background: url('../images/member_list_card.png') center no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 60px;
        right: -40px;
        overflow: hidden;

        .member_box{
            width: 100%;
            height: 100%;
            transform: skew(-19deg);
            margin-left: 87px;
            overflow: hidden;

            .member_list{
                width: 750px;
                transform: skew(19deg);
            }
        }

        .item{
            height: 104px;
            padding: 0 40px 0 80px;
            display: flex;
            align-items: center;
            font-weight: bold;

            .index{
                width: 60px;
                font-size: 50px;
                color: #4a2453;
                text-align: right;
            }

            .head_img{
                width: 82px;
                height: 82px;
                line-height: 82px;
                border-radius: 50%;
                background: url('../images/head_border.png') center no-repeat;
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 10px;

                img{
                    width: 70px;
                    height: 70px;
                }
            }

            .name{
                width: 250px;
                font-size: 35px;
                color: #fff;
                padding-left: 14px;
            }

            .price{
                font-size: 35px;
                color: #4a2453;
                flex: 1;
                text-align: right;
            }
        }

        @keyframes listAnmi_0 {
            0% {
                transform: translate(100vw);
            }
            100% {
                transform: translate(0);
                // opacity: 0;
            }
        }
        @keyframes listAnmi_1 {
            0% {
                transform: translate(100vw);
            }
            100% {
                transform: translate(0);
                // opacity: 0;
            }
        }
        @keyframes listAnmi_2 {
            0% {
                transform: translate(100vw);
            }
            100% {
                transform: translate(0);
                // opacity: 0;
            }
        }
        @keyframes listAnmi_3 {
            0% {
                transform: translate(100vw);
            }
            100% {
                transform: translate(0);
                // opacity: 0;
            }
        }
        @keyframes listAnmi_4 {
            0% {
                transform: translate(100vw);
            }
            100% {
                transform: translate(0);
                // opacity: 0;
            }
        }
    }
</style>