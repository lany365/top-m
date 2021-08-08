/**
 * 用户相关的请求模块
 */
import request from "@/utils/request"

//在非组件中获取store必须通过这种方式
//这里单独加载store,和在组件中this.$store一样

//import store from '@/store'

/**
 * 用户登录
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

/**
 * 短信验证码
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  })
}


/**
 * 获取用户登录信息
 */

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}


/**
 * 获取频道列表信息
 */

export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
