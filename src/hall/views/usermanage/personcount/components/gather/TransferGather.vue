<template>
  <div class="gather">
    <div class="top">
      <span>人员调动汇总</span>
      <a-button @click="onExport">导出</a-button>
    </div>
    <div class="middle">
      <a-table rowKey="id" :loading="loading" :customRow="customRow" :columns="columns" :data-source="dataSource" :pagination="false"></a-table>
    </div>
    <div class="bottom">
      <a-pagination show-size-changer :total="pagination.total" :page-size="pagination.pagesize" :show-total="(total) => `共 ${total} 条`"
        v-model="pagination.pagenum"  @change="onChange"  @showSizeChange="onShowSizeChange">
      </a-pagination>
    </div>
    <input-modal v-model="nameEdit.show" v-bind="nameEdit" />
    <task-progress :taskid="exportTaskid" defaultInfo="正在导出" @finish="onProgressFinish" />    
  </div>
</template>
<script>
import { Table, Pagination, Button } from "ant-design-vue";
import { assign, cloneDeep } from "lodash";
import { showError } from "@/framework/utils/index";
import { transferGather,transferExport } from "@/hall/api/personcount";

import TaskProgress from "@/framework/components/TaskProgress";
import { download } from "@/framework/api/file";
import InputModal from '@framework/components/InputModal';
let columns = [
  {
    title: "窗口名称",
    dataIndex: "name"
  },
  {
    title: "总人数",
    dataIndex: "count"
  },
  {
    title: "调入",
    dataIndex: "in"
  },
  {
    title: "调出",
    dataIndex: "out"
  },
  {
    title: "净流入(+)/出(-)",
    dataIndex: "calculation"
  }
];
export default {
  components: {
    ATable: Table,
    APagination: Pagination,
    AButton: Button,
    TaskProgress,
    InputModal
  },
  data() {
    return {
      loading: false,
      dataSource: [],
      columns,
      pagination: {
        pagesize: 10,
        pagenum: 1,
        total: 0,
        needtotal: true
      },
      query:{},
      nameEdit: {
        show: false,
        title: undefined,
        value: undefined,
        placeholder: undefined
      },
      exportTaskid: undefined
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    onExport() {
      this.nameEdit = {
        show: true,
        title: "导出",
        placeholder: "输入文件名",
        value: this.query.title,
        callback: title => {
          if (!title) {
            return "请输入文件名";
          }
          return transferExport({
            ...this.query,
            title
          })
            .then(({ result }) => {
              this.exportTaskid = result;
            })
            .catch(err => {
              showError(err);
            });
        }
      };
    },
    onProgressFinish(res) {
      download(res);
    },
    getData() {
      this.loading = true;
      transferGather({ ...this.pagination })
        .then(({result:{ pagenum, pagesize, total, rows = [] }}) => {
          assign(this.pagination,{pagenum,pagesize,total})
          this.dataSource = rows.map((item, index) => {
            return {
              id: index,
              calculation: item.in - item.out,
              ...item
            };
          });
        })
        .catch(err => {
          showError(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    customRow(row, index) {
      return {
        on: {
          click: () => {
            this.$emit("input", "PersonList");
          }
        }
      };
    },
    onChange(pagenum, pagesize) {
      assign(this.pagination, { pagesize, pagenum });
      this.getData();
    },
    onShowSizeChange(current, pagesize) {
      assign(this.pagination, { pagenum: 1, pagesize });
      this.getData();
    }
  }
};
</script>
<style lang='less' scoped>
.gather {
  width: 100%;
  display: flex;
  flex-direction: column;
  .top {
    padding: @content-padding-v 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: #262626;
      font-size: 16px;
    }
  }
  .middle {
    padding: @content-padding-v 0px;
    min-height: 390px;
    /deep/ tr {
      cursor: pointer;
    }
  }
  .bottom {
    padding: @content-padding-v 0px;
    text-align: right;
  }
}
</style>