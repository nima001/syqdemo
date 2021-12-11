<template>
  <div class="form-panel">
    <div class="top">
      <div class="top-tab">
        <div :class="['tab-item', {active: isActive(item)}]" v-for="item in tabData" :key="item.id" @click="change(item)">{{item.text}}</div>
      </div>
      <div class="card" v-for="(item, index) in list" :key="index">
        <Card :src="src[index]" :title="item['title']" :num="item['num']" :key="index"></Card>
      </div>
    </div>
    <div class="bottom">
      <div class="title">
        <span>周转编制列表</span>
        <span>
          <a class="icon" @click="showModal">
            <img src="../../../assets/img/icon_more.png" alt=""/>
          </a>
        </span>
      </div>
      <div class="bottom_table">
        <a-table
          rowKey='id'
          :loading='loading'
          :columns="columns"
          :dataSource="dataSource"
          :pagination="false"
          >
          <template slot="outquatacount" slot-scope="text,record">
            <span class="outquatacount" v-if="record.outquatacount>0">{{text}}</span>
            <span v-if="record.status===1" class="status will">预</span>
            <span v-else-if="record.status===2" class="status expire">超</span>
          </template>
        </a-table>
      </div>
      <a-modal
        title="周转编制列表"
        :width="1200"
        :destroyOnClose="true"
        :bodyStyle="{height: '520px'}"
        :visible="visible"
        @cancel="onCancel"
        @ok="onOk">
          <a-table
            rowKey='id'
            :loading='spinning'
            :columns="columns"
            :dataSource="modalData"
            :scroll="{y: 450}"
            :pagination="false"
            >
            <template slot="outquatacount" slot-scope="text,record">
              <span class="outquatacount" v-if="record.outquatacount>0">{{text}}</span>
              <span v-if="record.status===1" class="status will">预</span>
              <span v-else-if="record.status===2" class="status expire">超</span>
            </template>
          </a-table>
          <template slot="footer">
            <div class="pagination">
              <a-pagination
                v-if="modalData.length"
                showSizeChanger
                v-model="pagination.pagenum"
                :total="pagination.total"
                :pageSize="pagination.pagesize"
                :showTotal="(total)=>`总共${total}条`"
                @change="onPageChange"
                @showSizeChange="onShowSizeChange"
              />
            </div>
          </template>
      </a-modal>
    </div>
  </div>
</template>
<script>
import { Table, Modal, Pagination, Result } from "ant-design-vue";
import Card from '@/person-shaoxing/views/orgStaffReport/components/Card'
import { assign, map } from 'lodash';
import { turnoverStaff, areaStatistics } from '@/person-shaoxing/api/orgStaffReport'
import { showError } from '@framework/utils'
import { dateFormat } from '../../../../framework/utils';

/**
 * 周转编制数监测
 */
