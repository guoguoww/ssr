<template>
  <div>
     <i class="headPortrait" style="//resource.jinse.com/www/v2/img/avatar.png">
       <img id="myImg" :src="userData.userHeader? userHeader :'//resource.jinse.com/www/v2/img/avatar.png'" alt="上传头像">
       <!--<Upload-->
         <!--action="//jsonplaceholder.typicode.com/posts/"-->
         <!--:on-success="handleSuccess"-->
         <!--:on-error="handleFormatError"-->
         <!--:show-upload-list="false"-->
         <!--:format="['jpg','jpeg','png']"-->
       <!--&gt;-->
         <!--<Button >上传头像</Button>-->
       <!--</Upload>-->
       <div class="file">
         <input type="file" name="file" accept="image/*" @change="changImg($event)"> 上传头像
       </div>


       <!--<button type="file" accept="image/*" capture="camera">选择文件</button>-->
     </i>
     <ul class="center">
       <li class="nickname">
         <div class="center_title fl">
           <i>*</i>
           <span>昵称</span>
         </div>
         <div class="center_content fl">
           <input type="text" name="nickname" v-model="userData.nickName" :class="{err: nicknameData.nicknameErrBor}" :disabled="!!userData.nickNameUpdateTime"  @blur="change('nickname', userData.nickName)" ref="nicknameCon">
         </div>
         <a class="fr" href="javascript:;" @click="modify('nickname')">修改</a>
         <i class="remind fl" v-if="!!nicknameData.nicknameErr" v-text="nicknameData.nicknameErr"></i>
       </li>
       <li class="gender">
         <div class="center_title fl">
           <i></i>
           <span>性别</span>
         </div>
         <div class="center_content fl">
           <RadioGroup v-model="userData.sex">
             <Radio label="1">
               <span>男</span>
             </Radio>
             <Radio label="2">
               <span>女</span>
             </Radio>
           </RadioGroup>
         </div>
         <span class="fr" style="color: #FA322B;">昵称只能修改一次</span>
       </li>
       <li class="introduction">
         <div class="center_title fl">
           <i></i>
           <span>简介</span>
         </div>
         <div class="center_content fl">
           <input type="text" name="introduction" v-model="userData.introduction" :class="{err: introductionData.introductionErrBor}" @blur="change('introduction', userData.introduction)" ref="introductionCon">
         </div>
         <a class="fr" href="javascript:;" @click="modify('introduction')">修改</a>
         <i class="remind fl" v-if="!!introductionData.introductionErr" v-text="introductionData.introductionErr"></i>
       </li>
     </ul>
    <div class="btn">
      <Button type="warning" class="submit" @click="submit()">提交</Button>
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        nicknameData: { //昵称修改操作
          nicknameErr: '',
          nicknameErrBor: false
        },
        introductionData: { //简介修改操作
          introductionErr: '',
          introductionErrBor: false
        },
        userHeader: '',//头像
        userData: {},//基础信息初始
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
            this.userData.sex = String(this.userData.sex);
            if(!!this.userData.userHeader) {
              this.$axios.$get('/api/image/' + this.userData.userHeader).then(res=>{
                this.userHeader = res
              })
            }
          }
        })
      },

      changImg(e) { //上传图片回显
        var that = this;
        for (var i = 0; i < e.target.files.length; i++) {
          var file = e.target.files.item(i);
          if (!(/^image\/.*$/i.test(file.type))) {
            continue; //不是图片 就跳出这一次循环
          }
          if(e.target.files[i].size > 1048576) { //大小不能超过1M
            this.$Message.warning('海报大小不能超过1M');
            continue
          }
          //实例化FileReader API
          var freader = new FileReader();
          freader.readAsDataURL(file);
          freader.onload = function(e) {
            document.getElementById('myImg').setAttribute('src',e.target.result);
            that.userHeader = e.target.result;
          }
        }
      },

      change(name, string) { //失去焦点是 验证昵称或者简介
        var reg = /^[\u4E00-\u9FA5A-Za-z0-9_\n\s\r]*$/;

        if(name === 'nickname') {
          if(!reg.test(string) || string.length < 2 || string.length > 50) {
            this.nicknameData.nicknameErr = '昵称至少2个字符,最多50个字符,仅允许输入:数字,字母,中文,下划线,中划线!'
            this.nicknameData.nicknameErrBor = true;
          }else {
            this.nicknameData.nicknameErr = '',
              this.nicknameData.nicknameErrBor = false;
          }
        };
        if(name === 'introduction') {
          if(reg.test(string) === false || string.length > 30) {
            this.introductionData.introductionErr = '简介最多30个字符,仅允许输入:数字,字母,中文,下划线,中划线!'
            this.introductionData.introductionErrBor = true;
          }else {
            this.introductionData.introductionErr = '',
              this.introductionData.introductionErrBor = false;
          }
        }
      },

      modify(name) { //点击修改 出现输入框光标
        if(name === 'nickname') {
          if(!!this.userData.nickNameUpdateTime) {
            this.$Message.warning('昵称只能修改一次');
          }else {
            this.$refs.nicknameCon.focus();
          }
        }
        if(name === 'introduction') {
          this.$refs.introductionCon.focus();
        }
      },

      async submit() { //提交修改用户基本资料
        var reg = /^[\u4E00-\u9FA5A-Za-z0-9_\n\s\r]*$/;
        if(!reg.test(this.userData.nickName) || this.userData.nickName.length < 2 || this.userData.nickName.length > 50) {
          this.nicknameData.nicknameErr = '昵称至少2个字符,最多50个字符,仅允许输入:数字,字母,中文,下划线,中划线!'
          this.nicknameData.nicknameErrBor = true;
          return
        }
        console.log(reg.test(this.userData.introduction))
        if(reg.test(this.userData.introduction) === false || this.userData.introduction.length > 30) {
          this.introductionData.introductionErr = '简介最多30个字符,仅允许输入:数字,字母,中文,下划线,中划线!'
          this.introductionData.introductionErrBor = true;
          return
        }
        console.log(111)
        await this.$axios({
          url: "/api/user/update_basic_info",
          method: "post",
          data: {
            introduction: this.userData.introduction, //简介
            nickName: this.userData.nickName, //昵称
            sex: this.userData.sex, //性别
            userHeader: this.userHeader, //头像
            userId: this.userData.id //用户id
          }
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.$Message.success("修改" + res.data.errorMsg);
            this.$parent.$parent.obtain() //父组件刷新
            this.obtain(); //组件刷新
          }
        }).catch(err=>{

        });
      },
    }
  }
