<template>
  <div class="layout">
    <div class="tab">
      <ul>
        <li v-for="(item, index) in tasktypeList" :key="`${item.key}${index}`" 
          :class="{selected: tasktype == item.category}"
          @click="onTypeChange(item)"
        >{{item.text}}</li>
        <li v-for="(item, index) in otherTasktypeList" :key="`${item.key}${index}`" 
          :class="{selected: tasktype == item.category}"
          @click="onTypeChange(item)"
        >{{item.text}}</li>
      </ul>
    </div>
    <div class="content">
      <keep-alive>
        <component 
          v-bind:is="currentComponent" 
          :tasktypeList="tasktypeList"
          :otherTasktypeList="otherTasktypeList" 
          :tasktype="Number(active)"/>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import MyworkBody from './components/MyworkBody'
import MyworkDealBody from './components/MyworkDealBody';
import { cloneDeep, map, has, concat } from 'lodash';


/**
 * 我的任务
 */
export default {
  name: 'MyWorkTask',
  components: {
    MyworkBody,
    MyworkDealBody,
  },
  data(){
    return {
      active: 1,
      tasktype: 1,
      currentComponent: 'MyworkBody',
    }
  },
  watch: {
    tasktype(val) {
      if(this.tasktypeList.length<val) {
        this.currentComponent = 'MyworkDealBody';
      }else{
        this.currentComponent = 'MyworkBody';
      }
    }
  },
  computed: {
    tasktypeList(){
      let v = cloneDeep(this.$store.getters.dict('person.work.tasktype'));
      map(v, (item, index)=>{
        item.category = index+1;
      });
      return v;
    },
    otherTasktypeList() {
      let v = cloneDeep(this.$store.getters.dict('person.work.flowtype'));
      map(v, (item, index)=>{
        item.category = this.tasktypeList.length+index+1;
      });
      return v;
    }
  },
  methods: {
    onTypeChange(item){
      this.active = item.value;
      this.tasktype = item.category;
    },
  }
}
</script>
<style lang="less" scoped>
.layout{
  height: 100%;
  display: flex;
  border-radius: @border-radius-base;
  background: white;
  & > .tab{
    width: 150px;
    background-color: #f2f2f2;
    ul{
      margin-top: 50px;
    }
    li{
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      &:hover{
        background-color: @primary-1;
        color: @primary-color;
      }
      &.selected{
        background-color: white;
        color: @primary-color;
        font-weight: bold;
      }
    }
  }
  .content {
    flex: 1;
  }
}
</style>