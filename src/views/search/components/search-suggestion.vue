<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :key="index"
      @click="$emit('search',str)"
    >
      <div slot="title" v-html="highlight(str)"></div>

    </van-cell>
  </div>
</template>

<script>
  import { getSearchSuggestions } from '@/api/search'
  import { debounce } from "lodash"

  export default {
    name: "SearchSuggestion",
    components: {},
    props: {
      searchText: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        suggestions: [] //联想建议数据列表
      }
    },
    computed: {},
    watch: {
      //属性名：要监视的数据的名称
      // searchText () {
      //   console.log('hello')
      // }

      //监视的完整写法
      searchText: {
        handler: debounce(async function () {
        const {data} = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 1000),
      immediate: true
    }
        //当数据发生变化则会执行handler处理函数
        // async handler () {
        //   //找到数据接口
        //   //请求获取数据
        //   //模版绑定展示
        //   const { data } = await getSearchSuggestions(this.searchText)
        //
        //   this.suggestions = data.data.options
        //
        // },
        // immediate: true
        // //该回调将会在监听开始之后被立即调用

    },
    created () {},
    mounted () {},
    methods: {
      highlight (str) {
        // a /a/gi, vue  /vue/gi
        //正则表达式/中间的内容都会当作正则匹配模式字符来对待
        //错误写法： /this.searchText/gi
        //RegExp 是正则表达式的构造函数
        //参数1：字符窜
        //参数2：匹配模式
        //返回值：正则对象
          return str.replace(
            new RegExp(this.searchText, 'gi'),
            `<span style="color:red">${this.searchText}</span>`
          )
      }
    }
  }
</script>

<style scoped lang="less">

</style>

