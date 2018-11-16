<template>
    <div>
      <!--头部-->
      <div class="collection_header">
        <h4>
          我的收藏
        </h4>
      </div>
       <ul class="collection_list" v-if="collectionList.length !== 0">
         <li class="collection_item clearfix" v-for="(item,i) in collectionList" :key="i">
          <div class="collection_item_left fl">
            <nuxt-link :to="'/article/'+ item.articleId">
              <img :src="item.image ? getimgs(item.image) : ''" :alt="item.title">
            </nuxt-link>
          </div>
           <div class="collection_item_right fr">
             <h4>
               <nuxt-link :to="'/article/'+ item.articleId">
                 {{item.title}}
               </nuxt-link>
             </h4>
             <p class="collection_item_time">
               <span>{{item.nickName}}</span>
             </p>
             <div class="collection_item_operation">
               <p class="collection_item_date fl">{{item.collectTime}} 收藏</p>
               <a class="cancelBtn fr" href="javascript:void (0);" v-if="!item.collection" @click="cancelCollection(item,i)">取消收藏</a>
               <a class="cancelBtn fr" href="javascript:void (0);" v-if="item.collection" @click="collection(item,i)">收藏</a>
             </div>
           </div>
         </li>
         <!--<li class="collection_item clearfix">-->
           <!--<div class="collection_item_left fl">-->
             <!--<nuxt-link to="/article/article-details">-->
               <!--<img src="https://img.jinse.com/1038743_image1.png" alt="全国首张区块链电子发票亮相深圳 微信一键开票好在哪儿？">-->
             <!--</nuxt-link>-->
           <!--</div>-->
           <!--<div class="collection_item_right fr">-->
             <!--<h4>-->
               <!--<nuxt-link to="/article/article-details">-->
                 <!--全国首张区块链电子发票亮相深圳 微信一键开票好在哪儿？-->
               <!--</nuxt-link>-->
             <!--</h4>-->
             <!--<p class="collection_item_time">-->
               <!--<span>亮如</span>-->
               <!--<span>55分钟前</span>-->
             <!--</p>-->
             <!--<div class="collection_item_operation">-->
               <!--<p class="collection_item_date fl">2018.-08-10 收藏</p>-->
               <!--<a class="cancelBtn fr" href="javascript:void (0);">取消收藏</a>-->
             <!--</div>-->
           <!--</div>-->
         <!--</li>-->
         <!--<li class="collection_item clearfix">-->
           <!--<div class="collection_item_left fl">-->
             <!--<nuxt-link to="/article/article-details">-->
               <!--<img src="https://img.jinse.com/1038743_image1.png" alt="全国首张区块链电子发票亮相深圳 微信一键开票好在哪儿？">-->
             <!--</nuxt-link>-->
           <!--</div>-->
           <!--<div class="collection_item_right fr">-->
             <!--<h4>-->
               <!--<nuxt-link to="/article/article-details">-->
                 <!--全国首张区块链电子发票亮相深圳 微信一键开票好在哪儿？-->
               <!--</nuxt-link>-->
             <!--</h4>-->
             <!--<p class="collection_item_time">-->
               <!--<span>亮如</span>-->
               <!--<span>55分钟前</span>-->
             <!--</p>-->
             <!--<div class="collection_item_operation">-->
               <!--<p class="collection_item_date fl">2018.-08-10 收藏</p>-->
               <!--<a class="cancelBtn fr" href="javascript:void (0);">取消收藏</a>-->
             <!--</div>-->
           <!--</div>-->
         <!--</li>-->
         <!--<li class="collection_item clearfix">-->
           <!--<div class="collection_item_left fl">-->
             <!--<nuxt-link to="/article/article-details">-->
               <!--<img src="https://img.jinse.com/1038743_image1.png" alt="全国首张区块链电子发票亮相深圳 微信一键开票好在哪儿？">-->
             <!--</nuxt-link>-->
           <!--</div>-->
           <!--<div class="collection_item_right fr">-->
             <!--<h4>-->
               <!--<nuxt-link to="/article/article-details">-->
                 <!--全国首张区块链电子发票亮相深圳 微信一键开票好在哪儿？-->
               <!--</nuxt-link>-->
             <!--</h4>-->
             <!--<p class="collection_item_time">-->
               <!--<span>亮如</span>-->
               <!--<span>55分钟前</span>-->
             <!--</p>-->
             <!--<div class="collection_item_operation">-->
               <!--<p class="collection_item_date fl">2018.-08-10 收藏</p>-->
               <!--<a class="cancelBtn fr" href="javascript:void (0);">取消收藏</a>-->
             <!--</div>-->
           <!--</div>-->
         <!--</li>-->
         <!--<li class="collection_item clearfix">-->
           <!--<div class="collection_item_left fl">-->
             <!--<nuxt-link to="/article/article-details">-->
               <!--<img src="https://img.jinse.com/1038743_image1.png" alt="全国首张区块链电子发票亮相深圳 微信一键开票好在哪儿？">-->
             <!--</nuxt-link>-->
           <!--</div>-->
           <!--<div class="collection_item_right fr">-->
             <!--<h4>-->
               <!--<nuxt-link to="/article/article-details">-->
                 <!--全国首张区块链电子发票亮相深圳 微信一键开票好在哪儿？-->
               <!--</nuxt-link>-->
             <!--</h4>-->
             <!--<p class="collection_item_time">-->
               <!--<span>亮如</span>-->
               <!--<span>55分钟前</span>-->
             <!--</p>-->
             <!--<div class="collection_item_operation">-->
               <!--<p class="collection_item_date fl">2018.-08-10 收藏</p>-->
               <!--<a class="cancelBtn fr" href="javascript:void (0);">取消收藏</a>-->
             <!--</div>-->
           <!--</div>-->
         <!--</li>-->
       </ul>
      <p class="list_null" v-if="collectionList.length === 0">暂无收藏...</p>
      <!--分页器-->
      <div class="collection_page" v-if="collectionList.length !== 0">
        <Page :total="total" :page-size="page.rows" show-elevator @on-change="pageChange" />
      </div>
    </div>
