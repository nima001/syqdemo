import request from '@/framework/utils/request'

//查询任务进度
export function taskProgress(taskid) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/asyntask/progress`,
        method: 'get',
        params: {
            taskid
        }
    })
}

//取消任务
export function taskCancel(taskid) {
    return request({
        url: `/${process.env.VUE_APP_PROJECT_NAME}/asyntask/cancel`,
        method: 'get',
        params: {
            taskid
        }
    })
}

const looperMap = new Map();

async function doLoop(taskid){
    try {
        let {result} = await taskProgress(taskid);
        const looper = looperMap.get(taskid);
        if(!looper){
            return;
        }
        if(looper.cancel){//正在取消，直接继续
            looper.timer = setTimeout(() => {
                doLoop(taskid);
            }, 2000);
            return;
        }
        if(result.status == 'FINISH'){
            looper.resolve(result.data);
        }else if(result.status == 'ERROR'){
            looper.reject(result);
        }else {
            if(looper.progress){
                if(looper.progress(result) === false){
                    looperMap.delete(taskid);
                    looper.reject('canceled');
                    return;
                }
            }
            looper.timer = setTimeout(() => {
                doLoop(taskid);
            }, 2000);
        }
    } catch (error) {
        const looper = looperMap.get(taskid);
        if(looper){
            looper.reject(error);    
        }
    }
}

/**
 * 轮询查询异步请求的结果 轮询失败、任务失败、任务取消都会抛出异常
 * @param {String} taskid 轮询的任务ID
 * @param {Function} progress 进度回调 在进度回调方法中return false 可停止轮询 或调用stopLoopTask主动停止
 */
export function loopTaskResult(taskid, progress){
    return new Promise((resolve, reject) => {
        looperMap.set(taskid, {
            resolve, reject, progress
        });
        doLoop(taskid)
    })
}

/**
 * 停止轮询
 * @param {String} taskid 
 * @param {Boolean} cancel 是否取消任务 取消任务将通知服务器停止，否则只是停止轮询进度，任务仍继续执行
 */
export function stopLoopTask(taskid, cancel){
    const looper = looperMap.get(taskid);
    if(looper){
        if(cancel){
            looper.cancel = true;//标记正在取消，防止任务取消后，定时轮询执行
            return taskCancel(taskid).then(({result}) => {
                if(looperMap.delete(taskid)){
                    if(looper.timer){
                        clearTimeout(looper.timer);
                    }
                    looper.reject('canceled');
                }
            }).catch(err => {
                looper.cancel = false;
                return Promise.reject(err)
            })
        }else{
            looperMap.delete(taskid);
            if(looper.timer){
                clearTimeout(looper.timer);
            }
            looper.reject('canceled');
        }
    }
    return Promise.resolve();
}