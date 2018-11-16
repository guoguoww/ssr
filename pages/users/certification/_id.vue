<template>
    <div style=" width: 1200px;margin: 0 auto;background: #fff;">
      <div class="certification">
        <!--进度条-->
        <ul class="progressOf">
          <li class="progress_bar">
            <span class="span_change">1</span>
            <i class="i_change"></i>
            <span class="span_change">2</span>
            <i></i>
            <span>3</span>
          </li>
          <li class="progressOf_name clearfix">
            <p class="fl progressOf_name_chenge">认证类型</p>
            <p class="fl progressOf_name_chenge progressOf_name_center">认证资料</p>
            <p class="fr">等待审核</p>
          </li>
        </ul>

        <!--认证内容-->
        <div class="certification_inf">
          <div class="certification_inf_tit">
            主体信息
          </div>
          <!--表单内容-->
          <div class="certification_inf_con">
            <!--企业-->
            <div class="certification_inf_con_form certification_inf_con_ent" v-if="router === 2">
              <div class="informationBox inputBox">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl">*</i>
                  <section class="fl">
                    <p>企业名称：</p>
                    <p></p>
                  </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <input type="text" v-model="certificationData.organizationName">
                </div>
              </div>
              <div class="informationBox inputBox">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl"></i>
                  <section class="fl">
                    <p>企业营业</p>
                    <p>执照注册号：</p>
                   </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <input type="text" v-model="certificationData.organizationCode">
                  <p>若有15位营业执照注册号或者统一社会信用代码请务必填写，并与营业执照上保持一致，若没有可暂时不填写</p>
                </div>

              </div>
              <div class="informationBox picBox">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl"></i>
                  <section class="fl">
                    <p>企业营业</p>
                    <p>执照扫描件：</p>
                  </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <div class="upload">
                    <input type="file" accept="image/*" @change="changImg('enterpriseName', $event)">
                    <img id="enterpriseName" src="" alt="">
                    <Icon  type="ios-add" />
                    <p style="display: none">重新上传</p>
                  </div>
                  <p>请上传营业执照扫描件，要求内容清晰可见，大小不超过5M</p>
                </div>
              </div>
            </div>
            <!--媒体-->
            <div class="certification_inf_con_form certification_inf_con_med"  v-if="router === 1">
              <div class="informationBox inputBox">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl">*</i>
                  <section class="fl">
                    <p>组织名称：</p>
                    <p></p>
                  </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <input type="text" v-model="certificationData.organizationName">
                </div>
              </div>
              <div class="informationBox inputBox">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl"></i>
                  <section class="fl">
                    <p>组织机构代码：</p>
                    <p></p>
                  </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <input type="text" v-model="certificationData.organizationCode">
                  <p>若有9位组织机构代码或者18位的统一社会信用代码请务必填写，若没有可暂时不填写</p>
                </div>

              </div>
              <div class="informationBox picBox">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl"></i>
                  <section class="fl">
                    <p>营业</p>
                    <p>执照扫描件：</p>
                  </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <div class="upload">
                    <input type="file" accept="image/*" @change="changImg('organizationName', $event)">
                    <img id="organizationName" src="" alt="">
                    <Icon  type="ios-add" />
                    <p style="display: none">重新上传</p>
                  </div>
                  <p>请上传营业执照扫描件，要求内容清晰可见，大小不超过5M</p>
                </div>
              </div>
            </div>
            <!--个人/公共-->
            <div class="certification_inf_con_form certification_inf_con_per">
              <div class="informationBox dropdownBox">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl">*</i>
                  <section class="fl">
                    <p>证件类型：</p>
                    <p></p>
                  </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <select v-model="certificate" @change="selectChage()">
                    <option v-for="(item,i) in certificates" :key="i" :value="item.value">
                      {{item.certificateType}}
                    </option>
                  </select>
                </div>
              </div>
              <div class="informationBox dropdownBox">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl">*</i>
                  <section class="fl">
                    <p>国家/地区：</p>
                    <p></p>
                  </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <select>
                    <option value="0">中国</option>
                    <!--<option v-for="(item,i) in certificates" :key="i" :value="item.value">-->
                      <!--{{item.certificateType}}-->
                    <!--</option>-->
                  </select>
                </div>
              </div>
              <!--证件姓名-->
              <div class="informationBox inputBox">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl">*</i>
                  <section class="fl">
                    <p>{{certificateTypeChage.certificateTypeName}}：</p>
                    <p></p>
                  </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <input type="text" v-model="certificationData.chnName">
                </div>
              </div>
              <!--证件号码-->
              <div class="informationBox inputBox">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl">*</i>
                  <section class="fl">
                    <p>{{certificateTypeChage.certificateTypeVal}}：</p>
                    <p></p>
                  </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <input type="text" v-model="certificationData.certificateNumber">
                </div>
              </div>
              <!--证件正面照-->
              <div class="informationBox picBox">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl">*</i>
                  <section class="fl">
                    <p>{{certificateTypeChage.certificateTypePicZ}}：</p>
                    <p></p>
                  </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <div class="upload">
                    <input type="file" accept="image/*" @change="changImg('certificateTypePicZ', $event)">
                    <img id="certificateTypePicZ" src="" alt="">
                    <Icon  type="ios-add" />
                    <p style="display: none">重新上传</p>
                  </div>
                  <p>支持jpeg、png等格式，照片大小不超过5M。</p>
                </div>
              </div>
              <!--证件反面照-->
              <div class="informationBox picBox" v-if="certificateTypeChage.certificateTypePicFShow">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl">*</i>
                  <section class="fl">
                    <p>{{certificateTypeChage.certificateTypePicF}}：</p>
                    <p></p>
                  </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <div class="upload">
                    <input type="file" accept="image/*" @change="changImg('certificateTypePicF', $event)">
                    <img id="certificateTypePicF" src="" alt="">
                    <Icon  type="ios-add" />
                    <p style="display: none">重新上传</p>
                  </div>
                  <p>支持jpeg、png等格式，照片大小不超过5M。</p>
                </div>
              </div>
              <div class="informationBox">
                <section class="renzheng-infor-div-left fl">
                  <i class="fl"></i>
                  <section class="fl">
                    <p></p>
                    <p></p>
                  </section>
                </section>
                <div class="renzheng-infor-div-right fr">
                  <Checkbox v-model="submitBtn">我已阅读并接受<nuxt-link to="">《火鸟媒体平台服务协议》</nuxt-link></Checkbox>
                </div>
              </div>
            </div>
          </div>
          <!--提交/返回 按钮-->
          <div class="certification_inf_btn clearfix">
            <a class="fl" href="javascript:void (0);" :class="submitBtn ? 'submitCan':'submitNocan'" @click="submitInf()">提交</a>
            <a class="fl return" href="javascript:void (0);" @click="back()">上一步</a>
          </div>
        </div>


      </div>
    </div>
