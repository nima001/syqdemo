<template>
  <div class="org-record-add-doc">
    <div class="toolbar">
      <div class="left"></div>
      <div class="right">
        <ul>
          <li>
            <a-input-group compact class="pzwh">
              <a-input type="text" style="width: 80px;" v-model="search.zihao" />
              <a-input
                addonBefore="〔"
                addonAfter="〕"
                type="text"
                style="width: 110px;"
                v-model="search.year"
              />
              <a-input addonAfter="号" type="text" style="width: 90px;" v-model="search.ordinal" />
            </a-input-group>
          </li>
          <li>
            <a-input-group compact>
              <a-date-picker placeholder="发文开始时间" style="width: 132px" v-model="search.starttime" />
              <a-date-picker placeholder="发文结束时间" style="width: 132px" v-model="search.endtime" />
            </a-input-group>
          </li>
          <li>
            <a-input
              v-model="search.searchkey"
              placeholder="请输入文件标题"
              allowClear
              style="width:140px"
            />
          </li>
          <li>
            <a-button type="primary" @click="onSearch">查询</a-button>
          </li>
        </ul>
      </div>
    </div>
    <div class="body">
      <a-table
        :columns="columns"
        :dataSource="page.rows"
        rowKey="id"
        :loading="pageLoading"
        :pagination="false"
        :rowClassName="(record) => selectDoc && selectDoc.id == record.id ? 'selected': ''"
        :customRow="row => ({on:{click: () => {onRowClick(row)}}})"
      ></a-table>
    </div>
    <div class="footer">
      <a-pagination
        v-if="page.rows && page.rows.length"
        showSizeChanger
        :showTotal="total => `总共：${total}条`"
        @showSizeChange="onShowSizeChange"
        :total="page.total"
        :pageSize="page.pagesize"
        v-model="page.pagenum"
        @change="onPageChange"
      />
      <a-button type="primary" @click="ok">确定</a-button>
      <a-button @click="cancel" style="margin-right:10px">取消</a-button>
    </div>
  </div>
</template>
<script>
import {
  Input,
  Button,
  Tooltip,
  Icon,
  DatePicker,
  Table,
  Pagination,
  Modal
} from "ant-design-vue";
import { docQuery, updatedoc } from "@/person/api/document";

export default {
  components: {
    AButton: Button,
    AIcon: Icon,
    ATooltip: Tooltip,
    ATable: Table,
    APagination: Pagination,
    AInput: Input,
    AInputGroup: Input.Group,
    ADatePicker: DatePicker,
    AModal: Modal,
  },
  data() {
    return {
      columns: [
        { title: "发文字号", dataIndex: "num", width: "180px" },
        {
          title: "文件标题",
          dataIndex: "title",
          customRender: text => <span title={text}>{text}</span>
        },
        { title: "发文时间", dataIndex: "dispatchdate", width: "120px" }
      ],
      search: {
        zihao: null,
        year: null,
        ordinal: null,
        type: 4,
        starttime: null,
        endtime: null,
        searchkey: null
      },
      pageLoading: true,
      page: {
        rows: null,
        pagesize: 10,
        pagenum: 1,
        total: 0
      },
      showUpload: false,
      selectDoc: null
    };
  },
  created() {
    this.loadData(this.page);
  },
  methods: {
    onRowClick(row) {
      this.selectDoc = row;
    },
    onSearch() {
      this.loadData({ pagenum: 1, pagesize: this.page.pagesize });
    },
    onPageChange(pagenum, pagesize) {
      this.loadData({ pagenum, pagesize });
    },
    onShowSizeChange(pagenum, pagesize) {
      this.loadData({ pagenum: 1, pagesize });
    },
    cancel(){
      this.$emit("finish");
    },
    ok() {
      if (this.selectDoc) {
        this.$emit("finish", this.selectDoc);
      }else{
        this.$message.info('请选择一个文件');
      }
    },
    loadData(page) {
      let params = {
        ...this.search,
        ...page,
        statusIn: [1], //查询已入库文件
        needtotal: true
      };
      docQuery(params)
        .then(({ result }) => {
          this.pageLoading = false;
          this.page = result;
        })
        .catch(error => {
          showError(error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.org-record-add-doc {
  height: 100%;
  min-width: 1000px;
  display: flex;
  flex-direction: column;
  & > .toolbar {
    white-space: nowrap;
    padding: @content-padding-v @content-padding-h;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    ul {
      margin: 0;
      white-space: nowrap;
    }
    li {
      display: inline-block;
      margin-left: 8px;
      white-space: nowrap;
      .name {
        line-height: 32px;
        padding-right: 5px;
        vertical-align: middle;
      }
      .ant-input-group.ant-input-group-compact,
      .ant-select,
      .ant-btn,
      .ant-input-affix-wrapper {
        display: inline-block;
        vertical-align: middle;
      }
    }
    .pzwh-tooltip {
      font-size: @font-size-base;
      color: @primary-color;
    }
    .pzwh {
      width: auto;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      &:hover {
        border-color: @primary-color;
      }
      &:focus-within {
        border-color: @primary-color;
        box-shadow: 0 0 0 2px fade(@primary-color, 20%);
      }
      /deep/.ant-input {
        border: none;
        height: 30px;
      }
      /deep/.ant-input-group-addon {
        border: none;
        background: none;
        padding: 0 4px;
      }
    }
  }
  & > .body {
    flex: auto;
    min-height: 0;
    overflow: auto;
    padding: 0 @content-padding-h;
    /deep/tr.selected {
      background: @primary-2;
    }
    /deep/.opts > .disable {
      color: @disabled-color;
      cursor: not-allowed;
    }
  }
  & > .footer {
    padding: 12px @content-padding-h;
    border-top: 1px solid @border-color-base;
    .ant-pagination{
      float: left;
    }
    .ant-btn{
      float: right;
    }
  }
}
</style>