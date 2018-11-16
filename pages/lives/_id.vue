<template>
    <div class="js-main">
        <div class="js-home-main clearfix">
            <div class="js-left">
                <div class="js-lives">
                    <div class="title">
                        <div class="date">
                            <ul class="tc">
                                <span class="font12 month">{{month}}月</span>
                                <span class="font18 day">{{day}}</span>
                            </ul>
                            <ol>
                                <li class="week">今天</li>
                                <li>星期{{week}}</li>
                            </ol>
                        </div>
                    </div>
                    <div class="main">
                        <div class="control control-detail clearfix">
                            <div class="time-detail">
                                {{d.createTime}}
                                <!-- <div class="grade"><img src="~/static/imgs/grade4-icon.svg?v=1032" alt="grade"></div> -->
                            </div>
                            <div class="intro-detail">
                                <div class="content-detail">
                                    <a class=" livesb">{{d.title}}</a>
                                    <a target="_blank">{{d.content}}</a>
                                </div>
                                <div class="font12 clearfix resource">
                                    <ul>
                                        <a href=""></a>
                                    </ul>
                                    <section>
                                        <span class="share live-share">
                                            <a href="javascript:void(0)"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjEgKDUxMTQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5zaGFyZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5Zu+5qCHL+WIhuS6qyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuMDAwMDAwLCAtMS4wMDAwMDApIiBmaWxsPSIjOUI5QjlCIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0ic2hhcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTMuMjYyNzcwMjEsMTAuNzA0NDkwNiBDMy4yNjI3NzAyMSwxMC43MDQ0OTA2IDMuMjUxODIwNzQsMTAuNzg2NjczNiAzLjI1ODQ2NDc5LDEwLjgzMzAwODQgTDMuMjU4NDY0NzksMTAuODM1NjAzMyBDMy4yNzc2MDM2MywxMS4wMzU2ODUxIDMuNDQ2MTI2MjcsMTEuMTkyMDY4MyAzLjY1MTEyNTEsMTEuMTkyMDY4MyBDMy44NTYxOTgyOSwxMS4xOTIwNjgzIDQuMDEyNDY1OCwxMS4wNDAyNzE1IDQuMDQzNzg1NDEsMTAuODM1NjAzMyBMNC4wNzQ4OTAxNywxMC42NTQ5NjYgQzUuNjA3ODMyMTYsNC4yNzA1NzUxNSAxMC4zOTg4OTc4LDMuMTU0OTM1OTYgMTIuNTgxOTkwMiwyLjk4NDU2MjIzIEwxMC4zNzY3NTkyLDUuMDQyNDI1ODQgQzEwLjIxOTk2MjgsNS4xOTU3NzYyNCAxMC4yMTcwNzg3LDUuNDQ5NjEzODMgMTAuMzcwNDI5MSw1LjYwNjQxODQ2IEMxMC41MjM3OTYxLDUuNzYzMjcyNjkgMTAuNzc3NjE3MSw1Ljc2NjE4MTUyIDEwLjkzNDQ5NjEsNS42MTI4MTQ2MSBMMTMuODcyMTkyOSwyLjg3MTM1NzE0IEMxMy45NTE4MTQxLDIuNzkzNTM3NDEgMTMuOTkxNjUzNiwyLjY4OTgwMjU3IDEzLjk5MTY1MzYsMi41ODU5NjAzIEMxMy45OTQxNDkzLDIuNDUwOTYzNjkgMTMuOTI4Mzc4MSwyLjMxNzUyODk0IDEzLjgwNjU3ODcsMi4yNDA0MTE2MyBMMTAuMjIzNDgzMiwwLjA2OTQzMzgwOTggQzEwLjAzODE3NjksLTAuMDQ3OTExNDMxNCA5Ljc5MDUyMDU1LDAuMDA3Nzk0NSA5LjY3MzE4MzU3LDAuMTkzMTE3MzQ1IEM5LjU1NTgzODMzLDAuMzc4NDk4MDI5IDkuNjExNDUzMzcsMC42MjYxNDYwNjEgOS43OTY4NTA1OCwwLjc0MzQ4MzAzOSBMMTIuMjU1NTcyMSwyLjIzMzI0Njk1IEM0LjYxMjkwOTgxLDIuOTYzNDczMTQgMy40MDI1MjY3NCw5LjY2NzQ3MjcyIDMuMjYyNzcwMjEsMTAuNzA0NDkwNiBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy45OTE3MzYzLDcuNzkxMjM4MDUgQzEzLjk5MTczNjMsNy41NzA5MjY1MSAxMy44MTMxNDg0LDcuMzkyNDEyOTkgMTMuNTkyODM2OCw3LjM5MjQxMjk5IEMxMy4zNzI2MTYyLDcuMzkyNDEyOTkgMTMuMTk0MDAzNSw3LjU3MDkyNjQ5IDEzLjE5NDAwMzUsNy43OTEyMzgwNSBDMTMuMTk0MDAzNSw3Ljc5MzIxMzA4IDEzLjE5NDE2ODgsNy43OTUwNjQxNyAxMy4xOTQxNjg4LDcuNzk3MDIyNjggTDEzLjE5NDAwMzUsNy43OTcwMjI2OCBMMTMuMTk0MDAzNSwxMS44OTkxNjQzIEMxMy4xOTQwMDM1LDEyLjI0MTk2OTQgMTMuMDU5MDE1MSwxMi41NjU3OTI3IDEyLjgxMzg0NjIsMTIuODEwOTUzMyBDMTIuNTY4NjExMiwxMy4wNTYxMDU3IDEyLjI0NDg2MjMsMTMuMTkxMjAxNSAxMS45MDIwNzM3LDEzLjE5MTIwMTUgTDIuMDk2NzU1MiwxMy4xOTEyMDE1IEMxLjc1Mzk2NjYxLDEzLjE5MTIwMTUgMS40MzAyMDExOCwxMy4wNTYxMDU3IDEuMTg0OTgyNywxMi44MTA5NTMzIEMwLjkzOTgzMDMyMiwxMi41NjU3OTI3IDAuODA0ODMzNzE2LDEyLjI0MTk2OTQgMC44MDQ4MzM3MTYsMTEuODk5MTY0MyBMMC44MDQ4MzM3MTYsMy4xODQ0Nzg4NiBDMC44MDQ4MzM3MTYsMi44NDE2NjU0OCAwLjkzOTgzMDMyMiwyLjUxNzg1MDQ4IDEuMTg0OTgyNywyLjI3MjY5ODA4IEMxLjQzMDEyNjgyLDIuMDI3NTM3NDQgMS43NTM5NjY2MywxLjg5MjU0MDg0IDIuMDk2NzU1MiwxLjg5MjU0MDg0IEw0LjY1NTAxMzYyLDEuODkyNTQwODQgQzQuODc1MjUwOCwxLjg5MjU0MDg0IDUuMDUzODQ2OTUsMS43MTM5NTI5NSA1LjA1Mzg0Njk1LDEuNDkzNjMzMTQgQzUuMDUzODQ2OTUsMS4yNzM0MDQyMiA0Ljg3NTI1OTA2LDEuMDk0ODI0NjEgNC42NTUwMTM2MiwxLjA5NDgyNDYgTDIuMDk2NzU1MiwxLjA5NDgyNDYgQzAuOTQ3NDgyNTQzLDEuMDk0ODI0NiAwLjAwNzA5MjY3NDUxLDIuMDM1MTE1MyAwLjAwNzA5MjY4ODI0LDMuMTg0NDc4ODYgTDAuMDA3MDkyNjg4MjQsMTEuODk5MjU1MiBDMC4wMDcwOTI2ODgyNCwxMy4wNDg1MzYxIDAuOTQ3NDgyNTU3LDEzLjk4ODkzNDIgMi4wOTY3NTUyLDEzLjk4ODkzNDIgTDExLjkwMjA3MzcsMTMuOTg4OTM0MiBDMTMuMDUxMzQ2NCwxMy45ODg5MzQyIDEzLjk5MTczNjMsMTMuMDQ4NTM2MSAxMy45OTE3MzYzLDExLjg5OTI1NTIgTDEzLjk5MTczNjMsNy43OTcwMjI2OCBMMTMuOTkxNTcxLDcuNzk3MDIyNjggQzEzLjk5MTU3OTIsNy43OTUwNjQxNyAxMy45OTE3MzYyLDcuNzkzMjEzMDggMTMuOTkxNzM2Myw3Ljc5MTIzODA1IFogTTQuNjU1MDEzNjIsMS4wOTQ4MjQ2IEw0LjY1NTAxMzYyLDEuODkyNTQwODQgTDQuNjU1MDEzNjIsMS4wOTQ4MjQ2IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="> 分享
                                            </a>
                                            <div class="shares-pop">
                                                <div class="social-share share share-component">
                                                    <a class="social-share-icon icon-qq" @click="qZone(d.title)" target="_blank"></a>
                                                    <a class="social-share-icon icon-weibo" @click="sinaWeiBo(d.title)" target="_blank"></a>
                                                    <a class="social-share-icon icon-wechat" href="javascript:">
                                                        <div class="wechat-qrcode">
                                                            <div id='qrcode' class="qrcode">
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>

                                        </span>
                                        <ol>
                                            <a href="javascript:void(0)" class="like fall" @click="bullorbad(d.id,1)">
                                                <label class="text">利空 {{d.bad}}</label>
                                            </a>
                                            <i class="addition green" style="display: none;">+1</i>
                                            <i class="addition green" style="display: none;">-1</i>
                                        </ol>
                                        <ol>
                                            <a href="javascript:void(0)" class="like rose" @click="bullorbad(d.id,0)">
                                                <label class="text">利好 {{d.bull}}</label>
                                            </a>
                                            <i class="addition red" style="display: none;">+1</i>
                                            <i class="addition red" style="display: none;">-1</i>
                                        </ol>
                                    </section>
                                </div>
                                <div class="fig clearfix">
                                    <a href="/">首页</a> -
                                    <a href="/lives">快讯</a> -
                                    <a href="javascript:void(0)">快讯详情</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script type="">
