import request from '@/framework/utils/request'
// 服务相关api

// 查看服务列表信息 
export function serviceList(data) {
  return request({
      url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/service/list`,
      method: 'post',
      data
  })
}

// 查看服务详情 
export function serviceDetail(id) {
  return request({
      url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/service/${id}`,
      method: 'get',
  })
}

// 接口审核
export function apiVerify(data) {
  return request({
      url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/service/api/verify`,
      method: 'post',
      data
  })
} 

// 服务接口审核列表
export function verifyList(data) {
  return request({
      url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/service/verify/list`,
      method: 'post',
      data
  })
}

// 开发者已申请接口列表 
export function appliedList(data) {
  return request({
      url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/service/api/applied/list`,
      method: 'post',
      data
  })
}

// 开发者修改已申请接口
export function apiModify(data) {
  return request({
      url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/service/api/modify`,
      method: 'post',
      data
  })
}
// 获取服务接入描述信息desc
export function serviceDesc(data) {
  return request({
      url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/service/desc`,
      method: 'post',
      data
  })
}
// 获取服务接入智能表单及ip信息
export function serviceData(data) {
  return request({
      url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/service/data`,
      method: 'post',
      data
  })
}

// 获取审核服务列表筛选下拉框
export function listselects(data) {
  return request({
      url: `/${process.env.VUE_APP_PROJECT_NAME}/v1/service/verify/listselects`,
      method: 'post',
      data
  })
}