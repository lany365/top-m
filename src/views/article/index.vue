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
        :loading="isFollowLoading"
        @click="onFollow"
      >{{ article.is_followed ? '已关注' : '关注' }}
      </van-button>
    </van-cell>

    <!-- 文章内容 -->
    <div
      class="markdown-body"
      v-html="article.content"
      ref="article-content"
    >
    </div>
    <van-divider>正文结束</van-divider>



  </div>
</template>

<script>
  import './github-markdown.css'
  import { getArticlesById } from '@/api/article'
  import { ImagePreview } from 'vant'
  import { addFollow, deleteFollow} from '@/api/user'
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
        article: {},//文章数据对象
        isFollowLoading: false //关注用户按钮的loading状态
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
        //数据改变影响视图更新（DOM数据）不是立即的
        // 所以如果需要在修改数据之后马上操作被该数据影响的视图DOM，需要把这个代码放到$nextTick()
        // 得到所有的img标签
        // this.$nextTick()是vue提供的一种方法
       this.$nextTick(()=> {
         this.handlePerviewImage()
         // const imgs = articleContent.querySelectorAll(img)
         // console.log(imgs)
       })
      },

      handlePerviewImage() {
        // 1、从文章内容中获取到所有的 img DOM 节点
        const articleContent = this.$refs['article-content']
        // 2、获取文章内容中所有的图片地址
        const imgs = articleContent.querySelectorAll('img')
        const imgPaths = [] //搜集所有图片路径
          // 3、遍历所有 img 节点，给每个节点注册点击事件
        imgs.forEach((img, index) => {
          imgPaths.push(img.src)
          img.onclick = function () {
            // 4、在 img 点击事件处理函数中，调用 ImagePreview 预览
            ImagePreview({
              images: imgPaths,
              startPosition: index
            })
          }
        })
      },

      async onFollow () {

        this.isFollowLoading = true
        if(this.article.is_followed){
          //已关注，取消关注
          await deleteFollow(this.article.aut_id)
          //this.article.is_followed = false

        } else {
          //没有关注，添加关注
          await addFollow(this.article.aut_id)
          //this.article.is_followed = true
        }
        this.article.is_followed = !this.article.is_followed
        this.isFollowLoading = false
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

  .markdown-body{
    padding: 14px;
    background-color: #ffffff;
  }

</style>