if (typeof window !== "undefined") {
    var QRCode = require("qrcodejs2");
}
export default {
    name: "lives-details",
    data() {
        return {
            d: {} //快讯详情列表
        };
    },
    computed: {
        day() {
            return new Date().getDate();
        },
        month() {
            return new Date().getMonth() + 1;
        },
        week() {
            return new Date().getDay();
        }
    },
    created() {
        this.getdetails();
    },
    mounted () {
      this.weixin()    
    },
    methods: {
        getdetails() {
            //获取快讯详情
            console.log(this.$route.params);

            this.$axios
                .$post(
                    `api/flash/findoneflash?flashId=${this.$route.params.id}`
                )
                .then(res => {
                    if (res.errorCode == 0) {
                        this.d = res.data;
                    }
                    console.log(res);
                });
        },
        bullorbad(id, bullBad) {
            //点赞
            // console.log(process.env.baseURL);
            this.$axios({
                url: "/api/flash/bullorbad",
                method: "post",
                params: {
                    flashId: id,
                    bullBad
                }
            })
                .then(res => {
                    if (res.data.errorCode == 0) {
                        console.log(res.data.data.bad);
                        // this.$set
                        this.d.bull = res.data.data.bull;
                        this.d.bad = res.data.data.bad;
                    }
                })
                .catch(err => {});
        },
                // 分享
        qZone(title) {
            //QQ
            var p = {
                url: document.location,
                desc: "这篇文章不错,分享一下~~" /*默认分享理由(可选)*/,
                summary: document.title /*分享摘要(可选)*/,
                title /*分享标题(可选)*/,
                site: "火鸟财经链" /*分享来源 如：腾讯网(可选)summary*/
            };
            var s = [];
            for (var i in p) {
                s.push(i + "=" + encodeURIComponent(p[i] || ""));
            }
            var target_url =
                "https://connect.qq.com/widget/shareqq/index.html?" +
                s.join("&");
            window.open(target_url, "qZone");
        },

        sinaWeiBo(title) {
            //微博
            var param = {
                url: document.location,
                title /** 分享的文字内容(可选，默认为所在页面的title)*/,
                rnd: new Date().valueOf()
            };
            var temp = [];
            for (var p in param) {
                temp.push(p + "=" + encodeURIComponent(param[p] || ""));
            }
            var target_url =
                "http://service.weibo.com/share/share.php?" + temp.join("&");
            window.open(target_url, "sinaweibo");
        },

        //微信
        weixin() {
            //生成分享二维码
            // console.log(document.getElementById(`qrcode${id}`));
            var qrcode = new QRCode(document.getElementById('qrcode'), {
                width: 100, // 设置宽度
                height: 100, // 设置高度
                text: document.location.href //二维码内容
            });
            console.log(qrcode);
        },
    },
    components: {}
};
</script>

