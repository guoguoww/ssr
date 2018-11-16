<template>
  <div class="" style="position: relative;top: -20px;">
    <!-- 作者详情 -->
    <div class="author-brands">
      <div class="control">
        <div class="share">
          <a href="javascript:;" @click="shaerShow = !shaerShow">分享</a>
          <div class="social-share shares-pop share-component" v-show="shaerShow">
            <a class="social-share-icon icon-qq" href="#" target="_blank" @click="qZone()"></a>
            <a class="social-share-icon icon-weibo" href="#" target="_blank" @click="sinaWeiBo()"></a>
            <a class="social-share-icon icon-wechat" href="javascript:"></a>
            <div class="wechat-qrcode">
              <h4>微信扫一扫：分享</h4>
              <!--<div class="qrcode">-->
              <div id="qrcode" style="text-align: center;padding-left: 55px"></div>
              <div class="help">
                <p>微信里点“发现”，扫一下</p>
                <p>二维码便可将本文分享至朋友圈。</p>
              </div>
            </div>
          </div>
        </div>
        <div class="avatar"><img :src="userData.userHeader? getimgs(userData.userHeader) :''" :alt="userData.nickName"></div>
        <div class="name">
          <ol>
            {{userData.nickName}}
            <span>
              <svg width="51px" height="20px" viewBox="0 0 51 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="完成" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="专栏作者" transform="translate(-963.000000, -218.000000)">
                    <g id="personally-icon" transform="translate(963.000000, 218.000000)">
                      <rect id="Rectangle-38" fill="#7ED321" x="0" y="0" width="51" height="20" rx="10"></rect>
                      <circle id="Oval-7" fill="#FFFFFF" cx="10" cy="10" r="8"></circle>
                      <text id="个人" font-family="PingFangSC-Medium, PingFang SC" font-size="12" font-weight="400" fill="#FFFFFF">
                        <tspan x="21" y="14" v-if="userData.authStatus === 2">{{certificationType}}</tspan>
                        <tspan x="21" y="14" v-if="userData.authStatus !== 2">{{userData.authStatus === 0 ? '未认证':(userData.authStatus === 1 ? '认证中':'认证失败')}}</tspan>
                      </text>
                      <text id="v" font-family="ArialRoundedMTBold, Arial Rounded MT Bold" font-size="16" font-weight="normal" fill="#7ED321">
                        <tspan x="6" y="15">v</tspan>
                      </text>
                    </g>
                  </g>
                </g>
              </svg>
            </span>
          </ol>
        </div>
        <div class="brief">
          {{userData.introduction? userData.introduction: '无'}}
        </div>
        <div id="personalFollow" class="bed" style="">
          <a href="javascript:void(0);" class="nofocus" v-if="userData.alreadyFollow === false" @click="focus()"> + 关注</a>
          <a href="javascript:void(0);" class="focus"  v-if="userData.alreadyFollow"> 已关注</a>
          <!---->
        </div>
        <div class="data">
          <ul>
            <li>{{userData.releaseArticleTotal? userData.releaseArticleTotal: '0'}}
              <span>文章</span>
            </li>
            <li>{{userData.readingVolume ? userData.readingVolume : '0'}}
              <span>浏览</span>
            </li>
            <li>{{userData.fansTotal? userData.fansTotal: '0'}}
              <span>粉丝</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="js-main">
      <div class="js-home-main clearfix">
        <div class="js-home-carousel-tc">
          <div class="ja-article-list">
            <div class="article-main" v-if="articleList.length > 0">
              <ol data-information-id="223694" class="clearfix list" v-for="(item,i) in articleList" :key="i">
                <!--<a href="https://www.jinse.com/blockchain/223694.html" title="俄亥俄州州长宣布区块链和智能合约的法案正式生效" target="_blank" class="article-img"><img src="https://img.jinse.com/982522_image1.png" alt="俄亥俄州州长宣布区块链和智能合约的法案正式生效"></a>-->
                <nuxt-link :to="'/article/'+ item.articleId" class="article-img" target="_blank">
                  <img :src="item.image ? getimgs(item.image) : ''" :alt="item.title">
                </nuxt-link>
                <ul>
                  <h3 class="font20">
                    <!--<a href="https://www.jinse.com/blockchain/223694.html" title="俄亥俄州州长宣布区块链和智能合约的法案正式生效" target="_blank">-->
                      <!--<div class="article-tag"></div>-->
                      <!--俄亥俄州州长宣布区块链和智能合约的法案正式生效</a>-->
                    <nuxt-link :to="'/article/'+ item.articleId">
                      {{item.title}}
                    </nuxt-link>
                  </h3>
                  <li>
                   {{item.introduction}}</li>
                  <li class="article-info">
                    <span> {{item.createTime}}</span>
                    <span class="js-article-num fr">{{item.readNo}}</span> <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTdweCIgaGVpZ2h0PSIxM3B4IiB2aWV3Qm94PSIwIDAgMTcgMTMiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDQ5LjEgKDUxMTQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5QYWdlIDE8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iU3ltYm9scyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuWbvuaghy/pmIXor7siIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCAtMi4wMDAwMDApIiBmaWxsPSIjOUI5QjlCIj4KICAgICAgICAgICAgPHBhdGggZD0iTTE2LjA0NzI0NDEsOC4xMDIzNjMyMSBDMTYuMDE1NzQ4LDguMDM5MzY5MDcgMTUuODE2Mjc1Nyw3LjcwMzQxNDQzIDE1LjQ0ODgxODksNy4wOTQ0ODkyIEMxNS4wODEzNjIxLDYuNDg1NTYxOTUgMTQuNTU5MDU3Niw1LjgyNjc3NTE4IDEzLjg4MTg4OTMsNS4xMTgxMTA3NCBDMTMuMjA0NzIwOSw0LjQwOTQ0NDI4IDEyLjM3Nzk1NzgsMy43NjY0MDY1NSAxMS40MDE1NzM4LDMuMTg4OTc3MzkgQzEwLjQyNTE5MTgsMi42MTE1NDYyIDkuMzA3MDkyNjYsMi4zMjI4MzQ2NSA4LjA0NzI0NDA5LDIuMzIyODM0NjUgQzYuNzg3Mzk1NTMsMi4zMjI4MzQ2NSA1LjY2OTI5NjM4LDIuNjExNTQ2MiA0LjY5MjkxNDM5LDMuMTg4OTc3MzkgQzMuNzE2NTMwMzksMy43NjY0MDY1NSAyLjg4OTc2NzMxLDQuNDA5NDQ0MjggMi4yMTI1OTg5Myw1LjExODExMDc0IEMxLjUzNTQyOTc0LDUuODI2Nzc1MTggMS4wMTMxMjUyNCw2LjQ4NTU2MTk1IDAuNjQ1NjY5MjkxLDcuMDk0NDg5MiBDMC4yNzgyMTMzNDIsNy43MDM0MTQ0MyAwLjA3ODc0MDMxODcsOC4wMzkzNjkwNyAwLjA0NzI0NDA5NDUsOC4xMDIzNjMyMSBDMC4wMTU3NDc4NzAyLDguMjA3MzQ5NDIgMCw4LjMwOTcxMTEyIDAsOC40MDk0NDgzMSBDMCw4LjUwOTE4NzUzIDAuMDE1NzQ3ODcwMiw4LjYxMTU0NzIxIDAuMDQ3MjQ0MDk0NSw4LjcxNjUzNTQzIEMwLjA3ODc0MDMxODcsOC43NTg1Mjk1MSAwLjI3ODIxMzM0Miw5LjA4Mzk4NjE0IDAuNjQ1NjY5MjkxLDkuNjkyOTEzMzkgQzEuMDEzMTI1MjQsMTAuMjkxMzQwNiAxLjUzNTQyOTc0LDEwLjk0MjI1MzkgMi4yMTI1OTg5MywxMS42NDU2NjkzIEMyLjg4OTc2NzMxLDEyLjM0OTA4NDcgMy43MTY1MzAzOSwxMi45ODQyNDkxIDQuNjkyOTE0MzksMTMuNTUxMTgxMSBDNS42NjkyOTYzOCwxNC4xMjg2MTE5IDYuNzg3Mzk1NTMsMTQuNDE3MzIyOCA4LjA0NzI0NDA5LDE0LjQxNzMyMjggQzkuMzA3MDkyNjYsMTQuNDE3MzIyOCAxMC40MjUxOTE4LDE0LjEyODYxMTkgMTEuNDAxNTczOCwxMy41NTExODExIEMxMi4zNzc5NTc4LDEyLjk3Mzc1MDMgMTMuMjA0NzIwOSwxMi4zMzMzMzc3IDEzLjg4MTg4OTMsMTEuNjI5OTIyMyBDMTQuNTU5MDU3NiwxMC45MjY1MDQ4IDE1LjA4MTM2MjEsMTAuMjcwMzQ0NiAxNS40NDg4MTg5LDkuNjYxNDE3MzIgQzE1LjgxNjI3NTcsOS4wNTI0OTAwOCAxNi4wMTU3NDgsOC43MTEyODY0MyAxNi4wNDcyNDQxLDguNjM3Nzk0MjcgQzE2LjA3ODc0MDIsOC41NzQ4MDIxNCAxNi4wOTQ0ODkyLDguNDg4MTg5NDggMTYuMDk0NDg5Miw4LjM3Nzk1MjI1IEMxNi4wOTQ0ODkyLDguMjY3NzE1MDIgMTYuMDc4NzQwMiw4LjE3NTg1MzM1IDE2LjA0NzI0NDEsOC4xMDIzNjMyMSBaIE04LjA0NzI0NDA5LDEzLjA3ODc0MDIgQzcuMTQ0MzUyMjUsMTMuMDc4NzQwMiA2LjMyMDIxMzY3LDEyLjg4NDUxNjQgNS41NzQ4MDQxNiwxMi40OTYwNjMgQzQuODI5MzkyNjMsMTIuMTA3NjEwMiA0LjE3NTg1NDg3LDExLjY1MzU0NjggMy42MTQxNzI3MiwxMS4xMzM4NTg4IEMzLjA1MjQ5MDU4LDEwLjYxNDE3MDcgMi41ODI2NzgxNywxMC4wOTE4NjYyIDIuMjA0NzIzNCw5LjU2NjkyOTEzIEMxLjgzNzI2ODQ2LDkuMDQxOTkyMDYgMS41Njk1NTQ3NSw4LjY0MzA0NTI5IDEuNDAxNTc0OCw4LjM3MDA3ODc0IEMxLjU0ODU1NzEsOC4xMDc2MTAyIDEuODA1NzcyNCw3LjcxMzkxMjQ0IDIuMTczMjI5MzUsNy4xODg5NzUzNyBDMi41NTExODIxMSw2LjY2NDA0MDMxIDMuMDIzNjE5MDIsNi4xNDE3MzU4MSAzLjU5MDU1MDE3LDUuNjIyMDQ3NzUgQzQuMTU3NDgzMzQsNS4xMDIzNTk2OSA0LjgxMzY0MzU5LDQuNjQ4Mjk2MzEgNS41NTkwNTUxMiw0LjI1OTg0MzUzIEM2LjMxNDk2NDY2LDMuODcxMzg4NzIgNy4xNDQzNTIyNSwzLjY3NzE2NTM1IDguMDQ3MjQ0MDksMy42NzcxNjUzNSBDOC45NTAxMzU5NCwzLjY3NzE2NTM1IDkuNzc0Mjc0NTIsMy44NzEzODg3MiAxMC41MTk2ODQsNC4yNTk4NDM1MyBDMTEuMjY1MDk1Niw0LjY0ODI5NjMxIDExLjkxODYzMzMsNS4xMDIzNTk2OSAxMi40ODAzMTU1LDUuNjIyMDQ3NzUgQzEzLjA0MTk5NzYsNi4xNDE3MzU4MSAxMy41MTE4MSw2LjY2NDA0MDMxIDEzLjg4OTc2NDgsNy4xODg5NzUzNyBDMTQuMjU3MjE5NSw3LjcxMzkxMjQ0IDE0LjUyNDkzMyw4LjEwNzYxMDIgMTQuNjkyOTEzNCw4LjM3MDA3ODc0IEMxNC41MjQ5MzMsOC42NDMwNDUyOSAxNC4yNTcyMTk1LDkuMDQxOTkyMDYgMTMuODg5NzY0OCw5LjU2NjkyOTEzIEMxMy41MTE4MSwxMC4wOTE4NjYyIDEzLjA0MTk5NzYsMTAuNjE0MTcwNyAxMi40ODAzMTU1LDExLjEzMzg1ODggQzExLjkxODYzMzMsMTEuNjUzNTQ2OCAxMS4yNjUwOTU2LDEyLjEwNzYxMDIgMTAuNTE5Njg0LDEyLjQ5NjA2MyBDOS43NzQyNzQ1MiwxMi44ODQ1MTY0IDguOTUwMTM1OTQsMTMuMDc4NzQwMiA4LjA0NzI0NDA5LDEzLjA3ODc0MDIgWiBNOC4wNDcyNDQwOSw1LjY5MjkxMzM5IEM3LjMxMjMzMjYsNS42OTI5MTMzOSA2LjY3OTc5Mjg4LDUuOTU1Mzc3ODkgNi4xNDk2MDY4LDYuNDgwMzE0OTYgQzUuNjE5NDIwNzIsNy4wMDUyNTIwMyA1LjM1NDMyOTcsNy42MzUxNjcyNCA1LjM1NDMyOTcsOC4zNzAwNzg3NCBDNS4zNTQzMjk3LDkuMTE1NDkwMjcgNS42MTk0MjA3Miw5Ljc1MDY1NDQ5IDYuMTQ5NjA2OCwxMC4yNzU1ODk1IEM2LjY3OTc5Mjg4LDEwLjgwMDUyNjYgNy4zMTIzMzI2LDExLjA2Mjk5MzEgOC4wNDcyNDQwOSwxMS4wNjI5OTMxIEM4Ljc4MjE1NTU5LDExLjA2Mjk5MzEgOS40MTQ2OTUzMSwxMC44MDA1MjY2IDkuOTQ0ODgxMzksMTAuMjc1NTg5NSBDMTAuNDc1MDY3NSw5Ljc1MDY1NDQ5IDEwLjc0MDE1ODUsOS4xMTU0OTAyNyAxMC43NDAxNTg1LDguMzcwMDc4NzQgQzEwLjc0MDE1ODUsNy42MzUxNjcyNCAxMC40NzUwNjc1LDcuMDA1MjUyMDMgOS45NDQ4ODEzOSw2LjQ4MDMxNDk2IEM5LjQxNDY5NTMxLDUuOTU1Mzc3ODkgOC43ODIxNTU1OSw1LjY5MjkxMzM5IDguMDQ3MjQ0MDksNS42OTI5MTMzOSBaIE04LjA0NzI0NDA5LDkuNzI0NDA5NDUgQzcuNjc5Nzg3MzQsOS43MjQ0MDk0NSA3LjM2NDgzMDc0LDkuNTkzMTc2MTkgNy4xMDIzNjIyLDkuMzMwNzA3NjUgQzYuODM5ODkzNjcsOS4wNjgyNDExMyA2LjcwODY2MjQzLDguNzQ4MDMzNTEgNi43MDg2NjI0Myw4LjM3MDA3ODc0IEM2LjcwODY2MjQzLDguMDAyNjIxOTggNi44Mzk4OTM2Nyw3LjY4NzY2NTM5IDcuMTAyMzYyMiw3LjQyNTE5Njg1IEM3LjM2NDgzMDc0LDcuMTYyNzI4MzEgNy42Nzk3ODczNCw3LjAzMTQ5NzA3IDguMDQ3MjQ0MDksNy4wMzE0OTcwNyBDOC40MTQ3MDA4NSw3LjAzMTQ5NzA3IDguNzI5NjU3NDUsNy4xNjI3MjgzMSA4Ljk5MjEyNTk4LDcuNDI1MTk2ODUgQzkuMjU0NTk0NTIsNy42ODc2NjUzOSA5LjM4NTgyNTc2LDguMDAyNjIxOTggOS4zODU4MjU3Niw4LjM3MDA3ODc0IEM5LjM4NTgyNTc2LDguNzQ4MDMzNTEgOS4yNTQ1OTQ1Miw5LjA2ODI0MTEzIDguOTkyMTI1OTgsOS4zMzA3MDc2NSBDOC43Mjk2NTc0NSw5LjU5MzE3NjE5IDguNDE0NzAwODUsOS43MjQ0MDk0NSA4LjA0NzI0NDA5LDkuNzI0NDA5NDUgWiIgaWQ9IlBhZ2UtMSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" alt="" class="fr amount"></li>
                </ul>
              </ol>

            </div>
            <!--分页器-->
            <div class="article_page" v-if="articleList.length > 0">
              <Page :total="total" :page-size="page.rows" show-elevator @on-change="pageChange" />
            </div>
            <p class="list_null" v-if="articleList.length === 0">该作者暂未发表文章...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="">
  import cookie from '~/assets/cookie.js'
  if (typeof window !== 'undefined'){
    var QRCode =  require('qrcodejs2')
  }
  export default {
    name: "_id",
    data() {
      return {
        myData: {}, //登陆者信息
        userData: {}, //作者信息
        userHeader: '',//头像
        shaerShow: false, //分享
        page: {
          page: 1, //第几页
          rows: 10, //每页N条
          userId: '' //作何id
        },
        total: 0, //总条数
        articleList: [], //作者文章列表
        location: '', //页面路径
      };
    },
    components: {},
    async asyncData(context) {//获取异步数据方法 在组件创建前触发
      const [userData, articleList] = await Promise.all([
        context.app.$axios({ //作者信息
          method: "get",
          url: "/api/user/query_user_essential_info",
          params: {
            userId: context.params.id
          }
        }).then(res=>{
          if (res.data.errorCode == 0) {
            return res.data.data
          }
        }),
        context.app.$axios({ //作者列表
          method: "get",
          url: "/api/article/findarticlebyuser",
          params: {
            page: 1, //第几页
            rows: 10, //每页N条
            userId: context.params.id //作者id
          }
        }).then(res=>{
          if (res.data.errorCode == 0) {
            return res.data.data.data
          }
        })
      ])
      return  {userData, articleList}

    },
    computed: {
      router() { //获取作者id
        var routerId = this.$route.path.split('/')[2];
        return routerId;
      },
      certificationType (){ //认证状态
        switch(this.userData.certificationType){
          case '0':
            return '个人'
          case '1':
            return '媒体'
          case '2':
            return '企业'
        }
      },
    },
    created() {//初始运行获取函数
      this.obtain(); //获取作者信息
      this.getArticleList(); //获取作者列表
    },
    methods: {
      async obtain() { //获取作者信息
        await this.$axios({
          url: '/api/user/query_user_essential_info',
          method: "get",
          params: {
            userId: this.router
          }
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.userData = res.data.data;
            this.weixin()
          }
        })
      },

      async getArticleList() { //获取作者文章列表
        this.page.userId = this.router
        await this.$axios({
          url: '/api/article/findarticlebyuser',
          method: "get",
          params: this.page
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.articleList = res.data.data.data;
            this.total = res.data.data.total
          }
        })
      },
      async focus() { //关注作者
        if(!!cookie.get('_auth') === false) {
          this.$Message.success('请先登录');
          return
        }
        await this.$axios({
          url: '/api/user/follow',
          method: "post",
          params: {
            followIds: this.router
          }
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.$Message.success('关注成功');
            this.obtain(); // 重新加载页面信息
            this.getArticleList();
          }
        })
      },

      getimgs(id){//获取图片
        return `${process.env.imgUrl}/api/image/display/${id}`
      },

      pageChange(page) { //分页操作
        this.page.page = page;
        this.getArticleList();
      },

      // 分享
      qZone(){ //QQ
        var p = {
          url: document.location,
          desc: '这篇文章不错,分享一下~~',/*默认分享理由(可选)*/
          summary: document.title,/*分享摘要(可选)*/
          title: document.title,/*分享标题(可选)*/
          site: '火鸟财经链',/*分享来源 如：腾讯网(可选)summary*/
        };
        var s = [];
        for (var i in p) {
          s.push(i + '=' + encodeURIComponent(p[i] || ''));
        }
        var target_url = "https://connect.qq.com/widget/shareqq/index.html?" + s.join('&');
        window.open(target_url, 'qZone');
      },

      sinaWeiBo(){ //微博
        var param = {
          url: document.location,
          title: document.title, /** 分享的文字内容(可选，默认为所在页面的title)*/
          rnd: new Date().valueOf()
        }
        var temp = [];
        for( var p in param ){
          temp.push(p + '=' +encodeURIComponent( param[p ] || '' ) )
        }
        var target_url = "http://service.weibo.com/share/share.php?" + temp.join('&');
        window.open(target_url, 'sinaweibo');
      },

      //微信
      weixin() { //生成分享二维码
        let qrcode = new QRCode(document.getElementById("qrcode"), {
          width: 90,  // 设置宽度
          height: 90, // 设置高度
          text: document.location.href, //二维码内容
        })
      },
    }
  };
