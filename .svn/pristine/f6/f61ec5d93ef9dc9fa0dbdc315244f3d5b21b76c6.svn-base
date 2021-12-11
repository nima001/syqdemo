<template>
  <div class="basic-info">
    <a-form :form="form" class="form-account" labelAlign="left">

      <div class="title">基本信息</div>
      <a-row>
        <a-col :span="12">
          <a-form-item
          label="姓名"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
              <!-- :read-only="true" -->
            <a-input
              v-decorator="[
                'username',
                { rules: [{ required: true, message: '请输入姓名!' }] },
              ]"
              placeholder="请输入"
            >
              <a-icon slot="addonAfter" type="select" @click="userVisible = true" />
            </a-input>
          </a-form-item>

          <a-form-item
          v-if="isShow"
          label="证件类型"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <dict-select
              :dict="'idm.account.accountcerttype'"
              v-decorator="[
                'certificatetype',
                {
                  rules: [{ required: false, message: '请选择证件类型' }],
                },
              ]"
            />
          </a-form-item>

          <a-form-item
          v-if="isShow"
          label="身份证号"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'idcard',
                { rules: [{ required: false, message: '请输入身份证号!' }] },
              ]"
              placeholder="请输入"
            />
          </a-form-item>

          <a-form-item
          v-if="isShow"
          label="性别"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <dict-select
              :dict="'idm.account.accountsex'"
              v-decorator="[
                'sex',
                {
                  rules: [{ required: false, message: '请选择性别' }],
                },
              ]"
            />
          </a-form-item>

          <a-form-item
          label="设置用户名"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'loginname',
                { rules: [{ required: false, message: '请选择性别!' }] },
              ]"
              placeholder="请选择"
            />
          </a-form-item>

        </a-col>

        <a-col :span="12" class="avater-col">
          <!-- <div class="avater">
            <a-avatar :size="112" icon="user" />  
            <div class="avater-upload">点击上传</div>
          </div> -->
        </a-col>

      </a-row>

      <div class="title">组织信息</div>
      <a-row>
        <a-col :span="12">
          <a-form-item
          label="所在组织"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              :read-only="true"
              v-decorator="[
                'orgname',
                { rules: [{ required: true, message: '请选择组织!' }] },
              ]"
              placeholder="请选择"
              @click="orgVisible = true"
            >
              <a-icon slot="addonAfter" type="select" @click="orgVisible = true" />
            </a-input>
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
          v-if="isShow"
          label="入职类型"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'inductiontype',
                { rules: [{ required: false, message: '请选择入职类型!' }] },
              ]"
              placeholder="请选择"
            />
          </a-form-item>
        </a-col>

      </a-row>

      <a-row v-if="isShow">
        <a-col :span="12">
          <a-form-item
          label="职务"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'position',
                { rules: [{ required: false, message: '请输入职务!' }] },
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
          label="岗位"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'job',
                { rules: [{ required: false, message: '请输入岗位!' }] },
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>

      </a-row>

      <div class="title">联系信息</div>

      <!-- Todo 手机号唯一性验证 -->
      <a-row>
        <a-col :span="12">
          <a-form-item
            label="手机号码"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            >
            <a-input
              v-decorator="[
                'mobilephone',
                { rules: [{ required: true, validator: validatePhoneRules }] },
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
          label="虚拟短号"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'virtualcornet',
                { rules: [{ required: false, message: '请输入虚拟短号!' }] },
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>

      </a-row>

      <a-row>
        <a-col :span="12">
          <a-form-item
          label="办公室电话"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'officephone',
                { rules: [{ required: false, message: '请输入办公室电话!' }] },
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>

        <a-col :span="12">
          <a-form-item
          label="邮箱"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input
              v-decorator="[
                'email',
                { rules: [{ required: false, message: '请输入邮箱!' }] },
              ]"
              placeholder="请输入"
            />
          </a-form-item>
        </a-col>

      </a-row>

      <a-row>
        <a-form-item
          v-if="isShow"
          label="办公地址"
          :label-col="rowLayout.labelCol"
          :wrapper-col="rowLayout.wrapperCol"
          >
          <a-input
            v-decorator="[
              'officeaddress',
              { rules: [{ required: false, message: '请输入办公地址!' }] },
            ]"
            placeholder="请输入"
          />
        </a-form-item>
      </a-row>

      <a-row>
        <a-form-item
          v-if="isShow"
          label="家庭地址"
          :label-col="rowLayout.labelCol"
          :wrapper-col="rowLayout.wrapperCol"
          >
          <a-input
            v-decorator="[
              'homeaddress',
              { rules: [{ required: false, message: '请输入家庭地址!' }] },
            ]"
            placeholder="请输入"
          />
        </a-form-item>
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
    <!-- 组织选择 -->
    <a-modal
      :footer="null"
      v-model="orgVisible"
      :width="500"
      :title="`选择组织`"
      :bodyStyle="{ height: '600px', padding: '0'}"
    >
      <idm-org-tree  @select-ok="orgOk" @select-cancel="orgCancel" />
    </a-modal>

  </div>
</template>

<script>
import { Form, Input, Button, Row, Col, Icon, Avatar } from "ant-design-vue";
import IdmOrgTree from "@/idm/components/IdmOrgTree";
import IdmAccountSelect from "@/idm/components/IdmAccountSelect";
import DictSelect from "@/framework/components/DictSelect";
import { createaccount } from "../../../../api/home";
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
    AAvatar: Avatar,
    IdmOrgTree,
    IdmAccountSelect,
    DictSelect
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
      orgVisible: false,
      info: {
        orgid: undefined,
        userid: undefined
      }
    };
  },
  watch: {},
  computed: {
    isShow() {
      return this.accountType == 'person' ? true : false;
    }
  },
  created() {},
  mounted() {},
  methods: {
    validatePhoneRules(rule, value, callback) {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (rule.required) {
        if (value) {
          if (!reg.test(value)) {
            callback("请输入正确的手机号码！");
          } else {
            callback();
          }
        } else {
          callback("请输入手机号码！");
        }
      } else {
        callback();
      }
    },
    userOk(data) {
      this.userVisible = false;
      let { _id, username } = data;
      this.form.setFieldsValue({ 
        username: username
      });
      this.info.userid = _id;
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
          let accounttype = this.accountType == 'person' ? 1 : 2;
          let params = { ...values, ...this.info, accounttype, inductiontype: 1 };
          // this.$emit('set-info', params);
          // this.$emit('next-step', 'next');
          this.createUser(params);
        } else {
          showError({
            message: '请正确填写表单'
          });
        }
      })
    },
    createUser(data) {
      createaccount(data)
      .then(res => {
        this.$emit('set-info', data);
        this.$emit('next-step', 'next');
      })
      .catch(err => {
        showError(err);
      })
    }
  },
};
</script>
<style lang="less" scoped>
.basic-info{
  .form-account{
    .avater-col{
      // position: relative;
      .avater{
        // position: absolute;
        // right: 112px;
        // top: 20px;
        width: 112px;
        margin-top: 20px;
        .avater-upload{
          line-height: 40px;
          color: @primary-color;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .title{
      font-size: 18px;
      font-weight: bold;
      line-height: 40px;
    }
    .empty{
      width: 100%;
      height: 65px;
    }
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