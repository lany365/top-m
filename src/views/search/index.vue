<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
      />
    </form>
<!-- /搜索栏-->
    <!-- 联想建议-->
    <search-suggestion />

    <!-- /联想建议-->

    <!-- 历史记录-->

    <search-history />
    <!-- /历史记录-->
    <!-- 搜索结果-->
    <search-result />
    <!--/搜索结果-->











  </div>
</template>

<script>
  import SearchSuggestion from './components/search-suggestion'
  import SearchHistory from './components/search-history'
  import SearchResult from './components/search-result'
  export default {
    name: "SearchIndex",
    components: {
      SearchSuggestion,
      SearchHistory,
      SearchResult
    },
    props: {},
    data () {
      return {}
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
      onSearch () {

      }
    }
  }
</script>

<style scoped lang="less">

</style>
