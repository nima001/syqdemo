<template>
  <!--添加扩展数据-->
  <a-modal
    title="添加自定义数据"
    :visible="value"
    width="600px"
    :destroyOnClose="true"
    @cancel="handleCancel"
  >
    <a-form layout="vertical" :form="form">
      <a-row :gutter="20">
        <a-col :span="12">
          <a-form-item label="编码">
            <a-input
              v-decorator="[
                'code',
                {
                  rules: [
                    { required: true, message: '请输入编码' },
                    { pattern: new RegExp(/^[A-Za-z]+$/), message: '编码必须是字母组成' },
                  ],
                  initialValue: formData.code
                },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="名称">
            <a-input
              v-decorator="[
                'name',
                { rules: [{ required: true, message: '请输入名称' }], initialValue: formData.name },
              ]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="数据类型">
            <a-select
              v-decorator="[ 'type', { initialValue: formData.type } ]"
              @change="onFormValueChange('type', $event)"
            >
              <a-select-option v-for="item in datatypeList" :key="item.key">{{item.label}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24" v-if="[2, 3].indexOf(formData.datatype) >= 0">
          <a-form-item label="数据源">
            <a-input
              v-decorator="[
                'datasource',
                { rules: [ { required: true, message: '请输入数据源' } ], initialValue: formData.datasource },
              ]"
              @blur="onFormValueChange('datasource', $event.target.value)"
            >
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="是否多选">
            <a-select
              v-decorator="[
                'multi',
                { initialValue: formData.multi },
              ]"
              @change="onFormValueChange('multi', $event)"
            >
              <a-select-option :value="1">是</a-select-option>
              <a-select-option :value="0">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="是否必填">
            <a-select
              v-decorator="[
                'require',
                { initialValue: formData.require },
              ]"
            >
              <a-select-option :value="1">是</a-select-option>
              <a-select-option :value="0">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div slot="footer">
      <a-button type="primary" @click="submit">确定</a-button>
      <a-button @click="handleCancel">取消</a-button>
    </div>
  </a-modal>
</template>
<script>
import {Modal,Input,Row,Col,Icon,Button,Select,Form} from "ant-design-vue";
import cloneDeep from "lodash/cloneDeep";
export default {
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
    AButton: Button,
    AModal: Modal,
    AInput: Input,
    ARow: Row,
    ACol: Col
  },
  props: {
    value: Boolean,
    initData: {
      type: Object,
      required: true
    }
  },
  data(){
    return{
      form: this.$form.createForm(this, { name: "expandForm" }),
      formData: {},
      datatypeList: [
        {key: '2', label: "字典"},
        {key: '3', label: "引用"},
        {key: '4-0', label: "字符"},
        {key: '4-1', label: "整数"},
        {key: '4-2', label: "浮点数"},
        {key: '4-3', label: "时间"},
        {key: '4-4', label: "布尔"}
      ],
    }
  },
  created(){
    this.formData = this.initFromData(this.initData);
  },
  watch: {
    initData(v){
      this.formData = this.initFromData(v);
    }
  },
  methods: {
    handleCancel() {
      this.$emit("input", false);
    },
    initFromData(data){
      let d = data ? {...data} : {};
      d.datatype = d.datatype || 4;
      d.inputtype = d.inputtype || 0;
      d.type = d.datatype == 4 ? `${d.datatype}-${d.inputtype}` : d.datatype + '';//辅助字段
      d.require = d.require ? 1 : 0;
      d.multi = d.multi ? 1 : 0;
      return d;
    },
    onFormValueChange(type, v){
      this.$set(this.formData, type, v);
      if(type == 'type'){
        let arr = v.split('-');
        this.$set(this.formData, 'datatype', parseInt(arr[0]));
        this.$set(this.formData, 'inputtype', parseInt(arr[1]) || null);
        this.$set(this.formData, 'defaultvalue', undefined);//数据类型变更清空默认值
      }
    },
    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.visible = false;
          this.$emit("ok", Object.assign(values, this.formData));
        }
      });
    },
  }
};
</script>