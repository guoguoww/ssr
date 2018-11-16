<template>
    <div>
      <!--头部-->
      <div class="focus_header">
        <h4>
          我的关注
        </h4>
      </div>
      <div class="focus_list_header clearfix">
        <p class="author fl">关注作者</p>
        <p class="introduction fl">简介</p>
        <p class="operation fl">操作</p>
      </div>
      <ul class="focus_list" v-if="focusList.length !== 0">
        <li class="focus_item" v-for="(item,i) in focusList" :key="i">
          <nuxt-link class="router_author fl" :to="'/member/'+item.id">
            <img :src="item.userHeader ? getimgs(item.userHeader) : ''" :alt="item.nickName">
            <span>{{item.nickName}}</span>
          </nuxt-link>
          <p class="introductionCon fl">{{item.introduction}}</p>
          <a class="cancelBtn fl" href="javascript:void (0);" v-show="!item.focus" @click="cancelFocus(item,i)">取消关注</a>
          <a class="cancelBtn fl" href="javascript:void (0);" v-show="item.focus" @click="focus(item,i)">关注</a>
        </li>
      </ul>

      <p class="list_null" v-if="focusList.length === 0">暂无关注...</p>

      <!--分页器-->
      <div class="focus_page" v-if="focusList.length !== 0">
        <Page :total="total" :page-size="page.rows" show-elevator @on-change="pageChange" />
      </div>

    </div>
</template>

<script>
  export default {
    name: "myFocus",
    data() {
      return {
        focusList: [], //关注列表
        total: 0, //总条数
        page: {
          start: 0, //第几页
          rows: 10, //每页N条
        }
      }
    },
    created() {
      this.obtain(); //初始运行获取函数
    },
    methods: {
      async obtain() { //获取关注列表
        await this.$axios({
          url: '/api/user/query_user_follow',
          method: "post",
          params: this.page
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.focusList = res.data.data.data;
            this.total = res.data.data.total;
            this.focusList.forEach(function (item) {
              item.focus = false;
            })
          }
        })
      },
      getimgs(id){//获取图片
        return `${process.env.imgUrl}/api/image/display/${id}`
      },

      async cancelFocus(item,i) { //取消关注
        await this.$axios({
          url: '/api/user/abolish_follow',
          method: "post",
          params: {
            abolishFollowIds: item.id
          }
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.$forceUpdate();
            this.$Message.success('取消成功');
            this.focusList[i].focus = true;
          }
        })
      },

      async focus(item,i) { //关注作者
        await this.$axios({
          url: '/api/user/follow',
          method: "post",
          params: {
            followIds: item.id
          }
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.$forceUpdate();
            this.$Message.success('关注成功');
            this.focusList[i].focus = false;
          }
        })
      },

      pageChange(page) { //分页操作
        this.page.start = this.page.rows * (page-1);
        this.obtain(this.focusList);
      }
    }
  }
</script>

<style scoped>
  /*头部*/
  .focus_header {
    padding: 45px 0 20px;
    border-bottom: 1px solid #e0e0e0;
  }
  .focus_header h4 {
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }
  /*表头*/
  .focus_list_header {
    border-top: 1px solid #E1E1E1;
    background: #f9f9f9;
    height: 45px;
    line-height: 45px;
  }
  .focus_header p {
    focus_list_header: 14px;
    color: #333;
  }
  .focus_list_header .author {
    width: 221px;
    box-sizing: border-box;
    padding-left: 50px;
  }
  .focus_list_header .introduction {
    width: 530px;
    clear: unset;
    padding-bottom: 0;
  }
  .focus_list_header .operation {
    box-sizing: border-box;
    padding-left: 20px;
  }
  /*关注列表*/
  .focus_list {
    min-height: 600px;
    padding-top: 7px;
  }
  .focus_list .focus_item {
    height: 60px;
    border-bottom: 1px solid #e1e1e1;
  }
  .focus_list .focus_item .router_author {
    position: relative;
    height: 100%;
    line-height: 60px;
    width: 221px;
  }
  .focus_list .focus_item .router_author img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    display: inline-block;
    position: absolute;
    top: 10px;
  }
  .focus_list .focus_item .router_author span {
    padding-left: 50px;
    box-sizing: border-box;
    width: 220px;
    display: inline-block;
    font-size: 14px;
    color: #333;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .focus_list .focus_item .introductionCon {
    display: inline-block;
    width: 463px;
    height: 100%;
    line-height: 60px;
    font-size: 14px;
    color: #333;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .focus_list .focus_item .cancelBtn {
    margin: 15px 0px 15px 60px;
    border: 1px solid #888;
    border-radius: 30px;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #888;
  }
  /*分页*/
  .focus_page {
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
