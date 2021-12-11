import request from '@/framework/utils/request'

export function querypagelist(data) {
    return request({
        url: '/idm/v2/suborg/queryPageList',
        method: 'post',
        dataType: 'json',
        data
    });
}

export function update(data) {
    return request({
        url: '/idm/v2/suborg/update',
        method: 'post',
        dataType: 'json',
        data
    });
}

export function get(nodeid, treeid) {
    return request({
        url: '/idm/v2/suborg/get',
        method: 'get',
        params:{
            nodeid,
            treeid
        }
    });
}