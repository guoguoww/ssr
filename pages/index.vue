<template>
    <!-- 版心 -->
    <div class="home-main clearfix">
        <!-- 头部 -->
        <div class="main-head ">
            <!-- 轮播 -->
            <div class="carousel ">
                <Carousel v-model="select" loop>
                    <CarouselItem v-for="(i,index) in slidelist" :key='index'>
                        <div class="demo-carousel"><img :src="getimgs(i.imageId)" alt="标题">{{i.id}}</div>
                    </CarouselItem>
                </Carousel>
            </div>
            <!-- 头条 -->
            <div class="Headline">
                <div class="article-main">
                    <Scroll :on-reach-top="getmoreheadline" distance-to-edge='0' height='364'>
                        <ol class="clearfix list" v-for="(i,index) in headline" :key="index">
                            <nuxt-link :to="'/article/'+i.articleId" :title="i.title" target="_blank" class="article-img">
                                <img :src="getimgs(i.image)" :alt="i.title">
                            </nuxt-link>
                            <ul>
                                <h3 class="font20">
                                    <nuxt-link :to="'/article/'+i.articleId" :title="i.title" target="_blank">
                                        <div class="article-tag">
                                            <!-- <span class="article-tag-sole">独家</span> -->
                                            <span class="article-tag-hot" v-if="i.isHot==1">热门</span>
                                        </div>
                                        {{i.title }}</nuxt-link>
                                </h3>
                                <li>
                                    {{i.introduction}}</li>
                                <li class="article-info">
                                    <div class="article-tag">
                                        <span class="article-tag-top" v-if="i.isTop==1">置顶</span>
                                    </div>
                                    <nuxt-link :to='`/member/${i.userId}`'><img :src="getimgs(i.userHeader)" alt="作者" class="author">
                                        <span :title="i.nickName ">{{i.nickName }}</span>
                                    </nuxt-link>
                                    <span> · {{date(i.createTime)}}</span>
                                    <!-- <span class="js-generalize fr">推广</span> -->
                                    <span class="js-article-num fr">{{i.readNo}}</span> <img src="~/static/imgs/read.svg" alt="" class="fr amount"></li>
                            </ul>
                        </ol>
                    </Scroll>
                </div>
            </div>
        </div>
        <!-- 文章 -->
        <div class="main-left">
            <div class="article-tabs">
                <ul class="tabs-nav">
                    <li class="tabs-nav-item" v-for="(i,index) in articletype" :key="index" :class="{' nav-item-active':articleactive==index}" @click='articleactive=index'>{{i}}</li>

                </ul>
            </div>
            <div class="article-main">
                <ol class="clearfix list" v-for="(i,index) in articlelist" :key="index">
                    <nuxt-link :to="'/article/'+i.articleId" :title="i.title" target="_blank" class="article-img">
                        <img :src="getimgs(i.image)" :alt="i.title">
                    </nuxt-link>

                    <ul>
                        <h3 class="font20">
                            <nuxt-link :to="'/article/'+i.articleId" :title="i.title" target="_blank">
                                <div class="article-tag">
                                    <!-- <span class="article-tag-sole">独家</span> -->
                                    <span class="article-tag-hot" v-if="i.isHot==1">热门</span>
                                </div>
                                {{i.title }}</nuxt-link>
                        </h3>
                        <li>
                            {{i.introduction}}</li>
                        <li class="article-info">
                            <div class="article-tag">
                                <span class="article-tag-top" v-if="i.isTop==1">置顶</span>
                            </div>
                            <nuxt-link :to='`/member/${i.userId}`'><img :src="getimgs(i.userHeader)" alt="作者" class="author">
                                <span :title="i.nickName ">{{i.nickName }}</span>
                            </nuxt-link>
                            <span> · {{date(i.createTime) }}</span>
                            <!-- <span class="js-generalize fr">推广</span> -->
                            <span class="js-article-num fr">{{i.readNo}}</span> <img src="~/static/imgs/read.svg" alt="" class="fr amount"></li>
                    </ul>
                </ol>
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
        <!-- 右侧 -->
        <div class="main-right">
            <!-- 广告 -->
            <div class="js-right-ad">

                <a :href="'https://'+i.href" target="_blank" v-for="(i,index) in adlist" :key="index">
                    <img :src="getimgs(i.image)" alt="">
                    <ol :class="{'border-b-no':adlist.length==index+1}">
                        <li>{{i.name}}</li>
                        <span>{{i.title}}</span>
                    </ol>
                </a>
                <div class="note font12">广告</div>
            </div>
            <!-- 快讯 -->
            <div class="js-right-live">
                <div class="font18 live-tabs">
                    <ul>
                        <a href="javascript:;" title="快讯" class="active">快讯
                            <span></span>
                        </a>
                    </ul>
                    <ol>
                        <nuxt-link to="/lives" target="_blank" class="font16">
                            <span>更多</span>
                        </nuxt-link>
                    </ol>
                </div>
                <div class="main">
                    <Scroll :on-reach-bottom="getmorelives" distance-to-edge='0' height='600'>
                        <ul v-for="(i,index) in liveslist" :key="index">
                            <div class="grade1 grade2"></div>
                            <li class="time">{{date(i.createTime)}}</li>
                            <li class="content">
                                <nuxt-link :to="'/lives/'+i.id" target="_blank" class="livesb">{{i.title}}</nuxt-link>
                                <nuxt-link :to="'/lives/'+i.id" target="_blank" class="">{{i.content}}</nuxt-link>
                                <!---->
                            </li>
                            <li class="font12 clearfix">
                                <span class="live-share">
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
                                    <a href="javascript:;" class="like rose" @click="bullorbad(i.id,0)">
                                        <label class="text">利好 {{i.bull}}</label>
                                    </a>
                                    <i class="addition red" style="display: none;"></i>
                                </ol>
                            </li>
                        </ul>
                    </Scroll>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import dateStr from "~/static/js/time.js";
