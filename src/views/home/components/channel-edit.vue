<template>
  <div class="channel-edit">

    <!--我的频道-->
    <van-cell center :border="false">
      <div slot="title" class="channel-title">我的频道</div>
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = !isEdit"
      >{{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <!--:icon="isEdit ? 'clear' : ''"属于二次元规则
    isEdit && index !== 0编辑状态并且不为0
    :class="{ active: index === 激活的频道 } 条件判断为true就作用，判断为false就不作用"
    -->
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: index === active }"
        :icon="(isEdit && index !== 0) ? 'clear' : ''"
        v-for="(channel, index) in userChannels"
        :key="index"
        :text="channel.name"
        @click="onUserChannelClick(channel, index)"
      />
    </van-grid>

    <!--频道推荐-->

    <van-cell center :border="false">
      <div slot="title" class="channel-title">频道推荐</div>
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel,index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>


  </div>
</template>

<script>
  import { getAllChannels,addUserChannel,deleteUserChannel } from "@/api/channel";
  import { mapState } from 'vuex'
  import { setItem} from "@/utils/storage";

  export default {
    name: "ChannelEdit",
    components: {},
    props: {
      //userChannels='user-channel' 驼峰表示法代表-
      userChannels: {
        type: Array,
        required: true
      },
      active: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        allChannels: [], //所有频道数据列表
        isEdit:false,//控制编辑显示状态


      }
    },
    computed: {
      ...mapState(['user']),
      //推存的频道列表
      recommendChannels () {
        //思路：所有频道-我的频道=剩下的推存频道
        //filter 方法：满足所有条件的元素，过滤数据，根据方法返回的布尔值true来收集数据
        //1 方法一
        return  this.allChannels.filter(channel => {
          //判断channel是否属于用户频道
          //find查找满足单个条件的元素
            return !this.userChannels.find(userChannel => {
              //找到满足该条件的元素
              return userChannel.id === channel.id
          })
        })

        //2
        // const arr = []
        //
        // this.allChannels.forEach(channel => {
        //   let flag = false
        //   for (let i =0; i < this.userChannels.length; i++) {
        //     if (this.userChannels[i].id !== channel.id) {
        //       flag = true
        //       break
        //     }
        //   }
        //   if (!flag) {
        //     arr.push(channel)
        //
        //   }
        // })
        // return arr

      }

    },
    watch: {},
    created () {
      this.loadAllChannels()
    },
    mounted () {},
    methods: {
      async loadAllChannels () {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      },
      async onAdd (channel) {
        this.userChannels.push(channel)

        // 数据持久化
        if (this.user) {
          //登录了，数据存储到线上
          await addUserChannel({
            channels: [
              { id: channel.id,
                seq: this.userChannels.length
              }
            ]
          })
        } else {
          //没有登录，数据存储到本地
          setItem('user-channels',this.userChannels)
        }
      },


      onUserChannelClick (channel, index) {

        if (this.isEdit) {
          //编辑状态，删除频道
          this.deleteChannel(channel, index)
        } else {
          //非编辑状态，切换频道
          this.switchChannel(index)
        }
      },

      async deleteChannel (channel, index) {
        //console.log('删除频道',index)
        //如果删除的是当前激活频道之前的频道
        if (index <= this.active) {
          //更新激活频道的索引
          this.$emit('update-active',this.active -1)
        }
        this.userChannels.splice(index, 1)

        //数据持久化
        if (this.user) {
          //登录了，持久化到线上
          await deleteUserChannel(channel.id)

        } else {
          //没有登录，持久化到本地
          setItem('user-channel', this.userChannels)
        }
      },
      switchChannel (index) {
        //console.log('切换频道',index)
        //切换频道
        this.$emit('update-active', index)

        //关闭弹出层
        this.$emit('close')
      }

    }
  }
</script>

<style scoped lang="less">
  .channel-edit {
    padding-top: 54px;
    .channel-title {
      font-size: 16px;
      color: #333333;
    }
    .grid-item {
      width: 80px;
      height: 43px;
      /deep/ .van-grid-item__content {
        background-color: #f5f5f6;
        .van-grid-item__text {
          color: #222;
          font-size: 14px;
          margin-top: 0;
        }
      }
      /deep/ .van-grid-item__icon {
        position: absolute;
        right: -5px;
        top: -5px;
        font-size: 20px;
        color: #ccc;

      }

      }
    .active {
      /deep/ .van-grid-item__text {
        color: red !important;
      }

    }
  }

</style>
