<template>
  <a-layout class="processwrap modalGroup">
    <a-layout-content class="body">
      <div class="select-list">
        <div class="select-left">
          <a-button type="primary" @click="addGroup">新建模板组</a-button>
          <a-input-search
            v-model="searchkey"
            placeholder="请输入要搜索的流程模板组"
            @search="searchList"
            enterButton
          />
        </div>
      </div>
      <div class="body-main">
        <a-table
          :columns="columns"
          :dataSource="datalist"
          :pagination="pagination"
          @change="handleTableChange"
          :rowKey="row=>row.id"
        >
          <template
            :slot="col.dataIndex"
            slot-scope="text"
            v-for="(col,index) in columns.slice(0,columns.length-1)"
          >
            <div
              :key="index"
              style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;"
            >{{text}}</div>
          </template>
          <template slot="operate" slot-scope="text,record">
            <div style="dosplay:flex;flex-wrap:nowrap;">
              <span class="operate-type" @click="edit(record.id)" style="width:60px;">
                <a-icon type="edit" />编辑
              </span>
              <a-popconfirm title="确定删除这条流程实例吗?" @confirm="del(record)" okText="确定" cancelText="取消">
                <span class="operate-type" style="width:60px;">
                  <a-icon type="delete" />删除
                </span>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
      </div>

      <!-- 消息模板组弹框 -->
      <a-modal
        class="mymodal"
        :title="type?'新建模板组':'编辑模板组'"
        :visible="visible"
        centered
        :maskClosable="false"
        :bodyStyle="bodystyle"
        @ok="handleOk"
        @cancel="handleCancel"
        width="650px"
      >
        <a-form :form="form">
          <a-form-item label="模板组名称：" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
            <a-input
              :maxlength="30"
              placeholder="最多填30个字符!"
              v-decorator="[
           `name`,
          {rules: [{ required: true, message:  `请填写模板组名称!` }],
          initialValue: formData.name}
        ]"
            ></a-input>
          </a-form-item>
          <a-form-item label="下级单位发起：" :label-col="{ span: 7}" :wrapper-col="{ span: 14 }">
            <a-input
              @click="showDrawer(1)"
              read-only
              v-decorator="[
           `submodelid`,
          {rules: [{ required: false }],
          initialValue: formData.submodelname}
        ]"
            ></a-input>
          </a-form-item>
          <a-form-item label="主管部门发起：" :label-col="{ span: 7 }" :wrapper-col="{ span: 14}">
            <a-input
              @click="showDrawer(2)"
              read-only
              v-decorator="[
           `mainmodelid`,
          {rules: [{ required: false }],
          initialValue: formData.mainmodelname}
        ]"
            ></a-input>
          </a-form-item>
          <a-form-item label="主管部门替下级发起：" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">
            <a-input
              @click="showDrawer(3)"
              read-only
              v-decorator="[
           `complexmodelid`,
          {rules: [{ required: false }],
          initialValue: formData.complexmodelname}
        ]"
            ></a-input>
          </a-form-item>
          <a-form-item
            v-if="!type"
            label="模板组唯一标识："
            :label-col="{ span: 7 }"
            :wrapper-col="{ span: 14 }"
          >
            <a-input
              read-only
              v-decorator="[
           `identifycode`,
          {rules: [{ required: false }],
          initialValue: formData.identifycode}
        ]"
            ></a-input>
          </a-form-item>
        </a-form>
        <a-modal
          :title="drawerTitle"
          width="400px"
          class="drawerModal"
          @cancel="onClose"
          @ok="onClose"
          :visible="drawervisible"
        >
          <div class="search">
            <a-input-search
              v-model="searchtemplate"
              placeholder="输入要查找的流程模板名称"
              @search="onSearch"
              enterButton
            />
          </div>
          <div class="templist">
            <ul class="mylist">
              <li v-for="(item,index) in templists" :key="index" @click="select(item.id,item.name)">
                <span>{{(drawerpagination.pageSize*(drawerpagination.current-1))+index+1}}.</span>
                {{item.name}}
              </li>
            </ul>
            <div class="mypagination">
              <a-pagination
                size="small"
                :total="drawerpagination.total"
                :pageSize="drawerpagination.pageSize"
                :defaultCurrent="drawerpagination.current"
                @change="onChange"
              />
            </div>
          </div>
        </a-modal>
      </a-modal>
    </a-layout-content>
  </a-layout>
