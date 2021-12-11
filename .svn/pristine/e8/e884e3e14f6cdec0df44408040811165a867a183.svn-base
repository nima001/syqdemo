<template>
  <div class="work-task-manage">
    <a-tabs v-model="tab" :tabBarGutter="50" @change="onTabChange">
      <a-tab-pane key="work" tab="我要办的" v-if="hasPermit('/person/worktask/work')"></a-tab-pane>
      <a-tab-pane key="concern" tab="我关注的" v-if="hasPermit('/person/worktask/concern')"></a-tab-pane>
      <a-tab-pane key="publish" tab="发布任务" v-if="hasPermit('/person/worktask/publish')"></a-tab-pane>
    </a-tabs>
    <div class="content" v-if="hasPermit('/person/worktask')">
      <keep-alive include="MyWorkTask,ConcernTask">
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script>
import { Tabs } from 'ant-design-vue'
/**
 * 工作任务管理主页
 */
export default {
  components: {
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
  },
  data(){
    return {
      tab: 'work',
    }
  },
  created(){
    let path = this.$route.path;
    this.tab = path.substr(path.lastIndexOf('/') + 1);
  },
  methods: {
    onTabChange(){
      this.$router.push(this.tab)
    }
  }
}
</script>
<style lang="less" scoped>
.work-task-manage{
  height: 100%;
  display: flex;
  flex-direction: column;
  .ant-tabs{
    flex: none;
    background: white;
    /deep/ .ant-tabs-bar{
      margin: 0;
      padding: 0 @layout-space-base;
      border-bottom-color: transparent;
    }
  }
  & > .content{
    flex: auto;
    min-height: 1px;
    padding: @layout-space-base;
  }
}
</style>