


function table(data){
    let detailData = data 
    

    //封装 thead tbody
    let dataArr = detailData.result
    let thead = dataArr.thead;
    let tbody = dataArr.tbody;
    let dataKey = []  //指定唯一 dataIndex

    //封装columns
    let ifHead = false
    let index = 0
    for(let i=0;i<thead.length;i++){
        if(thead.length == 1){
            let childrenArr = thead[i].children
            let childrenOnly
            for(let j=0;j<childrenArr.length;j++){
                if(j == 0){
                    childrenOnly = `head`
                }else{
                    childrenOnly = `children${j-1}`
                }
                childrenArr[j].key = childrenOnly
                childrenArr[j].align = 'center'
                childrenArr[j].dataIndex = childrenOnly;
                dataKey.push(childrenOnly)
            }
        }else{
            if(thead[i].title){
                if(ifHead){
                    let only = `children${index}`
                    index++;
                    thead[i].align = 'center'
                    thead[i].dataIndex = only;
                    thead[i].key = only;
                    if(thead[i].children){
                    
                    }else{
                        dataKey.push(only)
                    }
                }else{
                    ifHead = true
                    thead[i].align = 'center'
                    thead[i].dataIndex = 'head';
                    thead[i].key = 'head';
                    if(thead[i].children){
                        
                    }else{
                        dataKey.push('head')
                    }   
                }
            }
            if(thead[i].children){
                let childrenArr = thead[i].children
                for(let j=0;j<childrenArr.length;j++){
                    let childrenOnly = `children${j+index}`
                    childrenArr[j].key = childrenOnly
                    childrenArr[j].align = 'center'
                    childrenArr[j].dataIndex = childrenOnly;
                    dataKey.push(childrenOnly)
                }
            } 
        }
    }
    let columns = thead  //列

    //封装 datasource
    let datasourceArr = []
    for(let i=0;i<tbody.length;i++){
        let arr = []
        let rowObj = {}
        arr.push(tbody[i].text)
        for(let j=0;j<tbody[i].data.length;j++){
            arr.push(tbody[i].data[j].salary)
        }
        for(let m=0;m<dataKey.length;m++){
            rowObj[dataKey[m]] = arr[m]
        }
        rowObj.key = `row${i}`  //指定唯一key
        datasourceArr.push(rowObj)
    }
    let datasource = datasourceArr

    return {columns,datasource}
}

export default table


