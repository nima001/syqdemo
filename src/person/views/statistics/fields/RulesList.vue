<template>
  <a-layout :style="{ height: '100%' }">
    <a-layout-content class="layoutcontent">
      <div class="contentbox">
        <div class="topbox">
          <div class="leftbox">
            <a-button icon="plus" type="primary" @click="newadd">新增</a-button>
            <a-button icon="delete" type="primary" :style="{ marginLeft:'8px' }" @click="fielddelete">删除</a-button>
          </div>
          <div class="rightbox">
            <ul>
              <li>
                <a-select :style="{ width:'160px' }" placeholder="选择统计对象" :value="searchdata.target.id" @change="targetChange" :allowClear="true">
                    <a-select-option v-for="(item,index) in targetlist" :key="index" :value="item.id" >{{item.title}}</a-select-option>
                </a-select>
              </li>
              <li>
                <a-input :style="{ width:'160px',cursor:'pointer' }" placeholder="选择字段" @focus="blur($event)" :allowClear="true" @click.stop="searchVisible = true" v-model="searchdata.field.name"/>
              </li>
              <li>
                <a-input allow-clear placeholder="输入字段编码" :style="{ width:'200px' }" v-model="searchdata.searchKey"/>
              </li>
              <li>
                <a-button type="primary" @click="onSearch">搜索</a-button>
                <a-button :style="{ marginLeft:'8px' }" @click="onreset">重置</a-button>
              </li>
            </ul>
          </div>
        </div>
        <div class="tablecount">
          <a-table rowKey="id" :row-selection="{selectedRowKeys,onChange:onSelectChange}" :customRow="customRow" :loading="loading" :columns="columns"  :dataSource="pagination.rows" :pagination="false">
            <span slot="action" class="operation" slot-scope="text, record">
              <a @click.stop="edit(record)">编辑</a>
            </span>
          </a-table>
        </div>
        <div class="footer">
          <a-pagination v-if="pagination.rows.length > 0" showSizeChanger :showTotal="(total) => `总共：${total}条`"
             :total="pagination.total" v-model="pagination.pagenum" :page-size="pagination.pagesize" @change="onPageChange" @showSizeChange="showSizeChange"
          />
        </div>
      </div>
    </a-layout-content>
    <rules-change v-if="visible" v-model="visible" ref="rulesChange" :record="record" :targetlist="targetlist" :modelList="modelList" @finish="onEditFinish"/>
    <search-list  :searchModel="searchModel" :visible="searchVisible" @finish="callBack"/>
  </a-layout>
