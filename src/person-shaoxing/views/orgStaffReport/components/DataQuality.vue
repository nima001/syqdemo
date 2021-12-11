<template>
  <div class="form-panel">
    <div class="title">数据质量问题</div>
    <div class="top">
      <div class="top-left">
        <div class="card" v-for="(item, index) in list" :key="item.id">
          <card
            :src="src[index]"
            :title="item['title']"
            :num="item['num']"
            class="quality"
            :class="item['class']"
          ></card>
        </div>
      </div>
      <div class="top-middle">
        <question-proportion :outsideNum="outsideNum" :insideNum="insideNum" :district="district" />
      </div>
      <div class="top-right">
        <question-type :mechanismNum="mechanismNum" :personNum="personNum" :district="district" />
      </div>
    </div>
    <div class="middle">
      <p>问题查询</p>
      <div class="middle-content">
        <div class="middle-left">
          <div class="search">
            <a-input-search
              placeholder="输入问题内容"
              enter-button
              @search="searchClick"
              @click="searchClick"
              v-model="searchVal"
              :allowClear="true"
              :read-only="true"
            />
          </div>
        </div>
        <div class="middle-right">
          <a-button size="large" @click="onRunningStra">立即检测 </a-button>
        </div>
      </div>
    </div>
    <div class="title second">数据异动问题</div>
    <div class="bottom">
      <div class="bottom-left">
        <card
          @click.native="modalVisible = true"
          :src="bottomQuestion['src']"
          :title="bottomQuestion['title']"
          :num="bottomQuestion['num']"
        ></card>
      </div>
      <div class="bottom-right">
        <div class="head">
          <span>最近一个月异动消息</span>
          <a class="icon" @click="modalVisible = true">
            <img src="../../../assets/img/icon_more.png" alt="" />
          </a>
        </div>
        <template v-if="msg == ''">
          <no-date />
        </template>
        <div v-else class="content" v-for="item in msg" :key="item.id">
          <span class="bottom-title" @click="onShowDetail(item.content)">{{
            item.content
          }}</span>
          <span class="time">{{ item.createtime.substr(0, 10) }}</span>
        </div>
      </div>
    </div>
    <a-modal
      :destroyOnClose="true"
      :footer="null"
      v-model="orgvisible"
      :width="1100"
      title="数据质量列表"
      :afterClose="onClosed"
      :bodyStyle="{ height: '560px', padding: '0' }"
    >
      <search-list
        :district="district.district"
        :orgid="orgid"
        :executedVerbs="executedVerbs"
        :dataSearchVal="dataSearchVal"
        @onProgressFinish="onProgressFinish"
      />
    </a-modal>
    <a-modal
      :footer="null"
      v-model="modalVisible"
      :width="1100"
      title="数据异动列表"
      :afterClose="onClosed"
      :bodyStyle="{ height: '520px', padding: '0' }"
    >
      <data-list
        :district="district"
        :orgid="orgid"
        :dataSearchVal="dataSearchVal"
      />
    </a-modal>
    <a-modal
      :footer="null"
      v-model="visible"
      :width="700"
      title="策略选择"
      :bodyStyle="{ height: '550px', padding: '0' }"
    >
      <div class="table-list">
        <a-row class="antd-table-query">
          <a-col class="query-serach">
            <a-input
              allowClear
              class="queryitem"
              style="width: 160px"
              v-model="search.straSearchkey"
              placeholder="策略名称"
              :aria-readonly="true"
            >
            </a-input>
            <a-button class="queryitem" type="primary" @click="onStraSearch"
              >搜索</a-button
            >
            <a-button class="queryitem" @click="onStraReset">重置</a-button>
          </a-col>
        </a-row>
        <a-table
          class="stra-table"
          rowKey="id"
          :columns="straColumns"
          :dataSource="straList"
          :pagination="false"
          :loading="loadingstra"
          :rowSelection="{ selectedRowKeys: selectedRow, onChange: changeData }"
          :scroll="{ y: 350, x: 500 }"
        >
          <template slot="operate" slot-scope="text, record">
            <span
              @click="openOrStopStra(record)"
              v-if="record.runstatus == 0"
              style="color: #f00404; cursor: pointer"
              >已停用</span
            >
            <span
              @click="openOrStopStra(record)"
              v-if="record.runstatus == 1"
              style="color: #3990fa; cursor: pointer"
              >启用中</span
            >
          </template>
        </a-table>
        <div class="footer">
          <a-pagination
            v-if="straList && straList.length"
            showSizeChanger
            :showTotal="(total) => `总共：${total}条`"
            @showSizeChange="onShowStraSizeChange"
            :total="straPagination.total"
            :pageSize="straPagination.pagesize"
            v-model="straPagination.pagenum"
            @change="onStraPageChange"
          />
        </div>
        <div style="height: 50px; position: absolute; bottom: 0px; left: 300px">
          <a-button type="primary" @click="doStra">运行策略</a-button>
        </div>
        <TaskProgress
          :taskid="taskid"
          :percentSign="true"
          :defaultInfo="taskInfo"
          v-if="taskid"
          @finish="onProgressFinish"
        />
      </div>
    </a-modal>
    <a-modal
      centered
      v-model="detailVisible"
      title="详情"
      ok-text="确认"
      cancel-text="取消"
      :footer="null"
    >
      <p>{{ detailContent }}</p>
    </a-modal>
  </div>
