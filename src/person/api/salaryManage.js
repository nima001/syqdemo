import request from '@/framework/utils/request'

// 目前工资详情
export function salarysgdetail(userid) {
	return request({
		url: `person/salary/sgdetail/${userid}`,
		method: 'get',
	})
}
// 套改前工资详情
export function salaryexchange(userid) {
    return request({
        url: `person/salary/exchange/${userid}`,
        method: 'get',
    })
}