<template>
    <div class="end_wrap">
        <div class="king" v-show="showStep==1">
            <div class="title">极限秒杀王</div>
            <div class="king_info">
                <div class="member">
                    <img :src="buyMemberList[0].avatar">
                    <p class="name">{{ buyMemberList[0].nickName }}</p>
                </div>
                <div class="price_wrap">
                    <p class="text">秒杀价</p>
                    <div class="number_warp">
                        <span class="price_before text_heavy"
                            >￥</span
                        >
                        <span class="price_num text_heavy"
                            >{{ priceFormat(buyMemberList[0].price).int }}</span
                        >
                        <span class="price_after text_heavy"
                            >{{ priceFormat(buyMemberList[0].price).decimals }}</span
                        >
                    </div>
                </div>
            </div>
        </div>

        <div class="rank_wrap" v-show="showStep==2">
            <div class="rank_box" ref="rankBox">
                <div 
                    class="rank_item" 
                    v-for="(rank, index) in rankList" 
                    :key="index"
                >
                    <div class="index">{{index+2}}</div>
                    <img 
                        class="image" 
                        :src="rank.avatar"
                    >
                    <div class="name overflow">{{ rank.nickName }}</div>
                    <div class="price">
                        <div class="number_warp">
                            <span class="price_before text_heavy"
                                >￥</span
                            >
                            <span class="price_num text_heavy"
                                >{{ priceFormat(rank.price).int }}</span
                            >
                            <span class="price_after text_heavy"
                                >{{ priceFormat(rank.price).decimals }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { reactive, toRefs, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { priceFormat } from '../../util/index'

export default {
    setup(props) {
        const store = useStore()
        const rankBox = ref(null)

        const buyMemberList = computed(() => {
            let obj = JSON.parse(JSON.stringify(store.state.buyMemberList))
            state.rankList = obj.splice(1, obj.length)
            return store.state.buyMemberList
        })

        setTimeout(() => {
            showRankKing()
        }, 1000);

        //抢购排行榜第一  极限秒杀王
        const showRankKing = () => {
            state.showStep = 1
            setTimeout(() => {
                showAllRank()
            }, 5000);
        }
        
        //抢购排行榜列表
        const showAllRank = () => {
            clearInterval(state.timer)
            state.rankBox.style.transform = `translateY(0px)`
            state.showStep = 2
            let count = state.rankList.length
            let num = 0
            state.rankBox.style.transition = 'transform 1s'
            state.timer = setInterval(() => {

                //排行榜数量小于一页
                if(count <= 5){
                    if(num >= 2){
                        rankAnimaEnd()
                    }
                    num += 1
                    return
                }

                num += 68*5
                if(num >= (count-3)*68){
                    rankAnimaEnd()
                    return
                }
                state.rankBox.style.transform = `translateY(-${num}px)`
            }, 10000);
        }

        //排行榜动画结束
        const rankAnimaEnd = () => {
            showRankKing()
            clearInterval(state.timer)
        }

        const state = reactive({
            showStep: 1,
            rankBox,
            rankList: [],
            priceFormat,
            timer: undefined,
            buyMemberList
        })

        return toRefs(state)
    }
}
</script>

<style lang="less" scope>
    @import url('../../variables.less');
    .end_wrap{
        
        .king{
            padding: 18px 12.8%;
            
            .title{
                font-size: 48px;
                line-height: 58px;
                color: @color_info;
            }

            .king_info{
                display: inline-block;
                margin: 43px auto;
                display: flex;
                justify-content: center;

                .member{

                    img{
                        width: 120px;
                        height: 120px;
                        border: 6px solid @color_lightgray;
                        border-radius: 50%;
                    }

                    .name{
                        font-size: 40px;
                        line-height: 55px;
                        color: #fff;
                        padding-top: 3px;
                    }
                }

                .price_wrap{
                    margin-left: 43px;
                    padding-top: 21px;

                    .text{
                        font-size: 48px;
                        line-height: 58px;
                        color: @color_lightgray;
                        opacity: .8;
                    }

                    .number_warp{
                        font-size: 67px;
                        line-height: 93px;
                        padding-top: 12px;
                        color: @color_info;

                        .price_after{
                            font-size: 58px;
                        }
                    }
                }
            }
        }

        .rank_wrap{
            margin: 13px 12%;
            height: 348px;
            overflow: hidden;

            .rankBox{
                transition: transform 5s;
            }
            
            .rank_item{
                height: 60px !important;
                padding-top: 8px;
                display: flex;
                align-items: center;

                .index{
                    font-size: 32px;
                    color: @color_lightgray;
                    width: 80px;
                    text-align: right;
                    padding-right: 15px;
                }

                .image{
                    width: 54px;
                    height: 54px;
                    border: 3px solid #F2F2F2; 
                    border-radius: 50%;
                }

                .name{
                    margin-left: 10px;
                    font-size: 32px;
                    line-height: 44px;
                    color: #fff;
                    width: 20%;
                }

                .price{
                    flex: auto;
                    text-align: right;
                    font-size: 42px;
                    line-height: 58px;
                    color: @color_info;

                    .price_after{
                        font-size: 36px;
                    }
                }
            }
        }
    }
</style>