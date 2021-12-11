<template>
  <a-layout>
    <div class="message">
      <div class="toolbar">
        <div class="left">
          <a-input-search allowClear placeholder="输入消息名称查询" v-model="searchkey" @search="onSearch" />
        </div>
        <div class="right">
          <a-radio-group v-model="type" @change="onChange">
            <a-radio :value="0">全部</a-radio>
            <a-radio :value="1">已读</a-radio>
            <a-radio :value="2">未读</a-radio>
            <a-radio :value="3">待办</a-radio>
            <a-radio :value="4">已办</a-radio>
          </a-radio-group>
          <span class="page">
            <a-icon type="left" :class="{pre: true, disabled: page.pagenum == 1}" @click="prePage"/>
            <span class="page-desc">{{page.pagenum}}/{{pageTotal}}</span>
            <a-icon type="right" :class="{next: true, disabled: page.pagenum == pageTotal}" @click="nextPage"/>
          </span>
        </div>
      </div>
      <div v-if="page.rows && page.rows.length" class="body">
        <ul>
          <a-dropdown :trigger="['contextmenu']" v-for="(item,index) in page.rows" :key="index">
            <li :class="{ unread: item.isread == 0, top: !!item.istop }" 
              @click="read(item)"
            >
              <div><span class="read-tag"></span></div>
              <div class="content">
                <span class="desc">{{item.oatitle ? `【${item.oatitle}】${item.content}` : item.content }}</span>
              </div>
              <div class="handle" v-if="item.msgtype==2 && item.ishandle == 0">
                <span class="handle-tag">待办</span>
              </div>
              <div class="holder"></div>
              <div class="right">
                <a-icon class="top-tag" type="vertical-align-top"/>
                <span class="sendtime">{{dateFormat(item.sendtime)}}</span>
                <a class="delete" @click="del(item)">删除</a>
              </div>
            </li>
            <a-menu slot="overlay">
              <a-menu-item @click="markRead(item)">{{item.isread==0?'标记已读':'标记未读'}}</a-menu-item>
              <a-menu-item @click="setTop(item)">{{item.istop==0?'标记置顶':'取消置顶'}}</a-menu-item>
            </a-menu>
          </a-dropdown>
        </ul>
      </div>
      <div v-else style="height: 200px">
        <empty-data/>
      </div>
      <div class="footer">
        <a-pagination
          v-if="page.total>0"
          showSizeChanger
          :showTotal="total => `总共：${total}条`"
          @showSizeChange="onShowSizeChange"
          :total="page.total"
          :pageSize="page.pagesize"
          v-model="page.pagenum"
          @change="onPageChange"
        />
      </div>
    </div>
  </a-layout>
</template>
<script>
import { Layout, Input, Pagination, Icon, Menu, Dropdown, Radio } from "ant-design-vue";
import EmptyData from "@/framework/components/EmptyData";
import { msglist, msgreadMark, msgtopMark, msgdelmsg } from "@/framework/api/message";
import { showError, dateFormat} from "@/framework/utils/index"; 

