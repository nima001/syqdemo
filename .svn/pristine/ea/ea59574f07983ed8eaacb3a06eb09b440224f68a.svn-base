<template>
  <a-layout class="processwrap messagemanagement">
    <a-layout-content class="body">
      <div class="content">
        <div class="btngroup">
          <a-button @click="visible=true,type=true" type="primary">新建消息模板组</a-button>
          <a-input-search
            placeholder="请输入要搜索的消息模板"
            v-model="searchkey"
            @search="searchList"
            enterButton
          />
        </div>
        <a-table
          :columns="columns"
          :dataSource="data"
          size="middle"
          :rowKey="record=>record.id"
          :pagination="pagination"
          @change="handleTableChange"
        >
          <template slot="operation" slot-scope="text, record">
            <a href="javascript:;" @click="edit(record.id)" style="color:blue;">编辑</a>
            <a-popconfirm title="确定删除这条消息模板吗?" @confirm="del(record)" okText="确定" cancelText="取消">
              <a href="javascript:;" style="color:red;margin-left:30px;">删除</a>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </a-layout-content>

    <!-- 消息模板组弹框 -->
    <a-modal
      :title="type?'新建消息模板组':'编辑消息模板组'"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      width="750px"
    >
      <a-form :form="form">
        <a-form-item label="消息模板组名称" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-input
            :maxlength="30"
            placeholder="最多填30个字符!"
            v-decorator="[
           `templatename`,
          {rules: [{ required: true, message:  `请填写消息模板组名称!` }],
          initialValue: formData.templatename}
        ]"
          ></a-input>
        </a-form-item>
        <a-form-item label="待办消息模板" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-textarea
            :rows="4"
            :maxlength="200"
            placeholder="最多填200个字符!"
            v-decorator="[
           `todotemplate`,
          {rules: [{ required: false}],
          initialValue: formData.todotemplate}
        ]"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="退回消息模板" :label-col="{ span: 7 }" :wrapper-col="{ span: 14}">
          <a-textarea
            :rows="4"
            :maxlength="200"
            placeholder="最多填200个字符!"
            v-decorator="[
           `backtemplate`,
          {rules: [{ required: false}],
          initialValue: formData.backtemplate}
        ]"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="办结消息模板" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-textarea
            :rows="4"
            :maxlength="200"
            placeholder="最多填200个字符!"
            v-decorator="[
           `donetemplate`,
          {rules: [{ required: false}],
          initialValue: formData.donetemplate}
        ]"
          ></a-textarea>
        </a-form-item>
        <a-form-item label="后置消息模板" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
          <a-textarea
            :rows="4"
            :maxlength="200"
            placeholder="最多填200个字符!"
            v-decorator="[
           `posttemplate`,
          {rules: [{ required: false}],
          initialValue: formData.posttemplate}
        ]"
          ></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout>
</template>

<script>
import {
  getMessageList,
  addMessageList,
  delMessageList,
  getSingleMessage,
  updateMessageList
} from "@/workflow/api/messagetemplate";
import "@/workflow/style/process.css";
const columns = [
  {
    title: "消息模板组名称",
    dataIndex: "templatename"
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "20%",
    scopedSlots: { customRender: "operation" }
  }
];
import {
  Layout,
  Breadcrumb,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
  Table
} from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  name: "MessageManagement",
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ALayoutHeader: Layout.Header,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AButton: Button,
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AInputSearch: Input.Search,
    APopconfirm: Popconfirm,
    ATextarea: Input.TextArea,
    ATable: Table
  },
  data() {
    return {
      columns,
      data: [],
      visible: false,
      type: true,
      form: this.$form.createForm(this),
      formData: {
        templatename: null,
        todotemplate: null,
        backtemplate: null,
        donetemplate: null,
        posttemplate: null
      },
      nowid: null,
      pagination: {
        current: 1,
        pagesize: 10,
        total: 0,
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      },
      searchkey: undefined
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取所有消息列表
    getList(searchkey) {
      let page = {};
      page.pagenum = this.pagination.current;
      page.pagesize = this.pagination.pagesize;
      page.needtotal = true;
      page.searchkey = searchkey;
      getMessageList(page)
        .then(res => {
          this.data = res.result.rows;
          this.pagination.total = res.result.total ? res.result.total : 0;
          this.pagination.current = res.result.pagenum ? res.result.pagenum : 1;
        })
        .catch(error => {
          showError(error);
        });
    },
    //搜索
    searchList(val) {
      this.getList(val);
    },
    //列表分页切换
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getList(this.searchkey);
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.type) {
            addMessageList(values)
              .then(res => {
                this.$message.success("消息模板组新增成功！");
                this.getList();
                this.visible = false;
                this.reset();
              })
              .catch(error => {
                showError(error);
              });
          } else {
            values.id = this.nowid;
            updateMessageList(values)
              .then(res => {
                this.$message.success("消息模板组更新成功！");
                this.getList();
                this.visible = false;
                this.reset();
              })
              .catch(error => {
                showError(error);
              });
          }
        }
      });
    },
    handleCancel() {
      this.visible = false;
      this.reset();
    },
    //重置表单
    reset() {
      this.form.resetFields();
      this.formData = {
        templatename: null,
        todotemplate: null,
        backtemplate: null,
        donetemplate: null,
        posttemplate: null
      };
    },
    edit(id) {
      this.nowid = id;
      getSingleMessage(id)
        .then(res => {
          this.formData = {
            templatename: res.result.templatename,
            todotemplate: res.result.todotemplate,
            backtemplate: res.result.backtemplate,
            donetemplate: res.result.donetemplate,
            posttemplate: res.result.posttemplate
          };
          this.visible = true;
          this.type = false;
        })
        .catch(error => {
          showError(error);
        });
    },
    del(record) {
      delMessageList(record.id)
        .then(res => {
          this.$message.success(record.templatename + "已成功删除！");
          this.getList();
        })
        .catch(error => {
          showError(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.messagemanagement {
  .body {
    padding: 24px;
    background: #fff;
    .content {
      margin: 0 auto;
      .btngroup {
        display: flex;
        margin-bottom: 20px;
        max-width: 500px;
        > button {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>