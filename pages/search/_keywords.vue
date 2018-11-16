<template>
    <div class="">
        <div class="js-main">
            <div class="js-home-main clearfix">
                <div class="js-left">
                    <div class="js-search">
                        <input name="search" type="text" placeholder="请输入搜索内容" maxlength="50" v-model="keywords" @keyup.enter="search">
                        <a href="javascript:;" @click="search"><img src="~/static/imgs/search1-cion.svg" alt=""></a>
                    </div>
                    <!-- tabbar -->
                    <div class="article-tabs">
                        <ul>

                            <a href="javascript:;" :title="i.title" :class="{'active':type==index}" v-for="(i,index) in nav" :key="index" @click="type=index">
                                {{i.title}}
                                <span></span>
                            </a>

                        </ul>
                    </div>
                    <div class="ja-article-list empty-mg0">
                        <!-- 文章 -->
                        <div class="article-main" v-if="type==0">
                            <div class="search_txt searchDisplay searchTopic">为您找到
                                <span>{{total}}</span> 篇文章：</div>
                            <ol class="article-phones" v-for="(i,index) in sresult" :key="index">
                                <div>
                                    <nuxt-link :to="'/article/'+i.articleId" target="_blank" class="article-img"><img :src="getimgs(i.image)" :title="i.title"></nuxt-link>
                                    <ul>
                                        <h3 class="font20">
                                            <nuxt-link :to="'/article/'+i.articleId" target="_blank" :title="i.title">
                                                <div class="article-tag">
                                                </div>
                                                <span>{{i.title}}</span>
                                            </nuxt-link>
                                        </h3>
                                        <li>
                                            <!-- <strong class="keyword">1</strong> -->
                                            {{i.introduction}}
                                        </li>
                                        <li class="article-info">
                                            <nuxt-link :to='`/member/${i.userId}`' target="_blank"><img :src="getimgs(i.userHeader)" title="TAC溯源链" alt="作者" class="author">
                                                <span>{{i.nickName}}</span>
                                            </nuxt-link>
                                            <span> · {{i.createTime}}</span>
                                            <span class="fr">{{i.readNo}}</span> <img src="~/static/imgs/read.svg" alt="" class="fr amount"></li>
                                    </ul>
                                </div>
                            </ol>
                        </div>
                        <!-- 快讯 -->
                        <div class="js-lives" v-if="type==1">
                            <div class="main">
                                <div class="control clearfix data-bottom-id" v-for="(i,index) in sresult" :key='index'>
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
                                                        <a class="social-share-icon icon-qq" @click="qZone(i.title)" target="_blank"></a>
                                                        <a class="social-share-icon icon-weibo" @click="sinaWeiBo(i.title)" target="_blank"></a>
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

                            </div>

                        </div>
                        <!-- 专栏作者 -->
                        <!-- <div class="js-search-columns" v-if="type==4">
                            <div class="control">
                                <ul>
                                    <li>
                                        <a href="/member/22304" target="_blank" class="photo"><img src="https://img.jinse.com/161504_image20.png" alt="BTC_海菲"></a>
                                    </li>
                                </ul>
                                <ol>
                                    <li class="name">
                                        <a href="/member/22304" target="_blank">BTC_
                                            <strong class="keyword">海</strong>菲</a>
                                        <span><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTFweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgNTEgMjAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjIgKDUxMTYwKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5wZXJzb25hbGx5LWljb248L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0i5a6M5oiQIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5LiT5qCP5L2c6ICFIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtOTYzLjAwMDAwMCwgLTIxOC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9InBlcnNvbmFsbHktaWNvbiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOTYzLjAwMDAwMCwgMjE4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0zOCIgZmlsbD0iIzdFRDMyMSIgeD0iMCIgeT0iMCIgd2lkdGg9IjUxIiBoZWlnaHQ9IjIwIiByeD0iMTAiPjwvcmVjdD4KICAgICAgICAgICAgICAgIDxjaXJjbGUgaWQ9Ik92YWwtNyIgZmlsbD0iI0ZGRkZGRiIgY3g9IjEwIiBjeT0iMTAiIHI9IjgiPjwvY2lyY2xlPgogICAgICAgICAgICAgICAgPHRleHQgaWQ9IuS4quS6uiIgZm9udC1mYW1pbHk9IlBpbmdGYW5nU0MtTWVkaXVtLCBQaW5nRmFuZyBTQyIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjQwMCIgZmlsbD0iI0ZGRkZGRiI+CiAgICAgICAgICAgICAgICAgICAgPHRzcGFuIHg9IjIxIiB5PSIxNCI+5Liq5Lq6PC90c3Bhbj4KICAgICAgICAgICAgICAgIDwvdGV4dD4KICAgICAgICAgICAgICAgIDx0ZXh0IGlkPSJ2IiBmb250LWZhbWlseT0iQXJpYWxSb3VuZGVkTVRCb2xkLCBBcmlhbCBSb3VuZGVkIE1UIEJvbGQiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIGZpbGw9IiM3RUQzMjEiPgogICAgICAgICAgICAgICAgICAgIDx0c3BhbiB4PSI2IiB5PSIxNSI+djwvdHNwYW4+CiAgICAgICAgICAgICAgICA8L3RleHQ+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" alt="个人认证"></span>
                                    </li>
                                    <li class="text">数字资产投资者</li>
                                    <li>
                                        <dl>
                                            <dt>文章数：</dt>
                                            <dd>75</dd>
                                        </dl>
                                        <dl>
                                            <dt>浏览数：</dt>
                                            <dd>200万</dd>
                                        </dl>
                                    </li>
                                </ol>
                            </div>
                        </div> -->
                        <!-- 没有搜索 -->
                        <div class="no-more-data" v-if="nosearch">
                            <div class="icon_empty"><img src="~/static/imgs/icon_empty.svg" alt=""></div>
                            <span>搜索为空，换个关键词试试</span>
                        </div>
                    </div>
                </div>
                <div class="js-right">
                    <div class="ja-hot-article">
                        <div class="font18 article-tabs tabs-height">
                            <ul>
                                <a title="热门文章" class="active nohover">热门文章</a>
                            </ul>
                        </div>
                        <!---->
                        <div class="js-hot-article">
                            <ul>
                                <li>
                                    <i>1</i>
                                    <a href="https://www.jinse.com/news/bitcoin/223862.html">分析师揭秘比特币大额转账背后玄机</a>
                                </li>
                            </ul>
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
    name: "search",
    data() {
        return {
            type: 0, //搜索类型
            nav: [
                { title: "文章" },
                { title: "快讯" },
                { title: "交易所" },
                { title: "币种" },
                { title: "专栏作者" },
                { title: "活动" },
                { title: "企业" },
                { title: "人物" }
            ], //导航
            keywords: this.$route.params.keywords, //搜索词
            sresult: [
                {
                    bad: "0",
                    bull: "1",
                    content: "8888888",
                    createTime: "2018-08-08 12:02:56",
                    id: "3"
                }
            ], //搜索结果
            total: 0, //搜索条数
            hotlist: [] //热门新闻
        };
    },
    components: {},
    watch: {
        type() {
            this.sresult = [];
            this.search();
        }
    },
    created() {
        this.search();
    },
    computed: {
        nosearch() {
            //没有搜索结果
            console.log(this.total == 0);
            return this.total == 0;
        }
        // keywords(){//搜索关键词
        //     return this.$route.params.keywords
        // }
    },
    methods: {
        search() {
            //搜索
            if (this.keywords == "") {
                return;
            }
            this.$axios({
                url: "/api/search/search",
                method: "post",
                params: {
                    params: this.keywords,
                    type: this.type,
                    page: 1,
                    rows: 50
                }
            })
                .then(res => {
                    if (res.data.errorCode == 0) {
                        this.sresult = res.data.data.data;
                        this.total = res.data.data.total;
                        if (this.type == 1) {
                            this.$nextTick(function() {
                                this.createqr();
                            });
                        }
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
                        for (let i = 0; i < this.sresult.length; i++) {
                            for (const key in this.sresult[i]) {
                                if (key == "id") {
                                    if (this.sresult[i][key] == id) {
                                        this.$set(
                                            this.sresult[i],
                                            "bad",
                                            res.data.data.bad
                                        );
                                        this.$set(
                                            this.sresult[i],
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
                }
            });
        },
        getimgs(id) {
            //获取图片
            return `${process.env.imgUrl}/api/image/display/${id}`;
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
            console.log(this.sresult);
            for (let i = 0; i < this.sresult.length; i++) {
                this.weixin(this.sresult[i].id);
            }
        }
    }
};
</script>

<style scoped lang="">
/* 左边内容 */
.js-search {
    margin-bottom: 30px;
    position: relative;
}
.js-search input {
    width: 100%;
    height: 50px;
    font-weight: bold;
    border-bottom: #dcdcdc 1px solid;
    border-left: none;
    border-right: none;
    border-top: none;
    outline: none;
    font-size: 18px;
}
.js-search a {
    position: absolute;
    padding: 10px;
    right: 0;
    top: 10px;
    display: block;
}
.article-tabs {
    height: 65px;
    font-size: 18px;
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
.article-tabs ul .active span {
    width: 100%;
    height: 3px;
    background: #f29700;
    position: absolute;
    left: 0;
    bottom: -8px;
    opacity: 1;
}
.article-tabs ul a + a {
    margin-left: 24px;
}
/* 文章 */
.empty-mg0 {
    margin: 0;
}
.search_txt.searchTopic.searchDisplay {
    display: block;
}

.search_txt {
    color: #999;
    font-size: 14px;
    margin-bottom: 30px;
}
.ja-article-list .article-main ol .article-img {
    width: 270px;
    height: 167px;
    display: block;
    float: left;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
}

.ja-article-list .article-main ol .article-img img {
    width: 100%;
    height: 100%;
    -webkit-transition: -webkit-transform 0.15s ease-in;
    transition: -webkit-transform 0.15s ease-in;
    transition: transform 0.15s ease-in;
    transition: transform 0.15s ease-in, -webkit-transform 0.15s ease-in;
    will-change: transform;
}
.ja-article-list .article-main ol ul {
    margin-left: 303px;
    height: 167px;
    display: block;
    position: relative;
}
.ja-article-list .article-main ol ul h3 {
    line-height: 28px;
    margin-bottom: 6px;
    overflow: hidden;
    display: -webkit-box;
    display: -moz-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 20px;
}
.ja-article-list .article-main ol ul li:nth-child(2) {
    height: 66px;
}

.eq3,
.ja-article-list .article-main ol ul li:nth-child(2),
.js-right-visit .visit ul span,
.js-hot-project dl dd .title a,
.js-related dl dd .title a {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

.ja-article-list .article-main ol ul li {
    line-height: 22px;
    color: #666;
}
.ja-article-list .article-main ol h3 a .keyword,
.ja-article-list .article-main ol ul li:nth-child(2) .keyword {
    font-style: normal;
    color: #f29700;
}
.ja-article-list .article-main ol ul .article-info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
}

.ja-article-list .article-phones .article-info {
    width: 100%;
    padding-top: 16px;
    color: #999;
}
.ja-article-list .article-main ol ul li + li {
    margin-top: 12px;
}
.ja-article-list .article-main ol ul .article-info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
}

.ja-article-list .article-phones .article-info {
    width: 100%;
    padding-top: 16px;
    color: #999;
}
.ja-article-list .article-main ol ul li + li {
    margin-top: 12px;
}
.ja-article-list .article-phones .article-info .author {
    width: 24px;
    height: 24px;
    border-radius: 100%;
    margin-right: 4px;
}
.ja-article-list .article-main ol ul li span,
.ja-article-list .article-main ol ul li img {
    color: #999;
    display: inline-block;
}
.ja-article-list .article-phones .article-info .amount {
    margin: 5px 2px 0 0;
}
.ja-article-list .article-main ol + ol {
    margin-top: 40px;
}
a {
    color: #333;
}
/* 快讯 */
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
/* 作者 */
.js-search-columns {
    margin-bottom: 50px;
}
.js-search-columns .control {
    height: 120px;
    margin-bottom: 30px;
    position: relative;
}
.js-search-columns .control ul {
    width: 70px;
    float: left;
    display: block;
}
.js-search-columns .control ul li {
    display: block;
}
.js-search-columns .control ul li .photo {
    width: 70px;
    height: 70px;
    border-radius: 100%;
    overflow: hidden;
    display: block;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.js-search-columns .control ul li .photo img {
    width: 100%;
    height: 100%;
    -webkit-transition: -webkit-transform 0.15s ease-in;
    transition: -webkit-transform 0.15s ease-in;
    transition: transform 0.15s ease-in;
    transition: transform 0.15s ease-in, -webkit-transform 0.15s ease-in;
    will-change: transform;
}
.js-search-columns .control ol {
    margin-left: 100px;
}
.js-search-columns .control ol .name {
    font-weight: bold;
    font-size: 16px;
}
.js-search-columns .control ol .name .keyword {
    font-style: normal;
    color: #f29700;
}
.js-search-columns .control ol .name span {
    margin-left: 16px;
}
.js-search-columns .control ol .text {
    overflow: hidden;
    display: -ms-flexbox;
    -webkit-line-clamp: 2;
}
.js-search-columns .control ol .text {
    color: #999;
    height: 40px;
}
.js-search-columns .control ol li + li {
    margin-top: 8px;
}

.js-search-columns .control ol li {
    display: block;
}
.js-search-columns .control ol li dl {
    display: inline-block;
}
.js-search-columns .control ol li dl dt {
    color: #999;
    display: block;
    float: left;
    padding-top: 2px;
    font-size: 12px;
}
.js-search-columns .control ol li dl dd {
    display: block;
    float: left;
}
.js-search-columns .control ol li dl + dl {
    margin-left: 20px;
}
/* 没有更多数据 */
.no-more-data {
    text-align: center;
    margin-top: 40px;
    color: #999;
}
.icon_empty {
    margin: 0px auto 20px;
    text-align: center;
}
/*  右边内容 */
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
