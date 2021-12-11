// 角色相关API
import request from '@/framework/utils/request'

// 分页条件查询角色列表
export function rolelist(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/role/list`,
        method: 'post',
        data
    })
}

// 获取角色关联的权限
export function relatelist(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/role/relate/list`,
        method: 'post',
        data
    })
}

// 创建角色
export function roleadd(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/role/add`,
        method: 'post',
        data
    })
}

// 添加角色关联的权限
export function relateadds(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/role/relate/adds`,
        method: 'post',
        data
    })
}

// 删除角色
export function roledelete(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/role/delete`,
        method: 'delete',
        data
    })
}

//删除角色关联的权限
export function relatedeletes(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/role/relate/deletes`,
        method: 'delete',
        data
    })
}

// 更新角色
export function roleupdate(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/role/update`,
        method: 'put',
        data
    })
}

// 获取角色关联的用户ID
export function roleuserlist(i) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/role/user/list?roleid=${i}`,
        method: 'get'
    })
}

// 添加用户角色关联
export function roleuseradd(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/role/use/relate/adds`,
        method: 'post',
        data
    })
}

// 删除用户角色关联
export function roleuserdel(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/role/use/relate/delete`,
        method: 'delete',
        data
    })
}

// 批量删除用户角色关联
export function roleuserdels(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/role/use/relate/deletes`,
        method: 'delete',
        data
    })
}

//角色类型
export function rolelistgroup(i) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/role/listgroup?appid=${i}`,
        method: 'get'
    })
}