</template>

<script>
    export default {
      name: "_id",
      data() {
        return {
          submitBtn: false, //提交按钮
          certificate: 0,  //证件类型初始
          certificates: [ //证件类型选择
            {
              certificateType: "身份证",
              value: 0
            },
            {
              certificateType: "港澳居民来往内地通行证",
              value: 1
            },
            {
              certificateType: "台湾居民来往大陆通行证",
              value: 2
            },
            {
              certificateType: "护照",
              value: 3
            },
          ],
          certificateTypeChage: {
            certificateTypeName: '身份证姓名',
            certificateTypeVal: '身份证号码',
            certificateTypePicZ: '身份证正面',
            certificateTypePicF: '身份证反面',
            certificateTypePicFShow: true, //证件反面照显示
            passportRegion: false, //护照地区选择
          },
          certificationData: {
            certificationType: '', //认证类型
            certificateType: '', //证件类型
            country: '', //国家名称
            chnName: '', //真实姓名
            certificateNumber : '', //证件号
            certificateFrontPhoto : '', //证件正面照片
            certificateBackPhoto : '', //证件照背面照片
            organizationName: '', //公司/组织名称
            organizationCode: '', //机构代码
            businessLicensePhoto: '', //营业执照照片
          },
        }
      },
      computed: {
        router() { //根据hash值判断导航改变
          var routerId = parseInt(this.$route.path.split('/')[3]);
          return routerId;
        }
      },
      methods: {
        back() { //返回上一级
          history.go(-1);
        },

        selectChage() { //选择证件类型 更改对应内容
          if(this.certificate === 0) {
            this.certificateTypeChage.certificateTypeName = '身份证姓名';
            this.certificateTypeChage.certificateTypeVal = '身份证号码';
            this.certificateTypeChage.certificateTypePicZ = '身份证正面';
            this.certificateTypeChage.certificateTypePicF = '身份证反面';
            this.certificateTypeChage.certificateTypePicFShow = true;
            this.certificateTypeChage.passportRegion = false;
          }
          if(this.certificate === 1 || this.certificate === 2) {
            this.certificateTypeChage.certificateTypeName = '证件姓名';
            this.certificateTypeChage.certificateTypeVal = '证件号码';
            this.certificateTypeChage.certificateTypePicZ = '证件正面照片';
            this.certificateTypeChage.certificateTypePicF = '证件反面照片';
            this.certificateTypeChage.certificateTypePicFShow = true;
            this.certificateTypeChage.passportRegion = false;
          }
          if(this.certificate === 3) {
            this.certificateTypeChage.certificateTypeName = '证件姓名';
            this.certificateTypeChage.certificateTypeVal = '证件号码';
            this.certificateTypeChage.certificateTypePicZ = '证件首页照片';
            this.certificateTypeChage.certificateTypePicF = '';
            this.certificateTypeChage.certificateTypePicFShow = false;
            this.certificateTypeChage.passportRegion = true;
          }
        },

        changImg(id, e) { //上传图片回显 //企业/组织营业执照 证件正反面
          var that = this;
          var id = id
          for (var i = 0; i < e.target.files.length; i++) {
            var file = e.target.files.item(i);
            if (!(/^image\/.*$/i.test(file.type))) {
              continue; //不是图片 就跳出这一次循环
            }
            if(e.target.files[i].size > 5242880) { //大小不能超过5M
              this.$Message.warning('海报大小不能超过5M');
              continue
            }
            //实例化FileReader API
            var freader = new FileReader();
            freader.readAsDataURL(file);
            freader.onload = function(e) {
              document.getElementById(id).setAttribute('src',e.target.result);
              if(id === 'certificateTypePicZ') {
                that.certificationData.certificateFrontPhoto = e.target.result
              }
              if(id === 'certificateTypePicF') {
                that.certificationData.certificateBackPhoto = e.target.result
              }
              if(id === 'enterpriseName' || id === 'organizationName') {
                that.certificationData.businessLicensePhoto = e.target.result
              }
            }
          }
        },

        async submitInf() { //提交按钮
          if(this.submitBtn) {
            this.certificationData.certificationType = this.router; //认证类型
            this.certificationData.certificateType = this.certificate; //证件类型
            this.certificationData.country = '中国'; //国家
            if(this.certificationData.certificationType !== 0) {
              if(!this.certificationData.organizationName) {
                this.$Message.error('请输入组织名称');
                return;
              }
              if(!this.certificationData.organizationCode) {
                this.$Message.error('请输入机构代码');
                return;
              }
              if(!this.certificationData.businessLicensePhoto) {
                this.$Message.error('请上传营业执照');
                return;
              }
            }
            if(!this.certificationData.chnName) {
              this.$Message.error('请输入证件姓名');
              return;
            }
            if(!/^[\u4e00-\u9fa5]+$/gi.test(this.certificationData.chnName)) {
              this.$Message.error('姓名只能输入中文');
              return;
            }
            if(!this.certificationData.certificateNumber) {
              this.$Message.error('请输入证件号码');
              return;
            }
            if(this.certificationData.certificateType === 0 && !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.certificationData.certificateNumber)) {
              this.$Message.error('身份证号码不合法');
              return;
            }
            if(!this.certificationData.certificateFrontPhoto) {
              this.$Message.error('请上传证件正面照');
              return;
            }
            if(this.certificationData.certificateType !== 3 && !this.certificationData.certificateBackPhoto) {
              this.$Message.error('请上传证件反面照');
              return;
            }
            if(this.certificationData.certificateType === 3) { //证件类型是护照 不会出现证件反面照
              this.certificationData.certificateBackPhoto = ''
            }

            await this.$axios({
              url: "/api/user/certification",
              method: "post",
              data: this.certificationData
            }).then(res=>{
              if(res.data.errorCode === 0){
                this.$Message.success("提交" + res.data.errorMsg);
                this.$router.push({
                  path: '/users/certification/subSuccess'
                });
              }
            }).catch(err=>{

            });
          }
        },
      }
    }
