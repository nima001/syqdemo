<template>
  <a-modal :visible="visible" title="选择字段编码" :width="800" 
    :bodyStyle="{ overflow: 'auto', height: '550px', padding: '10px 24px',display:'flex',flexDirection:'column' }"
    destroyOnClose @ok="onOk" @cancel="onCancel">
        <div class="topbox">
            <ul :style="{marginLeft:'8px'}">
            <li>     
              <a-button type="primary" @click="onSearch">搜索</a-button>
              <a-button :style="{ marginLeft:'8px' }" @click="onreset">重置</a-button></li>
          </ul>
          <ul>
            <li>
              <a-select :style="{ width:'160px' }" placeholder="选择统计对象" v-model="searchdata.targetid" :allowClear="true">
                <a-select-option v-for="(item,index) in targetlist" :key="index" :value="item.id">{{item.title}}</a-select-option>
              </a-select>
            </li>
            <li>
              <a-select :style="{ width:'160px' }" placeholder="选择字段分类" v-model="searchdata.sort" :allowClear="true">
                <a-select-option v-for="(item,index) in fieldList" :key="index" :value="item">{{item}}</a-select-option>
              </a-select>
            </li>
            <li>
              <a-input allow-clear placeholder="输入字段名称或编码" :style="{ width:'200px' }" :allowClear="true" v-model="searchdata.searchKey"/>
            </li>
          </ul>
        </div>
        <div class="tablecount">
          <a-table rowKey="id"   
          :customRow="customRow" 
          :rowClassName="(row) => selectedRow.id == row.id ? 'selected': ''"
          :loading="loading" :columns="columns" :dataSource="pagination.rows" :pagination="false"></a-table>
        </div>
        <div class="footer">
          <a-pagination v-if="pagination.rows && pagination.rows.length" :page-size="pagination.pagesize" showSizeChanger :showTotal="(total) => `总共：${total}条`"
            @showSizeChange="onShowSizeChange" :total="pagination.total" v-model="pagination.pagenum" @change="onPageChange"
          />
        </div>
  </a-modal>
</template>
<script>
import {Pagination, Select, Table, Button, Input,Modal} from "ant-design-vue";
import { fieldsearch, fieldtarget, fieldmodel, getField } from "@/person/api/field";
import { showError } from "@/framework/utils/index";
export default {
  name: "StatisticsList",
  components: {
    APagination: Pagination,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    AButton: Button,
    AInput: Input,
    AModal:Modal
  },
  props: {
    searchModel: {
      type: String,
    },
    visible:{
      type:Boolean,
      default:()=>{
        return false
      }
    }
  },
  data() {
    return {
      selectedRow:{},
      searchdata: {
        type: undefined,
        targetid: undefined,
        searchKey: null,
        sort:undefined
      },
      columns: [
        {
          title: "序号",
          width: "50px",
          customRender: (text, record, index) => `${index + 1}`,
        },
        {
          title: "字段名称",
          dataIndex: "name"
        },
        {
          title: "字段编码",
          dataIndex: "code"
        },
        {
          title: "统计模型",
          dataIndex: "model",
          customRender: (target) => {
            let t = this.modelList.find((item) => item.namespace == target);
            return t && t.name;
          },
        },
        {
          title: "字段分类",
          dataIndex: "sort"
        },
      ],
      loading: false,
      pagination: {
        rows: null,
        pagesize: 20,
        pagenum: 1,
        total: 0,
      },
      targetlist: [],
      modelList: [],
      fieldList:[]
    };
  },
  created() {
    this.getresh();
    this.gettarget();
    this.getModel();
    this.getFieldList();
  },
  methods: {
    onOk(){
      if(this.selectedRow.code){
        this.$emit('finish',{type:'ok',data:this.selectedRow})
      }else{
        this.$emit('finish',{type:'cancel'})
      }
    },
    onCancel(){
      this.$emit('finish',{type:'cancel'})
    },
    customRow(row,index){
      return {
        on: {
          click: () => {
            this.selectedRow = row;
            this.$emit("codeValue",row)
          }
        }
      };
    },
    //获取文件列表
    getresh() {
      let { pagenum, pagesize } = this.pagination;
      this.loadData(pagenum, pagesize);
    },
    //带参查询
    onSearch() {
      this.loadData(1, this.pagination.pagesize);
    },
    onPageChange(page, pagesize) {
      this.loadData(page, pagesize);
    },
    onShowSizeChange(current, size) {
      this.loadData(1, size);
    },
    loadData(pagenum, pagesize) {
      let params = {
        ...this.searchdata,
        model:this.searchModel,
        needtotal: true,
        pagenum,
        pagesize,
      };
      this.loading = true;
      fieldsearch(params)
        .then((res) => {
          this.loading = false;
          this.pagination = res.result;
        })
        .catch((err) => {
          this.loading = false;
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
    onreset() {
      this.searchdata = { input: {} };
      this.selectedRow = {};
      this.loadData(1, this.pagination.pagesize);
    }
  },
};
</script>
<style lang="less" scoped>
  .topbox {
      padding: @content-padding-v 0px;
      width: 100%;
      height: auto;
      ul {
        margin: 0;
        float: right;
        li {
          display: inline-block;
          margin-left: 8px;
          white-space: nowrap;
          &:first-child{
            margin-left: 0px;
          }
        }
      }
    }
  .tablecount {
    flex-shrink: 1;
    min-height: 0;
    overflow-y: auto;
    margin-top: @layout-space-base;
    /deep/.ant-table-body{
      tr{
        cursor: pointer;
        &.selected{
          background: @primary-2;
        }
      }
    }
  }
  .footer {
    padding: @content-padding-v 0px;
    margin-top: 10px;
    .ant-pagination {
      float: left;
    }
  }
</style>