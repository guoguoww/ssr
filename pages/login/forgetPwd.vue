<template>
  <div class="forgetPwd">
    <div class="forgetPwd_form">
      <p>找回密码</p>
      <div class="inputBox">
        <div class="tel">
          <input type="text" placeholder="手机号码" v-model="userData.mobile" @keyup.enter="confirm()">
        </div>
        <div class="pwd">
          <input type="text" placeholder="短信验证码" v-model="userData.smsValidCode" @keyup.enter="confirm()" >
          <Button type="error" @click="getCode()" :disabled='disabled' :class="{disabled: disabled}">{{isNaN(codetext) ? codetext : codetext + '秒'}}</Button>
        </div>
        <input name="password" type="password" placeholder="确认密码" v-model="userData.password">
      </div>
      <Button class="forgetPwdBtn" type="error" @click="confirm()" long>确认</Button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "forgetPwd",
    data() {
      return {
        userData: {
          mobile: "", //手机号
          smsValidCode: "", //验证码
          password: "", //新密码
        },
        disabled: false, //验证码按钮状态
        timer: null, //验证码定时器
        codetext: '获取验证码', //验证码文字信息
        postCode: {
          mobile: '', //手机号
          type: 'mtpwd'
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
          data: this.postCode
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
      async confirm() { //确认修改
        if (!this.userData.mobile) {
          this.$Message.error('请输入手机号码');
          return;
        }
        if (!this.userData.smsValidCode) {
          this.$Message.error('请输入验证码');
          return;
        }
        if (!this.userData.password) {
          this.$Message.error('请输入密码');
          return;
        }
        await this.$axios({
          url: "/api/user/modify_password",
          method: "post",
          params: this.userData
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.$Message.success('密码修改成功');
            this.$router.push({ //跳转到登录页面
              path: "/login/login"
            });
          }
        }).catch(err => {

        });
      }
    }
  }
</script>

<style scoped>
  .forgetPwd {
    width: 560px;
    min-height: 548px;
    border-top: 2px solid #ff3c00;
    margin: 80px auto;
    background: #fff;
  }
  .forgetPwd_form {
    width: 244px;
    height: 280px;
    margin: 97px auto 172px;
  }
  .forgetPwd_form p {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 700;
  }
  .forgetPwd_form .inputBox .tel {
    margin-bottom: 15px;
  }
  .forgetPwd_form .inputBox .tel input {
    width: 100%;
    height: 38px;
    padding-left: 3%;
  }
  .forgetPwd_form .inputBox .pwd input {
    width: 60%;
    height: 38px;
    padding-left: 3%;
  }
  .forgetPwd_form .inputBox .pwd button {
    width: 38%;
    height: 38px;
    float: right;
  }
  .forgetPwd_form .inputBox .pwd .disabled {
    background: #ccc;
    color: #000;
  }
  .forgetPwd_form .inputBox input[name='password'] {
    width: 100%;
    height: 38px;
    margin: 15px 0px;
    padding-left: 3%;
  }
  .forgetPwd_form .forgetPwdBtn {
    height: 40px;
    font-size: 18px;
    background: #ff3c00;
  }
</style>
