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

/**
 * 获取关注
 */

export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}


/**
 * 取消关注
 */

export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

/**
 * 获取用户个人资料
 */

export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}


/**
 * 更新用户个人资料
 */

export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

/**
 * 更新用户个人头像
 */

export const updateUserPhoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}



/**
 * 获取用户的关注列表
 */
export function getFollowingsByUser (userId, params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/followings',
    params,
    data: {
      target: userId.toString()
    }
  })
}

/**
 * 获取用户的粉丝列表
 */
export function getFollowersByUser (userId, params) {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/followers',
    params,
    data: {
      target: userId.toString()
    }
  })
}
