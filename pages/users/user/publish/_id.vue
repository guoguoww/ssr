<template>
    <div>
      <!--头部-->
      <div class="article_header">
        <h4>
          发表文章
        </h4>
      </div>
      <div class="details article_posters clearfix">
        <div class="details_left fl">
          <p>文章海报图片：</p>
        </div>
        <div class="article_posters_right fl">
          <img class="fl" id="posters" :src="articleData.image? articleData.image :'http://www.corp001.com/templates/default/shop/images/errors.jpg'" alt="">
          <div class="file fl">
            <input type="file" name="file" accept="image/*" @change="changImg($event)"> 上传文件
          </div>
        </div>
      </div>
      <div class="details article_title clearfix">
        <div class="details_left fl">
          <p>文章名称：</p>
        </div>
        <div class="article_title_right fl">
          <input type="text" v-model="articleData.title">
        </div>
      </div>
      <div class="details article_type clearfix">
        <div class="details_left fl">
          <p>文章类型：</p>
        </div>
        <div class="article_type_right fl">
          <select v-model="articleData.type">
            <option v-for="(item,i) in articleTypes" :key="i" :value="item.value">
              {{item.articleTypeName}}
            </option>
          </select>
        </div>
      </div>
      <div class="details article_introduction clearfix">
        <div class="details_left fl">
          <p>文章导语：</p>
        </div>
        <div class="article_introduction_right fl">
          <textarea name="" cols="30" rows="10" v-model="articleData.introduction"></textarea>
        </div>
      </div>
      <div class="details article_theme clearfix">
        <div class="details_left fl">
          <p>文章主题：</p>
        </div>
        <div class="article_theme_right fl">
          <div id="quill-editor" class="quill-editor"
               :content="articleData.content"
               @change="onEditorChange($event)"
               v-quill:myQuillEditor="editorOption" >
          </div>
        </div>
      </div>
      <!--按扭区-->
      <div class="publish_btn clearfix">
        <a class="fl" href="javascript:void (0);" @click="openPhone(0)">提交审核</a>
        <a class="fl" href="javascript:void (0);" @click="openPhone(1)">存至草稿</a>
      </div>

      <!--朦版-->
      <div class="background-000" v-if="mengPlate"></div>
      <!--成功返回模态框-->
      <div class="modify modify_success" v-if="modelShow">
        <i></i>
        <span class="setSuccess">{{success}}</span>
        <nuxt-link to="/users/user/myArticle">返回我的文章</nuxt-link>
      </div>



    </div>
</template>

