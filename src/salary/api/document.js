import request from '@/framework/utils/request'

//发文查询
export function docQuery(data) {
    return request({
        url: '/person/document/list',
        method: 'post',
        data
    })
}