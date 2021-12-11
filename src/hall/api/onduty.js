// 值班api
import request from '@/framework/utils/request'

/**
 *
 *查看值班查看列表
 * @param {*} data
 * @returns
 */
export function ondutyList (data) {
  return request({
    url: '/hall2/onduty/lookondutylist',
    method: 'post',
    data
  })
}

/**
 *
 *添加值班列表
 * @param {*} data
 * @returns
 */
export function addList (data) {
  return request({
    url: '/hall2/onduty/saveonduty',
    method: 'post',
    data
  })
}

/**
 *
 *编辑值班列表
 * @param {*} data
 * @returns
 */
export function editList (data) {
  return request({
    url: '/hall2/onduty/lookondutylistupdate',
    method: 'post',
    data
  })
}

/**
 *
 *删除值班列表
 * @param {String} groupby  组id
 * @returns
 */
export function delList (groupby) {
  return request({
    url: '/hall2/onduty/deletebygroupby?groupby=' + groupby,
    method: 'get',
  })
}

/**
 *
 *值班详情
 * @param {*} data
 * @returns
 */
export function ondutyListInfo (data) {
  return request({
    url: '/hall2/onduty/personondutylist',
    method: 'post',
    data
  })
}

/**
 *
 *值班详情导出
 * @param {*} data
 * @returns
 */
export function exportOnduty (data) {
  return request({
    url: '/hall2/onduty/personondutylist/export',
    method: 'post',
    data
  })
}

/**
 * 统计- 组织
 * @param {*} data
 * @returns
 */
export function orgCount (data) {
  return request({
    url: '/hall2/onduty/getdutylistbyorg',
    method: 'post',
    data
  })
}

/**
 * 统计- 人员
 * @param {*} data
 * @returns
 */
export function peopleCount (data) {
  return request({
    url: '/hall2/onduty/getdutylistbypeople',
    method: 'post',
    data
  })
}

/**
 * 统计- 个人
 * @param {*} data
 * @returns
 */
export function personalCount (data) {
  return request({
    url: '/hall2/onduty/getdutylistbyuser',
    method: 'post',
    data
  })
}