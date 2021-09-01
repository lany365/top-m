<template>
  <div class="layout-container">
    <router-view />

    <van-tabbar route active-color="#ee0a24">
      <van-tabbar-item replace to="/" icon="home-o" >首页</van-tabbar-item>
      <van-tabbar-item replace to="/search" icon="search" >搜索</van-tabbar-item>
      <van-tabbar-item replace to="/my-article" icon="newspaper-o" >记录</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="manager-o" >我的</van-tabbar-item>
    </van-tabbar>

  </div>

</template>

<script>
    export default {
      name: "LayoutIndex",
      components: {},
      props: {},
      data () {
        return {
          active: 0
        }
      },
      computed: {},
      watch: {},
      created () {},
      mounted () {},
      methods: {}

    }
</script>

<style scoped lang="less">

</style>
