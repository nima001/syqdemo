<template>
  <div class="process-monitor-table">
    <div class="select">
      <div class="select-list">
        <a-select showSearch v-model="exception">
          <a-select-option
            v-for="(item,index) in typeList"
            :value="item.value"
            :key="index"
          >{{item.text}}</a-select-option>
        </a-select>
        <a-select showSearch v-model="processStatus">
          <a-select-option
            v-for="(item,index) in statusList"
            :value="item.value"
            :key="index"
          >{{item.text}}</a-select-option>
        </a-select>
        <a-select showSearch v-model="catalogid" placeholder="--选择查询流程--" style="width:138px">
          <a-select-option
            v-for="(item,index) in processList"
            :value="item.value"
            :key="index"
            :title="item.text"
          >{{item.text}}</a-select-option>
        </a-select>
        <a-input placeholder="输入流程名称/拼音" v-model="searchkey"></a-input>
        <a-input
          @click="visibleOrg=true"
          :allowClear="true"
          v-model="orgname"
          placeholder="--选择发起单位--"
        ></a-input>
        <a-input placeholder="输入申请人/单位" v-model="username"></a-input>
      </div>
      <div class="select-btns">
        <a-button type="primary" @click="search">搜索</a-button>
        <a-button class="reset" @click="reset">重置</a-button>
      </div>
    </div>
    <div style="clear:both"></div>
    <div class="table-content">
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :rowKey="record => record.businessinstanceid"
        @change="change"
      >
        <template slot="exception" slot-scope="text,record">
          <span :style="record.exception == 0?'':'color:red'">{{record.exception == 0?'正常':'异常'}}</span>
        </template>
        <template slot="operate" slot-scope="text,record">
          <div class="operation" style="color:#29d">
            <span
              @click="taskNode(record)"
              :style="record.status == 2?'color:#29d':'color:gray'"
            >节点任务</span>
            <span @click="approvalRecord(record)">审批记录</span>
            <span
              @click="errHandler(record)"
              :style="(record.exception == 1)?'':'color:gray'"
            >异常处理</span>
            <template>
              <a-popconfirm
                title="流程撤消后将不可恢复，确定撤销?"
                @confirm="cancel(record)"
                okText="确定"
                cancelText="取消"
                v-if="record.status === 2"
              >
                <span style="color:#29d">撤销流程</span>
              </a-popconfirm>
              <span v-else style="color:gray">撤销流程</span>
            </template>
          </div>
        </template>
      </a-table>
    </div>

    <!-- 机构选择 -->
    <a-modal
      title="单位名称选择"
      :visible="visibleOrg"
      @cancel="visibleOrg=false"
      width="450px"
      :bodyStyle="tStyle"
      :footer="null"
    >
      <org-user-select mode="org" @finish="orgOk" :rootSelectable="true" :usePermit="false"></org-user-select>
    </a-modal>
    <!-- 节点任务 -->
    <a-modal
      title="节点任务"
      :visible="visibleNode"
      @cancel="visibleNode=false"
      width="850px"
      class="monitor-modal"
      :bodyStyle="{'padding':0,'height':'400px','overflow':'auto'}"
      :footer="null"
    >
      <div class="table-wrap">
        <task-node :instanceId="instanceId" :businessinstanceid="businessinstanceid"></task-node>
      </div>
      <div class="footer-btn">
        <a-button @click="visibleNode=false">确定</a-button>
      </div>
    </a-modal>
    <!-- 异常处理 -->
    <a-modal
      title="异常处理"
      :visible="visibleError"
      @cancel="errorHandler"
      width="600px"
      class="monitor-modal"
      :bodyStyle="{'padding':0,'height':'400px','overflow':'auto'}"
      :footer="null"
    >
      <div class="table-wrap">
        <error-handler :businessinstanceid="businessinstanceid"></error-handler>
      </div>
      <div class="footer-btn">
        <a-button @click="errorHandler">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
