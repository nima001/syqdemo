import request from '@/framework/utils/request'

//接口管理

//添加接口
export function addApi(data) {
  return request({
      url: '/workflowsystem/v1/sysapimanage/add',
      method: 'post',
      data
  })
}

//更新接口
export function updateApi(data) {
  return request({
      url: '/workflowsystem/v1/sysapimanage/update',
      method: 'put',
      data
  })
}

//获取接口
export function getApi(id) {
  return request({
      url: `/workflowsystem/v1/sysapimanage/get/${id}`,
      method: 'get',
  })
}

//接口列表查询
export function listApi(data) {
  return request({
      url: '/workflowsystem/v1/sysapimanage/list',
      method: 'post',
      data
  })
}

//接口列表分页查询
export function pagelistApi(data) {
  return request({
      url: '/workflowsystem/v1/sysapimanage/pagelist',
      method: 'post',
      data
  })
}

//删除Api
export function delApi(id) {
  return request({
      url: `/workflowsystem/v1/sysapimanage/delete/${id}`,
      method: 'delete',
      id 
  })
}



