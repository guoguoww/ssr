<template>
    <div class="js-main">
        <div class="js-home-main js-market-detai clearfix">
            <div class="mkright">
                <div class="msg clearfix">
                    <dl>
                        <dt>
                            <ol>
                                <span>BTC/CNY</span>
                            </ol>
                        </dt>
                        <dd>BitAsiaEx</dd>
                    </dl>
                    <dl>
                        <dt class="green">¥ 45139.84</dt>
                        <dd>最新成交价</dd>
                    </dl>
                    <dl>
                        <dt class="red">+0.38%</dt>
                        <dd>涨跌幅</dd>
                    </dl>
                    <dl>
                        <dt>¥ 46002.00</dt>
                        <dd>今日最高</dd>
                    </dl>
                    <dl>
                        <dt>¥ 43182.97</dt>
                        <dd>今日最低</dd>
                    </dl>
                    <dl>
                        <dt>419.77 BTC</dt>
                        <dd>24小时成交量</dd>
                    </dl>
                </div>
                <div class="control">
                    <span>{{ssr}}</span>
                    <trade-view ref="trade"></trade-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="">

if(typeof window !== 'undefined'){
    var TradeView=require("~/components/TradeView/index.vue")
}
// import TradeView from "../../components/TradeView/index.vue";
export default {
    name: "market-details",
    asyncData (context) {
        return { ssr: context.isServer? 'server' : 'client' }
    },
    data() {
        return {
            
        };
    },
    components: {
         TradeView
    },
    created () {
        console.log(process.server)
    },
      mounted() {
          console.log(this.$refs.trade);
         //this.$refs.trade.init('BTCUSDT', 5)
   
  }
};
</script>

<style scoped lang="">
.js-market-detai .mkright {
    width: 870px;
    float: right;
}
.js-market-detai .mkright .msg {
    margin-bottom: 30px;
}
.js-market-detai .mkright .msg dl:nth-child(1) {
    width: 190px;
}

.js-market-detai .mkright .msg dl {
    display: block;
    float: left;
    width: 120px;
}
.js-market-detai .mkright .msg ol{
    font-size: 18px;
}
.js-market-detai .mkright .msg ol span {
    font-weight: bold;
}
.js-market-detai .mkright .msg dl:nth-child(1) dd {
    padding-top: 6px;
}

.js-market-detai .mkright .msg dd {
    color: #999;
    padding-top: 10px;
}
.js-market-detai .mkright .msg dl + dl {
    margin-left: 10px;
}
.js-market-detai .mkright .msg .green {
    color: #5da310;
}
.js-market-detai .mkright .msg .red {
    color: #c4192d;
}
.js-market-detai .mkright .control {
    border-radius: 4px;
    border: #DCDCDC 1px solid;
}
/* .control span {
    position: absolute;
    top: 71px;
    right: 94px;
    color: #f29700;
    display: block;
    width: 80px;
    height: 20px;
    background: #fff;
    text-align: center;
} */
</style>
