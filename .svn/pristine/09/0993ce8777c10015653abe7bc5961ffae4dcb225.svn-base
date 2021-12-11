import request from '@/framework/utils/request'
import { uiConfigsCookies, getCookie } from '@/framework/utils/auth'
import axios from 'axios'

//导入五险一金
export function importwuxian(docFile) {
    let uiConfigs = uiConfigsCookies();
    return new Promise((resolve, reject) => {
        let formdata = new FormData()
        formdata.append("file", docFile)
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Commnet-Token': getCookie('X-Commnet-Token')
            }
        }
        axios.post(uiConfigs['api.url'] + '/person/salary/import/wuxian', formdata, config).then(res => {
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
}
// 初始化请求时间
export function salaryMonthList(orgid) {
    return request({
        url: `person/salary/notsubmit/month/${orgid}`,
        method: 'get',
    })
}
// 工资发放详情
export function salaryDirection(data) {
    return request({
        url: "person/salary/direction",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
// 查看工资详情
export function salarydetail(data) {
    return request({
        url: "person/salary/detail",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
// 获取相应的工资详情
export function salaryResult(data) {
    return request({
        url: "person/salary/result",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//获取组织财政支出
export function salaryExpand(data) {
    return request({
        url: "person/salary/org/expand",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//导出五险一金
export function exportwuxian(data) {
    return request({
        url: "person/salary/export/wuxian",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
// 取消异步导出
export function cancelExport(data) {
    return request({
        url: '/person/asyntask/cancel',
        method: 'get',
        params: data
    })
}
// 获取人员的工资详情
export function usersalary(data) {
    return request({
        url: "person/salary/user",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
// 公司发放记录
export function salaryrecord(payroll) {
    return request({
        url: `person/salary/item/record/${payroll}`,
        method: 'get',
    })
}
//调整比例 和 调整金额
export function salaryupdaterecord(payroll) {
    return request({
        url: `person/salary/update/record/${payroll}`,
        method: 'get',

    })
}
//  删除调整记录
export function deleterecord(id) {
    return request({
        url: `person/salary/payroll/${id}`,
        method: 'delete',
    })
}
// 提交单项金额组件内容
export function salaryUpdate(data) {
    return request({
        url: "person/salary/update",
        method: 'post',
        dataType: "json",
        data: data
    })
}
//  获取工资标准 数据
export function scaledata(id) {
    return request({
        url: `person/scale/data/${id}`,
        method: 'get',
    })
}
// 返回 个人工资 数据的改变
export function salaryItem(data) {
    return request({
        url: `person/salary/item`,
        method: 'post',
        dataType: 'json',
        data: data
    })
}
/*salary-payment-approval*/
//  获取 审核单位
export function salaryAuditdept() {
    return request({
        url: 'person/salary/auditdept',
        method: 'get',
    })
}
// 工资搜索
export function salarySearch(data) {
    return request({
        url: "person/salary/search",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
// 月工资发放记录
export function salaryoverMonth(orgid) {
    return request({
        url: `person/salary/over/month/${orgid}`,
        method: 'get',
    })
}

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
//
export function processdetail(data) {
    return request({
        url: "person/salary/process/detail",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//
export function process(data) {
    return request({
        url: "person/salary/process",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//
export function prostatistic(data) {
    return request({
        url: "person/salary/process/statistic",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//
export function approval(data) {
    return request({
        url: "person/salary/approval",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//
export function constantdictlist(id) {
    return request({
        url: "person/constantdict/list",
        method: 'get',
        params: {
            key: id
        }
    })
}
//重新发起发放工资流程
export function repayoff(data) {
    return request({
        url: `person/salary/repayoff/${data.processid}`,
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//
export function payoff(data) {
    return request({
        url: "person/salary/payoff",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//获取单位考核奖
export function assessment(data) {
    return request({
        url: `person/salary/assessment?date=${data.date}`,
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//修改考核奖
export function assessupdate(data) {
    return request({
        url: `person/salary/update/awards?date=${data.date}&orgid=${data.orgid}`,
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//获取可修改的月份
export function modifiablemonth(data) {
    return request({
        url: "person/salary/awards/modifiablemonth",
        method: 'post',
        dataType: 'json',
        data: data

    })
}
//流程重置
export function salaryreset(data) {
    return request({
        url: `person/salary/process/reset/${data.dataid}`,
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//无标准项目导出模板
export function exportmanually(data) {
    return request({
        url: "person/salary/export/manually",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//社工项目导出模板
export function socialmanually(data) {
    return request({
        url: "person/salary/export/sg",
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//导出考核奖
export function exportawards(data) {
    return request({
        url: `person/salary/export/awards?date=` + data.date,
        method: 'post',
        dataType: 'json',
        data: data
    })
}
//导入考核奖
export function importawards(data) {
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
        let url = uiConfigs['api.url'] + `/person/salary/import/awards?date=${data.date}&orgid=${data.orgid}`;
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
//导入无标准项目
export function importmanually(data) {
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
        let url = uiConfigs['api.url'] + `/person/salary/import/manually?orgid=${data.orgid}`;
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