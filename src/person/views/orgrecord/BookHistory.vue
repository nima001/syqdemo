<template>
  <a-layout>
    <div class="org-record">
      <div class="toolbar">
        <div class="left">
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
                <a-input
                  addonBefore="〔"
                  addonAfter="〕"
                  type="text"
                  style="width: 100px;"
                  v-model="search.year"
                />
                <a-input addonAfter="号" type="text" style="width: 80px;" v-model="search.ordinal" />
              </a-input-group>
            </li>
            <li>
              <a-input-group compact>
                <a-date-picker placeholder="发文开始时间" style="width: 130px" v-model="search.starttime" />
                <a-date-picker placeholder="发文结束时间" style="width: 130px" v-model="search.endtime" />
              </a-input-group>
            </li>
            <li>
              <dict-select dict="person.orgrecordsubject"
                :multiple="true"
                placeholder="请选择主题词"
                style="width: 225px;"
                v-model="search.subjects"
                :show-group="false"
              />
            </li>
            <li>
              <a-input v-model="search._orgname" 
                placeholder="选择相关单位" 
                style="width: 200px" 
                :read-only="true"
                allowClear
                @change="onOrgNameChange"
                @click="showSelectOrg=true"/>
            </li>
            <li>
              <a-select v-model="search.status" 
                placeholder="选择状态" 
                style="width: 100px" 
                allowClear
              >
                <a-select-option :key="0">未提交</a-select-option>
                <a-select-option :key="1">已提交</a-select-option>
              </a-select>
            </li>
            <li>
              <a-button class="btn" type="primary" @click="onSearch">查询</a-button>
            </li>
          </ul>
        </div>
      </div>
      <div class="body">
        <a-table
          class="data-table"
          :columns="columns"
          :dataSource="page.rows"
          rowKey="id"
          :rowClassName="(row) => row.status != 1 ? 'unsubmit': ''"
          :loading="pageLoading"
          :pagination="false"
        >
          <span slot="level" slot-scope="level">{{level == 1 ? '上级文件' : '本级文件'}}</span>
          <template slot="opts" slot-scope="record">
            <router-link target="_blank" style="margin-right:10px" :to="{ 
              name: 'bookEdit', query: { id: record.id }}
            ">编辑</router-link>
            <a :class="{disabled: !record.doc.fileuri}" @click="downloadFile(record)">下载文件</a>
            <a @click="deleteRecord(record)" style="margin-left: 10px">删除</a>
          </template>
        </a-table>
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
      </div>
    </div>
    <a-modal
      v-model="showSelectOrg"
      title="选择相关单位"
      :footer="null"
      :width="500"
      :bodyStyle="{ height: '600px', padding: '0'}"
    >
      <org-user-select mode="org" @finish="onOrgSelected" />
    </a-modal>
  </a-layout>
</template>
<script>
import { Layout, Input, Select, Button, Table, Pagination, DatePicker,Tooltip, Icon, Modal} from 'ant-design-vue';
import DictSelect from "@/framework/components/DictSelect";
import OrgUserSelect from "@/person/components/OrgUserSelect";
import { showError } from "@/framework/utils/index";
import { recordQuery,deleteRecord } from "@/person/api/orgRecord";
import { download } from "@/framework/api/file";