</template>

<script>
const columns = [
  {
    title: "模板组名称",
    dataIndex: "name",
    key: "name",
    align: "left",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "下级单位发起",
    dataIndex: "submodelname",
    key: "submodelname",
    align: "left",
    width: "15%",
    scopedSlots: { customRender: "submodelname" }
  },
  {
    title: "主管部门发起",
    dataIndex: "mainmodelname",
    key: "mainmodelname",
    align: "left",
    width: "15%",
    scopedSlots: { customRender: "mainmodelname" }
  },
  {
    title: "主管部门替下级发起",
    dataIndex: "complexmodelname",
    key: "complexmodelname",
    align: "left",
    width: "15%",
    scopedSlots: { customRender: "complexmodelname" }
  },
  {
    title: "编码",
    dataIndex: "identifycode",
    key: "identifycode",
    align: "left",
    width: "20%",
    scopedSlots: { customRender: "identifycode" }
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    align: "left",
    scopedSlots: { customRender: "operate" }
  }
];
import {
  getModelgroupList,
  getGroupdata,
  addModelGroup,
  updateModelGroup,
  delModelGroup
} from "@/workflow/api/modelgroup";
import { getModelinstanceList } from "@/workflow/api/modellist";
import "@/workflow/style/process.css";
import { showError } from "@/framework/utils/index";
import {
  Layout,
  Breadcrumb,
  Form,
  Row,
  Col,
  Input,
  Modal,
  Pagination,
  Icon,
  Popconfirm,
  Table,
  Button
} from "ant-design-vue";
export default {
  name: "ModelGroup",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AForm: Form,
    AFormItem: Form.Item,
    ARol: Row,
    ACol: Col,
    AInput: Input,
    AInputSearch: Input.Search,
    AModal: Modal,
    APagination: Pagination,
    AIcon: Icon,
    APopconfirm: Popconfirm,
    ATable: Table,
    AButton: Button
  },
  data() {
    return {
      columns,
      datalist: [],
      visible: false,
      form: this.$form.createForm(this),
      type: true,
      formData: {
        name: null,
        submodelname: null,
        mainmodelname: null,
        complexmodelname: null,
        submodelid: null,
        mainmodelid: null,
        complexmodelid: null,
        identifycode: null
      },
      nowid: null,
      pagination: {
        //流程模板列表分页
        pageSize: 10, // 一页的数据限制
        current: 1, // 当前页
        total: 0, // 总数
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      },
      bodystyle: {
        "max-height": "600px",
        overflow: "auto",
        padding: "24px 36px"
      },
      drawervisible: false,
      drawerTitle: "",
      templists: [],
      obj: null,
      drawerpagination: {
        //流程模板列表分页
        pageSize: 10, // 一页的数据限制
        current: 1, // 当前页
        total: 0, // 总数
        showTotal: function(total, range) {
          return `共 ${total} 条记录`;
        }
      },
      searchkey: undefined,
      searchtemplate: undefined
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取模板组列表
    getList() {
      let query = {};
      query.pagesize = this.pagination.pageSize;
      query.pagenum = this.pagination.current;
      query.needtotal = true;
      query.searchkey = this.searchkey;
      getModelgroupList(query)
        .then(res => {
          if (res.code == "success") {
            this.pagination.total = res.result.total ? res.result.total : 0;
            this.pagination.current = res.result.pagenum
              ? res.result.pagenum
              : 1;
            this.datalist = res.result.rows;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //搜索
    searchList() {
      this.getList();
    },
    //列表分页切换
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getList();
    },
    //新建模板组
    addGroup() {
      this.visible = true;
      this.type = true;
    },
    showDrawer(type) {
      this.obj = type;
      if (type == 1) {
        this.drawerTitle = "下级单位发起";
      } else if (type == 2) {
        this.drawerTitle = "主管部门发起";
      } else {
        this.drawerTitle = "主管部门替下级发起";
      }
      this.drawervisible = true;
      this.getTempList();
    },
    onClose() {
      this.drawervisible = false;
      this.drawerpagination.current = 1;
    },
    //获取流程实例列表
    getTempList(searchKey) {
      let query = {};
      query.pagesize = this.drawerpagination.pageSize;
      query.pagenum = this.drawerpagination.current;
      query.needtotal = true;
      query.searchkey = searchKey;
      getModelinstanceList(query)
        .then(res => {
          if (res.code == "success") {
            this.drawerpagination.total = res.result.total;
            this.drawerpagination.current = res.result.pagenum;
            this.templists = res.result.rows;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //搜索
    onSearch(value) {
      this.getTempList(value);
    },
    //页数改变
    onChange(current) {
      this.drawerpagination.current = current;
      this.getTempList(this.searchtemplate);
    },
    //选择流程模板
    select(id, name) {
      if (this.obj == 1) {
        this.formData.submodelname = name;
        this.formData.submodelid = id;
      } else if (this.obj == 2) {
        this.formData.mainmodelname = name;
        this.formData.mainmodelid = id;
      } else {
        this.formData.complexmodelname = name;
        this.formData.complexmodelid = id;
      }
      this.drawervisible = false;
    },
    //新增和编辑
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.submodelid = this.formData.submodelid;
          values.mainmodelid = this.formData.mainmodelid;
          values.complexmodelid = this.formData.complexmodelid;
          if (this.type) {
            addModelGroup(values)
              .then(res => {
                if (res.code == "success") {
                  this.visible = false;
                  this.$message.success("流程模板组新增成功！");
                  this.reset();
                  this.getList();
                }
              })
              .catch(err => {
                showError(err);
              });
          } else {
            values.id = this.nowid;
            updateModelGroup(values)
              .then(res => {
                if (res.code == "success") {
                  this.visible = false;
                  this.$message.success("流程模板组更新成功！");
                  this.reset();
                  this.getList();
                }
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
      this.formData.submodelname = null;
      this.formData.mainmodelname = null;
      this.formData.complexmodelname = null;
      this.formData.submodelid = null;
      this.formData.mainmodelid = null;
      this.formData.complexmodelid = null;
      this.formData.identifycode = null;
    },
    //编辑
    edit(id) {
      this.nowid = id;
      this.type = false;
      getGroupdata(id)
        .then(res => {
          if (res.code == "success") {
            this.formData.name = res.result.name;
            this.formData.submodelname = res.result.submodelname;
            this.formData.mainmodelname = res.result.mainmodelname;
            this.formData.complexmodelname = res.result.complexmodelname;
            this.formData.submodelid = res.result.submodelid;
            this.formData.mainmodelid = res.result.mainmodelid;
            this.formData.complexmodelid = res.result.complexmodelid;
            this.formData.identifycode = res.result.identifycode;
            this.visible = true;
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //删除
    del(record) {
      delModelGroup(record.id)
        .then(res => {
          if (res.code == "success") {
            this.$message.success(record.name + "已成功删除！");
            this.getList();
          }
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.modalGroup {
  .body {
    padding: 24px;
    .select-list {
      margin: 12px 0;
      overflow: hidden;
      .select-left {
        display: flex;
        max-width: 500px;
        > button {
          margin-right: 10px;
        }
      }
    }
    .body-main {
      margin: 12px 0;
      /deep/table {
        table-layout: fixed;
        td,th {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .operate-type {
        padding: 0 5px;
        i {
          // #d60002
          color: skyblue;
          border: 0;
          padding-right: 3px;
        }
      }
    }
  }
}
.mymodal {
  .ant-modal-content {
    overflow: hidden;
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