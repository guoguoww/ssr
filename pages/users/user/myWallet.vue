<template>
    <div>
      <!--充值-->
      <div class="wallet_topUp methodsInt">
        <h3 class="wallet_topUp_left fl">
          HNC：{{userData.hnc}}
        </h3>
        <dl class="wallet_topUp_right methodsInt_list fr">
          <dt>获得HNC的方法为：</dt>
          <dd>
            <p>1、新用户注册获得HNC</p>
            <p>2、分享链接注册获得HNC</p>
            <p>3、每个用户首次关注公众号获得HNC</p>
          </dd>
        </dl>
      </div>
      <!--公众号关注验证-->
      <div class="wallet_gzhYZ methodsInt">
        <dl class="wallet_gzhYZ_left fl methodsInt_list">
          <dt>关注公众号步骤：</dt>
          <dd>
            <p>在微信公众号搜索火鸟xx并关注</p>
            <p>在公众号中输入“领取火鸟币”获得验证码</p>
            <p>在平台输入获得的验证码领取</p>
          </dd>
        </dl>
        <div class="wallet_gzhYZ_right fr">
          <span class="fl">公众号验证码：</span>
          <div class="wallet_gzhYZ_right_input fl">
            <input type="text">
            <!--<p>验证通过显示已验证</p>-->
          </div>
          <a class="wallet_gzhYZ_btn fr" href="javascript:void (0);" @click="gzhYZ()">验证</a>
        </div>
      </div>
      <!--分享-->
      <div class="wallet_share">
        <!--分享链接-->
        <div class="wallet_share_link">
          <div class="wallet_share_link_left">
            <h4>分享链接</h4>
            <p>以下网址是您对外界进行推广的地址，您可以通过朋友、QQ、微信、博客、 论坛或自己的网站进行推广，所有通过该地址访问过来的人，注册后就都属于您的用户</p>
            <div class="wallet_share_link_btnBox">
              <span class="fl">您的分享链接：</span>
              <input type="text" id="text" :value="router + '/login/registered/' + userData.inviteCode" readonly>
              <a class="wallet_share_link_btn fr" @click="copytxt()" href="javascript:void (0);">复制</a>
            </div>
          </div>
          <div class="wallet_share_link_right">
            <div id="qrcode" style="text-align:center;display: inline-block;"></div>
            <!--<img src="https://img.jinse.com/185330_image20.png" alt="严茹">-->
            <p>分享二维码</p>
          </div>
        </div>
        <!--分享人数/HNC所得-->
        <div class="wallet_share_inf">
          <p class="fl">分享人数：{{total}}</p>
          <p class="fr">所得HNC：{{userData.returnHncTotal}}</p>
        </div>
        <!--分享注册列表-->
        <div class="wallet_share_list">
          <div class="wallet_share_list_th clearfix">
            <p class="fl">姓名</p>
            <p class="fr">注册时间</p>
          </div>
          <p v-if="shareList.length === 0" class="list_null">暂无注册人数...</p>
          <ul class="wallet_share_list_td" v-if="shareList.length !== 0">
            <li class="wallet_share_list_item clearfix" v-if="(item,i) in shareList" :key="i">
              <p class="fl">{{item.nickName}}</p>
              <p class="fr">{{item.registerTime}}</p>
            </li>
            <!--<li class="wallet_share_list_item clearfix">-->
              <!--<p class="fl">牛大神</p>-->
              <!--<p class="fr">2018-08-10</p>-->
            <!--</li>-->
            <!--<li class="wallet_share_list_item clearfix">-->
              <!--<p class="fl">牛大神</p>-->
              <!--<p class="fr">2018-08-10</p>-->
            <!--</li>-->
          </ul>
          <!--分页器-->
          <div class="wallet_share_list_page" v-if="shareList.length !== 0">
            <Page :total="totle" :page-size="page.rows" show-elevator @on-change="pageChange" />
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  if (typeof window !== 'undefined'){
    var QRCode =  require('qrcodejs2')
  }
  export default {
    name: "money",
    data() {
      return {
        userData: {},
        shareList: [],
        total: 0, //总条数
        page: {
          start: 0, //第几页
          rows: 10, //每页N条
        }
      }
    },
    // components: {
    //   QRCode
    // },
    computed: {
      router() {
        if (typeof window !== 'undefined'){
          return location.origin;
        }
      }
    },
    created() {
      this.obtain(); //初始运行获取函数
      this.obtainShare() //获取分享列表
    },
    methods: {
      async obtain() { //获取登陆用户资料
        await this.$axios.$post('/api/user/query_active_user').then(res=>{
          if(res.errorCode === 0){
            this.userData = res.data;
            this.qrcode(this.userData.inviteCode)
          }
        })
      },
      gzhYZ() { //公众号验证
        this.$Message.warning('尚未开通 敬请期待');
      },
      qrcode(inviteCode) { //生成分享二维码
        let qrcode = new QRCode(document.getElementById("qrcode"), {
          width: 125,  // 设置宽度
          height: 125, // 设置高度
          text: location.origin + '/login/registered/' + inviteCode
        })
      },
      async obtainShare() { //获取分享列表
        await this.$axios({
          url: '/api/user/share',
          method: "post",
          params: this.page
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.total  = res.data.data.shareTotal
            this.shareList = res.data.data.shareUsers
          }
        })
      },
      copytxt() { //复制
        var d = document.getElementById("text");
        d.select();
        document.execCommand("Copy");
        this.$Message.success('已复制到剪贴板');
      },
      pageChange(page) { //分页操作
        this.page.start = this.page.rows * (page-1);
        this.obtainShare();
      }
    }
  }
