<template>
    <div>
        <div class="js-main">
            <div class="js-home-main clearfix">
                <!-- 2 -->
                <div class="js-left">
                    <div class="js-article">
                        <div class="title">
                            <h2>{{article.title}}</h2>
                        </div>
                        <div class="article-info"><img :src="getimgs(article.userHeader)" alt="" class="author">
                            <nuxt-link :to="`/member/${article.userId}`" target="_blank" class="blue">{{article.nickName}}</nuxt-link>
                            <div class="time">{{article.createTime}}</div>
                            <ul>
                                <li><img src="~/static/imgs/read.svg" alt="" class="amount"></li>
                                <span>{{article.readNo}}</span>
                            </ul>
                            <div class="is-top share-wrapper" style="float: right;">
                                <span class="share-text">分享</span>
                                <div class="social-share share share-component">
                                    <a class="social-share-icon icon-qq" @click='qZone(article.title)' target="_blank"></a>
                                    <a class="social-share-icon icon-weibo" @click="sinaWeiBo(article.title)" target="_blank"></a>
                                    <a class="social-share-icon icon-wechat" href="javascript:">
                                        <div class="wechat-qrcode">
                                            <h4>微信扫一扫：分享</h4>
                                            <div class="qrcode" id="qrcode2">
                                            </div>
                                            <div class="help">
                                                <p>微信里点“发现”，扫一下</p>
                                                <p>二维码便可将本文分享至朋友圈。</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="js-article-detail" v-html="article.content">
                        </div>
                        <!-- <div class="tags">
                            <a href="/tag/牙买加证券交易所" target="_blank" title="牙买加证券交易所">牙买加证券交易所</a>
                            <a href="/tag/加密货币" target="_blank" title="加密货币">加密货币</a>
                            <a href="/tag/加密货币交易" target="_blank" title="加密货币交易">加密货币交易</a>
                        </div> -->
                        <div style="height:35px"></div>
                        <!-- <div class="source">
                            本文来源：
                            <a href="javascript:void(0)" onclick="window.open('https://www.jinse.com/bitcoin/227646.html');" class="blue">火鸟区块链</a>
                            / 责任编辑：闫茹霞
                            <a href="/topic/correction?topic_id=217646" class="error-correction">我要纠错</a>
                        </div> -->
                        <div class="statement">声明：本文系火鸟区块链原创稿件，版权属火鸟区块链所有，未经授权不得转载，已经协议授权的媒体下载使用时须注明"稿件来源：火鸟区块链"，违者将依法追究责任。</div>

                        <div>
                            <!---->
                            <!-- <div class="ad-list">
                                <ul>
                                    <a href="https://bibox.zendesk.com/hc/zh-cn/articles/360007251294" target="_blank"><img src="https://img.jinse.com/979957" alt="做市商100%返利持续火爆"></a>
                                    <div class="note font12">广告</div>
                                </ul>
                                <ul>
                                    <a href="http://otc.hbg.com" target="_blank"><img src="https://img.jinse.com/1003650" alt="0门槛30%返佣"></a>
                                    <div class="note font12">广告</div>
                                </ul>
                                <ul>
                                    <a href="http://www.coinyee.io/34200" target="_blank"><img src="https://img.jinse.com/1034381" alt="空投6000万个平台币CT"></a>
                                    <div class="note font12">广告</div>
                                </ul>
                                <ul>
                                    <a href="https://t.me/dxchain" target="_blank"><img src="https://img.jinse.com/1034441" alt="硅谷技术公链"></a>
                                    <div class="note font12">广告</div>
                                </ul>
                            </div> -->
                        </div>
                    </div>
                    <div class="js-article-next" v-if="nextarticle!=null">
                        <ol>下一篇</ol>
                        <div class="title">
                            <nuxt-link :to="'/article/'+nextarticle.articleId ">
                                <h2>{{nextarticle.title}}</h2>
                            </nuxt-link>
                        </div>
                        <div class="article-info">
                            <nuxt-link :to="'/article/'+nextarticle.articleId"><img :src="getimgs(nextarticle.userHeader)" class="author">
                                <span>{{nextarticle.nickName}}</span>
                            </nuxt-link>
                            <div class="time">{{nextarticle.createTime}}</div>
                            <ul>
                                <li><img src="~/static/imgs/read.svg" alt="" class="fr amount"></li>
                                <span>{{nextarticle.readNo}}</span>
                            </ul>
                        </div>
                        <p>{{nextarticle.introduction}}</p>
                    </div>
                </div>
                <div class="js-right">
                    <!-- 作者  -->
                    <div class="author-brands">
                        <div class="control">

                            <div class="avatar"><img :src="getimgs(article.userHeader)" alt=""></div>
                            <div class="name">
                                <ol>
                                    {{article.nickName}}
                                    <span>
                                        <svg width="51px" height="20px" viewBox="0 0 51 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <g id="完成" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <g id="专栏作者" transform="translate(-963.000000, -218.000000)">
                                                    <g id="personally-icon" transform="translate(963.000000, 218.000000)">
                                                        <rect id="Rectangle-38" fill="#7ED321" x="0" y="0" width="51" height="20" rx="10"></rect>
                                                        <circle id="Oval-7" fill="#FFFFFF" cx="10" cy="10" r="8"></circle>
                                                        <text id="个人" font-family="PingFangSC-Medium, PingFang SC" font-size="12" font-weight="400" fill="#FFFFFF">
                                                            <tspan x="21" y="14">{{certificationType}}</tspan>
                                                        </text>
                                                        <text id="v" font-family="ArialRoundedMTBold, Arial Rounded MT Bold" font-size="16" font-weight="normal" fill="#7ED321">
                                                            <tspan x="6" y="15">v</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        <!-- <svg width="51px" height="20px" viewBox="0 0 51 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <g id="完成" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <g id="专栏作者" transform="translate(-1025.000000, -218.000000)">
                                                    <g id="jinse-icon" transform="translate(1025.000000, 218.000000)">
                                                        <rect id="Rectangle-38" fill="#F5A623" x="0" y="0" width="51" height="20" rx="10"></rect>
                                                        <circle id="Oval-7" fill="#FFFFFF" cx="10" cy="10" r="8"></circle>
                                                        <text id="金色" font-family="PingFangSC-Medium, PingFang SC" font-size="12" font-weight="400" fill="#FFFFFF">
                                                            <tspan x="21" y="14">金色 </tspan>
                                                        </text>
                                                        <text id="v" font-family="ArialRoundedMTBold, Arial Rounded MT Bold" font-size="16" font-weight="normal" fill="#F5A623">
                                                            <tspan x="6" y="15">v</tspan>
                                                        </text>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg> -->
                                    </span>
                                </ol>
                            </div>
                            <div class="brief" :title="article.introduction">
                                {{article.introduction}}</div>
                            <div id="personalFollow" class="bed" style="">
                                <a href="javascript:;" class="font16" v-if="!isfollow" @click="follow">+关注</a>
                                <a href="javascript:;" class="font16" v-else @click="follow">已关注</a>
                                <!---->
                            </div>
                            <div class="data">
                                <ul>
                                    <li>{{member.releaseArticleTotal}}
                                        <span>文章</span>
                                    </li>
                                    <li>{{member.readingVolume}}
                                        <span>浏览</span>
                                    </li>
                                    <li>{{member.fansTotal}}
                                        <span>粉丝</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
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

                </div>

            </div>
        </div>
        <div class="js-main js-foot-status" :class="{'js-foot-status-pop':footershow}">
            <div class="js-home-main clear control">
                <div class="js-left share-operation">
                    <div class="collection" v-if="!collection" @click="collect">
                        <a href="javascript:;"><img src="~/static/imgs/star-n.svg" alt=""> 收藏
                        </a>
                    </div>
                    <div class="collection" v-else @click="collect">
                        <a href="javascript:;"><img src="~/static/imgs/star.svg" alt=""> 已收藏
                        </a>
                    </div>
                    <div class="social-share share share-component">
                        <a class="social-share-icon icon-qq"  @click='qZone(article.title)' target="_blank"></a>
                        <a class="social-share-icon icon-weibo" @click="sinaWeiBo(article.title)" target="_blank"></a>
                        <a class="social-share-icon icon-wechat" href="javascript:">
                            <div class="wechat-qrcode">
                                <h4>微信扫一扫：分享</h4>
                                <div class="qrcode" id="qrcode1">
                                </div>
                                <div class="help">
                                    <p>微信里点“发现”，扫一下</p>
                                    <p>二维码便可将本文分享至朋友圈。</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="js-share-title">分享</div>
                </div>
                <div class="js-right">
                    <div class="attention">
                        <a href="javascript:;" class="font16" v-if="!isfollow" @click="follow">+关注</a>
                        <a href="javascript:;" class="font16" v-else @click="follow">已关注</a>
                    </div>
                    <div class="infor">
                        <div class="author">
                            <nuxt-link :to="'/member/'+article.userId" target="_blank"><img class="photo" :src="getimgs(article.userHeader)">
                                <span>{{article.nickName}}</span>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="custom-hidden-div" style="height: 44px; display: none;"></div>
    </div>
