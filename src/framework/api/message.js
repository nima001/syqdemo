import request from '@/framework/utils/request'

//消息分页
export function msglist(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/message/v1/msg/list`,
        method: 'post',
        data
    })
}
    
/**
 * 获取用户from到现在的未读/待办消息数
 * @param {Number} from 时间毫秒数 空加载所有
 */
export function msgcount(from) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/message/v1/msg/count`,
        method: 'get',
        params: { from }
    })
}

//消息已读未读标记
export function msgreadMark(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/message/v1/msg/readMark`,
        method: 'post',
        data
    })
}

//消息置顶
export function msgtopMark(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/message/v1/msg/topMark`,
        method: 'post',
        data
    })
}

//删除消息
export function msgdelmsg(i) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/message/v1/msg/delmsg/${i}`,
        method: 'delete',
    })
}
//获取消息来源系统列表
export function systemlist(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/message/v1/msg/system/list`,
        method: 'post',
        data
    })
}