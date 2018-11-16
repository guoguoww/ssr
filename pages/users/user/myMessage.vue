<template>
    <div>
      <div class="message_header">
        <h4>
          我的消息
        </h4>
      </div>
      <ul class="message_list" v-if="msgList.length !== 0">
        <li class="message_item" v-for="(item,i) in msgList" :key="i">
          <div class="message_item_head clearfix">
            <p class="message_item_tit fl" :class="item.readStatus === 0 ? 'unread':'readMsg'">{{item.title }}</p>
            <p class="message_item_date fl">{{item.createTime}}</p>
            <p class="readTag fl" v-if="item.readStatus === 0" @click="readMsg(item.id)">标记已读</p>
            <p class="read fl" v-if="item.readStatus === 1">已读</p>
          </div>
          <div class="message_item_con">
            {{item.content}}
          </div>
          <div class="message_item_foot clearfix">
            <span class="fl">消息类型：首页通告</span>
            <span class="fr delete"  @click="cancelMsg(item.id)">删除</span>
          </div>
        </li>
      </ul>
      <p class="list_null" v-if="msgList.length === 0">暂无消息...</p>
      <!--分页器-->
      <div class="message_page" v-if="msgList.length !== 0">
        <Page :total="total" :page-size="page.rows" show-elevator @on-change="pageChange" />
      </div>
    </div>
</template>

<script>
  export default {
    name: "myMessage",
    data() {
      return {
        msgList: [],
        total: 0, //总条数
        page: {
          start: 0, //第几页
          rows: 10, //每页N条
        }
      }
    },
    created() {
      this.obtain(); //初始运行获取函数
    },
    methods: {
      async obtain() { //获取消息列表
        await this.$axios({
          url: '/api/user/query_user_message',
          method: "post",
          params: this.page
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.total = res.data.data.total;
            this.msgList = res.data.data.data;
          }
        })
      },
      async readMsg(id) { //标记已读
        await this.$axios({
          url: '/api/user/read_message',
          method: "get",
          params: {
            messageIds: id
          }
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.obtain();
            this.$parent.getNotread() //父组件刷新
          }
        })
      },
      async cancelMsg(id) { //删除
        await this.$axios({
          url: '/api/user/delete_message',
          method: "get",
          params: {
            messageIds: id
          }
        }).then(res=>{
          if(res.data.errorCode === 0){
            this.$Message.success('删除成功');
            this.obtain();
            this.$parent.obtain() //父组件刷新
          }
        })
      },
      pageChange(page) { //分页操作
        this.page.start = this.page.rows * (page-1);
        this.obtain();
      }
    }
  }
</script>

<style scoped>
  /*头部*/
  .message_header {
    padding: 45px 0 20px;
    border-bottom: 1px solid #e0e0e0;
  }
  .message_header h4 {
    font-size: 16px;
    color: #333;
    font-weight: 600;
  }
  /*内容列*/
  .message_list {
    min-height: 600px;
    padding-top: 7px;
  }
  .message_list .message_item {
    padding: 10px 0px;
    border-bottom: 1px dashed #e0e0e0;
  }
  .message_list .message_item .message_item_head,
  .message_list .message_item .message_item_foot{
    height: 30px;
    line-height: 30px;
    margin: 10px 0px;
  }
  .message_list .message_item .message_item_head .message_item_tit {
    width: 590px;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    font-weight: bold;
    cursor: pointer;
  }
  .message_list .message_item .message_item_head .readMsg {
    color: #515a6e
  }
  .message_list .message_item .message_item_head .unread {
    color: #FA322B
  }
  .message_list .message_item .message_item_head .message_item_date {
    width: 150px;
  }
  .message_list .message_item .message_item_head .read {
    width: 60px;
    text-align: center;
    margin: 0 20px;
    font-size: 12px;
  }
  .message_list .message_item .message_item_head .readTag,
  .message_list .message_item .message_item_foot .delete{
    width: 60px;
    text-align: center;
    margin: 0 20px;
    border-bottom: 1px solid #888;
    /*border-radius: 30px;*/
    cursor: pointer;
    font-size: 12px;
  }
  .message_list .message_item .message_item_head .readTag:hover {
    color: #FA322B;
    border: 1px solid #FA322B;
  }
  .message_list .message_item .message_item_con {
    width: 740px;
  }
  .message_list .message_item .message_item_foot .delete:hover {
    color: #FA322B;
    border: 1px solid #FA322B;
  }
  /*分页*/
  .message_page {
    text-align: right;
    margin: 30px 0;
  }

  /*暂无*/
  .list_null {
    text-align: center;
    padding: 100px 0;
    height: 40px;
  }

</style>
