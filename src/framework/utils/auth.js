import Cookies from 'js-cookie'
import store from '../store'

/**
 * @export
 * @returns
 *
 * 登录成功的时候会返回一个token,保存在cookies中
 * 根据token拉取用户权限
 */

export function getCookie (key) {
  return Cookies.get(key)
}

export function setCookie (key, token) {
  return Cookies.set(key, token)
}

export function removeCookie (key) {
  return Cookies.remove(key)
}

export function getSessionStorage (key) {
  return sessionStorage.getItem(key)
}

export function setSessionStorage (key, value) {
  sessionStorage.setItem(key, value)
}

export function removeSessionStorage (key) {
  sessionStorage.removeItem(key)
}

/**
 * @deprecated 获取配置改用 vuex $store.getters.getConfig('key')
 */
export function uiConfigsCookies () {
  return store.getters.config
}
