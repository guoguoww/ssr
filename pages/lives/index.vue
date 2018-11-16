<template>
    <div class="js-main">
        <div class="js-home-main clearfix">
            <!-- 左边内容 -->
            <div class="js-left">
                <div class="js-lives">
                    <div class="title">
                        <div class="date">
                            <ul class="tc">
                                <span class="font12 month">{{month}}月</span>
                                <span class="font18 day">{{day}}</span>
                            </ul>
                            <ol>
                                <li class=" week">今天</li>
                                <li>星期{{week}}</li>
                            </ol>
                        </div>
                        <div class="article-tabs tabs">
                            <ul>
                                <a href="javascript:void(0)" title="快讯" class="active">快讯
                                    <span></span>
                                </a>

                            </ul>
                        </div>
                    </div>
                    <div class="main">
                        <div class="control clearfix data-bottom-id" v-for="(i,index) in liveslist" :key='index'>
                            <div class="grade2"></div>
                            <div class="time">{{i.createTime.split(' ')[1]}}</div>
                            <div class="intro">
                                <div class="content">
                                    <nuxt-link :to="'/lives/'+i.id" target="_blank" class="livesb">{{i.title}}</nuxt-link>
                                    <nuxt-link :to="'/lives/'+i.id" target="_blank">{{i.content}}</nuxt-link>
                                </div>
                                <!-- <div class="photo clearfix">
                                    <a><img src="https://img.jinse.com/1029291_rate.png" alt="https://img.jinse.com/1029291_watermark.png" preview-title-enable="false" preview-nav-enable="false" v-preview="url"></a>
                                </div> -->
                                <div class="font12 clearfix">
                                    <ul>
                                    </ul>
                                    <span class="share live-share">
                                        <a href="javascript:;"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTRweCIgaGVpZ2h0PSIxNHB4IiB2aWV3Qm94PSIwIDAgMTQgMTQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjEgKDUxMTQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5zaGFyZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJTeW1ib2xzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5Zu+5qCHL+WIhuS6qyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTEuMDAwMDAwLCAtMS4wMDAwMDApIiBmaWxsPSIjOUI5QjlCIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8ZyBpZD0ic2hhcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTMuMjYyNzcwMjEsMTAuNzA0NDkwNiBDMy4yNjI3NzAyMSwxMC43MDQ0OTA2IDMuMjUxODIwNzQsMTAuNzg2NjczNiAzLjI1ODQ2NDc5LDEwLjgzMzAwODQgTDMuMjU4NDY0NzksMTAuODM1NjAzMyBDMy4yNzc2MDM2MywxMS4wMzU2ODUxIDMuNDQ2MTI2MjcsMTEuMTkyMDY4MyAzLjY1MTEyNTEsMTEuMTkyMDY4MyBDMy44NTYxOTgyOSwxMS4xOTIwNjgzIDQuMDEyNDY1OCwxMS4wNDAyNzE1IDQuMDQzNzg1NDEsMTAuODM1NjAzMyBMNC4wNzQ4OTAxNywxMC42NTQ5NjYgQzUuNjA3ODMyMTYsNC4yNzA1NzUxNSAxMC4zOTg4OTc4LDMuMTU0OTM1OTYgMTIuNTgxOTkwMiwyLjk4NDU2MjIzIEwxMC4zNzY3NTkyLDUuMDQyNDI1ODQgQzEwLjIxOTk2MjgsNS4xOTU3NzYyNCAxMC4yMTcwNzg3LDUuNDQ5NjEzODMgMTAuMzcwNDI5MSw1LjYwNjQxODQ2IEMxMC41MjM3OTYxLDUuNzYzMjcyNjkgMTAuNzc3NjE3MSw1Ljc2NjE4MTUyIDEwLjkzNDQ5NjEsNS42MTI4MTQ2MSBMMTMuODcyMTkyOSwyLjg3MTM1NzE0IEMxMy45NTE4MTQxLDIuNzkzNTM3NDEgMTMuOTkxNjUzNiwyLjY4OTgwMjU3IDEzLjk5MTY1MzYsMi41ODU5NjAzIEMxMy45OTQxNDkzLDIuNDUwOTYzNjkgMTMuOTI4Mzc4MSwyLjMxNzUyODk0IDEzLjgwNjU3ODcsMi4yNDA0MTE2MyBMMTAuMjIzNDgzMiwwLjA2OTQzMzgwOTggQzEwLjAzODE3NjksLTAuMDQ3OTExNDMxNCA5Ljc5MDUyMDU1LDAuMDA3Nzk0NSA5LjY3MzE4MzU3LDAuMTkzMTE3MzQ1IEM5LjU1NTgzODMzLDAuMzc4NDk4MDI5IDkuNjExNDUzMzcsMC42MjYxNDYwNjEgOS43OTY4NTA1OCwwLjc0MzQ4MzAzOSBMMTIuMjU1NTcyMSwyLjIzMzI0Njk1IEM0LjYxMjkwOTgxLDIuOTYzNDczMTQgMy40MDI1MjY3NCw5LjY2NzQ3MjcyIDMuMjYyNzcwMjEsMTAuNzA0NDkwNiBaIiBpZD0iU2hhcGUiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy45OTE3MzYzLDcuNzkxMjM4MDUgQzEzLjk5MTczNjMsNy41NzA5MjY1MSAxMy44MTMxNDg0LDcuMzkyNDEyOTkgMTMuNTkyODM2OCw3LjM5MjQxMjk5IEMxMy4zNzI2MTYyLDcuMzkyNDEyOTkgMTMuMTk0MDAzNSw3LjU3MDkyNjQ5IDEzLjE5NDAwMzUsNy43OTEyMzgwNSBDMTMuMTk0MDAzNSw3Ljc5MzIxMzA4IDEzLjE5NDE2ODgsNy43OTUwNjQxNyAxMy4xOTQxNjg4LDcuNzk3MDIyNjggTDEzLjE5NDAwMzUsNy43OTcwMjI2OCBMMTMuMTk0MDAzNSwxMS44OTkxNjQzIEMxMy4xOTQwMDM1LDEyLjI0MTk2OTQgMTMuMDU5MDE1MSwxMi41NjU3OTI3IDEyLjgxMzg0NjIsMTIuODEwOTUzMyBDMTIuNTY4NjExMiwxMy4wNTYxMDU3IDEyLjI0NDg2MjMsMTMuMTkxMjAxNSAxMS45MDIwNzM3LDEzLjE5MTIwMTUgTDIuMDk2NzU1MiwxMy4xOTEyMDE1IEMxLjc1Mzk2NjYxLDEzLjE5MTIwMTUgMS40MzAyMDExOCwxMy4wNTYxMDU3IDEuMTg0OTgyNywxMi44MTA5NTMzIEMwLjkzOTgzMDMyMiwxMi41NjU3OTI3IDAuODA0ODMzNzE2LDEyLjI0MTk2OTQgMC44MDQ4MzM3MTYsMTEuODk5MTY0MyBMMC44MDQ4MzM3MTYsMy4xODQ0Nzg4NiBDMC44MDQ4MzM3MTYsMi44NDE2NjU0OCAwLjkzOTgzMDMyMiwyLjUxNzg1MDQ4IDEuMTg0OTgyNywyLjI3MjY5ODA4IEMxLjQzMDEyNjgyLDIuMDI3NTM3NDQgMS43NTM5NjY2MywxLjg5MjU0MDg0IDIuMDk2NzU1MiwxLjg5MjU0MDg0IEw0LjY1NTAxMzYyLDEuODkyNTQwODQgQzQuODc1MjUwOCwxLjg5MjU0MDg0IDUuMDUzODQ2OTUsMS43MTM5NTI5NSA1LjA1Mzg0Njk1LDEuNDkzNjMzMTQgQzUuMDUzODQ2OTUsMS4yNzM0MDQyMiA0Ljg3NTI1OTA2LDEuMDk0ODI0NjEgNC42NTUwMTM2MiwxLjA5NDgyNDYgTDIuMDk2NzU1MiwxLjA5NDgyNDYgQzAuOTQ3NDgyNTQzLDEuMDk0ODI0NiAwLjAwNzA5MjY3NDUxLDIuMDM1MTE1MyAwLjAwNzA5MjY4ODI0LDMuMTg0NDc4ODYgTDAuMDA3MDkyNjg4MjQsMTEuODk5MjU1MiBDMC4wMDcwOTI2ODgyNCwxMy4wNDg1MzYxIDAuOTQ3NDgyNTU3LDEzLjk4ODkzNDIgMi4wOTY3NTUyLDEzLjk4ODkzNDIgTDExLjkwMjA3MzcsMTMuOTg4OTM0MiBDMTMuMDUxMzQ2NCwxMy45ODg5MzQyIDEzLjk5MTczNjMsMTMuMDQ4NTM2MSAxMy45OTE3MzYzLDExLjg5OTI1NTIgTDEzLjk5MTczNjMsNy43OTcwMjI2OCBMMTMuOTkxNTcxLDcuNzk3MDIyNjggQzEzLjk5MTU3OTIsNy43OTUwNjQxNyAxMy45OTE3MzYyLDcuNzkzMjEzMDggMTMuOTkxNzM2Myw3Ljc5MTIzODA1IFogTTQuNjU1MDEzNjIsMS4wOTQ4MjQ2IEw0LjY1NTAxMzYyLDEuODkyNTQwODQgTDQuNjU1MDEzNjIsMS4wOTQ4MjQ2IFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4="> 分享
                                        </a>
                                        <div class="shares-pop">
                                            <div class="social-share share share-component">
                                                <a class="social-share-icon icon-qq" @click="qZone(d.title)" target="_blank"></a>
                                                <a class="social-share-icon icon-weibo" @click="sinaWeiBo(d.title)" target="_blank"></a>
                                                <a class="social-share-icon icon-wechat" href="javascript:">
                                                    <div class="wechat-qrcode">
                                                        <div :id='`qrcode${i.id}`' class="qrcode">
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>

                                    </span>
                                    <ol>
                                        <a href="javascript:;" class="like fall" @click="bullorbad(i.id,1)">
                                            <label class="text">利空 {{i.bad}}</label>
                                        </a>
                                        <i class="addition green" style="display: none;"></i>
                                    </ol>
                                    <ol>
                                        <a href="javascript:;" class="like like-width rose" @click="bullorbad(i.id,0)">
                                            <label class="text">利好 {{i.bull}}</label>
                                        </a>
                                        <i class="addition red" style="display: none;"></i>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div class="js-loading" v-if="articleloading">
                            <a href="javascript:void(0)">
                                <div class="loading">
                                    <div class="bounce1"></div>
                                    <div class="bounce2"></div>
                                    <div class="bounce3"></div>
                                </div>
                            </a>
                        </div>

                    </div>

                </div>

            </div>
            <!-- 右边内容 -->
            <div class="js-right">
                <div class="ja-hot-article">
                    <div class="font18 article-tabs tabs-height">
                        <ul>
                            <a title="热门文章" class="active nohover">热门文章</a>
                        </ul>
                        <!-- <div class="time-tabs">
                            <a href="javascript:;" class="time-tabs-left active">日</a>
                            <a href="javascript:;" class="time-tabs-right">周</a>
                        </div> -->
                    </div>
                    <!---->
                    <div class="js-hot-article">
                        <ul>
                            <li v-for="(i,index) in hotlist" :key='index'>
                                <i>{{index+1}}</i>
                                <nuxt-link :to="'/article/'+i.articleId">{{i.title}}</nuxt-link>
                            </li>
                        </ul>
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
    name: "lives",
    data() {
        return {
            liveslist: [], //快讯
            hotlist: [], //热点
            articleloading: false, //文章加载
            hotpage: 1, //页数
            hotrow: 10 //每页条目
        };
    },
    components: {},
    mounted() {
        // 添加滚动事件，检测滚动到页面底部
        window.addEventListener("scroll", this.scrollBottom);
    },
    destroyed() {
        //离开该页面需要移除这个监听的事件
        window.removeEventListener("scroll", this.scrollBottom);
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
        this.getlives();
        this.gethot();
    },
    methods: {
        scrollBottom() {
            //滚动事件
            // console.log(document.documentElement.offsetHeight ,document.documentElement.scrollTop ,window.innerHeight);
            // console.log(document.documentElement.offsetHeight-document.documentElement.scrollTop -window.innerHeight<150);
            if (
                document.documentElement.offsetHeight -
                    document.documentElement.scrollTop -
                    window.innerHeight <=
                    150 &&
                !this.articleloading
            ) {
                //滚动到底的时候触发加载
                this.articleloading = true; //加载动画
                this.getlives();
            }
        },
        getlives() {
            //获取快讯
            this.hotpage++;
            this.$axios({
                url: "/api/flash/queryflash",
                method: "get",
                params: {
                    page: this.hotpage,
                    row: this.hotrow
                }
            })
                .then(res => {
                    if (res.data.errorCode == 0) {
                        if (this.liveslist.length == 0) {
                            //判断快讯列表是否有数据
                            this.liveslist = this.liveslist.concat(
                                res.data.data
                            );
                            this.$nextTick(function() {
                                this.createqr();
                            });
                            return;
                        }
                        if (res.data.data.lenth == 0) {
                            //判断有无更多数据
                            this.$Message.info("没有更多");
                            if (process.client) {
                                window.removeEventListener(
                                    "scroll",
                                    this.scrollBottom
                                );
                            }
                        }
                        if (
                            res.data.data[res.data.data.length - 1].id !=
                            this.liveslist[this.liveslist.length - 1].id
                        ) {
                            //如果不重复
                            this.liveslist = this.liveslist.concat(
                                res.data.data
                            );
                            this.$nextTick(function() {
                                for (let i = 0; i < res.data.data.length; i++) {
                                    this.weixin(res.data.data[i].id);
                                }
                            });
                        } else {
                            //如果重复加载
                            if (process.client) {
                                this.$Message.info("没有更多");
                                window.removeEventListener(
                                    "scroll",
                                    this.scrollBottom
                                );
                            }
                        }
                        this.articleloading = false;
                    }
                })
                .catch(err => {});
        },
        bullorbad(id, bullBad) {
            //点赞
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
                        for (let i = 0; i < this.liveslist.length; i++) {
                            for (const key in this.liveslist[i]) {
                                if (key == "id") {
                                    if (this.liveslist[i][key] == id) {
                                        this.$set(
                                            this.liveslist[i],
                                            "bad",
                                            res.data.data.bad
                                        );
                                        this.$set(
                                            this.liveslist[i],
                                            "bull",
                                            res.data.data.bull
                                        );
                                    }
                                }
                            }
                        }
                    }
                })
                .catch(err => {});
        },
        gethot() {
            //获取热点
            this.$axios({
                method: "get",
                url: "/api/article/hot",
                params: {
                    page: 1,
                    rows: 10
                }
            }).then(res => {
                if (res.data.errorCode == 0) {
                    this.hotlist = this.hotlist.concat(res.data.data.data);
                    console.log(this.hotlist);
                }
            });
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
        weixin(id) {
            //生成分享二维码
            // console.log(document.getElementById(`qrcode${id}`));
            var qrcode = new QRCode(document.getElementById(`qrcode${id}`), {
                width: 100, // 设置宽度
                height: 100, // 设置高度
                text: document.location.href //二维码内容
            });
            console.log(qrcode);
        },
        createqr() {
            //快讯生成二维码
            for (let i = 0; i < this.liveslist.length; i++) {
                this.weixin(this.liveslist[i].id);
            }
        }
    }
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
.article-tabs ul {
    float: left;
}
.article-tabs ul a {
    position: relative;
    display: inline-block;
    color: #333;
    font-weight: bold;
}
.article-tabs ul a span {
    width: 100%;
    height: 3px;
    background: #f29700;
    position: absolute;
    left: 0;
    bottom: -8px;
    opacity: 1;
}

