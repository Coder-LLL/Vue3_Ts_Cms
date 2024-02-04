import { Module } from 'vuex'
import type { ILoginState } from './types'
import type { IRootState } from '../types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/service/login/types'
import localCache from '@/utils/cache'
import { mapMenusToRoutes } from '@/utils/map-menus'

import router from '@/router'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // userMenus => routes
      const routes = mapMenusToRoutes(userMenus)
      console.log(routes)
      // 将routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      console.log(router)
    }
  },
  actions: {
    async accountLoginAction(
      { commit },
      payload: { account: IAccount; isKeepPassword: boolean }
    ) {
      const loginResult = await accountLoginRequest(payload.account)
      const { id, token } = loginResult.data
      // 登陆成功 判断是否要保存一下账号密码
      if (payload.isKeepPassword) {
        // 本地缓存
        localCache.setCache('name', payload.account.name)
        localCache.setCache('password', payload.account.password)
      }

      // 设置并且保存 token
      commit('changeToken', token)
      localCache.setCache('token', token)
      console.log(loginResult)

      // 根据id获取用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    loadLocalLogin({ state, commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default loginModule
