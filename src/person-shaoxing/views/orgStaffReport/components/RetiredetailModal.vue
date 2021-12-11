<template>
  <div>
    <a-modal
      class="modalbody"
      title="退休人数预报"
      :width="800"
      :visible="showModal"
      :footer="null"
      @cancel="handleCancel"
    >
      <a-table
        :pagination="false"
        :loading="loading"
        :columns="columndata"
        :dataSource="data"
        :scroll="{ y: 510 }"
      >
        <div :class="['cell', {'enable': text}]" slot="year" slot-scope="text, record" @click="cell(text, record)">{{text?text.num:0}}</div>
      </a-table>
    </a-modal>
    <a-modal
      title="具体退休人员"
      :width="800"
      :footer="null"
      centered
      :bodyStyle="{height: '495px'}"
      :visible="showDetailModal"
      @cancel="()=>{showDetailModal=false;showModal=true;}"
    >
      <a-table
        rowKey="id"
        :pagination="false"
        :columns="detailcolumn"
        :dataSource="detaildata"
        :scroll="{ y: 405 }"
      ></a-table>
    </a-modal>
  </div>
</template>

<script>
import { Modal, Table } from "ant-design-vue";
import { showError } from "@/framework/utils";
import { assign, cloneDeep, orderBy } from 'lodash';
import { orgReport } from '@/person-shaoxing/api/orgStaffReport'
export default {
  props: {
    visible: {//弹窗是否显示
      type: Boolean,
    },
    district: {//地区
      type: Object,
    },
    columns: {//表头
      type: Array,
    },
    name: {//序列名称
      type: String,
    }
  },
  components: {
    AModal: Modal,
    ATable: Table,
  },
  data() {
    return {
      data: [],
      loading: false,
      columndata: [],
      detailcolumn: [
        {
          title: '机构名称',
          dataIndex: 'org',
        },{
          title: '年份',
          dataIndex: 'year',
        },{
          title: '姓名',
          dataIndex: 'user',
        }
      ],
      detaildata: [],
      showModal: false,
      showDetailModal: false,
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (val) {
          this.retireorgReport();
          this.showModal = val;
        }
      }
    },
    columns: {
      immediate: true,
      handler(val) {
        this.columndata = cloneDeep(val);
        this.columndata.forEach((item, index)=> {
          if(index>0) {
            this.columndata[index]['scopedSlots'] = { customRender: "year" };
          }else if(index === 0) {
            this.columndata[index]['width'] = '60%';
          }
        });
      }
    }
  },
  methods: {
    cell(text, record) {
      if(text) {
        this.detaildata = [];
        record[text.year].user.forEach((item, index)=>{
          let data = {id: index, org: record[text.year].org, year: record[text.year].year, user: item.username};
          this.detaildata.push(data);
        });
        this.showModal = false;
        this.showDetailModal = true;
      }
    },
    handleCancel() {
      if (this.showModal) {
        this.showModal = false;
        this.data = [];
        this.$emit("handleCancel");
      }
    },
    retireorgReport() {
      this.loading = true;
      orgReport({district: this.district.district,searchkey: this.name}).then(({result})=>{
        let orgs = [];
        result.rows.forEach((item)=> {
          Object.keys(item.org).forEach((orgItem)=> {
            let obj = {};
            let arr = orgs.filter((nameItem)=>nameItem.name===orgItem);
            if(!arr.length) {
              obj['name'] = orgItem;
              obj['key'] = orgItem;
              obj['index'] = item.org[orgItem][0]['orgindex'];
              obj[item['k0']] = {num:item.org[orgItem][0]['num'], year: item['k0'], org: orgItem, user: item.org[orgItem][0]['user']};
              orgs.push(obj);
            }else{
              obj['index'] = item.org[orgItem][0]['orgindex'];
              obj[item['k0']] = {num:item.org[orgItem][0]['num'], year: item['k0'], org: orgItem, user: item.org[orgItem][0]['user']};
              let index = orgs.indexOf(arr[0]);
              if(index>=0) {
                assign(orgs[index], obj);
              }
            }
          });
        });
        this.data = orderBy(orgs,'index','asc');
      }).catch((err)=>{
        showError(err);
      }).finally(()=>{
        this.loading = false;
      });
    }
  },
};
</script>
<style lang="less" scoped>
.modalbody /deep/.ant-modal-body {
  height: 600px;
  // display: flex;
  .ant-table-wrapper,.ant-spin-nested-loading {
    display: flex;
    .ant-spin-container {
      display: flex;
      flex-direction: column;
      .ant-table.ant-table-fixed-header {
        flex: 1;
        td:first-child {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .cell.enable {
          transition: all .3s;
          cursor: pointer;
          &:hover {
            color: @primary-color;
          }
        }
        .ant-table-placeholder {
          border-bottom: 0;
        }
      }
    }
  }
}
</style>
