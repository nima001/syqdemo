<template>
  <div class="base-attributes">
    <a-form :form="form">
      <a-form-item label="流程模板名称：" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
        <a-input
          :maxlength="30"
          placeholder="最多填30个字符!"
          v-decorator="[
           `name`,
          {rules: [{ required: true, message:  `请填写流程模板名称!` }],
          initialValue: formData.name}
        ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="别名：" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
        <a-input
          :maxlength="30"
          placeholder="最多填30个字符!"
          v-decorator="[
           `alias`,
          {rules: [{ required: true, message:  `请填写别名!` }],
          initialValue: formData.alias}
        ]"
        ></a-input>
      </a-form-item>
      <a-form-item label="分组：" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
        <a-row :gutter="10">
          <a-col :span="18">
            <a-select
              placeholder="--请选择分组--"
              v-decorator="[
           `groupid`,
          {rules: [{ required: true,message:  `请选择分组!` }],
          initialValue: formData.groupid}
        ]"
            >
              <a-select-option
                v-for="item in groupList"
                :key="item.value"
                :label="item.text"
              >{{item.text}}</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="6">
            <a-button @click="openGroup">分组管理</a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="流程模板描述：" :label-col="{ span: 7 }" :wrapper-col="{ span: 14}">
        <a-textarea
          :rows="4"
          :maxlength="200"
          placeholder="最多填200个字符!"
          v-decorator="[
           `describe`,
          {rules: [{ required: true, message:  `请填写流程模板描述!` }],
          initialValue: formData.describe}
        ]"
        ></a-textarea>
      </a-form-item>
      <a-form-item label="消息模板：" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
        <a-select
          placeholder="--请选择消息模板组--"
          v-decorator="[
           `msgtemplateid`,
          {rules: [{ required: true,message:  `请选择消息模板组!` }],
          initialValue: formData.msgtemplateid}
        ]"
        >
          <a-select-option
            v-for="item in messageLlists"
            :key="item.value"
            :label="item.text"
          >{{item.text}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
    <div class="base-btn">
      <a-button type="primary" @click="submit">确定</a-button>
    </div>
    <a-modal
      title="分组管理"
      :visible="visible"
      class="message-modal"
      :footer="null"
      :destroyOnClose="true"
      @cancel="cancel"
      width="500px"
      :bodyStyle="{
        'padding':'0',
        'height':'560px',
        'overflow':'auto'
      }"
    >
      <group-manage @changeNotify="changeNotify"></group-manage>
    </a-modal>
  </div>
</template>

<script>
import {
  getSingleModelinstance,
  getmsgtemplatelist,
  addModelinstance,
  updateModelinstance,
  getListGroupUibox
} from "@/workflow/api/modellist";
import { showError } from "@/framework/utils/index";
import { Input, Button, Select, Form, Row, Col, Modal } from "ant-design-vue";
import GroupManage from "./GroupManage";
export default {
  components: {
    AInput: Input,
    ATextarea: Input.TextArea,
    AButton: Button,
    ASelect: Select,
    ASelectOption: Select.Option,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    AModal: Modal,
    GroupManage
  },
  props: {
    type: {
      type: Boolean,
      default: true
    },
    nowid: {
      type: Number
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      formData: {
        name: "",
        alias: "",
        groupid: undefined,
        describe: "",
        msgtemplateid: undefined
      },
      messageLlists: [],
      groupList: [],
      //分组管理
      visible: false
    };
  },
  watch: {
    id: {
      handler(newval) {
        if (newval && !this.type) {
          this.get(newval);
        }
      },
      immediate: true
    }
  },
  computed: {
    id() {
      return this.nowid;
    }
  },
  created() {
    this.getMessageLists();
    this.getGroupList();
  },
  mounted() {},
  methods: {
    //获取具体的基本属性信息
    get(id) {
      getSingleModelinstance(id)
        .then(res => {
          if (res.code == "success") {
            this.formData = {
              name: res.result.name,
              alias: res.result.alias,
              groupid: res.result.groupid,
              describe: res.result.describe,
              msgtemplateid: res.result.msgtemplateid
            };
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    getGroupList() {
      getListGroupUibox()
        .then(res => {
          this.groupList = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取消息模板下拉框
    getMessageLists() {
      getmsgtemplatelist()
        .then(res => {
          if (res.code == "success") {
            this.messageLlists = res.result;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //打开分组管理
    openGroup() {
      this.visible = true;
    },
    cancel() {
      this.getGroupList();
      this.visible = false;
    },
    //分组变化了通知
    changeNotify(val) {
      if (val) {
        this.getGroupList();
        this.visible = false;
      }
    },
    submit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.type) {
            addModelinstance(values)
              .then(res => {
                if (res.code == "success") {
                  this.$emit("submit", this.type);
                }
              })
              .catch(err => {
                showError(err);
              });
          } else {
            values.id = this.nowid;
            updateModelinstance(values)
              .then(res => {
                if (res.code == "success") {
                  this.$emit("submit", this.type);
                }
              })
              .catch(err => {
                showError(err);
              });
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.base-attributes {
  padding-top: 20px;
  .base-btn {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #efefef;
    text-align: center;
    padding: 10px 0;
  }
}
</style>