<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title" />
    </van-list>

  </div>
</template>

<script>
  import { getSearchResult } from '@/api/search'
  export default {
    name: "SearchResult",
    components: {},
    props: {
      searchText: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        list: [],
        loading: false,
        finished: false,
        page: 1,
        perPage: 10
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
      async onLoad() {
        //1,请求获取数据
        const { data } = await getSearchResult({
          page: this.page,//页码
          per_page: this.perPage, //每页大小
          q: this.searchText //搜索字符
        })

        //2,将数据放到数据列表中
        const { results } = data.data
        this.list.push(...results)
        //3，关闭本次的loading
        this.loading = false
        //4,判断是否还有数据，
        if(results.length) {
          //如果有，就更新获取下一页数据页面，
          this.page++
        } else {
          //如果没有，就把finishe设为true,关闭加载更多
          this.finished = true
        }





        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        // setTimeout(() => {
        //   for (let i = 0; i < 10; i++) {
        //     this.list.push(this.list.length + 1);
        //   }
        //
        //   // 加载状态结束
        //   this.loading = false;
        //
        //   // 数据全部加载完成
        //   if (this.list.length >= 40) {
        //     this.finished = true;
        //   }
        // }, 1000)
      }
    }
  }
</script>

<style scoped lang="less">
  .search-result {
    position: fixed;
    left: 0;
    right: 0;
    top: 54px;
    bottom: 0;
    overflow-y: auto;
  }

</style>
