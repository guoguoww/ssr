<template>
    <div>
      <ul class="security">
        <li>
          <div class="center_title fl">
            <Icon type="ios-tablet-portrait" />
            <span>登录手机</span>
          </div>
          <div class="center_content fl">
            <span>{{userData.mobile}}</span>
          </div>
          <a class="fr" href="javascript:;" @click="openPhone()">修改</a>
        </li>
        <li>
          <div class="center_title fl">
            <Icon type="ios-unlock-outline" />
            <span>登录密码</span>
          </div>
          <div class="center_content fl">
            <span>*****************</span>
          </div>
          <a class="fr" href="javascript:;" @click="openPwdShow()">修改</a>
        </li>
      </ul>

      <!--朦版-->
      <div class="background-000" v-if="mengPlate"></div>

      <!--模态框-->
      <div class="modify" v-if="modelShow">
        <!--头部-->
        <div class="modify_title">
          <h3>修改</h3>
          <Icon class="close" type="ios-close" @click="close()" />
        </div>
        <!--信息-->
        <div class="modify_information" v-if="pwdShow">
          <p>为确保账号安全，需要验证当前手机有效性</p>
          <p>当前绑定手机号：{{userData.mobile}}</p>
        </div>

        <!--手机号修改-->
        <div class="modify_phone" v-if="phoneShow">
          <div class="modify_input_pwd clearfix">
            <input class="fl" type="password" placeholder="请输入登录密码" v-model="phoneData.password">
          </div>
          <div class="modify_input_tel">
            <input class="fr" type="text" placeholder="新手机号码" v-model="phoneData.mobile">
            <select class="fl" name="" id="">
              <option value="">+86</option>
            </select>
          </div>
          <div class="modify_input_yzm">
            <input class="fl" type="text" placeholder="请输入验证码"  v-model="phoneData.smsValidCode">
            <Button type="error" @click="getCode(0)" :disabled='phoneStats.disabled' :class="{disabled: phoneStats.disabled}">{{isNaN(phoneStats.codetext) ? phoneStats.codetext : phoneStats.codetext + '秒'}}</Button>
          </div>
          <div class="confirm-close clearfix">
            <a href="javascript:void (0)" class="fl" @click="openSuccessShow(0)">确认</a>
            <a href="javascript:void (0)" class="closeBtn fl" @click="close()">取消</a>
          </div>
        </div>



        <!--密码修改-->
        <div class="modify_pwd" v-if="pwdShow">
          <div class="modify_input_yzm">
            <input class="fl" type="text" placeholder="请输入验证码" v-model="pwdData.smsValidCode">
            <Button type="error" @click="getCode(1)" :disabled='pwdStats.disabled' :class="{disabled: pwdStats.disabled}">{{isNaN(pwdStats.codetext) ? pwdStats.codetext : pwdStats.codetext + '秒'}}</Button>
          </div>
          <div class="modify_input_pwd">
            <input type="password" placeholder="登录密码" v-model="pwdData.password">
            <input type="password" placeholder="请再次输入新密码" v-model="pwdYZ">
          </div>
          <div class="confirm-close clearfix">
            <a href="javascript:void (0)" class="fl" @click="openSuccessShow(1)">确认</a>
            <a href="javascript:void (0)" class="closeBtn fl" @click="close()">取消</a>
          </div>
        </div>

        <!--错误提示-->
        <div id="vercode-error" class="vercode-error">
          <p>{{error}}</p>
        </div>
      </div>

      <!--成功返回模态框-->
      <div class="modify modify_success" v-if="successShow">
        <i></i>
        <span class="setSuccess">{{success}}</span>
        <span class="modify_success_information">可使用手机号、密码登录火鸟媒体平台</span>
        <a v-if="routerLogin === false" href="javascript:void (0)" @click="close(1)">知道了</a>
        <nuxt-link v-if="routerLogin" to="/login/login">知道了</nuxt-link>
      </div>

    </div>
</template>

