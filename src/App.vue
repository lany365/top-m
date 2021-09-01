<template>
  <div id="app">
<!--一级路由出口缓存,路由表中所有的顶层路由都是由一级路由
因为router-view是一级路由出口，keep-alive仅对该路由出口渲染的组件有效-->
    <keep-alive :include="['LayoutIndex', 'SearchIndex']">
      <router-view/>
    </keep-alive>

  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">

</style>
