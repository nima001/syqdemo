<template>
  <a-modal title="应用转让信息" :visible="true" width="600px" :footer="null" @cancel="transferInfoClose">
    <a-form :form="form" labelAlign="left">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-item label="转让码">
            <a-input :read-only="true" v-decorator="['accessCode',{initialValue: appData.code}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="创建时间">
            <a-input
              :read-only="true"
              v-decorator="['createtime',{ initialValue: appData.createtime}]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="剩余有效时间">
            <a-input
              :read-only="true"
              suffix="小时"
              v-decorator="['accessCode',{ initialValue: appData.validtime}]"
            ></a-input>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="24" v-if="appData.data">
        <!-- <p>接收人信息</p> -->
        <a-col :span="12">
          <a-form-item label="姓名">
            <a-input
              :read-only="true"
              v-decorator="['accessCode',{initialValue: appData.data.username}]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="联系方式">
            <a-input
              :read-only="true"
              v-decorator="['accessCode',{ initialValue: appData.data.mobilephone}]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="登录名">
            <a-input
              :read-only="true"
              v-decorator="['loginname',{ initialValue: appData.data.loginname}]"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="身份证号">
            <a-input :read-only="true" v-decorator="['idcard',{ initialValue: appData.data.idcard}]"></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="邮箱地址">
            <a-input :read-only="true" v-decorator="['email',{ initialValue: appData.data.email}]"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24" class="btnList">
        <a-col :span="24">
          <a-button @click="transferConfirm(0)">拒绝转让</a-button>
          <a-button type="primary" @click="transferConfirm(1)">确认转让</a-button>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
<script>
import { Input, Form, Button, Row, Col } from "ant-design-vue";
import { transferinfo, transferconfirm } from "@/dev/api/app";
import { showError } from "@/framework/utils";
export default {
  components: {
    AInput: Input,
    AForm: Form,
    AButton: Button,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col
  },
  props: {
    record: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      transferConfirmLoading: false,
      form: this.$form.createForm(this),
      appData: {}
    };
  },
  created() {
    this.getTransferInfo();
  },
  methods: {
    //关闭当前弹窗
    transferInfoClose() {
      this.$emit("callBack", { type: "cancel" });
    },
    //获取转让信息
    getTransferInfo() {
      transferinfo(this.record.id)
        .then(res => {
          this.appData = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    // 确认转让
    transferConfirm(state) {
      let data = {
        state: state,
        appid: this.record.id
      };
      transferconfirm(data)
        .then(res => {
          let message = state === 0 ? "拒绝转让" : "确认转让";
          this.$message.success(message + "成功!");
          this.$emit("callBack", { type: "ok" });
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang='less' scoped>
.ant-form-item {
  margin-bottom: 12px;
}
.btnList {
  text-align: right;
  .ant-btn {
    &:last-child {
      margin-left: @layout-space-base;
    }
  }
}
</style>