if (typeof window !== "undefined") {
    var QRCode = require("qrcodejs2");
}
export default {
    name: "index",
    components: {},
    data() {
        return {
            select: 0, //轮播初始
            articletype: [
                "政策",
                "对话",
                "行情",
                "投研",
                "评级",
                "技术",
                "百科"
            ], //文章类型
            articleactive: 0, //文章类型选项\
            articlelist: [], //文章列表
            articlepage: 1, //文章页数
            articlerows: 10, //文章每页条数
            articleloading: false, //文章loading
            articleltime: 3, //文章加载次数
            headline: [], //热门列表
            headpage: 1, //头条页数
            headrows: 10, //头条条目
            adlist: [
                {
                    href: "www.baidu.com",
                    id: "1",
                    image: "1",
                    name: "火鸟",
                    order: "1",
                    title: "最详细的区块链",
                    type: "0"
                },
                {
                    href: "www.mengniu.com",
                    id: "4",
                    image: "7",
                    name: "蒙牛",
                    order: "2",
                    title: "纯牛奶",
                    type: "0"
                },
                {
                    href: "www.sina.com.cn",
                    id: "2",
                    image: "2",
                    name: "execp",
                    order: "4",
                    title: "大boss",
                    type: "0"
                }
            ], //广告
            liveslist: [], //快讯列表
            livespage: 1, //快讯页数
            livesrow: 10, //快讯条目
            slidelist: [] //轮播图列表
        };
    },
    async asyncData({ app }) {
        //获取异步数据方法 在组件创建前触发
        //  return  await app.$axios({
        //             method: "get",
        //             url: "api/flash/queryflash",
        //             params: {
        //                 page: 1,
        //                 row: 10,
        //             }
        //         }).then(res=>{
        //             if (res.data.errorCode==0) {
        //                 return {liveslist:res.data.data}
        //             }
        //         })
        const [liveslist, articlelist, headline] = await Promise.all([
            app
                .$axios({
                    //获取快讯
                    method: "get",
                    url: "api/flash/queryflash",
                    params: {
                        page: 1,
                        row: 10
                    }
                })
                .then(res => {
                    if (res.data.errorCode == 0) {
                        return res.data.data;
                    }
                }),
            app
                .$axios({
                    //获取文章
                    method: "post",
                    url: "api/article/article",
                    params: {
                        page: 1,
                        rows: 10,
                        type: 1
                    }
                })
                .then(res => {
                    if (res.data.errorCode == 0) {
                        console.log(res.data.data.data);
                        
                        return res.data.data.data;
                    }
                }),
            app
                .$axios({
                    //获取头条
                    method: "get",
                    url: "/api/article/headline",
                    params: {
                        page: 1,
                        rows: 10
                    }
                })
                .then(res => {
                    if (res.data.errorCode == 0) {
                        return res.data.data.data;
                    }
                })
        ]);
        return { liveslist, articlelist, headline };
    },
    created() {
        // this.getarticle();
        this.getheadline();
        this.getad();
        // this.getlives();
        this.getslide();
    },
    mounted() {
        // 添加滚动事件，检测滚动到页面底部
        window.addEventListener("scroll", this.scrollBottom);
        this.createqr(); //创建二维码
    },
    destroyed() {
        //离开该页面需要移除这个监听的事件
        window.removeEventListener("scroll", this.scrollBottom);
    },
    watch: {
        articleactive() {
            //如果类型变化重新获取文章
            this.articlelist = []; //清空文章列表
            this.articlepage = 0;//页数清空
            this.getarticle();//重新获取文章列表
            if (process.client) {//判断是否为客户端 添加滚动事件
                window.addEventListener("scroll", this.scrollBottom);
            }
        }
    },
    methods: {
        date(date){//格式时间
            return dateStr(date)
        },
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
                if (this.articleltime <= 0) {
                    //加载次数小于0
                    return;
                }
                // this.articleltime--;//文章加载次数
                this.articleloading = true; //加载动画
                this.getarticle();
            }
        },
        async getarticle() {
            //获取文章
            this.articlepage++;
            await this.$axios({
                method: "post",
                url: "/api/article/article",
                params: {
                    page: this.articlepage,
                    rows: this.articlerows,
                    type: this.articleactive + 1
                }
            })
                .then(res => {
                    console.log(res);

                    if (res.data.errorCode == 0) {
                        this.articleloading = false;
                        console.log(res.data.data.data, this.articlelist);
                        if (res.data.data.data.length==0) {//获取数据列表条数为0
                            this.$Message.info("没有更多文章");
                            if(process.client){//如果为客户端
                                window.removeEventListener("scroll", this.scrollBottom);

                            }

                        }
                        if (this.articlelist.length == 0 ||res.data.data.data[res.data.data.data.length - 1].id !=this.articlelist[this.articlelist.length - 1].id) {
                            //判断文章数组有无数据 判断返回数据的最后一项是否与文章列表最后一项重合
                            this.articlelist = this.articlelist.concat(
                                res.data.data.data
                            );
                            console.log(this.articlelist);
                        } else {
                            this.articlepage--;
                        }
                    }
                    console.log(res);
                })
                .catch(err => {});
        },
        getheadline() {
            //获取头条
            this.headpage++;
            console.log(this.headpage);
            this.$axios({
                method: "get",
                url: "/api/article/headline",
                params: {
                    page: this.headpage,
                    rows: this.headrows
                }
            }).then(res => {
                if (res.data.errorCode == 0) {
                    if (res.data.data.data.length == 0) {
                        return;
                    }

                    if (
                        res.data.data.data[res.data.data.data.length - 1].id ==
                        this.headline[this.headline.length - 1].id
                    ) {
                        this.headpage--;
                        console.log(this.headpage);
                    } else {
                        this.headline = this.headline.concat(
                            res.data.data.data
                        );
                    }
                }
            });
        },
        getmorelives() {
            //获取更多快讯
            return new Promise(resolve => {
                this.getlives();
                resolve();
            });
        },
        getmoreheadline() {
            //获取更多头条
            return new Promise(resolve => {
                this.getheadline();
                resolve();
            });
        },
        getad() {
            //获取广告
            this.$axios({
                method: "get",
                url: "/api/advertisement/query",
                params: {
                    type: 0
                }
            })
                .then(res => {
                    // alert(res.errorCode)
                    if (res.data.errorCode == 0) {
                        this.adlist = res.data.data;
                    }
                })
                .catch(err => {});
        },
        getlives() {
            //获取快讯
            this.livespage++;
            this.$axios({
                url: "/api/flash/queryflash",
                method: "get",
                params: {
                    page: this.livespage,
                    row: this.livesrow
                }
            })
                .then(res => {
                    console.log(res);

                    if (res.data.errorCode == 0) {
                        if (
                            res.data.data[res.data.data.length - 1].id ==
                            this.liveslist[this.liveslist.length - 1].id
                        ) {
                            //如果重复
                            this.$Message.info("没有更多");
                            this.livespage--;
                        } else {
                            this.liveslist = this.liveslist.concat(
                                res.data.data
                            );
                        }
                        this.$nextTick(function() {
                            for (let i = 0; i < res.data.data.length; i++) {
                                 this.weixin(res.data.data[i].id)
                                console.log(
                                    document.querySelector(
                                        "#qrcode" + res.data.data[i].id
                                    ),
                                    i
                                );
                            }
                        });
                    }
                })
                .catch(err => {});
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
        getslide() {
            //获取轮播图
            console.log(process.env.baseURL);
            this.$axios.$get("/api/article/slideshow").then(res => {
                this.slidelist = res.data;
                console.log(this.slidelist);
                if (res.data.errorCode == 0) {
                }
            });
        },
        getimgs(id) {
            //获取图片
            if (id==undefined) {
                return '//resource.jinse.com/www/v2/img/avatar.png'
            }
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
        createqr() {//快讯生成二维码
            for (let i = 0; i < this.liveslist.length; i++) {
                this.weixin(this.liveslist[i].id);
                // console.log(
                //     document.querySelector("#qrcode" + this.liveslist[i].id),
                //     i
                // );
            }
        }
    }
};
</script>