<script>
  import cookie from '~/assets/cookie.js'
  export default {
    name: "security",
    data() {
      return {
        userData: {}, //初始获取信息
        success: '', //成功提示
        routerLogin: false, //修改密码成功需要重新登陆
        error: '', //错误提示
        mengPlate: false, //朦版
        modelShow: false, //模态框
        phoneShow: false, //手机号修改
        pwdShow: false, //密码修改
        successShow: false, //修改成功
        phoneData: { //修改手机号上传信息
          password: '', //密码
          mobile: '', //新手机号
          smsValidCode: '' //新手机号验证码
        },
        pwdData: { //修改密码上传信息
          mobile: '', //手机号
          smsValidCode: '', //验证码
          password: '', //密码
        },
        pwdYZ: '', //验证修改密码时 两次密码是否相同
        phoneStats: { //手机号
          disabled: false, //验证码按钮状态
          timer: null, //验证码定时器
          codetext: '获取验证码', //验证码文字信息
        },
        pwdStats: { //密码
          disabled: false, //验证码按钮状态
          timer: null, //验证码定时器
          codetext: '获取验证码', //验证码文字信息
        },
        postCode: { //发送验证码传输内容
          mobile: '', //手机号
          type: '' //修改类型
        }
      }
    },
    created() {
      this.obtain(); //初始运行获取函数
    },
    methods: {
      b64DecodeUnicode(str) { //bbase64 解码
        return decodeURIComponent(atob(str).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      },

      async obtain() { //获取登陆用户资料
        await this.$axios.$post('/api/user/query_active_user').then(res=>{
          if(res.errorCode === 0){
            this.userData = res.data;
            this.userData.mobile = this.b64DecodeUnicode(this.userData.mobile)
          }
        })
      },

      async getCode(num) {//获取短信验证码
        if(num === 0) { //手机号修改
          if (!this.phoneData.mobile) {
            document.getElementById('vercode-error').style.top =  0 + 'px'
            this.error = '请输入新手机号码';
            return;
          }
          this.postCode.mobile = this.phoneData.mobile
          this.postCode.type = 'mmoble'
        }
        if(num === 1) { //密码修改
          this.postCode.mobile = this.userData.mobile
          this.postCode.type = 'mtpwd'
        }
        await this.$axios({
          url: "/api/sms/validate_code",
          method: "post",
          params: this.postCode
        }).then(res=>{
          if (res.data.errorCode === 0) {
            if(num === 0){
              this.$Message.success('发送成功');
              this.phoneStats.disabled = true;
              this.phoneStats.codetext = 60;
              this.phoneStats.timer = setInterval(()=>{
                if(this.phoneStats.codetext > 0 && this.phoneStats.codetext <= 60 > 0 && this.phoneStats.codetext <= 60){
                  this.phoneStats.codetext--
                }else{
                  this.phoneStats.disabled = false
                  this.phoneStats.codetext = '获取验证码'
                  clearInterval(this.phoneStats.timer)
                  this.phoneStats.timer = null
                }
              },1000)
            }
            if(num === 1){
              this.$Message.success('发送成功');
              this.pwdStats.disabled = true;
              this.pwdStats.codetext = 60;
              this.pwdStats.timer = setInterval(()=>{
                if(this.pwdStats.codetext > 0 && this.pwdStats.codetext <= 60 > 0 && this.pwdStats.codetext <= 60){
                  this.pwdStats.codetext--
                }else{
                  this.pwdStats.disabled = false
                  this.pwdStats.codetext = '获取验证码'
                  clearInterval(this.pwdStats.timer)
                  this.pwdStats.timer = null
                }
              },1000)
            }
          }
        })
      },

      openPhone(){ //打开手机号修改
        this.modelShow = true;
        this.mengPlate = true;
        this.phoneShow = true;
      },
      openPwdShow() { //打开密码修改
        this.modelShow = true;
        this.mengPlate = true;
        this.pwdShow = true;
      },
      close(stats) { //关闭模板
        this.modelShow = false;
        this.mengPlate = false;
        this.phoneShow = false;
        this.pwdShow = false;
        this.successShow = false;
        this.phoneData.password = '';
        this.phoneData.mobile = '';
        this.phoneData.smsValidCode = '';
        this.pwdData.mobile = '';
        this.pwdData.smsValidCode = '';
        this.pwdData.password = '';
        if(stats === 1) {
          this.obtain();
        }
      },

      async openSuccessShow(stats) { //提交
        this.mengPlate = true;
        if(stats === 0) { //手机号修改成功
          this.phoneShow = true;
          this.pwdShow = false;
          if (!this.phoneData.password) {
            document.getElementById('vercode-error').style.top =  0 + 'px'
            this.error = '请输入登录密码';
            return;
          }
          if (!this.phoneData.mobile) {
            document.getElementById('vercode-error').style.top =  0 + 'px'
            this.error = '请输入新手机号码';
            return;
          }
          if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.phoneData.mobile)) {
            document.getElementById('vercode-error').style.top =  0 + 'px'
            this.error = '手机号不合法';
            return
          }
          if (!this.phoneData.smsValidCode) {
            document.getElementById('vercode-error').style.top =  0 + 'px'
            this.error = '请输入手机验证码';
            return;
          }
          await this.$axios({
            url: "/api/user/update_mobile",
            method: "post",
            params: this.phoneData
          }).then(res=>{
            if (res.data.errorCode === 0) {
              this.successShow = true;
              this.phoneShow = false;
              this.pwdShow = false;
              this.success = '手机号修改成功'
            }
          })
        }
        if(stats === 1) { //密码修改成功
          this.phoneShow = false;
          this.pwdShow = true;
          if (!this.pwdData.smsValidCode) {
            document.getElementById('vercode-error').style.top =  0 + 'px'
            this.error = '请输入验证码';
            return;
          }
          if (!this.pwdData.password) {
            document.getElementById('vercode-error').style.top =  0 + 'px'
            this.error = '请输入新密码';
            return;
          }
          if (this.pwdYZ !== this.pwdData.password) {
            document.getElementById('vercode-error').style.top =  0 + 'px'
            this.error = '两次输入密码不同';
            return;
          }
          this.pwdData.mobile = this.userData.mobile;
          await this.$axios({
            url: "/api/user/modify_password",
            method: "post",
            params: this.pwdData
          }).then(res=>{
            if (res.data.errorCode === 0) {
              this.successShow = true;
              this.phoneShow = false;
              this.pwdShow = false;
              this.success = '密码修改成功,请重新登录';
              cookie.clear();//清除cookie
              this.routerLogin = true
            }
          })
        }
      },

    }
  }
