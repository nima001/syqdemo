<template>
  <a-layout class="processwrap strategymanagement">
    <a-layout-content class="body">
      <div class="content">
        <div class="btngroup">
          <a-button @click="visible=true,type=true" type="primary">新增策略</a-button>
          <a-input-search
            v-model="searchkey"
            placeholder="请输入要搜索的策略"
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
          <template slot="sort" slot-scope="text">{{text==1?"通用":"指定模板"}}</template>
          <template slot="operation" slot-scope="text, record">
            <a href="javascript:;" @click="edit(record.id)" style="color:blue;">编辑</a>
            <a-popconfirm
              v-if="record.sort==2"
              title="确定删除这条策略模板吗?"
              @confirm="del(record)"
              okText="确定"
              cancelText="取消"
            >
              <a href="javascript:;" style="color:red;margin-left:30px;">删除</a>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
    </a-layout-content>

    <!-- 策略管理弹框 -->
    <a-modal
      :title="type?'新增策略':'编辑策略'"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      width="600px"
    >
      <a-form :form="form">
        <a-form-item label="策略名称：" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-input
            :disabled="!show"
            :maxlength="30"
            placeholder="最多填30个字符!"
            v-decorator="[
           `name`,
          {rules: [{ required: true, message:  `请填写策略名称!` }],
          initialValue: formData.name}
        ]"
          ></a-input>
        </a-form-item>
        <a-form-item label="策略描述：" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
          <a-textarea
            :disabled="!show"
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
        <a-form-item label="分类：" :label-col="{ span: 7 }" :wrapper-col="{ span: 14}">
          <a-select
            disabled
            v-decorator="[
           `sort`,
          {rules: [{ required: true,message:  `请选择分类!`}],
          initialValue: formData.sort}
        ]"
          >
            <a-select-option
              v-for="(item,index) in catelogList"
              :key="index"
              :value="item.value"
            >{{item.text}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="用途：" :label-col="{ span: 7 }" :wrapper-col="{ span: 14}">
          <a-select
            :disabled="!show"
            v-decorator="[
           `usetype`,
          {rules: [{required: true,message:  `请选择用途!`}],
          initialValue: formData.usetype}
        ]"
          >
            <a-select-option
              v-for="(item,index) in useList"
              :key="index"
              :value="item.value"
            >{{item.text}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-if="show"
          label="关联的流程模型："
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 14}"
        >
          <a-input
            read-only
            @click="openList"
            v-decorator="[
           `modelinstanceid`,
          {rules: [{ required: true,message:  `请选择关联的流程模型!`}],
          initialValue: formData.modelinstanceid}
        ]"
          ></a-input>
        </a-form-item>
        <a-form-item
          v-if="show"
          label="模板文件上传："
          :label-col="{ span: 7 }"
          :wrapper-col="{ span: 14 }"
        >
          <a-row :gutter="10">
            <a-col :span="10">
              <a-input
                read-only
                v-decorator="[
           `fileurl`,
          {rules: [{ required:true, message:  `请上传模板文件!` }],
          initialValue:formData.fileurl}
        ]"
              ></a-input>
            </a-col>
            <a-col :span="10">
              <div class="addFile" @click="trigger">
                <a-icon type="upload" />选择文件
              </div>
              <input
                type="file"
                ref="fileBtn"
                class="fileBtn"
                id="uploadFile"
                accept=".class"
                @change="getFile($event)"
                multiple="multiple"
              />
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 特定使用模板弹框 -->
    <a-modal title="流程模型列表" v-model="visibleList" width="400px" @ok="ok" @cancel="onClose">
      <div style="margin-bottom:15px;">
        <a-input-search
          v-model="searchtemplate"
          placeholder="请输入要查找的流程模型"
          @search="onSearch"
          enterButton
        />
      </div>
      <a-radio-group v-model="modelinstanceid">
        <a-radio
          v-for="item in list"
          :key="item.id"
          :style="radioStyle"
          :value="item.id"
        >{{item.name}}</a-radio>
      </a-radio-group>
      <a-pagination
        style="text-align:right;margin-top:30px;"
        @change="onShowChange"
        :pageSize.sync="pageSize"
        :defaultCurrent="currentPage"
        size="small"
        :showTotal="total => `总共： ${total} 条`"
        :total="total"
      />
    </a-modal>
  </a-layout>
</template>

