<template>
    <div class="homepage clearfix">
      <!--<div class="red" v-if="unreadMessageTotal"></div> &lt;!&ndash;消息未读&ndash;&gt;-->
      <div class="menuTree">
        <!--头像-->
        <img :src="userData.userHeader? getimgs(userData.userHeader)  :'//resource.jinse.com/www/v2/img/avatar.png'" alt="未上传头像">
        <!--菜单-->
        <ul>
          <li v-for="(item,index) in menuList" :key="index" :class="{'active':router === item.url}">
            <nuxt-link :to=item.url>
              <Icon :type=item.icon />
              <span v-html="item.menuName"></span>
              <i class="red" v-if="unreadMessageTotal && item.menuName === '我的消息'"></i> <!--消息未读-->
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="router_con">
        <nuxt-child/>
      </div>
    </div>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        menuList: [
          {
            menuName: '我的文章',
            icon: 'ios-document-outline',
            url: '/users/user/myArticle',
          },
          {
            menuName: '我的活动',
            icon: 'ios-albums-outline',
            url: '/users/user/myActivity',
          },
          {
            menuName: '我的消息',
            icon: 'ios-notifications-outline',
            url: '/users/user/myMessage',
          },
          {
            menuName: '个人中心',
            icon: 'md-person',
            url: '/users/user',
          },
          {
            menuName: '收 &nbsp;&nbsp;&nbsp;&nbsp; 藏',
            icon: 'md-star-outline',
            url: '/users/user/myCollection',
          },
          {
            menuName: '我的关注',
            icon: 'ios-people-outline',
            url: '/users/user/myFocus',
          },
          {
            menuName: '我的钱包',
            icon: 'logo-usd',
            url: '/users/user/myWallet',
          }
        ],
        userData: {}, //基础信息初始
        unreadMessageTotal: false, //判断是否有未读
        setIntervalMsg: null, //计时器
      }
    },
    computed: {
      router() {
        var routerUrl = '';
        if(this.$route.path === '/users/user/security' || this.$route.path === '/users/user/realName') {
          routerUrl = '/users/user'
        }else {
          routerUrl = this.$route.path;
        }
        return routerUrl;
      }
    },
    created() {
      this.obtain(); //初始运行获取函数
      this.getNotread()
      this.continuous()
    },
    beforeDestroy() { //销毁组件前 清除计时器
      clearInterval(this.setIntervalMsg)
    },
    methods: {
      async obtain() { //获取登陆用户资料
        await this.$axios.$post('/api/user/query_active_user').then(res=>{
          if(res.errorCode === 0){
            this.userData = res.data;
          }
        })
      },
      async getNotread() { //获取未读消息数
        await this.$axios.$post('/api/user/user_unread_message_total').then(res=>{
          if(res.data !== 0) {
            this.unreadMessageTotal = true;
          }
        })
      },
      continuous() { //持续获取
        this.setIntervalMsg = setInterval(()=>{
          this.$forceUpdate();
          this.getNotread();
        },3000)
      },

      getimgs(id){//获取图片
        return `${process.env.imgUrl}/api/image/display/${id}`
      },

    }
  }
</script>

<style scoped>

  .homepage {
    width: 1200px;
    margin: 0 auto 30px;
    position: relative;
  }
  .menuTree {
    width: 260px;
    height: 100%;
    margin-right: 20px;
    background: #fff;
    position: absolute;
    text-align: center;
  }
  .menuTree img {
    margin: 61px 0 51px;
    width: 100px;
    height: 100px;
    background-size: 100px 100px;
    border-radius: 50%;
  }
  .menuTree ul li {
    width: 260px;
    height: 50px;
  }
  .menuTree ul li.active,
  .menuTree ul li:hover {
    width: 262px;
    background: #f7f8fa;
    margin-left: -2px;
    border-left: 2px solid #ff3c00;
    font-weight: bold;
  }
  .menuTree ul li:hover a span {
    color: #ff3c00;
  }
  .menuTree ul li a {
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 50px;
    font-size: 16px;
    color: #555;
    position: relative;
  }
  .menuTree ul li a i {
    border: 1px solid #ccc;
    border-radius: 50%;
    font-size: 16px;
    padding: 3px;
    margin-right: 6px;
  }
  /*未读*/
  .menuTree ul li a .red {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #f00;
    border-radius: 50%;
    position: absolute;
    top: 30%;
    right: 25%;
  }
  .router_con {
    float: right;
    min-height: 800px;
    background: #fff;
    width: 920px;
    padding: 0 40px;
  }
</style>
