

/**
 * 打开菜单
 * @param {Object} menu 
 */
export function openMenu(menu, router){
  let url = menu.componenturi;
  if (menu.children && menu.children.length > 0) {
    router.push(`/main/menu/${menu.id}`).catch(err => {
      //ignore
    });
  } else if(url){
    let _blank = ((menu.flag || 0) & (1 << 3)) != 0;
    if(url.startsWith('redirect:')){
      url = menu.componenturi.slice(9);
      _blank = true;
    }
    let temp = url.toUpperCase();
    if(temp.startsWith('http:') || temp.startsWith('https:')){
      if(_blank){
        window.open(url);
      }else{
        window.location.href = url;
      }
    }else if(_blank){
      window.open(router.resolve(url).href);
    }else{
      router.push(url).catch(err => {
        //ignore
      });
    }
  }
}