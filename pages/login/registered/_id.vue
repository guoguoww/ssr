<template>
  <div class="registered">
    <div class="registered_form">
      <p>注册</p>
      <div class="inputBox">
        <div class="tel">
          <input type="text" placeholder="手机号码" v-model="userData.mobile">
        </div>
        <div class="pwd">
          <input type="text" placeholder="短信验证码" v-model="userData.smsValidCode">
          <Button type="error" @click="getCode()" :disabled='disabled' :class="{disabled: disabled}">{{isNaN(codetext) ? codetext : codetext + '秒'}}</Button>
        </div>
        <input name="password" type="password" placeholder="请输入密码" v-model="userData.password">
        <input name="confirmPwd" type="password" placeholder="确认密码" v-model="confirmPwd">
        <input name="inviteCode" type="text" placeholder="邀请码（选填）" :readonly="readonly" v-model="userData.inviteCode">
      </div>
      <div class="agreement">
        <!--<Checkbox v-model="accept">我已阅读并接受</Checkbox>-->
        <input type="checkbox"  v-model="accept"> 我已阅读并接受
        <nuxt-link to="">《火鸟媒体平台服务协议》</nuxt-link>
      </div>
      <Button type="error" v-show="accept" class="registeredBtn" @click="registered()" long>注册</Button>
      <Button type="error" v-show="accept === false" disabled class="disabled" long>注册</Button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "_id",
    data() {
      return {
        userData: {
          mobile: "", //手机号
          smsValidCode: "", //验证码
          password: "", //密码
          inviteCode: "", //邀请码
          terminal: "", //设备
        },
        readonly: false, //是否可以修改邀请码
        confirmPwd: '', //确认密码
        disabled: false, //验证码按钮状态
        timer: null, //验证码定时器
        codetext: '获取验证码', //验证码文字信息
        postCode: {
          mobile: '', //手机号
          type: 'mtpwd',
        },
        accept:  false, //是否接受协议
      }
    },
    computed: {
      router() { //获取邀请码
        return this.$route.path.split('/')[3];
      }
    },
    created() {
      if(this.router !== '') {
        this.userData.inviteCode = this.router;
        this.readonly = true;
      }
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
      async registered() { //注册
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
        if (this.confirmPwd !== this.userData.password) {
          this.$Message.error('两次密码不同');
          return;
        }
        await this.$axios({
          url: "/api/user/register",
          method: "post",
          data: this.userData
        }).then(res => {
          if(res.data.errorCode === 0) {
            this.$Message.success('注册成功');
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
  .registered {
    width: 560px;
    min-height: 548px;
    border-top: 2px solid #ff3c00;
    margin: 80px auto;
    background: #fff;
  }
  .registered_form {
    width: 244px;
    height: 280px;
    margin: 97px auto 172px;
  }
  .registered_form p {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    margin-bottom: 15px;
    font-weight: 700;
  }
  .registered_form .inputBox .tel {
    margin-bottom: 15px;
  }
  .registered_form .inputBox .tel input {
    width: 100%;
    height: 38px;
    padding-left: 3%;
    line-height: 38px;
  }
  .registered_form .inputBox .pwd input {
    width: 60%;
    height: 38px;
    padding-left: 3%;
    line-height: 38px;
  }
  .registered_form .inputBox .pwd button {
    width: 38%;
    height: 38px;
    float: right;
  }
  .registered_form .inputBox input[name='password'],
  .registered_form .inputBox input[name='confirmPwd'],
  .registered_form .inputBox input[name='inviteCode']{
    width: 100%;
    height: 38px;
    margin-top: 15px;
    padding-left: 3%;
    line-height: 38px;
  }
  .registered_form .agreement {
    line-height: 48px;
    font-size: 12px;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .registered_form .registeredBtn {
    height: 40px;
    font-size: 18px;
    background: #ff3c00;
  }
  .disabled {
    height: 40px;
    font-size: 18px;
    background: #ccc;
    color: #000;
  }
</style>

