<template>
    <div class="member_list_wrap">
        <div class="member_box">
            <div 
                class="member_list"
                v-for="(page, pindex) in totalPage"
                :key="pindex"
            >
                <div v-if="pageIndex == pindex">
                    <div 
                        class="item"
                        v-for="(item, index) in rankList"
                        :key="index"
                        :style="{ animation: 
                            hideRank ? `listAnmiHide_${index} 1s ease-in ${index * 0.2}s both` : `listAnmi_${index} 1s ease-in ${index * 0.2}s both`
                        }"
                    >
                        <div class="index">{{ item.index + 1 }}</div>
                        <div class="head_img">
                            <img :src="item.avatar">
                        </div>
                        <div class="name text_overflow">{{ item.nickName }}</div>
                        <div class="price">￥{{ priceFormat(item.price).int }}{{ priceFormat(item.price).decimals }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
import { priceFormat } from '../util/index'

export default {
    setup(props) {
        const store = useStore()

        onMounted(() => {
            state.buyMemberList = store.state.buyMemberList
            state.totalPage = Math.ceil(state.buyMemberList.length / 5)

            state.buyMemberList.forEach((item, index) => {
                item.index = index
            })

            for(let i = 0; i < state.totalPage; i++){
                let data = JSON.parse(JSON.stringify(state.buyMemberList))
                if(i == state.totalPage - 1){
                    state.resData[i] = data.splice(i * 5, data.length-1)
                }else{
                    state.resData[i] = data.splice(i * 5, (i + 1) *5)
                }
            }
            
            showRankData()
        })

        //抢购排行榜
        const showRankData = () => {
            state.rankList = state.resData[state.pageIndex] 
            clearTimeout(state.timer)
            state.hideRank = false
            setTimeout(() => {
                state.hideRank = true
            }, 5300);
            state.timer = setTimeout(() => {
                if(state.pageIndex + 1 > state.totalPage - 1){
                    state.pageIndex = 0
                }else{
                    state.pageIndex += 1
                }
                showRankData()
            }, 6500);
        }


        const state = reactive({
            totalPage: 0,
            pageIndex: 0,
            resData: [],
            rankList: [],
            hideRank: false,
            priceFormat,
            timer: undefined,
            buyMemberList: []
        })

        return toRefs(state)
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
                    border-radius: 50%;
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
            }
        }
        @keyframes listAnmi_1 {
            0% {
                transform: translate(100vw);
            }
            100% {
                transform: translate(0);
            }
        }
        @keyframes listAnmi_2 {
            0% {
                transform: translate(100vw);
            }
            100% {
                transform: translate(0);
            }
        }
        @keyframes listAnmi_3 {
            0% {
                transform: translate(100vw);
            }
            100% {
                transform: translate(0);
            }
        }
        @keyframes listAnmi_4 {
            0% {
                transform: translate(100vw);
            }
            100% {
                transform: translate(0);
            }
        }

        @keyframes listAnmiHide_0 {
            0% {
                transform: translate(0);
            }
            100% {
                transform: translate(-100vw);
            }
        }
        @keyframes listAnmiHide_1 {
            0% {
                transform: translate(0);
            }
            100% {
                transform: translate(-100vw);
            }
        }
        @keyframes listAnmiHide_2 {
            0% {
                transform: translate(0);
            }
            100% {
                transform: translate(-100vw);
            }
        }
        @keyframes listAnmiHide_3 {
            0% {
                transform: translate(0);
            }
            100% {
                transform: translate(-100vw);
            }
        }
        @keyframes listAnmiHide_4 {
            0% {
                transform: translate(0);
            }
            100% {
                transform: translate(-100vw);
            }
        }
    }
</style>