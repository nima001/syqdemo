<template>
  <div class="edit-template">
    <a-form class="template-form" :form="form">
      <a-form-item label="评估内容">
        <a-input
          v-decorator="['content', 
            { rules: [{ required: true, message: '请输入评估内容'}],
            initialValue: templateInfo ? templateInfo.content : undefined
          }]"
        />
      </a-form-item>
      <a-form-item label="分类">
        <a-select
          v-decorator="['type', 
            { rules: [{ required: false, message: '请选择分类'}], 
            initialValue: templateInfo ? templateInfo.type : undefined
          }]"
          >
          <a-select-option value="机构设置">机构设置</a-select-option>
          <a-select-option value="编制调整">编制调整</a-select-option>
          <a-select-option value="职数调整">职数调整</a-select-option>
          <a-select-option value="职责调整">职责调整</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="评估项">
        <a-select
          mode="multiple"
          style="width: 100%"
          v-decorator="['items', 
            { rules: [{ required: false, message: '请选择评估项'}],
            initialValue: templateInfo ? templateInfo.items : undefined 
          }]"
        >
          <a-select-option v-for="(i,index) in itemArr" :key="index" :value="i.value">
            {{i.text}}
          </a-select-option>
        </a-select>
      </a-form-item>
      
    </a-form>
  </div>
</template>
<script>
import { Input, Icon, Form, Select } from "ant-design-vue";
import { findTem } from "@/person-shaoxing/api/manage";
import { items, getInputs } from '../components/contentItems';
import { showError } from "@/framework/utils/index";
export default {
  name: 'editTemlate',
  props: ['id'],
  components: {
    AInput: Input,
    AIcon: Icon,
    AForm: Form,
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
  },
  data() {
    return {
      templateInfo: undefined,
      itemArr: []
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    for(let key in items) {
      let obj = {}
      obj.value = key;
      obj.text = items[key].text;
      this.itemArr.push(obj);
    }
    if(this.id) {
      this.getDetail();
    }
  },
  methods: {
    getDetail() {
      findTem(this.id)
      .then(({result}) => {
        this.templateInfo = result;
      })
      .catch(err => {
        showError(err);
      })
    },
    getFormValue(){
      return new Promise((resolve, reject) => {
        this.form.validateFields((error, values) => {
          if(error){
            reject({code:'form_validate_fail', message: '表单验证失败'});
          }else{
            let reportNames = values.items ? values.items.join(',') : undefined;
            let value = {
              content: values.content,
              type: values.type,
              items: reportNames,
              inputs: getInputs(values.items)
            };
            resolve(value);
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.edit-template{
  height: 100%;
  display: flex;
  flex-direction: column;
  .template-form{
    flex: auto;
    min-height: 0;
    overflow: auto;
    padding: @content-padding-v @content-padding-h;
  }
}
</style>