</template>
<script>
import { Layout, Pagination, Select, Table, Button, Input, Modal} from "ant-design-vue";
import RulesChange from "./components/RulesChange";
import SearchList from "./components/SearchList";
import { fieldsearch, fieldtarget, deletefield, fieldmodel, getField,  getExpression, deleteExpression,expression } from "@/person/api/field";
import { showError } from "@/framework/utils/index";
export default {
  name: "StatisticsList",
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    APagination: Pagination,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    AButton: Button,
    AInput: Input,
    RulesChange,
    SearchList,
    AModal: Modal,
  },
  data() {
    return {
      visible: false,
      searchVisible:false,
      record: {},
      selectedRowKeys: [],
      searchdata: {
        target: {},
        searchKey: null,
        field:{},
        model:undefined
      },
      showEditTemp: false,
      columns: [
        {
          title: "序号",
          width: "100px",
          customRender: (text, record, index) => `${index + 1}`,
        },
        {
          title: "字段",
          dataIndex: "field.name"
        },
        {
          title: "统计对象",
          dataIndex: "targetid",
          customRender: (target) => {
            let t = this.targetlist.find(item => item.id == target);
            return t && t.title;
          }
        },
        {
          title: "启用",
          dataIndex: "enable",
          customRender: (enable) => (enable ? "启用" : "禁用"),
        },
        {
          title: "操作",
          width: "150px",
          scopedSlots: { customRender: "action" },
        },
      ],
      loading: false,
      pagination: {
        rows:[],
        pagesize: 20,
        pagenum: 1,
        total: 0,
      },
      targetlist: [],
      modelList: [],
      fieldList:[],
    };
  },
  watch:{
    'searchdata.field.name':{
      handler(v){
        if( v == ''){
          this.searchdata.field = {}
        }
      }
    }
  },
  computed:{
    searchModel(){
      let t = this.targetlist.find((item) => item.id == this.searchdata.targetid);
      if(t){
        return t.namespace
      }
    },
  },
  created() {
    this.init();
    this.gettarget();
    this.getModel();
    this.getFieldList();
    this.loadData();
  },
  methods: {
    onSelectChange(selectedRowKeys){
      this.selectedRowKeys = selectedRowKeys
    },
    // 点击行选中
    customRow(row,index){
      return {
        on: {
          click: () => {
            let rowKeys = this.selectedRowKeys
            if(rowKeys.length>0 && rowKeys.includes(row.id)){
              rowKeys.splice(rowKeys.indexOf(row.id),1)
            }else{
              rowKeys.push(row.id)
            }
            this.selectedRowKeys = rowKeys; 
          }
        }
      };
    },
    targetChange(value){
      let target = this.targetlist.find((item) => item.id == value);
      this.searchdata.target = target || {};
   },
    callBack(res){
      if(res.type == 'ok'){
        this.searchdata.field = res.data
      }
      this.searchVisible = false;
    },
    blur(e){
      e.target.blur()
    },
    init(){
      if(this.$route.params.field){
        this.searchdata.field = this.$route.params.field
      }
      if(this.$route.params.target){
        this.searchdata.target = this.$route.params.target;
      }
    },
    //删除
    fielddelete() {
      let that = this;
      if (this.selectedRowKeys.length > 0) {
        let data = this.selectedRowKeys;
        this.$confirm({
          title: "确认删除该行数据?",
          onOk() {
            deleteExpression(data)
              .then((res) => {
                that.$notification.success({
                  message: "提示",
                  description: "删除成功!",
                  duration: 3,
                });
                that.selectedRowKeys = [];
                that.getresh();
              })
              .catch((err) => {
                showError(err);
              });
          },
        });
      } else {
        this.$notification.warning({
          message: "提示",
          description: "请选择要删除的内容!",
          duration: 3,
        });
      }
    },
    edit(record) {
      expression(record.id).then(res=>{
        this.record = {type:'edit',...res.result}
        this.visible = true;
      }).catch(err=>{
        showError(err)
      })
    },
    //获取文件列表
    getresh() {
      this.pagination.pagenum = 1;
      this.loadData();
    },
    //带参查询
    onSearch() {
      this.pagination.pagenum = 1;
      this.loadData();
    },
    onPageChange(page, pagesize) {
      this.pagination.pagenum = page;
      this.loadData();
    },
    showSizeChange(current, pagesize) {
      this.pagination.pagenum = 1;
      this.pagination.pagesize = pagesize;
      this.loadData();
    },
    loadData() {
      let data = {
        needtotal:true,
        targetid: this.searchdata.target.id,
        code:  this.searchdata.field.code,
        pagenum:this.pagination.pagenum,
        pagesize:this.pagination.pagesize
      };
      this.loading = true;
      getExpression(data).then(res=>{
        this.loading = false;
        this.pagination = res.result;
      }).catch((err) => {
          showError(err);
      });
    },
    getFieldList(){
      getField().then(res=>{
        this.fieldList = res.result
      }).catch((err) => {
          showError(err);
      });
    },
    gettarget() {
      fieldtarget().then((res) => {
          this.targetlist = res.result;
        }).catch((err) => {
          showError(err);
        });
    },
    getModel(){
      fieldmodel().then(res=>{
        this.modelList = res.result
      }).catch((err) => {
          showError(err);
      });
    },
    newadd() { 
      this.record = {type:'add',field:this.searchdata.field,target:this.searchdata.target}
      this.visible = true;
    },
    onreset() {
      this.searchdata = {
        target: {},
        searchKey: null,
        field:{},
        model:undefined
      };
      this.selectedRowKeys = [];
      this.pagination.pagenum = 1;
      this.loadData();
    },
    onEditFinish(data) {
      this.visible = false;
      this.getresh();
    },
  },
};
</script>
<style lang="less" scoped>
.layoutcontent {
  height: 100%;
  padding: @layout-space-base;
  .contentbox {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: white;
    padding-top: @layout-space-base;
    .topbox {
      padding: @content-padding-v @content-padding-h;
      width: 100%;
      height: auto;
      .leftbox {
        float: left;
      }
      .rightbox {
        float: right;
        ul {
          margin: 0;
          white-space: nowrap;
          li {
            display: inline-block;
            margin-left: 8px;
            white-space: nowrap;
            &:first-child{
              margin-left: 0px;
            }
            /deep/ input{
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .tablecount {
    padding: 0 @content-padding-h;
    flex-shrink: 1;
    min-height: 0;
    overflow-y: auto;
    margin-top: @layout-space-base;
    /deep/.ant-table-body{
      /deep/ tr{
        cursor: pointer;
      }
    }
    .operation {
      a {
        margin-right: 15px;
        &:hover {
          text-decoration: underline;
        }
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