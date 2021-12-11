import { connect, mapProps } from '@formily/vue'

import ChangeDict from './ChangeDict'
import DictList from './DictList'
import DictSelect from './Select'


const Select = connect(
  DictSelect,
  mapProps(
    { readPretty: true },
    (props, field) => {
      return {
        allowClear: !field.required,
      }
    }
  ),
)

export default Select;

export const Meta = {
  name: 'DictSelect',
  type: 'widget',
  title: '下拉选择',
  icon: 'dict',
  index: 2,
  component: Select,
  initialSchema: () => {
    return {
      type: 'string',
      title: "下拉选择",
      'x-decorator': 'FieldDecorator',
      'x-component': 'DictSelect',
    }
  },
  props: {
    multiple: {
      type: 'boolean',
      title: '多选'
    },
    dict: {
      type: 'object',
      title: '选项',
      extra: ChangeDict,
      content: DictList
    },
    showSearch: {
      type: 'boolean',
      title: '显示搜索',
      defaultValue: true,
    },
    showGroup: {
      type: 'boolean',
      title: '显示分组',
      defaultValue: true,
    },
    placeholder: {
      type: 'string',
      title: '提示信息'
    },
  }
};

