<template>
  <div class="plan-historybw">
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
      <ul slot="job-list" slot-scope="data">
        <li
          v-for="item in data.items"
          :key="item.id"
        >{{dictText(data.type, item.key)}}</li>
      </ul>
      <ul slot="recycle-list" slot-scope="data">
        <li v-for="item in data.items" :key="item.id">{{item.recycle}}</li>
      </ul>
      <ul slot="used-list" slot-scope="data">
        <li v-for="item in data.items" :key="item.id">{{item.used}}</li>
      </ul>
      <ul slot="opt-list" slot-scope="data">
        <li v-for="item in data.items" :key="item.id">
          <a class="opt" @click="showPerform(item)">使用详情</a>
        </li>
      </ul>
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
      <plan-perform :id="planItemId"/>
    </a-modal>
  </div>
</template>
<script>
import {  Table, Button, Pagination, Modal, DatePicker  } from 'ant-design-vue';
import PlanForm from './PlanForm';
import PlanPerform from './PlanPerform';
import { PlanHistoryBw } from '@/person/api/orgQuotaPlan';
import { showError } from "@/framework/utils/index";
export default {
  name: 'PlanHistoryBw',
  props: ['loadData'],
  data() {
    return{
      id: '',
      columns: [
        {
          title: '序号',
          customRender: (text, row, index) => ((this.pagination.pagenum - 1)*this.pagination.pagesize) + (index + 1),
          width: '5%'
        },
        { 
          title: '申请单位', 
          customRender: (text, row, index) => this.loadData.node.data.name ,
          width: '16%'
        },
        {
          title: '下达时间',
          dataIndex: 'applytime',
          customRender: (text) => (text && text.substr(0, 10)),
          width: '10%'
        },
        {
          title: '计划使用管控数',
          dataIndex: 'itemTotal',
          width: '10%'
        },
        {
          title: '岗位',
          class: 'inner-list',
          scopedSlots: { customRender: "job-list" },
          width: '28%'
        },
        {
          title: '归还计划数',
          scopedSlots: { customRender: "recycle-list" },
          class: 'inner-list',
        },
        {
          title: '已使用',
          scopedSlots: { customRender: "used-list" },
          class: 'inner-list',
        },
        {
          title: '操作',
          class: "inner-list",
          scopedSlots: {customRender: "opt-list"},
        }
      ],
      columnFooter: [
        {
          title: '合计',
          dataIndex: 'time',
          width: '21%',
          align: 'center'
        },
        {
          width: '10%'
        },
        {
          width: '10%'
        },
        {
          width: '28%'
        },
        {
          title: '归还计划数',
          dataIndex: 'recycle',
        },
        {
          title: '已使用',
          dataIndex: 'used',
        },
        {
          //占位
        }
      ],
      footerDataSource: [],
      yearState: {
        isOpen: false,
        time: null,
        default: new Date().getFullYear().toString()
      },
      loading: false,
      performShowing: false,
      planItemId: '',
      pagination: {
        rows: null,
        pagenum: 1,
        pagesize: 20,
        total: 0
      }
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
        this.gainData(this.pagination);
      }
    }
  },
  created() {
    this.id = this.loadData.node.data._id;
    this.gainData(this.pagination);
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
    gainData(page) {
      this.loading = true;
      PlanHistoryBw({
        ...page,
        needtotal: true,
        orgid: this.id,
        year: this.yearState.default
      })
      .then(({result}) => {
        this.loading = false;
        let sumData = result.sum === undefined?{total: '', used: '', recycle: ''}:result.sum;
        (result.rows || []).forEach(ele => {
          let s = 0;
          (ele.items || []).forEach(item => {
            s += item.total || 0;
          })
          ele.itemTotal = s;
        });
        this.pagination = result;
        this.$set(this.footerDataSource, 0, sumData);
        this.footerDataSource[0].time = '合计';
      })
      .catch(err => {
        this.loading = false;
        showError(err);
      }) 
    },
    dictText(dict, value) {
      let v = this.$store.getters.dictKey(dict, value);
      if(v){
        return v.group ? `${v.group}/${v.text}` :  v.text;
      }
      return "";
    },
    onChangeDate(value) {
      this.yearState.time = value;
      this.yearState.isOpen = false;
      this.yearState.default = this.yearState.time._d.getFullYear() + '';
    },
    onClearDate() {
      this.yearState.time = null;
      this.yearState.default = new Date().getFullYear().toString();
      this.gainData({pagenum: 1, pagesize: this.pagination.pagesize});
    },
    onOpenChange(status) {
      this.yearState.isOpen = status?true:false;
    },
    onSearch() {
      this.gainData({pagenum: 1, pagesize: this.pagination.pagesize});
    },
    onPageChange(pagenum, pagesize) {
      this.gainData({pagenum, pagesize});
    },
    onShowSizeChange(pagenum, pagesize) {
      this.gainData({pagenum: 1, pagesize});
    },
    showPerform(item) {
      this.performShowing = true;
      this.planItemId = item.id;
    },
  }
}
</script>
<style lang="less" scoped>
.plan-historybw{
  display: flex;
  flex: auto;
  flex-direction: column;
  height: 100%;
  background-color: @white;
  .top {
    margin-top: 10px;
    padding: @content-padding-v @content-padding-h @content-padding-v @content-padding-h;
    .left {
      float: left;
      margin-top: @content-padding-v/2;
      .ant-btn {
        margin-right: 10px;
        color: @primary-color;
        border-color: @primary-color;
      }
    }
    .right {
      float: right;
      margin-top: @content-padding-v/2;
    }
  }
  .plan-table{
    flex-shrink: 1;
    min-height: 0;
    overflow: auto;
    padding: 0 @content-padding-h;
    table {
      table-layout: fixed;
      td,
      th {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .disabled {
        color: @disabled-color;
      }
    }
    /deep/ td.inner-list {
      padding: 0;
      ul {
        margin: 0;
      }
      li {
        padding: 6px 6px;
        border-top: 1px solid @border-color-split;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      li:first-child {
        border: none;
      }
    }
    .opt {
      margin-right: 10px;
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