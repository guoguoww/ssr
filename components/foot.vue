<template>
    <footer>
      <div class="main">
        <p class="fl">京ICP备1111111111111号Copyright © 火鸟财经版权所有</p>
        <ul class="fr">
          <li class="fl">
            <nuxt-link to="/information/about">关于我们</nuxt-link>
          </li>
          <li class="fl">
            <nuxt-link to="/information/about">联系我们</nuxt-link>
          </li>
          <li class="fl">
            <nuxt-link to="/information/copyright">版权声明</nuxt-link>
          </li>
        </ul>
      </div>
    </footer>
</template>

<script>
  export default {
    name: "foot",
  }
</script>

<style scoped>
  footer {
    width: 100%;
    padding-top: 30px;
    background: #292a32;
  }
  .main {
    height: 130px;
    margin: 0 auto;
    width: 1170px;
    font-size: 14px;
  }
  .main p {
    line-height: 130px;
    padding-left: 30px;
    color: #999;
  }
  .main ul li {
    margin-right: 50px;
    line-height: 130px;
  }
  .main ul li a {
    color: #999;
  }
  .main ul li a:hover {
    text-decoration: underline;
  }
</style>
