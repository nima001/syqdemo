<template>
  <a-modal :visible="true" :footer="null" width="998px" @cancel="cancel">
    <p class="title">{{user.username}}的考勤记录</p>
    <div class="content">
      <div class="table">
        <a-table rowKey="id" :loading="loading" :columns="columns" :data-source="dataSource" :pagination="false" >
          <template slot="morningtime" slot-scope="record">
            {{record? moment(record).format("HH:mm:ss"):'---'}}
          </template>
          <template slot="morning" slot-scope="text,record">
            <span class="state">{{record.morning | toStr}}</span>
          </template>
          <template slot="nighttime" slot-scope="record">
            {{record? moment(record).format("HH:mm:ss"):'---'}}
          </template>
          <template slot="night" slot-scope="text,record">
            <span class="state">{{record.night | toStr}}</span>
          </template>
        </a-table>
      </div>
      <div class="pagination">
        <a-pagination show-size-changer :total="pagination.total" :page-size="pagination.pagesize"
          v-model="pagination.pagenum" :show-total="(total) => `共 ${total} 条`" @change="onChange"
          @showSizeChange="onShowSizeChange">
        </a-pagination>
      </div>
    </div>
  </a-modal>
</template>
<script>
import { Modal, Table, Pagination } from "ant-design-vue";
import { assign, cloneDeep } from "lodash";
import { showError } from "@/framework/utils/index";
import { attendanceList } from "@/hall/api/attendance";
import moment from "moment";
export default {
  components: {
    AModal: Modal,
    ATable: Table,
    APagination: Pagination
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    formatDate: {
      required: false
    }
  },
  data() {
    return {
      loading: true,
      dataSource: [],
      columns: [
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
      ],
      pagination: {
        pagesize: 10,
        pagenum: 1,
        total: 0,
        needtotal: true
      }
    };
  },
  filters: {
    toStr(v) {
      let str = undefined;
      switch (v) {
        case 0: str = "未打卡"; break;
        case 1: str = "迟到"; break;
        case 2: str = "早退"; break;
        case 3: str = "正常"; break;
        default: break;
      }
      return str;
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    moment,
    getData() {
      this.loading = true;
      let query = {
        userid: this.user.userid,
        starttime:this.formatDate ? moment(this.formatDate).startOf('month').format("YYYY-MM-DD") :undefined ,
        endtime:this.formatDate? moment(this.formatDate).endOf('month').format("YYYY-MM-DD") :undefined,
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
    cancel() {
      this.$emit("input", false);
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
.title {
  font-size: 18px;
  color: @black;
  font-weight: bold;
  text-align: center;
  margin: 0px;
  padding: @content-padding-v 0px;
}
.content {
  max-height: 600px;
  display: flex;
  flex-direction: column;
  .table {
    flex-shrink: 1;
    overflow-y: auto;
    padding: @content-padding-v 0px;
  }
  .pagination {
    text-align: right;
    padding: @content-padding-v 0px;
  }
}
</style>