</template>

<script type="">
  if (typeof window !== 'undefined'){
    var QRCode =  require('qrcodejs2')
  }
    import cookie from '~/assets/cookie.js'
export default {
    name: "article-details",
    data() {
        return {
            footershow: false,
            articlelist: [], //文章列表
            article: {},
            articledetails: [],
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
            collection: false, //是否收藏
            isfollow: false, //是否关注
            member: {} //作者信息
        };
    },
    computed: {
        certificationType() {
            //认证状态
            switch (this.member.certificationType) {
                case "0":
                    return "个人";
                case "1":
                    return "媒体";
                case "2":
                    return "企业";
            }
        }
    },
    components: {},
    // async fetch({ redirect, params, app, isClient }) {
    //     await app
    //         .$axios({
    //             url: "/api/article/findarticle",
    //             method: "post",
    //             params: {
    //                 articleId: params.id
    //             }
    //         })
    //         .then()
    //         .catch(err => {
    //              redirect("/");
    //         });
    // },
    created() {
        //   console.log(this.$route.params.id)
        this.getdetails();
        this.getad();
    },
    mounted() {
        //给window添加一个滚动滚动监听事件
        window.addEventListener("scroll", this.handleScroll);
        // 二维码
        this.weixin(1)
        this.weixin(2)
    },
    methods: {
        handleScroll() {
            //改变元素#js-foot-status的top值
            var scrollTop =
                document.documentElement.offsetHeight -
                document.documentElement.scrollTop -
                window.innerHeight;
            //var offsetTop = document.querySelector('#js-foot-status').offsetTop;

            console.log(scrollTop);
            if (scrollTop >= 150) {
                this.footershow = true;
                document.querySelector(".custom-hidden-div").style.display =
                    "block";
            } else {
                this.footershow = false;
                console.log(document.querySelector(".custom-hidden-div"));
                document.querySelector(".custom-hidden-div").style.display =
                    "none";
            }
            // if(scrollTop<=200){
            // offsetTop = 300 - Number(scrollTop);
            // document.querySelector('#js-foot-status').style.top = offsetTop+'px';
            // }else{
            // document.querySelector('#js-foot-status').style.top = '100px';
            // }
        },
        getdetails() {
            //获取文章详情
            this.$axios({
                url: "/api/article/findarticle",
                method: "post",
                params: {
                    articleId: this.$route.params.id
                }
            })
                .then(res => {
                    if (res.data.errorCode == 0) {
                        this.article = res.data.data[0];

if (this.article.isCollect &&this.article.isCollect == 1) {
                            this.collection = true;
                        } else {
                            this.collection = false;
                        }
                        this.nextarticle = res.data.data[1];
                        this.getmember(this.article.userId);
                        if (process.client) {//判断是否是客户端
                            this.$nextTick(function(){
                                var imgs=document.querySelectorAll('.js-article-detail img')
                                for (let i = 0; i < imgs.length; i++) {
                                    imgs[i].style.width='100%'
                                }
                            })
                        }
                    }
                })
                .catch(error => {
                    this.$Message.error('文章不存在');
                    this.$router.push('/')
                });
        },
        getad() {
            //获取广告
            this.$axios
                .$get("/api/advertisement/query?type=1")
                .then(res => {
                    if (res.data.errorCode == 0) {
                        this.adlist = res.data.data;
                        console.log(this.adlist);
                    }
                })
                .catch(err => {});
        },
        collect() {
            //收藏
            if (!this.collection) {
                //如果未收藏
                // this.collection=true
                this.$axios({
                    url: "/api/article/collect",
                    method: "get",
                    params: {
                        articleId: this.$route.params.id
                    }
                })
                    .then(res => {
                        if (res.data.errorCode == 0) {
                            this.collection = true;
                            this.$Message.info('收藏收藏成功')
                        }
                    })
                    .catch(err => {});
            } else {
                // this.collection=false
                this.$axios({
                    url: "/api/article/delcollect",
                    method: "get",
                    params: {
                        articleId: this.$route.params.id
                    }
                })
                    .then(res => {
                        if (res.data.errorCode == 0) {
                            this.collection = false;
                            this.$Message.info('取消收藏成功')
                        }
                    })
                    .catch(err => {});
            }
        },
        follow() {
            //关注
            if (!this.isfollow) {
                this.$axios({
                    //如果没关注
                    url: "/api/user/follow",
                    method: "post",
                    params: {
                        followIds: this.article.userId
                    }
                })
                    .then(res => {
                        if (res.data.errorCode == 0) {
                            this.isfollow = true;
                        }
                    })
                    .catch(err => {});
            } else {
                this.$axios({
                    //取关
                    url: "/api/user/abolish_follow",
                    method: "post",
                    params: {
                        abolishFollowIds: this.article.userId
                    }
                }).then(res => {
                    if (res.data.errorCode == 0) {
                        this.isfollow = false;
                    }
                });
            }
        },
        getimgs(id) {
            //获取图片
            return `${process.env.imgUrl}/api/image/display/${id}`;
        },
        getmember(id) {
            //获取作者信息
            this.$axios
                .$get(`/api/user/query_user_essential_info?userId=${id}`)
                .then(res => {
                    console.log(res);
                    this.member = res.data;
                    this.isfollow = res.data.alreadyFollow;
                });
        },
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
            console.log(document.getElementById(`qrcode${id}`));
            var qrcode = new QRCode(document.getElementById(`qrcode${id}`), {
                width: 100, // 设置宽度
                height: 100, // 设置高度
                text: document.location.href //二维码内容
            });
            console.log(qrcode);
        },
    },
    destroyed() {
        //离开该页面需要移除这个监听的事件
        window.removeEventListener("scroll", this.handleScroll);
    }
};
// <div class="js-left">
//     <!-- 文章 -->
//     <div class="js-article " >
//         <!-- 标题 -->
//         <div class="title">
//             <h2>{{articlelist[0].title}}</h2>
//         </div>
//         <div class="article-info"><img src="https://img.jinse.com/899588_image20.png" class="author">
//             <nuxt-link :to="'/member/'+articlelist[1].userId" target="_blank" class="blue">{{articlelist[1].nickName}}</nuxt-link>
//             <div class="time">{{articlelist[0].createTime}}</div>
//             <ul>
//                 <li><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTdweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTcgMTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjEgKDUxMTQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5QYWdlIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iU3ltYm9scyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuWbvuaghy/pmIXor7siIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAtMi4wMDAwMDApIiBmaWxsPSIjOUI5QjlCIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE2LjA0NzI0NDEsOC4xMDIzNjMyMSBDMTYuMDE1NzQ4LDguMDM5MzY5MDcgMTUuODE2Mjc1Nyw3LjcwMzQxNDQzIDE1LjQ0ODgxODksNy4wOTQ0ODkyIEMxNS4wODEzNjIxLDYuNDg1NTYxOTUgMTQuNTU5MDU3Niw1LjgyNjc3NTE4IDEzLjg4MTg4OTMsNS4xMTgxMTA3NCBDMTMuMjA0NzIwOSw0LjQwOTQ0NDI4IDEyLjM3Nzk1NzgsMy43NjY0MDY1NSAxMS40MDE1NzM4LDMuMTg4OTc3MzkgQzEwLjQyNTE5MTgsMi42MTE1NDYyIDkuMzA3MDkyNjYsMi4zMjI4MzQ2NSA4LjA0NzI0NDA5LDIuMzIyODM0NjUgQzYuNzg3Mzk1NTMsMi4zMjI4MzQ2NSA1LjY2OTI5NjM4LDIuNjExNTQ2MiA0LjY5MjkxNDM5LDMuMTg4OTc3MzkgQzMuNzE2NTMwMzksMy43NjY0MDY1NSAyLjg4OTc2NzMxLDQuNDA5NDQ0MjggMi4yMTI1OTg5Myw1LjExODExMDc0IEMxLjUzNTQyOTc0LDUuODI2Nzc1MTggMS4wMTMxMjUyNCw2LjQ4NTU2MTk1IDAuNjQ1NjY5MjkxLDcuMDk0NDg5MiBDMC4yNzgyMTMzNDIsNy43MDM0MTQ0MyAwLjA3ODc0MDMxODcsOC4wMzkzNjkwNyAwLjA0NzI0NDA5NDUsOC4xMDIzNjMyMSBDMC4wMTU3NDc4NzAyLDguMjA3MzQ5NDIgMCw4LjMwOTcxMTEyIDAsOC40MDk0NDgzMSBDMCw4LjUwOTE4NzUzIDAuMDE1NzQ3ODcwMiw4LjYxMTU0NzIxIDAuMDQ3MjQ0MDk0NSw4LjcxNjUzNTQzIEMwLjA3ODc0MDMxODcsOC43NTg1Mjk1MSAwLjI3ODIxMzM0Miw5LjA4Mzk4NjE0IDAuNjQ1NjY5MjkxLDkuNjkyOTEzMzkgQzEuMDEzMTI1MjQsMTAuMjkxMzQwNiAxLjUzNTQyOTc0LDEwLjk0MjI1MzkgMi4yMTI1OTg5MywxMS42NDU2NjkzIEMyLjg4OTc2NzMxLDEyLjM0OTA4NDcgMy43MTY1MzAzOSwxMi45ODQyNDkxIDQuNjkyOTE0MzksMTMuNTUxMTgxMSBDNS42NjkyOTYzOCwxNC4xMjg2MTE5IDYuNzg3Mzk1NTMsMTQuNDE3MzIyOCA4LjA0NzI0NDA5LDE0LjQxNzMyMjggQzkuMzA3MDkyNjYsMTQuNDE3MzIyOCAxMC40MjUxOTE4LDE0LjEyODYxMTkgMTEuNDAxNTczOCwxMy41NTExODExIEMxMi4zNzc5NTc4LDEyLjk3Mzc1MDMgMTMuMjA0NzIwOSwxMi4zMzMzMzc3IDEzLjg4MTg4OTMsMTEuNjI5OTIyMyBDMTQuNTU5MDU3NiwxMC45MjY1MDQ4IDE1LjA4MTM2MjEsMTAuMjcwMzQ0NiAxNS40NDg4MTg5LDkuNjYxNDE3MzIgQzE1LjgxNjI3NTcsOS4wNTI0OTAwOCAxNi4wMTU3NDgsOC43MTEyODY0MyAxNi4wNDcyNDQxLDguNjM3Nzk0MjcgQzE2LjA3ODc0MDIsOC41NzQ4MDIxNCAxNi4wOTQ0ODkyLDguNDg4MTg5NDggMTYuMDk0NDg5Miw4LjM3Nzk1MjI1IEMxNi4wOTQ0ODkyLDguMjY3NzE1MDIgMTYuMDc4NzQwMiw4LjE3NTg1MzM1IDE2LjA0NzI0NDEsOC4xMDIzNjMyMSBaIE04LjA0NzI0NDA5LDEzLjA3ODc0MDIgQzcuMTQ0MzUyMjUsMTMuMDc4NzQwMiA2LjMyMDIxMzY3LDEyLjg4NDUxNjQgNS41NzQ4MDQxNiwxMi40OTYwNjMgQzQuODI5MzkyNjMsMTIuMTA3NjEwMiA0LjE3NTg1NDg3LDExLjY1MzU0NjggMy42MTQxNzI3MiwxMS4xMzM4NTg4IEMzLjA1MjQ5MDU4LDEwLjYxNDE3MDcgMi41ODI2NzgxNywxMC4wOTE4NjYyIDIuMjA0NzIzNCw5LjU2NjkyOTEzIEMxLjgzNzI2ODQ2LDkuMDQxOTkyMDYgMS41Njk1NTQ3NSw4LjY0MzA0NTI5IDEuNDAxNTc0OCw4LjM3MDA3ODc0IEMxLjU0ODU1NzEsOC4xMDc2MTAyIDEuODA1NzcyNCw3LjcxMzkxMjQ0IDIuMTczMjI5MzUsNy4xODg5NzUzNyBDMi41NTExODIxMSw2LjY2NDA0MDMxIDMuMDIzNjE5MDIsNi4xNDE3MzU4MSAzLjU5MDU1MDE3LDUuNjIyMDQ3NzUgQzQuMTU3NDgzMzQsNS4xMDIzNTk2OSA0LjgxMzY0MzU5LDQuNjQ4Mjk2MzEgNS41NTkwNTUxMiw0LjI1OTg0MzUzIEM2LjMxNDk2NDY2LDMuODcxMzg4NzIgNy4xNDQzNTIyNSwzLjY3NzE2NTM1IDguMDQ3MjQ0MDksMy42NzcxNjUzNSBDOC45NTAxMzU5NCwzLjY3NzE2NTM1IDkuNzc0Mjc0NTIsMy44NzEzODg3MiAxMC41MTk2ODQsNC4yNTk4NDM1MyBDMTEuMjY1MDk1Niw0LjY0ODI5NjMxIDExLjkxODYzMzMsNS4xMDIzNTk2OSAxMi40ODAzMTU1LDUuNjIyMDQ3NzUgQzEzLjA0MTk5NzYsNi4xNDE3MzU4MSAxMy41MTE4MSw2LjY2NDA0MDMxIDEzLjg4OTc2NDgsNy4xODg5NzUzNyBDMTQuMjU3MjE5NSw3LjcxMzkxMjQ0IDE0LjUyNDkzMyw4LjEwNzYxMDIgMTQuNjkyOTEzNCw4LjM3MDA3ODc0IEMxNC41MjQ5MzMsOC42NDMwNDUyOSAxNC4yNTcyMTk1LDkuMDQxOTkyMDYgMTMuODg5NzY0OCw5LjU2NjkyOTEzIEMxMy41MTE4MSwxMC4wOTE4NjYyIDEzLjA0MTk5NzYsMTAuNjE0MTcwNyAxMi40ODAzMTU1LDExLjEzMzg1ODggQzExLjkxODYzMzMsMTEuNjUzNTQ2OCAxMS4yNjUwOTU2LDEyLjEwNzYxMDIgMTAuNTE5Njg0LDEyLjQ5NjA2MyBDOS43NzQyNzQ1MiwxMi44ODQ1MTY0IDguOTUwMTM1OTQsMTMuMDc4NzQwMiA4LjA0NzI0NDA5LDEzLjA3ODc0MDIgWiBNOC4wNDcyNDQwOSw1LjY5MjkxMzM5IEM3LjMxMjMzMjYsNS42OTI5MTMzOSA2LjY3OTc5Mjg4LDUuOTU1Mzc3ODkgNi4xNDk2MDY4LDYuNDgwMzE0OTYgQzUuNjE5NDIwNzIsNy4wMDUyNTIwMyA1LjM1NDMyOTcsNy42MzUxNjcyNCA1LjM1NDMyOTcsOC4zNzAwNzg3NCBDNS4zNTQzMjk3LDkuMTE1NDkwMjcgNS42MTk0MjA3Miw5Ljc1MDY1NDQ5IDYuMTQ5NjA2OCwxMC4yNzU1ODk1IEM2LjY3OTc5Mjg4LDEwLjgwMDUyNjYgNy4zMTIzMzI2LDExLjA2Mjk5MzEgOC4wNDcyNDQwOSwxMS4wNjI5OTMxIEM4Ljc4MjE1NTU5LDExLjA2Mjk5MzEgOS40MTQ2OTUzMSwxMC44MDA1MjY2IDkuOTQ0ODgxMzksMTAuMjc1NTg5NSBDMTAuNDc1MDY3NSw5Ljc1MDY1NDQ5IDEwLjc0MDE1ODUsOS4xMTU0OTAyNyAxMC43NDAxNTg1LDguMzcwMDc4NzQgQzEwLjc0MDE1ODUsNy42MzUxNjcyNCAxMC40NzUwNjc1LDcuMDA1MjUyMDMgOS45NDQ4ODEzOSw2LjQ4MDMxNDk2IEM5LjQxNDY5NTMxLDUuOTU1Mzc3ODkgOC43ODIxNTU1OSw1LjY5MjkxMzM5IDguMDQ3MjQ0MDksNS42OTI5MTMzOSBaIE04LjA0NzI0NDA5LDkuNzI0NDA5NDUgQzcuNjc5Nzg3MzQsOS43MjQ0MDk0NSA3LjM2NDgzMDc0LDkuNTkzMTc2MTkgNy4xMDIzNjIyLDkuMzMwNzA3NjUgQzYuODM5ODkzNjcsOS4wNjgyNDExMyA2LjcwODY2MjQzLDguNzQ4MDMzNTEgNi43MDg2NjI0Myw4LjM3MDA3ODc0IEM2LjcwODY2MjQzLDguMDAyNjIxOTggNi44Mzk4OTM2Nyw3LjY4NzY2NTM5IDcuMTAyMzYyMiw3LjQyNTE5Njg1IEM3LjM2NDgzMDc0LDcuMTYyNzI4MzEgNy42Nzk3ODczNCw3LjAzMTQ5NzA3IDguMDQ3MjQ0MDksNy4wMzE0OTcwNyBDOC40MTQ3MDA4NSw3LjAzMTQ5NzA3IDguNzI5NjU3NDUsNy4xNjI3MjgzMSA4Ljk5MjEyNTk4LDcuNDI1MTk2ODUgQzkuMjU0NTk0NTIsNy42ODc2NjUzOSA5LjM4NTgyNTc2LDguMDAyNjIxOTggOS4zODU4MjU3Niw4LjM3MDA3ODc0IEM5LjM4NTgyNTc2LDguNzQ4MDMzNTEgOS4yNTQ1OTQ1Miw5LjA2ODI0MTEzIDguOTkyMTI1OTgsOS4zMzA3MDc2NSBDOC43Mjk2NTc0NSw5LjU5MzE3NjE5IDguNDE0NzAwODUsOS43MjQ0MDk0NSA4LjA0NzI0NDA5LDkuNzI0NDA5NDUgWiIgaWQ9IlBhZ2UtMSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" alt="" class="amount"></li>
//                 <span>{{articlelist[0].readNo}}</span>
//             </ul>
//             <div class="is-top share-wrapper" style="float: right;">
//                 <span class="share-text">分享</span>
//                 <div class="social-share share share-component">
//                     <a class="social-share-icon icon-qq" href="http://connect.qq.com/widget/shareqq/index.html?url=https%3A%2F%2Fwww.jinse.com%2Fbitcoin%2F223738.html&amp;title=BitUN%E8%B0%83%E6%95%B4%E7%AE%97%E5%8A%9B%E4%BA%A7%E5%93%81%E7%94%B5%E8%B4%B9%E5%8F%8A%E7%AE%97%E5%8A%9B%E4%BB%B7%E6%A0%BC%20%E4%BF%9D%E9%9A%9C%E7%94%A8%E6%88%B7%E6%94%B6%E7%9B%8A_%E6%AF%94%E7%89%B9%E5%B8%81_%E9%87%91%E8%89%B2%E8%B4%A2%E7%BB%8F&amp;source=BitUN%E8%B0%83%E6%95%B4%E7%AE%97%E5%8A%9B%E4%BA%A7%E5%93%81%E7%94%B5%E8%B4%B9%E5%8F%8A%E7%AE%97%E5%8A%9B%E4%BB%B7%E6%A0%BC%20%E4%BF%9D%E9%9A%9C%E7%94%A8%E6%88%B7%E6%94%B6%E7%9B%8A_%E6%AF%94%E7%89%B9%E5%B8%81_%E9%87%91%E8%89%B2%E8%B4%A2%E7%BB%8F&amp;desc=%E6%9B%B4%E4%BD%8E%E7%9A%84%E7%94%B5%E5%8A%9B%E6%88%90%E6%9C%AC%E3%80%81%E6%9B%B4%E8%83%BD%E4%BF%9D%E9%9A%9C%E7%94%A8%E6%88%B7%E6%9D%83%E7%9B%8A%E7%9A%84%E5%90%88%E7%BA%A6%E8%A7%84%E5%88%99%E4%BB%A5%E5%8F%8A%E6%9B%B4%E5%A4%9A%E7%9A%84%E7%AE%97%E5%8A%9B%E3%80%82&amp;pics=https%3A%2F%2Fresource.jinse.com%2Fwww%2Fv3%2Fimg%2Flogo.svg%3Fv%3D1031" target="_blank"></a>
//                     <a class="social-share-icon icon-weibo" href="http://service.weibo.com/share/share.php?url=https%3A%2F%2Fwww.jinse.com%2Fbitcoin%2F223738.html&amp;title=BitUN%E8%B0%83%E6%95%B4%E7%AE%97%E5%8A%9B%E4%BA%A7%E5%93%81%E7%94%B5%E8%B4%B9%E5%8F%8A%E7%AE%97%E5%8A%9B%E4%BB%B7%E6%A0%BC%20%E4%BF%9D%E9%9A%9C%E7%94%A8%E6%88%B7%E6%94%B6%E7%9B%8A_%E6%AF%94%E7%89%B9%E5%B8%81_%E9%87%91%E8%89%B2%E8%B4%A2%E7%BB%8F&amp;pic=https%3A%2F%2Fresource.jinse.com%2Fwww%2Fv3%2Fimg%2Flogo.svg%3Fv%3D1031&amp;appkey=" target="_blank"></a>
//                     <a class="social-share-icon icon-wechat" href="javascript:">
//                         <div class="wechat-qrcode">
//                             <h4>微信扫一扫：分享</h4>
//                             <div class="qrcode" title="https://www.jinse.com/bitcoin/223738.html">
//                                 <canvas width="100" height="100" style="display: none;"></canvas><img alt="Scan me!" src="data:image/png;base64,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" style="display: block;"></div>
//                             <div class="help">
//                                 <p>微信里点“发现”，扫一下</p>
//                                 <p>二维码便可将本文分享至朋友圈。</p>
//                             </div>
//                         </div>
//                     </a>
//                 </div>
//             </div>
//         </div>
//         <!-- 文章详情 -->
//         <div class="js-article-detail">
//             {{articlelist[0].content}}
//         </div>
//         <!-- <div class="tags">
//             <a href="/tag/区块链" target="_blank" title="区块链">区块链</a>
//             <a href="/tag/私人银行" target="_blank" title="私人银行">私人银行</a>
//             <a href="/tag/比特币" target="_blank" title="比特币">比特币</a>
//         </div> -->
//         <div class="source">
//             <span class="left">
//                 文章作者： {{articlelist[0].nickName }}</span>
//             <a href="/topic/correction?topic_id=213738" class="error-correction">我要纠错</a>
//         </div>
//         <div class="statement">声明：本文由入驻火鸟区块链的作者撰写，观点仅代表作者本人，绝不代表火鸟区块链赞同其观点或证实其描述。</div>
//         <!-- 文章下方广告 -->
//         <!-- <div class="ad-list">
//             <ul>
//                 <a href="https://bibox.zendesk.com/hc/zh-cn/articles/360007251294" target="_blank"><img src="https://img.jinse.com/979957" alt="做市商100%返利持续火爆"></a>
//                 <div class="note font12">广告</div>
//             </ul>
//             <ul>
//                 <a href="http://otc.hbg.com" target="_blank"><img src="https://img.jinse.com/1003650" alt="0门槛30%返佣"></a>
//                 <div class="note font12">广告</div>
//             </ul>
//             <ul>
//                 <a href="http://www.coinyee.io/34200" target="_blank"><img src="https://img.jinse.com/946253" alt="空投6000万个平台币CT"></a>
//                 <div class="note font12">广告</div>
//             </ul>
//             <ul>
//                 <a href="https://dxchain.com/" target="_blank"><img src="https://img.jinse.com/960695" alt="硅谷技术公链"></a>
//                 <div class="note font12">广告</div>
//             </ul>
//         </div>
//     </div> -->
//     <div class="js-article-next" v-if="articlelist[1]">
//         <ol>下一篇</ol>
//         <div class="title">
//             <nuxt-link :to="'/article/'+articlelist[1].articleId ">
//                 <h2>{{articlelist[1].title}}</h2>
//             </nuxt-link>
//         </div>
//         <div class="article-info">
//             <a href="//www.jinse.com/member/110082"><img src="https://img.jinse.com/663820_image20.png" class="author">
//                 <span>{{articlelist[1].nickName }}</span>
//             </a>
//             <div class="time">{{articlelist[1].createTime}}</div>
//             <ul>
//                 <li><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTdweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTcgMTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjEgKDUxMTQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5QYWdlIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iU3ltYm9scyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuWbvuaghy/pmIXor7siIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAtMi4wMDAwMDApIiBmaWxsPSIjOUI5QjlCIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE2LjA0NzI0NDEsOC4xMDIzNjMyMSBDMTYuMDE1NzQ4LDguMDM5MzY5MDcgMTUuODE2Mjc1Nyw3LjcwMzQxNDQzIDE1LjQ0ODgxODksNy4wOTQ0ODkyIEMxNS4wODEzNjIxLDYuNDg1NTYxOTUgMTQuNTU5MDU3Niw1LjgyNjc3NTE4IDEzLjg4MTg4OTMsNS4xMTgxMTA3NCBDMTMuMjA0NzIwOSw0LjQwOTQ0NDI4IDEyLjM3Nzk1NzgsMy43NjY0MDY1NSAxMS40MDE1NzM4LDMuMTg4OTc3MzkgQzEwLjQyNTE5MTgsMi42MTE1NDYyIDkuMzA3MDkyNjYsMi4zMjI4MzQ2NSA4LjA0NzI0NDA5LDIuMzIyODM0NjUgQzYuNzg3Mzk1NTMsMi4zMjI4MzQ2NSA1LjY2OTI5NjM4LDIuNjExNTQ2MiA0LjY5MjkxNDM5LDMuMTg4OTc3MzkgQzMuNzE2NTMwMzksMy43NjY0MDY1NSAyLjg4OTc2NzMxLDQuNDA5NDQ0MjggMi4yMTI1OTg5Myw1LjExODExMDc0IEMxLjUzNTQyOTc0LDUuODI2Nzc1MTggMS4wMTMxMjUyNCw2LjQ4NTU2MTk1IDAuNjQ1NjY5MjkxLDcuMDk0NDg5MiBDMC4yNzgyMTMzNDIsNy43MDM0MTQ0MyAwLjA3ODc0MDMxODcsOC4wMzkzNjkwNyAwLjA0NzI0NDA5NDUsOC4xMDIzNjMyMSBDMC4wMTU3NDc4NzAyLDguMjA3MzQ5NDIgMCw4LjMwOTcxMTEyIDAsOC40MDk0NDgzMSBDMCw4LjUwOTE4NzUzIDAuMDE1NzQ3ODcwMiw4LjYxMTU0NzIxIDAuMDQ3MjQ0MDk0NSw4LjcxNjUzNTQzIEMwLjA3ODc0MDMxODcsOC43NTg1Mjk1MSAwLjI3ODIxMzM0Miw5LjA4Mzk4NjE0IDAuNjQ1NjY5MjkxLDkuNjkyOTEzMzkgQzEuMDEzMTI1MjQsMTAuMjkxMzQwNiAxLjUzNTQyOTc0LDEwLjk0MjI1MzkgMi4yMTI1OTg5MywxMS42NDU2NjkzIEMyLjg4OTc2NzMxLDEyLjM0OTA4NDcgMy43MTY1MzAzOSwxMi45ODQyNDkxIDQuNjkyOTE0MzksMTMuNTUxMTgxMSBDNS42NjkyOTYzOCwxNC4xMjg2MTE5IDYuNzg3Mzk1NTMsMTQuNDE3MzIyOCA4LjA0NzI0NDA5LDE0LjQxNzMyMjggQzkuMzA3MDkyNjYsMTQuNDE3MzIyOCAxMC40MjUxOTE4LDE0LjEyODYxMTkgMTEuNDAxNTczOCwxMy41NTExODExIEMxMi4zNzc5NTc4LDEyLjk3Mzc1MDMgMTMuMjA0NzIwOSwxMi4zMzMzMzc3IDEzLjg4MTg4OTMsMTEuNjI5OTIyMyBDMTQuNTU5MDU3NiwxMC45MjY1MDQ4IDE1LjA4MTM2MjEsMTAuMjcwMzQ0NiAxNS40NDg4MTg5LDkuNjYxNDE3MzIgQzE1LjgxNjI3NTcsOS4wNTI0OTAwOCAxNi4wMTU3NDgsOC43MTEyODY0MyAxNi4wNDcyNDQxLDguNjM3Nzk0MjcgQzE2LjA3ODc0MDIsOC41NzQ4MDIxNCAxNi4wOTQ0ODkyLDguNDg4MTg5NDggMTYuMDk0NDg5Miw4LjM3Nzk1MjI1IEMxNi4wOTQ0ODkyLDguMjY3NzE1MDIgMTYuMDc4NzQwMiw4LjE3NTg1MzM1IDE2LjA0NzI0NDEsOC4xMDIzNjMyMSBaIE04LjA0NzI0NDA5LDEzLjA3ODc0MDIgQzcuMTQ0MzUyMjUsMTMuMDc4NzQwMiA2LjMyMDIxMzY3LDEyLjg4NDUxNjQgNS41NzQ4MDQxNiwxMi40OTYwNjMgQzQuODI5MzkyNjMsMTIuMTA3NjEwMiA0LjE3NTg1NDg3LDExLjY1MzU0NjggMy42MTQxNzI3MiwxMS4xMzM4NTg4IEMzLjA1MjQ5MDU4LDEwLjYxNDE3MDcgMi41ODI2NzgxNywxMC4wOTE4NjYyIDIuMjA0NzIzNCw5LjU2NjkyOTEzIEMxLjgzNzI2ODQ2LDkuMDQxOTkyMDYgMS41Njk1NTQ3NSw4LjY0MzA0NTI5IDEuNDAxNTc0OCw4LjM3MDA3ODc0IEMxLjU0ODU1NzEsOC4xMDc2MTAyIDEuODA1NzcyNCw3LjcxMzkxMjQ0IDIuMTczMjI5MzUsNy4xODg5NzUzNyBDMi41NTExODIxMSw2LjY2NDA0MDMxIDMuMDIzNjE5MDIsNi4xNDE3MzU4MSAzLjU5MDU1MDE3LDUuNjIyMDQ3NzUgQzQuMTU3NDgzMzQsNS4xMDIzNTk2OSA0LjgxMzY0MzU5LDQuNjQ4Mjk2MzEgNS41NTkwNTUxMiw0LjI1OTg0MzUzIEM2LjMxNDk2NDY2LDMuODcxMzg4NzIgNy4xNDQzNTIyNSwzLjY3NzE2NTM1IDguMDQ3MjQ0MDksMy42NzcxNjUzNSBDOC45NTAxMzU5NCwzLjY3NzE2NTM1IDkuNzc0Mjc0NTIsMy44NzEzODg3MiAxMC41MTk2ODQsNC4yNTk4NDM1MyBDMTEuMjY1MDk1Niw0LjY0ODI5NjMxIDExLjkxODYzMzMsNS4xMDIzNTk2OSAxMi40ODAzMTU1LDUuNjIyMDQ3NzUgQzEzLjA0MTk5NzYsNi4xNDE3MzU4MSAxMy41MTE4MSw2LjY2NDA0MDMxIDEzLjg4OTc2NDgsNy4xODg5NzUzNyBDMTQuMjU3MjE5NSw3LjcxMzkxMjQ0IDE0LjUyNDkzMyw4LjEwNzYxMDIgMTQuNjkyOTEzNCw4LjM3MDA3ODc0IEMxNC41MjQ5MzMsOC42NDMwNDUyOSAxNC4yNTcyMTk1LDkuMDQxOTkyMDYgMTMuODg5NzY0OCw5LjU2NjkyOTEzIEMxMy41MTE4MSwxMC4wOTE4NjYyIDEzLjA0MTk5NzYsMTAuNjE0MTcwNyAxMi40ODAzMTU1LDExLjEzMzg1ODggQzExLjkxODYzMzMsMTEuNjUzNTQ2OCAxMS4yNjUwOTU2LDEyLjEwNzYxMDIgMTAuNTE5Njg0LDEyLjQ5NjA2MyBDOS43NzQyNzQ1MiwxMi44ODQ1MTY0IDguOTUwMTM1OTQsMTMuMDc4NzQwMiA4LjA0NzI0NDA5LDEzLjA3ODc0MDIgWiBNOC4wNDcyNDQwOSw1LjY5MjkxMzM5IEM3LjMxMjMzMjYsNS42OTI5MTMzOSA2LjY3OTc5Mjg4LDUuOTU1Mzc3ODkgNi4xNDk2MDY4LDYuNDgwMzE0OTYgQzUuNjE5NDIwNzIsNy4wMDUyNTIwMyA1LjM1NDMyOTcsNy42MzUxNjcyNCA1LjM1NDMyOTcsOC4zNzAwNzg3NCBDNS4zNTQzMjk3LDkuMTE1NDkwMjcgNS42MTk0MjA3Miw5Ljc1MDY1NDQ5IDYuMTQ5NjA2OCwxMC4yNzU1ODk1IEM2LjY3OTc5Mjg4LDEwLjgwMDUyNjYgNy4zMTIzMzI2LDExLjA2Mjk5MzEgOC4wNDcyNDQwOSwxMS4wNjI5OTMxIEM4Ljc4MjE1NTU5LDExLjA2Mjk5MzEgOS40MTQ2OTUzMSwxMC44MDA1MjY2IDkuOTQ0ODgxMzksMTAuMjc1NTg5NSBDMTAuNDc1MDY3NSw5Ljc1MDY1NDQ5IDEwLjc0MDE1ODUsOS4xMTU0OTAyNyAxMC43NDAxNTg1LDguMzcwMDc4NzQgQzEwLjc0MDE1ODUsNy42MzUxNjcyNCAxMC40NzUwNjc1LDcuMDA1MjUyMDMgOS45NDQ4ODEzOSw2LjQ4MDMxNDk2IEM5LjQxNDY5NTMxLDUuOTU1Mzc3ODkgOC43ODIxNTU1OSw1LjY5MjkxMzM5IDguMDQ3MjQ0MDksNS42OTI5MTMzOSBaIE04LjA0NzI0NDA5LDkuNzI0NDA5NDUgQzcuNjc5Nzg3MzQsOS43MjQ0MDk0NSA3LjM2NDgzMDc0LDkuNTkzMTc2MTkgNy4xMDIzNjIyLDkuMzMwNzA3NjUgQzYuODM5ODkzNjcsOS4wNjgyNDExMyA2LjcwODY2MjQzLDguNzQ4MDMzNTEgNi43MDg2NjI0Myw4LjM3MDA3ODc0IEM2LjcwODY2MjQzLDguMDAyNjIxOTggNi44Mzk4OTM2Nyw3LjY4NzY2NTM5IDcuMTAyMzYyMiw3LjQyNTE5Njg1IEM3LjM2NDgzMDc0LDcuMTYyNzI4MzEgNy42Nzk3ODczNCw3LjAzMTQ5NzA3IDguMDQ3MjQ0MDksNy4wMzE0OTcwNyBDOC40MTQ3MDA4NSw3LjAzMTQ5NzA3IDguNzI5NjU3NDUsNy4xNjI3MjgzMSA4Ljk5MjEyNTk4LDcuNDI1MTk2ODUgQzkuMjU0NTk0NTIsNy42ODc2NjUzOSA5LjM4NTgyNTc2LDguMDAyNjIxOTggOS4zODU4MjU3Niw4LjM3MDA3ODc0IEM5LjM4NTgyNTc2LDguNzQ4MDMzNTEgOS4yNTQ1OTQ1Miw5LjA2ODI0MTEzIDguOTkyMTI1OTgsOS4zMzA3MDc2NSBDOC43Mjk2NTc0NSw5LjU5MzE3NjE5IDguNDE0NzAwODUsOS43MjQ0MDk0NSA4LjA0NzI0NDA5LDkuNzI0NDA5NDUgWiIgaWQ9IlBhZ2UtMSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" alt="" class="fr amount"></li>
//                 <span>{{articlelist[1].readNo}}</span>
//             </ul>
//         </div>
//         <p>{{articlelist[1].introduction }}</p>
//     </div>
// </div>
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
.js-main .js-home-main .js-left {
    width: 770px;
    float: left;
}
.js-article {
    width: 755px;
}
.js-article {
    font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial,
        Microsoft YaHei, \\\5fae\8f6f\96c5\9ed1, STHeitiSC-Light, simsun,
        \\\5b8b\4f53, WenQuanYi Zen Hei, WenQuanYi Micro Hei, sans-serif;
}
.js-article .title {
    font-weight: bold;
    margin-bottom: 30px;
}
.js-article .title h2 {
    font-size: 32px;
    color: #333;
}
.js-article .article-info {
    color: #666;
    margin-bottom: 30px;
    line-height: 32px;
}
.js-article .article-info .author {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    margin-right: 4px;
}
.js-article .article-info .time {
    display: inline-block;
    color: #666;
    margin-left: 30px;
}
.js-article .article-info ul {
    display: inline-block;
}
.js-article .article-info ul {
    margin-left: 30px;
}
.js-article .article-info li {
    display: block;
    margin-top: 4px;
    float: left;
}

