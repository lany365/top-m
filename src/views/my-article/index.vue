<template>
  <div class="myarticle-container page-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="搜藏历史记录"
    ></van-nav-bar>
    <!-- /导航栏 left-arrow
      @click-left="$router.back()"-->

    <!-- 文章标签列表
            class="tabs-wrap"
      v-model="active"
      slot="title"
      background="#ccc"
      color="#fff"
      title-inactive-color="#fff"
      title-active-color="#3c9bfa"
      :border="false"
      line-width="80"-->
    <van-tabs
      class="fixed-tabs"
      v-model="active"
      title-active-color="#ee0a24"
      color="#ee0a24"
    >
      <van-tab :title="tab.title" v-for="tab in tabs" :key="tab.title">
        <loading-list :fn="tab.fn" v-slot="{ item }">
          <article-item :article="item" />
        </loading-list>
      </van-tab>
    </van-tabs>
    <!-- /文章标签列表 -->
  </div>
</template>

<script>
  import LoadingList from '@/components/loading-list'
  import ArticleItem from './components/article-item'
  import {
    getUserCollectArticles,
    getUserHistoryArticles
  } from '@/api/article'
  export default {
    name: 'MyArticle',
    components: {
      LoadingList,
      ArticleItem
    },
    props: {
      type: {
        type: String
      }
    },
    data () {
      return {
        active: this.getInitialActive(),
        tabs: [
          {
            title: '收藏',
            fn: getUserCollectArticles
          },
          {
            title: '历史',
            fn: getUserHistoryArticles
          }
        ]
      }
    },
    computed: {
    },
    watch: {},
    created () {},
    mounted () {},
    methods: {
      getInitialActive () {
        const active = ['collect', 'history', undefined].indexOf(this.type)
        return active !== -1 ? active : 0
      }
    }
  }
</script>

<style scoped lang="less">
  .fixed-tabs{
    color:#ccc;
  }
</style>