<style scoped>
.home-main {
    margin: 0 auto;
    width: 1170px;
    min-height: 1000px;
}

.demo-carousel {
    height: 375px;
    background: #333;
    line-height: 375px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    border-radius: 4px;
}
.demo-carousel img {
    height: 100%;
    width: 100%;
}
.carousel {
    width: 548px;
    float: left;
}
.Headline {
    width: 622px;
    height: 91%;
    float: right;
    overflow-y: auto;
}
.Headline::-webkit-scrollbar {
    display: none;
}
.js-right-live .main::-webkit-scrollbar {
    display: none;
}
.main-head {
    height: 400px;
    box-shadow: 0 7px 4px 0 #e9e9e9;
    margin-bottom: 30px;
}
.article-main ol {
    margin: 10px;
}
.article-main ol .article-img {
    width: 270px;
    height: 167px;
    display: block;
    float: left;
    border-radius: 4px;
    position: relative;
    overflow: hidden;
}
.article-main ol .article-img img {
    width: 100%;
    height: 100%;
    -webkit-transition: -webkit-transform 0.15s ease-in;
    transition: -webkit-transform 0.15s ease-in;
    transition: transform 0.15s ease-in;
    transition: transform 0.15s ease-in, -webkit-transform 0.15s ease-in;
    will-change: transform;
}
.article-main ol ul {
    margin-left: 303px;
    height: 167px;
    display: block;
    position: relative;
}
.article-main ol ul h3 {
    line-height: 28px;
    margin-bottom: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    box-orient: vertical;
    -webkit-line-clamp: 2;
}
.article-main ol ul li:nth-child(2) {
    height: 66px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}
