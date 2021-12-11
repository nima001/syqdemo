<template>
  <a-spin tip="加载中..." :spinning="spin">
    <div class="authorize-roles">
      <div class="top">
        <a-button type="primary" @click="openAddRoles">添加角色</a-button>
        <div class="selectRole">
          <a-input v-model="rolename" placeholder="输入角色名称搜索" @pressEnter="searchRole"></a-input>
          <a-button type="primary" @click="searchRole">搜索</a-button>
          <a-button @click="reset">重置</a-button>
        </div>
      </div>
      <div class="bottom">
        <a-table
          :data-source="data"
          :columns="columns"
          :pagination="pagination"
          :rowKey="record =>record.catalogroleid"
          :scroll="{ y: 270 }"
          @change="roleListChange"
        >
          <template slot="operation" slot-scope="text,record">
            <a-popconfirm title="移除后不可恢复，确定移除吗?" @confirm="() => del(record)">
              <a>移除</a>
            </a-popconfirm>
          </template>
        </a-table>
      </div>
      <!-- 选择角色 -->
      <a-modal title="添加角色" v-model="visible" @ok="saveroles" @cancel="cancelRole">
        <a-input-search
          placeholder="请填入要搜索的角色名称"
          v-model="searchrole"
          @search="onSearch"
          enterButton
          style="margin-bottom:15px;"
        />
        <a-table
          :columns="rolecolumns"
          :dataSource="roledata"
          size="middle"
          :rowSelection="{selectedRowKeys: handlevalue, onChange: onSelectChange}"
          :rowKey="record=>record.id"
          :pagination="rolepagination"
          @change="handleTableChange"
        ></a-table>
      </a-modal>
    </div>
  </a-spin>
</template>

<script>
const columns = [
  {
    title: "角色名称",
    dataIndex: "rolename"
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: 120,
    scopedSlots: { customRender: "operation" }
  }
];
const rolecolumns = [
  {
    title: "角色名称",
    dataIndex: "name"
  }
];
import { getrolesList } from "@/workflow/api/workflow";
import {
  getcatalogrolelist,
  savecatalogrole,
  deletecatalogrole
} from "@/workflow/api/catalog";
import { showError } from "@/framework/utils/index";
import { Button, Input, Table, Popconfirm, Modal, Spin } from "ant-design-vue";
export default {
  components: {
    AButton: Button,
    AInput: Input,
    ATable: Table,
    APopconfirm: Popconfirm,
    AModal: Modal,
    AInputSearch: Input.Search,
    ASpin: Spin
  },
  props: {
    type: {
      type: Number,
      default: 1
    },
    id: {
      type: Number
    }
  },
  data() {
    return {
      spin: true,
      rolename: "",
      data: [],
      columns,
      pagination: {
        current: 1,
        total: 0,
        pagesize: 10,
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      },
      //添加角色
      visible: false,
      rolecolumns,
      roledata: [],
      handlevalue: [],
      rolepagination: {
        current: 1,
        pagesize: 10,
        total: 0,
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      },
      searchrole: undefined
    };
  },
  watch: {
    flag: {
      handler(newval, oldval) {
        if (newval !== oldval) {
          this.data = [];
          this.spin = true;
          this.get();
        }
      },
      immediate: true
    }
  },
  computed: {
    flag() {
      return this.type + this.id;
    }
  },
  methods: {
    //获取授权角色列表
    get() {
      let roleListVo = {};
      roleListVo.pagequery = {
        pagenum: this.pagination.current,
        pagesize: this.pagination.pagesize,
        needtotal: true
      };
      roleListVo.rolename = this.rolename ? this.rolename : undefined;
      roleListVo.type = this.type;
      roleListVo.id = this.id;
      getcatalogrolelist(roleListVo)
        .then(res => {
          this.data = res.result.rows;
          this.pagination.total = res.result.total;
          this.spin = false;
        })
        .catch(err => {
          this.spin = false;
          showError(err);
        });
    },
    //搜索角色列表
    searchRole() {
      this.spin = true;
      this.get();
    },
    //分页
    roleListChange(pagination){
       const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.spin = true;
      this.get();
    },
    //打开角色添加
    openAddRoles() {
      this.getRolesLists();
      this.visible = true;
    },
    //搜索角色列表
    getRolesLists(name) {
      let query = {};
      query.namelike = name;
      query.needtotal = true;
      query.pagenum = this.rolepagination.current;
      query.pagesize = this.rolepagination.pagesize;
      getrolesList(query)
        .then(res => {
          this.rolepagination.total = res.result.total;
          this.roledata = res.result.rows;
        })
        .catch(err => {
          showError(err);
        });
    },
    //重置
    reset() {
      this.rolename = "";
      this.spin = true;
      this.get();
    },
    //选择角色
    onSelectChange(selectedRowKeys) {
      this.handlevalue = selectedRowKeys;
    },
    //角色列表分页切换
    handleTableChange(pagination) {
      const pager = { ...this.rolepagination};
      pager.current = pagination.current;
      this.rolepagination = pager;
      this.getRolesLists(this.searchrole);
    },
    //搜索角色
    onSearch(val) {
      this.getRolesLists(val);
    },
    //选择角色
    saveroles() {
      let query = {};
      query.id = this.id;
      query.roleids = this.handlevalue;
      query.type = this.type;
      savecatalogrole(query)
        .then(res => {
          if (res.result.length) {
            this.$message.success("有重复授权角色！");
          } else {
            this.$message.success("角色保存成功！");
          }
          this.get();
          this.visible = false;
          this.handlevalue = [];
        })
        .catch(err => {
          showError(err);
        });
    },
    //取消选择角色
    cancelRole() {
      this.visible = false;
      this.handlevalue = [];
    },
    //移除角色
    del(record) {
      deletecatalogrole(record.catalogroleid)
        .then(res => {
          this.$message.success(record.rolename + "已成功移除！");
          this.spin = true;
          this.get();
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.authorize-roles {
  .top {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    margin-bottom: 15px;
    .selectRole {
      display: flex;
      flex-wrap: nowrap;
      button {
        margin-left: 10px;
      }
    }
  }
}
</style>