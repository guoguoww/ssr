<template>
  <div class="">
    <div class="js-main">
      <div class="js-home-main clearfix">
        <div class="js-left">
          <div class="js-market">
            <!-- 币种标题 -->
            <div class="font18 article-tabs market-title">
              <ul class="title">
                <a href="javascript: void(0);" :title="i.id" :class="{'active':currencyactive==i.id}" v-for="(i,index) in currencylist" :key="index" @click='setCurrentActive(index)'>{{i.code}}
                  <span></span>
                </a>
              </ul>
              <div class="market-tabs" style="">
                <span class="time-tabs-left"><img src="~/static/imgs/de-left.svg" alt=""></span>
                <a href="javascript:;" class="time-tabs-left" style="display: none;"><img src="~/static/imgs/left.svg" alt=""></a>
                <span class="time-tabs-right" style="display: none;"><img src="~/static/imgs/de-right.svg" alt=""></span>
                <a href="javascript:;" class="time-tabs-right"><img src="~/static/imgs/right.svg" alt=""></a>
              </div>
            </div>
            <div class="main">
              <ol style="">
                <li class="exchange">交易所</li>
                <li class="deal">最新成交价</li>
                <li class="change">24H变化</li>
                <li class="highest">24H最高</li>
                <li class="lowest">24H最低</li>
                <li class="quantity">24H成交量</li>
                <!--<li class="line">24H趋势</li>-->
                <li>K线</li>
              </ol>
              <ul class="pointer" v-for="(i,index) in contractList" :key="index">
                <li class="name">
                  <a :href="i.exchange_homepage ? '//' + i.exchange_homepage : 'javascript: void(0);'" target="_blank"><img :src="imageBaseUrl + '/api/image/display/'+ i.exchange_code_icon" alt="" class="logo">{{i.exchange_code}}-{{i.code.toUpperCase()}}/{{i.unit_code.toUpperCase()}}</a>
                </li>
                <li class="deal" :style="typeof i.up == 'undefined' ? '' : ('color:' + (i.up ? '#c4192d' : '#5da310'))">{{i.price_symbol}}{{i.last_price.toFixed(2)}}
                  <!---->
                  <!---->
                </li>
                <li :class="'change ' + (i.diff_rate > 0 ? 'up' : 'down')">{{i.diff_rate > 0 ? '+' : ''}}{{i.diff_rate.toFixed(2)}}%</li>
                <li class="highest">{{i.price_symbol}}{{i.high.toFixed(2)}}</li>
                <li class="lowest">{{i.price_symbol}}{{i.low.toFixed(2)}}</li>
                <li class="quantity">{{getVolume24Hours(i.volume_in24hour)}}</li>
                <!--<li class="line">-->
                <!--<a href="javascript:;"-->
                <!--style="display: block; height: 100px; width: 65px; -webkit-tap-highlight-color: transparent; user-select: none;">-->

                <!--</a>-->
                <!--</li>-->
                <li>
                  <a href="javascript:;"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjhweCIgaGVpZ2h0PSIyOHB4IiB2aWV3Qm94PSIwIDAgMjggMjgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjMgKDUxMTY3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT50cmVuZC1pY29uPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9InRyZW5kLWljb24iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMTUiIGZpbGw9IiM5QjlCOUIiIHg9IjYiIHk9IjYiIHdpZHRoPSIxLjIwMDAwMDA1IiBoZWlnaHQ9IjE2Ij48L3JlY3Q+CiAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0xNSIgZmlsbD0iIzlCOUI5QiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQuMTAwMDAwLCAyMS41MDAwMDApIHJvdGF0ZSgtMjcwLjAwMDAwMCkgdHJhbnNsYXRlKC0xNC4xMDAwMDAsIC0yMS41MDAwMDApICIgeD0iMTMuNSIgeT0iMTMuNSIgd2lkdGg9IjEuMjAwMDAwMDUiIGhlaWdodD0iMTYiPjwvcmVjdD4KICAgICAgICA8cGF0aCBkPSJNOS41LDE4LjUgTDEzLjUsMTIuNSIgaWQ9IkxpbmUiIHN0cm9rZT0iIzk3OTc5NyIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNMTMuNSwxMi41IEwxNS41LDEzLjUiIGlkPSJMaW5lLTIiIHN0cm9rZT0iIzk3OTc5NyIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNMTYuMiwxMy45IEwxOC41LDkuNSIgaWQ9IkxpbmUtMyIgc3Ryb2tlPSIjOTc5Nzk3IiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9InNxdWFyZSI+PC9wYXRoPgogICAgICAgIDxwb2x5Z29uIGlkPSJSZWN0YW5nbGUiIGZpbGw9IiM5QjlCOUIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4LjU2NzY4MCwgOS40NzU4NTIpIHJvdGF0ZSgtMTcuMDAwMDAwKSB0cmFuc2xhdGUoLTE4LjU2NzY4MCwgLTkuNDc1ODUyKSAiIHBvaW50cz0iMTYuNDk0MTM5NiA3LjQ3NTg1MTg1IDIwLjY0MTIxOTkgNy41NzA4NTk4IDIwLjQ5NDEzOTYgMTEuNDc1ODUxOSI+PC9wb2x5Z29uPgogICAgPC9nPgo8L3N2Zz4=" alt=""></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="js-right">
          <div class="js-quantity clearfix">
            <ul>
              <a href="javascript: void(0);">
                <li>{{total.total_coin_total }}个</li>
                <span>币种</span>
              </a>
            </ul>
            <ul>
              <a href="javascript: void(0);">
                <li>{{total.currency_symbol }}{{total.total_market_cap }}</li>
                <span>市值</span>
              </a>
            </ul>
            <ul>
              <a href="javascript: void(0);">
                <li>{{total.total_exchange_count }}个</li>
                <span>交易所</span>
              </a>
            </ul>
            <ul>
              <a href="javascript: void(0);">
                <li>{{total.currency_symbol }}{{total.trand_vol }}</li>
                <span>24H成交额</span>
              </a>
            </ul>
          </div>
          <div class="js-columns-24updown">
            <div class="font18 article-tabs tabs-height title">
              <ul>
                <a title="24H涨跌" class="active nohover">24H涨跌</a>
              </ul>
              <div class="time-tabs">
                <a href="javascript:;" class="time-tabs-left " :class="{'active':updownactive=='up'}" @click="updownactive='up'">涨</a>
                <a href="javascript:;" class="time-tabs-right" :class="{'active':updownactive=='down'}" @click="updownactive='down'">跌</a>
              </div>
            </div>
            <div class="control" v-show="updownactive=='up'">
              <ul v-for="(i,index) in uprankslist" :key="index">
                <a href="javacript:;">
                  <i class="ranking">{{index+1}}</i>
                  <li class="name"><img :src="getimgs(i.icon)">{{i.cn_name}}</li>
                  <li class="price">{{i.price_unit_symbol}}{{i.price}}</li>
                  <li>
                    <div class="digital-up">+{{i.diff}}%</div>
                  </li>
                </a>
              </ul>
            </div>
            <div class="control" v-show="updownactive=='down'">
              <ul v-for="(i,index) in downrankslist" :key="index">
                <a href="javacript:;">
                  <i class="ranking">{{index+1}}</i>
                  <li class="name"><img :src="getimgs(i.icon)">{{i.cn_name}}</li>
                  <li class="price">{{i.price_unit_symbol}}{{i.price}}</li>
                  <li>
                    <div class="digital-down">{{i.diff}}%</div>
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="">
import * as echarts from "echarts";

