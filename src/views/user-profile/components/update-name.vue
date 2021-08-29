<template>
  <div class="update-name">
    <!--    导航栏-->
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!--    导航栏-->
    <div class="name-field-wrap">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>


  </div>
</template>

<script>
  import { updateUserProfile } from "@/api/user"

  export default {
    name: "UpdateName",
    components: {},
    props: {
      //声明接收父组件v-model传递的value数据
      value: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        localName: this.value
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
      async onConfirm () {
        this.$toast.loading({
          message: '保存中',
          forbidClick:true
        })

        try{
          //请求提交新用户昵称
          await updateUserProfile({
            name: this.localName
          })
          //更新成功-》修改父组件的name->关闭弹出层
          //this.$emit('update-name',this.localName)
          //发布input事件，更新父组件v-model数据
          this.$emit('input', this.localName)
          this.$emit('close')
          this.$toast.success('保存成功')
        } catch (err) {
          if(err && err.response && err.response.status === 409) {
            this.$toast.fail('昵称已经存在')
          }
        }

      }
    }
  }
</script>

<style scoped lang="less">
  .name-field-wrap{
    padding: 10px;
  }

</style>
