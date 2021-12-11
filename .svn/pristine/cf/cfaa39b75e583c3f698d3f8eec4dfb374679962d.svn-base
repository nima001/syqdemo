<template>
  <div class="orgrecord-entry">
    <a-layout>
       <a-layout-header class="header">
        <a-steps progressDot size="small" :current="index+1">
          <a-step title="选择文件" />
          <a-step title="选择单位" />
          <a-step title="设置单位详情" />
          <a-step title="完成" />
        </a-steps>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view :params="stepParams" @next="nextStep" @prev="prevStep"/>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import {Layout,Steps} from 'ant-design-vue';

export default {
  components:{
    ALayout: Layout, 
    ALayoutHeader:Layout.Header,
    ALayoutContent:Layout.Content,
    ASteps: Steps, 
    AStep: Steps.Step,
  },
  data() {
    return {
      index: -1,
      paramsArray: [],
    };
  },
  computed:{
    stepParams(){
      if(this.index < 0){
        return undefined;
      }else{
        return this.paramsArray[this.index];
      }
    }
  },
  created() {
    this.paramsArray = this.$store.getters.recordEditStep || [];
    let idx = this.getPathStep(this.$route.path) - 2;
    if(idx < 0){
      if(idx < -1){
        this.redirect();
      }
    }else if(idx >= this.paramsArray.length){
      this.index = this.paramsArray.length - 1;
      this.redirect();
    }else{
      this.index = idx;
    }
  },
  beforeRouteUpdate(to, from, next){
    let idx = this.getPathStep(to.path) - 2, path = undefined;
    if(idx < 0){
      this.index = -1;
      if(idx < -1){
        path = '/person/orgrecord/entry/step' + (this.index + 2);
      }
    }else if(idx >= this.paramsArray.length){
      this.index = this.paramsArray.length - 1;
      path = '/person/orgrecord/entry/step' + (this.index + 2);
    }else{
      this.index = idx;
    }
    next(path);
  },
  methods:{
    nextStep(params){
      if(this.index <= 1){
        this.index ++;
        if(this.index < this.paramsArray.length){
          this.paramsArray.splice(this.index, this.paramsArray.length - this.index);
        }
        this.paramsArray.push(params);
      }else{
        this.paramsArray = [];
        this.index = -1
      }
      this.$store.commit('updateRecordEditStep', this.paramsArray);
      this.redirect();
    },
    prevStep(){
      if(this.index >= 0){
        this.index --;
        let arr = this.index >= 0 ? this.paramsArray.slice(0, this.index + 1) : [];
        this.$store.commit('updateRecordEditStep', arr);
        this.redirect();
      }
    },
    redirect(){
      this.$router.push('/person/orgrecord/entry/step' + (this.index + 2));
    },
    getPathStep(path){
      let prefix = '/person/orgrecord/entry/step';
      let st;
      if(path.startsWith(prefix)){
        st = Number(path.substring(prefix.length));
      }
      if(st > 0){
        return st;
      }
      return 1;
    }
  }
};
</script>
<style lang="less" scoped>
.orgrecord-entry{
  height: 100%;
  box-sizing: border-box;
  padding: @layout-space-base;

  .ant-layout{
    height: 100%;
    background: @white;
    border-radius: @border-radius-base;
    & > .header{
      background: none;
      padding-top: 30px;
      margin-bottom: 20px;
    }
    & > .content{
      height: 100%;
    }
  }
}
</style>