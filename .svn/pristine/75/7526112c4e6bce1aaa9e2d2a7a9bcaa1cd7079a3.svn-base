<template>
  <div class="creat_report">
    <a-steps class="steps_tab" :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <keep-alive include="AssessmentEvent,AssessmentContent">
        <component :is="steps[current].component" :ref="steps[current].component" />
      </keep-alive>
    </div>
    <div class="steps-action">
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        上一步
      </a-button>
      <a-button v-if="current < steps.length" type="primary" @click="next">
        {{steps[current].next}}
      </a-button>
    </div>
  </div>
</template>

<script>
import { Steps, Button } from "ant-design-vue";
import AssessmentEvent from "@/person-shaoxing/views/assessment/compileAssist/analysis/AssessmentEvent";
import AssessmentContent from "@/person-shaoxing/views/assessment/compileAssist/analysis/AssessmentContent";
import AssessmentElements from "@/person-shaoxing/views/assessment/compileAssist/analysis/AssessmentElements";
import AssessmentReport from "@/person-shaoxing/views/assessment/compileAssist/analysis/AssessmentReport";
export default {
  props: {},
  components: {
    ASteps: Steps,
    AStep: Steps.Step,
    AButton: Button,
    AssessmentContent,
    AssessmentEvent,
    AssessmentElements,
    AssessmentReport
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '创建评估事件',
          next: '开始评估',
          component: 'AssessmentEvent',
        },
        {
          title: '选择评估内容',
          next: '下一步',
          component: 'AssessmentContent',
        },
        {
          title: '填写评估要素',
          next: '下一步',
          component: 'AssessmentElements',
        },
        {
          title: '生成评估报告',
          next: '生成报告',
          component: 'AssessmentReport',
        },
      ],
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    async next() {
      let res = await this.$refs[this.steps[this.current].component].onNext()
      if (res) {
        if (this.current === 3) {
          this.$emit('toggle', true)
        }
        if (this.current < this.steps.length - 1) {
          this.current++;
        }
      }
    },
    prev() {
      this.current--;
    },
  },
};
</script>
<style lang="less" scoped>
.creat_report{
  height: 100%;
  .steps_tab{
   width: 1200px;
   margin: 0 auto;
   padding: 26px 0;
  }
  .steps-content{
    height: calc(~"100% -  174px");
    position: relative;
  }
  .steps-action{
    position: absolute;
    left: 10px;
    bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    width: 100%;
    height: 90px;
    width: calc(~"100% -  20px");
    background: @white;
    -moz-box-shadow:0px -4px 5px #eaedf2; 
    -webkit-box-shadow:0px -4px 5px #eaedf2; 
    box-shadow:0px -4px 5px #eaedf2;
    button{
      margin-right: 40px;
    }
  }
}
</style>