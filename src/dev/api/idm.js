import request from '@/framework/utils/request'
//idm模块相关操作api

// 获取应用转让消息模板
export function transfaceAppTmpl(data) {
    return request({
        url: `/idm/v2/msgtemp/listpage.fn`,
        method: 'post',
        data
    })
}