<template>
  <a-layout class="main">
    <div class="maincontent">
      <div class="toolbar">
        <div class="left">
          <a-button type="primary" @click="add">新增</a-button>
        </div>
        <div class="right">
          <dict-select
            allowClear
            class="search-item"
            style="width: 160px;"
            dict="workflow.api.apitype"
            v-model="query.type"
            placeholder="数据类别"
          />
          <dict-select
            allowClear
            class="search-item"
            style="width: 160px;"
            dict="workflow.api.apirequest"
            v-model="query.requesttype"
            placeholder="数据请求"
          />
          <a-input class="search-item" placeholder="请输入关键词" v-model="query.nameLike" />
          <div class="selectBtn">
            <a-button type="primary" @click="onSearch">查询</a-button>
            <a-button class="resetBtn" @click="onReset">重置</a-button>
          </div>
        </div>
      </div>
      <div class="tablecontent">
        <a-table
          rowKey="id"
          :loading="loading"
          :columns="columns"
          :dataSource="pagination.rows"
          :pagination="false"
        >
        <span slot="action" class="operation" slot-scope="text, record">
          <a href="javascript:;" @click="edit(record.id)">编辑</a>
          <a href="javascript:;" @click="design(record.id)">参数设计</a>
          <a-popconfirm
            title="确认删除?"
            @confirm="() => onDelete(record.id)"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </span>
        </a-table>
      </div>
      <div class="footer">
        <a-pagination
          v-if="pagination.rows && pagination.rows.length"
          showSizeChanger
          :showTotal="total => `总共：${total}条`"
          @showSizeChange="onShowSizeChange"
          :total="pagination.total"
          :pageSize="pagination.pagesize"
          v-model="pagination.pagenum"
          @change="onPageChange"
        >
        </a-pagination>
      </div>
    </div>
    <a-modal 
      title="接口编辑" 
      :destroyOnClose="true"
      :visible="visible"
      :width='950' 
      :bodyStyle="{overflow: 'auto', height: '550px', padding: '8px 24px'}" 
      okText="确定" 
      :okButtonProps="{props: {disabled: disbaledOkBtn}}"
      cancelText="取消"
      @ok="submitForm"
      @cancel="cancelApi"
    >
      <sys-api-manage-info :selectedid="selectedid" @enableOkBtn="enableOkBtn" @closeApi="closeApi" ref="sysApiManageInfo"/>
    </a-modal>
  </a-layout>
