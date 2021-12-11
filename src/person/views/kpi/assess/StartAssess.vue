<template>
  <div class="start-assess">
    <div class="step">
      <a-steps :current="current">
        <a-step v-for="(step, index) in stepList" :key="index" :title="step.title" />
      </a-steps>
    </div>
    <div class="container">
      <component 
        :is="stepList[current].component" 
      >
      </component>
    </div>
  </div>
</template>

<script>
import { Steps } from "ant-design-vue";
import Assess from "./steps/Assess.vue";
import AssessedList from "./steps/AssessedList.vue";
import SelectSystem from "./steps/SelectSystem.vue";
import SelectOrg from "./steps/SelectOrg.vue";

export default {
  props: {},
  components: {
    ASteps: Steps,
    AStep: Steps.Step,
    SelectSystem,
    SelectOrg,
    Assess,
    AssessedList
  },
  data() {
    return {
      current: 2,
      stepList: [
        { title: '选择评估体系', component: 'SelectSystem' },
        { title: '选择评估对象', component: 'SelectOrg' },
        { title: '评估', component: 'Assess'  },
        { title: '已评估单位', component: 'AssessedList' },
      ],
    };
  },
  watch: {},
  computed: {},
  created() {
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.start-assess{
  .step{
    padding: 10px 0;
  }
  .container{
    padding: 10px 0;
  }
}
</style>