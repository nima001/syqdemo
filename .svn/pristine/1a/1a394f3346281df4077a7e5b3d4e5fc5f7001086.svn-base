<!-- 流程应用模型设计 -->
<template>
  <a-layout class="main">
    <div class="maincontent">
      <div class="header">
        <a-steps v-model="current" type="navigation" :style="{boxShadow: '0px -1px 0 0 #e8e8e8 inset'}" @change="onChange">
          <a-step v-for="(item, index) in steps" :key="index" :title="item.title" :status="item.index === current ? 'process':'wait'" />
        </a-steps>
        <div class="right">
          <a-button type="primary" @click="save">保存</a-button>
        </div>
      </div>
      <div class="body">
        <keep-alive include="formDesign,flowDesign,modelConfig">
          <component :is="steps[current].component" :data="model[steps[current].params]"/>
        </keep-alive>
      </div>
    </div>
  </a-layout>
</template>
<script>
import { Layout, Steps, Button } from "ant-design-vue";
import FormDesign from "./components/FormDesign";
import FlowDesign from "./components/FlowDesign";
import ModelConfig from "./components/ModelConfig";

export default {
  components: {
    ALayout: Layout,
    ALayoutHeader:Layout.Header,
    ALayoutContent:Layout.Content,
    ASteps: Steps,
    AStep: Steps.Step,
    AButton: Button,
    FormDesign,
    FlowDesign,
    ModelConfig
  },
  data() {
    return {
      current: 0,
      steps: [
        {title: "表单设计", index: 0, component: "FlowDesign", params: 'formData'},
        {title: "流程设计", index: 1, component: "FormDesign", params: 'flowData'},
        {title: "高级配置", index: 2, component: "ModelConfig", params: 'configData'}
      ],
      model:{
        formData:{},
        flowData:{},
        configData:{}
      }
    };
  },
  methods: {
    onChange(current) {
      console.log('onChange:', current);
      this.current = current;
    },
    save(){
      console.log(this.model);
    }
  }
};
</script>
<style lang="less" scoped>
.main{
  height: 100%;
  padding: @layout-space-base;
  .maincontent{
    height: 100%;
    border-radius: @border-radius-base;
    background-color: white;
    display: flex;
    flex-direction: column;
    .header{
      display: flex;
      .right{
        box-shadow: 0px -1px 0 0 #e8e8e8 inset;
        width: 100px;
        margin-top: 12px;
        padding-left: 15px;
      }
    }
    .body{
      display: flex;
      height: 100%;
    }
  }
}
</style>