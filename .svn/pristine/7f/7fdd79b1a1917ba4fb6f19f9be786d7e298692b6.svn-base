<template>
  <a-layout class="processwrap process">
    <a-layout-content class="content">
      <div class="processContent">
        <div class="process-width">
          <a-row class="process-search" :gutter="20">
            <a-col :span="9">
              <a-select style="width: 100%;" v-model="subjectsKey" size="large" placeholder="请选择主题">
                <a-select-option
                  v-for="(item,index) in subjects"
                  :key="index"
                  :value="item.value"
                >{{item.text}}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="11">
              <a-input-search
                placeholder="输入事项名称查询"
                @search="onSearch"
                v-model="searchContent"
                enterButton
                style="width: 100%;"
                size="large"
              />
            </a-col>
            <a-col :span="4" class="process-search-btn">
              <a-button type="primary" size="large" @click="onSearch(searchContent)">搜索</a-button>
              <a-button size="large" @click="reset">重置</a-button>
            </a-col>
          </a-row>
          <a-table
            v-if="contentList.length"
            :key="tableKey"
            :columns="columns"
            :dataSource="contentList"
            :pagination="pagination"
            @change="handleTableChange"
            :rowKey="(record)=>{return record.id}"
            :expandRowByClick="true"
            :defaultExpandAllRows="true"
          >
            <template slot="name" slot-scope="text, record">
              <span
                class="processname"
                :style="{'padding-left':(record.num-1)*25+'px','font-weight':record.num==1?'bold':''}"
              >{{record.order}}&nbsp;&nbsp;{{record.name}}</span>
            </template>
            <template slot="operation" slot-scope="text, record">
              <div class="operation">
                <div class="operation-btn" v-if="!record.children">
                  <a-button @click="processGuide(record)">办事指南</a-button>
                  <a-button type="primary" @click="openPc(record)">在线办理</a-button>
                </div>
                <a-icon type="down" style="font-size:18px;color:gray" v-else></a-icon>
              </div>
            </template>
          </a-table>
        </div>
      </div>
    </a-layout-content>
    <!-- 发起单位弹框 -->
    <a-modal
      :visible="visiblePc"
      title="请选择发起单位"
      @cancel="visiblePc=false"
      :footer="null"
      width="450px"
      :bodyStyle="tStyle"
    >
      <org-user-select mode="org" @finish="deptOk" :rootSelectable="true"></org-user-select>
    </a-modal>
    <!-- 发起用户选择弹框 -->
    <a-modal
      :visible="visibleUser"
      title="选择被操作人员"
      @cancel="visibleUser=false"
      :footer="null"
      width="500px"
      :bodyStyle="{'height':'330px','padding':0}"
      :destroyOnClose="true"
    >
      <select-process-user @userOk="userOk"></select-process-user>
    </a-modal>
  </a-layout>
</template>

