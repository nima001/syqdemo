<template>
  <div class="departureinfo">
    <a-form :form="form" class="form-account" labelAlign="left">
      <a-row>
        <a-col :span="12">
          <a-form-item
          label="离职人员"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'username',
                { rules: [{ required: true, message: '请输入或选择离职人员' }] },
              ]"
              placeholder="请输入或选择离职人员"
            >
              <a-icon slot="addonAfter" type="select" @click="userselect" />
            </a-input>
          </a-form-item>

          <a-form-item
          label="离职类型"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select 
                v-decorator="[
                  'departuretype',
                  { rules: [{ required: true, message: '请选择' }] },
                ]"
                placeholder="请选择"
                >
                <a-select-option value="退休" key="0">
                  退休
                </a-select-option>
                <a-select-option value="辞职" key="1">
                  辞职
                </a-select-option>
                <a-select-option value="停职" key="2">
                  停职
                </a-select-option>
                <a-select-option value="免职" key="3">
                  免职
                </a-select-option>
                <a-select-option value="死亡" key="4">
                  死亡
                </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
          label="离职时间"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-date-picker 
              v-decorator="[
                  'departuretime',
                  { rules: [{ required: true, message: '请选择' }] },
                ]"
                placeholder="请选择"
             />
          </a-form-item>

          <a-form-item
          label="离职说明"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-textarea
              v-decorator="[
                'departuredesc',
                { rules: [{ required: true, message: '请输入' }] },
              ]"
              placeholder="请输入"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            />
          </a-form-item>
        </a-col>
      </a-row>
      
      <div class="showinfo">
        <div class="showtitle">离职人员信息</div>
        <div class="link">点击查看详细个人资料&nbsp;></div>
      </div>
      <a-divider />

      <a-row>
        <a-col :span="8">
          <a-form-item
          label="姓名"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              :read-only="true"
              v-decorator="['name']"
            >
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item
          label="用户名"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              :read-only="true"
              v-decorator="['loginname']"
            >
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item
          label="账号状态"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              :read-only="true"
              v-decorator="['accountstatus']"
            >
            </a-input>
          </a-form-item>
        </a-col>

      </a-row>

      <a-row>
        <a-col :span="8">
          <a-form-item
          label="证件类型"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              :read-only="true"
              v-decorator="['certificatetype']"
            >
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item
          label="身份证号"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              :read-only="true"
              v-decorator="['idcard']"
            >
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item
          label="性别"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              :read-only="true"
              v-decorator="['sex']"
            >
            </a-input>
          </a-form-item>
        </a-col>

      </a-row>

      
      <a-row>
        <a-col :span="8">
          <a-form-item
          label="手机号"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              :read-only="true"
              v-decorator="['mobilephone']"
            >
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="8">
          <a-form-item
          label="组织"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              :read-only="true"
              v-decorator="['orgname']"
            >
            </a-input>
          </a-form-item>
        </a-col>

      </a-row>
      
      <div class="empty"></div>
    </a-form>
    <div class="footer">
      <a-button @click="goHome">取消</a-button>
      <a-button type="primary" @click="nextStep">下一步</a-button>
    </div>
     <!-- 人员选择 -->
    <a-modal
      :footer="null"
      v-model="userVisible"
      :width="800"
      :title="`选择人员`"
      :bodyStyle="{ height: '600px', padding: '0'}"
    >
      <idm-account-select  @select-ok="userOk" @select-cancel="userCancel" />
    </a-modal>
  </div>
</template>

<script>
import { Form, Input, Button, Row, Col, Icon, Divider, Select, DatePicker} from "ant-design-vue";
import IdmOrgTree from "@/idm/components/IdmOrgTree";
import IdmAccountSelect from "@/idm/components/IdmAccountSelect";
import { showError } from "@/framework/utils/index";

export default {
  props: {
    accountType: {
      type: String
    }
  },
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AButton: Button,
    ARow: Row,
    ACol: Col,
    AIcon: Icon,
    ADivider: Divider,
    ATextarea: Input.TextArea,
    ASelect: Select,
    ASelectOption: Select.Option,
    ADatePicker: DatePicker,
    IdmOrgTree,
    IdmAccountSelect,
  },
  data() {
    return {
      form: this.$form.createForm(this, { name: 'basic-info' }),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      },
      rowLayout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 19 },
      },
      userVisible: false,
      info: {
        orgid: undefined,
        userid: undefined
      }
    };
  },
  methods: {
    userselect(){
      this.userVisible = true
    },
    userOk(data) {
      this.userVisible = false;
      let { _id, username, loginname, idcard, sex, status, mobilephone, org} = data;
      this.form.setFieldsValue({ 
        username: username
      });
      this.info.userid = _id;
      if(sex == 0){
        this.form.setFieldsValue({
          sex: '女'
        })
      }
      if(sex == 1){
        this.form.setFieldsValue({
          sex: '男'
        })
      }
      if(status == 1){
        this.form.setFieldsValue({
          accountstatus: '未开户'
        })
      }
      if(status == 2){
        this.form.setFieldsValue({
          accountstatus: '未激活'
        })
      }
      if(status == 3){
        this.form.setFieldsValue({
          accountstatus: '正常'
        })
      }
      if(status == 4){
        this.form.setFieldsValue({
          accountstatus: '禁用'
        })
      }
      if(status == 5){
        this.form.setFieldsValue({
          accountstatus: '离职'
        })
      }
      if(idcard){
        this.form.setFieldsValue({
          certificatetype: '身份证'
        })
      }
      this.form.setFieldsValue({ 
        name: username,
        loginname: loginname,
        idcard: idcard,
        mobilephone: mobilephone,
        orgname: org.name,

      });
    },
    userCancel() {
      this.userVisible = false;
    },
    orgOk(org) {
      this.orgVisible = false;
      let { _id, name } = org.data;
      this.form.setFieldsValue({ 
        orgname: name
      });
      this.info.orgid = _id;
    },
    orgCancel() {
      this.orgVisible = false;
    },
    goHome() {
      this.$router.push('/idm/index');
    },
    nextStep() {
      this.form.validateFields((err, values) => {
        if(!err) {
          
        } else {
          showError({
            message: '请正确填写表单'
          });
        }
      })
    },

  },
};
</script>
<style lang="less" scoped>
.departureinfo{
    .empty{
      width: 100%;
      height: 65px;
    }
    .empty2{
      width: 100%;
      height: 25px;
    }
    .showtitle{
      float: left;
    }
    .link{
      color: @primary-color;
      cursor: pointer;
      float: right;
    }
  .footer{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 65px;
    box-shadow: 0 -2px 5px fade(@black, 20%);
    background-color: @white;
    button{
      width: 150px;
      &:last-child{
        margin-left: 50px;
      }
    }
  }
}
</style>