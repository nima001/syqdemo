<template>
  <div class="gather">
    <div class="top">
      <span>窗口职位汇总</span>
      <a-button @click="onExport">导出</a-button>
    </div>
    <div class="middle">
      <a-table  rowKey="id" :loading="loading" :columns="columns" :data-source="dataSource" :pagination="false"></a-table>
    </div>
    <div class="bottom">
      <a-pagination show-size-changer :total="pagination.total" :page-size="pagination.pagesize" v-model="pagination.pagenum"
        :show-total="(total) => `共 ${total} 条`" @change="onChange" @showSizeChange="onShowSizeChange">
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
import { staffpositionGather,staffpositionExport } from "@/hall/api/personcount";

import TaskProgress from "@/framework/components/TaskProgress";
import { download } from "@/framework/api/file";
import InputModal from '@framework/components/InputModal';
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
      columns: [],
      pagination: {
        pagesize: 10,
        pagenum: 1,
        total: 0,
        needtotal: true
      },
      query: {},
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
          return staffpositionExport({
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
      staffpositionGather({ ...this.pagination })
        .then(({ result: { pagesize, pagenum, total, rows = [] } }) => {
          assign(this.pagination, { pagesize, pagenum, total });
          this.columns = this.makeColumns(rows);
          this.dataSource = rows.map((item, index) => {
            let col = this.formate(item);
            return {
              name: item.name,
              ...col
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
    makeColumns(list) {
      let row = list[0]["userRepDtoList"];
      let array = row.map((item, index) => {
        return {
          id: index,
          title: item.name,
          dataIndex: `name${index + 1}`
        };
      });
      return [
        { title: "窗口名称", dataIndex: "name" },
        { title: "总人数", dataIndex: "total" },
        ...array
      ];
    },
    formate(obj) {
      let list = obj["userRepDtoList"];
      let target = {};
      let total = 0;
      for (let i = 0; i < list.length; i++) {
        target[`name${i + 1}`] = list[i].count;
        total += list[i].count;
      }
      return { total, ...target };
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