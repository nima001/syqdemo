<template>
  <a-layout class="processwrap summarymanagement">
    <a-layout-content class="body">
      <div class="content">
        <div class="btngroup">
          <a-button @click="visible=true,type=true" type="primary">新增</a-button>
          <a-input-search
            placeholder="请输入要搜索的汇总表名称"
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
          class="summary-table"
        >
          <div slot="operation" class="operation" slot-scope="text, record">
            <a href="javascript:;" @click="edit(record.id)">编辑</a>
            <a href="javascript:;" @click="setTable(record)">表格设置</a>
            <a href="javascript:;" @click="setExport(record)">导出设置</a>
            <a-popconfirm title="确定删除这条消息模板吗?" @confirm="del(record)" okText="确定" cancelText="取消">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </div>
        </a-table>
      </div>
    </a-layout-content>

    <!-- 汇总表新增、编辑弹框 -->
    <a-modal
      :title="type?'新建汇总表':'编辑汇总表'"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      width="700px"
    >
      <a-form :form="form">
        <a-form-item label="汇总表名称:" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-input
            :maxlength="30"
            placeholder="最多填30个字符!"
            v-decorator="[
           `name`,
          {rules: [{ required: true, message:  `请填写汇总表名称!` }],
          initialValue: formData.name}
        ]"
          ></a-input>
        </a-form-item>
        <a-form-item label="流程目录主项:" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-input
            @click="show"
            read-only
            v-decorator="[
           `catalogid`,
          {rules: [{ required: true, message:  `请选择流程目录主项!` }],
          initialValue: formData.catalogname}
        ]"
          ></a-input>
        </a-form-item>
        <!-- <a-form-item label="导出Excle名称:" :label-col="{ span: 7 }" :wrapper-col="{ span: 14}">
          <a-input
            :maxlength="30"
            placeholder="最多填30个字符!"
            v-decorator="[
           `filename`,
          {rules: [{ required: true, message:  `请填写导出Excle名称!` }],
          initialValue: formData.filename}
        ]"
          ></a-input>
        </a-form-item>-->
        <a-form-item label="说明:" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-textarea
            :rows="4"
            :maxlength="200"
            placeholder="最多填200个字符!"
            v-decorator="[
           `describe`,
          {rules: [{ required: false}],
          initialValue: formData.describe}
        ]"
          ></a-textarea>
        </a-form-item>
      </a-form>
      <a-modal
        title="流程目录主项"
        width="400px"
        class="drawerModal"
        @cancel="onClose"
        @ok="onClose"
        :visible="catalogvisible"
      >
        <div class="search">
          <a-input-search
            v-model="searchtemplate"
            placeholder="输入要查找的流程目录主项名称"
            @search="onSearch"
            enterButton
          />
        </div>
        <div class="templist">
          <ul class="mylist">
            <li v-for="(item,index) in templists" :key="index" @click="select(item.id,item.name)">
              <span>{{(catalogpagination.pageSize*(catalogpagination.current-1))+index+1}}.</span>
              {{item.name}}
            </li>
          </ul>
          <div class="mypagination">
            <a-pagination
              size="small"
              :total="catalogpagination.total"
              :pageSize="catalogpagination.pageSize"
              :defaultCurrent="catalogpagination.current"
              @change="onChange"
            />
          </div>
        </div>
      </a-modal>
    </a-modal>
  </a-layout>
</template>

