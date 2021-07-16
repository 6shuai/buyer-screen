<template>
    <!-- 预告  下个宝贝 -->
    <div class="next_goods_wrap">
        <div class="goods_card">
            <div class="next_text">
                <p class="text">下个宝贝</p>
                <p class="time">19:45</p>
            </div>
            <div class="goods_img">
                <img src="">
            </div>
        </div>

        <div class="goods_info">
            <div class="goods_name text_overflow">
                索尼85寸液晶电视
                <span>4k HDR 人工智能</span>
            </div>
            <div class="price_s">￥10,099.00起</div>
            <div class="price_d">每分钟直降 ￥1050.00</div>
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
    .next_goods_wrap{
        height: 250px;
        margin-bottom: 36px;
        font-weight: bold;
        display: flex;
        padding: 0 88px;

        .goods_card{
            width: 519px;
            height: 250px;
            background: url('../images/foreshow.png') center no-repeat;
            background-size: 100% 100%;

            .next_text{
                width: 270px;
                padding: 60px 0;
                display: inline-block;
                text-align: center;
                vertical-align: top;

                .text{
                    font-size: 40px;
                    color: #ffcc00;
                }

                .time{
                    font-size: 80px;
                    color: #fff;
                    padding-top: 20px;
                }
            }

            .goods_img{
                width: 248px;
                height: 100%;
                display: inline-block;
                text-align: center;
                
                img{
                    width: 228px;
                    height: 228px;
                    display: inline-block;
                    margin: 11px 0;
                }
            }

        }

        .goods_info{
            flex: 1;
            width: 900px;
            margin-left: 30px;

            .goods_name{
                font-size: 60px;
                color: #fff;
                line-height: 60px;
                padding-bottom: 42px;

                span{
                    font-size: 40px;
                    color: #e9b086;
                    font-weight: normal;
                }
            }

            .price_s{
                font-size: 40px;
                color: #ffcc00;
                line-height: 60px;
            }

            .price_d{
                display: inline-block;
                height: 80px;
                line-height: 80px;
                padding: 0 28px;
                background: url('../images/buy_in_price_down.png') center no-repeat;
                background-size: 100% 100%;
                font-size: 50px;
                color: #fff;
            }
        }
    }
    
</style>