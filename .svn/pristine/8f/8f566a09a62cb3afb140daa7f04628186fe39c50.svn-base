import request from '@/framework/utils/request'
import { uiConfigsCookies, getCookie } from '@/framework/utils/auth'
import axios from 'axios'

//人员数据录入
export function getuserinfo(data) {
    let uiConfigs = uiConfigsCookies();
    return new Promise((resolve, reject) => {
        let formdata = new FormData()
        formdata.append("file", data.file)
        let config = {
            headers: {
                'X-Commnet-Token': getCookie('X-Commnet-Token'),
                'Content-Type': 'multipart/form-data'
            }
        }
        let url = uiConfigs['api.url'] + `/person/import/userinfo?startRow=${data.startRow}`;
        axios.post(url, formdata, config).then(res => {
            let data = res.data;
            if (data.code == "success") {
                resolve(data)
            } else {
                reject(data)
            }
        }).catch(error => {
            reject(error)
        })
    })
}
//用户查询导出
export function getexport(data, properties, title) {
    return request({
        url: '/person/user/query/export?title=' + encodeURIComponent(title) + '&properties=' + encodeURIComponent(properties),
        method: 'post',
        dataType: 'json',
        data
    });
}