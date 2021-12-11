<template>
  <div class="table-list">
    <div class="antd-table-top">
      <a-col class="tabs">
        <span :class="[ handlestatus == 0 ? 'active' : '' ]" @click="onChangeStatus(0)">未整改</span>
        <span :class="[ handlestatus == 1 ? 'active' : '' ]" @click="onChangeStatus(1)">已整改</span>
        <span :class="[ handlestatus == 2 ? 'active' : '' ]" @click="onChangeStatus(2)">数据异动</span>
      </a-col>
    </div>
    <a-row class="antd-table-query">
      <a-col class="query-info" :span="5">
        <span v-show="handlestatus == 0" @click="onRunningStra">策略运行</span>
        <span v-show="handlestatus == 0" @click="onSendMsg">消息通知</span>
      </a-col>
      <a-col class="query-serach" :span="18">
        <!-- <dict-select
          v-if="showChart"
          class="queryitem"
          allowClear
          style="width: 160px;"
          dict="usermanage.org.systype"
          v-show="!orgid"
          v-model="search.systype"
          placeholder="全部序列"
        ></dict-select> -->
        <dict-select
          allowClear
          class="queryitem"
          style="width: 160px;"
          dict="person.monitor.strategytype"
          :filter="item => item.text !== '数据异动'"
          v-show="handlestatus != 2"
          v-model="search.strategytype"
          placeholder="全部类别"
        ></dict-select>
        <a-input 
          allowClear
          class="queryitem" 
          style="width: 160px"
          v-model="search.searchkey"
          placeholder="请输入关键词"
          >
        </a-input>
        <a-button class="queryitem" type="primary" @click="onSearch">搜索</a-button>
        <a-button class="queryitem" @click="onReset">重置</a-button>
      </a-col>
    </a-row>
    <a-table
      class="stra-table"
      rowKey="id"
      :columns="columns"
      :dataSource="tableData"
      :pagination="false"
      :loading="loading"
      >
      <span slot="detail" class="operation" slot-scope="text, record">
        <a @click="onShowDetail(record.content)">查看详情</a>
      </span>
    </a-table>
    <div class="footer">
      <a-pagination
        v-if="tableData && tableData.length"
        showSizeChanger
        :showTotal="total => `总共：${total}条`"
        @showSizeChange="onShowSizeChange"
        :total="pagination.total"
        :pageSize="pagination.pagesize"
        v-model="pagination.pagenum"
        @change="onPageChange"
      />
    </div>
    <a-modal
      :footer="null"
      v-model="visible"
      :width="700"
      title="策略选择"
      :bodyStyle="{ height: '550px', padding: '0'}"
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
                >
              </a-input>
              <a-button class="queryitem" type="primary" @click="onStraSearch">搜索</a-button>
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
            :rowSelection="{selectedRowKeys: selectedRow, onChange: changeData}"
            :scroll={y:350,x:500}
            >
            <template slot="operate" slot-scope="text,record">
              <span @click="openOrStopStra(record)" v-if="record.runstatus==0" style="color:#f00404;cursor:pointer;">已停用</span>
              <span @click="openOrStopStra(record)" v-if="record.runstatus==1" style="color:#3990fa;cursor:pointer;">启用中</span>
            </template>
          </a-table>
          <div class="footer">
            <a-pagination
              v-if="straList && straList.length"
              showSizeChanger
              :showTotal="total => `总共：${total}条`"
              @showSizeChange="onShowStraSizeChange"
              :total="straPagination.total"
              :pageSize="straPagination.pagesize"
              v-model="straPagination.pagenum"
              @change="onStraPageChange"
            />
          </div>
          <div style="height:50px;position:absolute;bottom:0px;left:300px;">
            <a-button type="primary" @click="doStra">运行策略</a-button>
          </div>
          <TaskProgress :taskid="taskid" :percentSign="true" :defaultInfo="taskInfo" v-if="taskid" @finish="onProgressFinish"/>
        </div>
    </a-modal>

    <a-modal v-model="sendMsgVisible" title="消息通知" ok-text="确认" cancel-text="取消" @ok="sendMsg">
      <p>是否通知所有机构？</p>
    </a-modal>

    <a-modal centered v-model="detailVisible" title="详情" ok-text="确认" cancel-text="取消" :footer=null>
      <p>{{detailContent}}</p>
    </a-modal>

    <a-modal centered v-model="taskFinishVisible" title="策略执行情况" :footer=null>
      <p>{{taskFinishContent}}</p>
    </a-modal>

  </div>
