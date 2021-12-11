import request from '@/framework/utils/request'

export function addOrg(data){
  return request({
      url:'/idm/v2/org/add',
      method:'post',
      data
  })
}