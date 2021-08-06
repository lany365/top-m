<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="注册/登入"
      left-arrow
      @click-left="$router.back()"
    />

    <van-form
      :show-error="false"
      :show-error-message="false"
      :validate-first="false"
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="top"
        left-icon="shouji"
        name="mobile"
        center
        placeholder="请输入手机号"
        :rules="formRules.mobile"
        type="number"
        maxlength="11"
      />
      <van-field
        v-model="user.code"
        center
        clearable
        icon-prefix="top"
        left-icon="yanzhengma"
        name="code"
        placeholder="请输入短信验证码"
        :rules="formRules.code"
        type="number"
        maxlength="6"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow=false"
          />
          <van-button
            v-else
            class="set-btn"
            size="mini"
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>

      <div class="login-btn-wrap">
        <van-button type="info" class="login-btn" block>
          登入
        </van-button>
      </div>

    </van-form>



  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
// import { Toast } from 'vant'
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8|9]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false, //控制倒计时和发送按钮的显示状态
      isSendSmsLoading:false //发送验证码的loading状态
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(this.user)
        console.log('登录成功', res)
        this.$toast.success('OK')
      } catch (err) {
        console.log(err)
        this.$toast.fail('XXX')
        // if (err.response.status === 400) {
        //   console.log('登录失败', err)
        // }
      }
    },

    onFailed (error) {
      console.log('验证失败',error)
      if (error.errors[0]){
        this.$toast({
          message: error.errors[0].message,
          position: 'top' //防止键盘太高
        })
      }
    },
    async onSendSms () {
      try {
       await this.$refs['login-form'].validate('mobile')
        //验证通过，请求发送验证码

        this.isSendSmsLoading = true //展示按钮的loading状态，防止网络慢用户多次点击的发送行为

        await sendSms(this.user.mobile)

        //短信发出去了，隐藏发送按钮，显示倒计时
        this.isCountDownShow = true
        //倒计时结束，隐藏倒计时，显示发送按钮

      } catch (err) {
        // console.log('验证失败',err)
        //try里面任何错误都会直接进入catch
        //不同错误不同提醒
        let message = ''
        if(err && err.response && err.response.status === 429){
          message = '发送太频繁，请稍后重试'

        } else if (err.name === 'mobile'){
          message = err.message
        } else {
          message = '发送失败，请稍后重试'
        }

        //提示用户
        this.$toast({
          message:err.message,
          position: 'top'
        })
      }

      //无论发送验证码成功还是失败，最后都要关闭发送loading按钮状态
      this.isSendSmsLoading = false

      // this.$refs['login-form'].validate('mobile').then(
      //   data => {
      //     console.log(data)
      //   }
      // )
      //校验证手机号
      //验证通过-》请求发送验证码-》用户接受短信——输入验证码-》请求登录
      //请求发送验证码-》隐藏发送按钮，显示倒计时
      //倒计时结束-》隐藏倒计时，显示发送按钮
    }
  }
}
</script>

<style scoped lang="less">
  .login-container {
    .set-btn {
      width: 76px;
      height: 23px;
      background-color: #ededed;
      .van-button__text {
        font-size: 11px;
        color: #666666;

      }

    }
    .login-btn-wrap {
      padding: 26px 16px;
      .login-btn {
        background-color: #6db4fb;
        border: none;
        .van-button__text {
          font-size: 18px;
        }
      }
    }
  }


</style>