import {
  Table,
  Select,
  Modal,
  Button,
  Input,
  Popconfirm
} from "ant-design-vue";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import TaskNode from "./tableComponents/TaskNode";
import ErrorHandler from "./tableComponents/ErrorHandler";
import moment from "moment";
import { getListBusinessInstance, getListmain } from "@/workflow/api/monitor";
import { listdelete } from "@/workflow/api/monitor";
import { showError, guid } from "@/framework/utils/index";
export default {
  components: {
    ATable: Table,
    ASelect: Select,
    ASelectOption: Select.Option,
    AModal: Modal,
    AButton: Button,
    AInput: Input,
    OrgUserSelect,
    APopconfirm: Popconfirm,
    TaskNode,
    ErrorHandler
  },
  props: ["timer"],
  data() {
    return {
      exception: 0,
      processStatus:0,
      catalogid: -1,
      orgname: undefined,
      orgid: undefined,
      username: "",
      searchkey: "",
      typeList: [
        { value: 0, text: "全部" },
        { value: 1, text: "只显示异常" }
      ],
      statusList: [
        { value: 0, text: "默认状态" },
        { value: 2, text: "运行中" },
        { value: 3, text: "已办结" },
        { value: 4, text: "已撤销" }
      ],
      processList: [],
      visibleOrg: false,
      tStyle: {
        padding: "5px 3px 5px 10px",
        height: "550px"
      },
      data: [],
      columns: [
        {
          title: "流程名称",
          dataIndex: "flowname",
          key: "flowname",
          width: "16%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "发起单位",
          dataIndex: "applyorg",
          key: "applyorg",
          width: "16%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "申请人/单位",
          dataIndex: "applyuser",
          key: "applyuser",
          width: 100,
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "发起人",
          dataIndex: "createuser",
          key: "createuser",
          width: 80,
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "发起时间",
          dataIndex: "applytime",
          key: "applytime",
          width: 80,
          customRender: text => moment(text).format("YYYY-MM-DD")
        },
        {
          title: "最近变更时间",
          dataIndex: "updatetime",
          key: "updatetime",
          width: 100,
          customRender: text => moment(text).format("YYYY-MM-DD")
        },
        {
          title: "运行状态",
          dataIndex: "status",
          key: "status",
          width: 80,
          customRender: text =>
            (text =
              text == 1
                ? "草稿"
                : text == 2
                ? "运行中"
                : text == 3
                ? "已办结"
                : "已撤销")
        },
        {
          title: "是否异常",
          dataIndex: "exception",
          key: "exception",
          width: 80,
          scopedSlots: { customRender: "exception" }
        },
        {
          title: "操作",
          dataIndex: "operate",
          key: "operate",
          width: 250,
          scopedSlots: { customRender: "operate" }
        }
      ],
      pagination: {
        current: 1,
        pagesize: 10,
        total: 0,
        showTotal: function(total) {
          return `总共： ${total} 条`;
        }
      },
      //节点任务
      visibleNode: false,
      instanceId: undefined,
      //异常处理
      visibleError: false,
      businessinstanceid: undefined,
      popvisible: false
    };
  },
  watch: {
    orgname(val) {
      if (!val) {
        this.orgid = undefined;
      }
    },
    flag(newval, oldval) {
      this.getlist();
    }
  },

  computed: {
    flag() {
      return this.timer;
    }
  },
  created() {
    this.getlist();
    this.getListModelinstances();
  },
  methods: {
    getlist() {
      let param = {};
      param.needtotal = true;
      param.pagenum = this.pagination.current;
      param.pagesize = this.pagination.pagesize;
      param.username = this.username ? this.username : undefined;
      param.searchkey = this.searchkey? this.searchkey : undefined;
      param.orgid = this.orgid ? this.orgid : undefined;
      param.catalogid = this.catalogid ? this.catalogid : -1;
      param.exception = this.exception;
      param.status = this.processStatus;
      getListBusinessInstance(param)
        .then(res => {
          this.data = res.result.rows;
          this.pagination.total = res.result.total;
        })
        .catch(err => {
          showError(err);
        });
    },
    //获取所有流程实例
    getListModelinstances() {
      getListmain()
        .then(res => {
          this.processList = [];
          this.processList.push({ text: "所有流程", value: -1 });
          res.result.forEach(item => {
            this.processList.push(item);
          });
        })
        .catch(err => {
          showError(err);
        });
    },
    //确定选择的机构
    orgOk(type, list) {
      if (type == "ok" && list.length > 0) {
        let org = list[0];
        this.visibleOrg = false;
        this.orgname = org.name;
        this.orgid = org._id;
      } else if (type == "cancel") {
        this.visibleOrg = false;
      }
    },
    //搜索
    search() {
      this.pagination.current = 1;
      this.getlist();
    },
    //重置
    reset() {
      this.catalogid = -1;
      this.orgname = "";
      this.username = "";
      this.searchkey = "";
      this.orgid = undefined;
      this.exception = 0;
      this.processStatus = 0;
      this.pagination.current = 1;
      this.getlist();
    },
    //分页
    change(page, pageSize) {
      this.pagination.current = page.current;
      this.getlist();
    },
    //节点任务
    taskNode(record) {
      if (record.status == 2) {
        this.instanceId = record.instanceId + "_" + guid();
        this.businessinstanceid = record.businessinstanceid;
        this.visibleNode = true;
      }
    },
    //审批记录
    approvalRecord(record) {
      const businessinstanceid = record.businessinstanceid
        ? record.businessinstanceid
        : "";
      const flowname = record.flowname ? record.flowname : "";
      const { href } = this.$router.resolve({
        name: "flowchartofcompletionpage",
        query: {
          flowname,
          businessinstanceid
        }
      });
      window.open(href, "_blank");
    },
    //异常处理
    errHandler(record) {
      if (record.exception == 1) {
        this.businessinstanceid = record.businessinstanceid + "_" + guid();
        this.visibleError = true;
      }
    },
    //流程撤销
    cancel(record) {
      listdelete(record.businessinstanceid)
        .then(res => {
          this.$message.success(record.flowname + "流程已撤销！");
          this.getlist();
        })
        .catch(err => {
          showError(err);
        });
    },
    errorHandler(){
      this.visibleError=false;
      this.getlist()
    }
  }
};
</script>
<style lang="less" scoped>
.process-monitor-table {
  padding: 0 20px;
  .select {
    float: right;
    .select-list {
      float: left;
      display: flex;
      > div {
        margin-left: 10px;
        min-width: 130px;
      }
      > span {
        margin-left: 10px;
      }
      > input {
        margin-left: 10px;
        min-width: 138px;
      }
    }
    .select-btns {
      float: right;
      padding-left: 20px;
      display: flex;
      flex-wrap: nowrap;
      button {
        &.reset {
          margin-left: 5px;
        }
      }
    }
  }
  .table-content {
    margin-top: 12px;
  }
  /deep/table {
    table-layout: fixed;
    td,
    th {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .operation {
    display: flex;
    flex-wrap: nowrap;
    span {
      cursor: pointer;
      &:not(:first-child) {
        margin-left: 10px;
      }
    }
  }
}
.monitor-modal {
  position: relative;
  .table-wrap {
    padding: 10px 20px;
    max-height: 400px;
    overflow: auto;
  }
  .footer-btn {
    position: absolute;
    background-color: #fff;
    z-index: 10;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 1px solid #efefef;
    text-align: center;
    padding: 10px 0;
  }
}
</style>