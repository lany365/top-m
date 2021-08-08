<!--<template>-->
<!--  <div class="qa-container">-->
<!--    <van-cell-group class="my-info">-->
<!--      <van-cell-->
<!--        class="base-info"-->
<!--        title="单元格"-->
<!--        value="内容"-->
<!--        center-->
<!--        :border="false"-->
<!--      >-->
<!--        <van-image-->
<!--          slot="icon"-->
<!--          width="50"-->
<!--          height="50"-->
<!--          round-->
<!--          fit="cover"-->
<!--          src="https://img.yzcdn.cn/vant/cat.jpeg"-->
<!--        />-->

<!--        <div slot="title">昵称</div>-->
<!--        <van-button-->
<!--          size="small"-->
<!--          round-->
<!--        >编辑资料</van-button>-->

<!--      </van-cell>-->

<!--      <van-grid class="data-info" :border="false">-->
<!--        <van-grid-item>-->
<!--          <div slot="text">-->
<!--            <div class="span">123</div>-->
<!--            <div class="text">头条</div>-->
<!--          </div>-->
<!--        </van-grid-item>-->
<!--        <van-grid-item>-->
<!--          <div slot="text">-->
<!--            <div class="span">123</div>-->
<!--            <div class="text">关注</div>-->
<!--          </div>-->
<!--        </van-grid-item>-->
<!--        <van-grid-item>-->
<!--          <div slot="text">-->
<!--            <div class="span">123</div>-->
<!--            <div class="text">粉丝</div>-->
<!--          </div>-->
<!--        </van-grid-item>-->
<!--        <van-grid-item>-->
<!--          <div slot="text">-->
<!--            <div class="span">123</div>-->
<!--            <div class="text">获赞</div>-->
<!--          </div>-->
<!--        </van-grid-item>-->
<!--      </van-grid>-->

<!--    </van-cell-group>-->

<!--      <van-grid :column-num="2">-->
<!--        <van-grid-item-->
<!--          icon-prefix="top"-->
<!--          icon="shoucang"-->
<!--          text="文字"-->
<!--        />-->
<!--        <van-grid-item-->
<!--          icon-prefix="top"-->
<!--          icon="lishi"-->
<!--          text="文字"-->
<!--        />-->

<!--      </van-grid>-->

<!--      <van-cell title="消息通知" is-link to="/" />-->
<!--      <van-cell title="小智同学" is-link to="/" />-->
<!--      <van-cell title="退出登录" />-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  export default {-->
<!--    name: "QaIndex",-->
<!--    components: {},-->
<!--    props: {},-->
<!--    data () {-->
<!--      return {}-->
<!--    },-->
<!--    computed: {},-->
<!--    watch: {},-->
<!--    created () {},-->
<!--    mounted () {},-->
<!--    methods: {}-->
<!--  }-->
<!--</script>-->

<!--<style scoped lang="less">-->
<!--  .my-container {-->
<!--    .my-info {-->
<!--      /*background-color: #6db4fb;*/-->
<!--      background: url("/banner.png") no-repeat;-->
<!--      /*background-size: cover;*/-->
<!--      .base-info {-->
<!--        background-color: unset;-->
<!--      }-->
<!--      /*/deep/ .van-grid-item__content {*/-->
<!--      /*  background-color: unset;*/-->
<!--      /*}*/-->

<!--      /*.data-info {*/-->
<!--      /*  !*background-color: unset;*!*/-->
<!--      /*}*/-->
<!--    }-->



<!--  }-->

<!--</style>-->


<template>
  <div class="my-container">
    <van-cell-group class="my-info" v-if="user">
      <van-cell
        class="base-info"
        title="单元格"
        value="内容"
        center
        :border="false"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          fit="cover"
          :src="userInfo.photo"
        />
        <div class="name" slot="title">{{ userInfo.name}}</div>
        <van-button
          class="update-btn"
          size="small"
          round
        >编辑资料</van-button>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{userInfo.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{userInfo.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{userInfo.fans_count}}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" slot="text">
            <div class="count">{{userInfo.like_count}}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div class="not-login" v-else>
      <div @click="$router.push('/login')">
        <img class="mobile" src="~@/assets/mobile.png">
      </div>
      <div class="text">登录 / 注册</div>
    </div>

    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="top"
        icon="shoucang"
        text="收藏"
      />
      <van-grid-item
        class="nav-grid-item"
        icon-prefix="top"
        icon="lishi"
        text="历史"
      />
    </van-grid>

    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/" />
    <van-cell
      v-if="user"
      class="logout-cell"
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { getUserInfo } from '@/api/user'
  export default {
    name: 'MyIndex',
    components: {},
    props: {},
    data () {
      return {
        userInfo: {} // 用户信息
      }
    },
    computed: {
      ...mapState(['user'])
    },
    watch: {},
    created () {
      this.loadUser()
      // if (this.$store.state.user) {
      //   this.loadUser()
      // }
    },
    mounted () {},
    methods: {
      async loadUser () {
        try {
          const { data } = await getUserInfo()
          this.userInfo = data.data
        } catch (err) {
          console.log(err)
          this.$toast('获取数据失败')
        }
      },
      onLogout () {
        this.$dialog.confirm({
          title: '退出提示',
          message: '确认退出吗？',
        })
          .then(() => {// 确认执行这里
            // 清除用户登录状态
            this.$store.commit('setUser', null)
            // on confirm
          })
          .catch(() => {
            // on cancel
          })
      }

    }
  }
</script>

<style scoped lang="less">
  .my-container {
    .my-info {
      /*background-color: #6db4fb;*/
      background: url("~@/assets/banner.png") no-repeat;
      background-size: cover;
      .base-info {
        box-sizing: border-box;
        height: 115px;
        background-color: unset;
        padding-top: 38px;
        padding-bottom: 11px;
        .avatar {
          box-sizing: border-box;
          width: 66px;
          height: 66px;
          border: 1px solid #fff;
          margin-right: 11px;
        }
        .name {
          font-size: 15px;
          color: #fff;
        }
        .update-btn {
          height: 16px;
          font-size: 10px;
          color: #666666;
        }
      }
      .data-info {
        .data-info-item {
          height: 65px;
          color: #fff;
          .text-wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .count {
              font-size: 18px;
            }
            .text {
              font-size: 11px;
            }
          }
        }
      }
      /deep/ .van-grid-item__content {
        background-color: unset;
      }
    }

    .not-login {
      height: 180px;
      /*background-color: #6db4fb;*/
      background: url("~@/assets/banner.png") no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile {
        width: 66px;
        height: 66px;
      }
      .text {
        font-size: 14px;
        color: #fff;
      }
    }

    /deep/ .nav-grid {
      .nav-grid-item {
        height: 70px;
        .top {
          font-size: 22px;
        }
        .top-shoucang {
          color: #eb5253;
        }
        .top-lishi {
          color: #ff9d1d;
        }
        .van-grid-item__text {
          font-size: 14px;
          color: #333333;
        }
      }
    }

    .logout-cell {
      text-align: center;
      color: #d86262;
    }
    .mb-4 {
      margin-bottom: 4px;
    }
  }
</style>
