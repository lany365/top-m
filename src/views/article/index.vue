<template>
  <div class="article-container">
    <!--    导航栏-->
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <!--    导航栏-->

    <h1 class="title">{{ article.title }}</h1>
    <van-cell center class="user-info">
      <div slot="title" class="name">{{ article.aut_name }}</div>
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        :src="article.aut_photo"
      />
      <div slot="label" class="pubdate" >{{article.pubdate | relativeTime}}</div>
      <van-button
        class="follow-btn"
        :type="article.is_followed ? 'default' : 'info'"
        :icon="article.is_followed ? '' : 'plus'"
        round
        size="small"
      >{{ article.is_followed ? '已关注' : '关注' }}
      </van-button>
    </van-cell>

    <!-- 文章内容 -->
    <div class="article-content">
      {{ article.content }}
    </div>
    <van-divider>正文结束</van-divider>



  </div>
</template>

<script>
  import { getArticlesById } from '@/api/article'
  //在组件中获取动态路由参数：
  //方式一：this.$route.params.xx
  //方式二:props传参
  // this.articleId
  export default {
    name: "ArticleIndex",
    components: {},
    props: {
      articleId: {
        type: [String, Number, Object],
        required: true
      }
    },
    data () {
      return {
        article: {}
      }
    },
    computed: {},
    watch: {},
    created () {
      this.loadArticle()
    },
    mounted () {},
    methods: {
      async loadArticle () {
        const { data } = await getArticlesById(this.articleId)
        // console.log(data)
        this.article = data.data
      }
    }
  }
</script>

<style scoped lang="less">
  .title {
    font-size: 20px;
    color: #3a3a3a;
    padding: 14px;
    background-color: #ffffff;
    margin: 0;
  }
  .user-info {
    .avatar {
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .name {
      font-size: 12px;
      color: #333333;
    }
    .pubdate {
      font-size: 12px;
      color: #b4b4b4;
    }
    .follow-btn{
      width: 85px;
      height: 30px;

    }
  }

  .article-content{
    padding: 14px;
    /deep/ p {
      text-align: justify;
    }
  }

</style>
