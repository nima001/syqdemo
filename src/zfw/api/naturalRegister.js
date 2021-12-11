import request from "../utils/request"

export function getList(data) {
  return request({
      url: `/idmgzmh/loginReport/getAppData?keyword=${data.keyword}&resource=${data.resource}`,
      method: 'post'
  })
}

export function getRegsortTypes() {
  return request({
      url: `/idmgzmh/regdata/getRegsortTypes`,
      method: 'get'
  })
}

export function regReportDate(data) {
  return request({
      url: `/idmgzmh/regdata/regReportDate?startTime=${data.startTime}&endTime=${data.endTime}&resources=${data.resources}&appIds=${data.appIds}`,
      method: 'post'
  })
}

export function loginReportDate(data) {
  return request({
      url: `/idmgzmh/loginReport/loginReportDate?startTime=${data.startTime}&endTime=${data.endTime}&resources=${data.resources}&appIds=${data.appIds}`,
      method: 'post'
  })
}

export function overview(data) {
  return request({
      url: `/idmgzmh/totaldata/totalReportData?startTime=${data.startTime}&endTime=${data.endTime}&userType=${data.userType}`,
      method: 'post'
  })
}

export function detailPageReg(data) {
  return request({
      url: `/idmgzmh/regdata/getRegDetailPage?startTime=${data.startTime}&endTime=${data.endTime}&resources=${data.resources}&target=${data.target}&page=${data.page}&rows=${data.rows}`,
      method: 'post'
  })
}

export function exportReg(data) {
  return request({
      url: `/idmgzmh/regdata/export?startTime=${data.startTime}&endTime=${data.endTime}&resources=${data.resources}&target=${data.target}`,
      method: 'post'
  })
}

export function detailPageLogin(data) {
  return request({
    url: `/idmgzmh/loginReport/getDetailPage?startTime=${data.startTime}&endTime=${data.endTime}&resources=${data.resources}&target=${data.target}&page=${data.page}&rows=${data.rows}`,
    method: 'post'
  })
}

export function exportLogin(data) {
  return request({
      url: `/idmgzmh/loginReport/export?startTime=${data.startTime}&endTime=${data.endTime}&resources=${data.resources}&target=${data.target}`,
      method: 'post'
  })
}