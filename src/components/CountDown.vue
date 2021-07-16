<template>
    <div class="buy_count_down_wrap">
        <div class="count_down_num">9</div>
        <div class="text">抢购马上开始!</div>
    </div>
</template>

<script>
export default {
    setup(props) {
        
    }
}
</script>

<style lang="less" scope>
    .buy_count_down_wrap{
        width: 100%;
        height: 100%;
        text-align: center;
        font-weight: bold;
        display:flex;
        flex-flow: column;
        justify-content: space-around;

        .count_down_num{
            font-size: 340px;
            color: #fe0000;
        }

        .text{
            font-size: 100px;
            color: #ffcc01;
        }
    }
</style>