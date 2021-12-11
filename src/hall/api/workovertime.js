/** 加班 */
import request from '@/framework/utils/request'

/**
 *
 *加班记录查看
 * @param {*} data
 * @returns
 */
export function worklist (data) {
  return request({
    url: '/hall2/addwork/addworklist',
    method: 'post',
    data
  })
}

/**
 *
 *加班查看-组织
 * @param {*} data
 * @returns
 */
export function workByOrg (data) {
  return request({
    url: '/hall2/addwork/addworksumbyorglist',
    method: 'post',
    data
  })
}

/**
 *
 *加班查看-人员
 * @param {*} data
 * @returns
 */
export function workByUser (data) {
    return request({
      url: '/hall2/addwork/addworksumbypeoplelist',
      method: 'post',
      data
    })
  }

  
/**
 *
 *加班查看-人员(个人值班记录)
 * @param {*} data
 * @returns
 */
export function workByuserid (data) {
  return request({
    url: '/hall2/addwork/addworklistbyuserid',
    method: 'post',
    data
  })
}