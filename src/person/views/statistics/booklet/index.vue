<template>
  <a-layout>
    <div class="chat-list">
      <div class="header">
        <div class="left">
          <!-- <a-icon :type="displayType" class="switch-display" 
            @click="displayType = displayType == 'bars' ? 'appstore' : 'bars'"
          /> -->
        </div>
        <ul class="right">
          <li>
            <a-select v-model="search.onepage" allowClear placeholder="报表类型">
              <a-select-option :value="0">统计册</a-select-option>
              <a-select-option :value="1">统计表</a-select-option>
            </a-select>
          </li>
          <li>
            <a-input v-model="search.searchkey" placeholder="报表名称" allowClear/>
          </li>
          <li>
            <a-month-picker v-model="search.date" 
              :allowClear="false" 
              placeholder="请选择日期" 
              :disabledDate="disabledDate"
              @change="onSearch"
            />
          </li>
          <li>
            <a-button type="primary" @click="onSearch">查询</a-button>
          </li>
        </ul>
      </div>
      <div class="body">
        <a-spin :spinning="search.loading" class="spin">
          <empty-data v-if="!page.total && !search.loading" style="height: 200px"/>
          <BookList v-else :list="page.rows" />
        </a-spin>
      </div>
      <div class="footer" v-if="page.rows && page.rows.length">
        <a-pagination
          v-model="page.pagenum"
          showSizeChanger
          :showTotal="total => `总共：${total}条`"
          @showSizeChange="onShowSizeChange"
          :total="page.total"
          @change="onPageChange"
        />
      </div>
    </div>
  </a-layout>
</template>
<script>
import { Layout, Modal, Spin, Input, Select, DatePicker, Button, Pagination, Icon } from "ant-design-vue";
import EmptyData from "@/framework/components/EmptyData";
import BookList from './components/BookList'
import moment from "moment";
import { showError } from "@/framework/utils/index";
import { listReportDisplay } from "@/person/api/booklet";

export default {
  name: 'BookDisplay',
  components: {
    ALayout: Layout,
    ASpin: Spin,
    AIcon: Icon,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    AMonthPicker: DatePicker.MonthPicker,
    AButton: Button,
    APagination: Pagination,
    EmptyData,
    BookList
  },
  data() {
    return {
      displayType: "appstore",
      search: {
        loading: false,
        searchkey: undefined,
        date: moment(),
        onepage: undefined
      },
      page: {
        rows: [],
        pagesize: 10,
        pagenum: 1,
        total: 0
      },
    };
  },
  created() {
    this.loadData(1, this.page.pagesize);
  },
  methods: {
    onPageChange(page, pagesize) {
      this.loadData(page, pagesize);
    },
    onShowSizeChange(current, size) {
      this.loadData(1, size);
    },
    onSearch() {
      this.loadData(1, this.page.pagesize);
    },
    loadData(pagenum, pagesize) {
      this.search.loading = true;
      let { onepage, date, searchkey } = this.search;
      let mouth = date.format('YYYY-MM');
      let history = mouth != moment().format('YYYY-MM');
      let starttime,endtime;
      if(history){
        starttime = moment(mouth, 'YYYY-MM');
        endtime = moment(starttime).add(1, 'M');
      }
      listReportDisplay({
        namespace: "report",
        searchkey,
        history,
        onepage,
        starttime,
        endtime,
        needtotal: true,
        pagenum,
        pagesize
      }).then(({result}) => {
        this.page = result;
      }).catch(error => {
        showError(error);
      }).finally(() => {
        this.search.loading = false;
      });
    },
    disabledDate(current) {//禁用部分日期
      return current && current > moment().endOf("day");
    },
  }
};
</script>
<style lang="less" scoped>
.ant-layout {
  padding: @layout-space-base;
  height: 100%;
}
.chat-list {
  height: 100%;
  flex-direction: column;
  display: flex;
  background: @white;
  border-radius: @border-radius-base;
  & > .header {
    padding: @content-padding-v @content-padding-h;
    margin-top: 10px;
    border-bottom: 1px solid @border-color-split;
    .left {
      cursor: pointer;
      float: left;
      .switch-display{
        font-size: 25px;
        color: @primary-color;
      }
    }
    .right {
      float: right;
      li{
        display: inline-block;
        margin-left: 5px;
        .ant-select{
          width: 120px;
        }
      }
    }
  }
  & > .body {
    background: white;
    width: 100%;
    flex: 0 1 auto;
    overflow: auto;
    padding: 10px @content-padding-h;
  }
  & > .footer {
    border-top: 1px solid @border-color-split;
    padding: @content-padding-v 0;
    margin: 0 @content-padding-h;
    .ant-pagination {
      float: right;
      margin-bottom: 10px;
    }
  }
}

</style>