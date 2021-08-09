<template>
  <div class="home-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
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

    </van-tabs>
  </div>
</template>

<script>
  import { getUserChannels } from "@/api/user";
  import ArticleList from './components/article-list'

  export default {
    name: "HomeIndex",
    components: {
      ArticleList
    },
    props: {},
    data () {
      return {
        active: 0,
        channels: []
      }
    },
    computed: {},
    watch: {},
    created () {
      this.loadChannels()
    },
    mounted () {},
    methods: {
      async loadChannels () {
        //获取频道数据
        const { data } = await getUserChannels()
        //console.log(data)
        this.channels = data.data.channels

      }
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
  }

</style>