.js-article ul li {
    list-style-type: unset;
}
.js-article .article-info .amount {
    margin: 5px 2px 0 0;
    vertical-align: top;
}
.share-wrapper .share-text {
    top: 3px;
    position: relative;
}
.social-share .icon-qq,
.social-share .icon-qq:hover {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiP…AgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==);
    background-size: 24px 24px;
}

.social-share .social-share-icon {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    font-size: 20px;
    border-radius: 50%;
    line-height: 32px;
    color: #666;
    text-align: center;
    vertical-align: middle;
    transition: background 0.6s ease-out 0s;
}
.social-share a {
    position: relative;
    text-decoration: none;
    display: inline-block;
    outline: none;
}
.social-share .icon-weibo,
.social-share .icon-weibo:hover {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiP…AgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=);
    background-size: 24px 24px;
}
.social-share .icon-wechat,
.social-share .icon-wechat:hover {
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiP…AgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==);
    background-size: 24px 24px;
}

.social-share .icon-wechat {
    position: relative;
}
.is-top .social-share .icon-wechat .wechat-qrcode {
    top: 41px !important;
}

.social-share .icon-wechat .wechat-qrcode {
    display: none;
    border: 1px solid #eee;
    position: absolute;
    z-index: 9;
    top: 35px;
    left: -84px;
    width: 200px;
    height: 192px;
    color: #666;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 10px #aaa;
    transition: all 0.2s;
    -webkit-tansition: all 0.35s;
    -moz-transition: all 0.35s;
}
.social-share .icon-wechat .wechat-qrcode h4 {
    font-weight: 400;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    background-color: #f3f3f3;
    margin: 0;
    padding: 0;
    color: #777;
}
.social-share .icon-wechat .wechat-qrcode .help p {
    font-weight: 400;
    line-height: 16px;
    padding: 0;
    margin: 0;
    font-size: 12px;
}
.social-share .icon-wechat .wechat-qrcode .qrcode {
    width: 105px;
    margin: 10px auto;
}

