// 请假api
import request from '@/framework/utils/request'

//一般假
/**
 *
 *查看一般请假查看列表
 * @param {*} data
 * @returns
 */
export function leaveQuery(data) {
    return request({
        url: '/hall2/leave/query',
        method: 'post',
        data
    })
}

/**
 *
 *查看一般请假统计列表(组织)
 * @param {*} data
 * @returns
 */
 export function leaveOrgsum(data) {
    return request({
        url: '/hall2/leave/orgsum/query',
        method: 'post',
        data
    })
}

/**
 *
 *查看一般请假统计列表（个人）
 * @param {*} data
 * @returns
 */
 export function leaveUsersum(data) {
    return request({
        url: '/hall2/leave/usersum/query',
        method: 'post',
        data
    })
}


/**
 *
 *查询用户剩余假期
 * @param {String} id  用户id
 * @returns
 */
 export function holidays(id) {
    return request({
        url: '/hall2/leave/user/holidays?userid='+id,
        method: 'get'
    })
}


//哺乳假
/**
 *
 *查看哺乳假假查看列表
 * @param {*} data
 * @returns
 */
 export function lactationQuery(data) {
    return request({
        url: '/hall2/leave/lactation/query',
        method: 'post',
        data
    })
}

/**
 *
 *查看哺乳假统计列表(组织)
 * @param {*} data
 * @returns
 */
 export function lactationOrgsum(data) {
    return request({
        url: '/hall2/leave/lactation/orgsum/query',
        method: 'post',
        data
    })
}

/**
 *
 *查看哺乳假统计列表（个人）
 * @param {*} data
 * @returns
 */
 export function lactationUsersum(data) {
    return request({
        url: '/hall2/leave/lactation/usersum/query',
        method: 'post',
        data
    })
}