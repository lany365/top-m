import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from "@/utils/storage/"

Vue.use(Vuex)

const USER_KEY = 'user'

export default new Vuex.Store({
  state: {
    user: getItem('USER_KEY')
    // 用户的登录状态信息
    //user: JSON.parse(window.localStorage.getItem('user'))
    // user: null
    //当前登录用户登录状态（token等数据）
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      //为了防止页面刷新数据丢失，需要把数据放到本地储存中，为了持久化数据
      setItem('USER_KEY', state.user)
      //window.localStorage.setItem('user',JSON.stringify(state.user))
      }
    },
  actions: {
  },
  modules: {
  }
})
