import { uiConfigsCookies } from '@/framework/utils/auth'
import request from '@/framework/utils/request'
import axios from 'axios'
//  获取考核管理属性信息
export function getexamine(data) {
  return request({
    url: '/person/examine/index',
    method: 'get',
    params: {
      orgid: data.orgid,
      nodeid: data.nodeid,
      year: data.year
    }
  })
}
//  获取考核人员数据列表
export function getuserinfo(data) {
  return request({
    url: '/person/examine/userinfo',
    method: 'post',
    dataType: 'json',
    data
  });
}
//  更新或新增考核管理属性信息
export function updateoradd(data) {
  return request({
    url: '/person/examine/inedx/updateoradd',
    method: 'post',
    dataType: 'json',
    data
  });
}
//  上传人员信息
export function uploaduserinfo(data) {
  let uiConfigs = uiConfigsCookies();
  return new Promise((resolve, reject) => {
    let formdata = new FormData();
    formdata.append("file", data.file);
    formdata.append("orgid", data.orgid);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios.post(uiConfigs['api.url'] + '/person/examine/userinfo/import', formdata, config).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
//  导出考核信息
export function exportexamine(data) {
  return request({
    url: '/person/examine/userinfo/export',
    method: 'post',
    dataType: 'json',
    data
  });
}
// 获取个人历年考核结果
export function personcheckresult(data) {
  return request({
    url: '/person/examine/userinfo/checkresult',
    method: 'post',
    dataType: 'json',
    data
  });
}
// 导出个人历年考核结果
export function exportcheckresult(id) {
  return request({
    url: `/person/examine/checkresult/export/${id}`,
    method: 'get'
  })
}
//获取工资变动卡
export function changeset(data) {
  return request({
    url: '/person/salary/changeset',
    method: 'post',
    data
  })
}
//获取变动详情
export function getchangeset(id) {
  return request({
    url: `/person/salary/changeset/detail/${id}`,
    method: 'get',
  })
}