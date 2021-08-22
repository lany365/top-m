<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click',$event)"
      />
<!--      <van-cell-->
<!--        v-for="(comment, index) in list"-->
<!--        :key="index"-->
<!--        :title="comment.content"-->
<!--      />-->
    </van-list>
  </div>
</template>

<script>
  import { getComments } from '@/api/comment'
  import CommentItem from './comment-item'

  export default {
    name: "CommentList",
    components: {
      CommentItem
    },
    props: {
      source: {
        type: [Number, String, Object],
        required: true
      },
      list: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        //list: [],
        loading: false,
        finished: false,
        offset: null,//获取下一页数据的页面
        limit: 10 //每页10条
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
      async onLoad() {
        //1.请求获取数据
        const { data } = await getComments({
          type: 'a',//评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source,//源id，文章id或评论id
          offset: this.offset,//获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit//获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })

       // console.log(data)
        this.$emit('update-total-count', data.data.total_count)

        //2，把数据放到列表中
        const { results } = data.data
        this.list.push(...results)
        //3，将本次的loading关闭
        this.loading = false
        //4，判断是否还有数据
        if (results.length) {
          //如果有，更新获取下一页数据页面
          this.offset = data.data.last_id
        } else {
          //如果没有，则将finished设置为true，不再触发加载更多了。
          this.finished = true
        }


        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        // setTimeout(() => {
        //   for (let i = 0; i < 10; i++) {
        //     this.list.push(this.list.length + 1)
        //   }
        //
        //   // 加载状态结束
        //   this.loading = false
        //
        //   // 数据全部加载完成
        //   if (this.list.length >= 40) {
        //     this.finished = true
        //   }
        // }, 1000)
      }
    }
  }
</script>

<style scoped lang="less">

</style>
