<template>
  <div class="user-chat">
    <!--    导航栏-->
    <van-nav-bar
      class="app-nav-bar"
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
    />
    <!--    导航栏-->
    <van-cell-group class="message-list">
      <van-cell
        :title="item.msg"
        v-for="(item, index) in messages"
        :key="index"
      />
    </van-cell-group>

    <!-- 发送消息-->
    <van-cell-group class="send-message-wrap" ref="message-list">
      <van-field
        v-model="message"
        placeholder="请输入消息"
        :border="false"
      />
      <van-button type="primary" size="small" @click="onSend">发送</van-button>
    </van-cell-group>




  </div>
</template>

<script>
  import io from 'socket.io-client'
  import { getItem,setItem } from "@/utils/storage";

  export default {
    name: "UserChat",
    components: {},
    props: {},
    data () {
      return {
        message:'',
        socket: null,
        messages:getItem('chat-messages') || []
      }
    },
    computed: {},
    watch: {
      messages () {
        setItem('chat-messages', this.messages)
        this.$nextTick(() => {
          this.scollToBottom()
        })
      }
    },
    created () {
      const socket = io('http://ttapi.research.itcast.cn')
      this.socket = socket
      socket.on('connect', () => {
        console.log('连接建立成功了')
      })
      socket.on('disconnect', () => {
        console.log('断开连接了')
      })

      socket.on('message', data => {
        this.messages.push(data)
      })

    },
    mounted () {
      this.scollToBottom()
    },
    methods: {
      onSend () {
        const data = {
          msg: this.message,
          timestamp: Date.now()
        }
        this.socket.emit('message', data)

        this.messages.push(data)

        this.message = ''
      },

      scrollToBottom () {
        const list = this.$refs['messgae-list']
        list.scrollTop = list.scrollHeight
      }
    }
  }
</script>

<style scoped lang="less">
  .message-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow: auto;
  }
  .send-message-wrap{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    padding: 0 14px;
    align-items: center;

  }

</style>