</script>

<style scoped>
  /*头像*/
  .headPortrait {
    width: 120px;
    height: 120px;
    display: block;
    position: relative;
    background: url("//resource.jinse.com/www/v2/img/avatar.png");
    background-size: 120px 120px;
    border-radius: 50%;
    margin: 58px auto 0;
  }
  .headPortrait img {
    width: 120px;
    height: 120px;
    background-size: 120px 120px;
    display: block;
    border-radius: 50%;
  }
  .headPortrait .file {
    position: absolute;
    width: 77px;
    line-height: 28px;
    left: 22px;
    height: 28px;
    bottom: 21px;
    background: #FA322B;
    color: #f7ffff;
    text-align: center;
    overflow: hidden;
    font-style: normal;
  }
  .headPortrait .file input[name="file"] {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
  }
  /*内容*/
  .center li {
    height: 69px;
    border-bottom: 1px solid #E1E1E1;
    line-height: 69px;
    position: relative;
  }
  .center li:nth-last-child(1) {
    border-bottom: 0
  }
  .center .nickname .center_title i {
    color: #FA322B;
    width: 8px;
    height: 8px;
    position: relative;
    top: 2px;
    font-style: normal;
  }
  .center li .center_title span{
    position: absolute;
    left: 15px;
  }
  .center li .center_content{
    position: absolute;
    left: 110px;
  }
  .center .gender .center_content label {
    margin: 0px 40px 0px 15px;
  }
  .center .nickname .center_content input,
  .center .introduction .center_content input{
    border: 0;
    padding-left: 18px;
    font-size: 14px;
    color: #222;
    width: 625px;
    height: 40px;
    background: #fff;
  }
  .center .nickname .center_content .err,
  .center .introduction .center_content .err{
    border: 1px solid #f00;
  }
  .center .nickname a,
  .center .introduction a{
    font-size: 14px;
    color: #4C90F5;
  }
  .center .nickname .remind,
  .center .introduction .remind{
    line-height: 0px;
    color: #FA322B;
    font-style: normal;
    position: absolute;
    bottom: 7px;
    left: 0;
  }
  .btn {
    text-align: center;
    margin-top: 150px;
  }
  .submit {
    width: 114px;
    height: 40px;
    background: #ff3d00;
    color: #fffaff;
  }

</style>
