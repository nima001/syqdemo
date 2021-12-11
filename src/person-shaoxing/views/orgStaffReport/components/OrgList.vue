<template>
  <div class="wrapper">
    <div class="header">
      <div class="left"></div>
      <div class="right">
        <a-input-search
          v-model="searchkey"
          style="width: 240px"
          allowClear
          enter-button
          @search="onSearch"
        />
      </div>
    </div>
    <div class="body">
      <a-table
        tableLayout="fixed"
        :columns="columns"
        :dataSource="dataSource"
        :loading="loading"
        :pagination="false"
        @change="onChange"
      >
      </a-table>
    </div>
    <div class="footer">
      <a-pagination
        v-if="table.rows && table.rows.length"
        v-model="table.pagenum"
        showSizeChanger
        :showTotal="(total) => `总共：${total}条`"
        @showSizeChange="onShowSizeChange"
        :total="table.total"
        :pageSize="table.pagesize"
        @change="onPageChange"
        style="float: right"
      />
    </div>
  </div>
</template>
<script>
import { Table, Input, Select, Pagination} from "ant-design-vue";
import { map, keys, includes, remove } from 'lodash';
import { orgQuery } from '@/person-shaoxing/api/orgStaffReport'
import { showError, dateFormat } from '../../../../framework/utils';
// import {cloneDeep, set} from 'lodash';

/**
 * 区域编制的图表控件
 */
export default {
  components: {
    ATable: Table,
    APagination: Pagination,
    AInputSearch: Input.Search,
    ASelect: Select,
    ASelectOption: Select.Option,
  },
  props: {
    unittypes: Array,
    district: String,
    systype: String,
    filters: Array,
    fields: Array,
  },
  data() {
    return {
      CangongList: [],
      nameList: ['绍兴市残疾人联合会机关', '绍兴市红十字会机关', '中国国际贸易促进委员会绍兴市委员会机关', '绍兴市关心下一代工作委员会机关', '绍兴市计划生育协会机关', '绍兴市人民对外友好协会机关'],
      loading: false,
      searchkey: undefined, //搜索关键词
      orderby: undefined,
      table: {
        headers: undefined,
        rows: undefined,
        pagenum: 1,
        pagesize: 20,
        total: 0,
      },
    };
  },
  computed: {
    params() {
      let filters = this.filters ? [...this.filters] : [];
      if (this.systype) {
        //添加过滤
        let systypes = this.$store.getters.dict("usermanage.org.systype") || [];
        let st = systypes.find((item) => item.text == this.systype);
        if (!st) {
          return;
        }
        filters.push({ field: "systype", op: "eq", value: st.value });
      }
      return {
        district: this.district,
        unittypes: this.unittypes,
        filters,
        fields: this.fields,
      };
    },
    columns() {
      let { header } = this.table;
      if (!header) {
        return;
      }
      let fields = this.params.fields;
      let cols = [],
        group;
      header.forEach((item, index) => {
        let c = {
          title: item.showname,
          dataIndex: item.column,
          // sorter: this.search.enabled && this.chartCols.indexOf(item.key) >= 0,
          key: item.key,
        };
        if (index == 0) {
          c.width = "220px";
        }
        if (item.datatype == 4 && item.inputtype > 0) {
          c.align = "center";
        }
        let f = fields.find((f) => f.key == item.key),
          sort,
          order,
          warn;
        if (f) {
          sort = f.sort;
          warn = f.warn;
          order = f.order;
        }
        if (order) {
          //判断是否需要排序
          c.sorter = true;
        }
        if (warn) {
          c.customRender = (text) => {
            if (text > 0) {
              return <span style="color:#299a02">{text}</span>;
            } else if (text < 0) {
              return <span style="color:#d60002">{text}</span>;
            }
            return text;
          };
        }
        if (sort) {
          //存在分组
          if (group && group.title == sort) {
            group.children.push(c);
          } else {
            group = { title: sort, children: [c] };
            cols.push(group);
          }
        } else {
          cols.push(c);
          group = null;
        }
      });
      return cols;
    },
    dataSource() {
      if(this.table&&this.table.rows) {
        let keyArray = keys(this.table.rows[0]);
        map(this.table.rows, (item)=> {
          keyArray.forEach((key)=> {
            if(item[key]==null) {
              item[key]=0;
            }
          });
        });
        // if(includes(this.unittypes, 1)) {
        //   //行政
        //     this.CangongList = remove(this.table.rows, (item)=> includes(this.nameList, item.name));
        //   }else{
        //     //事业
        //     if(this.CangongList.length) {
        //       this.table.rows.concat(this.CangongList);
        //     }
        //   }
        return this.table && this.table.rows;
      }
    },
  },
  watch: {
    params: {
      immediate: true,
      handler(params) {
        if (params) {
          this.table = {
            headers: undefined,
            rows: undefined,
            pagenum: 1,
            pagesize: 20,
            total: 0,
          };
          this.doSearch({ pagenum: 1, pagesize: this.table.pagesize });
        }
      },
    },
  },
  methods: {
    onPageChange(pagenum, pagesize) {
      this.doSearch({ pagenum, pagesize });
    },
    onShowSizeChange(current, pagesize) {
      this.doSearch({ pagenum: 1, pagesize });
    },
    onChange(pagination, filters, sorter) {
      if (sorter.column) {
        this.orderby = {
          orderby: sorter.column.key,
          ordertype:
            sorter.order == "descend"
              ? "DESC"
              : sorter.order == "ascend"
              ? "ASC"
              : false,
        };
      } else {
        this.orderby = undefined;
      }
      this.doSearch({ pagenum: 1, pagesize: this.table.pagesize });
    },
    onSearch() {
      this.doSearch({ pagenum: 1, pagesize: this.table.pagesize });
    },
    doSearch({ pagenum, pagesize }) {
      this.loading = true;
      let { district, unittypes, filters = [], fields } = this.params;
      let extFiler = [];
      if (this.searchkey) {
        extFiler.push({ field: "name", op: "regex", value: this.searchkey });
      }
      /*  let orders = [{ orderby: "index", ordertype: 'ASC'}];
      if(orderby){
         orders.unshift(orderby);
      } */
      orgQuery({
        orders: this.orderby && [this.orderby],
        district,
        unittypes,
        filters: [...filters, ...extFiler],
        fields,
        pagenum,
        pagesize,
        needtotal: true,
      })
        .then(({ result }) => {
          this.table = result;
        })
        .catch((error) => {
          showError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  & > .header {
    flex: none;
    overflow: hidden;
    padding: @content-padding-v @content-padding-h;
    & > .left {
      float: left;
    }
    & > .right {
      float: right;
    }
  }
  & > .body {
    flex: auto;
    padding: 0 @content-padding-h;
    overflow: auto;
    /deep/.ant-table-thead {
      th {
        border: 1px solid #e8e8e8;
        &:first-child {
          border-left: none;
        }
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  & > .footer {
    flex: none;
    padding: @content-padding-v @content-padding-h;
    margin-bottom: 10px;
  }
}
</style>