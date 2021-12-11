<template>
  <div class="org-record-choose-doc">
    <div class="toolbar">
      <div class="left">
        <a-button type="primary" @click="showDocAdd = true">添加文件</a-button>
      </div>
      <div class="right">
        <ul>
          <li>
            <span class="name">
              <a-tooltip placement="bottom" class="pzwh-tooltip">
                <span slot="title">发文字号格式为：XX〔4位年份数字〕3位数字号，例如 ：杭编办〔2017〕023号</span>
                <a-icon type="question-circle" theme="filled"/>
              </a-tooltip>
              发文字号
            </span>
            <a-input-group compact class="pzwh">
              <a-input type="text" style="width: 80px;" v-model="search.zihao" />
              <a-input addonBefore="〔" addonAfter="〕" type="text" style="width: 110px;" v-model="search.year"/>
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
            <a-input v-model="search.searchkey" placeholder="请输入文件标题" allowClear/>
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
      >
        <div slot="opts" class="opts" slot-scope="uri">
          <a @click="donwloadFile(uri)" :class="{disable: !uri}">下载文件</a>
        </div>
      </a-table>
    </div>
    <div class="footer">
      <div class="pagination">
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
      </div>
      <div class="btns">
        <a-button class="step-next" type="primary" @click="nextStep">下一步</a-button>
      </div>
    </div>
    <a-modal title="添加台账文件" :footer="null" v-model="showDocAdd"
      width="1000px" :bodyStyle="{height: '520px', padding: 0, overflow: 'hidden'}">
      <add-doc @finish="onDocAdd"/>
    </a-modal>
  </div>
</template>
<script>
import { Button, Icon, Tooltip, Table, Pagination, Input, DatePicker, Modal} from "ant-design-vue";
import moment from "moment";
import { showError } from "@/framework/utils/index";
import { docQuery,getdoc } from "@/person/api/document";
import { download } from "@/framework/api/file";
import AddDoc from "./components/AddDoc";

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
    AddDoc,
  },
  data() {
    return {
      columns: [
        { title: '发文字号', dataIndex: 'num', width: '200px'},
        { title: '文件标题', dataIndex: 'title', customRender: text => <span title={text}>{text}</span> },
        { title: '发文时间', dataIndex: 'dispatchdate', width: '120px'},
        { title: '文件来源', dataIndex: 'level', width: '120px', customRender: this.dictRender('library.doclevel')},
        { title: '文件状态', dataIndex: 'status', width: '120px', customRender: (text) => {
          return text == 2 ? '已入库' : (text == 1 ? '已提交' : '未提交')
        }},
        { title: '数据源', dataIndex: 'source', width: '120px', },
        { title: '操作', dataIndex: 'fileuri', width: '120px', scopedSlots: { customRender: 'opts' } }
      ],
      search: {
        zihao: null,
        year: null,
        ordinal: null,
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
      showDocAdd: false,
      selectDoc: null
    };
  },
  created() {
    this.loadData(this.page);
  },
  methods: {
    indexRender() {
      return (text, row, index) => {
        let p = this.pagination;
        return (p.pagenum - 1) * p.pagesize + index + 1;
      };
    },
    dictRender(key) {
      return (text, row, index) => {
        let v = this.$store.getters.dictKey(key, text);
        text = (v && v.text) || "";
        return <span title={text}>{text}</span>;
      };
    },
    onRowClick(row){
      this.selectDoc = row;
    },
    onSearch() {
      this.loadData({pagenum: 1, pagesize: this.page.pagesize});
    },
    onPageChange(pagenum, pagesize) {
      this.loadData({pagenum, pagesize});
    },
    onShowSizeChange(pagenum, pagesize) {
      this.loadData({pagenum: 1, pagesize});
    },
    onDocAdd(docid) {
      this.showDocAdd = false;
      if(docid){
        getdoc(docid).then(({result}) => {
          this.selectDoc = result;
          this.nextStep();
        }).catch(err => {
          showError(err);
          this.loadData({pagenum: 1, pagesize: this.page.pagesize});
        })
      }
    },
    nextStep() {
      if(!this.selectDoc){
        Modal.warning({ title: "提示", content: "请先选择文件" });
        return;
      }
      this.$emit('next', this.selectDoc);
    },
    loadData(page) {
      let params = {
        ...this.search,
        ...page,
        type: 1,//查询台账文件
        statusIn: [1],//查询已入库文件
        needtotal: true,
      };
      docQuery(params).then(({result}) => {
        // this.pagination.total = res.result.total;
        // this.pagination.current = res.result.pagenum;
        // for (let x = 0; x < this.datalist.length; x++) {
        //   this.$set(this.datalist[x], "key", this.datalist[x].id);
        // }
        this.pageLoading = false;
        this.page = result;
      }).catch(error => {
        showError(error);
      });
    },
    donwloadFile(uri) {
      if(uri){
        download(uri).then(res => {
          //提示下载成功
        }).catch(err => {
          showError(err);
        });
      }
    },
  }
};
</script>
<style lang="less" scoped>
.org-record-choose-doc {
  height: 100%;
  display: flex;
  flex-direction: column;
  & > .toolbar {
    white-space: nowrap;
    padding: @content-padding-v @content-padding-h;
    .left {
      float: left;
    }
    .right{
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
      .ant-input-group.ant-input-group-compact,.ant-select,.ant-btn,.ant-input-affix-wrapper{
        display: inline-block;
        vertical-align: middle;
      }
    }
    .pzwh-tooltip{
      font-size: @font-size-base;
      color:@primary-color;
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
  & > .body{
    flex-shrink: 1;
    min-height: 0;
    overflow: auto;
    padding: 0 @content-padding-h;
    /deep/tr.selected{
      background: @primary-2;
    }
    /deep/.opts > .disable{
      color: @disabled-color;
      cursor: not-allowed;
    }
  }
  & > .footer{
    padding: @content-padding-v @content-padding-h;
    .pagination{
      overflow: hidden;
      .ant-pagination{
        float: right;
      }
    }
    .btns{
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>
