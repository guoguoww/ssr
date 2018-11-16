<template>
    <div class="login">
      <div class="login_form">
        <p>账号密码登陆</p>
        <div class="inputBox">
          <input type="text" placeholder="手机号码" v-model="userData.mobile" @keyup.enter="login()">
          <input name="password" type="password" placeholder="请输入密码"  v-model="userData.password"  @keyup.enter="login()">
        </div>
        <div class="login_way">
          <nuxt-link class="fl" to="/login/yzmLogin">手机验证码登陆</nuxt-link>
          <nuxt-link class="fr" to="/login/forgetPwd">忘记密码</nuxt-link>
        </div>
        <Button class="loginBtn" type="error" @click="login()" long>登录</Button>
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
    name: "login",
    data() {
      return {
        userData: {
          mobile: "", //手机号
          password: "", //密码
          terminal: "", //设备
          loginType: 0, //登陆方式 密码登陆
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
      async login() { //登陆
        if (!this.userData.mobile) {
          this.$Message.error('请输入手机号码');
          return;
        }
        if (!this.userData.password) {
          this.$Message.error('请输入密码');
          return;
        }
        await this.$axios({
          url: "/api/user/login",
          method: "post",
          params: this.userData
        }).then(res => {
          if(res.data.errorCode === 0) {
            cookie.set("_auth", res.data.data.cookie);
            this.$Message.success(res.data.errorMsg);
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
  .login {
    width: 560px;
    min-height: 548px;
    border-top: 2px solid #ff3c00;
    margin: 80px auto;
    background: #fff;
  }
  .login_form {
    width: 244px;
    height: 280px;
    margin: 97px auto 172px;
  }
  .login_form p {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 700;
  }
  .login_form .inputBox input {
    width: 100%;
    height: 38px;
    padding-left: 3%;
    margin-bottom: 15px;
  }
  .login_form .inputBox input[name='password'] {
    margin-bottom: 0px;
  }
  .login_form .login_way a {
    display: block;
    height: 58px;
    line-height: 58px;
    color: #888;
  }
  .login_form .loginBtn {
    height: 40px;
    font-size: 18px;
    background: #ff3c00;
  }
  .login_form span {
    display: block;
    height: 46px;
    line-height: 46px;
    text-align: center;
  }
  .login_form span a {
    color: #ff3c00;
  }
</style>
