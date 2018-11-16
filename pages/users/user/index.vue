<template>
  <div>
    <ul class="center_router clearfix">
      <li class="fl">
        <nuxt-link to="/users/user" :class="{'active':router === '/users/user'}">
          基础设置
        </nuxt-link>
      </li>
      <li class="fl">
        <nuxt-link to="/users/user/realName" :class="{'active':router === '/users/user/realName'}">
          实名认证
        </nuxt-link>
      </li>
      <li class="fl">
        <nuxt-link to="/users/user/security" :class="{'active':router === '/users/user/security'}">
          账号安全
        </nuxt-link>
      </li>
    </ul>
    <nuxt-child/>
  </div>
</template>

<script>
  export default {
    name: "index",
    computed: {
      //根据hash值判断导航改变
      router() {
        return this.$route.path;
      }
    }
  }
</script>

<style scoped>
  .center_router {
    padding: 45px 0 12px;
    border-bottom: 1px solid #e0e0e0;
  }
  .center_router li {
    height: 13px;
    line-height: 13px;
    font-size: 16px;
    margin-right: 36px;
  }
  .center_router li .active {
    font-weight: bold;
    color: #000104;
  }




</style>