<script>
  import Vue from 'vue'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  if (process.browser) {
    const VueQuillEditor = require('vue-quill-editor/dist/ssr')
    Vue.use(VueQuillEditor)
  }
  export default {
    name: "_id",
    data() {
      return {
        success: '', //操作成功回调
        mengPlate: false, //朦版
        modelShow: false, //模态
        articleType: 1, //默认为1
        articleTypes: [ //文章类型选择
          {
            articleTypeName: "政策",
            value: 1
          },
          {
            articleTypeName: "对话",
            value: 2
          },
          {
            articleTypeName: "行情",
            value: 3
          },
          {
            articleTypeName: "投研",
            value: 4
          },
          {
            articleTypeName: "评级",
            value: 5
          },
          {
            articleTypeName: "技术",
            value: 6
          },
          {
            articleTypeName: "百科",
            value: 7
          },
        ],
        editorOption: { //富文本编译器的配置项
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'], //加粗 斜体 下划线 删除线
              ['blockquote', 'code-block'], //引用  代码块
              [{ 'header': 1 }, { 'header': 2 }], //标题1 标题2
              [{ 'list': 'ordered' }, { 'list': 'bullet' }], //列表
              // [{ 'script': 'sub' }, { 'script': 'super' }], //上标下标
              [{ 'indent': '-1' }, { 'indent': '+1' }], //缩进
              [{ 'direction': 'rtl' }], //文本方向
              // [{ 'size': ['small', false, 'large', 'huge'] }], //大小
              // [{ 'header': [1, 2, 3, 4, 5, 6, false] }], //标题
              // [{ 'font': [] }], //字体
              [{ 'color': [] }, { 'background': [] }], //颜色 /背景
              [{ 'align': [] }], //本本对齐
              ['clean'], //清除字体样式
              ['link', 'image'] // 链接 图片
            ]
          }
        },
        articleData: {
          image: '', //海报
          title: '', //文章标题
          type:  1, //文章类型
          introduction: '', //文章导语
          content: ' ', //文章内容
          articleId: null, //文章id
        }
      }
    },
    computed: {
      router() { //根据hash值判断导航改变
        var routerId = this.$route.path.split('/')[4];
        return routerId;
      }
    },
    created() {
      this.obtainUserData() //判断是否可以发表文章
      this.obtain(); //初始运行获取函数
    },
    methods: {
      async obtainUserData() { //获取登陆用户资料
        await this.$axios.$post('/api/user/query_active_user').then(res=>{
          if(res.errorCode === 0){
            if(res.data.authStatus === 0 || res.data.authStatus === 1) {
              this.$Message.warning('请实名认证后再来发表文章');
              this.$router.push({ //跳转到认证页面
                path: "/users/user/realName"
              });
            }
            if(res.data.authStatus === 3) {
              this.$Message.error('认证未通过 请重新认证');
              this.$router.push({ //跳转到认证页面
                path: "/users/user/realName"
              });
            }
          }
        })
      },

      async obtain() { //草稿状态进入获取内容
        if(this.router != 0) {
          await this.$axios({
            url: "/api/article/findarticle",
            method: "post",
            params: {
              articleId: this.router
            }
          }).then(res=>{
            if(res.data.errorCode === 0){
              this.articleData = res.data.data[0]
              if(!!this.articleData.image) {
                this.$axios.$get('/api/image/' + this.articleData.image).then(res=>{
                  this.articleData.image = res
                })
              }
            }
          })
        }
      },


      changImg(e) { //上传海报回显
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
            document.getElementById('posters').setAttribute('src',e.target.result);
            that.articleData.image = e.target.result
          }
        }
      },

      onEditorChange({ editor, html, text }) { //富文本内容更改时 赋值到传送的数据上
        // console.log('editor change!', editor, html, text)
        this.articleData.content = html;
      },

      async openPhone(stats){ //提交/存入草稿
        if(!this.articleData.image) {
          this.$Message.error('未上传海报');
          return
        }
        if(!this.articleData.title) {
          this.$Message.error('未输入文章标题');
          return
        }
        if(!this.articleData.introduction) {
          this.$Message.error('未输入文章导语');
          return
        }
        if(!this.articleData.content) {
          this.$Message.error('未输入文章内容');
          return
        }
        if(stats === 0) {
          if(this.router != 0) {
            this.articleData.articleId = this.router
          }
          await this.$axios({
            url: "/api/article/savearticle",
            method: "post",
            data: {
              image: this.articleData.image, //海报
              title: this.articleData.title, //文章标题
              type:  this.articleData.type, //文章类型
              introduction: this.articleData.introduction, //文章导语
              content: this.articleData.content, //文章内容
              articleId: this.articleData.articleId, //文章id
            }
          }).then(res=>{
            if(res.data.errorCode === 0){
              this.modelShow = true;
              this.mengPlate = true;
              this.success = '文章提交审核成功，请等待审核结果'
            }
          })
        }
        if(stats === 1) {
          if(this.router != 0) {
            this.articleData.articleId = this.router
          }
          await this.$axios({
            url: "/api/article/savedrafts",
            method: "post",
            data: {
              image: this.articleData.image, //海报
              title: this.articleData.title, //文章标题
              type:  this.articleData.type, //文章类型
              introduction: this.articleData.introduction, //文章导语
              content: this.articleData.content, //文章内容
              articleId: this.articleData.articleId, //文章id
            }
          }).then(res=>{
            if(res.data.errorCode === 0){
              this.modelShow = true;
              this.mengPlate = true;
              this.success = '文章存入草稿成功'
            }
          })
        }
      },
    }
  }
</script>

<style scoped>
  /*头部*/
  .article_header {
    padding: 45px 0 20px;
    border-bottom: 1px solid #e0e0e0;
  }
  .article_header h4 {
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }
  .details {
    width: 100%;
    margin: 10px 0;
  }
  .details .details_left {
    width: 100px;
    margin-right: 20px;
  }
  /*海报上传*/
  .article_posters_right {
    height: 160px;
    padding: 10px 0px;
  }
  .article_posters_right img {
    width: 300px;
    height: 140px;
    margin: 0 60px;
  }
  .article_posters_right .file {
    width: 77px;
    height: 28px;
    line-height: 28px;
    margin-top: 50px;
    background: #FA322B;
    color: #f7ffff;
    text-align: center;
    overflow: hidden;
    font-style: normal;
    position: relative;
  }
  .article_posters_right .file input[name="file"] {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
  }
  /*文章名称*/
  .article_title_right input {
    width: 650px;
    height: 40px;
    padding-left: 12px;
    border-radius: 2px 0 0 2px;
    border: 1px solid #E1E1E1;
  }
  .article_title_right input:hover {
    border: 1px solid #FA322B;
  }
  .article_title_right input:focus {
    border: 1px solid #FA322B;
    outline:none;
  }
  /*类型选择*/
  .article_type_right select {
    width: 650px;
    height: 40px;
    padding-left: 8px;
    border-radius: 2px 0 0 2px;
    border: 1px solid #E1E1E1;
  }
  /*文章导语*/
  .article_introduction_right textarea {
    width: 650px;
    height: 150px;
    padding-left: 12px;
    border: 1px solid #E1E1E1;
    resize: none;
  }
  /*文章主题*/
  .article_theme_right {
    width: 650px;
  }
  .article_theme_right .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }

  /*按扭区*/
  .publish_btn {
    width: 100%;
    padding: 15px 170px;
  }
  .publish_btn a {
    width: 103px;
    height: 39px;
    line-height: 40px;
    text-align: center;
    display: block;
    background: #FA322B;
    border: .5px solid #FA322B;
    border-radius: 2px;
    color: #fff;
    margin: 0 70px;
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
