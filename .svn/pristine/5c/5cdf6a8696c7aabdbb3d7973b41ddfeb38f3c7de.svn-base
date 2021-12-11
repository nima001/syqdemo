<template>
  <div class="analysis-report-view">
    <div class="header">
      <div class="left">{{reportData && reportData.name}}</div>
      <div class="right">
        <a-dropdown-button class="export" type="primary" :disabled="!reportData" @click="doExport('pdf')">
          <a-icon :type="exporting ? 'loading' : 'export'"/>导出
          <a-icon slot="icon" type="more"/>
          <a-menu slot="overlay" @click="doExport($event.key)">
            <a-menu-item key="pdf"><a-icon type="file-pdf" />导出PDF</a-menu-item>
            <a-menu-item key="word"><a-icon type="file-word" />导出Word</a-menu-item>
          </a-menu>
        </a-dropdown-button>
      </div>
    </div>
    <div class="body">
      <analysis-report :formConfig="formConfig" :formData="formData" ref="report"/>
    </div>
  </div>
</template>
<script>
import { Dropdown, Menu, Icon, } from 'ant-design-vue'
import AnalysisReport from './components/AnalysisReport.vue'
import {convertHtmlToFileAsync} from '@framework/api/file'
import { getReport } from '@person/api/statistics'
import { showError } from '@framework/utils'

/**
 * 分析报告查看
 */
export default {
  components: { 
    ADropdownButton: Dropdown.Button,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AIcon: Icon,
    AnalysisReport 
  },
  data(){
    return {
      exporting: false,
      reportData: undefined,
    }
  },
  computed: {
    formConfig(){
      let config = [];
      if(this.reportData){
        try {
          config = JSON.parse(this.reportData.form);
        } catch (error) {
          //ignore
        }
      }
      return config;
    },
    formData(){
      let data = {};
      if(this.reportData){
        try {
          data = JSON.parse(this.reportData.data);
        } catch (error) {
          //ignore
        }
      }
      return data;
    }
  },
  created(){
    let id = this.$route.query.id;
    if(id){
      getReport(id).then(({result}) => {
        this.reportData = result;
      }).catch(error => {
        showError(error)
      })
    }
  },
  methods: {
    async doExport(type){
      if(this.exporting){
        this.$message.info('正在导出中，请稍后');
        return
      }
      try {
        this.exporting = true;
        let {data, sheets, error} = await this.$refs.report.getReportMeta();
        if(error.length){
          try {
            await new Promise((resolve, reject) => {
              this.$confirm({
                title: '提示',
                content: '部分内容正在加载或加载失败，确定导出？',
                onOk: () => {resolve()},
                onCancel: () => {reject()},
              })
            });
          } catch (error) {
            return;
          }
        }
        await convertHtmlToFileAsync({
          title: this.reportData.name,
          pagesize: 'A4',
          rotate: false,
          margins: [96, 120, 96, 120],
          children: sheets
        },false,type);
      } catch (error) {
        showError(error)
      } finally{
        this.exporting = false;
      }
    },
  }
}
</script>
<style lang="less" scoped>
.analysis-report-view{
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: @layout-space-base;
  & > .header{
    flex: none;
    height: 48px;
    padding: 0 @content-padding-h;
    line-height: 48px;
    background: white;
    box-shadow: 0px 5px 10px -5px #dad9d9;
    z-index: 1;
    display: flex;
    & > .left{
      flex: auto;
      overflow: hidden;
      white-space: nowrap;
      font-weight: bold;
      font-size: 1.2em;
    }
    & > .right{
      flex: none;
      margin-left: 20px;
    }
  }
  & > .body{
    flex: auto;
    overflow: auto;
  }
}
</style>