<template>
  <a-layout class="org-content">
    <a-layout-header class="content-header" v-if="isUnit">
      <real-count :org="org" />
    </a-layout-header>
    <a-layout-content style="height:100%">
      <detail-info :org="org" :treeid="treeid" :nodeid="nodeid" v-if="org" />
    </a-layout-content>
  </a-layout>
</template>
<script>
import {Layout, Form} from 'ant-design-vue';
import RealCount from "./components/RealCount";
import DetailInfo from "./components/DetailInfo";
export default {
  name: 'orgMain',
  props: ["loadData"],
  components: {
    ALayout:Layout,
    ALayoutHeader:Layout.Header,
    ALayoutContent:Layout.Content,
    RealCount,
    DetailInfo
  },
  computed:{
    org(){
      if(this.loadData){
        let {node, dept} = this.loadData;
        return dept || (node && node.data);
      }
    },
    treeid(){
      if(this.loadData){
        return this.loadData.treeid;
      }
    },
    nodeid(){
      if(this.loadData){
        let {node, dept} = this.loadData;
        return dept ? null : node && node.id;
      }
    },
    isUnit() {
      return this.org && [1, 2, 3, 5].indexOf(this.org.unittype) >= 0;
    }
  },
};
</script>
<style lang="less" scoped>
.org-content {
  height: 100%;
  border-radius: @border-radius-base;
  min-width: 1000px;
  .content-header {
    border-radius: @border-radius-base;
    background-color: #fff;
    margin-bottom: @layout-space-base;
  }
  .ant-layout-content {
    border-radius: @border-radius-base;
    background-color: #fff;
    overflow-x: auto;
  }
  .ant-layout-header {
    height: auto;
    padding: 0;
  }
}
</style>