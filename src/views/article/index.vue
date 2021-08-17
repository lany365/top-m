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

    <h1 class="title">文章标题</h1>
    <van-cell center class="user-info">
      <div slot="title" class="name">melani</div>
      <van-image
        slot="icon"
        class="avatar"
        round
        fit="cover"
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
      <div slot="label" class="pubdate">1 hour</div>
      <van-button
        class="follow-btn"
        type="info"
        icon="plus"
        round
        size="small"
      >
        关注
      </van-button>
    </van-cell>



  </div>
</template>

<script>
  //在组件中获取动态路由参数：
  //方式一：this.$route.params.xx
  //方式二:props传参
  // this.articleId
  export default {
    name: "ArticleIndex",
    components: {},
    props: {
      articleID: {
        type: String,
        required: true
      }
    },
    data () {
      return {}
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {}
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
      background-color: #3296fa;

    }
  }

</style>
