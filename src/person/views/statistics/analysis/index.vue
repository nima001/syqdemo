<template>
  <div class="analyze">
    <div class="panel template">
      <div class="title">常用模板</div>
      <ul>
        <li v-if="setting.show">
          <div @click="setting.show=false">
            <div class="icon"><a-icon type="arrow-left"/></div>
            <div class="title">返回</div>
            <div class="desc"></div>
          </div>
        </li>
        <li>
          <div @click="eidt()">
            <div class="icon"><a-icon type="plus"/></div>
            <div class="title">新建报告</div>
            <div class="desc"></div>
          </div>
        </li>
        <li v-for="item in tempList" :key="item.id">
          <div @click="eidt(item.id)">
            <div class="icon"><a-icon type="file-text"/></div>
            <v-clamp tag="div" class="title" :max-lines="2">{{item.name}}</v-clamp>
            <div class="desc">{{item.updatetime && item.updatetime.substring(0, 10)}}</div>
            <div class="delete" @click.stop="onDelete(item)"><a-icon type="delete"/></div>
          </div>
        </li>
        <li v-if="!setting.show && setting.list.length > 5">
          <div @click="setting.show = true">
            <div class="icon"><a-icon type="arrow-right"/></div>
            <div class="title">更多模板</div>
            <div class="desc"></div>
          </div>
        </li>
        <li v-show="setting.show" class="footer-sentinel" ref="sentinel"></li>
      </ul>
    </div>
    <div class="panel report" v-show="!setting.show">
      <div class="title">已保存</div>
      <div class="header">
        <a-input v-model="report.searchkey" allowClear style="width: 480px"/>
        <a-button type="primary" @click="doSearch">查询</a-button>
      </div>
      <div class="body">
        <a-table 
          rowKey="id"
          :columns="report.columns"
          :dataSource="report.page.rows"
          :customRow="customRow"
          :rowClassName="(row) => report.selected && report.selected.id == row.id ? 'selected': ''"
          :pagination="{
            current: report.page.pagenum,
            total: report.page.total,
            pageSize: report.page.pagesize,
            showSizeChanger: true,
            showTotal: total => `总共：${total}条`
          }"
          @change="onTableChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Icon, Button, Input, Table } from 'ant-design-vue'
import VClamp from 'vue-clamp';
import { querySetting, deleteSetting, queryReport } from '@person/api/statistics'
import { showError } from '../../../../framework/utils';


/**
 * 分析指引页面
 */
