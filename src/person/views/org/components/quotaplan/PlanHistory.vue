<template>
  <div class="plan-history">
    <div class="top">
      <div class="left">
        <!-- <a-button icon="upload">导出</a-button> -->
      </div>
      <div class="right">
        <a-date-picker 
          @panelChange="onChangeDate"
          @openChange="onOpenChange"
          @change="onClearDate"
          mode="year"
          format="YYYY"
          :value="yearState.time"
          :open="yearState.isOpen"
          placeholder="请选择年份">
        </a-date-picker>
        <a-button type="primary" @click="onSearch" style="margin-left: 10px">查询</a-button>
      </div>
    </div>
    <a-table
      class="plan-table"
      rowKey="id"
      :columns="columns" 
      :dataSource="pagination.rows"
      :pagination="false"
      :footer="handleFooterShow"
      :loading="loading"
      >
      <template slot="opt" slot-scope="data">
        <a class="opt" @click="showPerform(data)">查看使用详情</a>
      </template>
    </a-table>
    <div class="footer">
      <a-pagination
        v-if="pagination.rows && pagination.rows.length"
        showSizeChanger
        @showSizeChange="onShowSizeChange"
        :showTotal="total => `总共：${total}条`"
        :total="pagination.total"
        :pageSize="pagination.pagesize"
        v-model="pagination.pagenum"
        @change="onPageChange"
      />
    </div>
    <a-modal 
      title="使用详情" 
      :footer="null" 
      v-model="performShowing"
      :width="500" 
      :bodyStyle="{height: '460px', padding: 0}"
      >
      <plan-perform :id="planItemId" />
    </a-modal>
  </div>