export default {
    name: "market",
    data() {
        return {
            updownactive: "up", //涨跌
            currencylist: [], //货币列表
            currencyactive: "", //货币选中
            pre_currencyactive: "", //上次被选中货币
            contractList: [], //货币合约
            uprankslist: [], //涨排行榜
            downrankslist: [], //跌
            total: [], //统计
            imageBaseUrl: `${process.env.imgUrl}`,
            interval_fun_getContractList: null
        };
    },
    created() {
        this.getcurrency();
        // this.getexchange()
        this.getranks();
        this.gettotal();
        this.setInteval_getContractList();
    },
    mounted() {
        // this.createecharts()
    },
    activated() {},
    deactivated() {},
    destroyed() {
        clearInterval(this.interval_fun_getContractList);
    },
    watch: {},
    methods: {
        createecharts() {
            //创建图表
            var a = echarts.init(document.getElementById("e"));
            var options = {
                xAxis: {
                    data: [
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六",
                        "周日"
                    ],
                    min: 1,
                    show: !1
                },
                grid: [{ height: "23%", width: "100%", top: 2, left: 0 }],
                yAxis: {
                    type: "value",
                    show: !1,
                    min: function(t) {
                        return t.min - 0.009 * t.min;
                    }
                },
                series: [
                    {
                        data: [3.4, 4.5, 15, 3.4, 4.5, 15, 43],
                        type: "line",
                        lineStyle: { normal: { color: "#5FADDF", width: 1 } },
                        showSymbol: !1
                    }
                ]
            };
            a.setOption(options);
        },
        getcurrency(call) {
            //获取货币列表
            this.$axios
                .$get(`/api/market/currency/list?page=${1}&rows=${20}`)
                .then(res => {
                    if (res.errorCode == 0) {
                        this.currencylist = res.data.data;
                        if (this.currencylist.length > 0) {
                            this.setCurrentActive(0);
                        }
                    }
                });
        },
        setCurrentActive(index) {
            if (index >= 0 && this.currencylist.length > index) {
                this.currencyactive = this.currencylist[index].id;
                this.getContractList();
            }
        },
        getContractList() {
            this.$axios
                .$get("/api/market/last?currencyId=" + this.currencyactive)
                .then(res => {
                    if (res.errorCode == 0) {
                        this.filterContract(res.data);
                    }
                });
        },
        filterContract(data) {
            if (this.pre_currencyactive != this.currencyactive) {
                this.pre_currencyactive = this.currencyactive;
            } else {
                var diff = 0;
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < this.contractList.length; j++) {
                        if (
                            this.contractList[j].exchange_code ==
                                data[i].exchange_code &&
                            this.contractList[j].unit_code == data[i].unit_code
                        ) {
                            diff =
                                data[i].last_price -
                                this.contractList[j].last_price;
                            if (diff == 0) {
                                data[i].up = this.contractList[j].up;
                            } else {
                                data[i].up = diff > 0;
                            }
                            break;
                        }
                    }
                }
            }
            this.contractList = data;
        },
        setInteval_getContractList() {
            var the = this;
            if (this.interval_fun_getContractList != null) {
                clearInterval(this.interval_fun_getContractList);
            }
            this.interval_fun_getContractList = setInterval(function() {
                the.getContractList();
            }, 2000);
        },
        // getexchange(){//获取交易所
        //   this.$axios.$get(`/api/market/exchange/list?page=${1}&rows=${10}`).then(res=>{
        //       console.log(res);
        //       if(res.errorCode==0){
        //           this.exchangelist=res.data.data
        //       }
        //   })
        // },
        getranks() {
            //获取排行
            this.$axios.$get(`/api/market/change/ranks/up`).then(res => {
                if (res.errorCode == 0) {
                    this.uprankslist = res.data;
                }
            });
            this.$axios.$get(`/api/market/change/ranks/down`).then(res => {
                if (res.errorCode == 0) {
                    this.downrankslist = res.data;
                }
            });
        },
        gettotal() {
            //获取统计
            this.$axios.$get("api/market/statistical").then(res => {
                if (res.errorCode == 0) {
                    this.total = res.data;
                }
            });
        },
        getimgs(id) {
            //获取图片
            return `${process.env.imgUrl}${id}`;
        },
        getVolume24Hours(originVal) {
            return originVal > 100000000
                ? (originVal / 100000000).toFixed(2) + "亿"
                : (originVal / 10000).toFixed(2) + "万";
        }
    },
    components: {}
};
</script>

