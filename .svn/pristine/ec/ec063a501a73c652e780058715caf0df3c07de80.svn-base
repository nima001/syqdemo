import { get, set, has } from 'lodash'


/**
 * 配置属性公共混入
 */
export default {
  props: {
    property: Object, //{ path, title }
    settings: Object,
  },
  inject: ['refresh', 'onValueChange'],
  computed: {
    expanded: {
      get(){
        return this.property._expanded;
      },
      set(value){
        this.property._expanded = !!value;
      }
    },
    realProperty(){
      return this.property.proxy || this.property;
    },
    propValue:{
      get(){
        return this.get(this.realProperty.path);
      },
      set(value){
        this.set(this.realProperty.path, value);
      },
    }
  },
  methods: {
    get(path){
      const val = get(this.settings, path);
      // console.log('getter', this.settings, path, val);
      return val;
    },
    set(path, value){
      // console.log('setter', this.settings, path, value);
      let hasProp = has(this.settings, path);
      set(this.settings, path, value);
      if(!hasProp){
        this.refresh();
      }
      this.onValueChange(path, value, this);
    },
    async validate(value){
      const { validator, title, required } = this.realProperty;
      if(required && !value){
        return { value, error: `${title}不能为空` }
      }
      let rt;
      if(validator){
        rt = validator(value, this.settings);
        if(rt instanceof Promise){
          rt = await rt;
          if(this.value != value){//验证完成后值已经变更
            return;
          }
        }
      }
      return { value, error: rt }
    },
  }
}