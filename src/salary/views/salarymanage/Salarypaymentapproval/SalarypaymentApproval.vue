<template>
  <!-- 工资发放审批 权限 -->
  <div class="SalarypaymentApproval">
    <a-layout>
      <a-layout-content class="content">
        <div>
          <div class="tip">
            <span @click="towaitDo" class="spanBtn" :class="waitDo?'active':''">待办</span>
            <span @click="tohaveDone" :class="haveDone?'active': ''" class="spanBtn spanBtnRight">已办</span>
          </div>
          <!-- 待办 -->
          <div v-if="waitDo">
            <div class="search">
              <div>
                <a-input-search placeholder="单位名称" @search="onSearch"></a-input-search>
              </div>
            </div>
            <!-- 表格 -->
            <a-table
              class="tableCls"
              :columns="columns"
              :dataSource="datasource"
              :pagination="pagination"
              :loading="loading"
              :bordered="false"
              @change="changePagination"
            >
              <span slot-scope="val,record" slot="operate">
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <div @click="showInner(record)" class="operateBtn">审批</div>
                </div>
              </span>
              <span slot-scope="val" slot="status">{{val | state}}</span>
            </a-table>
            <showIdeaModal
              v-if="ifshowIdea"
              :ifshowIdea="ifshowIdea"
              @close="closeIdeaModal"
              :IdeaData="IdeaData"
            ></showIdeaModal>
          </div>

          <!-- 已办 -->
          <div v-if="haveDone">
            <div class="search">
              <!-- 状态 -->
              <div style="margin-right: 12px;">
                <span>状态：</span>
                <a-select @change="changeState" defaultValue="全部" style="width: 120px">
                  <a-select-option value="9">全部</a-select-option>
                  <a-select-option value="2">通过</a-select-option>
                  <a-select-option value="3">驳回</a-select-option>
                </a-select>
              </div>
              <!-- 处理时间 -->
              <div style="margin-right: 12px;">
                <span>处理时间：</span>
                <a-date-picker
                  :disabledDate="notAllowFnStart"
                  @change="start_time"
                  style="width: 120px;"
                />--
                <a-date-picker
                  :disabledDate="notAllowFnOver"
                  @change="over_time"
                  style="width: 120px;"
                />
              </div>
              <!-- 地区 -->
              <!-- <div>
                                <a-select  @change='changeunit'  v-if='orgArr.length' :defaultValue='orgArr[0].name'  style="width: 280px;margin-right: 12px;" >
                                    <a-select-option v-for='(item,index) in orgArr' :value="item.orgid">{{item.name}}</a-select-option>
                                </a-select>
              </div>-->
              <!-- search -->
              <div style="margin-right: 12px;">
                <a-input-search placeholder="单位名称" @search="onSearchDone"></a-input-search>
              </div>
            </div>
            <!-- 表格 -->
            <a-table
              class="tableCls"
              :columns="columnsDone"
              :loading="loadingDone"
              :dataSource="datasourceDone"
              :pagination="paginationDone"
              :bordered="false"
              @change="changePaginationDone"
            >
              <!-- 查看详情 审批意见 -->
              <span slot-scope="val,record" slot="operate">
                <span @click="showInner(record)" class="operateBtn" style="margin-right: 10px;">查看详情</span>
                <span
                  @click="showIdea(record)"
                  class="operateBtn"
                  style="margin-left: 10px;margin-right: 10px;"
                >审批意见</span>
                <a-popconfirm
                  title="确定重置吗？"
                  ok-text="是"
                  cancel-text="否"
                  @confirm="resetIdea(record)"
                >
                  <span class="operateBtn" style="margin-left: 10px;" v-if="record.status === 2">重置</span>
                </a-popconfirm>
              </span>
              <span slot-scope="val" slot="status">{{val | state}}</span>
              <span slot-scope="val" slot="approvalTime">{{val?val:'--'}}</span>
            </a-table>

            <showIdeaModal
              v-if="ifshowIdea"
              :ifshowIdea="ifshowIdea"
              @close="closeIdeaModal"
              :IdeaData="IdeaData"
            ></showIdeaModal>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import showIdeaModal from "./ShowIdea.vue";
