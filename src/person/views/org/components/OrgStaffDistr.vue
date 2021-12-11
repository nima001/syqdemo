<template>
  <div class="org-staff-distr">
    <div>
      <span v-for="(name, index) in orgnames" :key="index"><span v-if="index > 0">、</span>{{name}}</span>
    </div>
    <a-table
      :columns="columns"
      :dataSource="rows"
      rowKey="id"
      :expandedRowKeys="expandedRowKeys"
      :loading="loading"
      @expand="onExpanded"
      :pagination="false"
      size="small"
    >
      <span slot="userNumTitle">
        实有人数
        <a-tooltip placement="bottom" v-if="category=='job'">
          <span slot="title">“+” 表示双肩挑人数<br/>“-” 表示不占用指标人数</span>
          <a-icon type="exclamation-circle" theme="filled" class="usernum-tooltip"/>
        </a-tooltip>
      </span>
    </a-table>
  </div>
</template>
<script>
import { listOrgDistrItem, listSameDistrOrgs } from "@/person/api/org";
import { showError } from "@/framework/utils/index";
import { Table, Tooltip, Icon } from "ant-design-vue";
export default {
  props: {
    category: String,
    orgid: String
  },
  components: {
    ATable: Table,
    ATooltip: Tooltip,
    AIcon: Icon,
  },
  data() {
    return {
      columns: [
        { 
          title: this.category == 'staff' ? "编制名称" : (this.category == 'post' ? '职数名称' : "岗位名称"),
          dataIndex: "name" 
        },
        {
          title: this.category == 'staff' ? "编制数" : (this.category == 'post' ? '职数' : "岗位数"),
          width: "20%",
          customRender: this.getCount
        },
        { 
          slots: { title: 'userNumTitle' },
          width: "20%",
          customRender: this.getUserNum
        },
        { 
          title: (this.category == 'job' ? "超缺（-）岗" : "超缺（-）编"), 
          width: "20%",
          customRender: this.getOutnum
        }
      ],
      loading: true,
      rows: null,
      expandedRowKeys: [],
      orgnames: undefined
    };
  },
  created() {
    this.loadDistr(this.params);
  },
  computed: {
    params() {
      return {
        id: this.orgid,
        category: this.category
      };
    }
  },
  watch: {
    params(params) {
      this.loadDistr(params);
    }
  },
  methods: {
    getCount(row){
      let count = (row.count || 0) + (row.change || 0), ext = row.otherdata;
      if(ext && ext.extcount && ext.extcount.length){
        ext.extcount.forEach(item => {
          if(item.count > 0){
            count += item.condition + item.count;
          }
        })
      }
      return count;
    },
    getUserNum(row){
      let count = row.usernum || 0, ext = row.otherdata;
      if(ext && ext.extusernum && ext.extusernum.length){
        ext.extusernum.forEach(item => {
          if(item.count > 0){
            count += item.condition + item.count;
          }
        })
      }
      return count;
    },
    getOutnum(row){
      let expr = this.getUserNum(row) + '-(' + this.getCount(row) + ')';
      return eval(expr);
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
    loadDistr(params) {
      this.loading = true;
      this.orgnames = undefined
      if(params.category == 'job'){
        listSameDistrOrgs(params.id).then(({result}) => {
          this.orgnames = result;
        });
      }
      listOrgDistrItem(params.id, params.category).then(resp => {
        this.loading = false;
        this.rows = resp.result;
        this.expandedRowKeys = this.getParentIds(resp.result);
      }).catch(err => {
        this.loading = false;
        this.rows = [];
        this.expandedRowKeys = [];
        showError(err);
      });
    },
    getParentIds(list){
      let ids = [];
      (list || []).forEach(item => {
        if(item.children){
          ids.push(item.id);
          let sub = this.getParentIds(item.children);
          if(sub && sub.length){
            ids = ids.concat(sub);
          }
        }
      });
      return ids;
    }
  },
};
</script>
<style lang="less">
.org-staff-distr {
  height: 100%;
  overflow-y: auto;
  padding: @content-padding-v @content-padding-h;
  .ant-table {
    border: none;
    .ant-table-thead th {
      font-weight: bold;
    }
  }
  .usernum-tooltip{
    color: @primary-color;
  }
}
</style>