<template>
  <a-layout class="org-distr">
    <div class="content">
      <div class="table-wrap">
        <a-table 
          :columns="columns" 
          :data-source="data"
          :loading="loading"
          :rowKey="row=>row.id"
          @expand="expandChildlist"
          :expandedRowKeys="expandedRowKeys"
          :pagination="false">

            <template slot="opt" slot-scope="data">
              <a @click="editTemp(data)">编辑</a>
              <!-- <a>删除</a> -->
            </template> -->

            <a-table
              class="inner-table"
              slot="expandedRowRender"
              :columns="innerColumns"
              :data-source="innerData"
              :pagination="false">
              
                <!-- <template slot="innerOpt" slot-scope="data">
                  <a>查看历史</a>
                </template> -->
                
            </a-table>

        </a-table>
      </div>
    </div>
    <a-modal
      v-model="showEditTemp"
      title="编辑模板"
      :width="800"
      :destroyOnClose="true"
      @ok="updateTemp"
      :bodyStyle="{height: '520px', padding: 0, overflow: 'hidden'}">
        <edit-org-distr ref="editOrgdistr" :record="record"></edit-org-distr>
    </a-modal>
  </a-layout>
</template>

<script>
import { Layout, Table, Button, Modal, DatePicker, Input, Select, Form } from "ant-design-vue";
import { getCategoryList, addOrgdistrCategory, getOrgdistrTemplist } from "@/person/api/orgRecord";
import { showError } from "@/framework/utils/index";
import EditOrgDistr from './EditOrgDistr';
import DictSelect from "@/framework/components/DictSelect";
export default {
  data() {
    return{
      data: [
      ],
      columns: [
        {
          title: '名称', dataIndex: 'name', width: '25%'
        },
        {
          title: '编码', dataIndex: 'code', width: '25%'
        },
        {
          title: '单位类型', dataIndex: 'dict', width: '25%'
        },
        { 
          title: '操作', scopedSlots: { customRender: 'opt'}, width: '25%' 
        },
      ],
      innerColumns: [
        { title: 'value（值）', dataIndex: 'innerval', customRender: (text, row) => this.dictVal(text, row), width: '25%' },
        { title: '生效时间', dataIndex: 'starttime', customRender: (text) => (text ? text.substr(0, 10) : '-'),  width: '25%' },
        { title: '失效时间', dataIndex: 'endtime', customRender: (text) => (text ? text.substr(0, 10) : '-'), width: '25%' },
        { title: '模板名称', dataIndex: 'tempname', width: '25%' },
        // { title: '操作', scopedSlots: { customRender: 'innerOpt'}, width: '20%' },
      ],
      innerData: [
      ],
      loading: false,
      showAddTemp: false,
      showEditTemp: false,
      expandedRowKeys: [],
      record: {},
    }
  },
  components: {
    ALayout: Layout,
    ATable: Table,
    AButton: Button,
    AModal: Modal,
    ADatePicker: DatePicker,
    AInput: Input,
    ASelect: Select,
    ASelectOption: Select.Option,
    AForm: Form,
    AFormItem: Form.Item,
    EditOrgDistr,
    DictSelect
  },
  created() {
    this.loadData();
  },
  methods: {
    dictVal(text, data){
      let d = this.$store.getters.dictKey("usermanage.org.unittype", data.value);
      return d && d.text;
    },
    loadData() {
      this.loading = true;
      getCategoryList()
      .then(res => {
        this.loading = false;
        this.data = res.result;
      })
      .catch(err => {
        showError(err);
      })
    },
    expandChildlist(expanded, record) {
      if(expanded) {
        this.expandedRowKeys = [record.id];
        let i = 0;
        (record.values || []).forEach(item => {
          i ++;
          item.index = i;
        })
        this.innerData = record.values;
      }else{
        this.expandedRowKeys.splice(
          this.expandedRowKeys.findIndex(item => item == record.id),
          1
        )
      }
    },
    editTemp(data) {
      this.record = data;
      this.showEditTemp = true;
    },
    async updateTemp() {
      try {
        let data = await this.$refs.editOrgdistr.getFormValue();
        data.id = this.record.id;
        await addOrgdistrCategory(data)
        .then(res => {
          this.loadData();
          this.showEditTemp = false;
        })
      } catch (error) {
        showError(error);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.org-distr{
  height: 100%;
  padding: 10px;
  .content{
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    overflow: hidden;
    padding-top: 10px;
    background-color: @white;
    height: 100%;
    .top-btn {
      display: flex;
      padding: @content-padding-v @content-padding-h;
      margin: 0;
      .left {
        float: left;
      }
      .right {
        float: right;
      }
    }
    .table-wrap{
      flex-shrink: 1;
      overflow-y: auto;
      padding: @content-padding-v @content-padding-h;
      /deep/.ant-table-tbody {
        td,
        th {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        td{
          a{
            margin-right: 10px;
          }
        }
        .inner-table{
          tr.selected{
            background: @primary-2;
          }
        }
      }
    }
  }
}
</style>