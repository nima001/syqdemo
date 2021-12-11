import request from '@/framework/utils/request'

//节点属性配置查看
export function getNodeProperty( query ) {
    return request({
        url: '/workflow/v2/nodepropertyv2/view',
        method: 'get',
        params:query
    })
}

//节点属性保存
export function saveNodeProperty( nodePropertyVo  ) {
    return request({
        url: '/workflow/v2/nodepropertyv2/save',
        method: 'post',
        dataType: 'json',
        data:nodePropertyVo 
    })
}


