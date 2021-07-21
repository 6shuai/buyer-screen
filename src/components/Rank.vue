<template>
    <div class="content_box clear">
        <div class="tip">抢购结束</div>
        <div class="goods_detail">

            <div class="goods_image">
                <img :src="data.goodsCover" class="img">
                <img src="../images/sell_out.png" alt="已售罄" class="sell_out">
            </div>
            <p class="goods_name text_overflow">{{ data.goodsName }}</p>
            <p class="goods_desc text_overflow">{{ data.goodsDescription }}</p>
        </div>
        <div class="goods_price_wrap">
            <!-- 买手榜 -->
            <member-list></member-list>
        </div>
    </div>
</template>


<script>
import MemberList from './MemberList.vue'
export default {
    props: ['data'],
    setup(props) {

    },

    components: {
        MemberList
    }
}
</script>