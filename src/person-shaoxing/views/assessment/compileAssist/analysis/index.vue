<template>
  <div class="wrapper">
    <div class="tabs">
      <span 
      v-for="(item, index) in tabs" 
      :key="index"
      :class="{ active: active && active.id == item.id }"
      @click="active = item">
        {{item.title}}
      </span>
    </div>
    <div class="main">
      <keep-alive include="CreatAssessment">
        <component v-if="active" :is="active.component" @toggle="toggleTabs" />  
      </keep-alive>
    </div>
  </div>
</template>

<script>
import CreatAssessment from "@/person-shaoxing/views/assessment/compileAssist/analysis/CreatAssessment";
import AssessmentRecord from "@/person-shaoxing/views/assessment/compileAssist/analysis/AssessmentRecord";
export default {
  props: {},
  components: {
    AssessmentRecord,
    CreatAssessment
  },
  data() {
    return {
      tabs: [],
      active: undefined
    };
  },
  watch: {},
  computed: {},
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.tabs = [
        { id: 1, title: "开始评估", component: "CreatAssessment" },
        { id: 2, title: "评估记录", component: "AssessmentRecord" }
      ];
      this.active = this.tabs[0];
    },
    toggleTabs(data) {
      if (data) {
        this.active = this.tabs[1]
      }
    }
  },
};
</script>
<style lang="less" scoped>
.wrapper{
  height: calc(~"100% -  20px");
  background-color: @white;
  margin: 10px;
  overflow: hidden;
  .tabs{
    padding: 17px @content-padding-h;
    -moz-box-shadow:0px 2px 5px #F8FAFD; -webkit-box-shadow:0px 2px 5px #F8FAFD; box-shadow:0px 2px 5px #F8FAFD;
    span{
      display: inline-block;
      line-height: 36px;
      cursor: pointer;
      border-radius: 5px;
      padding: 0 @content-padding-v;
      margin-right: 10px;
    }
    .active{
      color: @white;
      background: @primary-color;
    }
  }
  .main{
    height: calc(~"100% -  70px");
  }
  .empty{
    height: 90px;
  }
}
</style>