/** 离岗 */
import request from '@/framework/utils/request'

/**
 *离岗记录
 * @param {*} data
 * @returns
 */
export function quitlist (data) {
  return request({
    url: '/hall2/depart/departlist',
    method: 'post',
    data
  })
}

/**
 *离岗统计 - 组织
 * @param {*} data
 * @returns
 */
export function quitByOrg (data) {
  return request({
    url: '/hall2/depart/departsumbyorglist',
    method: 'post',
    data
  })
}

/**
 *离岗统计 - 人员
 * @param {*} data
 * @returns
 */
export function quitByUser (data) {
  return request({
    url: '/hall2/depart/departsumbypeoplelist',
    method: 'post',
    data
  })
}

/**
 *离岗统计 - 人员(个人离岗记录)
 * @param {*} data
 * @returns
 */
 export function departlistByuserid (data) {
  return request({
    url: '/hall2/depart/departlistbyuserid',
    method: 'post',
    data
  })
}