</template>
<script>
import Card from "@/person-shaoxing/views/orgStaffReport/components/Card";
import DataList from "@/person-shaoxing/views/orgStaffReport/components/DataList";
import SearchList from "@/person-shaoxing/views/orgStaffReport/components/SearchList";
import QuestionProportion from "@/person-shaoxing/views/orgStaffReport/components/QuestionProportion";
import QuestionType from "@/person-shaoxing/views/orgStaffReport/components/QuestionType";
import TaskProgress from "@/framework/components/TaskProgress";
import NoDate from "@/person-shaoxing/views/orgStaffReport/components/NoDate";
import moment from "moment";
import {
  dataqualityPageList,
  dataqualityChart,
} from "@/person-shaoxing/api/monitor";
import {
  listMonitorStrategy,
  batchExecuteStrategy,
  openOrStopStrategy,
} from "@/person/api/monitor";
import { Input, Button, Row, Col, Table, Pagination } from "ant-design-vue";
import { showError } from "@/framework/utils/index";

export default {
  props: {
    district: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    AInputSearch: Input.Search,
    AButton: Button,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    ATable: Table,
    APagination: Pagination,
    Card,
    QuestionProportion,
    QuestionType,
    DataList,
    TaskProgress,
    SearchList,
    NoDate,
  },
  watch: {
    district: {
      handler() {
        this.getNum({ pagenum: 1, pagesize: this.pagination.pagesize }, 0, 1);
        this.getNum({ pagenum: 1, pagesize: this.pagination.pagesize }, 1, 1);
        this.getNum({ pagenum: 1, pagesize: this.pagination.pagesize }, 0, 3);
        this.getQuestion(this.district.district).insideOutside();
        this.getQuestion(this.district.district).mechanismPerson();

      },
      immediate: true,
    },
  },
  data() {
    return {
      orgFilter: undefined,
      dataSearchVal: undefined,
      modalVisible: false,
      orgid: undefined,
      searchVal: "",
      orgValue: undefined,
      orgvisible: undefined,
      pagination: {
        total: 0,
        pagenum: 1,
        pagesize: 10,
      },
      search: {
        searchkey: undefined,
        straSearchkey: undefined,
      },
      strategytypeIn: [1, 2, 4],
      list: [
        { id: 0, title: "问题总数", num: 0 },
        { id: 1, title: "未整改数", num: 0, class: "show" },
        { id: 2, title: "已整改数", num: 0 },
      ],
      bottomQuestion: {
        title: "异动问题数",
        num: 0,
        src: "icon_change",
      },
      src: ["icon_question", "icon_unhandle", "icon_right"],
      outsideNum: 0,
      insideNum: 0,
      mechanismNum: 0,
      personNum: 0,

      msg: undefined,
      selectedRow: [],
      visible: false,
      straColumns: [
        {
          title: "策略名称",
          dataIndex: "name",
          width: "30%",
          customRender: (text) => <span title={text}>{text}</span>,
        },
        {
          title: "策略描述",
          dataIndex: "description",
          width: "60%",
          customRender: (text) => <span title={text}>{text}</span>,
        },
        {
          title: "状态",
          dataIndex: "operate",
          width: "10%",
          scopedSlots: { customRender: "operate" },
        },
      ],
      straList: [],
      taskid: null,
      loadingstra: false,
      detailVisible: false,
      detailContent: undefined,
      executedVerbs: undefined
    };
  },
  methods: {
    onShowDetail(content) {
      this.detailVisible = true;
      this.detailContent = content;
    },
    getNum(page, handlestatus, type, search) {
      this.loading = true;
      this.handlestatus = handlestatus;
      let newHandlestatus = handlestatus;
      if (newHandlestatus == 2) {
        newHandlestatus = 0;
      }
      if (type == 1) {
        this.strategytypeIn = [1, 2, 4];
      } else {
        this.strategytypeIn = [3];
      }
      //根据创建时间倒序
      let orders = [{orderby: "createtime", ordertype: "DESC"}]
      let params = {
        ...page,
        needtotal: true,
        district: this.district.district,
        orgid: this.orgid,
        handlestatus: newHandlestatus,
        searchkey: this.search.searchkey,
        strategytype: this.search.strategytype,
        strategytypeIn: this.strategytypeIn,
        orders
      };

      if(type === 3){
        let starttime = moment().subtract(1,"months").format("YYYY-MM-DD HH:mm:ss");
        let endtime = moment().format("YYYY-MM-DD HH:mm:ss");
        params.starttime = starttime;
        params.endtime = endtime;
      }
      dataqualityPageList(params)
        .then(({ result }) => {
          this.loading = false;
          if (type == 3) {
            this.msg = result.rows.splice(0, 5);
            this.bottomQuestion.num = result.total;
          } else {
            if (newHandlestatus == 0) {
              this.list[1].num = result.total;
            } else {
              this.list[2].num = result.total;
            }
            this.list[0].num = this.list[1].num + this.list[2].num;
          }
        })
        .catch((err) => {
          this.loading = false;
          showError(err);
        });
    },
    getQuestion(district) {
      this.loading = true;
      let strategytypeIn = [1, 2, 4];
      return {
        insideOutside: () => {
          dataqualityChart({
            district:district,
            charttype: 1,
            strategytypeIn: strategytypeIn,
          })
            .then((result) => {
              let rows = (result && result.result && result.result.rows) || [];

              if(rows.length == 0 ){
                this.insideNum = 0;
                this.outsideNum = 0;
                return;
              }
              
              rows.forEach(row => {
                if(row.k0 == 1){
                  this.insideNum = row.v0 ? row.v0 : 0;
                }else{
                  this.outsideNum += row.v0 ? row.v0 : 0;
                }
              });
            })
            .catch((err) => {
              this.loading = false;
              showError(err);
            });
        },
        mechanismPerson: () => {
          dataqualityChart({
            district:district,
            charttype: 2,
            strategytypeIn: strategytypeIn,
          })
            .then((result) => {
              let rows = (result && result.result && result.result.rows) || [];
              if(rows.length == 0 ){
                this.mechanismNum = 0;
                this.personNum = 0;
                return;
              }
              rows.forEach(row => {
                if(row.k0 == 1){
                  this.personNum = row.v0 ? row.v0 : 0;
                }else{
                  this.mechanismNum = row.v0 ? row.v0 : 0;
                }
              });
            })
            .catch((err) => {
              this.loading = false;
              showError(err);
            });
        },
      };
    },

    onClosed() {
      this.searchVal = "";
      this.dataSearchVal = "";
      this.orgid = undefined;
    },
    onRunningStra() {
      //打开弹窗，策略列表
      this.search.straSearchkey = null;
      this.selectedRow = [];
      this.getStraData({ pagenum: 1, pagesize: 10 });
      this.visible = true;
    },
    //获取策略列表
    getStraData(page) {
      this.loadingstra = true;
      let params = {
        ...page,
        needtotal: true,
        searchkey: this.search.straSearchkey,
        strategytypeIn: [1, 2],
      };
      listMonitorStrategy(params)
        .then(({ result }) => {
          this.straPagination = result;
          this.straList = result.rows;
          this.loadingstra = false;
        })
        .catch((err) => {
          this.loadingstra = false;
          showError(err);
        });
    },
    onStraPageChange(pagenum, pagesize) {
      this.getStraData({ pagenum, pagesize });
    },
    onShowStraSizeChange(pagenum, pagesize) {
      this.getStraData({ pagenum: 1, pagesize });
    },
    onStraSearch() {
      this.getStraData({ pagenum: 1, pagesize: this.straPagination.pagesize });
    },
    onStraReset() {
      for (let key in this.search) {
        this.search[key] = undefined;
      }
      this.selectedRow = [];
      this.getStraData({ pagenum: 1, pagesize: this.straPagination.pagesize });
    },
    changeData(selectedRowKeys, selectedRows) {
      this.selectedRow = selectedRowKeys;
    },
    //执行策略
    doStra() {
      let ids = this.selectedRow;
      if (ids.length == 0) {
        this.$message.warning("请先选择要运行的策略！");
        return;
      }
      batchExecuteStrategy(ids)
        .then((resp) => {
          this.taskInfo = "策略运行中。。。";
          this.taskid = resp.result;
        })
        .catch((err) => {
          showError(err);
        });
    },
    onProgressFinish(res) {
      if(!res){
        return;
      }
      this.executedVerbs = [];
      let executedVerbsMap = JSON.parse(res);
      let keys = Object.keys(executedVerbsMap);
      if(keys.length == 0){
        return;
      }
      keys.forEach(key => {
        this.executedVerbs.push({strategyid:key,version:executedVerbsMap[key]});
      });
      //关闭查询列表，弹出搜索列表
      this.visible = false;
      this.orgvisible = true;
    },
    searchClick(){
      this.executedVerbs = undefined;
      this.orgvisible = true;
    },
    openOrStopStra(record) {
      return; // 暂时不生效
      let status = record.runstatus;
      if (status != 0 && status != 1) {
        this.$message.warning("该策略的状态未知错误！");
        return;
      }
      let runstatus = status == 1 ? 0 : 1;
      openOrStopStrategy(record.id, runstatus).catch((err) => {
        showError(err);
      });
      this.getStraData({
        pagenum: this.straPagination.pagenum,
        pagesize: this.straPagination.pagesize,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.form-panel {
  padding: 0 @content-padding-h;
  & > .title {
    font-weight: bold;
    line-height: 30px;
    margin-bottom: 30px;
    &.second {
      margin-top: 30px;
    }
  }
  & > .top {
    padding: 0 0;
    display: flex;
    & > .top-left {
      border: 1px solid #e8e8e8;
      border-radius: 5px;
      margin-right: 35px;
      display: flex;
      width: 40%;
      & > .card {
        width: 166px;
        /deep/ .quality {
          width: 166px;
        }
      }
    }
    & > .top-middle {
      width: 30%;
    }
    & > .top-right {
      width: 30%;
      margin-left: 30px;
    }
  }
  & > .middle {
    margin-top: 20px;
    padding: 0 0;
    .middle-content {
      display: flex;
      .middle-left {
        display: flex;
        width: 63%;
        margin-right: 35px;
        .search {
          width: 100%;
          /deep/ .ant-input {
            display: inline-block;
            height: 50px;
          }
          /deep/ .ant-btn-primary {
            display: inline-block;
            width: 139px;
            height: 50px;
            background-color: @primary-color;
            .anticon {
              font-size: 25px;
            }
          }
        }
      }
      .middle-right {
        width: 34%;
        /deep/ .ant-btn {
          width: 100%;
          height: 50px;
          background-color: @primary-color;
          color: @white;
        }
      }
    }
  }
  & > .bottom {
    padding: 0 0;
    display: flex;
    & > .bottom-left {
      margin-right: 35px;
      /deep/ .compile {
        cursor: pointer;
      }
    }
    & > .bottom-right {
      width: 100%;

      & > .head {
        height: 35px;
        border-bottom: 1px solid #e8e8e8;
        line-height: 35px;
        font-weight: bold;
        font-size: 18px;
        .icon {
          float: right;
        }
      }
      & > .content {
        height: 35px;
        border-bottom: 1px solid #e8e8e8;
        line-height: 35px;

        .bottom-title {
          cursor: pointer;
          display: block;
          float: left;
          width: 760px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:hover {
          background-color: @primary-1;
        }
        .time {
          display: block;
          float: right;
        }
      }
    }
  }
}
.table-list {
  .antd-table-query {
    padding: @content-padding-v @content-padding-h;
    .query-serach {
      display: flex;
      justify-content: flex-end;
      .queryitem {
        margin-left: 20px;
      }
    }
  }
  .antd-table-con {
    padding: @content-padding-v @content-padding-h;
  }
  & > .footer {
    display: flex;
    justify-content: flex-end;
    padding: 12px @content-padding-h;
  }
  .stra-table {
    padding: @content-padding-v @content-padding-h;
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
}
</style>