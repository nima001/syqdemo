import request from '@/framework/utils/request'

//新增发文
export function document(data) {
    return request({
        url: '/person/document',
        method: 'post',
        data
    })
}
//编辑后更新发文
export function updatedoc(id, data) {
    return request({
        url: `/person/document/${id}`,
        method: 'post',
        data
    })
}
//根据id获取发文
export function getdoc(id) {
    return request({
        url: `/person/document/${id}`,
        method: 'get',
    })
}
//发文查询
export function docQuery(data) {
    return request({
        url: '/person/document/list',
        method: 'post',
        data
    })
}
//发文列表(文件列表)
export function doclistSearch(data) {
    return request({
        url: '/person/document/list',
        method: 'post',
        data
    })
}
//删除文件
export function recordDelete(id) {
    return request({
        url: `/person/document/${id}`,
        method: 'delete'
    })
}

//修改状态（删除）
export function editdoc(ids, status) {
    return request({
        url: `/person/document/status/?ids=${ids}&status=${status}`,
        method: 'get'
    })
}