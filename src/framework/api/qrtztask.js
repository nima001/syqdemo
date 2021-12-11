import request from '@/framework/utils/request'

//校验cron表达式是否合法
export function checkCronExpre(cronexpre) {
  return request({
      url: `/${process.env.VUE_APP_PROJECT_NAME}/qrtz/checkcronexpre`,
      method: 'get',
      params: {
        cronexpre
      }
  })
}

//根据cron表达式获取最近几次的执行时间，默认10次
export function nextTimes(cronexpre,times) {
  return request({
      url: `/${process.env.VUE_APP_PROJECT_NAME}/qrtz/getnexttimes`,
      method: 'get',
      params: {
        cronexpre,
        times
      }
  })
}