<template>
  <div class="quitCount">
    <component :is="activeCmpt" v-model="activeCmpt" :nodeid="nodeid" @finish="handleBack"></component>
  </div>
</template>
<script>
import DepartmentList from "./DepartmentList";
import PersonList from "./PersonList";
export default {
  data() {
    return {
      activeCmpt: "DepartmentList",
      nodeid:undefined
    };
  },
  components: { DepartmentList, PersonList },
  methods: {
    handleBack(res) {
      this.nodeid = res.nodeid;
      this.activeCmpt = res.cmpt;
    }
  }
};
</script>
<style lang='less' scoped>
.quitCount {
  width: 100%;
  height: 100%;
  background: @white;
  border-radius: @border-radius-base;
}
</style>
