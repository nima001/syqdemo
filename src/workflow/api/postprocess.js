import request from '@/framework/utils/request'

//获取后置流程列表
export function getPostProcessInfo(postprocessid) {
    return request({
        url: '/workflow/v2/postprocess/getpostprocessinfo',
        method: 'get',
        params:{
            postprocessid
        }
    })
}

//保存后置流程
export function saveModel(data) {
    return request({
        url: '/workflow/v2/postprocess/saveData',
        method: 'post',
        dataType: 'json',
        data 
    })
}

//后置流程数据回显
export function getModelPreviewData(modelInstanceId) {
    return request({
        url: '/workflow/v2/postprocess/previewdata',
        method: 'get',
        params:{
            modelInstanceId
        }
    })
}