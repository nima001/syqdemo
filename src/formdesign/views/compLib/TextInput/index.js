
import { connect, mapProps } from '@formily/vue'
import Input from './Input'

const TextInput = connect(//部分标准属性桥接到组件参数中
  Input,
  mapProps(
    { readPretty: true },
    (props, field) => {
      return {
        allowClear: !field.required,
      }
    }
  ),
)

export default TextInput;

export const Meta = {
  name: 'TextInput',
  type: 'widget',
  title: '文本输入',
  icon: 'string',
  component: TextInput,
  index: 1,
  initialSchema: () => {
    return {
      type: 'string',
      title: "文本输入",
      'x-decorator': 'FieldDecorator',
      'x-component': 'TextInput',
    }
  },
  props: {
    placeholder: {
      type: 'string',
      title: '提示信息'
    }
  }
};

