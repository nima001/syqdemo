<!-- 审核中心 -->
<template>
  <div class="layout">
    <div class="content">
      <div class="top">
        <a-tabs default-active-key="0" @change="changekey">
          <a-tab-pane key="0" tab="未审核"></a-tab-pane>
          <a-tab-pane key="1" tab="已审核" force-render></a-tab-pane>
        </a-tabs>
        <div class="tools">
          <a-select
            allowClear
            placeholder="选择服务名称"
            v-model="servicename"
            :style="{width:'160px'}"
            @change="getVerifyList"
          >
            <a-select-option
              :value="value.selectValue"
              v-for="(value) in servicenameselect"
              :key="value.selectKey"
            >{{value.selectValue}}</a-select-option>
          </a-select>
          <a-select
            allowClear
            v-model="appname"
            placeholder="选择应用"
            :style="{width:'160px',marginLeft:'10px'}"
            @change="getVerifyList"
          >
            <a-select-option
              :value="value.selectValue"
              v-for="(value) in appnameselect"
              :key="value.selectKey"
            >{{value.selectValue}}</a-select-option>
          </a-select>
          <a-button type="primary" @click="getVerifyList" :style="{marginLeft:'10px'}">搜索</a-button>
          <a-button type="primary" @click="restsearch" :style="{marginLeft:'10px'}">重置</a-button>
        </div>
      </div>
      <div class="middle">
        <a-table
          :columns="columns"
          :data-source="dataSource"
          rowKey="applicationTime"
          :pagination="false"
          :loading="loading"
        >
          <span slot="action" slot-scope="text, record">
            <a
              v-if="hasPermit('/dev/audit/service')"
              @click="dispose(record)"
            >{{tabkey === '0'? '处理' :'查看'}}</a>
          </span>
          <span slot="servicestate" slot-scope="text">{{text === 2 ? "已通过" : "已退回"}}</span>
        </a-table>
      </div>
      <div class="bottom">
        <a-pagination
          v-if="dataSource.length > 0"
          :total="total"
          :showSizeChanger="true"
          @showSizeChange="onShowSizeChange"
          :page-size-options="pageSizeOptions"
          :page-size="pagesize"
          v-model="pagenum"
          @change="onPageChange"
          :showTotal="(total) => `总共：${total}条`"
        ></a-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { Tabs, Button, Input, Pagination, Table, Select } from "ant-design-vue";
import { verifyList, listselects } from "@/dev/api/service";
import { showError } from "@/framework/utils";
export default {
  components: {
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    AButton: Button,
    AInput: Input,
    ATable: Table,
    ASelect: Select,
    ASelectOption: Select.Option,
    APagination: Pagination
  },
  data() {
    return {
      tabkey: 0,
      dataSource:[],
      total: 0,
      pageSizeOptions: ["10", "20", "30", "40", "50"],
      pagesize: 10,
      pagenum: 1,
      //表格筛选条件
      servicename: undefined,
      appname: undefined,
      servicenameselect: {},
      appnameselect: {},
      loading: false
    };
  },
  computed: {
    columns() {
      let data = [
        {
          title: "序号",
          customRender: (text, record, index) => index + 1,
          width: "100px"
        },
        {
          title: "服务名称",
          dataIndex: "serviceName"
        },
        {
          title: "申请的应用",
          dataIndex: "appName"
        },
        {
          title: "申请人",
          dataIndex: "username"
        },
        {
          title: "申请时间",
          dataIndex: "applicationTime"
        },
        {
          title: "操作",
          key: "action",
          dataIndex: "action",
          scopedSlots: { customRender: "action" }
        }
      ];
      if (this.tabkey === "1") {
        let state = {
          title: "当前状态",
          dataIndex: "state",
          width: "10%",
          scopedSlots: { customRender: "servicestate" }
        };
        data.splice(5, 0, state);
      }
      return data;
    }
  },
  created() {
    this.getVerifyList();
    this.getServiceNameSelect();
    this.getAppNameSelect();
  },

  methods: {
    //tab切换
    changekey(key) {
      this.tabkey = key;
      this.total = 0;
      this.pagenum = 1;
      this.pagesize = 10;
      this.restsearch();
    },
    //pagenum切换
    onPageChange(page, pageSize) {
      this.getVerifyList();
    },
    //pagesize切换
    onShowSizeChange(current, size) {
      (this.pagesize = size), (this.pagenum = 1);
      this.getVerifyList();
    },
    //获取待审核的服务列表
    getVerifyList() {
      let data = {
        appName: this.appname,
        needtotal: true,
        orders: [
          {
            orderby: "applicationtime",
            ordertype: "DESC"
          }
        ],
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        service: this.servicename,
        servicetype: this.tabkey,
        userName: this.userName
      };
      this.loading = true;
      verifyList(data)
        .then(res => {
          let { pagenum, pagesize, total, rows } = res.result;
          this.pagenum = pagenum;
          this.pagesize = pagesize;
          this.total = total;
          this.dataSource = rows;
        })
        .catch(err => {
          showError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    //过滤下拉框筛选
    filterSelect(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    //获取服务名称下拉框
    getServiceNameSelect() {
      let data = "servicetype=" + this.tabkey + "&selecttype=0";
      listselects(data)
        .then(res => {
          this.servicenameselect = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取应用名称下拉框
    getAppNameSelect() {
      let data = "servicetype=" + this.tabkey + "&selecttype=1";
      listselects(data)
        .then(res => {
          this.appnameselect = res.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    //重置搜索
    restsearch() {
      this.servicename = undefined;
      this.appname = undefined;
      this.getVerifyList();
      this.getServiceNameSelect();
      this.getAppNameSelect();
    },
    //点击处理
    dispose(item) {
      this.$router.push({
        path: "/dev/manage/service/accessInfo",
        query: {
          appid: item.appid,
          code: item.serviceName,
          state: item.state,
          serviceId: item.serviceid,
          verifystate: this.tabkey
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.layout {
  width: 100%;
  height: 100%;
  padding: @layout-space-base;
  .content {
    width: 100%;
    height: 100%;
    background: @white;
    padding: @content-padding-v 0px;
    display: flex;
    flex-direction: column;
    .top {
      padding: @content-padding-v @content-padding-h 0px;
      /deep/ .ant-tabs-bar {
        margin-bottom: 0;
      }
      .tools {
        display: flex;
        justify-content: flex-end;
        padding: @padding-md 0px;
      }
    }
    .middle {
      padding: 0px @content-padding-h;
      flex-shrink: 1;
      overflow-y: auto;
    }
    .bottom {
      padding: @content-padding-v @content-padding-h;
      .ant-pagination {
        margin-top: 10px;
        text-align: right;
      }
    }
  }
}
</style>