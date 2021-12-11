<template>
  <div class="check_report">
    <div class="top">
      <a-button type="primary" v-if="isChecked" @click="onUpdate" :loading="loading">检查更新</a-button>
      <!-- <a-button type="primary" @click="onExport" icon="export">导出</a-button> -->
      <a-dropdown-button class="export" type="primary" @click="onExport('pdf')">
        <a-icon :type="exporting ? 'loading' : 'export'"/>导出
        <a-icon slot="icon" type="more"/>
        <a-menu slot="overlay" @click="onExport($event.key)">
          <a-menu-item key="pdf"><a-icon type="file-pdf" />导出PDF</a-menu-item>
          <a-menu-item key="word"><a-icon type="file-word" />导出Word</a-menu-item>
        </a-menu>
      </a-dropdown-button>
    </div>
    <div class="main">
      <div class="main_report">
        <div class="main_report_content">
          <Content v-if="detailData" :content="detailData" ref="content" />
        </div>
      </div>
    </div>
    <!-- 导出 -->
    <a-modal
      title="标题"
      ok-text="确定"
      cancel-text="取消"
      v-model="exportVisible"
      :width="500"
      :destroyOnClose="true"
      @ok="handleOk"
      @cancel="titleCancel">
      <div class="add-title">
        <a-form class="title-form" :form="form">
          <a-form-item
            label="页面标题"
            >
            <a-input
              v-decorator="[
                'title',
                { initialValue: '机构编制专项评估报告', rules: [{  required: true, message: '请输入页面标题!' }]},
              ]"
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
        <!-- 检查更新 增加新评估项 -->
    <a-modal
      title="检查更新"
      ok-text="确定"
      cancel-text="取消"
      v-model="reportAddedVisible"
      :width="800"
      :destroyOnClose="true"
      :bodyStyle="{height: '500px'}"
      @ok="reportAddedOk"
      @cancel="reportAddedVisible = false">
      <add-report ref="UpdateReport" :spin="spinning"></add-report>
    </a-modal>
    <!-- 检查更新--评估项值改变 -->
    <a-modal
      title="检查更新"
      ok-text="是"
      cancel-text="否"
      v-model="reportChangeVisible"
      :width="500"
      :destroyOnClose="true"
      @ok="updateOk"
      @cancel="updateCancel">
        <div>
          <p>{{allName}}</p>
          <p>是否生成新报告？</p>
        </div>
    </a-modal>
    <!-- 检查更新--评估项未改变 -->
    <a-modal
      title="检查更新"
      ok-text="确定"
      :cancel-text=null
      v-model="reportNotchangeVisible"
      :width="500"
      :destroyOnClose="true"
      @ok="reportNotchangeVisible = false"
      >
        <div>
          <p>数据模块未更新。</p>
        </div>
    </a-modal>
  </div>
</template>