<script>
import { getListCatalogv1, getCodeProcess, chooseOrg } from "@/workflow/api/catalog";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import SelectProcessUser from "./components/SelectProcessUser";
import { showError, guid } from "@/framework/utils/index";
import "@/workflow/style/process.css";
import {
  Layout,
  Breadcrumb,
  Input,
  Button,
  Pagination,
  Cascader,
  Modal,
  Select,
  Table,
  Icon,
  Row,
  Col
} from "ant-design-vue";
const columns = [
  {
    title: "流程名称",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "",
    dataIndex: "operation",
    width: 250,
    key: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  name: "ProcessV2",
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AInputSearch: Input.Search,
    AButton: Button,
    APagination: Pagination,
    AModal: Modal,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    AIcon: Icon,
    OrgUserSelect,
    ARow: Row,
    ACol: Col,
    SelectProcessUser
  },
  data() {
    return {
      pagination: {
        current: 1,
        pagesize: 10,
        total: 0,
        showTotal: function(total, range) {
          return `共 ${total} 条记录`;
        }
      },
      contentList: [],
      searchContent: "",
      processValue: null,
      subjects: [],
      subjectsKey: undefined,
      columns,
      visiblePc: false,
      tStyle: {
        padding: "5px 3px 5px 10px",
        width: "100%",
        height: "550px",
        color: "black"
      },
      curCode: undefined,
      tableKey: guid(),
      visibleUser: false,
      visibleFlag: true
    };
  },
  created() {
    this.getSearch();
  },
  methods: {
    //获取业务流程的全部信息
    getSearch() {
      let query = {};
      query.needtotal = true;
      query.pagenum = this.pagination.current;
      query.pagesize = this.pagination.pagesize;
      query.searchkey = this.searchContent;
      query.subjectkey = this.subjectsKey;
      query.status = 1;
      getListCatalogv1(query)
        .then(res => {
          this.contentList = [];
          if (res.code == "success") {
            this.contentList = res.result.rows;
            this.pagination.total = res.result.total ? res.result.total : 0;
            this.tableKey = guid();
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //分页
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.getSearch();
    },
    //查询
    onSearch(value) {
      this.getSearch();
    },
    reset() {
      this.searchContent = "";
      this.subjectsKey = undefined;
      this.getSearch();
    },
    //办理指南
    processGuide(record) {
      this.$router.push({
        path: "/workflow/processguide",
        query: {
          id: record.id,
          name: record.name,
          code: record.code
        }
      });
    },
    //办理流程
    openPc(record) {
      this.curCode = record.code;
      getCodeProcess(record.code)
        .then(res => {
          if (res.code == "success") {
            if (res.result.showtype == 3 || res.result.showtype == 9) {
              this.visibleFlag = true;
              this.isUrl(res.result.gotoUrl);
            } else if (res.result.showtype == 1) {
              this.visiblePc = true;
              this.visibleFlag = true;
            } else if (res.result.showtype == 5) {
              this.visibleUser = true;
              this.visibleFlag = false;
            }
          }
        })
        .catch(err => {
          showError(err);
        });
    },
    //确定选择的机构
    deptOk(type, list) {
      if (type == "ok" && list.length > 0) {
        let obj = list[0];
        this.visiblePc = false;
        let query = {};
        query.code = this.curCode;
        query.orgid = obj._id;
        chooseOrg(query)
          .then(res => {
            this.isUrl(res.result.gotoUrl);
          })
          .catch(err => {
            showError(err);
          });
      } else if (type == "cancel") {
        this.visiblePc = false;
      }
    },
    //确定选择的用户
    userOk(val) {
      this.visibleUser = false;
      let query = {};
      query.code = this.curCode;
      query.userid = val;
      chooseOrg(query)
        .then(res => {
          this.isUrl(res.result.gotoUrl);
        })
        .catch(err => {
          showError(err);
        });
    },
    //判断跳转的路径是否需要拼接
    isUrl(url) {
      if (url) {
        let link = decodeURIComponent(url);
        if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
          // 直接跳转
          window.open(link, "_blank");
        } else {
          // 相对路径
          if (link.indexOf("/") == 0) {
            link = link.substr(1);
          }
          let newURL =
            process.env.NODE_ENV === "production"
              ? process.env.BASE_URL + link
              : window.location.origin + "/" + link;
          window.open(newURL, "_blank");
        }
      }
    }
  }
};
</script>
<style lang="less">
.process {
  .content {
    padding: 12px;
    .processContent {
      background: #fff;
      height: auto;
      padding: 10px 20px 40px 20px;
      .process-width {
        width: 70%;
        margin: 0 auto;
      }
      .process-search {
        margin: 15px 0;
        .process-search-btn {
          display: flex;
          flex-wrap: nowrap;
          button {
            &:last-child {
              margin-left: 20px;
            }
          }
        }
      }
      table {
        /deep/ .ant-table-thead > tr > th,
        /deep/ .ant-table-tbody > tr > td {
          padding: 16px 8px;
        }
        .operation {
          text-align: right;
          padding-right: 20px;
          .operation-btn {
            display: flex;
            flex-wrap: nowrap;
            button {
              &:last-child {
                margin-left: 15px;
              }
            }
          }
        }
      }
    }
  }
}

.pc_child {
  .tree {
    padding-bottom: 200px;
    display: flex;
  }
  .btn {
    text-align: center;
    button {
      margin: 0 10px;
    }
  }
}
.ant-cascader-menus .ant-cascader-menu {
  min-width: 140px;
}
</style>