<template>
  <div class="home-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        to="/search"
        round
      >搜索
      </van-button>
    </van-nav-bar>
    <!--导航栏-->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!--文章列表-->
        <article-list :channel="channel"/>
      </van-tab>

      <div slot="nav-right" class="wap-nav-placeholder"></div>

      <div
        slot="nav-right"
        @click="isChannelEditShow=true"
        class="wap-nav-wrap"
      >
        <van-icon name="wap-nav" />
      </div>

    </van-tabs>
    <!--弹出层-->
    <van-popup
      v-model="isChannelEditShow"
      position="bottom"
      class="channel-edit-popup"
      closeable
      close-icon-position="top-left"
      get-container="body"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :user-channels="channels"
        :active="active"
        @close="isChannelEditShow = false"
        @update-active="active = $event"
      />
    </van-popup>
  </div>
</template>

<script>
  import { getUserChannels } from "@/api/user";
  import ArticleList from './components/article-list'
  import ChannelEdit from './components/channel-edit'
  import { mapState } from 'vuex'
  import { getItem } from "@/utils/storage"

  export default {
    name: "HomeIndex",
    components: {
      ArticleList,
      ChannelEdit
    },
    props: {},
    data () {
      return {
        active: 0,
        channels: [],
        isChannelEditShow: false,
      }
    },
    computed: {
      ...mapState(['user'])
    },
    watch: {},
    created () {
      this.loadChannels()
    },
    mounted () {},
    methods: {
      async loadChannels () {
        //获取频道数据
        // const { data } = await getUserChannels()
        // //console.log(data)
        // this.channels = data.data.channels

        try {
          let channels = []
          if (this.user) {
            // 已登录，请求获取线上的频道数据
            const { data } = await getUserChannels()
            channels = data.data.channels
          } else {
            // 未登录
            const localChannels = getItem('user-channels')
            if (localChannels) {
              // 有本地频道数据，则使用
              channels = localChannels
            } else {
              // 没有本地频道数据，则请求获取默认推荐的频道列表
              const { data } = await getUserChannels()
              channels = data.data.channels
            }
          }

          // 将数据更新到组件中
          this.channels = channels
        } catch (err) {
          console.log(err)
          this.$toast('数据获取失败')
        }



      }

      // onUpdateActive (index) {
      //   //console.log(index)
      //   this.active = index
      // }
      // getContainer() {
      //   return document.querySelector('.home-container');
      // }
    }
  }
</script>

<style scoped lang="less">
  .home-container {
    /deep/ .van-nav-bar__title {
      max-width: none;
    }
    .search-btn {
      width: 277px;
      height: 32px;
      background-color:#6db4fb;
      boder:none;
      .van-icon {
        font-size: 16px;
      }
      .van-button__text {
        font-size: 14px;
      }
    }
    .channel-tabs {
      /deep/ .van-tab {
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
      }
      /deep/ .van-tabs__line {
        bottom: 20px;
        width: 25px !important;
        height: 3px;
        background: #3296fa;
      }
    }
    .channel-edit-popup {
      height: 100%;
    }
    .wap-nav-wrap {
      position: fixed;
      right: 0;
      width: 33px;
      height: 43px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: .9;
      .van-icon {
        font-size: 24px;
      }

    }
    .wap-nav-placeholder{
      width: 33px;
      flex-shrink: 0;
    }
  }

</style>
