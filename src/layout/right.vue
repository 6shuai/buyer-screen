<template>
    <div class="right_wrap">
        <div class="logo">
            <img src="../images/logo.png" alt="logo">
        </div>

        <div class="state_info">
            <p class="text">竞猜进行中</p>
            <p class="count_down">09:32</p>
        </div>

        <div class="qrcode_wrap">
            <p class="title">抢宝贝赢红包</p>
            <div class="qrcode_box">
                <p class="sao_text">微信扫一扫</p>
                <img src="">
            </div>
        </div>

    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
    setup(props) {
        const state = reactive({

        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    .right_wrap{
        height: 100%;
        padding: 22px 43px;
        display: flex;
        flex-flow: column;
        justify-content: space-around;

        .logo{
            width: 317px;
            height: 174px;
            margin: 0 auto;

            img{
                width: 100%;
                height: 100%;
            }
        }

        .state_info{
            width: 100%;
            height: 226px;
            background: url('../images/count_down_card.png') center no-repeat;
            background-size: 100% 100%;
            text-align: center;
            margin-top: 40px;

            .text{
                font-size: 50px;
                color: #4a2453;
                padding-top: 30px;
            }

            .count_down{
                font-size: 100px;
                font-weight: bold;
                color: #ffcc00;
                padding-top: 20px;
            }
        }

        .qrcode_wrap{
            width: 100%;
            text-align: center;
            margin-top: 50px;

            .title{
                font-size: 60px;
                font-weight: bold;
                color: #fff;
                padding-bottom: 28px;
            }

            .qrcode_box{
                padding: 19px;
                background: url('../images/qrcode_card.png') center no-repeat;
                background-size: 100% 100%;
                margin-bottom: 42px;

                .sao_text{
                    font-size: 40px;
                    color: #4a2453;
                    text-align: justify;
                    text-align-last: justify;
                    padding-bottom: 19px;
                }

                img{
                    width: 322px;
                    height: 322px;
                }
            }
        }
    }
</style>