.article-main ol ul li {
    line-height: 22px;
    color: #666;
}
.article-main ol ul li + li {
    margin-top: 12px;
}
.article-main .js-generalize {
    border: 1px solid #bcbcbc;
    border-radius: 2px;
    margin-left: 8px;
    font-size: 14px;
    color: #bcbcbc;
    transform: scale(1) !important;
    width: 44px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    padding: 0;
}
.article-info .js-article-num {
    padding-top: 1px;
    padding-left: 5px;
}
.article-main ol ul li .author {
    width: 24px;
    height: 24px;
    border-radius: 100%;
    margin-right: 4px;
}
.article-main ol ul li .amount {
    margin: 5px 2px 0 0;
}
.article-main ol ul h3 {
    line-height: 28px;
}
.font20 {
    font-size: 20px;
}
h3 > a {
    color: #333;
}
/* 文章 广告 */
.home-main .main-left {
    width: 770px;
    float: left;
    padding-bottom: 30px;
    box-shadow: 0 8px 4px 0 #e9e9e9;
    margin-bottom: 20px;
}
.home-main .main-right {
    width: 370px;
    float: right;
}
.article-tabs {
    height: 65px;
}
.article-tabs .tabs-nav {
    display: flex;
}
.article-tabs .tabs-nav-item {
    flex: 1;
    line-height: 49px;
    border: 1px solid #dcdcdc;
    text-align: center;
    cursor: pointer;
    color: #ff3d00;
    font-weight: 700;
    font-size: 16px;
}
.article-tabs .nav-item-active {
    color: #fff;
    background-color: #ff3d00;
}
.article-tabs li:nth-last-child(n + 2) {
    border-right: 0;
}
.article-main .article-tag {
    position: inherit;
    display: inline;
}
.article-main .article-tag span {
    border-radius: 2px;
    margin-right: 4px;
    font-size: 14px;

    width: 46px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    padding: 0;
    font-weight: 500;
    transform: translateY(1px);

    display: block;
    float: left;
}
.article-main .article-tag .article-tag-sole {
    color: #fff;
    background: #f29700;
}
.article-main .article-tag .article-tag-hot {
    color: #fff;
    background: #e0051e;
}
.article-main .article-tag .article-tag-top {
    color: #e0051e;
    border: 1px solid #e0051e;
}
/* 广告 */
.js-right-ad {
    padding: 5px 0 5px 20px;
    margin-bottom: 50px;
    border: #dcdcdc 1px solid;
    border-radius: 4px;
    position: relative;
}
.js-right-ad a {
    height: 67px;
    display: block;
}
.js-right-ad a img {
    width: 40px;
    height: 40px;
    float: left;
    margin-right: 10px;
    padding: 13px 0;
    box-sizing: content-box;
}

