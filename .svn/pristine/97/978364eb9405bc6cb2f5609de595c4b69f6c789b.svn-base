<template>
  <div class="layout">
    <div class="content">
      <div class="top">
        <div class="left">
          <div class="cell">
            <span class="title">加班合计:</span>
            <span class="days">{{duration}}</span>
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
        ></a-table>
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
import { DatePicker, Input, Table, Pagination, Select } from "ant-design-vue";
import { assign, cloneDeep } from "lodash";
import { showError } from "@/framework/utils/index";
import { workByuserid} from "@/hall/api/workovertime";
import moment from "moment";
export default {
  data() {
    return {
      duration: 0,
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
          title: "加班日期",
          dataIndex: "dutydate"
        },
        {
          title: "星期",
          dataIndex: "weekday"
        },
        {
          title: "开始时间",
          dataIndex: "starttime"
        },
        {
          title: "结束时间",
          dataIndex: "endtime"
        },
        {
          title: "加班时长",
          dataIndex: "duration"
        }
      ];
    }
  },
  components: {
    ASelect: Select,
    ASelectOption: Select.Option,
    AMonthPicker: DatePicker.MonthPicker,
    ATable: Table,
    APagination: Pagination
  },
  mounted(){
    this.getData();
  },
  methods: {
    dateChange(){
      this.getData();
    },
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
      workByuserid(query)
        .then(({result:{ pagesize, pagenum, total, rows=[]}}) => {
          assign(this.pagination, { pagesize, pagenum, total });
          let duration=0
          rows.forEach((item,index) => {
            item.starttime=item.starttime.slice(11, 17)
            item.endtime=item.endtime.slice(11, 17)
            item.id=index
            duration+=item.duration
          });
          this.duration=duration
          this.dataSource = rows;
        })
        .catch(err => {
          showError(err);
        })
        .finally(() => {
          this.loading = false;
        });
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
        width: 250px;
        .ant-select {
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