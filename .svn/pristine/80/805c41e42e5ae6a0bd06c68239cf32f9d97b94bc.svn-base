<template>
  <div class="quitCount">
    <template v-if="!loading">
      <template v-if="isOrg">
        <component :is="activeCmpt" v-model="activeCmpt" :nodeid="nodeid" :isOrg="isOrg" @finish="handleBack"></component>
      </template>
      <template v-else>
        <person-list :isOrg="isOrg"></person-list>
      </template>
    </template>
  </div>
</template>
<script>
import DepartmentList from "./DepartmentList";
import PersonList from "./PersonList";
import { showError } from "@/framework/utils/index";
import {orgJudge} from '@/hall/api/usermanage';
export default {
  data() {
    return {
      activeCmpt: "DepartmentList",
      nodeid:undefined,
      isOrg : false,
      loading :true
    };
  },
  components: { DepartmentList, PersonList },
  mounted(){
    this.judge()
  },  
  methods: {
    judge(){
      this.loading = true;
      orgJudge().then(({result})=>{
        this.isOrg = result;
      }).catch(err=>{
        showError(err)
      }).finally(()=>{
        this.loading = false;
      })
    },    
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
