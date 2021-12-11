<template>
  <div class="queryView">
    <custom-query v-model="query" ref="query">
      <template slot="opts">
        <a-button type="primary" @click="onSearch">查询</a-button>
        <a-button type="primary" ghost @click="onReset">重置</a-button>
      </template>
      <template slot="dataOpts">
        <a @click="onExport">导出</a>
      </template>
    </custom-query>
    <input-modal v-model="nameEdit.show" v-bind="nameEdit" />
    <task-progress :taskid="exportTaskid" defaultInfo="正在导出" @finish="onProgressFinish" />
  </div>
</template>
<script>
import { Button } from "ant-design-vue";
import CustomQuery from "@/person/views/integratedquery/CustomQuery";
import TaskProgress from "@/framework/components/TaskProgress";
import { querysave, getQuery, exportExcel } from "@/person/api/integratedquery";
import { download } from "@/framework/api/file";
import { showError } from "@/framework/utils/index";
import InputModal from '@framework/components/InputModal';
export default {
  components: {
    AButton: Button,
    CustomQuery,
    InputModal,
    TaskProgress
  },
  data() {
    return {
      query: undefined,
      nameEdit: {
        show: false,
        title: undefined,
        value: undefined,
        placeholder: undefined
      },
      exportTaskid: undefined
    };
  },
  methods: {
    onSearch() {
      this.$refs.query.search();
    },
    onReset() {
      this.$refs.query.reset();
    },
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
          return exportExcel({
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
    }
  }
};
</script>
<style lang="less" scoped>
.queryView {
  height: 100%;
}
</style>