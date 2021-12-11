
import { connect, mapProps } from '@formily/vue'
import SwitchBox from './SwitchBox'

const Switch = connect(
  SwitchBox,
  mapProps(
    { readPretty: true }
  )
)

export default Switch;

export const Meta = {
  name: 'Switch',
  type: 'widget',
  title: '开关',
  icon: 'bool',
  component: Switch,
  index: 5,
  initialSchema: () => {
    return {
      type: 'boolean',
      title: "开关",
      'x-decorator': 'FieldDecorator',
      'x-component': 'Switch',
    }
  },
  props: {
    checkedChildren: {
      type: 'string',
      title: '开时展示内容'
    },
    unCheckedChildren: {
      type: 'string',
      title: '关时展示内容'
    }
  }
};

