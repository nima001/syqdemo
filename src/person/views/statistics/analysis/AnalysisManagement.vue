<template>
  <a-layout>
    <a-spin :spinning="this.loading"/>
    <AnalysisList
      @sort="sort"
      @search="search"
      @save="this.save"
      @delete="this.delete"
      @getData="this.getData"
      :data="data"
    />
  </a-layout>
</template>
<script>
import { Layout, Spin } from "ant-design-vue";
import AnalysisList from "./components/AnalysisList";
import {
  analysisquery,
  analysissave,
  analysisdel,
  analysisorderby,
} from "@/person/api/statistics";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    ALayout: Layout,
    ASpin: Spin,
    AnalysisList,
  },
  data() {
    return {
      data: [],
      keyword: "",
      loading: false,
    };
  },
  methods: {
    save(data) {
      if (data.id) {
        //修改
        analysissave({
          name: data.name,
          scopetype: data.scopetype,
          subject: data.subject,
          type: data.type,
          id: data.id,
        }).then((res) => {
          this.getData(this.keyword);
        }).catch((error) => {
          showError(error);
        });
      } else {
        analysissave({
          name: data.name,
          scopetype: data.scopetype,
          subject: data.subject,
          type: data.type,
        }).then((res) => {
            this.getData(this.keyword);
        }).catch((error) => {
          showError(error);
        });
      }
    },
    delete(id) {
      analysisdel(id)
        .then((res) => {
          if (res.code === "success") {
            this.getData(this.keyword);
          }
        })
        .catch((error) => {
          showError(error);
        });
    },
    //查询
    search(keyword) {
      this.getData(keyword);
    },
    getData(keyword) {
      this.loading = true;
      analysisquery({ searchkey: keyword })
        .then((res) => {
          this.loading = false;
          this.data = res.result;
          if(!this.data.length) {
            this.$notification.warning({
              message: '提示',
              description: '暂无数据！',
              duration: 3,
            })
          }
        })
        .catch((error) => {
          this.loading = false;
          showError(error);
        });
    },
    sort(data) {
      analysisorderby(data)
        .then((res) => {
          this.getData(this.keyword);
        })
        .catch((error) => {
          showError(error);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.ant-layout {
  height: 100%;
  padding: @layout-space-base;
  .ant-spin {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
