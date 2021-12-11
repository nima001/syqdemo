<template>
  <div class="layout">
    <div class="content">
      <div class="top">
        <a-month-picker :style="{width:'200px'}" v-model="query.date" allowClear @change="dateChange"></a-month-picker>
      </div>
      <div class="middle">
        <a-table rowKey="nodeid" :loading="loading" :customRow="customRow" :columns="columns" :data-source="dataSource" :pagination="false"></a-table>
      </div>
      <div class="bottom">
        <a-pagination show-size-changer :total="pagination.total" :page-size="pagination.pagesize"
          v-model="pagination.pagenum" :show-total="(total) => `共 ${total} 条`" @change="onChange" @showSizeChange="onShowSizeChange">
        </a-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { DatePicker, Input, Table, Pagination, Select } from "ant-design-vue";
import { assign, cloneDeep } from "lodash";
import { showError } from "@/framework/utils/index";
import {orgsumError} from "@/hall/api/attendance";
import moment from "moment";
export default {
  components: {
    ADatePicker: DatePicker,
    AMonthPicker:DatePicker.MonthPicker,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    APagination: Pagination,
    AInputSearch: Input.Search
  },
  data() {
    return {
      loading: true,
      dataSource: [],
      query: {
        date: moment(new Date().toLocaleDateString()).format('YYYY-MM')
      },
      pagination: {
        pagesize: 10,
        pagenum: 1,
        total: 0,
        needtotal: true
      }
    };
  },
  computed: {
    columns() {
      return [
        {
          title: "组织名称",
          dataIndex: "orgname"
        },
        {
          title: "组织人数",
          dataIndex: "usernum"
        },
        {
          title: "考勤异常次数",
          dataIndex: "abnormalnum"
        }
      ];
    }
  },
  mounted(){
    this.getData()
  },
  methods: {
    getData(){
      this.loading = true;
      let query = {
        nodeid:null,
        starttime:this.query.date ? moment(this.query.date).startOf('month').format("YYYY-MM-DD") : undefined,
        endtime: this.query.date ?moment(this.query.date).endOf('month').format("YYYY-MM-DD") :undefined,
        ...this.pagination
      }
      orgsumError(query).then(res=>{
        let {pagenum,pagesize,total,rows} = res.result;
        assign(this.pagination,{pagenum,pagesize,total});
        this.dataSource = rows;
      }).catch(err=>{
        showError(err)
      }).finally(()=>{
        this.loading = false;
      })
    },
    customRow(row, index) {
      return {
        on: {
          click: () => {
            this.$emit('finish',{cmpt:'PersonList',nodeid:row.nodeid})
          }
        }
      };
    },
    dateChange() {
      this.getData()
    },
    onChange(pagenum, pagesize) {
      assign(this.pagination, { pagesize, pagenum });
      this.getData();
    },
    onShowSizeChange(current, pagesize) {
      assign(this.pagination, { pagenum: 1, pagesize });
      this.getData();
    }
  }
};
</script>
<style lang='less' scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    padding: @content-padding-v 0px;
    overflow-y: auto;
    min-height: 0px;
    background: @white;
    display: flex;
    flex-direction: column;
    border-radius: @border-radius-base;
    .top {
      display: flex;
      padding: @content-padding-v @content-padding-h;
      justify-content: flex-end;
    }
    .middle {
      flex-shrink: 1;
      padding: @content-padding-v @content-padding-h;
      overflow-y: auto;
      /deep/ tr {
        cursor: pointer;
      }
    }
    .bottom {
      text-align: right;
      padding: @content-padding-v 0px;
    }
  }
}
</style>