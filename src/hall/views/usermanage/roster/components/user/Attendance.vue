<template>
  <div class="layout">
    <div class="content">
      <div class="top">
        <div class="left">
          <div class="cell">
            <span class="title">考勤异常次数：</span>
            <span class="days">{{pagination.total}}次</span>
          </div>
        </div>
        <div class="right">
          <a-month-picker
            v-model="query.date"
            allowClear
            @change="dateChange"
          ></a-month-picker>
        </div>
      </div>
      <div class="middle">
        <a-table
          rowKey="id"
          :loading="loading"
          :columns="columns"
          :data-source="dataSource"
          :pagination="false"
        >
          <template slot="morning" slot-scope="text,record">
            <span class="state">{{record.morning | toStr}}</span>
            <a-icon type="tool" v-if="record.morning != 3" />
          </template>
          <template slot="night" slot-scope="text,record">
            <span class="state">{{record.night | toStr}}</span>
            <a-icon type="tool" v-if="record.night != 3" />
          </template>
        </a-table>
      </div>
      <div class="bottom">
        <a-pagination
          show-size-changer
          :total="pagination.total"
          :page-size="pagination.pagesize"
          :default-current="pagination.pagenum"
          :show-total="(total) => `共 ${total} 条`"
          @change="onChange"
          @showSizeChange="onShowSizeChange"
        ></a-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { DatePicker, Table, Pagination, Icon } from "ant-design-vue";
import { assign, cloneDeep } from "lodash";
import { showError } from "@/framework/utils/index";
import {attendanceList} from "@/hall/api/attendance";
import moment from "moment";
export default {
  data() {
    return {
      loading: false,
      dataSource: [],
      query: {
        type: 1,
        date: undefined
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
          title: "日期",
          dataIndex: "checkdate",
          customRender: (text, record, index) =>moment(text).format("YYYY-MM-DD")
        },
        {
          title: "上班打卡",
          dataIndex: "morningtime",
          scopedSlots: { customRender: "morningtime" }
        },
        {
          title: "状态",
          dataIndex: "morning",
          scopedSlots: { customRender: "morning" }
        },
        {
          title: "下班打卡",
          dataIndex: "nighttime",
          scopedSlots: { customRender: "nighttime" }
        },
        {
          title: "状态",
          dataIndex: "night",
          scopedSlots: { customRender: "night" }
        }
      ];
    }
  },
  components: {
    ATable: Table,
    ADatePicker: DatePicker,
    AMonthPicker: DatePicker.MonthPicker,
    APagination: Pagination,
    AIcon:Icon,
  },
  filters:{
    toStr(v){
      let str = undefined;
      switch (v){
        case 0 :str = '未打卡';break;
        case 1 :str = '迟到';break;
        case 2 :str ='早退';break;
        case 3 :str ='正常';break;
        default:;break;
      }
      return str;
    }
  },
  mounted(){
    this.getData();
  },
  methods: {
    moment:moment,
    getData() {
      this.loading = true;
      let query = {
        userid: this.$route.query.userid,
        starttime: this.query.date
          ? moment(this.query.date).startOf("month").format("YYYY-MM-DD")
          : undefined,
        endtime: this.query.date
          ? moment(this.query.date).endOf("month").format("YYYY-MM-DD")
          : undefined,
        ...this.pagination
      };
      attendanceList(query)
        .then(res => {
          let { pagesize, pagenum, total, rows } = res.result;
          assign(this.pagination, { pagesize, pagenum, total });
          this.dataSource = rows;
        })
        .catch(err => {
          showError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    dateChange(){
      this.getData();
    },
    dictRender(key, attr) {
      return (text, row, index) => {
        let v = this.$store.getters.dictKey(key || row[attr], text);
        text = (v && v.text) || "";
        return <span title={text}>{text}</span>;
      };
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
    padding: @content-padding-v @content-padding-h;
    margin-top: @layout-space-base;
    overflow-y: auto;
    min-height: 0px;
    background: @white;
    display: flex;
    flex-direction: column;
    border-radius: @border-radius-base;
    .top {
      display: flex;
      justify-content: space-between;
      padding: @content-padding-v 0px;
      .left {
        display: flex;
        justify-content: space-between;
        .cell {
          display: flex;
          align-items: center;
          &:last-child {
            margin-left: @padding-lg;
          }
          .title {
            font-size: 15px;
            color: #666;
          }
          .days {
            color: @primary-color;
            margin-left: @padding-md;
          }
        }
      }
      .right {
        .ant-calendar-picker {
          width: 100%;
        }
      }
    }
    .middle {
      flex-shrink: 1;
      padding: @content-padding-v 0px;
      overflow-y: auto;
    }
    .bottom {
      text-align: right;
      padding: @content-padding-v 0px;
    }
  }
}
</style>