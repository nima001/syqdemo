import request from '@/framework/utils/request'

//获取查询模板列表
export function queryList(data) {
    return request({
        url: '/person/evaluate/query/template',
        method: 'post',
        data
    })
}
//新增模板
export function addTemplate(data) {
    return request({
        url: '/person/evaluate/insert/template',
        method: 'post',
        data
    })
}
//修改模板列表
export function updataTemplate(data) {
    return request({
        url: '/person/evaluate/update/template',
        method: 'post',
        data
    })
}
//删除模板列表
export function deleteTemplate(id) {
    return request({
        url: `/person/evaluate/delete/template/${id}`,
        method: 'delete',
    })
}
//获取对应模板字段列表
export function queryContentList(templateid) {
    return request({
        url: `/person/evaluate/get/content/${templateid}`,
        method: 'post',
    })
}
//
