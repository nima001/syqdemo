
// 解析url
export function parseQueryString (url) {
  let json = {}
  url = decodeURI(url)
  const arr = url.substr(url.indexOf('?') + 1).split('&')
  arr.forEach(function (item) {
    var tmp = item.split('=')
    json[tmp[0]] = tmp[1]
  })
  return json
}
