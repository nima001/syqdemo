<template>
  <a-layout>
    <a-spin :spinning="this.loading"/>
    <content-list
      @delete="this.delete"
      @save="save"
      @sort="sort"
      @search="search"
      @expand="expand"
      @getscopeData="getscopeData"
      @getDatabyId="getDatabyId"
      :data="data"
      :scopeData="scopeData"
      :expandedKeys="expandedKeys"
    />
  </a-layout>
</template>

<script>
import { Layout, Spin } from "ant-design-vue";
import ContentList from "./components/ContentList";
import {
  queryContent,
  saveContent,
  deleteContent,
  orderContent,
  queryScope,
} from "@/person/api/statistics";
import { showError } from "@/framework/utils/index";
export default {
  components: {
    ALayout: Layout,
    ASpin: Spin,
    ContentList,
  },
  data() {
    return {
      data: [],
      id: 0,
      expandedKeys: [],
      scopeData: [],
      loading: false,
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  methods: {
    expand(expandedKeys) {
      this.expandedKeys = expandedKeys;
    },
    save(data) {
      if (data.id) {
        //编辑
        saveContent({
          analyzeid: Number(this.id),
          id: data.id,
          name: data.name,
          pid: data.pid,
          form: data.form,
          data: data.data,
        })
          .then((res) => {
            this.getDatabyId(this.id);
          })
          .catch((error) => {
            showError(error);
          });
      } else {
        //新增
        saveContent({
          analyzeid: Number(this.id),
          name: data.name,
          pid: data.pid,
          form: data.form,
          data: data.data,
        })
          .then((res) => {
            this.getDatabyId(this.id);
          })
          .catch((error) => {
            showError(error);
          });
      }
    },
    delete(id) {
      deleteContent(id)
        .then((res) => {
          this.getDatabyId(this.id);
        })
        .catch((error) => {
          showError(error);
        });
    },
    sort(data) {
      //调用排序方法
      orderContent(data)
        .then((res) => {
          this.getDatabyId(this.id);
        })
        .catch((error) => {
          showError(error);
        });
    },
    search(keywords) {
      this.keywords = keywords;
      this.getDatabyId(this.id);
    },
    getscopeData(){
      queryScope({ analyzeid: this.id }).then((res) => {
        this.scopeData = res.result;
      }).catch((error)=>{
        showError(error);
      });
    },
    getDatabyId(id) {
      this.loading = true;
      queryContent({ analyzeid: this.id, searchkey: this.keywords })
        .then((res) => {
          let tops = [],
            map = new Map(),
            expandedKeys = ["0"];
          if(!res.result.length) {
            this.$notification.warning({
              message: '提示',
              description: '暂无数据！',
              duration: 3,
            })
          }
          (res.result || []).forEach((item) => {
            //content必须是按树的深度优先排序
            let parent = map.get(item.pid);
            let node = {
              key: item.id,
              title: item.name,
              value: item.id,
              pid: item.pid,
              form: item.form,
              data: item.data,
              disabled: false,//是否禁用
              scopedSlots: { title: "custom" },
            };
            if (parent) {
              let children = parent.children;
              if (!children) {
                parent.children = children = [];
                parent.key = "" + parent.key; //父节点key转化为字符区分
                expandedKeys.push(parent.key);
              }
              children.push(node);
            } else {
              tops.push(node);
            }
            map.set(item.id, node);
          });
          this.loading = false;
          this.expandedKeys = expandedKeys;
          this.data = tops;
        })
        .catch((error) => {
          this.loading = false;
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