</template>
<script>
import {Layout, Table, Button, Select, Input, Popconfirm, Pagination, Modal} from "ant-design-vue"
import DictSelect from "@/framework/components/DictSelect";
import {pagelistApi, delApi} from "@/workflowsystem/api/sysapimanage"
import { showError, dateFormat } from "@/framework/utils/index";
import SysApiManageInfo from './SysApiManageInfo';
export default {
  name: "MonitorApi",
  components: {
    ALayout: Layout,
    AButton: Button,
    ATable: Table,
    ASelect: Select,
    ASelectOption: Select.Option,
    AInput: Input,
    APopconfirm: Popconfirm,
    APagination: Pagination,
    AModal: Modal,
    DictSelect,
    SysApiManageInfo
  },
  data(){
    return {
      query: {
        nameLike: undefined,
        type: undefined, 
        requesttype: undefined,
      },
      columns:[
        {
          title: "序号",
          customRender: (text, record, index) => index + 1,
          width: "2%"
        },
        {
          title: "名称",
          dataIndex: "name",
          width: "5%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "认证策略",
          dataIndex: "authStrategyName",
          width: "5%",
        },
        {
          title: "请求路径",
          dataIndex: "url",
          width: "8%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "类别",
          dataIndex: "type",
          width: "3%",
          customRender: this.dictRender("workflow.api.apitype")
        },
        {
          title: "http请求类型",
          dataIndex: "type",
          width: "4%",
          customRender: this.dictRender("workflow.api.apihttptype")
        },
        {
          title: "请求方式",
          dataIndex: "requesttype",
          width: "3%",
          customRender: this.dictRender("workflow.api.apirequest")
        },
        {
          title: "内容体类型",
          dataIndex: "contenttype",
          width: "3%",
          customRender: this.dictRender("workflow.api.apicontenttype")
        },
        {
          title: "创建用户",
          dataIndex: "createuser",
          width: "4%"
        },
        {
          title: "创建时间",
          dataIndex: "createtime",
          width: "5%"
        },
        {
          title: "更新用户",
          dataIndex: "updateuser",
          width: "3%",
        },
        {
          title: "更新时间",
          dataIndex: "updatetime",
          width: "5%",
          customRender: text => text ? dateFormat(new Date(text), "yyyy-MM-dd hh:mm:ss") : ""
        },
        {
          title: "操作",
          width: "8%",
          scopedSlots: { customRender: 'action' },
        }
      ],
      loading: false,
      pagination: {
        rows: null,
        pagesize: 10,
        pagenum: 1,
        total: 0
      },
      selectedid: null,
      visible: false,
      categoryMap: {},
      disbaledOkBtn: true,
    }
  },
  methods: {
    refresh(){
      let { pagenum, pagesize } = this.pagination;
      this.loadData(pagenum, pagesize);
    },
    loadData(pagenum, pagesize) {
      //加载列表
      let params = {
        query: this.query,
        needtotal: true,
        pagenum,
        pagesize
      };
      this.loading = true;
      pagelistApi(params).then(resp =>{
        this.loading = false;
        this.pagination = resp.result;
      }).catch(err => {
        this.loading = false;
        showError(err);
      })
    },
    onSearch(){
      this.loadData(1, this.pagination.pagesize);
    },
    onReset(){
      this.query = {};
      this.loadData(1, this.pagination.pagesize);
    },
    add(){
      //新增
      this.disbaledOkBtn = true;
      this.selectedid = null;
      this.visible = true;
    },
    edit(id){
      //编辑
      this.disbaledOkBtn = true;
      this.selectedid = id;
      this.visible = true;
    },
    design(id){
      //设计
      const { href } = this.$router.resolve({
        name: "ApiDesign",
        query: {
          id: id
        }
      });
      window.open(href, '_blank');
    },
    onDelete(id) {
      //删除
      delApi(id).then(resp => {
        this.$message.success("删除成功");
        this.refresh();
      }).catch(err =>  showError(err));
    },
    dictRender(key) {
      return (text, row, index) => {
        let v = this.$store.getters.dictKey(key, text);
        text = (v && v.text) || "";
        return <span title={text}>{text}</span>;
      };
    },
    onPageChange(page, pagesize){
      this.loadData(page, pagesize);
    },
    onShowSizeChange(current, pagesize) {
      this.loadData(current,pagesize)
    },
    submitForm(){
      //提交表单
      this.$refs.sysApiManageInfo.handleSubmit();
    },
    closeApi(){
      //关闭编辑弹窗
      this.visible = false;
      this.refresh();
    },
    enableOkBtn(){
      //启用确认按钮
      this.disbaledOkBtn = false;
    },
    cancelApi(){
      //取消编辑弹窗
      this.visible = false;
    },
  }
}
</script>
<style lang="less" scoped>
.main{
  height: 100%;
  padding: @layout-space-base;
  .maincontent{
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: white;
    padding-top: @layout-space-base;
    border-radius: @border-radius-base;
    .toolbar{
      padding: @content-padding-v @content-padding-h;
      width: 100%;
      height: auto;
      .left{
        float: left;
      }
      .right{
        float: right;
        display: flex;
        .search-item{
          width: 180px;
          margin: 0 8px 0 0;
        }
        .selectBtn{
          .resetBtn{
            margin-left: 8px;
          }
          
        }
      }
    }
    .tablecontent{
      padding: 0 @content-padding-h;
      flex-shrink: 1;
      min-height: 0;
      overflow-y: auto;
      /deep/table{
        table-layout: fixed;
        td,th{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis; 
        }
      }
      .operation {
        a {
          margin-right: 20px;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .footer{
      padding: @content-padding-v @content-padding-h;
      .ant-pagination{
        float: right;
        margin-bottom: 10px;
      }
    }
  }
  /deep/.ant-table-thead {
    tr {
      th {
        border-right: 1px solid #e8e8e8;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>