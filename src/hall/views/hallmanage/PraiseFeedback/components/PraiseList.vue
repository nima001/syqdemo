<template>
  <div class="layout">
    <div class="content-left">
      <org-tree class="org-tree" slot="nav" @select="onOrgSelect" :nodeid="undefined" :treeid="undefined"/>
    </div>
    <div class="content-right">
      <div class="top">
        <div class="top-left">
          <a-button type="primary" @click="praiseModal = true">新增</a-button>
        </div>
        <div class="top-right">
          <a-month-picker :style="{width:'200px',margin:'0px 10px'}" v-model="query.date" @change="dateChange"></a-month-picker>
          <a-input-search placeholder="请输入人员姓名" :style="{width:'200px',marginLeft:'10px'}" enter-button @search="inputSearch" allowClear v-model="query.searchkey"></a-input-search>
        </div>
      </div>
      <div class="middle">
        <a-table rowKey="id" :loading="loading" :columns="columns" :data-source="dataSource" :pagination="false">
          <template slot="operate" slot-scope="text,record">
            <a @click.stop="editor(record)">编辑</a>
            <a :style="{marginLeft:'10px'}" @click.stop="deletePraise(record)">删除</a>
          </template>
        </a-table>
      </div>
      <div class="bottom">
        <a-pagination  show-size-changer :total="pagination.total" :page-size="pagination.pagesize" :default-current="pagination.pagenum"
         :show-total="(total) => `共 ${total} 条`"  @change="onChange" @showSizeChange="onShowSizeChange">
        </a-pagination>
      </div>
    </div>
    <praise-form v-if="praiseModal" :node="node" @finish="callBack" :record="record"></praise-form>
  </div>
</template>
<script>
import {DatePicker,Input,Table,Pagination,Select, Button} from "ant-design-vue";
import { assign, cloneDeep } from "lodash";
import OrgTree from "@/hall/components/OrgTree";
import AccordionLayout from "@/framework/components/AccordionLayout";
import PraiseForm from "./PraiseForm";
import { showError } from "@/framework/utils/index";
import { favorablefeedbacklist,favorablefeedbackdelete } from "@/hall/api/hallmanage";
import moment from "moment";
export default {
  components: {
    AMonthPicker: DatePicker.MonthPicker,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    APagination: Pagination,
    AInputSearch: Input.Search,
    OrgTree,
    AccordionLayout,
    PraiseForm,
    AButton: Button
  },
  data() {
    return {
      praiseModal: false,
      loading: false,
      dataSource: [],
      node: {},
      query: {
        searchkey: undefined,
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
  watch: {
    node: {
      handler() {
        this.getData();
      },
      deep: true
    }
  },
  computed: {
    columns() {
      return [
        {
          title: "组织名称",
          dataIndex: "org"
        },
        {
          title: "人员名称",
          dataIndex: "username"
        },
        {
          title: "好评反馈人",
          dataIndex: "feedbackuser"
        },
        {
          title: "反馈人联系方式",
          dataIndex: "contactway"
        },
        {
          title: "反馈时间",
          dataIndex: "feedbacktime"
        },
        {
          title: "操作",
          dataIndex: "operate",
          scopedSlots: { customRender: "operate" }
        }
      ];
    }
  },
  methods: {
    getData() {
      this.loading = true;
      let query = {
        nodeid: this.node.id,
        searchkey: this.query.searchkey,
        starttime: this.query.date
          ? moment(this.query.date).startOf("month").format("YYYY-MM-DD")
          : undefined,
        endtime: this.query.date
          ? moment(this.query.date).endOf("month").format("YYYY-MM-DD")
          : undefined,
        ...this.pagination,
        //  orders: [{orderby: "starttime","ordertype": "DESC"}], 
      };
      favorablefeedbacklist(query)
        .then(({ result: { pagenum, pagesize, rows = [], total } }) => {
          rows.forEach(item=>{
            item.feedbacktime=item.feedbacktime.slice(0, 11)
          })
          this.dataSource = rows;
          assign(this.pagination, { pagenum, pagesize, total });
        })
        .catch(err => {
          showError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    editor(record){
      this.record = record;
      this.praiseModal = true;
    },
    deletePraise(record) {
      let _this = this;
      this.$confirm({
        title: "提示",
        content: "确定要删除该条值班排班吗？",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          favorablefeedbackdelete(record.id)
          .then(res => {
            _this.$message.success("删除成功！");
            _this.getData();
          })
          .catch(err => {
            showError(err);
          });
        },
      });
    },
    callBack(res) {
      if (res.type == "ok") {
        this.getData();
      }
      this.record = {};
      this.praiseModal = false;
    },
    onOrgSelect(node) {
      this.node = node;
    },
    dateChange() {
      assign(this.pagination, { pagenum:1 });
      this.getData();
    },
    inputSearch() {
      this.getData();
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
  .content-left {
    width: 310px;
    background: @white;
    border-radius: @border-radius-base;
  }
  .content-right {
    flex: 1;
    padding: @content-padding-v @content-padding-h;
    overflow-y: auto;
    min-height: 0px;
    background: @white;
    display: flex;
    flex-direction: column;
    border-radius: @border-radius-base;
    margin-left: @layout-space-base;
    .top {
      display: flex;
      padding: @content-padding-v 0px;
      justify-content: space-between;
    }
    .middle {
      flex-shrink: 1;
      padding: @content-padding-v 0px;
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