<style scoped lang="">
* {
    box-sizing: content-box;
}

a {
    color: #333;
}

/* 左边内容 */
.js-market {
    margin-bottom: 30px;
}

.article-tabs {
    position: relative;
    font-size: 18px;
    text-align: center;
}

.js-market .market-title {
    height: 40px;
    overflow: hidden;
    margin-bottom: 30px;
}

.js-market .title {
    width: 700px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    height: 70px;
    position: relative;
    overflow-x: auto;
    overflow-y: unset;
}

.article-tabs ul {
    float: left;
}

.article-tabs ul .active {
    color: #333;
    font-weight: bold;
}

.article-tabs ul a {
    position: relative;
    display: inline-block;
    color: #999;
}

.article-tabs ul a + a {
    margin-left: 24px;
}

.article-tabs ul .active span {
    width: 100%;
    height: 3px;
    background: #f29700;
    position: absolute;
    left: 0;
    bottom: -8px;
    opacity: 1;
}

.article-tabs .market-tabs .time-tabs-left {
    border-radius: 4px 0 0 4px;
}

.article-tabs .market-tabs span {
    width: 26px;
    height: 17px;
    float: left;
    display: block;
    padding-top: 6px;
    text-align: center;
}

.article-tabs .market-tabs span img {
    opacity: 0.5;
    vertical-align: top;
}

.article-tabs .market-tabs .time-tabs-right {
    border-radius: 0 4px 4px 0;
    margin-left: -1px;
}

.article-tabs .market-tabs a {
    width: 26px;
    height: 17px;
    float: left;
    display: block;
    padding-top: 6px;
}

.article-tabs .market-tabs a img {
    vertical-align: top;
}

.js-market .main ol {
    color: #666;
    border-top: #dcdcdc 1px solid;
}

.js-market .main ul,
.js-market .main ol {
    padding: 13px 0;
    height: 28px;
    border-bottom: #dcdcdc 1px solid;
}

.js-market .main ul .exchange,
.js-market .main ol .exchange {
    width: 180px;
}

.js-market .main ul .deal,
.js-market .main ol .deal {
    width: 110px;
}

