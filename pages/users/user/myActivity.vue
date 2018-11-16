<template>
    <div>
      <div class="activity_header clearfix">
        <h4 class="fl">
          我的活动
        </h4>
        <span class="fr" @click="warning()">
          + 发布活动
        </span>
      </div>
      <p class="list_null">暂无相关活动，快去点击右上角发布一个吧！</p>
    </div>
</template>

<script>
  export default {
    name: "myActivity",
    methods: {
      warning () {
        this.$Message.warning('敬请期待');
      },
    }
  }
</script>

<style scoped>
  .activity_header {
    padding: 45px 0 20px;
    border-bottom: 1px solid #e0e0e0;
  }
  .activity_header h4 {
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }
  .activity_header span {
    font-size: 16px;
    color: #FA322B;
    cursor: pointer;
  }
  .activity_section p {
    margin: 200px 0;
    text-align: center;
    font-size: 14px;
    color: #999;
  }

  /*暂无*/
  .list_null {
    text-align: center;
    padding: 100px 0;
    height: 40px;
  }
</style>