</template>

<script>
  export default {
    name: "myCollection",
    data() {
      return {
        collectionList: [], //关注列表
        total: 0, //总条数
        page: {
          page: 1,
          rows: 5
        }
      }
    },
    created() {
      this.obtain(); //初始运行获取函数
    },
    methods: {
      async obtain() { //获取收藏列表
        await this.$axios({
          url: "/api/article/mycollect",
          method: "get",
          params: this.page,
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.collectionList = res.data.data.data;
            this.total = res.data.data.total;
            this.collectionList.forEach(function (item) {
              item.collection = false;
            })
          }
        })
      },
      // async obtainImg(item) { //获取文章海报
      //   await this.$axios.$get('/api/image/' + item.image).then(res=>{
      //     item.image = res
      //   })
      // },
      getimgs(id){//获取图片
        return `${process.env.imgUrl}/api/image/display/${id}`
      },
      async cancelCollection(item,i) { //取消收藏
        await this.$axios({
          url: '/api/article/delcollect',
          method: "get",
          params: {
            articleId: item.articleId
          }
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.$forceUpdate();
            this.$Message.success('取消成功');
            this.collectionList[i].collection = true;
          }
        })
      },
      async collection(item,i) { //收藏
        await this.$axios({
          url: '/api/article/collect',
          method: "get",
          params: {
            articleId: item.articleId
          }
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.$forceUpdate();
            this.$Message.success('收藏成功');
            this.collectionList[i].collection = false;
          }
        })
      },
      pageChange(page) { //分页操作
        this.page.page = page;
        this.obtain();
      }
    }
  }
</script>

<style scoped>
  /*头部*/
  .collection_header {
    padding: 45px 0 20px;
    border-bottom: 1px solid #e0e0e0;
  }
  .collection_header h4 {
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }
  .collection_list {
    min-height: 600px;
  }
  .collection_list .collection_item {
    padding: 21px 0px;
  }
  .collection_list .collection_item .collection_item_left a img {
    border-radius: 0px;
    width: 181px;
    height: 111px;
  }
  .collection_list .collection_item .collection_item_right {
    width: 635px;
    height: 111px;
  }
  .collection_list .collection_item .collection_item_right h4 {
    margin: -4px 0 8px 0;
    line-height: 30px;
    font-size: 20px;
    font-weight: bold;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .collection_list .collection_item .collection_item_right h4 a {
    color: #000;
  }
  .collection_list .collection_item .collection_item_right h4 a:hover {
    color: #4C90F5;
  }
  .collection_list .collection_item .collection_item_right .collection_item_time {
    margin: 30px 0 15px;
  }
  .collection_list .collection_item .collection_item_right .collection_item_time span {
    margin-right: 15px;
  }
  .collection_list .collection_item .collection_item_right .collection_item_operation {
    cursor: pointer;
  }
  .collection_list .collection_item .collection_item_right .collection_item_operation p:hover {
    color: #4C90F5;
  }
  /*分页*/
  .collection_page {
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