</script>

<style scoped>
  /*HNC/关注介绍*/
  .methodsInt {
    height: 124px;
    color: #000;
    border-bottom: 1px solid #E1E1E1;
  }
  .wallet_topUp .wallet_topUp_left {
    line-height: 124px;
    font-size: 16px;
    font-weight: bold;
  }
  .methodsInt .methodsInt_list {
    padding: 26px 40px 19px 0;
  }
  /*公众号验证*/
  .wallet_gzhYZ .wallet_gzhYZ_right {
    height: 46px;
    margin-top: 46px;
  }
  .wallet_gzhYZ .wallet_gzhYZ_right span {
    display: inline-block;
    height: 100%;
    line-height: 34px;
  }
  .wallet_gzhYZ .wallet_gzhYZ_right .wallet_gzhYZ_right_input {
    width: 240px;
  }
  .wallet_gzhYZ .wallet_gzhYZ_right .wallet_gzhYZ_right_input input {
    width: 100%;
    height: 34px;
    border: 0;
    background: #f2f2f2;
    padding-left: 12px;
  }
  .wallet_gzhYZ .wallet_gzhYZ_right .wallet_gzhYZ_right_input input:focus {
    outline: none;
  }
  .wallet_gzhYZ .wallet_gzhYZ_right .wallet_gzhYZ_right_input p {
    height: 24px;
    line-height: 24px;
    text-align: center;
  }
  .wallet_gzhYZ .wallet_gzhYZ_right .wallet_gzhYZ_btn {
    display: block;
    width: 94px;
    height: 34px;
    line-height: 34px;
    background: #ff3d00;
    margin: 0 26px;
    color: #fff;
    text-align: center;
  }

  /*分享  分享链接*/
  .wallet_share .wallet_share_link {
    height: 234px;
    border-bottom: 1px solid #E1E1E1;
    position: relative;
  }
  .wallet_share .wallet_share_link .wallet_share_link_left {
    position: absolute;
    left: 0;
    width: 500px;
  }
  .wallet_share .wallet_share_link .wallet_share_link_left h4 {
    font-size: 20px;
    line-height: 40px;
    margin-top: 10px;
  }
  .wallet_share .wallet_share_link .wallet_share_link_left p {
    width: 410px;
  }
  .wallet_share .wallet_share_link .wallet_share_link_left .wallet_share_link_btnBox {
    margin-top: 20px;
  }
  .wallet_share .wallet_share_link .wallet_share_link_left .wallet_share_link_btnBox span {
    display: inline-block;
    height: 100%;
    line-height: 34px;
  }
  .wallet_share .wallet_share_link .wallet_share_link_left .wallet_share_link_btnBox input {
    width: 240px;
    height: 34px;
    border: 0;
    background: #f2f2f2;
    padding-left: 12px;
  }
  .wallet_share .wallet_share_link .wallet_share_link_left .wallet_share_link_btnBox input:focus {
    outline: none;
  }
  .wallet_share .wallet_share_link .wallet_share_link_left .wallet_share_link_btnBox  p {
    height: 24px;
    line-height: 24px;
    text-align: center;
  }
  .wallet_share .wallet_share_link .wallet_share_link_left .wallet_share_link_btnBox  .wallet_share_link_btn {
    display: block;
    width: 94px;
    height: 34px;
    line-height: 34px;
    background: #ff3d00;
    margin: 0 26px;
    color: #fff;
    text-align: center;
  }
  .wallet_share .wallet_share_link .wallet_share_link_right {
    position: absolute;
    right: 40px;
    top: 50px
  }
  .wallet_share .wallet_share_link .wallet_share_link_right p {
    margin-top: 30px;
    text-align: center;
  }

  /*分享人数/获得HNC*/
  .wallet_share .wallet_share_inf {
    height: 82px;
    border-bottom: 1px solid #E1E1E1;
  }
  .wallet_share .wallet_share_inf p {
    height: 82px;
    line-height: 82px;
  }
  .wallet_share .wallet_share_inf p:last-child {
    margin-right: 40px;
  }
  /*分享人注册列表*/
  .wallet_share .wallet_share_list .wallet_share_list_td {
    min-height: 150px;
  }
  .wallet_share .wallet_share_list .wallet_share_list_th p,
  .wallet_share .wallet_share_list .wallet_share_list_td .wallet_share_list_item p{
    width: 150px;
    margin: 5px 0;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
  }
  .wallet_share .wallet_share_list .wallet_share_list_th p:last-child,
  .wallet_share .wallet_share_list .wallet_share_list_td .wallet_share_list_item p:last-child {
    text-align: center;
  }
  .wallet_share .wallet_share_list .wallet_share_list_th p {
    font-weight: bold;
  }
  /*分享人注册列表*/
  .wallet_share .wallet_share_list .wallet_share_list_page {
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
