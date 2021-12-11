<template>
  <a-layout>
    <div class="chat-list">
        <div class="left">
          <div class="header">
            <a-input v-model="searchkey" placeholder="报表名称" allowClear @change="doSeachBook"/>
          </div>
          <div class="body">
            <a-spin :spinning="!bookSorts" style="width:100%;">
              <empty-data v-if="bookSorts && !bookSorts.length" style="height: 200px"/>
              <a-collapse v-else-if="bookSorts && bookSorts.length" 
                v-model="activeKey" :bordered="false" expandIconPosition="right"
              >
                <a-collapse-panel v-for="item in bookSorts" :key="item.key" :header="item.text">
                  <ul class="book-list">
                    <li v-for="book in item.children" :key="book.id" 
                      @click="selectBook(book)"
                      :class="{selected: selectedBook && book.id == selectedBook.id}"
                    >{{book.name}}</li>
                  </ul>
                </a-collapse-panel>
              </a-collapse>
            </a-spin>
          </div>
        </div>
        <div class="right">
           <div class="header">
              <dict-select v-if="year"
                v-model="year" 
                :dict="years"
                :allowClear="false" 
                placeholder="年份" 
                @change="selectedBook(selectedBook)"
                style="width: 100px;float:right;"
              />
            </div>
          <div class="body">
            <template v-if="selectedBook">
              <a-spin :spinning="loading" style="width:100%">
                <empty-data v-if="history && !history.length" style="height: 200px"/>
                <BookList :list="history">
                  <template #title="item">
                    <span>{{formatTitle(item)}}</span>
                  </template>
                </BookList>
              </a-spin>
            </template>
          </div>
        </div>
      </div>
  </a-layout>
</template>
<script>
import { Layout, Modal, Spin, Input, Select, Collapse, Button, Pagination, Icon } from "ant-design-vue";
import EmptyData from "@/framework/components/EmptyData";
import DictSelect from '@/framework/components/DictSelect'
import BookList from './components/BookList'

import moment from "moment";
import { numberToChinese, showError } from "@/framework/utils/index";
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
    ACollapse: Collapse,
    ACollapsePanel: Collapse.Panel,
    AButton: Button,
    APagination: Pagination,
    EmptyData,
    DictSelect,
    BookList
  },
  data() {
    return {
      loading: false,
      searchkey: undefined,
      year: undefined,
      activeKey: undefined,
      bookList: undefined,
      selectedBook: undefined,
      history: undefined,
      searchTimer: 0,
    };
  },
  computed: {
    years(){
      let y = moment().get('year'), years = [];
      for(; y >= 1990; y--){
        years.push({ text: y + '年', value: y});
      }
      return years;
    },
    bookSorts(){
      let ns = this.$store.getters.dict('report.booknamespace');
      if(this.bookList && ns){
        let arr = [];
        ns.forEach(item => {
          if(item.value.startsWith('report.')){
            let children = this.bookList.filter(b => b.namespace == item.value);
            if(children.length){
              arr.push({ ...item, children });
            }
          }
        });
        this.activeKey = arr.map(item => item.key);
        return arr;
      }
    }
  },
  created() {
    this.loadBook();
  },
  methods: {
    doSeachBook(){
      let key = this.searchkey;
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(() => {
        this.loadBook(key);
      }, 500);
    },
    loadBook(searchkey){
      //左侧显示的统计表
      listReportDisplay({
        namespace: "report.",
        searchkey,
        history: false,
        pagesize: 100
      }).then(({result}) => {
        this.bookList = result.rows || [];
        if(!this.selectedBook && this.bookList.length){
          this.selectBook(this.bookList[0]);
        }
      }).catch(error => {
        showError(error);
      });
    },
    selectBook(book) {
      this.selectedBook = book;
      if(book.archive == 'year'){//按年不显示年份选中
        this.year = undefined;
      }else{
        this.year = moment().get('year');
      }
      this.loadHistory(book);
    },
    loadHistory(book) {
      this.loading = true;
      let starttime, endtime;
      if(this.year){
        starttime = moment(this.year, 'YYYY');
        endtime = moment(this.year+1, 'YYYY');
      }
      listReportDisplay({
        originid: book.id,
        history: true,
        starttime, endtime,
        pagesize: 1000,
      }).then(({result}) => {
        if(!this.year || this.year == moment().get('year')){//当年，显示当前时刻的报表
          this.history = [book, ...(result.rows || [])];
        }else{
          this.history = result.rows || [];
        }
      }).catch(error => {
        showError(error);
      }).finally(() => {
        this.loading = false;
      });
    },
    formatTitle(item){
      let { history, archive, publishdate } = item;
      if(history){
        let date = publishdate && moment(publishdate, 'YYYY-MM-DD HH:mm:ss');
        if(date){
          if(archive == 'year'){
            return date.format("YYYY年");
          }else if(archive == 'quarter'){
            return date.format("YYYY年 ") + `${numberToChinese(date.quarter())}季度`;
          }else if(archive == 'month'){
            return date.format("YYYY年MM月");
          }else{
            return date.format("YYYY年MM月dd日");
          }
        }
      }else{
        return moment().format("YYYY年MM月dd日（实时）")
      }
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
  display: flex;
  background: @white;
  border-radius: @border-radius-base;
  background: white;
  & > .left{
    width: 300px;
    height: 100%;
    flex: none;
    border-right: 1px solid @border-color-split;
    display: flex;
    flex-direction: column;
    & > .header{
      flex: none;
      margin-top: 10px;
      padding: @content-padding-v @content-padding-h;
    }
    & > .body{
      flex: auto;
      min-height: 1px;
      overflow: auto;
    }
    /deep/.ant-collapse {
      background-color: unset;
      .ant-collapse-item:last-child{
        border-bottom: none;
      }
      .ant-collapse-header{
        background-color: #fafafa;
        padding: 6px 16px;
        font-weight: bold;
      }
      .ant-collapse-content > .ant-collapse-content-box{
        padding: 0;
      }
    }
    .book-list{
      margin-bottom: 4px;
      li{
        padding: 4px 16px;
        padding-left: 32px;
        line-height: 30px;
        &:hover{
          background-color: @primary-1;
        }
        &.selected{
          background-color: @primary-2;
        }
      }
    }
  }
  & > .right{
    flex: auto;
    display: flex;
    flex-direction: column;
    & > .header{
      flex: none;
      height: 50px;
      padding: @content-padding-v @content-padding-h;
      margin-top: 10px;
      border-bottom: 1px solid @border-color-split;
      overflow: hidden;
    }
    & > .body{
      flex: auto;
      min-height: 1px;
      padding: @content-padding-v @content-padding-h;
      overflow: auto;
    }
  }
}
</style>