<script>
import { Dropdown, Menu, Icon, Button, Modal, Form, Input } from "ant-design-vue";
import Content from "../components/Content";
import AddReport from '@/person-shaoxing/views/assessment/compileAssist/components/AddReport';
import { newestReport, checkUpdate, updateReport } from "@/person-shaoxing/api/assessment";
import {convertHtmlToFileAsync} from '@framework/api/file';
import { showError } from "@/framework/utils/index";
import { loadData, getAllName, getInputs } from '../components/contentItems';
export default {
  props: {},
  components: {
    AButton: Button,
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    ADropdownButton: Dropdown.Button,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AIcon: Icon,
    Content,
    AddReport
  },
  data() {
    return {
      detailData: undefined,
      resData: undefined,
      isChecked: false,
      loading: false,
      spinning: false,
      exportVisible: false,
      reportChangeVisible: false,
      reportNotchangeVisible: false,
      reportAddedVisible: false,
      title: undefined,
      resData: undefined,
      newDetail: undefined,
      newItems: undefined,
      allName: undefined,
      changedArgs: undefined,
      exporting: false,
      type: 'pdf'
    };
  },
  watch: {},
  computed: {},
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    //  历史详情
    if (Number(this.$route.query.isHistory)) {//  query页面刷新改变参数数据类型
      this.getData(2);
    } else {//  查看最新
      this.getData(1);
    }
  },
  mounted() {},
  methods: {
    getData(type) {
      newestReport(this.$route.query.reportid, type)
      .then(({result}) => {
        this.isChecked = result.status ? false : true;
        this.detailData = JSON.parse(result.details);
        this.resData = result;
      })  
      .catch(err => {
        showError(err);
      })
    },
    //  导出
    onExport(type) {
      this.type = type;
      this.exportVisible = true;
    },
    titleCancel() {
      this.exportVisible = false;
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if(err){
          return;
        } else {
          this.title = values.title;
          this.exportVisible = false;
          this.exportPDF();
        }
      })
    },
    exportPDF() {
      //  获取评估项
      this.exporting = true;
      const item = this.$refs.content.getVal();
      convertHtmlToFileAsync({
        children: item,
        margins: [96, 120, 96, 120],
        title: this.title,
        pagesize: 'A4',
        rotate: false
      }, false, this.type)
      .then(res => {
      })
      .catch(err => {
        showError(err)
      })
      .finally(() =>{
        this.exporting = false;
      })
    },
    //  检查更新
    onUpdate() {
      this.loading = true;
      let params = {}
      params.historyid = this.resData.id
      params.reportid = this.resData.reportid
      params.type = 1
      params.details = ''

      checkUpdate(params)
      .then(({result}) => {// 判断评估项有无改变
        this.newItems = result.items
        let args = JSON.parse(result.args)
        let target = {}
        this.newItems.forEach(item => {// 获取评估项的参数 
          let keysArr = []
          if (args[item]) {
            keysArr = Object.keys(args[item])
            keysArr.forEach(key => {
              target[key] = args[item][key]
            })
          }
        })
        if(result.itemsChange) {//  true 弹出新增弹框 并填写数据
          this.reportAddedVisible = true;
          this.loading = false;
          let configsList = this.resData.configs.split(',').map(Number);
          this.$nextTick(() => {//  组件加载完成 再调方法
            this.$refs.UpdateReport.content = configsList
            this.$refs.UpdateReport.itemParams = target
            this.$refs.UpdateReport.getItems()
          })
        } else {//  根据评估项 获取数据  对比
          this.getItemData(target, this.newItems)
        }
      })
      .catch(err => {
        showError(err)
      })  
    },
    async getItemData(target, items) {
      let data = await loadData(target, items)
      if (data) {
        this.changedArgs = data.args;
        let params = {}
        params.type = 2
        params.historyid = this.resData.id
        params.reportid = this.resData.reportid
        params.details = data.result
        checkUpdate(params)
        .then(({result}) => {
          this.loading = false;
          if (result.reportIsChange) {//  评估项改变  弹出弹框并展示改变的项  确定时更新页面
            this.allName = getAllName(result.changeList)
            this.newDetail = result.newDetails;
            this.reportChangeVisible = true;
          } else {
            this.reportNotchangeVisible = true;
          }
        })
        .catch(err => {
          showError(err)
        })
      }
    },
    async reportAddedOk() {
      let value = await this.$refs.UpdateReport.getFormValue();
      if(value) {
        let data = await loadData(value.target, value.itemArr);
        if(data) {
          this.reportAddedVisible = false;
          this.changedArgs = data.args;
          let params = {}
          params.type = 2
          params.historyid = this.resData.id
          params.reportid = this.resData.reportid
          params.details = data.result
          checkUpdate(params)
          .then(({result}) => {
            if (result.reportIsChange) {//  评估项改变  弹出弹框并展示改变的项  确定时更新页面
              this.allName = getAllName(result.changeList)
              this.newDetail = result.newDetails;
              this.reportChangeVisible = true;
            } else {
              this.reportNotchangeVisible = true;
            }
          })
          .catch(err => {
            showError(err)
          })
        }
      }
    },
    updateOk() {
      let params = {}
      params.details = this.newDetail
      params.args = this.changedArgs
      params.id = this.resData.id
      params.items = this.newItems.join(",")
      params.inputs = getInputs(this.newItems)
      params.content = '测试'
      updateReport(params)
      .then(res => {
        this.reportChangeVisible = false
        newestReport(this.resData.reportid, 1)
        .then(res => {
          this.isChecked = res.result.status ? false : true;
          this.detailData = JSON.parse(res.result.details);
          this.resData = res.result;
          this.$notification.success({
            message: "提示",
            description: "评估项更新成功!",
            duration: 3
          });
        })
      })
      .catch(err => {
        showError(err)
      })
    },
    updateCancel() {
      this.reportChangeVisible = false;
    }
  },
};
</script>
<style lang="less" scoped>
.check_report{
  background-color: @white;
  height: calc(~"100% -  20px");
  margin: 10px;
  overflow: hidden;
  .top{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 @content-padding-h;
    height: 68px;
    -moz-box-shadow:0px 5px 10px -5px #dad9d9; 
    -webkit-box-shadow:0px 5px 10px -5px #dad9d9; 
    box-shadow:0px 5px 10px -5px #dad9d9;
  }
  .main{
    height: calc(~"100% -  68px");
    background-color: #eee;
    background-image: url('../../../../assets/img/analysis_watermark.png');
    overflow-y: auto;
    .main_report{
      width: 794px;
      min-height: 1123px;
      margin: 20px auto;
      -webkit-box-shadow: 1px 1px 20px #dad9d9;
      box-shadow: 1px 1px 20px #dad9d9;
      background-color: @white;
      overflow: hidden;
      .main_report_content{
        margin: 120px 96px;
      }
    }
  }
}
</style>