.js-market .main ul .change,
.js-market .main ol .change {
    width: 80px;
}

.js-market .main ul .highest,
.js-market .main ol .highest {
    width: 100px;
    color: #666;
}

.js-market .main ul .lowest,
.js-market .main ol .lowest {
    width: 100px;
    color: #666;
}

.js-market .main ul .quantity,
.js-market .main ol .quantity {
    width: 70px;
    color: #666;
}

.js-market .main ul .line,
.js-market .main ol .line {
    width: 65px;
}

.js-market .main ul li,
.js-market .main ol li {
    float: left;
    height: 28px;
    line-height: 28px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.js-market .main ul li + li,
.js-market .main ol li + li {
    margin-left: 10px;
}

.pointer {
    cursor: pointer;
}

.js-market .main ul .down,
.js-market .main ol .down {
    color: #5da310;
}

.js-market .main ul .up,
.js-market .main ol .up {
    color: #c4192d;
}

.js-market .main ul a,
.js-market .main ol a {
    display: block;
}

.js-market .main ul .logo,
.js-market .main ol .logo {
    width: 28px;
    height: 28px;
    margin-right: 6px;
}

.js-market .main ul .name,
.js-market .main ol .name {
    width: 180px;
}

/* 右边内容 */
.js-quantity {
    margin-bottom: 30px;
    border: #dcdcdc 1px solid;
    border-radius: 4px;
    padding: 20px;
    text-align: center;
}

.js-quantity ul:nth-child(1),
.js-quantity ul:nth-child(2) {
    margin-bottom: 20px;
}

.js-quantity ul {
    width: 162px;
    float: left;
}

.js-quantity ul li {
    font-weight: bold;
    font-size: 18px;
}

.js-quantity ul span {
    color: #999;
}

/* 24h涨跌  */
.js-columns-24updown {
    margin-bottom: 30px;
    border: #dcdcdc 1px solid;
    border-radius: 4px;
    font-size: 18px;
}

.js-columns-24updown .title {
    padding: 20px 20px 0 20px;
}

.article-tabs {
    height: 65px;
}

.article-tabs ul {
    float: left;
}

.article-tabs ul .active {
    color: #333;
    font-weight: bold;
}

.article-tabs ul a {
    position: relative;
    display: inline-block;
    color: #999;
}

.article-tabs .time-tabs {
    float: right;
}

.article-tabs .time-tabs .active {
    background: #999;
    color: #fff;
}

.article-tabs .time-tabs .time-tabs-left {
    border-radius: 4px 0 0 4px;
}

.article-tabs .time-tabs a {
    width: 40px;
    height: 22px;
    line-height: 22px;
    border: #999 1px solid;
    float: left;
    display: block;
    background: #fff;
    color: #999;
    text-align: center;
    font-size: 14px;
}

.article-tabs .time-tabs .time-tabs-right {
    border-radius: 0 4px 4px 0;
}

.js-columns-24updown .control {
    padding-bottom: 10px;
    font-size: 14px;
}

.js-columns-24updown .control ul {
    padding: 3px 20px 0 20px;
    display: block;
    height: 43px;
}

.js-columns-24updown .control ul:nth-child(1) i {
    color: #f29700;
}

.js-columns-24updown .control ul:nth-child(2) i {
    color: #f29700;
}

.js-columns-24updown .control ul:nth-child(3) i {
    color: #f29700;
}

.js-columns-24updown .control .ranking {
    width: 26px;
    height: 40px;
    line-height: 40px;
}

.js-columns-24updown .control i {
    color: #999;
    font-weight: bold;
    font-style: italic;
    float: left;
    font-size: 16px;
}

.js-columns-24updown .control .name {
    width: 95px;
    height: 40px;
    line-height: 40px;
    padding-right: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
}

.js-columns-24updown .control .name img {
    width: 16px;
    height: 16px;
    margin: 12px 8px 0 0;
    vertical-align: top;
}

.js-columns-24updown .control li:nth-child(3) {
    color: #333;
}

.js-columns-24updown .control .price {
    width: 95px;
    height: 40px;
    line-height: 40px;
    padding-right: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.js-columns-24updown .control li {
    display: block;
    float: left;
}

.js-columns-24updown .control li:nth-child(4) {
    float: right;
}

.js-columns-24updown .control .digital-up {
    background: #c4192d;
}

.js-columns-24updown .control .digital-down {
    background: #5da310;
}

.js-columns-24updown .control .digital-up,
.js-columns-24updown .control .digital-down {
    padding: 1px 4px;
    border-radius: 4px;
    color: #fff;
    -webkit-transform: scale(0.9);
    margin-top: 10px;
    font-size: 12px;
}
</style>