<style scoped lang="">
.js-main {
    padding: 0 15px;
    margin-bottom: 50px;
    margin-top: 30px;
    width: calc(100% - 15px * 2);
}
.js-main .js-home-main {
    margin: 0 auto;
    width: 1170px;
}
/* 左边内容  */
.js-main .js-home-main .js-left {
    width: 770px;
    float: left;
}
.js-lives .title {
    height: 90px;
}
.js-lives .title .date {
    height: 44px;
    float: left;
}
.js-lives .title .date ul {
    width: 40px;
    height: 44px;
    display: block;
    border-radius: 4px;
    float: left;
    text-align: center;
}
.js-lives .title .date ul .month {
    border-radius: 6px 6px 0 0;
}
.js-lives .title .date ul span {
    width: 40px;
    height: 20px;
    line-height: 20px;
    background: #c4192d;
    color: #fff;
    display: block;
}
.js-lives .title .date ul span:nth-child(2) {
    font-weight: bold;
    background: #fff;
    color: #333;
    height: 24px;
    line-height: 24px;
    padding-bottom: 2px;
    box-sizing: content-box;
}
.js-lives .title .date ul .day {
    width: 38px;
    border-radius: 0 0 6px 6px;
    border-left: #dcdcdc 1px solid;
    border-right: #dcdcdc 1px solid;
    border-bottom: #dcdcdc 1px solid;
}
.js-lives .title .date ol {
    display: block;
    height: 44px;
    margin-left: 58px;
}
.js-lives .title .date ol .week {
    color: #333;
    font-weight: bold;
    font-size: 18px;
}
.js-lives .title .date ol li:nth-child(2) {
    color: #999;
    white-space: nowrap;
}
.js-lives .title .tabs {
    padding: 4px 0 0 30px;
    margin-left: 30px;
    height: 44px;
    float: left;
    border-left: #dcdcdc 1px solid;
    font-size: 18px;
}
.js-lives .main .control-detail {
    margin-left: 0;
    padding: 0;
    border-left: none;
}
.js-lives .main .control {
    margin-left: 5px;
    padding: 0 0 30px 20px;
    border-left: #dcdcdc 1px solid;
    position: relative;
}
.js-lives .main .control .time-detail {
    font-weight: 600;
    display: block;
    margin-top: 3px;
    margin-bottom: 20px;
    font-size: 18px;
}
.js-lives .main .control .grade {
    float: right;
    padding-top: 3px;
}
.js-lives .main .control .intro-detail {
    margin-left: 0;
}
.js-lives .main .control .content-detail,
.js-lives .main .control .content a {
    text-align: justify;
    word-break: normal;
    word-wrap: break-word;
}
.js-lives .main .control .content-detail {
    margin-bottom: 30px;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 22px;
}
.line36,
.js-lives .main .control .content-detail {
    line-height: 36px;
}
.js-lives .main .control .livesb {
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
}