.js-lives .main .control {
    margin-left: 5px;
    padding: 0 0 30px 20px;
    border-left: #dcdcdc 1px solid;
    position: relative;
}
.js-lives .main .grade2 {
    width: 9px;
    height: 9px;
    background: #f29700;
    border-radius: 100%;
    position: absolute;
    left: -5px;
    top: 8px;
}
.js-lives .main .control .time {
    float: left;
    margin-top: 3px;
}
.js-lives .main .control .intro {
    margin-left: 60px;
}
.js-lives .main .control .content {
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
}

.js-lives .main .control .content .livesb {
    font-weight: bold;
    font-size: 16px;
}
.js-lives .main .control .content-detail,
.js-lives .main .control .content a {
    text-align: justify;
    word-break: normal;
    word-wrap: break-word;
}
.js-lives .main .control .content a {
    display: block;
}
.js-lives .main .control .livesb {
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
}
.js-lives .main .control .content a + a {
    margin-top: 6px;
}
.font12 {
    font-size: 12px;
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
.js-lives .main .control .photo {
    margin-top: 20px;
}
.js-lives .main .control .photo a {
    width: 210px;
    max-height: 85px;
    display: block;
    float: left;
    border-radius: 4px;
    overflow: hidden;
    margin: 0 6px 6px 0;
}
.js-lives .main .control .photo img {
    cursor: zoom-in;
}

.js-lives .main .control .photo img {
    width: 100%;
    height: 100%;
    -webkit-transition: -webkit-transform 0.15s ease-in;
    transition: -webkit-transform 0.15s ease-in;
    transition: transform 0.15s ease-in;
    transition: transform 0.15s ease-in, -webkit-transform 0.15s ease-in;
    will-change: transform;
}
.js-lives .main .control span a {
    /* padding: 3px 5px; */
    color: #999;
}
a {
    color: #333;
}
/* 右边内容 */
.js-main .js-home-main .js-right {
    width: 370px;
    float: right;
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
.js-hot-article {
    margin-bottom: 30px;
}
.js-hot-article ul li {
    display: block;
    height: 50px;
}
.ja-hot-article ul li i {
    height: 100%;
}

.js-hot-article ul li i {
    float: left;
    font-style: italic;
    font-weight: bold;
    color: #666;
    height: 22px;
    line-height: 22px;
    font-size: 22px;
}
.js-hot-article ul li:nth-child(1) i {
    color: #f29700;
}
.js-hot-article ul li:nth-child(2) i {
    color: #f29700;
}
.js-hot-article ul li:nth-child(3) i {
    color: #f29700;
}
.js-hot-article ul li a {
    margin-left: 38px;
    height: 44px;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-height: 22px;
    font-size: 16px;
}
/* // 分享 */
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