</script>

<style scoped>
  .security {
    margin-top: 60px;
  }
  .security li {
    height: 69px;
    border-bottom: 1px solid #E1E1E1;
    line-height: 69px;
    position: relative;
  }
  .security li:nth-last-child(1) {
    border-bottom: 0
  }
  .security li .center_title i {
    position: relative;
    top: -2px;
    font-style: normal;
    font-size: 14px;
  }
  .security li .center_title span{
    position: absolute;
    left: 20px;
  }
  .security li .center_content{
    position: absolute;
    left: 120px;
  }
  .security li a{
    font-size: 14px;
    color: #4C90F5;
  }
  /*朦版*/
  .background-000 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1001;
    background: #000;
    opacity: .6;
  }
  /*模态框*/
  .modify {
    margin: 80px auto;
    min-width: 560px;
    min-height: 500px;
    background: #FFF;
    border-top: 2px solid #FA322B;
    position: fixed;
    top: 80px;
    left: calc(50% - 280px);
    overflow: hidden;
    z-index: 1002;
  }
  /*模态头部*/
  .modify .modify_title h3{
    width: 37px;
    height: 25px;
    margin: 60px 443px 20px 80px;
    font-size: 18px;
    color: #222;
  }
  .modify .modify_title .close {
    position: absolute;
    right: 80px;
    top: 54px;
    display: block;
    transition: all .6s;
    font-size: 32px;
    cursor: pointer;
  }
  .modify .modify_title .close:hover {
    transform:rotate(-180deg);
  }
  /*模态框信息*/
  .modify .modify_information {
    width: 400px;
    height: 60px;
    background: #fad599;
    margin: 0 auto;
  }
  .modify .modify_information p {
    font-size: 13px;
    color: #FA322B;
    margin: 0 auto;
    text-align: center;
  }
  .modify .modify_information p:first-child {
    padding: 11px 0 4px;
  }
  /*手机号输入框*/
  .modify .modify_input_tel {
    width: 400px;
    height: 50px;
    margin: 0 auto 30px;
  }
  .modify .modify_input_tel select {
    border: 1px solid #E1E1E1;
    width: 70px;
    height: 48px;
  }
  .modify .modify_input_tel select:focus {
    border: 1px solid #E1E1E1;
    outline:none;
  }
  .modify .modify_input_tel input {
    border-radius: 0 2px 2px 0;
    width: 330px;
    padding-left: 10px;
    line-height: 38px;
    border: 1px solid #e1e1e1;
    border-left: 0;
    height: 48px;
  }
  .modify .modify_input_tel input:focus {
    border: 1px solid #FA322B;
    border-left: 0px;
    outline:none;
  }
  .modify .modify_input_tel input:focus+select  {
    border: 1px solid #FA322B;
    outline:none;
  }
  /*验证码*/
  .modify .modify_input_yzm {
    width: 400px;
    height: 49px;
    margin: 30px auto;
  }
  .modify .modify_input_yzm input[type=text] {
    padding-left: 12px;
    width: 291px;
    height: 50px;
    border-radius: 2px 0 0 2px;
    border: 1px solid #E1E1E1;
  }
  .modify .modify_input_yzm button {
    width: 108px;
    height: 50px;
    border-radius: 0 2px 2px 0;
    background: #FA322B;
    border: 1px solid #FA322B;
    color: #fff;
    outline:medium;
  }
  .modify .modify_input_yzm input[type=text]:hover {
    border: 1px solid #FA322B;
  }
  .modify .modify_input_yzm input[type=text]:focus {
    border: 1px solid #FA322B;
    outline:none;
  }
  /*密码输入框*/
  .modify .modify_input_pwd {
    width: 400px;
    margin: 0 auto;
  }
  .modify .modify_input_pwd input {
    margin-bottom: 30px;
    padding-left: 12px;
    width: 400px;
    height: 48px;
    border: 1px solid #E1E1E1;
  }
  .modify .modify_input_pwd input:hover {
    border: 1px solid #FA322B;
  }
  .modify .modify_input_pwd input:focus {
    border: 1px solid #FA322B;
    outline: none;
  }
  /*确认/关闭*/
  .modify .confirm-close {
    padding: 5px 170px 0;
  }
  .modify .confirm-close a {
    width: 103px;
    height: 39px;
    line-height: 40px;
    text-align: center;
    display: block;
    background: #FA322B;
    border: .5px solid #FA322B;
    border-radius: 2px;
    color: #fff;
  }
  .modify .confirm-close .closeBtn {
    background: #CCC;
    border-radius: 2px;
    margin-left: 10px;
    border: .5px solid #ccc;
  }
  /*错误提示*/
  .modify .vercode-error {
    width: 560px;
    height: 36px;
    position: absolute;
    top: -38px;
    background: #fdeacc;
    transition: all .6s;
  }
  .modify .vercode-error p {
    line-height: 36px;
    font-size: 12px;
    color: #FA322B;
    text-align: center;
  }
  /*修改成功模态框*/
  .modify_success i {
    display: block;
    margin: 80px 240px 30px;
    background-size: 80px 80px;
    width: 80px;
    height: 80px;
    background: url("../../../../assets/publcImg/set-pwd-success.png") no-repeat;
  }
  .modify_success span {
    margin: 0 auto;
    display: block;
    text-align: center;
    padding-bottom: 30px;
  }
  .modify_success .setSuccess {
    font-size: 24px;
    color: #222;
    height: 26px;
    line-height: 26px;
  }
  .modify_success .modify_success_information {
    font-size: 16px;
    color: #888;
    line-height: 26px;
    height: 26px;
  }
  .modify_success a {
    margin: 20px auto 0;
    width: 120px;
    height: 39px;
    line-height: 40px;
    background: #FA322B;
    border: .5px solid #FA322B;
    border-radius: 2px;
    display: block;
    text-align: center;
    color: #fff;
  }
</style>