.intro-detail .content-detail a {
    cursor: default;
}
.js-lives .main .control span {
    position: relative;
}

.js-lives .main .control span {
    float: right;
    margin: 6px 0 0 10px;
    display: block;
}
.js-lives .main .control .resource span img {
    margin-right: 4px;
}
.js-lives .main .control ol {
    float: right;
    position: relative;
}
.js-lives .main .control ol .fall {
    background: url(/static/imgs/fall.svg) 6px 7px no-repeat;
}
.js-lives .main .control ol a {
    padding: 4px 6px 4px 30px;
    color: #999;
    border-radius: 4px;
    border: #fff 1px solid;
    display: block;
}
.js-lives .main .control ol .fall:hover {
    background: url(/static/imgs/fall-h.svg) 6px 7px no-repeat;
}

.js-lives .main .control ol a:hover {
    color: #333;
    border: #dcdcdc 1px solid;
}
.like label {
    cursor: pointer;
}
.js-lives .main .control .green {
    color: #5da310;
}

.js-lives .main .control .addition {
    position: absolute;
    top: -14px;
    left: 27px;
    font-weight: bold;
}
.js-lives .main .control ol + ol {
    margin-right: 10px;
}
.js-lives .main .control ol .rose {
    background: url(/static/imgs/rose.svg) 6px 7px no-repeat;
}
.js-lives .main .control .red {
    color: #c4192d;
}
.js-lives .main .control .addition {
    position: absolute;
    top: -14px;
    left: 27px;
    font-weight: bold;
}
.js-lives .main .control ol .rose:hover {
    background: url(/static/imgs/rose-h.svg) 6px 7px no-repeat;
}
a {
    color: #333;
    text-decoration: none;
}
.share a {
    color: #999;
}
.live-share:hover .shares-pop {
    display: block;
}

