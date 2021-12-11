import request from '@/framework/utils/request'

//模板组列表
export function getModelgroupList( modelPageQuery ) {
    return request({
        url: '/workflow/v2/modelgroup/list',
        method: 'post',
        dataType: 'json',
        data:modelPageQuery 
    })
}

//根据id获取模板组信息
export function getGroupdata( id ) {
    return request({
        url: '/workflow/v2/modelgroup/get/'+ id,
        method: 'get',
    })
}

//添加模板组
export function addModelGroup( modelGroupVo ) {
    return request({
        url: '/workflow/v2/modelgroup/add',
        method: 'post',
        dataType: 'json',
        data:modelGroupVo
    })
}

//修改模板组
export function updateModelGroup( modelGroupVo ) {
    return request({
        url: '/workflow/v2/modelgroup/update',
        method: 'post',
        dataType: 'json',
        data:modelGroupVo
    })
}

//删除模板组
export function delModelGroup( id ) {
    return request({
        url: '/workflow/v2/modelgroup/delete/' + id,
        method: 'get',
    })
}