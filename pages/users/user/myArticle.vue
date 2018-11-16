<template>
    <div>
      <!--头部-->
      <div class="article_header clearfix">
        <h4 class="fl">
          我的文章
        </h4>
        <nuxt-link class="fr" v-if="userData.authStatus === 2" :to="'/users/user/publish/' + 0">
          + 发布文章
        </nuxt-link>
        <nuxt-link class="fr" v-if="userData.authStatus === 0" to="/users/user/realName">
          + 发布文章
        </nuxt-link>
        <a href="javascript:void (0);" v-if="userData.authStatus === 1 || userData.authStatus === 3" @click="notPublished(userData.authStatus)">+ 发表文章</a>
      </div>
      <!--筛选状态-->
      <ul class="article_stats clearfix">
        <li class="fl" v-for="(item,i) in articleStats" :key="i" :class="{'active':defaultStats === item.val}" @click="switchStats(item.val)" >{{item.statsName}}</li>
      </ul>
      <!--文章列表-->
      <ul class="article_list" v-if="articleList.length !== 0">
        <li class="article_item clearfix" v-for="(item,i) in articleList" :key="i">
          <div class="article_item_left fl">
            <!--状态为1 进入草稿-->
            <nuxt-link :to="'/users/user/publish/' + item.articleId " v-if="item.status == 1">
              <img :src="item.image ? getimgs(item.image) : ''" :alt="item.title">
            </nuxt-link>
            <!--状态为2 进入文章详情-->
            <nuxt-link :to="'/article/'+ item.articleId" v-if="item.status == 2">
              <img :src="item.image ? getimgs(item.image) : ''" :alt="item.title">
            </nuxt-link>
            <!--状态为0或3 无法跳转-->
            <a href="javascript:void (0);" v-if="item.status == 0 || item.status == 3">
              <img :src="item.image ? getimgs(item.image) : ''" :alt="item.title">
            </a>
          </div>
          <div class="article_item_right fr">
            <h4>
              <!--状态为1 进入草稿-->
              <nuxt-link :to="'/users/user/publish/' + item.articleId " v-if="item.status == 1">
                {{item.title}}
              </nuxt-link>
              <!--状态为2 进入文章详情-->
              <nuxt-link :to="'/article/'+ item.articleId" v-if="item.status == 2">
                {{item.title}}
              </nuxt-link>
              <!--状态为0或3 无法跳转-->
              <p v-if="item.status == 0 || item.status == 3">{{item.title}}</p>
            </h4>
            <p class="article_item_instructions">
              {{item.introduction}}
            </p>
            <div class="article_item_operation">
              <p class="article_item_date fl">{{item.createTime}} 发布</p>
              <p class="fl">浏览量：{{!!item.readNo ? item.readNo : 0}}</p>
              <p class="fr">{{item.status == 0 ?'审核中': (item.status == 1? '草稿': (item.status == 2 ? '已通过': '未通过'))}}</p>
            </div>
          </div>
        </li>
      </ul>
      <!--分页器-->
      <div class="article_page" v-if="articleList.length !== 0">
        <Page :total="total" :page-size="page.rows" show-elevator @on-change="pageChange"  />
      </div>

      <p class="list_null" v-if="articleList.length === 0">还没发表文章，现在去发表吧！</p>
    </div>
</template>

<script>
  export default {
    name: "myArticle",
    data() {
      return {
        userData: {}, //用于判断是否可以发表文章
        articleStats: [
          {
            statsName: '全部',
            val: null,
          },
          {
            statsName: '审核中',
            val: 0,
          },
          {
            statsName: '已通过',
            val: 2,
          },
          {
            statsName: '未通过',
            val: 3,
          },{
            statsName: '草稿',
            val: 1,
          }
        ],
        articleList: [],
        total: 0, //总条数
        page: {
          page: 1, //第几页
          rows: 5, //每页N条
          status: null, //文章状态
        },
        defaultStats: null
      }
    },
    created() {
      this.obtain(); //初始运行获取函数
      this.obtainUserData() //获取登录用户资料
    },
    methods: {
      switchStats(i) { //切换状态
        this.defaultStats = i;
        this.page.page = 1;//第几页
        this.page.rows = 5; //每页N条
        this.status = null; //文章状态
        this.obtain();
      },
      async obtainUserData() { //获取登陆用户资料
        await this.$axios.$post('/api/user/query_active_user').then(res=>{
          if(res.errorCode === 0){
            this.userData = res.data
          }
        })
      },
      notPublished(stats) { //不能发表文章
        if(stats === 1) {
          this.$Message.warning('请等待认证通过再发表文章');
          return
        }
        if(stats === 3) {
          this.$Message.error('认证未通过 请重新认证');
          this.$router.push({ //跳转到认证页面
            path: "/users/user/realName"
          });
        }
      },
      async obtain() { //获取文章列表
        this.page.status = this.defaultStats
        await this.$axios({
          url: '/api/article/queryarticle',
          method: "post",
          params: this.page
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.articleList = res.data.data.data;
            this.total = res.data.data.total;
            // if(this.articleList.length > 0) {
            //   var that = this
            //   this.articleList.forEach(function (item) {//获取文章海报
            //     that.obtainImg(item)
            //   })
            // }
          }
        })
      },
      getimgs(id){//获取图片
        return `${process.env.imgUrl}/api/image/display/${id}`
      },
      // async obtainImg(item) {
      //   await this.$axios.$get('/api/image/' + item.image).then(res=>{
      //     item.image = res
      //   })
      // },
      pageChange(page) { //分页操作
        this.page.page = page;
        this.obtain();
      }
    }
  }
</script>

<style scoped>
  /*头部*/
  .article_header {
    padding: 45px 0 20px;
    border-bottom: 1px solid #e0e0e0;
  }
  .article_header h4 {
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }
  .article_header a {
    font-size: 16px;
    color: #FA322B;
  }
  /*状态筛选*/
  .article_stats {
    margin-top: 10px;
    height: 40px;
    border-bottom: 1px solid #e0e0e0;
  }
  .article_stats li {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 16px;
    cursor: pointer;
    padding: 0 40px;
  }
  .article_stats li:hover {
    color: #FA322B;
    border-bottom: 1px solid #FA322B;
  }
  .article_stats .active {
    color: #FA322B;
    border-bottom: 1px solid #FA322B;
  }

  /*文章列表*/
  .article_list {
    min-height: 600px;
  }
  .article_list .article_item {
    padding: 21px 0px;
  }
  .article_list .article_item .article_item_left a img {
    border-radius: 0px;
    width: 181px;
    height: 111px;
  }
  .article_list .article_item .article_item_right {
    width: 635px;
    height: 111px;
  }
  .article_list .article_item .article_item_right h4 {
    margin: -4px 0 8px 0;
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .article_list .article_item .article_item_right h4 p {
    color: #000;
  }
  .article_list .article_item .article_item_right h4 a {
    color: #000;
  }
  .article_list .article_item .article_item_right h4 a:hover {
    color: #4C90F5;
  }
  .article_list .article_item .article_item_right .article_item_instructions {
    width: 450px;
    margin: 15px 0;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .article_list .article_item .article_item_right .article_item_operation p:not(:last-child) {
    margin-right: 160px;
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
    cursor: pointer;
  }
</style>
