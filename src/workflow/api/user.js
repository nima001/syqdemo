import request from '@/framework/utils/request'

//用户查询
export function userquery(data) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/user/query`,
        method: 'post',
        dataType: 'json',
        data
    });
}