.share-operation .social-share .icon-wechat .wechat-qrcode {
    display: none;
    border: 1px solid #eee;
    position: absolute;
    z-index: 9;
    top: -205px;
    left: -84px;
    width: 200px;
    height: 192px;
    color: #666;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    box-shadow: 0 2px 10px #aaa;
    transition: all 0.2s;
    -webkit-tansition: all 0.35s;
    -moz-transition: all 0.35s;
}
.social-share .icon-wechat .wechat-qrcode:after {
    content: "";
    position: absolute;
    left: 50%;
    margin-left: -6px;
    bottom: -13px;
    width: 0;
    height: 0;
    border-width: 8px 6px 6px;
    border-style: solid;
    border-color: #fff transparent transparent;
}
.social-share .icon-wechat:hover .wechat-qrcode {
    display: block;
}
.social-share .social-share-icon p {
    text-align: center;
}
.js-article .tags {
    margin-bottom: 30px;
}
.js-article .tags a {
    display: inline-block;
    padding: 8px 22px;
    background: #f5f5f5;
    border-radius: 4px;
}
.js-article .source {
    margin-bottom: 20px;
}
.js-article .source .error-correction {
    color: #4a4a4a;
    padding-left: 13px;
    font-size: 14px;
}
.js-article .statement {
    color: #999;
    margin-bottom: 30px;
    line-height: 24px;
}
.js-article .btc-price {
    padding-top: 20px;
    margin-bottom: 30px;
}
.js-article .ad-list {
    height: 220px;
}

