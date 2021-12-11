<template>
  <div class="kpiLine">
    <div class="cityKpi">
      <city-kpi></city-kpi>
    </div>
  </div>
</template>

<script>
import CityKpi from "../kpiline/CityKpi";
import {mixins} from "./minxin"
export default {
  components: { CityKpi },
  mixins:[mixins],
  created(){
    if(!this.dictCode.dictId){
      this.dictCode.dictId = "330600"
    }
  }
};
</script>
<style lang='less' scoped>
</style>