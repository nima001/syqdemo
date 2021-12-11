<template>
  <div class="set">
    <div class="top">
      <!-- <a-button type="primary" @click="del">删除</a-button> -->
      <template v-if="editor">
        <a-button type="primary" @click="submit">保存</a-button>
        <a-button type="primary" :style="{marginLeft:'10px'}" @click="cancel">取消</a-button>
      </template>
      <template v-else>
        <a-button type="primary" @click="editor = true">编辑</a-button>
      </template>
    </div>
    <div class="content">
      <p class="title">考勤规则</p>
      <div class="form">
        <a-form :form="form" :layout="layout">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="考勤对象" class="nopointer" :class="{allow:editor}" @click.native="showModal">
                <a-input  :disabled="!editor" v-decorator="['userName',{rules: [{required: true,message:'请选择人员'}]}]"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <rules-cmpt ref="rulesForm" :editor="editor" v-model="rules"></rules-cmpt>
          <a-row :gutter="24">
            <a-col :span="7">
              <a-form-item label="允许最早签到时间">
                上班前
                <a-input-number  class="selfInput" :disabled="!editor" :min="0" v-decorator="['earlymins',{rules: [{required: false,message: '请填写最早签到时间'}]}]"></a-input-number>
                分钟
              </a-form-item>
            </a-col>
            <a-col :span="7">
              <a-form-item label="允许最晚签退时间">
                下班后
                <a-input-number class="selfInput" :disabled="!editor" :min='0' v-decorator="['latemins',{rules: [{required: false,message: '请填写最晚签退时间'}]}]"></a-input-number>
                分钟
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>
    <a-modal :footer="null" v-model="visible" :width="800" title="选择用户" :bodyStyle="{ height: '600px', padding: '0'}">
      <org-user-select mode="user" :show-dept="true" :selected="selectUser" :max-select="100" @finish="onUserSelected"/>
    </a-modal>
  </div>
</template>
<script>
import OrgUserSelect from "@/hall/components/OrgUserSelect";
import {Button,Form,Input,Row,Col,InputNumber,install,Modal} from "ant-design-vue";
import RulesCmpt from "./RulesCmpt";
import {rulesquery,rulesadd,rulesdel,insertOrUpdate} from "@/hall/api/attendance";
import moment from "moment";
import { showError } from "@/framework/utils";
export default {
  components: {
    OrgUserSelect,
    RulesCmpt,
    AButton: Button,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AModal: Modal,
    AInputNumber: InputNumber
  },
  data() {
    return {
      layout: "horizontal",
      visible: false,
      form: this.$form.createForm(this, { name: "schedueForm" }),
      editor: false,
      id:undefined,
      selectUser: [],
      rules: [{date: undefined,startTime: undefined,endTime: undefined}]
    };
  },
  computed: {
    userName() {
      let list = this.selectUser.map(item => {
        return item.username;
      });
      return list.join(",");
    },
    userIds() {
      let list = this.selectUser.map(item => {
        return {
          _id: item._id,
          username: item.username
        };
      });
      return JSON.stringify(list);
    }
  },
  mounted() {
    this.query();
  },
  methods: {
    showModal(){
      if(this.editor){
        this.visible = true
      }
    },
    // 考勤查询
    query() {
      rulesquery()
        .then(res => {
          let result = res.result[0];
          if (result) {
            this.selectUser = JSON.parse(result.userids);
            this.rules = JSON.parse(result.rules);
            if(this.rules && this.rules.length ==0){
              this.rules = [{date: undefined,startTime: undefined,endTime: undefined}]
            }
            this.id = result.id;
            this.form.setFieldsValue({
              userName:this.userName,
              earlymins: result.earlymins,
              latemins: result.latemins
            });
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    submit() {
      let rulesForm = this.$refs.rulesForm.form;
      let list = [];
      rulesForm.validateFields((err, values) => {
        let group = Reflect.ownKeys(values).length / 3;
        for (let i = 0; i < group; i++) {
          let dateStart = moment(values[`date${i}`][0]).format("YYYY-MM-DD");
          let dateEnd = moment(values[`date${i}`][1]).format("YYYY-MM-DD");
          let startTime = moment(values[`startTime${i}`]).format("HH:mm");
          let endTime = moment(values[`endTime${i}`]).format("HH:mm");
          list.push({ dateStart, dateEnd, startTime, endTime });
        }
        this.submitForm(list);
      });

    },
    submitForm(list){
      this.form.validateFields((err, values) => {
        if (!err) {
          let {earlymins,latemins} = values;
          earlymins = earlymins== null ? 0 : earlymins;
          latemins = latemins == null ? 0 :latemins;
          let params = {id:this.id, rules: list, userids: this.selectUser,earlymins,latemins };
          insertOrUpdate(params)
            .then(res => {
              let message = this.id?'修改成功!':'添加成功!'
              this.$message.success(message);
            })
            .catch(err => {
              showError(err);
            });
        }
      });
    },
    onUserSelected(type, list) {
      this.visible = false;
      if (type == "ok") {
        this.selectUser = list;
        this.form.setFieldsValue({
          userName:this.userName,
        });
      }
    },
    cancel() {
      this.editor = false;
      this.form.resetFields();
      this.$refs.rulesForm.form.resetFields();
    }
  }
};
</script>
<style lang='less' scoped>
.set {
  padding: @content-padding-v @content-padding-h;
  height: 100%;
  background: @white;
  overflow-y: auto;
  border-radius: @border-radius-base;
  .top {
    padding: @content-padding-v 0px;
  }
  .content {
    .title {
      margin: 0px;
      color: #262626;
      font-size: 16px;
      font-weight: 400;
      &::before{
        content: "";
    display: inline-block;
    width: 4px;
    height: 1em;
    margin-right: 10px;
    vertical-align: -0.12em;
    background-color: #1b5293;
      }
    }
    .form {
      padding: 0px @padding-sm;
      /deep/ .ant-form-item-label {
        color: #262626;
      }
      /deep/ .ant-form-item-children {
        display: flex;
        align-items: center;
        .selfInput {
          flex: 1;
          margin: 0px @padding-sm;
        }
      }
      /deep/ .nopointer{
        position: relative;
        &::before{
          content: "";
          display: block;
          width: 100%;
          height: 32px;
          position: absolute;
          left: 0px;
          bottom: 0px;
          z-index: 999;
          cursor: not-allowed;
        }
      }
      /deep/ .allow{
       &::before{
          cursor: pointer;
       }
      }
    }
  }
}
</style>