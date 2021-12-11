export const mixins = {
  props:{
    namespace: {
      type: String,
      required: true
    },
    contextParams:{
      type:Object
    },
    value:{
      required:true
    },
    dom:{
      required:true
    }
  },
  data() {
    return {
      params : this.value
    } 
  },
  watch: {
    value(v){
      this.params = v
    }
  },
  methods: {
    editorParams (item, type) {
      let replaceStr = this.generateStr(item, type)
      let selectionStart = this.dom.selectionStart
      let selectionEnd = this.dom.selectionEnd
      this.params = this.params.substring(0, selectionStart) + replaceStr + this.params.substring(selectionEnd)
      // TODO 不设置dom.value = this.params 选中函数参数无效
      this.dom.value = this.params
      this.$emit('input',this.params)
      if (type == 1) {
        let args = replaceStr.substring(replaceStr.indexOf('(') + 1,replaceStr.indexOf(')'))
        let argsArr = args.split(',')
        let arg = argsArr[0]
        if (arg) {
          let start = selectionStart + replaceStr.indexOf('(') + 1
          let end = start + arg.length
          this.dom.setSelectionRange(start, end)
        }
      } else {
        let position = selectionStart + replaceStr.length
        this.dom.setSelectionRange(position, position)
      }
      this.dom.focus()
    },
    // 生成文本框字符串 type   1=> 函数    2.作用域数据    3.数据集 name    4. 数据集
    generateStr (item, type) {
      let str = ''
      switch (type) {
        case 1:str = this.generateFn(item);break;
        case 2:str = item.name;break;
        case 3:str = item.name;break;
        case 4:str = this.checkStr(item.key)? `${this.prefix}['${item.key}']`: `${this.prefix}.${item.key}`;break;
      }
      return str;
    },
    // 判断字符串是否包含特殊字符
    checkStr (str) {
      let validChar = /[~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
      return validChar.test(str);
    },
    generateFn(item){
      let arr = item.arguments;
      let args =[];
      arr.map((item,index)=>{args.push(item.name)});
      return `${item.name}(${args.join(',')})`;
    }
  }
}
