import request from '@/framework/utils/request'

export function getuserdialog(data) {
  return request({
      //  url: `/usertransfer/sbbusersync/getuserdialog/?idcardList=${idcardList}`,
       url: '/usertransfer/sbbusersync/getuserdialog',
      method: 'post',
      data
  })
}

export function usersyncagain(userid,transfertype) {
  return request({
      // url: `/usertransfer/sbbusersync/usersyncagain/${transfertype}?id=${userid}`,
      url: '/usertransfer/sbbusersync/usersyncagain',
      method: 'post',
      params: {
        userid, transfertype
    }
  })
}