import request from '@/framework/utils/request'

/************************  组织树接口 *************************/
//获取组织树
export function treepath(id, treeid) {
    return request({
        url: '/person/orgtree/path',
        method: 'get',
        params: {
            id, treeid
        }
    });
}
//组织树节点搜索
export function treequery(data) {
    return request({
        url: '/person/orgtree/query',
        method: 'post',
        data
    })
}
//获取组织结构
export function treeroot(treeid) {
    return request({
        url: '/person/orgtree/root',
        method: 'get',
        params:{
            treeid
        }
    });
}

//获取组织下机构情况
export function listnode(id, treeid) {
    return request({
        url: '/person/orgtree/listnode',
        method: 'get',
        params: {
            pid: id,
            treeid: treeid
        }
    })
}
/************************  组织接口 *************************/
//机构详情
export function organization(id) {
    return request({
        url: '/person/org/' + id,
        method: 'get'
    });
}
