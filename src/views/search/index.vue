<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="搜索关键词"
        background="#ee0a24"
        @search="onSearch(searchText)"
        @focus="isResultShow = false"
      >
        <template #action>
          <div @click="onSearch(searchText)">搜索</div>
        </template>
      </van-search>
    </form>
<!-- /搜索栏--><!--  show-action @cancel="$router.back()"-->

    <!-- 搜索结果-->
    <search-result
      v-if="isResultShow"
      :search-text="searchText"
    />
    <!--/搜索结果-->


    <!-- 联想建议-->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />

    <!-- /联想建议-->

    <!-- 历史记录-->

    <search-history
      v-else
      :search-histories="searchHistories"
      @search="onSearch"
      @update-histories="searchHistories = $event"
    />
    <!-- /历史记录-->

  </div>
</template>

<script>
  import SearchSuggestion from './components/search-suggestion'
  import SearchHistory from './components/search-history'
  import SearchResult from './components/search-result'
  import { setItem, getItem } from '@/utils/storage'
  //import { getSearchHistories } from '@/api/search'
  import { mapState } from 'vuex'

  export default {
    name: "SearchIndex",
    components: {
      SearchSuggestion,
      SearchHistory,
      SearchResult
    },
    props: {},
    data () {
      return {
        searchText: '',//搜索输入框的内容
        isResultShow: false,//控制搜索结果的显示状态
        //searchHistories: []
        searchHistories: getItem('search-histories') || [] //搜索历史数据,如果能读取就用，不能读取就用空
      }
    },
    computed: {
      ...mapState(['user'])
    },
    watch: {
      // searchHistories () {
      //   // 同步到本地存储
      //   setItem('search-histories', this.searchHistories)
      // }
    },
    created () {
      this.loadSearchHistories()
    },
    mounted () {},
    methods: {
      onSearch (searchText) {
        //把输入框设置为你要输入的文本
        this.searchText = searchText

        //记录搜索历史记录
        //this.searchHistories.push(searchText)

        const index = this.searchHistories.indexOf(searchText)
        if (index !== -1) {
          //把重复项删除
          this.searchHistories.splice(index, 1)

        }
          //把最新的搜索历史记录放到顶部
        this.searchHistories.unshift(searchText)

        //如果用户已登录，则把搜索历史记录储存到线上
        //提示：只要我们调用获取搜索结果的数据接口，后端会给我们自动存储用户的搜索历史记录
        //如果没有登录页，则把搜索历史记录储存到本地
        //setItem('search-histories', this.searchHistories)

        //展示搜索结果
        this.isResultShow = true

      },

      async loadSearchHistories () {
       //因为后端存储历史记录太少，后端返回历史记录和本地合并到一起
        const searchHistories = getItem('search-histories')||[]

        // if (this.user) {
        //   const { data } = await getSearchHistories()
        //   //去重复[...数组，...数组]
        //   //把Set转为数组【...set对象】
        //   //数组去重：[...new Set([...数组，...数组])]
        //   searchHistories = [...new Set([
        //     ...searchHistories,
        //     ...data.data.keywords
        //   ])]
        // }

        this.searchHistories = searchHistories

      }


    }
  }
</script>

<style scoped lang="less">

</style>