export default {
  components: {
    ALayout: Layout,
    AInputSearch: Input.Search,
    APagination: Pagination,
    AIcon: Icon,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ADropdown: Dropdown,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    EmptyData
  },
  data() {
    return {
      searchkey: undefined,
      type: 0,
      page:{
        rows: null,
        pagesize: 20,
        pagenum: 1,
        total: 0
      }
    };
  },
  computed: {
    pageTotal(){
      let {pagesize, total} = this.page;
      if(total > 0){
        return Math.ceil(total/pagesize);
      }
      return 1;
    }
  },
  created() {
    this.loadData(1, this.page.pagesize);
  },
  methods: {
    del(msg) {
      this.$confirm({
        title: '提示',
        content: '确认删除这条消息？',
        onOk: () => {
          msgdelmsg(msg.messageid).then(res => {
            let {pagesize, pagenum} = this.page;
            this.loadData(pagenum, pagesize);
          }).catch(err => {
            showError(err);
          });
        }
      })
    },
    markRead(msg) {
      msgreadMark({
        mark: msg.isread == 1 ? 0 : 1,
        messageid: msg.messageid
      }).then(res => {
        let {pagesize, pagenum} = this.page;
        this.loadData(pagenum, pagesize);
      }).catch(err => {
        showError(err);
      });
    },
    read(msg) {
      msgreadMark({
        mark: 1,
        messageid: msg.messageid
      }).then(res => {
        let {pagesize, pagenum} = this.page;
        this.loadData(pagenum, pagesize);
      }).catch(err => {
        showError(err);
      });
    },
    setTop(msg) {
      msgtopMark({
        mark: msg.istop == 1 ? 0 : 1,
        messageid: msg.messageid
      }).then(res => {
        let {pagesize, pagenum} = this.page;
        this.loadData(pagenum, pagesize);
      }).catch(err => {
        showError(err)
      });
    },
    prePage() {
      let {pagesize, pagenum} = this.page;
      if(pagenum > 1){
        this.loadData(pagenum - 1, pagesize);
      }
    },
    nextPage() {
      let {pagesize, pagenum} = this.page;
      if(pagenum < this.pageTotal){
        this.loadData(pagenum + 1, pagesize);
      }
    },
    onSearch(value) {
      this.loadData(1, this.page.pagesize);
    },
    onChange(){
      this.loadData(1, this.page.pagesize);
    },
    onShowSizeChange(current, pagesize) {
      this.loadData(1, pagesize);
    },
    onPageChange(page, pagesize) {
      this.loadData(page, pagesize);
    },
    loadData(pagenum, pagesize) {
      let isread, ishandle;
      if(this.type == 1){
        isread = 1;
      }else if(this.type == 2){
        isread = 0;
      }else if(this.type == 3){
        ishandle = 0;
      }else if(this.type == 4){
        ishandle = 1;
      }
      msglist({
        isread,
        ishandle,
        querykey: this.searchkey && this.searchkey.trim(),
        needtotal: true,
        pagenum: pagenum,
        pagesize: pagesize,
      }).then(({result}) => {
        this.page = result;
      }).catch(err => {
        showError(err);
      });
    },
    dateFormat(date){
      if(date){
        return dateFormat(new Date(date), 'yyyy-MM-dd');
      }
    },
  }
};
</script>
<style lang="less" scoped>
.ant-layout{
  padding: @layout-space-base;
  height: 100%;
}
.message{
  height: 100%;
  flex-direction: column;
  display: flex;
  background: @white;
  border-radius: @border-radius-base;
  & > .toolbar {
    margin-top: 10px;
    padding: @content-padding-v @content-padding-h;
    display: flex;
    .left{
      flex: auto;
      line-height: 38px;
      .ant-input-search{
        vertical-align: middle;
      }
      /deep/.ant-input{
        height: 38px;;
      }
    }
    .right{
      margin-left: 20px;
      border: 1px dashed @border-color-base;
      line-height: 38px;
      .ant-radio-group{
        padding-left: 10px;
        vertical-align: middle
      }
      .page{
        display: inline-block;
        border-left: 1px solid @border-color-base;
        .page-desc{
          vertical-align: middle;
        }
        .anticon{
          font-size: 16px;
          padding: 10px;
          vertical-align: middle;
        }
        .pre{
          &:hover{
            color: @primary-color;
          }
          &.disabled{
            color: @disabled-color;
            cursor: not-allowed;
          }
        }
        .next{
          &:hover{
            color: @primary-color;
          }
          &.disabled{
            color: @disabled-color;
            cursor: not-allowed;
          }
        }
      }
    }
  }
  & > .body {
    flex-shrink: 1;
    min-height: 0;
    overflow: auto;
    padding: 0 @content-padding-h;
    li{
      position: relative;
      padding: 4px 0;
      border-bottom: 1px solid @border-color-split;
      display: flex;
      line-height: 2em;
      &:hover{
        background: @primary-1;
      }
      .read-tag{
        display: inline-block;
        width: 6px;
        height: 6px;
        margin: 0 7px;
        background: fade(@disabled-color, 50%);
        border-radius: 3px;
        vertical-align: middle;
      }
      &.unread{
        .desc{
          font-weight: bold;
        }
        .read-tag{
          background: @primary-color;
        }
      }
      .content{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .handle{
        flex: none;
        padding: 0 5px;
      }
      .holder{
        flex: auto;
      }
      .right{
        flex: none;
        padding: 0 10px;
      }
      .desc{
        vertical-align: middle;
      }
      .handle-tag{
        line-height: 1.8em;
        padding: 0 8px;
        color: @accent-color;
        background: fade(@accent-color, 25%);
        border-radius: 2px;
        vertical-align: middle;
      }
      .sendtime{
        margin-right: 10px;
        color: fade(@black, 40%);
      }
      .top-tag{
        font-size: 16px;
        margin-right: 10px;
        color: @primary-color;
        visibility: hidden;
      }
      &.top{
        .top-tag{
          visibility: visible;
        }
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
}
</style>
<style>
.ant-dropdown[style] {
  min-width: 100px !important;
}
</style>