</template>
<script>
import {  Table, Button, Pagination, Modal, DatePicker } from 'ant-design-vue';
import PlanForm from './PlanForm';
import PlanPerform from './PlanPerform';
import { PlanHistory } from '@/person/api/orgQuotaPlan';
import { showError } from "@/framework/utils/index";
export default {
  name: 'PlanHistory',
  props: ['loadData'],
  data() {
    return{
      columns: [
        {
          title: '序号',
          align: 'center',
          customRender: (text, row, index) => ((this.pagination.pagenum - 1)*this.pagination.pagesize) + (index + 1),
          width: '5%'
        },
        { 
          title: '申请单位', 
          width: '15%',
          customRender: (text, row, index) => this.loadData.node.data.name 
        },
        {
          title: '下达时间',
          dataIndex: 'applytime',
          align: 'center',
          customRender: (text) => (text && text.substr(0, 10)),
          width: '7%'
        },
        {
          title: '申请用编计划数',
          dataIndex: 'items[0].total',
          align: 'center',
          width: '7%'
        },
        {
          title: '已使用',
          dataIndex: 'items[0].used',
          align: 'center',
          width: '7%'
        },
        {
          title: '归还计划数',
          dataIndex: 'items[0]recycle',
          align: 'center',
          width: '7%'
        },
        {
          title: '申请编制类型',
          dataIndex: 'complietype',
          align: 'center',
          customRender: this.dictRender('usermanage.user.complietype'),
          width: '7%'
        },
        {
          title: '用途',
          dataIndex: 'items[0].key',
          align: 'center',
          customRender: this.dictRender(null, 'type'),
          width: '20%'
        },
        {
          title: '操作',
          align: 'center',
          width: '200px',
          scopedSlots: {customRender: "opt"},
          width: '25%'
        }
      ],
      id: '',
      complietype: undefined,
      loading: false,
      yearState: {
        isOpen: false,
        time: null,
        default: new Date().getFullYear().toString()
      },
      pagination: {
        rows: null,
        pagenum: 1,
        pagesize: 20,
        total: 0
      },
      columnFooter: [
        {
          title: '合计',
          dataIndex: 'time',
          align: 'center',
          width: '20%'
        },
        {
          width: '7%'
        },
        {
          title: '申请用编计划数',
          dataIndex: 'total',
          align: 'center',
          width: '7%'
        },
        {
          title: '已使用',
          dataIndex: 'used',
          align: 'center',
          width: '7%'
        },
        {
          title: '归还计划数',
          dataIndex: 'recycle',
          align: 'center',
          width: '7%'
        },
        {
          width: '7%'
        },
        {
          width: '45%'
        }
      ],
      footerDataSource: [],
      performShowing: false,
      planItemId: null,
      showTotalTalbe: false
    }
  },
  components: {
    PlanForm, 
    PlanPerform,
    ATable: Table,
    AButton: Button,
    APagination: Pagination,
    AModal: Modal,
    ADatePicker: DatePicker
  },
  watch: {
    loadData: function(data) {
      if (data) {
        this.id = data.node.data._id;
        this.complietype = data.node.data.complietype
        this.getPlan(this.pagination);
      }
    }
  },
  created() {
    this.id = this.loadData.node.data._id;
    this.getPlan(this.pagination);
  },
  methods: {
    handleFooterShow(data) {
      if(data.length > 0) {
        return (
          <a-table
            rowKey={Math.random}
            bordered={false}
            pagination={false}
            columns={this.columnFooter}
            dataSource={this.footerDataSource}
            showHeader={false}
          ></a-table>
        );
      }else{
        return false;
      }
    },
    getPlan(page) {
      this.loading = true;
      PlanHistory({
        ...page,
        needtotal: true,
        orgid: this.id,
        year: this.yearState.default
      })
      .then(({result}) => {
        this.loading = false;
        let sumData = result.sum === undefined?{total: '', used: '', recycle: ''}:result.sum;
        if(result.rows){
          result.rows.forEach(item => {
            item.complietype = this.complietype;
          })
        }
        this.pagination = result;
        this.$set(this.footerDataSource, 0, sumData);
        this.footerDataSource[0].time = '合计';
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
    onSearch() {
      this.getPlan({pagenum: 1, pagesize: this.pagination.pagesize});
    },
    onChangeDate(value) {
      this.yearState.time = value;
      this.yearState.isOpen = false;
      this.yearState.default = this.yearState.time._d.getFullYear() + '';
    },
    onClearDate(date) {
      this.yearState.default = new Date().getFullYear().toString();
      this.yearState.time = null;
      this.getPlan({pagenum: 1, pagesize: this.pagination.pagesize});
    },
    onOpenChange(status) {
      this.yearState.isOpen = status?true:false;
    },
    onPageChange(pagenum, pagesize) {
      this.getPlan({pagenum, pagesize});
    },
    onShowSizeChange(pagenum, pagesize) {
      this.getPlan({pagenum: 1, pagesize});
    },
    showPerform(data) {
      if(!data.items || !data.items.length){
        return;
      }
      this.performShowing = true;
      this.planItemId = data.items[0].id;
    }
  }
}
</script>
<style lang="less" scoped>
.plan-history{
  display: flex;
  flex: auto;
  flex-direction: column;
  height: 100%;
  background-color: @white;
  .top {
    padding: @padding-md @content-padding-h @content-padding-v @content-padding-h;
    .left {
      float: left;
      .ant-btn {
        margin-right: 10px;
        color: @primary-color;
        border-color: @primary-color;
      }
    }
    .right {
      float: right;
    }
  }
  .plan-table {
    flex-shrink: 1;
    min-height: 0;
    padding: 0 @content-padding-h;
    overflow-y: auto;
    /deep/table {
      table-layout: fixed;
      td,
      th {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .table-tr {
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /deep/.ant-table-footer{
      background-color: @white;
      padding: 0;
      /deep/.ant-table-small{
        border: none;
      }
    }
  }
  .footer {
    padding: @content-padding-v @content-padding-h;
    .ant-pagination {
      float: right;
      margin-bottom: 10px;
    }
  }
}
</style>