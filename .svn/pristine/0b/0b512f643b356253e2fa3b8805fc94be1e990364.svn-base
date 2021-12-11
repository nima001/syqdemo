// 考勤api
import request from '@/framework/utils/request'

/** 考勤记录
 * state (morning/night)
 * 0: 未打卡
 * 1: 迟到
 * 2: 早退
 * 3: 正常打卡考勤
 */
export function attendanceList (data) {
  return request({
    url: '/hall2/checking/query',
    method: 'post',
    data
  })
}

/**
 * 考勤设为正常
 */
export function attendanceupdate (data) {
  return request({
    url: '/hall2/checking/update',
    method: 'post',
    data
  })
}

/**
 * 考勤异常统计 - 组织
 */
export function orgsumError (data) {
  return request({
    url: '/hall2/checking/orgsum/query',
    method: 'post',
    data
  })
}

/**
 * 考勤异常统计 - 用户
 */
export function usersumError (data) {
  return request({
    url: '/hall2/checking/usersum/query',
    method: 'post',
    data
  })
}

/**
 *  查询打卡列表
 */
export function punchCard (data) {
  return request({
    url: '/hall2/checking/PunchCard/query',
    method: 'post',
    data
  })
}

/**
 *  考勤申诉记录
 */
export function explainList (data) {
  return request({
    url: '/hall2/checking/AbnormalExplain/query',
    method: 'post',
    data
  })
}

/**
 *  考勤分析异常率趋势查询
 */
export function rateTrend () {
  return request({
    url: '/hall2/checking/statistics/rate',
    method: 'post'
  })
}

/**
 *  考勤分析概况查询
 */
export function survey (data) {
  return request({
    url: '/hall2/checking/statistics/survey',
    method: 'post',
    data
  })
}

/**
 *  考勤分析组织异常率查询
 */
export function rate (data) {
  return request({
    url: '/hall2/checking/statisticsorg/rate',
    method: 'post',
    data
  })
}

/**
 *  考勤规则 - 查询
 */
export function rulesquery () {
  return request({
    url: '/hall2/checking/rules/query',
    method: 'post'
  })
}

/**
 *  考勤规则 - 添加
 */
export function rulesadd (data) {
  return request({
    url: '/hall2/checking/rules/add',
    method: 'post',
    data
  })
}

/**
 *  考勤规则 - 删除
 */
export function rulesdel (id) {
  return request({
    url: '/hall2/checking/rules/del',
    method: 'post',
    data: { id }
  })
}

/**
 *  考勤规则 - 新增或修改
 */
export function insertOrUpdate (data) {
  return request({
    url: '/hall2/checking/rules/insertOrUpdate',
    method: 'post',
    data
  })
}


