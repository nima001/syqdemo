import request from '@/framework/utils/request'

/************************  分析管理接口 *************************/

/************************  1.统计分析 *************************/

//统计分析查询
export function analysisquery(data) {
    return request({
        url: '/person/analyze/query',
        method: 'post',
        data
    })
}

// 统计分析查询/按权限
export function querydisplay(data) {
    return request({
        url: '/person/analyze/query/display',
        method: 'post',
        data
    })
}

//保存统计分析
export function analysissave(data) {
    return request({
        url: '/person/analyze',
        method: 'post',
        data
    })
}

//删除统计分析
export function analysisdel(id) {
    return request({
        url: `/person/analyze/${id}`,
        method: 'delete',
        params: {
            id
        }
    })
}

// 根据ID获取关联角色列表
export function listRole(id) {
    return request({
        url: '/person/analyze/report/listrole',
        method: 'get',
        params: {
            id
        }
    })
}

// 添加角色
export function addRole(data) {
    return request({
        url: '/person/analyze/report/listrole/addrole',
        method: 'post',
        params: {
            analyzeid: data.analyzeid,
            roleid: data.roleid
        }
    })
}

// 删除角色关系
export function delRole(bookid, roleid) {
    return request({
        url: '/person/analyze/report/delrole',
        method: 'delete',
        params: {
            bookid,
            roleid
        }
    })
}

//统计分析排序
export function analysisorderby(data) {
    return request({
        url: '/person/analyze/orderby',
        method: 'post',
        params: {
            ...data,
        }
    })
}

/************************  2.统计范围分析 *************************/

//分析范围查询
export function queryScope(data) {
    return request({
        url: '/person/analyze/scope/query',
        method: 'post',
        data
    })
}

//保存分析范围
export function analysisscopesave(data) {
    return request({
        url: '/person/analyze/scope',
        method: 'post',
        data
    })
}

//删除分析范围
export function analysisscopedel(id) {
    return request({
        url: `/person/analyze/scope/${id}`,
        method: 'delete'
    })
}

//排序分析范围
export function analysisscopeorderby(data) {
    return request({
        url: `/person/analyze/scope/orderby`,
        method: 'post',
        params: {
            ...data,
        }
    })
}

/************************  3.统计内容分析 *************************/
//分析内容查询
export function queryContent(data) {
    return request({
        url: '/person/analyze/content/query',
        method: 'post',
        data
    })
}

//保存统计分析内容
export function saveContent(data) {
    return request({
        url: '/person/analyze/content',
        method: 'post',
        data
    });
}
//删除统计分析内容
export function deleteContent(id){
    return request({
        url: `/person/analyze/content/${id}`,
        method: 'delete',
    })
}

//排序分析范围
export function orderContent(data) {
    return request({
        url: `/person/analyze/content/orderby`,
        method: 'post',
        params: {
            ...data,
        }
    })
}
/************************  4.分析报告 *************************/
//分析设置查询
export function querySetting(data) {
    return request({
        url: '/person/analyze/setting/query',
        method: 'post',
        data
    })
}
//获取分析设置
export function getSetting(id) {
    return request({
        url: '/person/analyze/setting/' + id,
        method: 'get',
    });
}
//删除分析设置
export function deleteSetting(id) {
    return request({
        url: '/person/analyze/setting/' + id,
        method: 'delete',
    });
}
//查询报告
export function queryReport(data){
    return request({
        url: '/person/analyze/report/query',
        method: 'post',
        data
    }) 
}
//获取分析报告
export function getReport(id) {
    return request({
        url: '/person/analyze/report/' + id,
        method: 'get',
    });
}
//查询报告
export function saveReport(data){
    return request({
        url: '/person/analyze/report',
        method: 'post',
        data
    }) 
}