<template>
  <div class="yzmLogin">
    <div class="yzmLogin_form">
      <p>验证码登陆</p>
      <div class="inputBox">
        <div class="tel">
          <input type="text" placeholder="手机号码" v-model="userData.mobile" @keyup.enter="login()">
        </div>
        <div class="pwd">
          <input type="text" placeholder="短信验证码"  v-model="userData.smsValidCode" @keyup.enter="login()">
          <Button type="error" @click="getCode()" :disabled='disabled' :class="{disabled: disabled}">{{isNaN(codetext) ? codetext : codetext + '秒'}}</Button>
        </div>
      </div>
      <div class="yzmLogin_way">
        <nuxt-link class="fl" to="/login/login">密码登陆</nuxt-link>
        <nuxt-link class="fr" to="/login/forgetPwd">忘记密码</nuxt-link>
      </div>
      <Button class="yzmLoginBtn" type="error" @click="login()" long>登录</Button>
      <span>
          还没有火鸟账号? 点击
          <nuxt-link to="/login/registered/">注册</nuxt-link>
        </span>
    </div>
  </div>
</template>

<script>
  import cookie from '~/assets/cookie.js'
  export default {
    name: "yzmLogin",
    data() {
      return {
        userData: {
          mobile: "", //手机号
          smsValidCode: "", //验证码
          terminal: "", //设备
          loginType: 1, //登陆方式 验证码登陆
        },
        disabled: false, //验证码按钮状态
        timer: null, //验证码定时器
        codetext: '获取验证码', //验证码文字信息
        postCode: {
          mobile: '', //手机号
          type: 'login'
        }
      }
    },
    created() {
      //获取登陆设备
      if (typeof window !== 'undefined') {
        var u = navigator.userAgent;
        if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
          //安卓手机
          this.userData.terminal = 1;
        } else if (u.indexOf("iPhone") > -1) {
          //苹果手机
          this.userData.terminal = 2;
        } else {
          //wap
          this.userData.terminal = 3;
        }
      }
    },
    methods: {
      async getCode() {//获取短信验证码
        if (!this.userData.mobile) {
          this.$Message.error('请输入手机号码');
          return;
        }
        this.postCode.mobile = this.userData.mobile;
        await this.$axios({
          url: "/api/sms/validate_code",
          method: "post",
          params: this.postCode
        }).then(res=>{
          if (res.data.errorCode === 0) {
            this.$Message.success('发送成功');
            this.disabled = true;
            this.codetext = 60;
            this.timer = setInterval(()=>{
              if(this.codetext > 0 && this.codetext <= 60 > 0 && this.codetext <= 60){
                this.codetext--
              }else{
                this.disabled = false
                this.codetext = '获取验证码'
                clearInterval(this.timer)
                this.timer = null
              }
            },1000)
          }
        }).catch(err=>{

        })
      },
      async login() { //登陆
        if (!this.userData.mobile) {
          this.$Message.error('请输入手机号码');
          return;
        }
        if (!this.userData.smsValidCode) {
          this.$Message.error('请输入验证码');
          return;
        }

        await this.$axios({
          url: "/api/user/login",
          method: "post",
          params: this.userData
        }).then(res => {
          if(res.data.errorCode === 0) {
            cookie.set("_auth", res.data.data.cookie);
            this.$Message.success('登陆成功');
            this.$router.push({ //跳转到首页
              path: "/"
            });
          }
        }).catch(err => {

        });
      }
    }
  }
</script>

<style scoped>
  .yzmLogin {
    width: 560px;
    min-height: 548px;
    border-top: 2px solid #ff3c00;
    margin: 80px auto;
    background: #fff;
  }
  .yzmLogin_form {
    width: 244px;
    height: 280px;
    margin: 97px auto 172px;
  }
  .yzmLogin_form p {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 700;
  }
  .yzmLogin_form .inputBox .tel {
    margin-bottom: 15px;
  }
  .yzmLogin_form .inputBox .tel input {
    width: 100%;
    height: 38px;
    padding-left: 3%;
  }
  .yzmLogin_form .inputBox .pwd input {
    width: 60%;
    height: 38px;
    padding-left: 3%;
  }
  .yzmLogin_form .inputBox .pwd button {
    width: 38%;
    height: 38px;
    float: right;
  }
  .yzmLogin_form .inputBox .pwd .disabled{
    background: #ccc;
    color: #000;
  }
  .yzmLogin_form .yzmLogin_way a {
    display: block;
    height: 58px;
    line-height: 58px;
    color: #888;
  }
  .yzmLogin_form .yzmLoginBtn {
    height: 40px;
    font-size: 18px;
    background: #ff3c00;
  }
  .yzmLogin_form span {
    display: block;
    height: 46px;
    line-height: 46px;
    text-align: center;
  }
  .yzmLogin_form span a {
    color: #ff3c00;
  }
</style>
