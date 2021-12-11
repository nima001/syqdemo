<template>
  <div class="table-list">
    <div class="antd-table-top">
      <a-col class="tabs">
        <span
          :class="[handlestatus == 0 ? 'active' : '']"
          @click="onChangeStatus(0)"
          >未整改</span
        >
        <span
          :class="[handlestatus == 1 ? 'active' : '']"
          @click="onChangeStatus(1)"
          >已整改</span
        >
      </a-col>
    </div>
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
        :showTotal="(total) => `总共：${total}条`"
        @showSizeChange="onShowSizeChange"
        :total="pagination.total"
        :pageSize="pagination.pagesize"
        v-model="pagination.pagenum"
        @change="onPageChange"
      />
    </div>
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
import {
  Row,
  Col,
  Input,
  Table,
  Pagination,
  Button,
  Modal,
  Icon
} from "ant-design-vue";
import DictSelect from "@/framework/components/DictSelect";
import {
  dataqualityPageList,
} from "@/person-shaoxing/api/monitor";
import { showError } from "@/framework/utils/index";
export default {
  name: "TableList",
  props: ["district", "orgid","dataSearchVal"],
  components: {
    ARow: Row,
    ACol: Col,
    AInput: Input,
    ATable: Table,
    AButton: Button,
    APagination: Pagination,
    AModal: Modal,
    AIcon:Icon,
    DictSelect,
  },
  computed: {
    columns: {
      get() {
        return this.initColumn.concat(this.addColumn);
      },
      set() {
        return this.initColumn.concat(this.addColumn);
      },
    },
  },
  watch: {
    district: {
      handler() {
        this.handlestatus = 0;
        this.getData({ pagenum: 1, pagesize: this.pagination.pagesize });
        if(this.district == "330600"){
          this.cityId = "b447363173bf42a0b593aeeef1ed7c14"
        }else if(this.district == "330602"){
          this.cityId = "7a0c55b7f6f040729492941ed780f964"
        }else if(this.district == "330604"){
          this.cityId = "0906f7122848455eb03ab9a45750db7e"
        }else if(this.district == "330603"){
          this.cityId = "ee0f27085675431193e22cfd988f9d0d"
        }else if(this.district == "330681"){
          this.cityId = "c33f4405901d42808efdbeba49305e4d"
        }else if(this.district == "330683"){
          this.cityId = "e05d937b057b42e59469b0503500b28b"
        }else if(this.district == "330624"){
          this.cityId = "4e040be7571f4e299f9e496ce9b79c76"
        }
      },
      immediate: true,
    },
    handlestatus: {
      handler(val) {
        for (let key in this.search) {
          this.search[key] = undefined;
        }
        if (val == 0) {
          this.addColumn = [
            {
              title: "发现时间",
              dataIndex: "createtime",
              customRender: (text) => text && text.substr(0, 10),
              width: "10%",
            },
            {
              title: "状态",
              dataIndex: "noticestatus",
              customRender: (text) => (text == 0 ? "未通知" : "已通知"),
              width: "10%",
            },
            {
              title: "操作",
              width: "10%",
              scopedSlots: { customRender: "detail" },
            },
          ];
        } else {
          this.addColumn = [
            {
              title: "发现时间",
              dataIndex: "createtime",
              customRender: (text) => text && text.substr(0, 10),
              width: "10%",
            },
            {
              title: "整改时间",
              dataIndex: "handletime",
              customRender: (text) => text && text.substr(0, 10),
              width: "10%",
            },
            {
              title: "操作",
              width: "10%",
              scopedSlots: { customRender: "detail" },
            },
          ];
        }
      },
      immediate: true,
    },
    orgid(val) {
        this.getData({ pagenum: 1, pagesize: this.pagination.pagesize });
    },
  },
  data() {
    return {
      initColumn: [
        {
          title: "类别",
          dataIndex: "strategytype",
          customRender: this.dictRender("person.monitor.strategytype"),
          width: "10%",
        },
        {
          title: "相关部门",
          dataIndex: "orgname",
          customRender: (text) => <span title={text}>{text}</span>,
          width: "20%",
        },
        {
          title: "问题或异动情况描述",
          dataIndex: "content",
          customRender: (text) => <span title={text}>{text}</span>,
          width: "40%",
        },
      ],
      addColumn: [
        {
          title: "发现时间",
          dataIndex: "createtime",
          customRender: (text) => text && text.substr(0, 10),
          width: "10%",
        },
        {
          title: "状态",
          dataIndex: "noticestatus",
          customRender: (text) => (text == 0 ? "未通知" : "已通知"),
          width: "10%",
        },
        {
          title: "操作",
          width: "10%",
          scopedSlots: { customRender: "detail" },
        },
      ],
      tableData: [],
      loading: false,
      pagination: {
        total: 0,
        pagenum: 1,
        pagesize: 10,
      },
      handlestatus: 0,
      strategytypeIn: [1, 2, 4],
      taskid: null,
      detailVisible: false,
      detailContent: undefined,
    };
  },
  methods: {
    getData(page) {
      this.loading = true;
      if (this.handlestatus == 1 || this.handlestatus == 0) {
        this.strategytypeIn = [1, 2, 4];
      } else {
        this.strategytypeIn = [3];
      }
      let newHandlestatus = this.handlestatus;
      if (newHandlestatus == 2) {
        newHandlestatus = 0;
      }
      let params = {
        ...page,
        needtotal: true,
        district: this.district,
        checkobj: 1,
        orgid: this.orgid,
        handlestatus: newHandlestatus,
        strategytypeIn: this.strategytypeIn,
      };
      dataqualityPageList(params)
        .then(({ result }) => {
          this.loading = false;
          this.pagination = result;
          this.tableData = result.rows;
        })
        .catch((err) => {
          this.loading = false;
          showError(err);
        });
    },
    dictRender(key, attr) {
      return (text, row, index) => {
        let v = this.$store.getters.dictKey(key || row[attr], text);
        text = (v && v.text) || "";
        return <span title={text}>{text}</span>;
      };
    },
    onChangeStatus(status) {
      this.handlestatus = status;
      if (status == 0 || status == 1) {
        this.strategytypeIn = [1, 2, 4];
      } else {
        this.strategytypeIn = [3];
      }
      this.getData({ pagenum: 1, pagesize: this.pagination.pagesize });
    },
    onPageChange(pagenum, pagesize) {
      this.getData({ pagenum, pagesize });
    },
    onShowSizeChange(pagenum, pagesize) {
      this.getData({ pagenum: 1, pagesize });
    },
    onShowDetail(content) {
      this.detailVisible = true;
      this.detailContent = content;
    },  
  },
};
</script>
<style lang="less" scoped>
.table-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  /deep/ .ant-spin-nested-loading { 
    height: 100%;
  }
  .antd-table-top {
    padding: @content-padding-v @content-padding-h;
    .tabs {
      & > span {
        cursor: pointer;
        padding: 0 10px;
        border-right: 1px solid #c6c6c6;
      }
      & > span.active {
        color: @primary-color;
      }
      :last-child {
        border: 0;
      }
    }
  }
  & > .footer {
    padding: @content-padding-v @content-padding-h;
    .ant-pagination {
      float: right;
      margin-bottom: 10px;
    }
  }
  .stra-table {
    flex-shrink: 1;
    overflow-y: auto;
    min-height: 0;
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