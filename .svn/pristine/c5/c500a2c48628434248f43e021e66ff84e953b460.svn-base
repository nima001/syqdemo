<template>
  <div class="content">
    <div class="header">
    <div class="left"></div>
    <ul class="right">
      <li>
      <a-range-picker v-model="search.createtime"
        :placeholder="['发起时间', '发起时间']"
        style="width: 240px"
      /> 
      </li>
      <li>
        <UserSelect :search.sync="search" :title="'请选择发布人'" :name="'createusername'" :value="'createuser'" @changesearch="changesearch"/>
      </li>
      <li><a-button type="primary" @click="onSearch()">搜索</a-button></li>
      <li><a-button @click="resetSeach()">重置</a-button></li>
    </ul>
    </div>
    <div class="body">
      <a-table
        rowKey="id"
        :pagination="false"
        :columns="columns"
        :dataSource="data"
        :loading="loading"
      >
        <div slot="opts" slot-scope="text, record">
          <span class="deal" @click="deal(record)">处理</span>
        </div>
      </a-table>
    </div>
    <div class="footer">
      <a-pagination 
        v-if="data.length"
        :current="pagination.pagenum"
        :total="pagination.total"
        :pageSize="pagination.pageSize"
        showSizeChanger
        :showTotal="total => `总共：${total}条`"
        @change="onPageChange"
        @showSizeChange="onShowSizeChange"
      />
    </div>
  </div>
</template>
<script>
import { Icon, Table, Pagination, DatePicker, Input, Button } from 'ant-design-vue'
import UserSelect from './UserSelect';
import { assign } from 'lodash'
import { showError } from '@/framework/utils'
import { formurl } from '@/workflow/api/workflow';
import { queryWorkTask, worktaskdetails } from '@/person-shaoxing/api/workTask'

const columns = 
  [
    { title: '序号', width: 50, align: 'center',customRender: (text, record, index)=> {return index+1}},
    { title: '标题', dataIndex: 'title', scopedSlots: {
      customRender: "customtitle" 
    }},
    { title: '发布人', dataIndex: 'createusername'},
    { title: '发起时间', dataIndex: 'createtime'},
    { title: '最近变更时间', dataIndex: 'updatetime'},
    { title: '操作', scopedSlots: 
      { 
        customRender: "opts" 
      }
    },
  ];
/**
 * 我的任务
 */
export default {
  props: {
    otherTasktypeList: {
      type: Array,
      default:()=> {
        return []
      }
    },
    tasktype: {
      type: Number
    }
  },
  components: {
    UserSelect,
    AIcon: Icon,
    AInput: Input,
    ATable: Table,
    AButton: Button,
    APagination: Pagination,
    ARangePicker: DatePicker.RangePicker,
  },
  data(){
    return {
      columns,
      loading: true,
      showModal: false,
      data: [],
      pagination: {
        pageSize: 20,
        pagenum: 1,
        total: 0,
      },
      search: {
        flowtype: undefined,
        createtime: undefined,
        deadtime: undefined,
        createuser: undefined,
        createusername: undefined,
        searchkey: undefined,//模糊匹配
      },
      showSelectUser: false,
    }
  },
  watch: {
    otherTasktypeList: {
      immediate: true,
      deep: true,
      handler(list){
        if(list && list.length && !this.search.flowtype){//任务类型常量加载到后才加载数据
          this.search.flowtype = this.tasktype;
          this.loadData(1, this.pagination.pageSize);
        }
      }
    },
    tasktype(val) {
      this.onTypeChange(val);
    },
    search: {
      deep: true,
      handler(val) {
        return val;
      }
    },
  },
  methods: {
    changesearch(name,value,id,username) {
      this.$set(this.search,name,username);
      this.$set(this.search,value,id);
    },
    onTypeChange(type){
      this.search.flowtype = type;
      this.resetSeach();
    },
    onPageChange(pagenum, pageSize) {
      assign(this.pagination, {pagenum, pageSize});
      this.loadData(pagenum, pageSize);
    },
    onShowSizeChange(current, pageSize) {
      assign(this.pagination, {pagenum: 1, pageSize})
      this.loadData(1, pagesize);
    },
    onSearch() {
      this.loadData(1, this.pagination.pageSize);
    },
    resetSeach(){
      Object.keys(this.search).forEach((key) => {
        if(key != 'flowtype') this.search[key] = undefined;
      });
      this.loadData(1, this.pagination.pageSize);
    },
    deal(record) {
      let url = `serialnum=${record.serialnum}&taskId=${record.acttaskid}`;
      formurl(url).then(({result})=>{
        window.open(result, "_blank");
      }).catch(err=>{
        showError(err)
      })
    },
    loadData(pagenum, pagesize){
      if(!this.search.flowtype){
        //任务类型未设置时，不查询数据
        return;
      }
      this.loading = true
      let params = Object.assign({
        pagenum, pagesize,
        needtotal: true,
      }, this.search);
      if(params.createtime){
        let [start, end] = params.createtime;
        params.createtimestart = start;
        params.createtimeend = end;
        params.createtime = undefined;
      }
      if(params.deadtime){
        let [start, end] = params.deadtime;
        params.deadtimestart = start;
        params.deadtimeend = end;
        params.deadtime = undefined;
      }
      queryWorkTask(params).then(({result}) => {
        this.data = result.rows;
        this.pagination.total = result.total;
      }).catch(error => {
        showError(error);
      }).finally(() => {
        this.loading = false;
      })
    }
  }
}
</script>
<style lang="less" scoped>
.content{
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  .header{
    padding: @content-padding-v @content-padding-h;
    overflow: hidden;
    & > .left{
      float: left;
      margin-bottom: 8px;
    }
    & > .right{
      float: right;
      margin-bottom: 8px;
    }
    li{
      display: inline-block;
      margin-left: 5px;
    }
    .clear-user{
      color: @disabled-color;
      font-size: 0.9em;
    }
  }
  .body {
    padding: 0 @padding-lg;
    /deep/.ant-table {
      .deal {
        color: @primary-color;
        cursor: pointer;
      }
    }
  }
  .footer{
    padding: @content-padding-v @content-padding-h;
    .ant-pagination{
      float: right;
    }
  }
}
</style>