<template>
  <div style=" width: 1200px;margin: 0 auto;background: #fff;">
    <div class="subSuccess">
      <!--进度条-->
      <ul class="progressOf" v-if="this.userData.authStatus === 1">
        <li class="progress_bar">
          <span class="span_change">1</span>
          <i class="i_change"></i>
          <span class="span_change">2</span>
          <i class="i_change"></i>
          <span class="span_change">3</span>
        </li>
        <li class="progressOf_name clearfix">
          <p class="fl progressOf_name_chenge">认证类型</p>
          <p class="fl progressOf_name_chenge progressOf_name_center">认证资料</p>
          <p class="fr progressOf_name_chenge">等待审核</p>
        </li>
      </ul>

      <p v-if="this.userData.authStatus === 1">您已提交实名认证信息，我们会在24小时以内进行审核，请等待！</p>
      <nuxt-link to="/users/user">返回个人中心</nuxt-link>

      <div class="cerSuccess" v-if="this.userData.authStatus === 2">
        <h5 class="title">
          您已完成实名认证
        </h5>
        <div class="userInf">
          <span class="name">认证类型：</span>
          <span>{{certificationType}}</span>
        </div>
        <div class="userInf">
          <span class="name">姓名：</span>
          <span>牛**</span>
        </div>
        <div class="userInf">
          <span class="name">身份证号：</span>
          <span>372924************</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "cerSuccess",
    data() {
      return {
        userData: {}
      }
    },
    computed: {
      certificationType (){ //认证状态
        switch(this.userData.certificationType ){
          case '0':
            return '个人'
          case '1':
            return '媒体'
          case '2':
            return '企业'
        }
      },
      certificateType() { //认证证件类型
        switch(this.userData.certificateType){
          case '0':
            return '居民身份证'
          case '1':
            return '港澳居民来往内地通行证'
          case '2':
            return '台湾居民来玩内地通行证'
          case '2':
            return '护照'
        }
      }
    },
    created() {
      this.obtain(); //初始运行获取函数
    },
    methods: {
      async obtain() { //获取登陆用户资料
        await this.$axios.$post('/api/user/query_active_user').then(res=>{
          if(res.errorCode === 0){
            this.userData = res.data
          }
        })
      },
    }
  }
</script>

<style scoped>
  .subSuccess {
    min-height: 800px;
    padding: 50px 210px 40px;
  }
  /*进度条*/
  .progressOf .progress_bar {
    display: -webkit-flex;
    display: flex;
    display: inline-flex;
    display: -webkit-inline-flex;
    justify-content: center;
    align-items: center;
    padding: 20px 15px 10px;
  }
  .progressOf .progress_bar span {
    width: 30px;
    height: 30px;
    display: inline-block;
    line-height: 30px;
    text-align: center;
    background: #E1E1E1;
    border-radius: 50%;
    font-size: 14px;
    color: #FFF;
    letter-spacing: 0;
  }
  .progressOf .progress_bar span.span_change {
    background: #FA322B;
  }
  .progressOf .progress_bar i {
    margin: 0 5px;
    width: 320px;
    height: 4px;
    display: inline-block;
    background: #E1E1E1;
  }
  .progressOf .progress_bar i.i_change {
    background: #FA322B;
  }
  .progressOf .progressOf_name p {
    font-size: 14px;
    color: #888;
    letter-spacing: 0;
  }
  .progressOf .progressOf_name  .progressOf_name_chenge {
    color: #FA322B;
  }
  .progressOf .progressOf_name .progressOf_name_center {
    padding: 0 305px;
  }

  p {
    margin: 50px 0;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  a {
    display: block;
    background: #FA322B;
    border-radius: 20px;
    width: 110px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    color: #fff;
    margin: 0 auto;
    text-align: center;
  }

  .cerSuccess {
    padding: 50px 30px;
  }
  .cerSuccess .title {
    padding-left: 50px;
    font-size: 18px;
    font-weight: bold;
  }
  .cerSuccess .userInf {
    padding: 20px 0px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
  }
  .cerSuccess .userInf .name {
    display: inline-block;
    width: 100px;
    text-align: right;
  }
</style>