export default {
  components:{
    ALayout: Layout,
    AInput: Input,
    AInputSearch: Input.Search,
    AInputGroup: Input.Group,
    ASelect: Select,
    ASelectOption: Select.Option,
    AButton: Button,
    ATable: Table,
    APagination: Pagination,
    ADatePicker: DatePicker,
    ATooltip: Tooltip,
    AIcon: Icon,
    AModal: Modal,
    OrgUserSelect,
    DictSelect,
  },
  data() {
    return {
      columns: [
        { title: "发文字号", dataIndex: "doc.num", width: '180px', customRender: (text, row) => {
            return <span><span class={row.begin ? 'begin' : 'begin hiddren'}></span>{text}</span>
          }},
        { title: "文件标题", dataIndex: "doc.title", width: '30%', customRender: text => <span title={text}>{text}</span>},
        { title: "相关单位", dataIndex: "orgname", width: '30%', customRender: (text, row) => {
          if(row.exist){
            return <div class="orgname-tag"><div class="name" title={text}>{text}</div><div class="tag">待撤销</div></div>;
          }else{
            return <span title={text}>{text}</span>;
          }
        }},
        { title: "主题词", dataIndex: "subjects", width: '20%', customRender: this.subjectText() },
        { title: "发文时间", dataIndex: "doc.dispatchdate", width: '10%',},
        { title: "文件来源", dataIndex: "level", width: '10%', scopedSlots: { customRender: 'level' }},
        { title: "操作", width: '150px', scopedSlots: { customRender: 'opts' } }
      ],
      search: {
        zihao: null,
        year: null,
        ordinal: null,
        starttime: null,
        endtime: null,
        subjects: undefined,
        status: 1,
        searchkey: null,
        orgid: undefined,
        _orgname: undefined,
      },
      showSelectOrg: false,
      pageLoading: false,
      page: {
        rows: null,
        pagesize: 20,
        pagenum: 1,
        total: 0
      },
    };
  },
  created() {
    let num = this.$route.query.num;
    if(num){
      //从文号中匹配
      var matched = /^(\p{Unified_Ideograph}+)〔([0-9]{4})〕([0-9]+)号$/u.test(num);
      if(matched){
        this.search.zihao = RegExp.$1;
        this.search.year = RegExp.$2;
        this.search.ordinal = RegExp.$3;
      }
    }
    this.refresh();
  },
  computed:{
    subjectList() {
      return this.$store.getters.dict("person.orgrecordsubject");
    },
  },
  methods: {
    subjectText() {
      return (subjects, row, index) => {
        let text = "";
        if (
          this.subjectList &&
          this.subjectList.length &&
          subjects &&
          subjects.length
        ) {
          this.subjectList.forEach(item => {
            if (subjects.indexOf(item.value) >= 0) {
              text += `、${item.text}`;
            }
          });
          if (text) {
            text = text.substr(1);
          }
        }
        return <span title={text}>{text}</span>;
      };
    },
    onTabSelect(index) {
      this.search = {};
      this.loadData(1, 10);
    },
    onSearch() {
      this.loadData(1, this.page.pagesize);
    },
    onPageChange(page, pagesize) {
      this.loadData(page, pagesize);
    },
    onShowSizeChange(current, size) {
      this.loadData(1, size);
    },
    refresh(){
      let { pagenum, pagesize } = this.page;
      this.loadData(pagenum, pagesize);
    },
    onOrgSelected(type, list){
      this.showSelectOrg = false;
      if(type == 'ok' && list.length){
        let org = list[0];
        this.search.orgid = org._id;
        this.search._orgname = org.name;
      }
    },
    onOrgNameChange(){
      if(!this.search._orgname){
        this.search.orgid = undefined;
      }
    },
    deleteRecord(record){
      Modal.confirm({
        title: '提示',
        content: '确定删除记录？',
        onOk:() => {
          deleteRecord(record.id).then(() => {
            let { pagenum, pagesize } = this.page;
            this.loadData(pagenum, pagesize);
          }).catch(error => {
            showError(error);
          })
        },
      });
    },
    downloadFile(record) {
      if (record.doc.fileuri) {
        download(record.doc.fileuri);
      }
    },
    loadData(pagenum, pagesize) {
      let params = {
        ...this.search,
        needtotal: true,
        pagenum,
        pagesize
      };
      this.pageLoading = true;
      recordQuery(params)
        .then(resp => {
          this.pageLoading = false;
          this.page = resp.result;
        })
        .catch(err => {
          showError(err);
        });
    },
    operateHandle(record) {
      this.$router.push("/business/bookeditor");
    },
  }
};
</script>
<style lang="less" scoped>
.ant-layout{
  padding: @layout-space-base;
  height: 100%;
}
.org-record {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: @border-radius-base;
  background: @white;
 
  & > .toolbar   {
    padding: @content-padding-v @content-padding-h;
    margin-top: 10px;
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
      .ant-select,.ant-input,.ant-btn,.ant-input-affix-wrapper{
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

  .body {
    flex-shrink: 1;
    min-height: 0;
    overflow: auto;
    padding: 0 @content-padding-h;
    .begin{
        display: inline-block;
        width: 8px;
        height: 8px;
        background: @accent-color;
        border-radius: 4px;
        margin-right: 4px;
        margin-bottom: 2px;
        &.hiddren{
          visibility: hidden;
        }
      }
    /deep/table {
      table-layout: fixed;
      td,
      th {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .disabled {
        color: @disabled-color;
      }
      tr.unsubmit{
        color: fade(@text-color, 40%);
      }
    }
    .orgname-tag{
      display: flex;
      .name{
        flex: 0 1 auto;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .tag{
        margin-left: 5px;
        line-height: 1.8em;
        padding: 0 6px;
        color: @accent-color;
        background: fade(@accent-color, 15%);
        border-radius: 2px;
        font-size: 12px;
      }
    }
  }
  .footer {
    padding: @content-padding-v @content-padding-h;
    .ant-pagination {
      float: right;
      margin-bottom: 10px;
    }
  }
}
</style>