.ad-list {
    margin-top: 20px;
}
.js-article .ad-list ul {
    width: 166px;
    height: 215px;
    padding: 0;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    background: #fff;
    display: block;
    margin-right: 20px;
    margin-bottom: 20px;
    float: left;
    position: relative;
}
.js-article .ad-list ul img {
    width: 170px;
    display: block;
    height: 215px;
    margin: 0;
}
.js-article .ad-list ul .note {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    opacity: 0.5;
    background: rgba(0, 0, 0, 0.5);
    font-size: 11px;
    padding: 0 5px;
}
.js-article blockquote,
.js-article p {
    font-size: 18px;
    color: #29293b;
    line-height: 36px;
    margin: 32px 0;
    text-align: justify;
}
/* 右边 */
.js-main .js-right {
    width: 370px;
    float: right;
}
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
    font-size: 12px;
}
.js-right-ad .border-b-no {
    border-bottom: 0;
}
/*作者*/
.author-brands .control {
    height: 330px;
    /* width: 1170px; */
    margin: 0 auto;
    padding: 0 15px;
    position: relative;
}
.author-brands .control .share {
    float: right;
    margin-top: 23px;
    position: absolute;
    top: 40px;
    right: 0;
}
.author-brands .control .share a {
    padding-left: 26px;
    display: block;
    color: #999;
    float: left;
    background: url(/static/imgs/share.svg) 0 3px no-repeat;
}
.author-brands .control .share .shares-pop {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    bottom: -91px;
    left: -151px;
}
.author-brands .control .share .shares-pop {
    padding: 12px 18px;
    width: 160px;
    left: -75px;
    bottom: 23px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    display: block;
    background: #fff;
    position: absolute;
    z-index: 9;
}
.author-brands .control .share .shares-pop a {
    width: 24px;
    height: 24px;
    padding: 6px;
    float: left;
    display: block;
}
.author-brands .control .share a {
    padding-left: 26px;
    display: block;
    color: #999;
    float: left;
    background: url(/static/imgs/share.svg) 0 3px no-repeat;
}