.live-share .shares-pop {
    position: absolute;
    top: 26px;
    bottom: unset;
    left: calc(50% - 93px);
    background: #fff;
    border: 0 solid #f6f6f6;
    box-shadow: 0 0 3px 0 hsla(0, 0%, 65%, 0.5);
    border-radius: 4px;
    padding: 0 6px;
    width: 137px;
    box-sizing: border-box;
    z-index: 9;
    display: none;
}
.live-share .shares-pop:before {
    content: "";
    position: absolute;
    left: 50%;
    top: -7px;
    border-style: solid;
    border-color: #fff transparent transparent;
    width: 6px;
    height: 6px;
    background: linear-gradient(0deg, #ddd, #ddd) no-repeat,
        linear-gradient(90deg, #ddd, #ddd) no-repeat,
        linear-gradient(135deg, #fff, #fff 6px, hsla(0, 0%, 100%, 0) 0)
            no-repeat;
    background-size: 6px 1px, 1px 6px, 6px 6px;
    transform: rotate(45deg);
}
.live-share .shares-pop .social-share {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-align: center;
    align-items: center;
}

.social-share {
    font-family: socialshare !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.live-share .shares-pop a {
    width: 24px;
    height: 24px;
    padding: 6px;
    float: left;
    display: block;
}
.live-share .shares-pop a {
    width: 100%;
    height: auto;
    line-height: normal;
    padding: 17px 0;
    font-size: 14px;
    color: #2a1d02;
    text-align: center;
    border-bottom: 1px solid #eaeaea;
    margin-left: 0;
    border-radius: 0;
    background-position: 11px, 15px;
    background-repeat: no-repeat;
    text-align: left;
    margin: 0;
}

.live-share .shares-pop a + a {
    margin-left: 0;
}
.live-share .shares-pop .icon-qq {
    background-image: url(/static/imgs/qq-icon.svg);
    background-size: 20px 17px;
    border: 0;
    padding: 0;
    margin-top: 20px;
}
.live-share .shares-pop .icon-weibo {
    background-image: url(/static/imgs/weibo-icon.svg);
    background-size: 20px 17px;
}
.live-share .shares-pop a:last-child {
    border-bottom: 0;
}

.live-share .shares-pop .icon-wechat {
    background-position: left 11px bottom 19px;
    padding-top: 0;
    background-image: url(/static/imgs/weixin-icon.svg);
    background-size: 16px 17px;
}
.live-share .shares-pop .icon-qq:after {
    content: "腾讯qq";
}
.live-share .shares-pop .icon-weibo:after {
    content: "新浪微博";
}

.live-share .shares-pop .icon-wechat:after {
    content: "微信扫一扫";
}

.live-share .shares-pop a:after {
    padding-left: 35px;
}
.social-share .icon-wechat .wechat-qrcode .qrcode {
    width: 105px;
    margin: 10px auto;
}
/* 分享完 */

</style>