</template>
<script>
import { Row, Col, Input, Table, Pagination, Button, Modal } from "ant-design-vue";
import DictSelect from "@/framework/components/DictSelect";
import { dataqualityPageList, dataqualitySendMsg } from "@/person-shaoxing/api/monitor";
import {listMonitorStrategy, batchExecuteStrategy, openOrStopStrategy} from "@/person/api/monitor"
import { loopTaskResult } from "@/framework/api/asynctask";
import { showError } from "@/framework/utils/index";
import TaskProgress from "@/framework/components/TaskProgress";
import notification from 'ant-design-vue/es/notification'
export default {
  name: 'TableList',
  props: ['district', 'orgid','showChart'],
  components: {
    ARow: Row,
    ACol: Col,
    AInput: Input,
    ATable: Table,
    AButton: Button,
    APagination: Pagination,
    AModal: Modal,
    DictSelect,
    TaskProgress
  },
  computed: {
    columns: {
      get() {
        return this.initColumn.concat(this.addColumn);
      },
      set() {
        return this.initColumn.concat(this.addColumn);
      }
    },
  },
  watch: {
    district: {
      handler() {
        this.handlestatus = 0;
        this.getData({ pagenum: 1, pagesize: this.pagination.pagesize });
      },
      immediate: true
    },
    handlestatus: {
      handler(val) {
        for(let key in this.search) {
          this.search[key] = undefined;
        };
        if(val == 0) {
          this.addColumn = [
            { title: '发现时间', dataIndex: 'createtime', customRender: (text) => (text && text.substr(0, 10)), width: '10%' },
            { title: '状态', dataIndex: 'noticestatus', customRender: (text) => text == 0? '未通知': '已通知', width: '10%' },
            { title: "操作", width: "10%", scopedSlots: { customRender: "detail" }},
          ];
        }else if(val == 1){
          this.addColumn = [
            { title: '发现时间', dataIndex: 'createtime', customRender: (text) => (text && text.substr(0, 10)), width: '10%' },
            { title: '整改时间', dataIndex: 'handletime', customRender: (text) => (text && text.substr(0, 10)), width: '10%' },
            { title: "操作", width: "10%", scopedSlots: { customRender: "detail" }},
          ];
        }else {
          this.addColumn = [
            { title: '发现时间', dataIndex: 'createtime', customRender: (text) => (text && text.substr(0, 10)), width: '15%' },
            { title: "操作", width: "15%", scopedSlots: { customRender: "detail" }},
          ];
        }
      },
      immediate: true
    },
    orgid(val) {
      if(val) {
        this.getData({ pagenum: 1, pagesize: this.pagination.pagesize });
      }
    }
  },
  data() {
    return {
      initColumn: [
        { title: '类别', dataIndex: 'strategytype', customRender: this.dictRender('person.monitor.strategytype'), width: '10%' },
        { title: '相关部门', dataIndex: 'orgname', customRender: text => <span title={text}>{text}</span>, width: '20%' },
        { title: '问题或异动情况描述', dataIndex: 'content', customRender: text => <span title={text}>{text}</span>, width: '40%' },
      ],
      addColumn: [
        { title: '发现时间', dataIndex: 'createtime', customRender: (text) => (text && text.substr(0, 10)), width: '10%' },
        { title: '状态', dataIndex: 'noticestatus', customRender: (text) => text == 0? '未通知': '已通知', width: '10%' },
        { title: "操作", width: "10%", scopedSlots: { customRender: "detail" }},
      ],
      tableData: [],
      loading: false,
      loadingstra: false,
      search: {
        searchkey: undefined,
        systype: undefined,
        strategytype: undefined,
        straSearchkey: undefined
      },
      pagination: {
        total: 0,
        pagenum: 1,
        pagesize: 10
      },
      handlestatus: 0,
      strategytypeIn:[1,2,4],
      selectedRow: [],
      visible:false,
      sendMsgVisible: false,
      straColumns:[
            { title: '策略名称', dataIndex: 'name', width: "30%", customRender: text => <span title={text}>{text}</span> },
            { title: '策略描述', dataIndex: 'description', width: "60%", customRender: text => <span title={text}>{text}</span>},
            { title: "状态", dataIndex: "operate", width: "10%", scopedSlots: { customRender: "operate" }}
      ],
      straList:[],
      straPagination: {
        total: 0,
        pagenum: 1,
        pagesize: 10
      },
      taskid: null,
      detailVisible: false,
      detailContent: undefined,
      taskFinishVisible: false,
      taskFinishContent: undefined
    }
  },
  created() {
    },
  methods: {
    getData(page) {
      this.loading = true;
      if(this.orgid){//选择组织后不需要序列
        this.search.systype = undefined;
      }
      if(this.handlestatus == 1 || this.handlestatus == 0){
        this.strategytypeIn = [1,2,4];
      }else{
        this.strategytypeIn = [3];
      }
      let newHandlestatus = this.handlestatus;
      if(newHandlestatus == 2){
        newHandlestatus = 0;
      }
      
      let params = {
        ...page,
        needtotal: true,
        district:this.district,
        orgid: this.orgid,
        handlestatus: newHandlestatus,
        searchkey: this.search.searchkey,
        strategytype: this.search.strategytype,
        strategytypeIn: this.strategytypeIn
      };
      dataqualityPageList(params)
      .then(({result}) => {
        this.loading = false;
        this.pagination = result;
        this.tableData = result.rows;
      })
      .catch(err => {
        this.loading = false;
        showError(err);
      })
    },
    dictRender(key, attr){
      return (text, row, index) => {
        let v =  this.$store.getters.dictKey(key || row[attr], text);
        text = (v && v.text) || ''
        return <span title={text}>{text}</span>;
      }
    },
    onChangeStatus(status) {
      this.handlestatus = status;
      if(status == 0 || status == 1){
        this.strategytypeIn = [1,2,4];
      }else {
        this.strategytypeIn = [3];
      }
      this.getData({ pagenum: 1, pagesize: this.pagination.pagesize });
    },
    onSearch() {
      this.getData({ pagenum: 1, pagesize: this.pagination.pagesize });
    },
    onReset() {
      for(let key in this.search) {
        this.search[key] = undefined;
      }
      this.getData({ pagenum: 1, pagesize: this.pagination.pagesize });
    },
    onPageChange(pagenum, pagesize) {
      this.getData({ pagenum, pagesize });
    },
    onShowSizeChange(pagenum, pagesize) {
      this.getData({ pagenum: 1, pagesize });
    },
    onRunningStra() {
      //打开弹窗，策略列表
      this.search.straSearchkey = null;
      this.selectedRow = []
      this.getStraData({ pagenum: 1, pagesize:10 });
      this.visible = true
    },
    //获取策略列表
    getStraData(page) {
      this.loadingstra = true
      let params = {
        ...page,
        needtotal: true,
        searchkey: this.search.straSearchkey,
        strategytypeIn: [1,2,3]
      };
      listMonitorStrategy(params)
      .then(({result}) => {
        this.straPagination = result;
        this.straList = result.rows;
        this.loadingstra = false
      })
      .catch(err => {
        this.loadingstra = false
        showError(err);
      })
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
      for(let key in this.search) {
        this.search[key] = undefined;
      }
      this.selectedRow = []
      this.getStraData({ pagenum: 1, pagesize: this.straPagination.pagesize });
    },
    changeData(selectedRowKeys, selectedRows) {
      this.selectedRow = selectedRowKeys;
    },
    //执行策略
     doStra() {
      let ids = this.selectedRow;
      if(ids.length == 0){
        this.$message.warning("请先选择要运行的策略！");
      return;
      }
      batchExecuteStrategy(ids).then(resp => {
        this.taskInfo = "策略运行中。。。";
        this.taskid = resp.result;
        loopTaskResult(this.taskid);
      }).catch(err => {
        this.taskFinishContent = err;
        this.taskFinishVisible = true;
      })
    },
    //任务执行完成回调方法
    onProgressFinish(res){
      this.taskFinishContent = res;
      this.taskFinishVisible = true;
      // if(res.search("全部执行成功") != -1){
      //   this.$message.success(res);
      // }else{
      //   notification.error({
      //   message: '提示',
      //   description: res,
      //   duration: 30
      //   })
      // }
    },
    openOrStopStra(record){
      return;// 暂时不生效
      let status = record.runstatus;
      if(status != 0 && status != 1){
        this.$message.warning("该策略的状态未知错误！");
        return;
      }
      let runstatus = status == 1?0:1;
      openOrStopStrategy(record.id,runstatus).catch(err =>{
        showError(err);
      })
      this.getStraData({ pagenum: this.straPagination.pagenum, pagesize: this.straPagination.pagesize });
    },
    onSendMsg(){
      this.sendMsgVisible = true;
    },
    sendMsg(){
      dataqualitySendMsg("").then(res =>{
        this.$message.success('消息发送成功');
      }).catch(err =>{
        showError(err);
      })
      this.sendMsgVisible = false;
    },
    onShowDetail(content) {
      this.detailVisible = true;
      this.detailContent = content;
    }
  }
}
</script>
<style lang="less" scoped>
.table-list{
  .antd-table-top{
    margin-top: 10px;
    padding: @content-padding-v @content-padding-h;
    .tabs{
      span {
        cursor: pointer;
        padding: 0 10px;
        border-right: 1px solid #c6c6c6;
      }
      span.active{
        color: @primary-color;
      }
      :last-child {
        border: 0;
      }
    } 
  }
  .antd-table-query{
    padding: @content-padding-v @content-padding-h;
    .query-info{
      span{
        display: inline-block;
        padding: 0 10px;
        height: 32px;
        line-height: 32px;
        background-color: @primary-color;
        color: @white;
        border-radius: 5%;
        cursor: pointer;
        margin-left: 5px;
      }
    }
    .query-serach{
      display: flex;
      justify-content: flex-end;
      .queryitem{
        margin-left: 20px;
      }
    }
  }
  .antd-table-con{
    padding: @content-padding-v @content-padding-h;
  }
  .footer {
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