<template>
  <div class="main">
    <a-form
      layout="horizontal"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 17 }"
      :form="form"
      @submit="formSubmit"
    >
      <a-form-item label="发文字号" :required="true">
        <a-input-group compact>
          <a-input
            type="text"
            v-model="name"
            :style="{width:'30%'}"
            autocomplete="off"
            @change="validateNum"
          />
          <a-input
            addonBefore="〔"
            addonAfter="〕"
            type="text"
            :style="{width:'40%'}"
            autocomplete="off"
            @input="filterNumber('year',$event)"
            @change="validateNum"
            v-model="year"
          />
          <a-input
            addonAfter="号"
            @input="filterNumber('number',$event)"
            v-model="number"
            type="text"
            :style="{width:'30%'}"
            @change="validateNum"
            autocomplete="off"
          />
        </a-input-group>
        <a-input type="text" v-decorator="['num']" autocomplete="off" :style="{display:'none'}" />
      </a-form-item>

      <a-form-item label="文件标题">
        <a-input
          v-decorator="['title', { rules: [{ required: true, message: '请填写正确的文件标题!' }] }]"
          placeholder="请填写文件标题"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item label="发文时间">
        <a-date-picker
          :style="{width:'100%'}"
          v-decorator="['dispatchdate', { rules: [{ required: true, message: '请填写正确的发文时间!' }] }]"
          :format="dateFormat"
        />
      </a-form-item>

      <a-form-item label="文件来源">
        <a-select
          v-decorator="['level',{rules:[{required:true,message:'请选择文件来源!'}]}]"
          placeholder="--请选择--"
        >
          <a-select-option value="1">上级文件</a-select-option>
          <a-select-option value="2">本级文件</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="文件上传">
        <div @click="trigger" :style="{display:'inlineBlock',cursor:'pointer'}">
          <template v-if="fileName === undefined">
            <a-icon type="upload" :style="{color:'#1890ff'}" />&nbsp;上传文件
          </template>
          <template v-else>
            <a-icon type="file" :style="{color:'#1890ff'}" />
            &nbsp;{{fileName}}
          </template>
        </div>
        <input type="file" ref="fileBtn" class="fileBtn" @change="uploadFile($event)" multiple="multiple"/>
        <a-input
          :style="{display:'none'}"
          v-decorator="['fileuri', { rules: [{ required: true, message: '请上传文件!' }] }]"
          placeholder="请上传文件"
        />
      </a-form-item>
      <div class="footer">
        <a-button class="submitBtn" type="primary" html-type="submit">确定</a-button>
      </div>
    </a-form>
  </div>
</template>
<script>
import moment from "moment";
import { document } from "@/person/api/document";
import { upload } from "@/framework/api/file";
import {
  Modal,
  Form,
  Row,
  Input,
  Button,
  Select,
  Icon,
  DatePicker
} from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputGroup: Input.Group,
    AButton: Button,
    ASelect: Select,
    ASelectOption: Select.Option,
    AIcon: Icon,
    ADatePicker: DatePicker
  },
  data() {
    return {
      dateFormat: "YYYY-MM-DD",
      form: this.$form.createForm(this, { name: "uploadDocForm" }),
      fileName: undefined,
      name: undefined,
      year: undefined,
      number: undefined
    };
  },
  methods: {
    filterNumber(key, e) {
      this[key] = e.target.value.replace(/[^\d]/g, "");
    },
    validateNum() {
      if (!this.name || !this.year || this.year.length > 4 || !this.number || this.number.length > 3) {
        this.form.setFields({
          num: { errors: [{ message: "批准文号参照【杭编办〔2017〕023号】格式填写" }] }
        });
      } else {
        this.form.setFields({
          num: {
            value: this.name + "〔" + this.year + "〕" + this.number + "号"
          }
        });
      }
    },
    //上传文件
    uploadFile(event) {
      let file = event.target.files[0];
      upload(file)
        .then(res => {
          this.fileName = file.name;
          this.$message.success("文件上传成功！");
          this.form.setFieldsValue({ fileuri: res.data.result });
        })
        .catch(error => {
          showError(error);
        });
    },
    trigger() {
      this.$refs.fileBtn.value = null;
      this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
    },
    // 表单提交
    formSubmit(e) {
      e.preventDefault();
      this.validateNum();
      this.form.validateFields((err, values) => {
        if (!err) {
          let data = Object.assign({},values,{ dispatchdate: moment(values.dispatchdate).format("YYYY-MM-DD") },{ type: 1 });
          document(data)
            .then(res => {
              this.$message.success("上传成功！");
              this.$emit("finish", res.result);
            })
            .catch(err => {
              showError(err);
            })
            // .finally(() => {
            //   this.form.resetFields();
            //   this.fileName = undefined;
            //   this.name = undefined;
            //   this.year = undefined;
            //   this.number = undefined;
            // });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.ant-form {
  padding-top: @padding-lg;
  /deep/ .ant-input-group-addon {
    padding: 0px 5px;
  }
  /deep/ .ant-input-group-wrapper {
    top: 0px;
  }
  .fileBtn {
    width: 0px;
    height: 0px;
    opacity: 0;
  }
  .ant-input-group {
    width: auto;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    &:hover {
      border-color: @primary-color;
    }
    &:focus-within {
      border-color: @primary-color;
      box-shadow: 0 0 0 2px fade(@primary-color, 20%);
    }
    /deep/.ant-input {
      border: none;
      height: 30px;
    }
    /deep/.ant-input-group-addon {
      border: none;
      background: none;
    }
  }
  .footer{
    padding: @content-padding-v @content-padding-h;
    text-align: right;
    border-top: 1px solid @border-color-base;
  }
}
</style>