<script>
import {
  addSummary,
  delSummary,
  getSingleSummary,
  getSummaryList,
  updateSummary
} from "@/workflow/api/summarytable";
import { uiConfigsCookies } from "@/framework/utils/auth";
import { showError } from "@/framework/utils/index";
import { getListMainPage } from "@/workflow/api/catalog";
import "@/workflow/style/process.css";
import {
  Layout,
  Breadcrumb,
  Button,
  Input,
  Table,
  Select,
  Form,
  Modal,
  Popconfirm,
  Pagination
} from "ant-design-vue";
export default {
  name: "SummaryManagement",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AButton: Button,
    AInput: Input,
    ATextarea: Input.TextArea,
    AInputSearch: Input.Search,
    ATable: Table,
    ASelect: Select,
    ASelectOption: Select.Option,
    AForm: Form,
    AFormItem: Form.Item,
    AModal: Modal,
    APopconfirm: Popconfirm,
    APagination: Pagination
  },
  data() {
    return {
      columns: [
        {
          title: "汇总表名称",
          dataIndex: "name",
          width: "16%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "流程目录主项",
          dataIndex: "catalogname",
          width: "16%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "说明",
          dataIndex: "describe",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "操作",
          dataIndex: "operation",
          width: 280,
          scopedSlots: { customRender: "operation" }
        }
      ],
      data: [],
      visible: false,
      type: true,
      form: this.$form.createForm(this),
      formData: {
        name: null,
        catalogid: null,
        catalogname: "",
        filename: null,
        describe: null
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
      searchkey: undefined,
      //流程目录主项弹框
      catalogvisible: false,
      catalogpagination: {
        pageSize: 10, // 一页的数据限制
        current: 1, // 当前页
        total: 0 // 总数
      },
      searchtemplate: undefined,
      templists: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取所有汇总表列表
    getList(searchkey) {
      let page = {};
      page.pagenum = this.pagination.current;
      page.pagesize = this.pagination.pagesize;
      page.searchkey = searchkey;
      page.needtotal = true;
      getSummaryList(page)
        .then(res => {
          this.data = res.result.rows;
          this.pagination.current = res.result.pagenum ? res.result.pagenum : 1;
          this.pagination.total = res.result.total ? res.result.total : 0;
        })
        .catch(err => {
          showError(err);
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
          values.catalogid = this.formData.catalogid;
          if (this.type) {
            addSummary(values)
              .then(res => {
                this.$message.success("汇总表新增成功！");
                this.getList();
                this.visible = false;
                this.reset();
              })
              .catch(err => {
                showError(err);
              });
          } else {
            values.id = this.nowid;
            updateSummary(values)
              .then(res => {
                this.$message.success("汇总表更新成功！");
                this.getList();
                this.visible = false;
                this.reset();
              })
              .catch(err => {
                showError(err);
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
      this.formData.name = null;
      this.formData.catalogid = null;
      this.formData.catalogname = "";
      this.formData.filename = null;
      this.formData.describe = null;
    },
    //编辑
    edit(id) {
      this.nowid = id;
      getSingleSummary(id)
        .then(res => {
          this.formData.name = res.result.name;
          this.formData.catalogid = res.result.catalogid;
          this.formData.catalogname = res.result.catalogname;
          this.formData.describe = res.result.describe;
          this.visible = true;
          this.type = false;
        })
        .catch(err => {
          showError(err);
        });
    },
    //删除
    del(record) {
      delSummary(record.id)
        .then(res => {
          this.$message.success(record.name + "已成功删除！");
          this.getList();
        })
        .catch(err => {
          showError(err);
        });
    },
    //表格设置
    setTable(record) {
      this.$router.push({
        name: "tablesetting",
        query: {
          name: record.name,
          collecttableid: record.id,
          catalogid: record.catalogid
        }
      });
    },
    //导出设置
    setExport(record) {
      this.$router.push({
        name: "exportsetting",
        query: {
          filename: record.filename,
          collecttableid: record.id,
          catalogid: record.catalogid
        }
      });
    },
    show() {
      this.catalogvisible = true;
      this.getTempList();
    },
    //获取流程目录主项
    getTempList(searchKey) {
      let query = {};
      query.pagesize = this.catalogpagination.pageSize;
      query.pagenum = this.catalogpagination.current;
      query.needtotal = true;
      query.searchkey = searchKey;
      getListMainPage(query)
        .then(res => {
          if (res.code == "success") {
            this.catalogpagination.total = res.result.total;
            this.catalogpagination.current = res.result.pagenum;
            this.templists = res.result.rows;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    onClose() {
      this.catalogvisible = false;
      this.catalogpagination.current = 1;
    },
    //搜索
    onSearch(value) {
      this.getTempList(value);
    },
    //页数改变
    onChange(current) {
      this.catalogpagination.current = current;
      this.getTempList(this.searchtemplate);
    },
    //选择流程目录主项
    select(id, name) {
      this.formData.catalogname = name;
      this.formData.catalogid = id;
      this.catalogvisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.summarymanagement {
  .body {
    padding: 24px;
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
    .summary-table {
      /deep/table {
        table-layout: fixed;
        td,
        th {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
    .operation {
      display: flex;
      flex-wrap: nowrap;
      a {
        display: inline-block;
        color: blue;
        width: 70px;
        &:first-child {
          width: 50px;
        }
        &:last-child {
          color: red;
          width: 50px;
        }
      }
    }
  }
}
.drawerModal {
  .templist {
    margin: 10px 0;
    .mylist {
      li {
        padding: 5px 0;
        cursor: pointer;
        span {
          padding-left: 10px;
        }
      }
    }
  }
  .mypagination {
    text-align: right;
  }
}
</style>