<template>
  <a-layout class="processwrap">
    <a-layout-content class="body">
      <ul>
        <li v-for="item in list " :key="item.id" @click="jump(item)">{{item.name}}</li>
      </ul>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { uiConfigsCookies } from "@/framework/utils/auth";
import "@/workflow/style/process.css";
import {Layout,Breadcrumb} from 'ant-design-vue';
export default {
  name: "processtemplatemanagement",
  components:{
    ALayout:Layout,
    ALayoutHeader:Layout.Header,
    ALayoutContent:Layout.Content,
    ABreadcrumb:Breadcrumb,
    ABreadcrumbItem:Breadcrumb.Item
  },
  data() {
    return {
      recordList: [],
      list: [
        {
          name: "所有签章",
          componenturi: "/workflow/signatureList"
        },
        {
          name: "添加签章",
          componenturi: "/workflow/signatureEdit"
        }
      ]
    };
  },
  methods: {
    jump(item) {
      this.$router.push(item.componenturi);
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  width: 100%;
  height: 100%;
  margin: 0;
  background: #f3f7fa;
  ul {
    height: auto;
    display: flex;
    flex-wrap: wrap;
    li {
      cursor: pointer;
      border-radius: 4px;
      width: 23%;
      margin: 10px;
      padding: 13px;
      text-align: center;
      background: #fff;
      &:hover {
        color: red;
      }
    }
  }
}
</style>