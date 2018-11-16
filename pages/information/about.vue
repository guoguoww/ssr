<template>
    <div class="about">
      <div class="poto">
        <img alt="火鸟区块链" src="../../assets/information/aboutLogo.png">
        <div class="topbody">在这里，读懂区块链</div>
        <div class="borromBody">火鸟区块链是集行业新闻、资讯、行情、数据、百科、社区等一站式区块链产业服务平台，我们追求及时、全面、专业、准确的资讯与数据，致力于为区块链创业者以及数字货币投资者提供最好的产品和服务。</div>
      </div>
      <div class="service">
        <div class="about_we">
          <h4 class="about_we_title">
            <span></span>
            关于我们
          </h4>
          <p>火鸟，专注于区块链产业的服务平台。</p>
          <p>通过深度的报道，传递行业声音。</p>
          <p>通过最快的信息，正确投资决策。</p>
          <p>通过温暖的孵化，助力创业成功。</p>
        </div>
        <div class="about_we">
          <h4 class="about_we_title">
            <span></span>
            服务优势
          </h4>
          <p>火鸟区块链是多家搜索引擎新闻源合作媒体，并且和和讯、腾讯、猎云、新浪、网易、今日头条、一条新闻等数十家财经及科技媒体达成内容合作。</p>
          <p>截止到2017年7月，火鸟区块链已有1000余家企业、个人自媒体、行情分析师入驻平台，每日200篇以上的内容输出；</p>
          <p>近3月以来，火鸟区块链日均UV(独立访客)35万，高峰时100万，已成为区块链行业最具影响力的服务平台之一。</p>
        </div>
        <ul class="cooperation">
          <li class="cooperation_item">
            <h4>市场合作</h4>
            <p>marketing@jinse.com</p>
          </li>
          <li class="cooperation_item">
            <h4>媒体合作</h4>
            <p>media@jinse.com</p>
          </li>
          <li class="cooperation_item">
            <h4>寻求报道</h4>
            <p>media@jinse.com</p>
          </li>
          <li class="cooperation_item">
            <h4>广告合作</h4>
            <p>微信号 jinsecaijing</p>
          </li>
          <li class="cooperation_item">
            <h4>具体地址</h4>
            <p>北京市海淀区上地三街9号嘉华大厦D座701</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default {
    name: "about"
  }
</script>

<style scoped>
  .about {
    width: 1200px;
    margin: 0 auto 30px;
    background: #fff;
  }
  .about .poto {
    height: 400px;
    font-weight: 200;
    background: url('../../assets/information/aboutbg.png') no-repeat;
    text-align: center;
    padding-top: 80px;
    color: #fff;
  }
  .about .poto img {
    width: 336px;
    height: 64px;
  }
  .about .topbody {
    line-height: 60px;
    font-size: 22px;
    padding-top: 20px;
  }
  .about .borromBody {
    width: 550px;
    margin: 0 auto;
  }
  .about .service {
    font-size: 18px;
    line-height: 40px;
    padding: 30px 0;
  }
  .about .service .about_we {
    margin-bottom: 50px;
    padding: 0 30px;
  }
  .about .service .about_we .about_we_title {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 18px;
  }
  .about .service .about_we .about_we_title span {
    width: 7px;
    height: 7px;
    display: inline-block;
    margin-right: 6px;
    margin-bottom: 2px;
    border-radius: 3.5px;
    background: #ff2d55;
  }
  .about .service .about_we p {
    margin-left: 20px;
    font-size: 16px;
    color: #555;
  }
  .about .cooperation {
    padding: 0 50px;
    line-height: 30px;
    overflow: hidden;
  }
  .about .cooperation .cooperation_item {
    float: left;
    margin-bottom: 50px;
    padding-top: 30px;
    width: 366px;
  }
  .about .cooperation .cooperation_item h4 {
    font-weight: bold;
    font-size: 18px;
  }
  .about .cooperation .cooperation_item p {
    font-size: 16px;
  }
</style>