export default {
  components: {
    ATable: Table,
    AModal: Modal,
    APagination: Pagination,
    Card
  },
  props: {
    district: {
      type: Object,
    }
  },
  data(){
    return {
      active: undefined,
      data: undefined,
      list: [
        { id: 0, title: "周转编制池", num: 0 },
        { id: 1, title: "已使用周转编制", num: 0 },
        { id: 2, title: "剩余周转编制", num: 0 },
        { id: 3, title: "本年度将回收周转编制", num: 0 },
      ],
      src:["icon_report_blue", "icon_report_hourgalass", "icon_report_smile", "icon_report_info"],
      columns: [
        { title: '', dataIndex: 'outquatacount', key: 'outquatacount', width: '5%', scopedSlots: { customRender: 'outquatacount' } },
        { title: '单位', dataIndex: 'orgname', key: 'orgname', width: '20%' },
        { title: '主管部门', dataIndex: 'suporg', key: 'suporg', width: '20%' },
        { title: '开始时间', dataIndex: 'startdate', key: 'startdate', width: '20%' },
        { title: '回收时间', dataIndex: 'recoverydate', key: 'recoverydate', width: '20%' },
        { title: '周转编制数', dataIndex: 'count', key: 'count', align: 'center', width: '20%' },
      ],
      paramArr: [],
      loading: false,
      spinning: false,
      visible: false,
      dataSource: [],
      modalData: [],
      pagination: {
        pagesize: 10,
        pagenum: 1,
        total: 0,
        needtotal: true,
      }
    }
  },
  computed: {
    tabData() {
      let data = [{id: 1, text: '行政', unittypes: [1,5,7]}, {id: 2, text: '事业', unittypes: [2,3,11]}];
      return data;
    }
  },
  watch: {
    district(val) {
      this.loadData();
      return val;
    },
    active(val) {
      if(val) {
        if(val.id===1) {
          this.paramArr = ['xzzzbzc', 'xzysyzzbz', 'xzbndjjhsbz'];
        }else if(val.id===2) {
          this.paramArr = ['syzzbzc', 'syysyzzbz', 'sybndjjhsbz'];
        }
        this.loadData();
      }
      return val;
    }
  },
  created() {
    this.active = this.tabData[0];
  },
  methods: {
    onOk() {
      this.visible = true;
    },
    onCancel() {
      this.visible = false;
      this.modalData = [];
    },
    showModal() {
      this.visible = true;
      this.spinning = true;
      this.pagination.pagenum = 1;
      this.pagination.pagesize = 10;
      this.turnOverStaff(this.pagination);
    },
    change(val) {
      this.active = val;
    },
    isActive(val) {
      if(val.id===this.active.id) {
        return true;
      }
      return false;
    },
    onPageChange(pagenum, pagesize) {
      this.spinning = true;
      assign(this.pagination, {pagenum,pagesize});
      this.turnOverStaff(this.pagination);
    },
    onShowSizeChange(pagenum, pagesize) {
      this.spinning = true;
      assign(this.pagination, {pagenum: 1, pagesize});
      this.turnOverStaff(this.pagination);
    },
    loadData() {
      this.pagination.district = this.district.district;
      this.pagination.unittypes = this.active.unittypes;
      this.loading = true;
      this.turnOverStaff({pagenum: 1, pagesize: 10, district: this.pagination.district, unittypes: this.pagination.unittypes, needtotal: false});
      this.area();
    },
    area() {
      areaStatistics(this.district.district, this.paramArr).then(({result})=>{
        this.list[0].num = result[this.paramArr[0]]||0;
        this.list[1].num = result[this.paramArr[1]]||0;
        this.list[2].num = this.list[0].num - this.list[1].num;
        this.list[3].num = result[this.paramArr[2]]||0;
      }).catch((err)=>{
        showError(err);
      })
    },
    turnOverStaff(data) {
      turnoverStaff(data).then(({result})=>{
        if(data.needtotal) {
          this.modalData = result.rows;
          this.pagination.total = result.total;
        }else{
          map(result.rows, (item)=> {
            if(item.recoverydate) {
              item.recoverydate = dateFormat(new Date(item.recoverydate), 'yy-mm-dd');
            }
            if(item.startdate) {
              item.startdate = dateFormat(new Date(item.startdate), 'yy-mm-dd');
            }
          });
          this.dataSource = result.rows;
        }
      }).catch((err)=>{
        showError(err);
      }).finally(()=>{
        if(this.spinning) {
          this.spinning = false;
        }else if(this.loading) {
          this.loading = false;
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.form-panel{
  .top{
    display: flex;
    padding: 15px 186px 24px 0;
    justify-content: space-between;
    .top-tab {
      width: 186px;
      padding: 0 36px;
      .tab-item {
        padding: @padding-xs @padding-lg;
        border-radius: @border-radius-base;
        margin-bottom: 10px;
        text-align: center;
        border: 1px solid #e8e8e8;
        cursor: pointer;
        user-select: none;
        transition: all .3s;
        &.active {
          color: @primary-color;
          background-color: @primary-1;
        }
      }
    }
    .card{
      // &:nth-child(1){
      //   margin
      // }
    }
  }
  .bottom{
    padding: 24px 0 10px 0;
    .title{
      font-weight: bold;
      line-height: 30px;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
    }
    .bottom_table{
      /deep/.ant-table-tbody {
        tr td:first-child {
          span.status {
            display: inline-block;
            width: 1.4em;
            margin-left: 4px;
            border-radius: @border-radius-base;
            line-height: 1.4em;
            font-size: 0.8em;
            text-align: center;
            color: white;
            &.will {
              background-color: @accent-color;
            }
            &.expire {
              background-color: @error-color;
            }
          }
          span.outquatacount {
            display: inline-block;
            padding: 0 .4em;
            margin-left: 4px;
            border-radius: @border-radius-base;
            line-height: 1.41em;
            font-size: 0.8em;
            text-align: center;
            color: white;
            background-color: #197DF5;
          } 
        }
      }
    }
  }
}
/deep/.ant-modal-body {
  .ant-table-tbody {
    tr td:first-child {
      span.status {
        display: inline-block;
        width: 1.4em;
        margin-left: 4px;
        border-radius: @border-radius-base;
        line-height: 1.4em;
        font-size: 0.8em;
        text-align: center;
        color: white;
        &.will {
          background-color: @accent-color;
        }
        &.expire {
          background-color: @error-color;
        }
      }
      span.outquatacount {
        display: inline-block;
        padding: 0 .4em;
        margin-left: 4px;
        border-radius: @border-radius-base;
        line-height: 1.41em;
        font-size: 0.8em;
        text-align: center;
        color: white;
        background-color: #197DF5;
      } 
    }
  }
}
/deep/.ant-modal-footer {
  border-top: 0;
  .pagination ul li.ant-pagination-options ul li {
    text-align: center;
  }
}
</style>