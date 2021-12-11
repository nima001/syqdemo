// 业务相关API
import request from '@/framework/utils/request'

// 分页条件查询业务列表
export function bizlist(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/biz/list`,
        method: 'post',
        data
    })
}

// 创建业务
export function bizadd(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/biz/add`,
        method: 'post',
        data
    })
}

// 查询业务基本信息
export function bizdetail(x,y) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/biz/detail?id=${x}&state=${y}`,
        method: 'get'
    })
}

// 删除业务
export function bizdel(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/biz/del`,
        method: 'delete',
        data
    })
}

// 修改业务基本信息
export function bizupdate(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/biz/update`,
        method: 'put',
        data
    })
}

// 修改业务上下架状态
export function bizupdateState(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/biz/updateState`,
        method: 'put',
        data
    })
}

//获取业务分类
export function business() {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/business/gettype`,
        method: 'get'
    })
}