const path = require('path')
const fs = require('fs');
const loaderUtils = require("loader-utils");

module.exports = function(source) {
  const { srcPath, modules} = loaderUtils.getOptions(this);
  const filePath = this.resourcePath;
  const str = filePath.substr(srcPath.length + 1);
  const sepIndex = str.indexOf('\\'), index = str.indexOf('-');
  if(sepIndex > 0 && (index > sepIndex || index < 0)){//判断文件是否标准模块的文件
    let module = str.substring(0, sepIndex);
    let m = modules[module];
    if(m && m.plugin){//判断模块是加入二次开发插件
      let newFilePath = srcPath + path.sep + module + '-' + m.plugin + str.substr(sepIndex);
      if(fs.existsSync(newFilePath)){//判断文件是否有被重写
        console.log('\n文件被重写', filePath);
        return fs.readFileSync(newFilePath, 'UTF-8');
      }
    }
  }
	return source;
}