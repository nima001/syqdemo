<!--人员信息统计-->
<template>
  <div class="personCount">
    <ul class="tabList">
      <li class="tanItem" @click="changeTab(item)" v-for="(item,index) in tabList" :key="index" :class="{active:activeTab == item.cmpt}">{{item.name}}</li>
    </ul>
    <div class="content">
      <component :is="activeTab"></component>
    </div>
  </div>
</template>
<script>
import TransferInfo from './components/TransferInfo';
import PersonIdentify from './components/PersonIdentify';
import PersonSex from './components/PersonSex';
import PoliticsStatus from './components/PoliticsStatus';
import EducationBackground from './components/EducationBackground';
import StaffPosition from './components/StaffPosition';
import PersonExam from './components/PersonExam'
export default {
  components: {
    TransferInfo,
    PersonIdentify,
    PersonSex,
    PoliticsStatus,
    EducationBackground,
    StaffPosition,
    PersonExam
  },
  data() {
    return {
      activeTab: "TransferInfo",
      tabList: [
        {name: "人员调动情况", cmpt: "TransferInfo"},
        {name:'人员身份',cmpt:'PersonIdentify'},
        {name:'性别',cmpt:'PersonSex'},
        {name:'政治面貌',cmpt:'PoliticsStatus'},
        {name:'学历',cmpt:'EducationBackground'},
        {name:'窗口职位',cmpt:'StaffPosition'},
        {name:'考核',cmpt:'PersonExam'}
      ]
    };
  },
  methods: {
    changeTab(item) {
      this.activeTab = item.cmpt;
    }
  }
};
</script>
<style lang='less' scoped>
.personCount {
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
  }
}
</style>