import moment from "moment";
import { showError } from "@/framework/utils/index";
import { salaryAuditdept, salarySearch, salaryreset } from "@/salary/api/salaryManage";
import {
  Layout,
  Breadcrumb,
  Input,
  Table,
  DatePicker,
  Select,
  Popconfirm
} from "ant-design-vue";
export default {
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    AInput: Input,
    AInputSearch: Input.Search,
    ATable: Table,
    ADatePicker: DatePicker,
    ASelect: Select,
    APopconfirm: Popconfirm,
    ASelectOption: Select.Option,
    showIdeaModal
  },
  created() {
    if (this.$route.params && this.$route.params.ifsuccess) {
      //e,pagenum,auditdept,startDate,endDate,searchKey
      this.tohaveDone(0, 1, "", "", "", "");
    }
    //获取组织
    //1 待审核 2 审核通过 3 驳回
    this.getData(1);
    //获取 auditname
    salaryAuditdept()
      .then(res => {
        this.auditArr = res.result;
      })
      .catch(err => {
        showError(err);
      });
  },
  data() {
    return {
      searchKey: "",
      IdeaData: "", //审批意见 信息
      starttime: "",
      overtime: "",
      auditArr: [],
      nowOrgDone: "", //已办的当前 org
      nowState: 9, //代表全部
      nowAudit: "",
      loadingDone: true,
      loading: true,
      approvalSel: "全部", //申请人下拉
      waitDoSel: "", //待办下拉
      nowOrg: "", //当前的组织
      orgArr: [], //组织 信息
      ifshowIdea: false,
      waitDo: true,
      haveDone: false,
      columns: [
        {
          dataIndex: "orgname",
          key: "orgname",
          title: "单位名称",
          align: "left",
          scopedSlots: { customRender: "orgname" }
        },
        {
          dataIndex: "name",
          key: "name",
          title: "工资月份",
          align: "left",
          scopedSlots: { customRender: "name" }
        },
        {
          dataIndex: "createtime",
          key: "createtime",
          title: "发起时间",
          align: "left",
          scopedSlots: { customRender: "createtime" }
        },
        {
          dataIndex: "username",
          key: "username",
          title: "申请人",
          align: "left",
          scopedSlots: { customRender: "username" }
        },
        {
          dataIndex: "status",
          key: "status",
          title: "状态",
          align: "left",
          scopedSlots: { customRender: "status" }
        },
        {
          dataIndex: "auditname",
          key: "auditname",
          title: "审批单位",
          align: "left",
          scopedSlots: { customRender: "auditname" }
        },
        {
          dataIndex: "operate",
          key: "operate",
          title: "操作",
          align: "left",
          width: "20%",
          scopedSlots: { customRender: "operate" }
        }
      ],
      datasource: [],
      pagination: {
        defaultPageSize: 10,
        showTotal: total => `总共：${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      },
      columnsDone: [
        {
          dataIndex: "orgname",
          key: "orgname",
          title: "单位名称",
          align: "left",
          scopedSlots: { customRender: "orgname" }
        },
        {
          dataIndex: "name",
          key: "name",
          title: "工资月份",
          align: "left",
          scopedSlots: { customRender: "name" }
        },
        {
          dataIndex: "createtime",
          key: "createtime",
          title: "发起时间",
          align: "left",
          scopedSlots: { customRender: "createtime" }
        },
        {
          dataIndex: "username",
          key: "username",
          title: "申请人",
          align: "left",
          scopedSlots: { customRender: "username" }
        },
        {
          dataIndex: "status",
          key: "status",
          title: "状态",
          align: "left",
          scopedSlots: { customRender: "status" }
        },
        {
          dataIndex: "auditname",
          key: "auditname",
          title: "审批单位",
          align: "left",
          scopedSlots: { customRender: "auditname" }
        },
        {
          dataIndex: "approvalTime",
          key: "approvalTime",
          title: "处理时间",
          align: "left",
          scopedSlots: { customRender: "approvalTime" }
        },
        {
          dataIndex: "operate",
          key: "operate",
          title: "操作",
          align: "left",
          width: "20%",
          scopedSlots: { customRender: "operate" }
        }
      ],
      datasourceDone: [],
      paginationDone: {
        defaultPageSize: 10,
        showTotal: total => `总共：${total}条`,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30", "40"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      }
    };
  },
  filters: {
    state(val) {
      switch (val) {
        case 1:
          return "待审核";
        case 2:
          return "审核通过";
        case 3:
          return "驳回";
      }
    }
  },
  methods: {
    onSearch(val) {
      this.getData(1, val);
    },
    resetIdea(record) {
      let data = {
        dataid: record.id
      };
      salaryreset(data)
        .then(res => {
          this.tohaveDone();
        })
        .catch(err => {
          showError(err);
        });
    },
    onSearchDone(val) {
      this.searchKey = val;
      this.paginationDone.current = 1;
      let starttime = this.starttime ? this.starttime.format("YYYY-MM-DD") : "";
      let overtime = this.overtime ? this.overtime.format("YYYY-MM-DD") : "";
      this.nowState == 9
        ? this.tohaveDone(0, 1, this.nowAudit, starttime, overtime, val)
        : this.getDataDone(
            1,
            this.nowState,
            this.nowAudit,
            starttime,
            overtime,
            val
          );
    },
    start_time(val) {
      if (val) {
        this.starttime = moment(val);
      } else {
        this.starttime = "";
        if (this.starttime == "" && this.overtime == "") {
          //e,pagenum,auditdept,startDate,endDate,searchKey
          this.nowState == 9
            ? this.tohaveDone(0, 1, this.nowAudit, "", "", this.searchKey)
            : this.getDataDone(
                1,
                this.nowState,
                this.nowAudit,
                "",
                "",
                this.searchKey
              );
        }
      }
      if (this.starttime && this.overtime) {
        let startDate = this.starttime.format("YYYY-MM-DD");
        let endDate = this.overtime.format("YYYY-MM-DD");
        this.nowState == 9
          ? this.tohaveDone(
              0,
              1,
              this.nowAudit,
              startDate,
              endDate,
              this.searchKey
            )
          : this.getDataDone(
              1,
              this.nowState,
              this.nowAudit,
              startDate,
              endDate,
              this.searchKey
            );
      }
    },
    over_time(val) {
      if (val) {
        this.overtime = moment(val);
      } else {
        this.overtime = "";
        if (this.starttime == "" && this.overtime == "") {
          this.nowState == 9
            ? this.tohaveDone(0, 1, this.nowAudit, "", "", this.searchKey)
            : this.getDataDone(
                1,
                this.nowState,
                this.nowAudit,
                "",
                "",
                this.searchKey
              );
        }
      }
      if (this.starttime && this.overtime) {
        let startDate = this.starttime.format("YYYY-MM-DD");
        let endDate = this.overtime.format("YYYY-MM-DD");
        this.nowState == 9
          ? this.tohaveDone(
              0,
              1,
              this.nowAudit,
              startDate,
              endDate,
              this.searchKey
            )
          : this.getDataDone(
              1,
              this.nowState,
              this.nowAudit,
              startDate,
              endDate,
              this.searchKey
            );
      }
    },
    getData(pagenum, search) {
      //待办ajax
      this.loading = true;
      var data = {
        status: [1] /*代办*/,
        needtotal: true,
        pagenum: pagenum,
        pagesize: 10,
        searchKey: search
      };
      salarySearch(data)
        .then(res => {
          if (res.result.rows.length == 0) {
            this.datasource = [];
            this.loading = false;
            return;
          }
          for (let i = 0; i < res.result.rows.length; i++) {
            res.result.rows[i].key = i + 1;
          }
          this.loading = false;
          //总条数
          this.pagination.total = res.result.total;
          if (res.result.total < 1) {
            this.datasource = [];
            return;
          }
          //待办
          this.datasource = res.result.rows;
        })
        .catch(err => {
          this.loading = false;
          showError(err);
        });
    },
    getDataDone(pagenum, status, auditDept, startDate, endDate, searchKey) {
      //获取单个status
      this.loadingDone = true;
      var data = {
        startDate: startDate,
        endDate: endDate,
        auditDept: auditDept,
        status: [status],
        needtotal: true,
        pagenum: pagenum,
        pagesize: 10,
        searchKey: searchKey
      };
      salarySearch(data)
        .then(res => {
          if (res.result.rows.length == 0) {
            this.datasourceDone = [];
            this.loadingDone = false;
            return;
          }
          for (let i = 0; i < res.result.rows.length; i++) {
            res.result.rows[i].key = `1-${i + 1}`;
          }
          this.loadingDone = false;
          //总条数
          this.paginationDone.total = res.result.total;
          //待办
          this.datasourceDone = res.result.rows;
        })
        .catch(err => {
          this.loadingDone = false;
          showError(err);
        });
    },
    changeState(val) {
      this.nowState = val;
      this.paginationDone.current = 1;

      let starttime = this.starttime ? this.starttime.format("YYYY-MM-DD") : "";
      let overtime = this.overtime ? this.overtime.format("YYYY-MM-DD") : "";
      //pagenum,status,auditDept,startDate,endDate
      this.nowState == 9
        ? this.tohaveDone(
            0,
            1,
            this.nowAudit,
            starttime,
            overtime,
            this.searchKey
          )
        : this.getDataDone(
            1,
            val,
            this.nowAudit,
            starttime,
            overtime,
            this.searchKey
          );
    },
    //限制时间的选择
    notAllowFnStart(current) {
      if (this.overtime) {
        return current && current > this.overtime;
      }
    },
    notAllowFnOver(current) {
      if (this.starttime) {
        return current && current < this.starttime;
      }
    },
    changeunit(val) {
      this.paginationDone.current = 1;
      let starttime = this.starttime ? this.starttime.format("YYYY-MM-DD") : "";
      let overtime = this.overtime ? this.overtime.format("YYYY-MM-DD") : "";
      this.nowOrgDone = val;
      this.nowState == 9
        ? this.tohaveDone(
            0,
            1,
            this.nowAudit,
            starttime,
            overtime,
            this.searchKey
          )
        : this.getDataDone(
            1,
            this.nowState,
            this.nowAudit,
            starttime,
            overtime,
            this.searchKey
          );
    },

    //根据 audit 获取数据
    changeAudit(val) {
      let value = val == "allaudit" ? "" : val;
      this.nowAudit = value;
      let starttime = this.starttime ? this.starttime.format("YYYY-MM-DD") : "";
      let overtime = this.overtime ? this.overtime.format("YYYY-MM-DD") : "";

      this.nowState == 9
        ? this.tohaveDone(
            0,
            1,
            this.nowAudit,
            starttime,
            overtime,
            this.searchKey
          )
        : this.getDataDone(
            1,
            this.nowState,
            this.nowAudit,
            starttime,
            overtime,
            this.searchKey
          );
    },
    closeIdeaModal() {
      this.ifshowIdea = false;
    },

    //查看内容
    showInner(record) {
      let ifApproval = false;
      this.haveDone ? (ifApproval = true) : (ifApproval = false);
      let recordAll = {};
      recordAll.record = record;
      recordAll.ifApproval = ifApproval;
      this.$store.commit("CommitNowApprovalRecord", recordAll);
      this.$router.push({
        name: "approval",
        params: { record: record, ifApproval: ifApproval }
      });
    },
    //查看审批意见
    showIdea(record) {
      this.ifshowIdea = true;
      this.IdeaData = record;
    },
    //待办
    towaitDo() {
      this.waitDo = true;
      this.haveDone = false;
    },
    //已办
    tohaveDone(e, pagenum, auditdept, startDate, endDate, searchKey) {
      let pagenumTrue = pagenum ? pagenum : 1;
      this.loadingDone = true;
      //全部的数据
      let totalArr = [];
      var data = {
        startDate: startDate,
        endDate: endDate,
        auditdept: auditdept,
        status: [2, 3],
        needtotal: true,
        pagenum: pagenumTrue,
        pagesize: 10,
        searchKey: searchKey
      };
      salarySearch(data)
        .then(res => {
          this.paginationDone.total = res.result.total;
          for (let i = 0; i < res.result.rows.length; i++) {
            res.result.rows[i].key = `1-${i + 1}`;
          }
          totalArr = res.result.rows;
          this.datasourceDone = totalArr;
          this.paginationDone.total = res.result.total;
          this.waitDo = false;
          this.haveDone = true;
          this.loadingDone = false;
        })
        .catch(err => {
          this.waitDo = false;
          this.haveDone = true;
          this.loadingDone = false;
          showError(err);
        });
    },
    changePagination(pagination) {
      //点击分页的回调  待办
      this.pagination.current = pagination.current;
      this.getData(this.pagination.current, this.searchKey);
    },
    //已办 分页
    changePaginationDone(pagination) {
      let starttime = this.starttime ? this.starttime.format("YYYY-MM-DD") : "";
      let overtime = this.overtime ? this.overtime.format("YYYY-MM-DD") : "";

      if (this.nowState == 9) {
        this.paginationDone.current = pagination.current;
        this.tohaveDone(
          0,
          this.paginationDone.current,
          this.nowAudit,
          starttime,
          overtime,
          this.searchKey
        );
      } else {
        //pagenum,status,auditDept,startDate,endDate
        this.paginationDone.current = pagination.current;
        this.getDataDone(
          this.paginationDone.current,
          this.nowState,
          this.nowAudit,
          starttime,
          overtime,
          this.searchKey
        );
      }
    },
    change(record) {
      //本地存储record
      this.$store.commit("changeApprovalUnitNowRecord", record);
      this.$router.push({
        name: "changeunit",
        params: { record: record }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.SalarypaymentApproval {
  height: 100%;
  .ant-layout {
    height: 100%;
  }
  .content {
    padding: @layout-space-base;
  }
  .content > div {
    background-color: white;
    overflow: hidden;
    position: relative;
    height: 100%;
    padding: @content-padding-v @content-padding-h;
  }

  .tip {
    overflow: hidden;
    padding-top: @layout-space-base;
  }
  .tip .spanBtn {
    display: inline-block;
    height: 19px;
    border-right: 1px solid #c6c6c6;
    line-height: 19px;
    margin-top: 12px;
    float: left;
    cursor: pointer;
    font-size: 14px;
    padding: 0 10px;
  }
  .tip .spanBtnRight {
    border: none;
  }
  .active {
    color: @primary-color;
  }

  .search {
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }
  .operateBtn {
    color: @primary-color;
    cursor: pointer;
  }
  .operateBtn:hover {
    text-decoration: underline;
  }
  .tableCls {
    height: 80vh;
    overflow-y: auto;
  }
}
</style>