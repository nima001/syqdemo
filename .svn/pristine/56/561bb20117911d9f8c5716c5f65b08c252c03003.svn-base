<template>
  <a-layout class="main">
    <div class="maincontent">
      <div class="toolbar">
        <div class="left">
          <a-button type="primary" @click="add">新增</a-button>
        </div>
        <div class="right" >
          <a-select style="width: 160px;" placeholder="表单类别">
            <a-select-option v-for="(val, key) in categoryMap" :key="key" :value="parseInt(key)" >
              {{val}}
            </a-select-option>
          </a-select>
          <a-input class="search-item" placeholder="请输入名称关键词" v-model="query.nameLike" />
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
          <a href="javascript:;" @click="design(record.id)">设计</a>
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
      title="表单编辑" 
      :destroyOnClose="true"
      :visible="visible"
      :width='800' 
      :bodyStyle="{overflow: 'auto', height: '400px', padding: '8px 24px'}" 
      okText="确定" 
      :okButtonProps="{props: {disabled: disbaledOkBtn}}"
      cancelText="取消"
      @ok="submitForm"
      @cancel="cancelForm"
    >
      <form-info :selectedid="selectedid" @enableOkBtn="enableOkBtn" @closeForm="closeForm" ref="formInfo"/>
    </a-modal>

  </a-layout>
</template>

<script>
import {Layout, Table, Button, Select, Input, Popconfirm, Pagination, Modal} from "ant-design-vue"
import DictSelect from "@/framework/components/DictSelect";
import {listPage, delForm} from "@/workflowsystem/api/form"
import { listCategoryByType } from "@/workflowsystem/api/category";
import { showError} from "@/framework/utils/index";
import FormInfo from './FormInfo';
export default {
  name: "MonitorForm",
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
    FormInfo
  },
  data(){
    return {
      query: {
        namespace: undefined,
        nameLike: undefined,
      },
      columns:[
        {
          title: "序号",
          customRender: (text, record, index) => index + 1,
          width: "2%"
        },
        {
          title: "分类",
          //dataIndex: "categoryVos[0].name",
          dataIndex: "categoryVos",
          width: "5%",
          customRender: this.formatCategory()
          
        },
        {
          title: "名称",
          dataIndex: "name",
          width: "10%",
          customRender: text => <span title={text}>{text}</span>
        },
        {
          title: "页面配置",
          dataIndex: "configs",
          width: "5%"
        },
        {
          title: "适用终端",
          dataIndex: "clientarr",
          width: "5%",
          customRender: this.formatClient()
        },
        {
          title: "操作",
          width: "10%",
          scopedSlots: { customRender: 'action' },
        }
        
      ],
      loading: false,
      pagination: {
        rows: null,
        pagesize: 1,
        pagenum: 10,
        total: 0
      },
      selectedid: null,
      visible: false,
      categoryMap: {},
      disbaledOkBtn: true,
    }
  },
  mounted(){
    this.loadCategory();
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
      listPage(params).then(resp =>{
        this.loading = false;
        this.pagination = resp.result;
        console.log(this.pagination);
      }).catch(err => {
        this.loading = false;
        showError(err);
      })
    },
    loadCategory(){
      //获取分类
      listCategoryByType(2).then(resp => {
        this.refresh();
        let result = resp.result;
        if(result && result.length > 0){
          result.forEach(item => {
            this.categoryMap[item.id] = item.name;
          });
        }
      }).catch(err => showError(err))
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
        //todo
        name: "FormDesign",
        query: {
          id: id
        }
      });
      window.open(href, '_blank');
    },
    onDelete(id) {
      //删除
      delForm(id).then(resp => {
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
    //todo
    submitForm(){
      //提交表单
      this.$refs.formInfo.handleSubmit();
      this.visible = false;
    },
    closeForm(){
      //关闭编辑弹窗
      this.visible = false;
      this.refresh();
    },
    enableOkBtn(){
      //启用确认按钮
      this.disbaledOkBtn = false;
    },
    cancelForm(){
      //取消编辑弹窗
      this.visible = false;
    },
    formatClient(){
      //格式化客户端字段
      return (text, row, index) => {
        let clients = [];
        if(text && text.length > 0){
          text.forEach(item => {
            let v = this.$store.getters.dictKey("workflow.sys.client", item);
            let textValue = (v && v.text) || "";
            clients.push(textValue);
          });
        }
        text = clients.join("、");
        return <span title={text}>{text}</span>;
      }
    },
    formatCategory(){
      //格式化分类字段
      return (text, row, index) => {
        let categorys = [];
        if(text && text.length > 0){
          text.forEach(item => {
            let name = this.categoryMap[item.id] || "";
            categorys.push(name);
          });
        }
        text = categorys.join("、");
        return <span title={text}>{text}</span>;
      }
    }
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