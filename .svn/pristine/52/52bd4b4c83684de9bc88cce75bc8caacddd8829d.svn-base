import request from '@/framework/utils/request'
// 管理员相关API

// 管理员列表
export function userlist(data={}) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/user/list`,
        method: 'post',
        data
    })
}

// 添加管理员
export function useradd(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/user/add`,
        method: 'post',
        data
    })
}

// 删除管理员
export function userdel(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/user/del`,
        method: 'delete',
        data
    })
}

// 转让oweer管理员
export function usermove(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/user/move`,
        method: 'post',
        data
    })
}