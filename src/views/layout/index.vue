<template>
  <div class="layout-container">
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/qa" icon="comment-o">问答</van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="manager-o">我的</van-tabbar-item>
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