.js-right-ad a ol {
    width: 278px;
    float: left;
    border-bottom: #dcdcdc 1px solid;
    padding: 13px 20px 13px 0;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    box-sizing: content-box;
}

.js-right-ad a ol li {
    width: 98px;
    float: left;
    margin-right: 10px;
    font-weight: bold;
}
.js-right-ad a ol span {
    width: 170px;
    float: left;
    color: #999;
}
.js-right-ad .note {
    position: absolute;
    top: 4px;
    right: 4px;
    color: #999;
    opacity: 0.5;
}
/* 快讯 */
.js-right-live {
    height: 600px;
    margin-bottom: 20px;
    overflow: hidden;
    position: relative;
}
.live-tabs {
    height: 65px;
}
.live-tabs ul {
    float: left;
}
.live-tabs ul a {
    position: relative;
    display: inline-block;
    color: #333;
    font-weight: bold;
}
.live-tabs ul a span {
    width: 100%;
    height: 3px;
    background: #f29700;
    position: absolute;
    left: 0;
    bottom: -8px;
    opacity: 1;
}
.font18 {
    font-size: 18px;
}
.live-tabs ol {
    float: right;
    padding-top: 1px;
}
.live-tabs ol a {
    background: url(/static/imgs/tabs-more.svg) 36px 4px no-repeat;
    padding-right: 13px;
    display: block;
    color: #999;
    font-size: 16px;
}
.live-tabs ol a span {
    opacity: 0;
    text-decoration: none;
    transition-duration: 0.2s;
    -moz-transition-duration: 0.2s;
    -webkit-transition-duration: 0.2s;
    -o-transition-duration: 0.2s;
}
.live-tabs ol a:hover {
    text-decoration: none;
}
.live-tabs ol a:hover span {
    opacity: 1;
}
.js-right-live .main {
    height: 500px;
    overflow-y: hidden;
    overflow: scroll;
    overflow-x: hidden;
    width: 387px;
}
.js-right-live .main ul {
    margin-left: 5px;
    padding: 0 20px 30px 20px;
    border-left: #dcdcdc 1px solid;
    position: relative;
}
.js-right-live .main .grade2 {
    width: 9px;
    height: 9px;
    background: #f29700;
    border-radius: 100%;
    position: absolute;
    left: -5px;
    top: 2px;
}
.js-right-live .main ul .time {
    margin-bottom: 12px;
    height: 14px;
    line-height: 14px;
}
.js-right-live .main ul .content {
    line-height: 22px;
}

.js-right-live .main ul li + li {
    margin-top: 6px;
}
.js-right-live .main ul .content .livesb {
    font-weight: bold;
}

