<template>
  <div class="impower-manage">
    <div class="content">
      <a-row class="top-btn" :style="{marginBottom:'8px'}">
        <a-col :span="8">
          <a-button icon="plus" @click="addRole">新增</a-button>
          <a-button icon="delete" @click="deleteRole" style="margin-left:8px;">删除</a-button>
        </a-col>
        <a-col :span="16">
        </a-col>
      </a-row>
      <div class="main-table">
        <a-table
          :loading="loading"
          rowKey="id"
          :columns="columns"
          :dataSource="tableList"
          :pagination="false"
          :rowClassName="(row) => selectedRow && selectedRow.id == row.id ? 'selected': ''"
          :customRow="customRow"
          >
        </a-table>
      </div>
    </div>
    <div>
    <a-modal title="添加角色" :footer="null" v-model="addvisible"
      width="1000px" :bodyStyle="{height: '520px', padding: 0, overflow: 'hidden'}">
      <add-role :bookid="bookid" @finish="onAddRole"></add-role>
    </a-modal>
    </div>
  </div>
</template>
<script>
import { listrole, queryrole, delrole, addrole } from "@/person/api/booklet";
import { Row, Col, Button, Table, Modal, Form, Select, Spin } from "ant-design-vue";
import { showError } from "@/framework/utils/index";
import AddRole from "./components/AddRole";
export default {
  name: 'impowerManage',
  data() {
    return {
      bookid: '',
      tableList: [],
      columns: [
        {
          title: "序号",
          width: "10%",
          customRender: (text, record, index) => (index + 1)
        },
        {
          title: "角色名称",
          width: "45%",
          dataIndex: "name"
        },
        {
          title: "角色分组",
          width: "45%",
          dataIndex: "group"
        }
      ],
      loading: false,
      selectedRow: {},
      addvisible: false
    }
  },
  components: {
    ATable: Table,
    ARow: Row,
    ACol: Col,
    AButton: Button,
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    ASelect:Select,
    ASelectOption:Select.Option,
    AddRole
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.bookid = this.$route.query.bookid;
    this.loadData();
  },
  methods: {
    loadData() {
      listrole(this.bookid)
      .then(({result}) => {
        this.tableList = result;
      })
      .catch(err => {
        showError(err);
      })
    },
    customRow(row){
      return {
        on: {
          click: () => {
            this.selectedRow = row;
          },
        }
      };
    },
    addRole() {
      this.addvisible = true;
    },
    onAddRole(status) {
      if(status == "ok") {
        this.addvisible = false;
        this.loadData();
      }
    },
    deleteRole() {
      let selected = Object.keys(this.selectedRow).length == 0 ? false : true;
      if (selected) {
        let { id } = this.selectedRow;
        let _this = this;
        this.$confirm({
          title: "确认删除该角色?",
          onOk() {
            delrole(_this.bookid, id)
              .then(res => {
                _this.$notification.success({
                  message: "成功",
                  description: "删除角色成功!",
                  duration: 3
                });
                _this.selectedRow = {};
                _this.loadData();
              })
              .catch(error => {
                showError(error);
              });
          },
          onCancel() {}
        });
      } else {
        this.$notification.warning({
          message: "提示",
          description: "请选择要删除的角色!",
          duration: 3
        });
      }
    },
  }
}
</script>
<style  lang="less" scoped>
.impower-manage{
  height: 100%;
  padding: @layout-space-base;
  .content {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    background: @white;
    padding-top: 10px;
    .top-btn{
      padding: @content-padding-v @content-padding-h;
    }
    .main-table{
      flex-shrink: 1;
      overflow-y: auto;
      padding: @content-padding-v @content-padding-h;
      background: @white;
      /deep/table{
        tr.selected{
          background: @primary-2;
        }
        td{
          .operation {
            a {
              margin-right: 15px;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
}
</style>