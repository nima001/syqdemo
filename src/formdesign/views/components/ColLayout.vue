<script>
import { Row, Col} from "ant-design-vue";

export default {
  name: 'col-layout',
  title: '栅格布局',
	render(createElement){
    const cols = [];
    if(this.children){
      this.children.forEach(item => {
        if(!item.components || item.components.length == 0){//FIXME sunwen 编辑时还未添加组件
          cols.push(createElement(Col, {
            class: 'cmpt-panel',
            props: {span: item.span || 0},
          }))
        }else{
          let cmptList = this.createCmptList(item.components, createElement);
          if(cmptList.length ){
            cols.push(createElement(Col, {
              class: 'cmpt-panel',
              props: {span: item.span || 0},
            }, cmptList))
          }
        }
      })
    }
		return createElement(Row, {
      props: {gutter: 16, type: 'flex'}
		}, cols)
	},
	props: {
		children: Array,
  },
  inject: ['createCmpt','formData'],
	methods: {
		createCmptList(list, createElement){
      let cmpts = [];
      list.forEach(item => {
        let cmpt = this.createCmpt(item, createElement);
        if(cmpt){
          cmpts.push(cmpt);
        }
      });
			return cmpts;
		}
	}
}
</script>