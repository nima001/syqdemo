<template>
  <a-layout class="processwrap">
    <a-layout-content class="body">
      <div class="role-main">
        <div class="seal-detail">
          <h3>签章基本信息</h3>
          <a-row :gutter="24">
            <a-col :span="12">
              签章名称：
              <span class="text">{{sealList.name}}</span>
            </a-col>
            <a-col :span="12">
              证书名称：
              <span class="text">{{sealList.certificate}}</span>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              签章ID：
              <span class="text">{{sealList.tgsealid}}</span>
            </a-col>
            <a-col :span="12">
              签章秘钥：
              <span class="text">{{sealList.signkey}}</span>
            </a-col>
          </a-row>
          <a-row>
            <a-col>
              UKEY证书：
              <span class="text">{{sealList.ukey}}</span>
            </a-col>
          </a-row>
        </div>
        <a-button class="btn" @click="addRole" type="primary">添加角色</a-button>
        <div class="role-list">
          <a-table :columns="columns" :rowKey="record => record.id" :dataSource="datalist">
            <template slot="operate" slot-scope="text,record">
              <a-popconfirm
                title="确定删除这个角色吗?"
                @confirm="delRole(record)"
                okText="确定"
                cancelText="取消"
              >
                <span style="color:red;">移除</span>
              </a-popconfirm>
            </template>
          </a-table>
        </div>
      </div>
    </a-layout-content>
    <!-- 选择角色 -->
    <a-modal title="添加角色" v-model="visible" @ok="saveroles">
      <a-input-search
        placeholder="请填入要搜索的角色名称"
        v-model="searchrole"
        @search="onSearch"
        enterButton
        style="margin-bottom:15px;"
      />
      <a-table
        :columns="rolecolumns"
        :dataSource="data"
        size="middle"
        :rowSelection="{selectedRowKeys: handlevalue, onChange: onSelectChange}"
        :rowKey="record=>record.id"
        :pagination="pagination"
        @change="handleTableChange"
      ></a-table>
    </a-modal>
  </a-layout>
</template>
<script>
const columns = [
  {
    title: "角色名称",
    dataIndex: "rolename",
    width: "50%"
  },
  {
    title: "操作",
    width: "50%",
    scopedSlots: { customRender: "operate" }
  }
];
const rolecolumns = [
  {
    title: "角色名称",
    dataIndex: "name"
  }
];
import {
  getSingleStamp,
  getSingleRole,
  addStampRoles,
  delStampRole
} from "@/workflow/api/stamplist";
import { getrolesList } from "@/workflow/api/workflow";
import { showError } from "@/framework/utils/index";
import "@/workflow/style/process.css";
import {
  Layout,
  Breadcrumb,
  Row,
  Col,
  Table,
  Popconfirm,
  Button,
  Input,
  Modal
} from "ant-design-vue";
export default {
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ARow: Row,
    ACol: Col,
    ATable: Table,
    APopconfirm: Popconfirm,
    AButton: Button,
    AInputSearch: Input.Search,
    AModal: Modal
  },
  data() {
    return {
      columns,
      datalist: [],
      modelId: this.$route.query.id,
      sealList: {
        name: null,
        certificate: null,
        tgsealid: null,
        signkey: null,
        ukey: null
      },
      visible: false,
      rolecolumns,
      data: [],
      handlevalue: [],
      pagination: {
        current: 1,
        pagesize: 10,
        total: 0,
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      },
      id: null,
      searchrole: undefined
    };
  },
  created() {
    this.getStampInfo();
    this.getRoleList();
  },
  methods: {
    //获取单条签章数据
    getStampInfo() {
      getSingleStamp(this.modelId)
        .then(res => {
          this.sealList.name = res.result.name;
          this.sealList.certificate = res.result.certificate;
          this.sealList.tgsealid = res.result.tgsealid;
          this.sealList.signkey = res.result.signkey;
          this.sealList.ukey = res.result.ukey;
          this.id = res.result.id;
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取签章关联角色
    getRoleList() {
      getSingleRole(this.modelId)
        .then(res => {
          this.datalist = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    //打开添加角色
    addRole() {
      this.getRolesLists();
      this.visible = true;
    },
    //获取角色列表
    getRolesLists(name) {
      let query = {};
      query.namelike = name;
      query.needtotal = true;
      query.pagenum = this.pagination.current;
      query.pagesize = this.pagination.pagesize;
      getrolesList(query)
        .then(res => {
          this.pagination.total = res.result.total ? res.result.total : 0;
          this.pagination.current = res.result.pagenum ? res.result.pagenum : 1;
          this.data = res.result.rows;
        })
        .catch(err => {
          showError(err);
        });
    },
    //搜索
    onSearch(val) {
      this.getRolesLists(val);
    },
    //选择角色
    onSelectChange(selectedRowKeys) {
      this.handlevalue = selectedRowKeys;
    },
    //列表分页切换
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getRolesLists(this.searchrole);
    },
    //选择角色
    saveroles() {
      let query = {};
      query.id = this.id;
      query.roleids = this.handlevalue;
      addStampRoles(query)
        .then(res => {
          this.$message.success("角色保存成功！");
          this.visible = false;
          this.getRoleList();
        })
        .catch(err => {
          showError(err);
        });
    },
    //删除角色
    delRole(record) {
      delStampRole(this.id, record.roleid)
        .then(res => {
          this.$message.success(record.rolename + "删除成功！");
          this.getRoleList();
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  display: flex;
  .role-main {
    width: 800px;
    margin: 20px auto;
    .seal-detail {
      width: 100%;
      background-color: #f6f6f6;
      padding: 10px;
      border-radius: 5px;
      h3 {
        font-weight: bold;
      }
      .ant-row {
        margin: 10px 0;
      }
      .text {
        margin-left: 5px;
      }
    }
    .btn {
      display: block;
      margin: 20px 0;
    }
  }
}
</style>