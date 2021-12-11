<template>
  <div class="add-orgdistr-category" ref="addOrgdistrCategory">
    <div class="top-btn">
      <div class="left">
        <a-input 
          v-model="tempname"
          placeholder="请填写模板名字"
          class="operaname"
          style="width: 200px">
        </a-input>
      </div>
      <div class="right">
        <a-select 
          showSearch
          style="width: 200px"
          :allowClear="true"
          placeholder="--选择已有模板--" 
          optionFilterProp="children"
          @change="handleChange"
          >
          <a-select-option 
            v-for="it in tempnameList" 
            :key="it.id"
            :value="it.id"
            >
            {{it.name}}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="table_warp">
      <a-table
        :loading="loading"
        :columns="columns"
        :dataSource="datalist"
        :pagination="false"
        :rowKey="row=>row.id"
        :customRow="customRow"
        >
        <!-- @expand="expandChildlist"
        :expandedRowKeys="expandedRowKeys" -->
        <span slot="action" class="operation" slot-scope="text, record, index">
          <a @click="editItem(text, record, index)">添加子项</a>
          <a @click="deleteItem(text, record, index)">删除</a>
          <a @click="upIndex(text, record, index)"><a-icon type="up" /></a>
          <a @click="downIndex(text, record, index)"><a-icon type="down" /></a>
        </span>
      </a-table>
      <a-button type="dashed" @click="add" style="width: 100%;margin: 6px 0;">
        <a-icon type="plus"/> 添加项
      </a-button>
    </div>
    <a-modal
      class="add-items"
      v-model="showAdditems"
      title="添加项"
      centered
      :width="500"
      :bodyStyle="{ height: '300px'}"
      :getContainer="() => this.$refs.addOrgdistrCategory"
      @ok="addItems"
      >
      <add-temp-items ref="addTempItems"></add-temp-items>
    </a-modal>
  </div>
</template>

<script>
import { Form, Col, Row, Input, DatePicker, Select, Icon, Button, Table, Modal } from "ant-design-vue";
import { addOrgdistrCategory, getOrgdistrTemplist, getTempitems, addOrgdistrTemp } from "@/person/api/orgRecord";
import { showError } from "@/framework/utils/index";
import DictSelect from "@/framework/components/DictSelect";
import AddTempItems from "./AddTempItems";
export default {
  props: ["tempnameList"],
  components: {
    AForm: Form,
    AFormItem: Form.Item,
    ACol: Col,
    ARow: Row,
    AInput: Input,
    ADatePicker: DatePicker,
    ASelect: Select,
    AIcon: Icon,
    ASelectOption: Select.Option,
    AButton: Button,
    ATable: Table,
    AModal: Modal,
    DictSelect,
    AddTempItems
  },
  data() {
    return {
      tempname: "",
      showAdditems: false,
      tempList: [],
      loading: false,
      columns: [
        { 
          title: "name",
          dataIndex: "name"
        },
        { 
          title: "field",
          dataIndex: "field"
        },
        { 
          title: "condition",
          dataIndex: "condition"
        },
        {
          title: "操作",
          width: "20%",
          scopedSlots: { customRender: "action" }
        }
      ],
      datalist: [],
      expandedRowKeys: [],
      selectedRow: {},
      isItem: false
    }
  },
  created() {
  },
  methods: {
    add() {
      this.showAdditems = true;
      this.isItem = false;
    },
    handleChange(val) {
      if(val) {
        this.loading = true;
        getTempitems(val)
        .then(res => {
          this.loading = false;
          this.datalist = res.result;
        })
        .catch(err => {
          this.loading = false;
          showError(err);
        })
      }
    },
    editItem(text, record, index) {
      this.showAdditems = true;
      this.isItem = true;
    },
    doDelete(arr, id) {
      for(var i = arr.length; i > 0; i--) {// Todo 子级只有一项删除时 +号没消失
        if(arr[i-1].id == id) {//一级数据
          arr.splice(i-1, 1);
        }else{
          if(arr[i-1].children) {//二级以下 递归删除
            this.doDelete(arr[i-1].children, id);
          }
        }
      }
    },
    doUp(arr, record) {
      for(let i = 0; i < arr.length; i++) {
        if(arr[i].id == record.id) {
          let curIndex = arr.indexOf(record);
          if(curIndex != 0){
            arr[curIndex] = arr.splice(curIndex-1, 1, arr[curIndex])[0];
          }else{
            // arr.push(arr.shift());
            return
          }
        }else{
          if(arr[i].children) {
            this.doUp(arr[i].children, record);
          }
        }
      }
    },
    doDown(arr, record) {
      for(let i = 0; i < arr.length; i++) {
        if(arr[i].id == record.id) {
          let curIndex = arr.indexOf(record);
          let lastIndex = arr.length - 1;
          if(curIndex != lastIndex){
            arr[curIndex] = arr.splice(curIndex+1, 1, arr[curIndex])[0];
          }else{
            return
          }
        }else{
          if(arr[i].children) {
            this.doDown(arr[i].children, record);
          }
        }
      }
    },
    deleteItem(text, record, index) {
      this.doDelete(this.datalist, record.id);
    },
    upIndex(text, record, index) {
      this.doUp(this.datalist, record);
    },
    downIndex(text, record, index) {
      this.doDown(this.datalist, record);
    },
    expandChildlist(expanded, record) {
      if(expanded) {
        this.expandedRowKeys.push(record.id);
      }else{
        this.expandedRowKeys.splice(
          this.expandedRowKeys.findIndex(item => item == record.id),
          1
        )
      }
    },
    async addItems() {
      try {
        let data = await this.$refs.addTempItems.getFormValue();
        this.showAdditems = false;
        if(this.isItem) {
          let record = this.selectedRow;
          if(record.children) {
            record.children.push(data);
          }else{
            this.$set(record, "children", []);
            record.children.push(data);
          }
        }else{
          this.datalist.push(data);
        }
      } catch (error) {
        showError(error);
      }
    },
    customRow(row){
      return {
        on: {
          click: () => {
            this.selectedRow = row;
          }
        }
      };
    },
  }
}
</script>

<style lang="less" scoped>
.add-orgdistr-category{
  height: 100%;
  display: flex;
  flex-direction: column;
  .top-btn {
    padding: @content-padding-v @content-padding-h;
    margin-top: 10px;
    .left {
      float: left;
    }
    .right {
      float: right;
    }
  }
  .table_warp{
    flex: auto;
    min-height: 0;
    overflow: auto;
    padding: @content-padding-v @content-padding-h;
    /deep/.ant-table-tbody {
      td,
      th {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      td{
        .operaname{
          margin-right: 10px;
        }
        .operation{
          a{
            display: inline-block;
            margin-right: 10px;
          }
        }
      }
    }
  }
  // .add-items{
    /deep/.ant-modal-body{
      padding: @content-padding-v @content-padding-h;
    }
  // }
}
</style>