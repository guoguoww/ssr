<template>
  <div>
    <div class="custom-head-div" style="height: 76px;margin-bottom: 30px;"></div>
    <header>
      <div class="main">
        <div class="fl logo">
          <nuxt-link to="/"></nuxt-link>
        </div>
        <nav class="fl" v-show="!searchisshow">
          <ul class="nav" >
            
            <li class="fl" v-for="(i,index) in nav" :key="index">
              <nuxt-link :class="{'active':i.router==$route.path}" :to="i.router">{{i.name}}</nuxt-link>
            </li>
          </ul>
        </nav>
        <div class="fr login_user">
          <div class="headPortrait fr">
            <nuxt-link to="/login/login" title="请登录" v-if="loginState === false">
              <img src="~/static/imgs/head.svg">
            </nuxt-link>
            <a href="javascript:;" v-if="loginState">
              <img :src="userData.userHeader? getimgs(userData.userHeader)  :'//resource.jinse.com/www/v2/img/avatar.png'" alt="未上传头像">
            </a>
            <div class="loginState1" v-if="loginState">
              <p>
                <nuxt-link to="/users/user">{{userData.nickName}}</nuxt-link>
              </p>
              <p>
                <nuxt-link to="/users/user/myArticle">我的文章</nuxt-link>
              </p>
              <p>
                <nuxt-link to="/users/user/myMessage">我的消息</nuxt-link>
              </p>
              <p>
                <a href="javascript:void (0);" @click="logout()" >退出登录</a>
              </p>
            </div>
          </div>
          <ul class="fr">
            <li class="fl search"  >
              <a href="javascript:;" title="搜索一下" @click="searchtab">
                <img src="~/static/imgs/search.svg">
              </a>
              <div class="search-pop" style="" v-if="searchisshow">
                <div class="search-icon">
                  <svg width="14px" height="16px" viewBox="0 0 14 16">
                    <path fill="#999" d="M11.7309509,11.8401477 L13.5145332,13.62373 L13.5145332,13.62373 C13.8454664,13.9546632 13.8454664,14.4912119 13.5145332,14.822145 C13.1836,15.1530782 12.6470514,15.1530782 12.3161182,14.822145 L10.4685612,12.9745881 C9.39595324,13.7158396 8.09487249,14.15 6.69238816,14.15 C3.01969457,14.15 0.0423881554,11.1726936 0.0423881554,7.5 C0.0423881554,3.82730641 3.01969457,0.85 6.69238816,0.85 C10.3650817,0.85 13.3423882,3.82730641 13.3423882,7.5 C13.3423882,9.15859097 12.7351868,10.6753625 11.7309509,11.8401477 Z M6.69238816,12.85 C9.64711157,12.85 12.0423882,10.4547234 12.0423882,7.5 C12.0423882,4.54527659 9.64711157,2.15 6.69238816,2.15 C3.73766474,2.15 1.34238816,4.54527659 1.34238816,7.5 C1.34238816,10.4547234 3.73766474,12.85 6.69238816,12.85 Z" fill-rule="nonzero"></path>
                  </svg>
                </div> <input autocomplete="off" name="search" type="text" placeholder="搜索" maxlength="50" v-focus @keyup.enter='search' v-model="keywords">
                <a href="javascript:;" title="搜索" @click="searchisshow=false">
                  <svg width="11px" height="11px">
                    <path fill="#999" d="M5.78319985,4.15182899 L1.96482325,0.333452386 L1.96482325,0.333452386 C1.65240382,0.0210329483 1.14587182,0.0210329483 0.833452386,0.333452386 L0.833452386,0.333452386 L0.833452386,0.333452386 C0.521032948,0.645871824 0.521032948,1.15240382 0.833452386,1.46482325 L4.65182899,5.28319985 L0.833452386,9.10157646 L0.833452386,9.10157646 C0.521032948,9.41399589 0.521032948,9.92052788 0.833452386,10.2329473 L0.833452386,10.2329473 C1.14587182,10.5453668 1.65240382,10.5453668 1.96482325,10.2329473 L5.78319985,6.41457072 L9.60157646,10.2329473 C9.91399589,10.5453668 10.4205279,10.5453668 10.7329473,10.2329473 L10.7329473,10.2329473 C11.0453668,9.92052788 11.0453668,9.41399589 10.7329473,9.10157646 L10.7329473,9.10157646 L6.91457072,5.28319985 L10.7329473,1.46482325 C11.0453668,1.15240382 11.0453668,0.645871824 10.7329473,0.333452386 L10.7329473,0.333452386 L10.7329473,0.333452386 C10.4205279,0.0210329483 9.91399589,0.0210329483 9.60157646,0.333452386 L9.60157646,0.333452386 L5.78319985,4.15182899 Z"></path>
                  </svg>
                </a>
              </div>
            </li>
            <li class="fl">
              <a href="javascript:;" title="扫描二维码即刻下载火鸟App">
                <!--<Icon type="ios-tablet-portrait" />-->
                <img src="~/static/imgs/phone.svg">
                <span>APP</span>
              </a>
              <div class="appDownload">
                <img src="../assets/publcImg/download_app_qr.png" alt="">
                <i>Android & iPhone</i>
              </div>
            </li>
            <li class="fl">
              <a href="javascript:;" title="投稿">
                <img src="~/static/imgs/contribute.svg">
                <span>投稿</span>
              </a>
              <div class="contribute">
                <p>
                  <nuxt-link to="/login/login" v-if="loginState === false">文章</nuxt-link>
                  <nuxt-link v-if="loginState && userData.authStatus === 0" to="/users/user/realName">
                    文章
                  </nuxt-link>
                  <nuxt-link v-if="loginState && userData.authStatus === 2" :to="'/users/user/publish/' + 0">
                    文章
                  </nuxt-link>
                  <a href="javascript:void (0);" v-if="loginState & (userData.authStatus === 1 || userData.authStatus === 3)" @click="notPublished(userData.authStatus)">文章</a>
                </p>
                <p>
                  <nuxt-link to="/login/login" v-if="loginState === false">活动</nuxt-link>
                  <nuxt-link to="/users/user/myActivity" v-if="loginState">活动</nuxt-link>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  import cookie from '~/assets/cookie.js'
  export default {
    name: "publicHead",
    data () {
      return {
        searchisshow:false,//搜索显示状态
        nav:[
            {name:'首页',router:'/'},
            {name:'快讯',router:'/lives'},
            // {name:'数据',router:'/data'},
            {name:'行情',router:'/market'},
            // {name:'活动',router:'/404'},
            {name:'导航',router:'/nav'},
            ],//导航
        keywords:'',//搜索关键词
        loginState: false, //登录状态
        userData: {}, //基础信息初始
      }
    },
    created () {
      if (typeof window !== 'undefined'){
        if(!!cookie.get('_auth')) {
          this.obtain(); //初始运行获取函数
        }
      }
    },
    mounted() {
      if (typeof window !== 'undefined'){
        if(!!cookie.get('_auth')) {
          this.loginState = true;
        }
      }
    },
    watch:{
      $route(){
        if(!!cookie.get('_auth')) {
          this.loginState = true;
          this.obtain(); //初始运行获取函数
        }else {
          this.loginState = false;
        }
      },
    },
    methods: {
      async obtain() { //获取登陆用户资料
        if(!!cookie.get('_auth')) {
          await this.$axios.$post('/api/user/query_active_user').then(res=>{
            if(res.errorCode === 0){
              this.userData = res.data
            }
            if(res.errorCode === -2) {
              cookie.clear();//清除cookie
              this.loginState = false;
            }
          })
        }
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
      getimgs(id){//获取图片
        if(!!cookie.get('_auth')) {
          return `${process.env.imgUrl}/api/image/display/${id}`
        }
      },

      searchtab(){//搜索显示
        if (this.searchisshow) {//如果搜索框已显示
          this.search()
        }else{
          this.searchisshow = true
        }
      },
      search(){//搜索
        this.$router.push({path:`/search/${this.keywords}`})
        
      },
      logout(){//退出登录
        cookie.clear();//清除cookie
        this.$Message.success('退出成功 请重新登录');
        this.loginState = false;
        this.$router.push({ //跳转到登录页面
          path: "/login/login"
        });
      },
    },
    directives: {
      focus: {
        // 当绑定元素插入到 DOM 中
        inserted: function (el) {
          // 聚焦元素
          el.focus()
        }
      }
    },
};
</script>

<style scoped>
  header {
    position: fixed;
    left: 0px;
    top: 0px;
    right: 0px;
    margin-bottom: 30px;
    padding: 0 15px;
    box-shadow: 0 8px 4px 0 #e9e9e9;
    background: #FFF;
    z-index: 1000;
  }
  .main {
    height: 76px;
    margin: 0 auto;
    width: 1170px;
  }
  /*logo*/
  .logo {
    width: 196px;
    height: 100%;
  }
  .logo a{
    display: block;
    width: 100%;
    height: 100%;
    background: url("../assets/publcImg/logo.png") no-repeat center center;
  }
  /*导航*/
  .nav li {
    height: 76px;
    line-height: 76px;
    margin-left: 60px;
  }
  .nav li a {
    font-size: 16px;
  }
  .nav li .active {
    border-bottom: 3px solid #ff3c00;
    padding-bottom: 5px;
    color: #ff3c00;
  }
  .nav li a:hover {
    color: #ff3c00;
  }
  /*登陆头像*/
  .login_user .headPortrait {
    margin-left: 48px;
    width: 32px;
    height: 76px;
    padding-top: 20px;
    position: relative;
    overflow: hidden;
  }
  .login_user .headPortrait:hover {
    overflow: visible;
  }
  .login_user .headPortrait:hover div{
    opacity: 1;
  }
  .login_user .headPortrait a {
    border-radius: 100%;
    overflow: hidden;
  }
  .login_user .headPortrait a img {
    border-radius: 50%;
    width: 32px;
  }
  .login_user .headPortrait .loginState1 {
    position: absolute;
    top: 70px;
    left: -33px;
    width: 100px;
    padding: 10px 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background: #FFF;
    border-radius: 4px;
    opacity: 0;
    -webkit-transition: all .5s ease-in;
    -moz-transition: all .5s ease-in;
    transition: all .3s ease-in;
  }
  .login_user .headPortrait .loginState1 p {
    height: 36px;
    text-align: center;
  }
  .login_user .headPortrait .loginState1 p a {
    display: block;
    height: 100%;
    line-height: 36px;
    margin: 0 10px;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .login_user .headPortrait .loginState1 p:hover {
    background: #f5f5f5;
  }


  .login_user ul {
    height: 76px;
    line-height: 76px;
  }
  .login_user ul li {
    font-size: 14px;
    margin-left: 15px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .login_user ul li:hover {
    overflow: visible;
  }
  .login_user ul li:hover div{
    opacity: 1;
  }
  .login_user ul li:hover a span{
    color: #ff3c00;
  }
  .login_user ul li a span {
    /*font-size: 22px;*/
    padding: 0 5px;
  }
  /*投稿*/
  .contribute {
    position: absolute;
    top: 70px;
    left: -10px;
    width: 100px;
    padding: 10px 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background: #FFF;
    border-radius: 4px;
    opacity: 0;
    -webkit-transition: all .5s ease-in;
    -moz-transition: all .5s ease-in;
    transition: all .5s ease-in;
  }
  .contribute p {
    height: 36px;
    text-align: center;
  }
  .contribute p a {
    display: block;
    height: 100%;
    line-height: 36px;
    margin: 0 10px;
  }
  .contribute p:hover {
    background: #f5f5f5;
  }
  /*APP下载码*/
  .appDownload {
    z-index: 11;
    padding: 20px;
    position: absolute;
    top: 70px;
    left: -50px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    background: #FFF;
    border-radius: 4px;
    line-height: 20px;
    opacity: 0;
    -webkit-transition: all .5s ease-in;
    -moz-transition: all .5s ease-in;
    transition: all .5s ease-in;
  }
  .appDownload img {
    width: 120px;
    height: 120px;
  }
  .appDownload i {
    text-align: center;
    display: block;
    padding-top: 6px;
    font-style: normal;
  }
  .r li a{
    color: #999;
  }
  /* 搜索 */
header ul .search-pop {
    background-color: unset;
}

header ul .search-pop {
    z-index: 11;
    margin-bottom: 20px;
    position: absolute;
    bottom: -20px;
    left: -560px;
    background: #FFF;
}
header ul .search-pop .search-icon {
    float: left;
    height: 76px;
    padding-top: 14px;
}
header ul .search-pop input {
    width: 400px;
    height: 34px;
    margin: 16px 0 0 10px;
    border-bottom: #DCDCDC 1px solid;
    border-left: none;
    border-right: none;
    border-top: none;
    outline: none;
}
header ul .search-pop a {
    padding: 10px 10px 2px 10px;
    display: inline-block;
}
header ul a {
    color: #999;
}
/* .search:hover{
  overflow: hidden !important;
} */
.login_user ul .search{
  overflow: visible;
}
</style>
