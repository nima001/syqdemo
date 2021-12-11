<template>
  <accordion-layout nav-title="文件归属单位">
    <org-tree :key="this.type" slot="nav" @select="onOrgSelect" :nodeid="nodeid" :treeid="treeid" title="name"/>
    <Content :key="this.type" :orgid="this.orgid" :type="type"/>
  </accordion-layout>
</template>

<script>
import AccordionLayout from "@/framework/components/AccordionLayout";
import OrgTree from "@/person/components/OrgTree";
import Content from "./components/content.vue";
export default {
  components: {
    OrgTree,
    Content,
    AccordionLayout,
  },
  data() {
    return {
      type: undefined,
      orgid: "",
      selected: null,
      nodeid: Number(this.$route.query.id) || undefined,
      treeid: Number(this.$route.query.treeid) || undefined,
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.reset();
      if(to.name==='organization'){
        vm.type = 1;
      }else if (to.name==='regulations'){
        vm.type = 3;
      }else if(to.name==='important') {
        vm.type = 12;
      }
    });
  },
   methods: {
    onOrgSelect(node, dept, init) {
      //node.data.orgtype为3代表区域，而不是单位
      this.orgid = node.data._id;
    },
    reset(){
      this.nodeid = undefined;
      this.treeid = undefined;
      this.selected = null;
      this.orgid = undefined;
    }
  },
};
</script>
<style scoped lang="less">
/deep/.org-tree-panel + .ant-layout {
    background: #ffffff;
    border-radius: @border-radius-base;
    padding: @layout-space-base @content-padding-h;
}
</style>