export default {
  components:{
    AIcon: Icon,
    AInput: Input,
    AButton: Button,
    ATable: Table,
    VClamp,
  },
  data(){
    return {
      setting: {
        show: false,
        searchkey: undefined,
        hasNext: true,
        loading: false,
        list: []
      },
      report: {
        columns: [
          { title: '报告名称', dataIndex: 'name'},
          { title: '保存时间', dataIndex: 'createtime', width: 150, customRender: text => text && text.substr(0, 10)},
        ],
        page: {
          rows: [],
          pagenum: 1,
          pagesize: 10,
          total: 0,
        },
        searchkey: undefined,
      },
      intersectionObserver: undefined
    }
  },
  computed: {
    tempList(){
      let { show, list } = this.setting;
      if(!show && list.length >5){
        return list.slice(0, 4);
      }else{
        return list;
      }
    },
  },
  created(){
    this.loadNext(16); //先加载3行
    this.loadReport(1, 10);
  },
  destroyed(){
    this.unBindScrollSentinel();
  },
  watch: {
    'setting.show'(show){
      if(show){
        this.bindScrollSentinel();
      }else{
        this.unBindScrollSentinel();
      }
    }
  },
  methods: {
    eidt(id){
      this.$router.push({name: 'statisticsAnalysisEdit', query: {id: id}})
    },
    onTableChange({current, pageSize}){
      let { pagesize } = this.report.page;
      if(pagesize != pageSize){
        current = 1;//切换页面条数重新定位到第一页
      }
      this.loadReport(current, pageSize);
    },
    customRow(row){
      return {
        on: {
          click: () => {
            this.$set(this.report, 'selected', row);
          },
          dblclick: (event) => {
            this.$router.push({name: 'analysisReportView', query: { id: row.id }});
          },
        }
      };
    },
    doSearch(){
      this.loadReport(1, this.report.pagesize);
    },
    async onDelete(item){
      try {
        await deleteSetting(item.id)
        await this.loadNext(1);//删除后需要补上数据
        let { list } = this.setting;
        let index = list.findIndex((e => e == item));
        if(index >= 0){
          list.splice(index, 1);
        }
      } catch (error) {
        showError(error)
      }
    },
    bindScrollSentinel(){
      if(this.intersectionObserver){
        return;
      }
      let sentinel = this.$refs.sentinel;
      if(sentinel && this.setting.hasNext){
        this.intersectionObserver = new IntersectionObserver((entries) => {
          if (entries[0].intersectionRatio > 0){
            this.loadNext();
          }
        });
        this.intersectionObserver.observe(sentinel);
      }
    },
    unBindScrollSentinel(){
      if(this.intersectionObserver){
        this.intersectionObserver.disconnect();
        this.intersectionObserver = undefined;
      }
    },
    loadNext(count){
      let { searchkey, hasNext, loading, list } = this.setting;
      if(!hasNext || loading){
        return;
      }
      let from;
      if(list.length){
        from = list[list.length-1].updatetime;
      }
      this.setting.loading = true;
      return this.loadSetting({
        searchkey, from,
        count: count || 12,//默认查询2行 一行6个
      }).then((result) => {
        this.setting.hasNext = result.hasNext
        this.setting.list = list.concat(result.list);
        if(!result.hasNext){
          this.unBindScrollSentinel();
        }
        this.setting.loading = false;
      }).catch((error) => {
        this.setting.loading = false;
        showError(error);
      })
    },
    loadSetting({searchkey, from, count}){
      let len = count + 1;//多加载一条用于判断是否有下一页
      return querySetting({
        searchkey, 
        from, 
        count: len
      }).then(({result}) => {
        let data = {};
        if(result.length == len){
          result.pop();
          data.hasNext = true;
        }else{
          data.hasNext = false;    
        }
        data.list = result;
        return data;
      })
    },
    loadReport(pagenum, pagesize){
      queryReport({
        searchkey: this.report.searchkey,
        pagenum, pagesize,
        needtotal: true
      }).then(({result}) => {
        this.report.page = result;
      }).catch(error => {
        showError(error);
      })
    }
  }
}
</script>
<style lang="less" scoped>
.analyze{
  .panel{
    width: 1200px;
    margin: @padding-lg auto;
    & > .title{
      margin: @padding-sm 0;
      font-weight: bold;
      font-size: 1.4em;
    }
  }
  .template{
    ul{
      overflow: hidden;
      margin: -12px;
    }
    li{
      float: left;
      padding: 12px;
      width: 16.66%;
      & > div{
        position: relative;
        display: flex;
        flex-direction: column;
        height: 240px;
        padding: 15px;
        border: 1px solid white;
        border-radius: @border-radius-base;
        box-shadow: 0 0 10px -2px #dad9d9;
        background: white;
        transition: all .2s cubic-bezier(.645,.045,.355,1);
        text-align: center;
        cursor: pointer;
        .icon{
          flex: auto;
          font-size: 80px;
          color: fade(#4e86ff, 40%);
        }
        .title{
          margin-top: 10px;
          height: 2.4em;
          line-height: 1.2em;
        }
        .desc{
          height: 1.5em;
          line-height: 1.5em;
          margin-top: 10px;
          color: @disabled-color;
          white-space: nowrap;
          overflow: hidden;
        }
        .delete{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          margin: -1px;
          line-height: 30px;
          background: rgba(0, 0, 0, 25%);
          color: white;
          font-size: 18px;
          display: none;
          &:hover{
            color: @error-color;
          }
        }
        &:hover{
          box-shadow: 0 0 15px -7px #1B5293;
          border-color: fade(#37a2ea, 40%);
          .delete{
            display: block;
          }
        }
      }
    }
  }
  .report{
    .header{
      margin-bottom: 20px;
      .ant-btn{
        vertical-align: top;
        margin-left: 10px;
      }
    }
    .body{
      /deep/ .ant-table-thead > tr > th{
        background: unset;
        color: @disabled-color;
      }
      /deep/ .ant-table-tbody > tr{
        & > td{
          padding: 12px 6px;
        }
        &.selected{
          background: @primary-2;
        }
      }
      /deep/ .ant-table-placeholder{
        background: unset;
      }
    }
  }
}
</style>