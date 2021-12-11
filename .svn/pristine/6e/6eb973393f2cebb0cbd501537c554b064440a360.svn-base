<!--人员花名册-->
<template>
  <div class="roster">
    <ul class="tabList">
      <li class="tanItem" @click='changeTab(item)' v-for="(item,index) in tabList" :key="index" :class="{active:activeTab == item.cmpt}">{{item.name}}</li>
    </ul>
    <div class="content">
      <component :is="activeTab"></component>
    </div>
  </div>
</template>
<script>
import UserList from "./components/UserList";
import AdvancedQuery from './components/AdvancedQuery';
export default {
  components: {
    UserList,
    AdvancedQuery
  },
  data() {
    return {
      activeTab: "UserList"
    };
  },
  computed:{
    tabList(){
      let list = [{name: "人员列表",cmpt: "UserList"}]
      let permit = this.hasPermit('/access/common');
      if(!permit){
        list.push({name: "高级查询",cmpt: "AdvancedQuery"})
      }
      return list
    }
  },
  methods: {
    changeTab(item){
      this.activeTab = item.cmpt
    }
  }
};
</script>
<style lang='less' scoped>
.roster {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .tabList {
    height: 62px;
    background: @white;
    padding: 0px @content-padding-h;
    margin: 0px;
    display: flex;
    align-items: center;
    .tanItem {
      cursor: pointer;
      padding: 0px @padding-sm;
      color: @primary-color;
      transition: color 0.3s;
      border-radius: @border-radius-base;
      height: 26px;
      line-height: 26px;
      margin-left: @padding-xs;
      &:first-child {
        margin-left: 0px;
      }
      &:hover {
        background: @primary-1;
      }
      &.active {
        color: @white;
        background: @primary-color;
      }
    }
  }
  .content {
    flex: 1;
    margin-top: @layout-space-base;
    overflow-y: auto;
    min-height: 0px;
    border-radius: @border-radius-base;
    background: @white;
  }
}
</style>