.js-right-live .main ul .content a {
    display: block;
    color: #333;
}
.js-right-live .main ul .content a + a {
    margin-top: 6px;
}

.js-right-live .main ul .content a {
    display: block;
}
.js-right-live .main ul .live-share {
    box-sizing: border-box;
    padding-bottom: 10px;
    font-size: 12px;
}

.js-right-live .main ul .live-share {
    position: relative;
}
/* 分享 */
.js-right-live .main ul .live-share:hover .shares-pop {
    display: block;
}

.js-right-live .main ul .live-share .shares-pop {
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
.js-right-live .main ul .live-share .shares-pop:before {
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
.js-right-live .main ul .live-share .shares-pop .social-share {
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
.js-right-live .main ul .live-share .shares-pop a {
    width: 24px;
    height: 24px;
    padding: 6px;
    float: left;
    display: block;
}
.js-right-live .main ul .live-share .shares-pop a {
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

.js-right-live .main ul .live-share .shares-pop a + a {
    margin-left: 0;
}
.js-right-live .main ul .live-share .shares-pop .icon-qq {
    background-image: url(/static/imgs/qq-icon.svg);
    background-size: 20px 17px;
    border: 0;
    padding: 0;
    margin-top: 20px;
}
.js-right-live .main ul .live-share .shares-pop .icon-weibo {
    background-image: url(/static/imgs/weibo-icon.svg);
    background-size: 20px 17px;
}
.js-right-live .main ul .live-share .shares-pop a:last-child {
    border-bottom: 0;
}

.js-right-live .main ul .live-share .shares-pop .icon-wechat {
    background-position: left 11px bottom 19px;
    padding-top: 0;
    background-image: url(/static/imgs/weixin-icon.svg);
    background-size: 16px 17px;
}
.js-right-live .main ul .live-share .shares-pop .icon-qq:after {
    content: "腾讯qq";
}
.js-right-live .main ul .live-share .shares-pop .icon-weibo:after {
    content: "新浪微博";
}

.js-right-live .main ul .live-share .shares-pop .icon-wechat:after {
    content: "微信扫一扫";
}

.js-right-live .main ul .live-share .shares-pop a:after {
    padding-left: 35px;
}
.social-share .icon-wechat .wechat-qrcode .qrcode {
    width: 105px;
    margin: 10px auto;
}
/* 分享完 */

.js-right-live .main ul span {
    float: right;
    margin: 3px 0 0 10px;
}
.js-right-live .main ul span a {
    padding-left: 10px;
}
.js-right-live .main ul span a {
    padding: 3px 5px;
}

.js-right-live .main ul ol {
    float: right;
    position: relative;
}
.js-right-live .main ul ol .fall {
    background: url(/static/imgs/fall.svg) 6px 7px no-repeat;
}

.js-right-live .main ul ol a {
    padding: 2px 4px 2px 24px;
    color: #999;
    border-radius: 4px;
    border: #fff 1px solid;
    display: block;
    font-size: 12px;
}
.js-right-live .main ul ol a {
    width: auto;
}
.like label {
    cursor: pointer;
}
.js-right-live .main ul .green {
    color: #5da310;
}
.js-right-live .main ul .addition {
    position: absolute;
    top: -14px;
    left: 27px;
    font-weight: bold;
}
.js-right-live .main ul ol + ol {
    margin-right: 10px;
}
.js-right-live .main ul ol .rose {
    background: url(/static/imgs/rose.svg) 6px 7px no-repeat;
}
.js-right-live .main ul .red {
    color: #c4192d;
}

.js-right-live .main ul .addition {
    position: absolute;
    top: -14px;
    left: 27px;
    font-weight: bold;
}
.js-right-live .main ul ol a:hover {
    color: #333;
    border: #dcdcdc 1px solid;
}
.js-right-live .main ul ol .rose:hover {
    background: url(/static/imgs/rose-h.svg) 6px 7px no-repeat;
}
.js-right-live .main ul ol .fall:hover {
    background: url(/static/imgs/fall-h.svg) 6px 7px no-repeat;
}
.js-right-ad .border-b-no {
    border-bottom: 0;
}
.article-main ol ul li span,
.article-main ol ul li img {
    color: #999;
    display: inline-block;
}
</style>
