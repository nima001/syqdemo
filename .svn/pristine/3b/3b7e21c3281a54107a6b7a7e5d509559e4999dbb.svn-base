<template>
  <a-spin :spinning="spin" class="spin">
    <div class="add-report">
      <a-form class="report-form" :form="form">
        <form-group ref="formGroup" :formLayout="formLayout" :props="props" :itemParams="params">
        </form-group>
      </a-form>
    </div>
  </a-spin>
</template>
<script>
import { Form, Spin } from "ant-design-vue";
import FormGroup from './FormGroup';
import { listConfig, reportInput } from "@/person-shaoxing/api/assessment";
import { showError } from '../../../../../framework/utils';
import { getPops, items, loadData } from './contentItems';
let index = 0;
export default {
  name: 'addReport',
  props: {
    spin: Boolean
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    ASpin: Spin,
    FormGroup,
  },
  data() {
    return {
      configData: [],
      orgvisible: false,
      content: [],
      validateStatus: undefined,
      formLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
      itemArr: [],
      open: false,
      itemParams: {}
    }
  },
  computed: {
    props: {
      get() {
        return getPops(this.itemArr)
      },
      set() {
        return getPops(this.itemArr)
      }
    },
    params: {
      get() {
        return this.itemParams
      },
      set() {
        return this.itemParams
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
  },
  methods: {
    getFormValue(){
      return new Promise((resolve, reject) => {
        let obj = {};
        this.validateStatus = 'success';
        this.$refs.formGroup.validateFields(obj)
        .then(res => { 
          resolve({
            target: obj,
            content: this.content,
            itemArr: this.itemArr
          });
        })
        .catch(err => {
          resolve(false);
          showError({code:'form_validate_fail', message: err})
        });
      })
    },
  }
}
</script>
<style lang="less" scoped>
.spin{
  height: 100%;
  /deep/.ant-spin-container{
    height: 100%;
    .add-report{
      height: 100%;
      display: flex;
      flex-direction: column;
      .report-form{
        flex: auto;
        min-height: 0;
        overflow: auto;
        padding: @content-padding-v @content-padding-h;
      }
    }
  }
}
</style>