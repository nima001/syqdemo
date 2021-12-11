import request from '@/framework/utils/request'
// 权限相关API

// 分页条件查询权限列表
export function limitlist(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/limit/list`,
        method: 'post',
        data
    })
}

// 创建权限
export function limitadd(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/limit/add`,
        method: 'post',
        data
    })
}

// 删除权限
export function limitdelete(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/limit/delete`,
        method: 'delete',
        data
    })
}

// 更新权限
export function limitupdate(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/limit/update`,
        method: 'put',
        data
    })
}