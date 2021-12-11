

/**
 * 获取属性列表
 * @param {*} properites 
 * @param {*} path 
 */
export function getPropList(properites, path){
  let arr = [];
  if(properites){
    for(let key in properites){
      let v = properites[key];
      let p = v.path;
      if(v.type == 'void'){//虚拟字段 路径为父路径
        p = path;
      }else{
        if(p){
          if(p.startsWith('.')){
            p = path ? path + p : p.substr(1);  
          }
        }else{
          p = path ? path + '.' + key : key;
        }
      }
      arr.push({name: key, ...v, path: p, _expanded: false})
  
    }
  }
  return arr;
}