.social-share .icon-qq {
    background: url(/static/imgs/qq-icon.svg) 6px 6px no-repeat !important;
}
.social-share .social-share-icon {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 32px;
    font-size: 20px;
    border-radius: 50%;
    line-height: 32px;
    /* border: 1px solid #666; */
    color: #666;
    text-align: center;
    vertical-align: middle;
    transition: background 0.6s ease-out 0s;
}
.social-share a {
    position: relative;
    text-decoration: none;
    margin: 4px;
    display: inline-block;
    outline: none;
}
.social-share * {
    font-family: "socialshare" !important;
}
.author-brands .control .share .shares-pop a + a {
    margin-left: 20px;
}
.social-share .icon-weibo {
    background: url(/static/imgs/weibo-icon.svg) 6px 6px no-repeat !important;
}
.social-share .icon-wechat {
    position: relative;
    background: url(/static/imgs/weixin-icon.svg) 6px 6px no-repeat !important;
}
.author-brands .control .avatar {
    padding-top: 30px;
    text-align: center;
    margin-bottom: 20px;
}
.author-brands .control .avatar img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
}
.author-brands .control .name {
    text-align: center;
    font-weight: bold;
    color: #fff;
    margin-bottom: 12px;
}
.author-brands .control .name ol {
    position: relative;
    display: inline-block;
}
.author-brands .control .brief {
    text-align: center;
    color: #fff;
    font-weight: 300;
    height: 46px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.author-brands .control .bed {
    text-align: center;
    margin-bottom: 20px;
}
.author-brands .control .data {
    height: 46px;
    text-align: center;
}
.author-brands .control .data ul {
    display: inline-block;
    margin: 0 auto;
    color: #fff;
}
.author-brands .control .data ul li {
    width: 90px;
    height: 44px;
    display: inline-block;
    font-size: 18px;
}
.author-brands .control .data ul li + li {
    border-left: rgba(251, 251, 251, 0.2) 1px solid;
}
.author-brands .control .data ul span {
    display: block;
    opacity: 0.5;
    font-size: 14px;
}
.author-brands {
    height: 330px;
    background: url(/static/imgs/im006.png) center center no-repeat;
    /* background-size: 100% 330px; */
    margin-bottom: 60px;
}
.author-brands .control .bed a {
    color: #fff;
    width: 68px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    background: #000;
    display: inline-block;
    margin: 0 auto;
}
.author-brands .control .name span {
    position: absolute;
    top: 2px;
    right: -90px;
}
/* 下一篇  */
.js-article-next {
    padding: 30px 0;
}
.js-article-next ol {
    color: #999;
    margin-bottom: 10px;
}
.js-article-next .title {
    font-weight: bold;
    margin-bottom: 20px;
}
.js-article-next .title h2 {
    font-size: 32px;
}
a {
    color: #333;
}
.js-article-next .article-info {
    color: #666;
    margin-bottom: 20px;
}
.js-article-next .article-info .author {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    margin-right: 4px;
    vertical-align: top;
}
.js-article-next .article-info .time {
    display: inline-block;
    color: #666;
    margin-left: 30px;
}
.js-article-next .article-info ul {
    margin-left: 30px;
    display: inline-block;
}
.js-article-next .article-info li {
    display: block;
    float: left;
}
.js-article-next .article-info .amount {
    margin: 5px 2px 0 0;
}
.js-article-next p {
    margin-bottom: 30px;
    line-height: 30px;
    font-size: 18px;
}
/*  */
.js-foot-status {
    border-top: #dcdcdc 1px solid;
    margin: 0 !important;
    background: #fff;
}
.js-foot-status .control {
    height: 44px;
}
.js-foot-status .control .collection {
    margin-top: 3px;
    float: left;
}
.js-foot-status .control .collection a {
    padding: 9px 0 0 0;
    height: 20px;
    line-height: 20px;
    display: block;
}
.js-foot-status .control .share {
    float: right;
    height: 36px;
    margin: 4px 4px 0 0;
}

.social-share,
.social-share * {
    font-family: socialshare !important;
}
.social-share {
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    display: inline;
}
.js-foot-status .control .share a {
    padding: 6px;
    display: block;
    float: left;
}
.js-share-title {
    float: right;
    margin-top: 13px;
    margin-right: 10px;
}
.js-foot-status .control .attention {
    float: right;
    padding-top: 9px;
}
.js-foot-status .control .attention a {
    width: 56px;
    height: 26px;
    line-height: 26px;
    background: #333;
    border-radius: 4px;
    display: block;
    text-align: center;
    color: #fff;
}
.js-foot-status .control .infor {
    float: left;
}
.js-foot-status .control .author {
    display: block;
    float: left;
    padding-left: 40px;
    border-left: 1px solid #dcdcdc;
    margin-top: 10px;
}
.js-foot-status .control .author .photo {
    width: 24px;
    height: 24px;
    border-radius: 100%;
    margin-right: 4px;
}
.js-foot-status .control .author span,
.js-foot-status .control .author img {
    color: #999;
    display: inline-block;
}
.js-foot-status .control .author a span {
    color: #333;
}
.js-foot-status .control .author span {
    margin-top: 3px;
}
.js-foot-status-pop {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 99;
}
.is-top .social-share .icon-wechat .wechat-qrcode:after {
    border-color: #f3f3f3 transparent transparent!important;
    bottom: 193px!important;
    transform: rotate(180deg)!important;
}

.social-share .icon-wechat .wechat-qrcode:after {
    content: "";
    position: absolute;
    left: 50%;
    margin-left: -6px;
    bottom: -13px;
    width: 0;
    height: 0;
    border-width: 8px 6px 6px;
    border-style: solid;
    border-color: #fff transparent transparent;
}
</style>
