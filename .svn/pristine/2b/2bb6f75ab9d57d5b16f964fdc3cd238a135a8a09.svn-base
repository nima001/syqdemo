<template>
  <div class="processLayout">
    <div class="top">
      <p class="applytext">已审核的接口列表：</p>
      <div class="toolList">
        <a-input allowClear v-model="namelike" :style="{width:'200px',marginLeft:'10px'}" placeholder="请输入接口名称" @pressEnter="getAppliedList"/>
        <a-button type="primary" @click="getAppliedList">搜索</a-button>
        <a-button type="primary" @click="resetsearch">重置</a-button>
      </div>
    </div>
    <div class="middle">
      <a-table :loading="loading" :columns="columns" :data-source="dataSource" rowKey="id">
        <span slot="name" slot-scope="text, record">
            <span class="actionname">{{text}}</span>
            <span @click="actionDetail(record)" class="actiondetil">详情</span>
        </span>
        <span slot="acstate" slot-scope="text">
          <span>{{stateMap[text]}}</span>
        </span>
      </a-table>
    </div>
    <div class="bottom">
      <a-form :form="form">
        <a-form-item label="用途说明">
          <a-textarea :auto-size="{ minRows: 4, maxRows:4 }" :readOnly="true"
            v-decorator="['desc',{rules: [{ required: true, message: '请输入用途说明' }], initialValue: descform.desc}]"
          />
        </a-form-item>
      </a-form>
    </div>
    <!-- 接口详情接口 -->
    <interface-info-modal v-model="actionVisible" :actionData="actionData"></interface-info-modal>
  </div>
</template>
<script>
import { Layout, Button, Input, Form, Select, Table } from "ant-design-vue";
import { appliedList, serviceDesc,apiVerify } from "@/dev/api/service";
import { showError } from "@/framework/utils";
import InterfaceInfoModal from '../../managecenter/components/InterfaceInfoModal';
import RefuseModal from '@/dev/views/auditcenter/components/RefuseModal';
export default {
  components: {
    ALayout: Layout,
    AButton: Button,
    AInput: Input,
    ATextarea: Input.TextArea,
    AForm: Form,
    AFormItem: Form.Item,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    ATextarea: Input.TextArea,
    InterfaceInfoModal,
  },
  data() {
    return {
      loading:false,
      descform: {},
      actionstate: 1,
      namelike: undefined,
      columns: [
        {
          title: "接口名称",
          dataIndex: "name",
          width: "35%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "标签",
          dataIndex: "age",
          width: "15%"
        },
        {
          title: "接口地址",
          dataIndex: "url",
          width: "40%"
        },
        {
          title: "状态",
          dataIndex: "state",
          width: "10%",
          scopedSlots: { customRender: "acstate" },
          customCell: (record, rowIndex) => {
            return { style: this.colors(record.state) }; //return 想要设置的样式
          }
        }
      ],
      dataSource: [],
      //接口详情窗口
      actionVisible: false,
      actionData: {},
      //接口状态
      stateMap: {
        "0": "未开通",
        "1": "待审核",
        "2": "使用中",
        "4": "退回"
      },
      form: this.$form.createForm(this),
    };
  },
  mounted() {
    this.getAppliedList();
    this.getActionDesc();
  },
  methods: {
    // 调取已申请的api接口
    getAppliedList() {
      var data = {
        appid: this.$route.query.appid,
        name: this.namelike,
        module: this.$route.query.code,
        serviceId: this.$route.query.serviceId,
        tag: undefined,
        type: this.actionstate
      };
      this.loading = true;
      appliedList(data)
        .then(res => {
          this.dataSource = res.result;
        })
        .catch(err => {
          showError(err);
        }).finally(()=>{
          this.loading = false;
        });
    },
    //获取状态信息
    getActionDesc() {
      let data = {
        appid: this.$route.query.appid,
        serviceid: this.$route.query.serviceId
      };
      serviceDesc(data)
        .then(res => {
          this.descform = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    //重置
    resetsearch() {
      this.namelike = undefined
      this.getAppliedList();
    },
    // colors
    colors(state) {
      switch (state) {
        case 0:
          return "color:#999 !important";
        case 1:
          return "color:#faad14";
        case 2:
          return "color:#0dbc79";
        case 3:
          return "color:#0dbc79";
        case 4:
          return "color:#f5222d";
        default:
          return;
      }
    },
    //展示接口详细信息
    actionDetail(data) {
      this.actionData = data;
      this.actionVisible = true;
    }
  }
};
</script>
<style lang='less' scoped>
.processLayout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .top {
    padding: 0px @content-padding-h @content-padding-v;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      margin: 0px;
    }
    .toolList {
      text-align: right;
      button {
        margin-left: 10px;
      }
    }
  }
  .middle {
    padding: 0px @content-padding-h;
    flex-shrink: 1;
    overflow-y: auto;
    /deep/ .actiondetil {
      color: @primary-color;
      margin:0px @layout-space-base;
      cursor: pointer;
    }
  }
  .bottom {
    padding: 0px @content-padding-h;
    button{
      display: block;
      margin:  0 auto;
    }
  }
}
</style>