<script>
import {
  addStrategy,
  getCommonlist,
  delStrategy,
  getSingleStrategy,
  getStrategyList,
  updateStrategy
} from "@/workflow/api/strategy";
import { uploadImg } from "@/workflow/api/workflow";
import { getModelinstanceList } from "@/workflow/api/modellist";
import { parseQueryString } from "@/workflow/utils/index";
import "@/workflow/style/process.css";
const columns = [
  {
    title: "策略名称",
    dataIndex: "name"
  },
  {
    title: "策略描述",
    dataIndex: "describe"
  },
  {
    title: "分类",
    dataIndex: "sort",
    scopedSlots: { customRender: "sort" }
  },
  {
    title: "关联流程模型名称",
    dataIndex: "modelname"
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
  Input,
  Table,
  Radio,
  Pagination,
  Modal,
  Form,
  Row,
  Col,
  Select,
  Icon,
  Popconfirm
} from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  name: "StrategyManagement",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AButton: Button,
    AInput: Input,
    AInputSearch: Input.Search,
    ATextarea: Input.TextArea,
    ATable: Table,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    APagination: Pagination,
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    ASelect: Select,
    ASelectOption: Select.Option,
    AIcon: Icon,
    APopconfirm:Popconfirm
  },
  data() {
    return {
      columns,
      data: [],
      visible: false,
      type: true,
      form: this.$form.createForm(this),
      formData: {
        name: "",
        describe: "",
        sort: 2,
        usetype: 2,
        fileurl: "",
        modelinstanceid: ""
      },
      modelinstanceid: null,
      fileurl: "",
      nowid: null,
      pagination: {
        current: 1,
        pagesize: 10,
        total: 0,
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      },
      catelogList: [
        { value: 1, text: "通用" },
        { value: 2, text: "指定模板" }
      ],
      useList: [
        { value: 2, text: "数据" },
        { value: 3, text: "PDF" }
      ],
      show: true,
      visibleList: false,
      list: [],
      radioStyle: {
        display: "block",
        height: "30px",
        lineHeight: "30px"
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      searchkey: undefined,
      searchtemplate: undefined
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
      getStrategyList(page)
        .then(res => {
          this.data = res.result.rows;
          this.pagination.total = res.result.total ? res.result.total : 0;
          this.pagination.current = res.result.pagenum ? res.result.pagenum : 1;
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
      if (this.show) {
        this.form.validateFields((err, values) => {
          if (!err) {
            values.fileurl = this.fileurl;
            values.modelinstanceid = this.modelinstanceid;
            if (this.type) {
              addStrategy(values)
                .then(res => {
                  this.$message.success("策略新增成功！");
                  this.getList();
                  this.visible = false;
                  this.reset();
                })
                .catch(err => {
                  showError(err);
                });
            } else {
              values.id = this.nowid;
              updateStrategy(values)
                .then(res => {
                  this.$message.success("策略更新成功！");
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
      } else {
        this.visible = false;
        this.reset();
      }
    },
    handleCancel() {
      this.visible = false;
      this.reset();
    },
    //重置表单
    reset() {
      this.form.resetFields();
      this.formData.name = "";
      this.formData.describe = "";
      this.formData.sort = 2;
      this.formData.usetype = 2;
      this.formData.fileurl = "";
      this.fileurl = "";
      this.formData.modelinstanceid = "";
      this.modelinstanceid = null;
      this.show = true;
      this.currentPage = 1;
      this.total = 0;
    },
    edit(id) {
      this.nowid = id;
      getSingleStrategy(id)
        .then(res => {
          this.formData.name = res.result.name;
          this.formData.describe = res.result.describe;
          this.formData.sort = res.result.sort;
          this.formData.usetype = res.result.usetype;
          this.formData.fileurl = parseQueryString(res.result.fileurl).filename;
          this.fileurl = res.result.fileurl;
          this.formData.modelinstanceid = res.result.modelname;
          this.modelinstanceid = res.result.modelinstanceid;
          if (res.result.sort == 1) {
            this.show = false;
          } else {
            this.show = true;
          }
          this.visible = true;
          this.type = false;
        })
        .catch(err => {
          showError(err);
        });
    },
    del(record) {
      delStrategy(record.id)
        .then(res => {
          this.$message.success(record.name + "已成功删除！");
          this.getList();
        })
        .catch(err => {
          showError(err);
        });
    },
    openList() {
      this.visibleList = true;
      this.getTemplateList();
    },
    onSearch() {
      this.getTemplateList();
    },
    //获取特定模板列表
    getTemplateList() {
      let query = {};
      query.needtotal = true;
      query.pagenum = this.currentPage;
      query.pageSize = this.pageSize;
      query.searchkey = this.searchtemplate;
      getModelinstanceList(query)
        .then(res => {
          this.list = res.result.rows;
          this.currentPage = res.result.pagenum ? res.result.pagenum : 1;
          this.total = res.result.total ? res.result.total : 0;
        })
        .catch(err => {
          showError(err);
        });
    },
    //上传文件
    getFile(event) {
      let file = event.target.files[0];
      uploadImg(file)
        .then(res => {
          this.fileurl = res.result;
          this.formData.fileurl = file.name;
          this.$message.success("文件上传成功！");
          document.getElementById("uploadFile").value = null;
        })
        .catch(error => {
          showError(error);
        });
    },
    trigger() {
      this.$refs.fileBtn.dispatchEvent(new MouseEvent("click"));
    },
    //确定使用特定模板
    ok() {
      this.list.forEach(item => {
        if (item.id == this.modelinstanceid) {
          this.formData.modelinstanceid = item.name;
        }
      });
      this.visibleList = false;
    },
    //关闭特定使用模板
    onClose() {
      this.visibleList = false;
    },
    //分页
    onShowChange(page, pageSize) {
      this.currentPage = page;
      this.getTemplateList();
    }
  }
};
</script>

<style lang="less" scoped>
.strategymanagement {
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
  }
}
.fileBtn {
  width: 0px;
  height: 0px;
  opacity: 0;
}
</style>