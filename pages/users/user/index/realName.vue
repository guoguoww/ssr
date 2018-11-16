<template>
    <div>
      <!--未实名或者实名失败-->
      <ul class="progressOf" v-if="this.userData.authStatus === 0 || this.userData.authStatus === 3">
        <li class="progress_bar">
          <span class="span_change">1</span>
          <i></i>
          <span>2</span>
          <i></i>
          <span>3</span>
        </li>
        <li class="progressOf_name clearfix">
          <p class="fl progressOf_name_chenge">认证类型</p>
          <p class="fl progressOf_name_center">认证资料</p>
          <p class="fr">等待审核</p>
        </li>
      </ul>
      <ul class="authenticationType clearfix" v-if="this.userData.authStatus === 0 || this.userData.authStatus === 3">
        <li class="fl">
          <dl>
            <dt></dt>
            <dd>
              <h5>个人</h5>
              <p>适合行业专家、意见领袖、评论 家及自媒体人士申请。</p>
              <nuxt-link to="/users/certification/0">立即申请</nuxt-link>
            </dd>
          </dl>
        </li>
        <li class="fl authenticationType_center">
          <dl>
            <dt></dt>
            <dd>
              <h5>企业</h5>
              <p>适合企业、公司，分支机构，企 业相关品牌，产品与服务等。</p>
              <nuxt-link to="/users/certification/2">立即申请</nuxt-link>
            </dd>
          </dl>
        </li>
        <li class="fr">
          <dl>
            <dt></dt>
            <dd>
              <h5>媒体</h5>
              <p>适合各类媒体及有新闻资质的网站 等内容生产公司/机构申请。</p>
              <nuxt-link to="/users/certification/1">立即申请</nuxt-link>
            </dd>
          </dl>
        </li>
      </ul>

      <!--审核中-->
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
      <p class="review"  v-if="this.userData.authStatus === 1">
        您已提交实名认证信息，我们会在24小时以内进行审核，请等待！
        <br><br>
        认证类型：{{certificationType}}认证
      </p>

      <!--审核通过-->
      <div class="cerSuccess" v-if="this.userData.authStatus === 2">
        <h5 class="title">
          您已完成实名认证
        </h5>
        <div class="userInf">
          <span class="name">认证类型：</span>
          <span>{{certificationType }}</span>
        </div>
        <div class="userInf">
          <span class="name">姓名：</span>
          <span>{{userData.chnName}}</span>
        </div>
        <div class="userInf">
          <span class="name">证件类型：</span>
          <span>{{certificateType}}</span>
        </div>
        <div class="userInf">
          <span class="name">证件号码：</span>
          <span>{{userData.certificateNumber}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "realName",
    data() {
      return {
        userData: {}, //信息初始
      }
    },
    computed: {
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
  .progressOf {
    padding-top: 14px;
    width: 780px;
    margin: 20px auto 0;
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
  /*认证类型*/
  .authenticationType {
    width: 100%;
    padding-top: 115px;
  }
  .authenticationType li {
    width: 196px;
    height: 340px;
  }
  .authenticationType .authenticationType_center {
    margin: 0 125px;
  }
  .authenticationType li dl {
    text-align: center;
  }
  .authenticationType li dl dt {
    height: 181px;
    width: 159px;
    margin: 0 auto;
  }
  .authenticationType li:nth-of-type(1) dl dt {
    background: url('../../../../assets/certificationImg/certification_personal.svg') no-repeat center center;
    background-size: 159px 181px;
  }
  .authenticationType li:nth-of-type(2) dl dt {
    background: url('../../../../assets/certificationImg/certification_enterprise.svg') no-repeat center center;
    background-size: 159px 181px;
  }
  .authenticationType li:nth-of-type(3) dl dt {
    background: url('../../../../assets/certificationImg/certification_media.svg') no-repeat center center;
    background-size: 159px 181px;
  }
  .authenticationType li dl dd h5 {
    padding-top: 23px;
    padding-bottom: 10px;
    font-size: 16px;
    color: #222;
    font-weight: 600;
    letter-spacing: 0;
  }
  .authenticationType li dl dd p {
    width: 196px;
    font-size: 14px;
    color: #555;
    padding-bottom: 30px;
    text-align: left;
  }
  .authenticationType li dl dd a {
    display: block;
    background: #FA322B;
    border-radius: 20px;
    width: 110px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
    color: #fff;
    border: 1px solid #FA322B;
    margin: 0 auto;
  }

  /*审核中*/
  .review {
    margin: 50px 0;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }

  /*审核通过*/
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