</script>

<style scoped>
  .certification {
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

  /*填入内容*/
  .certification_inf {
    padding-top: 60px;
  }
  /*填入内容标题*/
  .certification_inf .certification_inf_tit {
    font-size: 16px;
    color: #222;
    letter-spacing: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #E1E1E1;
    font-weight: 600;
  }
  /*填入内容表单*/
  .certification_inf .certification_inf_con  .certification_inf_con_form {
    padding-top: 30px;
    border-bottom: 1px solid #E1E1E1;
  }
  .certification_inf .certification_inf_con  .certification_inf_con_form .informationBox {
    width: 100%;
    display: -webkit-inline-flex;
    padding-bottom: 36px;
  }
  .certification_inf .certification_inf_con  .certification_inf_con_form .informationBox .renzheng-infor-div-left {
    display: block;
    width: 116px;
    padding-top: 6px;
  }
  .certification_inf .certification_inf_con  .certification_inf_con_form .informationBox .renzheng-infor-div-left i {
    color: #FA322B;
    font-style: normal;
    width: 8px;
    height: 8px;
  }
  .certification_inf .certification_inf_con  .certification_inf_con_form .informationBox .renzheng-infor-div-left p {
    margin-left: 12px;
    font-size: 14px;
    color: #555;
    letter-spacing: 0;
    line-height: 14px;
    padding-bottom: 5px;
  }
  /*填写输入框样式*/
  .certification_inf .certification_inf_con  .certification_inf_con_form .inputBox .renzheng-infor-div-right input {
    background: #FFF;
    border: 1px solid #E1E1E1;
    width: 660px;
    height: 44px;
    padding-left: 12px;
    font-size: 18px;
  }
  .certification_inf .certification_inf_con  .certification_inf_con_form .inputBox .renzheng-infor-div-right input:hover {
    border: 1px solid #FA322B;
  }
  .certification_inf .certification_inf_con  .certification_inf_con_form .inputBox .renzheng-infor-div-right input:focus {
    border: 1px solid #FA322B;
    outline: none;
  }
  .certification_inf .certification_inf_con  .certification_inf_con_form .inputBox .renzheng-infor-div-right p {
    width: 664px;
    font-size: 14px;
    color: #888;
    letter-spacing: 0;
    line-height: 20px;
    padding-top: 10px;
  }
  /*图片上传样式*/
  .certification_inf .certification_inf_con  .certification_inf_con_form .picBox .renzheng-infor-div-right .upload {
    width: 220px;
    height: 130px;
    margin-bottom: 15px;
    background: #FAFAFA;
    border: 1px dashed #d1d1d1;
    position: relative;
  }
  .certification_inf .certification_inf_con  .certification_inf_con_form .picBox .renzheng-infor-div-right .upload input {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 201;
    background: #FA322B;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
    font-style: normal;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .certification_inf .certification_inf_con  .certification_inf_con_form .picBox .renzheng-infor-div-right .upload img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .certification_inf .certification_inf_con  .certification_inf_con_form .picBox .renzheng-infor-div-right .upload i {
    width: 30px;
    height: 30px;
    position: absolute;
    left: calc(50% - 25px);
    top: calc(50% - 25px);
    font-size: 50px;
    color: #d1d1d1
  }
  .certification_inf .certification_inf_con  .certification_inf_con_form .picBox .renzheng-infor-div-right .upload p {
    background: #101d32;
    border-radius: 2px;
    font-size: 12px;
    color: #FFF;
    letter-spacing: 0;
    width: 68px;
    height: 28px;
    position: absolute;
    top: calc(50% - 14px);
    left: calc(50% - 34px);
    line-height: 28px;
    text-align: center;
  }
  /*下拉菜单样式*/
  .certification_inf .certification_inf_con  .certification_inf_con_form .dropdownBox .renzheng-infor-div-right select {
    background: #FFF;
    border: 1px solid #E1E1E1;
    min-width: 92px;
    height: 44px;
    padding-left: 6px;
    font-size: 14px;
    color: #333;
    border-radius: 4px;
    padding-right: 6px;
    -webkit-appearance: menulist;
  }
  .certification_inf .certification_inf_con  .certification_inf_con_form .dropdownBox .renzheng-infor-div-right select:focus {
    border: 1px solid #E1E1E1;
    outline: none;
  }

  /*提交按钮*/
  .certification_inf .certification_inf_btn {
    padding: 40px 260px;
  }
  .certification_inf .certification_inf_btn a {
    width: 107px;
    height: 45px;
    display: inline-block;
    line-height: 45px;
    text-align: center;
    border-radius: 2px;
    font-size: 20px;
    color: #fff;
  }
  .certification_inf .certification_inf_btn .submitNocan {
    cursor: not-allowed !important;
    background: #ccc !important;
    border: 1px solid #ccc !important;
  }
  .certification_inf .certification_inf_btn .submitCan {
    background: #FA322B;
    border: 1px solid #FA322B;
    color: #FFF;
  }
  .certification_inf .certification_inf_btn .return {
    margin-left: 40px;
    background: #FFF;
    border: 1px solid #999;
    color: #999;
  }

</style>
