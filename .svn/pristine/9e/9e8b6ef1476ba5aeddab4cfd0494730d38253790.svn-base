<template>
  <a-table
    class="record-staff-distr"
    :columns="columns"
    :dataSource="dataList"
    rowKey="id"
    :expandedRowKeys="expandedRowKeys"
    :loading="loading"
    @expand="onExpanded"
    :pagination="false"
  >
    <template slot="count" slot-scope="value, record">
      <a-input-number v-if="!record.children"
        style="margin: -5px -11px"
        :defaultValue="value"
        @change="e => updateCount(e, record)"
      />
      <template v-else>{{ value }}</template>
    </template>
    <template slot="change" slot-scope="value, record">
      <a-input-number v-if="!record.children"
        style="margin: -5px -11px"
        :defaultValue="value"
        @change="e => updateChange(e, record)"
      />
      <template v-else>{{ value }}</template>
    </template>
    <template slot="result" slot-scope="data">
      {{ data.count + data.change }}
    </template>
  </a-table>
</template>
<script>
import { Table, InputNumber } from "ant-design-vue";
import { getOrgDistr } from "@/person/api/org";
import { showError } from "@/framework/utils/index";

export default {
  props: {
    category: String,
    record: Object,
  },
  components: {
    ATable: Table,
    AInputNumber: InputNumber,
  },
  data() {
    return {
      columns: [
        { title: this.category == 'staff' ? "编制名称" : (this.category == 'post' ? '职数名称' : "岗位名称"), dataIndex: 'name' },
        { title: '调整前', dataIndex: "data.count", width: "20%", scopedSlots: { customRender: 'count' } },
        { title: "调整值", dataIndex: "data.change", width: "20%", scopedSlots: { customRender: 'change' } },
        { title: "调整后", dataIndex: "data", width: "20%", scopedSlots: { customRender: 'result' } }
      ],
      loading: false,
      propKey: this.category + 'num',
      dataList: null,
      expandedRowKeys: []
    };
  },
  created() {
    this.loadDistr();
  },
  destroyed(){
    //控件销毁清除控件关联的字段
    this.record[this.propKey] = undefined;
  },
  computed: {
    unittype() {
      if(this.record.data){
        return this.record.data.unittype;
      }
    }
  },
  watch: {
    unittype(newValue, oldValue) {
      if(this.unittype){
        //延时500毫秒避免卡顿
        this.loading = true;
        setTimeout(() => {
          this.loadDistr();
        }, 500);
      }
    },
    record(){
      this.loadDistr();
    }
  },
  methods: {
    updateCount(value, item){
      if(typeof value !== 'number'){
        return;
      }
      let c = value - item.data.count;
      item.data.count = value;
      if(c != 0){
        while(item.parent){
          item = item.parent;
          item.data.count += c; 
        }
      }
      this.dataList = [...this.dataList];
    },
    updateChange(value, item){
      if(typeof value !== 'number'){
        return;
      }
      let c = value - item.data.change;
      item.data.change = value;
      if(c != 0){
        while(item.parent){
          item = item.parent;
          item.data.change += c;
        }
      }
      this.dataList = [...this.dataList];
    },
    onExpanded(expanded, record) {
      if (expanded) {
        this.expandedRowKeys.push(record.id);
      } else {
        this.expandedRowKeys.splice(
          this.expandedRowKeys.findIndex(item => item == record.id),
          1
        );
      }
    },
    loadDistr() {
      let {orgid, docid} = this.record;
      if(!docid || (!this.unittype && !orgid)){
        return;
      }
      this.loading = true;
      getOrgDistr({
        category: this.category,
        orgid, docid, 
        value: this.unittype
      }).then(({result}) => {
        let list = [], parentKeys = [];
        this.loading = false;
        this.dataList = this.convertItems(undefined, result.items, list, parentKeys);
        this.record[this.propKey] = {
          ...result,
          items: list
        };
        this.expandedRowKeys = parentKeys;
      }).catch(err => {
        this.loading = false;
        this.dataList = [];
        this.expandedRowKeys = [];
        showError(err);
      });
    },
    convertItems(parent, items, list, parentKeys){
      if(!items){
        return;
      }
      return items.map(e => {
        let item = {
          id: e.id,
          name: e.name,
          parent,
          data: {
            id: e.id,
            count: e.count || 0,
            change: e.change || 0
          }
        }
        item.children = this.convertItems(item, e.children, list, parentKeys)
        list.push(item.data);
        if(item.children){
          parentKeys.push(item.id);
        }
        return item;
      })
    }
  },
};
</script>