</script>

<style scoped lang="">
  .control {
    height: 360px;
    width: 1170px;
    margin: 0 auto;
    padding: 0 15px;
    position: relative;
  }
  .control .share {
    float: right;
    margin-top: 23px;
    position: absolute;
    top: 40px;
    right: 0;
  }
  .control .share a {
    padding-left: 26px;
    display: block;
    color: #999;
    float: left;
    background: url(/static/imgs/share.svg) 0 3px
    no-repeat;
  }
  .control .share .shares-pop {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    bottom: -91px;
    left: -151px;
  }
  .control .share .shares-pop {
    padding: 12px 18px;
    width: 190px;
    left: -120px;
    top: 45px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    display: block;
    background: #fff;
    position: absolute;
    z-index: 9;
  }
  .control .share .shares-pop a {
    width: 30px;
    height: 40px;
    padding: 6px;
    float: left;
    display: block;
  }
  .control .share a {
    padding-left: 26px;
    display: block;
    color: #999;
    float: left;
    background: url(/static/imgs/share.svg) 0 3px
    no-repeat;
  }

  .social-share .icon-qq {
    background: url(/static/imgs/qq-icon.svg) 6px 6px
    no-repeat !important;
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
  .control .share .shares-pop a + a {
    margin-left: 20px;
  }
  .social-share .icon-weibo {
    background: url(/static/imgs/weibo-icon.svg) 6px
    6px no-repeat !important;
  }
  .social-share .icon-wechat {
    position: relative;
    background: url(/static/imgs/weixin-icon.svg) 6px
    6px no-repeat !important;
  }
  /*微信扫码*/
  .control .share .shares-pop .wechat-qrcode {
    display: none;
    width: 200px;
    background: #fff;
    position: absolute;
    top: 50px;
    left: 50px;
  }
  .control .share .shares-pop .wechat-qrcode h4 {
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    text-align: center;
    background-color: #f3f3f3
  }
  .control .share .shares-pop .wechat-qrcode .help p{
    text-align: center;
    font-size: 12px;
  }
  .social-share .icon-wechat:hover +.wechat-qrcode{
    display: block;
  }
  .control .avatar {
    padding-top: 40px;
    text-align: center;
    margin-bottom: 20px;
  }
  .control .avatar img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
  }
  .control .name {
    text-align: center;
    font-weight: bold;
    color: #fff;
    margin-bottom: 12px;
  }
  .control .name ol {
    position: relative;
    display: inline-block;
  }
  .control .brief {
    text-align: center;
    color: #fff;
    font-weight: 300;
    height: 46px;
  }
  .control .bed {
    text-align: center;
    margin-bottom: 20px;
  }
  .control .data {
    height: 46px;
    text-align: center;
  }
  .control .data ul {
    display: inline-block;
    margin: 0 auto;
    color: #fff;
  }
  .control .data ul li {
    width: 90px;
    height: 44px;
    display: inline-block;
    font-size: 18px;
  }
  .control .data ul li + li {
    border-left: rgba(251, 251, 251, 0.2) 1px solid;
  }
  .control .data ul span {
    display: block;
    opacity: 0.5;
    font-size: 14px;
  }
  .author-brands {
    height: 360px;
    background: url('/static/imgs/im006.png') center
    center no-repeat;
    background-size: 100% 360px;
  }
  .control .bed a {
    color: #fff;
    width: 68px;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    display: inline-block;
    margin: 0 auto;
    background: #000;
  }
  .control .name span {
    position: absolute;
    top: 2px;
    right: -90px;
  }
  /* 文章 */
  .js-main {
    padding: 0 15px;
    margin-bottom: 50px;
    margin-top: 30px;
    width: calc(100% - 15px*2);
    min-height: 550px;
  }
  .js-main .js-home-main {
    margin: 0 auto;
    width: 1170px;
  }
  .js-home-carousel-tc {
    margin: 0 auto;
    width: 770px;
  }
  .ja-article-list {
    margin-top: 30px;
  }
  .ja-article-list .article-main {
    margin-bottom: 50px;
  }
  .ja-article-list .article-main ol {
    margin-bottom: 15px;
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
    -webkit-transition: -webkit-transform .15s ease-in;
    transition: -webkit-transform .15s ease-in;
    transition: transform .15s ease-in;
    transition: transform .15s ease-in,-webkit-transform .15s ease-in;
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
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .ja-article-list .article-main ol ul li {
    line-height: 22px;
    color: #666;
  }
  .ja-article-list .article-main ol ul .article-info {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
  .ja-article-list .article-main ol ul li + li {
    margin-top: 12px;
  }
  .ja-article-list .article-main ol ul li span, .ja-article-list .article-main ol ul li img {
    color: #999;
    display: inline-block;
  }
  .article-info .js-article-num {
    padding-top: 1px;
    padding-left: 5px;
  }
  .ja-article-list .article-main ol ul li .amount {
    margin: 5px 2px 0 0;
  }
  a {
    color: #333;
    text-decoration: none;
  }
  /*分页*/
  .article_page {
    text-align: right;
    margin: 30px 0;
  }

  /*暂无*/
  .list_null {
    text-align: center;
    padding: 100px 0;
    height: 40px;
  }

</style>
