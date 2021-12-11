<template>
  <accordion-layout nav-title="组织架构">
    <org-tree slot="nav" @select="onOrgSelect" :nodeid="nodeid" :treeid="treeid" :showDept="false"/>
    <router-view :load-data="selected" />
  </accordion-layout>
</template>
<script>
import AccordionLayout from '@/framework/components/AccordionLayout'
import OrgTree from "@/person/components/OrgTree";

export default {
  components: {
    AccordionLayout,
    OrgTree,
  },
  data() {
    return {
      nodeid: Number(this.$route.query.id) || undefined,
      treeid: Number(this.$route.query.treeid) || undefined,
      selected: null,
    };
  },
  methods: {
    onOrgSelect(node, dept, init) {
      this.selected = { node, dept, treeid: this.treeid};
      if(!init){
        this.$router.push({name: this.$route.name, query: {id: node.id, treeid: this.treeid}});
      }
    },
  }
};
</script>