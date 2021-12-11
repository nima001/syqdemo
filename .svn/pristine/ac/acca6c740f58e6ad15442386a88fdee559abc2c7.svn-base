<template>
  <a-layout class="processwrap exportSetting">
    <a-layout-content class="body">
      <div class="back">
        <a-button type="primary" @click="save" style="margin-left:15px;">保存</a-button>
      </div>
      <div class="content">
        <a-row :gutter="10">
          <a-col :span="4">
            <span class="title">导出文件名：</span>
          </a-col>
          <a-col :span="10">
            <a-row :gutter="5">
              <a-col :span="20">
                <a-input v-model="filename"></a-input>
              </a-col>
              <a-col :span="4">
                <span style="line-height:32px;">.xlsx</span>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
        <a-row :gutter="10">
          <a-col :span="4">
            <span class="title">导出权限：</span>
          </a-col>
          <a-col :span="20">
            <a-button style="margin-bottom:10px;" @click="openHandleUser">添加角色</a-button>
            <a-textarea read-only :rows="7" v-model="roles"></a-textarea>
          </a-col>
        </a-row>
        <a-row :gutter="10">
          <a-col :span="4">
            <span class="title">导出节点：</span>
          </a-col>
          <a-col :span="10">
            <h4>流程模板</h4>
            <div v-for="(item,index) in collectNodeVos" :key="index">
              <a-select v-model="item.modelinstanceid" disabled>
                <a-select-option
                  v-for="(obj,idx) in processlist"
                  :key="idx"
                  :value="obj.value"
                >{{obj.title}}</a-select-option>
              </a-select>
            </div>
          </a-col>
          <a-col :span="10">
            <h4>导出节点</h4>
            <div v-for="(item,index) in collectNodeVos" :key="index">
              <a-select placeholder="--请选择节点--" v-model="item.resourceid">
                <a-select-option
                  v-for="(obj,idx) in nodelists[index].nodelist"
                  :key="idx"
                  :value="obj.text"
                >{{obj.value}}</a-select-option>
              </a-select>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
    <!-- 选择角色 -->
    <a-modal title="添加角色" v-model="visible" @ok="saveroles">
      <a-input-search
        placeholder="请填入要搜索的角色名称"
        @search="onSearch"
        v-model="searchrole"
        enterButton
        style="margin-bottom:15px;"
      />
      <a-table
        :columns="columns"
        :dataSource="data"
        size="middle"
        :rowSelection="{selectedRowKeys: handlevalue, onChange: onSelectChange}"
        :rowKey="record=>record.id+'_'+record.name"
        :pagination="pagination"
        @change="handleTableChange"
      ></a-table>
    </a-modal>
  </a-layout>
</template>

<script>
import { getrolesList } from "@/workflow/api/workflow";
import {
  getCollectNodeList,
  saveCollectNode,
  getListNode,
  getModelinstances,
  getroles
} from "@/workflow/api/summarytable";
import "@/workflow/style/process.css";
const columns = [
  {
    title: "角色名称",
    dataIndex: "name"
  }
];
import {
  Layout,
  Breadcrumb,
  Button,
  Icon,
  Input,
  Row,
  Col,
  Select,
  Table,
  Modal
} from "ant-design-vue";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AButton: Button,
    AIcon: Icon,
    AInput: Input,
    AInputSearch: Input.Search,
    ATextarea: Input.TextArea,
    ARow: Row,
    ACol: Col,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    AModal: Modal
  },
  data() {
    return {
      filename: this.$route.query.filename,
      collecttableid: this.$route.query.collecttableid,
      processlist: [],
      nodelists: [],
      visible: false,
      columns,
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
      roles: "",
      collectNodeVos: [],
      searchrole: "",
      handlevalueIds: []
    };
  },
  created() {
    this.getModelList().then(val => {
      this.getNodesList();
    });
    this.getRoles();
  },
  methods: {
    //角色授权数据回显
    getRoles() {
      this.handlevalueIds=[];
      getroles(this.collecttableid)
        .then(res => {
          let arr = [];
          this.handlevalue = [];
          res.result.forEach(item => {
            this.handlevalue.push(item.value + "_" + item.text);
            arr.push(item.text);
            this.handlevalueIds.push(item.value);
          });
          this.roles = arr.join("、");
        })
        .catch(err => {
          showError(err);
        });
    },
    //打开角色选择
    openHandleUser() {
      this.visible = true;
      this.getRolesLists();
    },
    //搜索
    onSearch(val) {
      this.getRolesLists(val);
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
      let arr = [];
      this.handlevalueIds = [];
      this.handlevalue.forEach(item => {
        let temp = item.split("_");
        this.handlevalueIds.push(parseInt(temp[0]));
        arr.push(temp[1]);
      });
      this.roles = arr.join("、");
      this.visible = false;
    },
    //获取某个汇总表的流程模型节点集合
    getNodesList() {
      getCollectNodeList(this.collecttableid)
        .then(res => {
          this.collectNodeVos = res.result;
          this.collectNodeVos.forEach((item, index) => {
            this.getnode(item.modelinstanceid, index);
            this.nodelists.push({
              nodelist: []
            });
          });
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取流程模板
    getModelList() {
      let p = new Promise((resolve, reject) => {
        getModelinstances(this.$route.query.catalogid)
          .then(res => {
            this.processlist = res.result;
            resolve();
          })
          .catch(err => {
            showError(err);
          });
      });
      return p;
    },
    //获取节点列表
    getnode(id, index) {
      getListNode(id)
        .then(res => {
          this.nodelists[index].nodelist = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    //保存
    save() {
      let query={};
      query.collectNodeVos = this.collectNodeVos;
      query.id = this.collecttableid;
      query.filename = this.filename;
      query.roleids = this.handlevalueIds; 
      saveCollectNode(query)
        .then(res => {
          this.$message.success("保存成功！");
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.exportSetting {
  .body {
    margin: 12px;
    padding: 10px;
    background: #fff;
    .content {
      width: 60%;
      margin: 0 auto;
      .ant-row {
        margin: 0 0 15px 0;
      }
      .title {
        line-height: 32px;
        text-align: right;
        display: inline-block;
        width: 100%;
      }
      h4 {
        font-weight: bold;
        margin-top: 5px;
      }
      .ant-select {
        width: 100%;
        margin-bottom: 10px;
      }
    }
  }
}
</style>