
const path = require('path')
const glob = require("glob")
const loaderUtils = require("loader-utils");

module.exports = function(source) {
  const {modules} = loaderUtils.getOptions(this);
  let str = 'framework'
  Object.keys(modules).forEach(module => {
    const { plugin } = modules[module];
    str += ',' + module;
    if(plugin){
      str += ',' + module + '-' + plugin;
    }
  })
  let widgets = glob.sync(`./src/{${str}}/widgets/*.vue`).map(file => {
    return `${path.basename(file, '.vue')}: () => import('@${file.substr(5)}')`;
  });
	return `export default { ${widgets.join(',')} }`;
}