<template>
  <div class="reduce-people">
    <a-form id="form" :form="form" layout="horizontal">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="姓名" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
            <a-input 
              v-if="selected"
              :disabled="true" 
              v-decorator="['username',{
                rules: [{ required:true}],
                initialValue: selected.username
              }]"
              >
            </a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="身份证" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
            <a-input 
              v-if="selected"
              :disabled="true"
              v-decorator="['idcard',{
                rules: [{ required:false}],
                initialValue: selected.idcard
              }]"
              >
            </a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="减员时间" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
            <a-date-picker 
              v-decorator="[`reduceTime`,{rules: [{required: true, message: '请填写减员时间!'}]}]" 
              />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="减员原因" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
            <dict-select
              dict="workflow.custom.jyyy"
              placeholder="请选择原因"
              v-decorator="[`reduceReason`,{rules: [{required: true, message: '请填写减员原因!'}]}]"
              >
            </dict-select>
          </a-form-item>
        </a-col>
      </a-row>
      <!-- <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="减员去向" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-textarea 
              style="resize:none;"
              maxlength="200" 
              placeholder="最多填200个字符!"
              :rows="6" 
              allow-clear
              v-decorator="[`reduceTo`,{rules: [{required: true, message: '请填写减员去向!'}]}]"
              />
          </a-form-item>
        </a-col>
      </a-row> -->
      <a-row :gutter="24">
        <a-col :span="24">
          <a-form-item label="减员备注"  :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
            <a-textarea 
              style="resize:none;"
              maxlength="200"
              placeholder="最多填200个字符!" 
              :rows="6" 
              allow-clear 
              v-decorator="[`reduceMarks`,{rules: [{required: false}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <div class="footer-submit">
      <a-button type="primary" @click="submit">提交</a-button>
    </div>
  </div>
</template>
<script>
import { Spin,Row, Col, Form, Input, DatePicker, Textarea, Button } from "ant-design-vue";
import DictSelect from "@/framework/components/DictSelect";
import { reduceUser } from "@/person/api/user";
import { showError } from "@/framework/utils/index";
import moment from "moment";
export default {
  props: ["selected"],
  components: {
    ASpin: Spin,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    ADatePicker: DatePicker,
    ATextarea: Input.TextArea,
    AButton: Button,
    DictSelect
  },
  data() {
    return {
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    submit() {
      this.form.validateFields((error, values) => {
        if(error){
          this.$notification.warning({
            message: "提示",
            description: "表单验证失败!",
            duration: 1.5
          });
        }else{
          // "reducedirection": values.reduceTo,
          reduceUser({
            "idcard": values.idcard,
            "reducedate":  moment(values.reduceTime._d).format("YYYY-MM-DD"),
            "reducereason": values.reduceReason,
            "reduceremarks": values.reduceMarks,
            "userid": this.selected._id,
            "username": values.username,
            "orgid": this.selected.org._id
          })
          .then(res => {
            if (res.code == "success") {
              this.$notification.success({
                message: "提示",
                description: "删除成功!",
                duration: 1.5
              });
              this.$emit('finish', "ok");
            }
          })
          .catch(err => {
            showError(err);
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.reduce-people{
  height: 100%;
  padding: @padding-xs @padding-lg;
  position: relative;
  /deep/.ant-form-item-children{
    width: 100%;
    /deep/.ant-calendar-picker{
      width: 100%;
    }
  }
  .footer-submit{
    position: absolute;
    left: 0;
    bottom: @padding-xs;
    width: 100%;
    padding: @padding-xs  @padding-lg;
    button{
      float: right;
      margin-left: @padding-xs;
      border-color: @primary-color;
    }
  }
}
</style>