<template>
  <div class="quit">
    <div class="main">
      <div class="switch">
        <a-tabs default-active-key="QuitList" @change="callback">
          <a-tab-pane :key="item.cmpt" :tab="item.name" v-for="item in cmptList"></a-tab-pane>
        </a-tabs>
      </div>
      <div class="content">
        <component :is="activeCmpt"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs } from "ant-design-vue";
import QuitList from "./components/QuitList";
import QuitCount from "./components/QuitCount";
export default {
  components: {
    QuitList,
    QuitCount,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane
  },
  data() {
    return {
      activeCmpt: undefined
    };
  },
  watch: {
    cmptList: {
      handler(v) {
        if (v.length > 0) {
          this.activeCmpt = v[0].cmpt;
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed:{
    cmptList(){
      let list = [ { name: "公出统计", cmpt: "QuitCount", index: 2 }]
      if(!this.hasPermit('/access/leader')){
        list = [...list, { name: "公出记录", cmpt: "QuitList", index: 1 }]
      }
      list.sort((a,b)=>{
        return a.index - b.index
      })
      return list
    }
  },
  methods: {
    callback(key) {
      this.activeCmpt = key;
    }
  }
};
</script>
<style lang='less' scoped>
.quit {
  width: 100%;
  height: 100%;
  padding: @layout-space-base;
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .switch {
      background: @white;
      padding: @content-padding-v @content-padding-h;
      border-radius: @border-radius-base;
      /deep/ .ant-tabs-tab {
        color: #262626;
        font-size: 14px;
        font-weight: bold;
        margin-right: 36px;
        padding: @padding-sm @padding-xs;
      }
    }
    .content {
      margin-top: @layout-space-base;
      border-radius: @border-radius-base;
      flex: 1;
      min-height: 0px;
    }
  }
}
</style>