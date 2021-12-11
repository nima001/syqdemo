<template>
  <div class="add-temp-items">
    <a-form :form="form" class="form-warp">
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="name">
            <a-input
              placeholder="--请填写--"
              v-decorator="['name',{
                rules: [{ required: true, message: '请填写name!' }],
              }]">
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="field">
            <a-select
              placeholder="--请选择--"
              v-decorator="['field',{ rules: [{ required: true, message: '请选择!' }] },]">
              <a-select-option
                v-for="(item, index) in fieldList"
                :key="index"
                :value="item.code">
                {{item.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="condition">
            <a-select
              placeholder="--请选择--"
              v-decorator="['condition',{ rules: [{ required: true, message: '请选择!' }] },]">
              <a-select-option
                v-for="(item, index) in conditionList"
                :key="index"
                :value="item.code">
                {{item.name}}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import { fieldsearch } from "@/person/api/field";
import { Form, Col, Row, Input, Select } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    ACol: Col,
    ARow: Row,
    AInput: Input,
    ASelect:Select,
    ASelectOption:Select.Option,
  },
  data() {
    return {
      fieldList: [],
      conditionList: []
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.loadData(0);
    this.loadData(1);
  },
  methods: {
    loadData(type) {
      fieldsearch({
        pagenum: 1,
        pagesize: 10000,//FIXME 查询所有数据
        needtotal: false,
        type
      })
      .then(res => {
        let data = res.result.rows;
        if(type) {
          this.conditionList = data;
        }else{
          this.fieldList = data;
        }
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
          }
          values.id = Math.floor(Math.random()*1000);
          resolve(values);
        })
      })
    },
  }
}
</script>
<style lang="less" scoped>

</style>