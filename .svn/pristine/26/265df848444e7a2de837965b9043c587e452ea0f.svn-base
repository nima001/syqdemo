<template>
  <a-layout class="processwrap">
    <a-layout-content class="body">
      <div style="margin-top:20px;">
        <div class="guide">
          <a-steps :current="5" progressDot>
            <a-step
              :title="item.title"
              v-for="(item,index) in processList"
              :key="index"
              style="cursor:pointer"
              @click="changePage(item.status)"
            />
          </a-steps>
        </div>
        <div class="content">
          <process-design v-if="status==1"></process-design>
          <set-pdf v-if="status==2"></set-pdf>
          <model-interface v-if="status==3"></model-interface>
          <completed-materials-list v-if="status==4"></completed-materials-list>
          <!-- <process-detection v-if="status==4"></process-detection> -->
          <post-process v-if="status==5"></post-process>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { uiConfigsCookies } from "@/framework/utils/auth";
import ProcessDesign from "./ProcessDesign";
import SetPdf from "./SettingPdf";
import ProcessDetection from "./ProcessDetection";
import PostProcess from "./PostProcess";
import ModelInterface from "./ModelInterface";
import CompletedMaterialsList from "./CompletedMaterialsList";
import "@/workflow/style/process.css";
import { Layout, Breadcrumb, Steps } from "ant-design-vue";
export default {
  name: "newProcessTemplate",
  data() {
    return {
      uiConfigs: uiConfigsCookies(),
      processList: [
        { title: "流程设计", status: 1 },
        { title: "PDF设置", status: 2 },
        { title: "接口管理", status: 3 },
        { title: "已办材料清单", status: 4 },
        // { title: "流程检测", status: 4 },
        { title: "后置流程", status: 5 }
      ],
      status: 1
    };
  },
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ABreadcrumb: Breadcrumb,
    ABreadcrumbItem: Breadcrumb.Item,
    ASteps: Steps,
    AStep: Steps.Step,
    SetPdf,
    ProcessDetection,
    ProcessDesign,
    PostProcess,
    ModelInterface,
    CompletedMaterialsList
  },
  methods: {
    //点击切换
    changePage(status) {
      this.status = status;
    }
  }
};
</script>
<style lang="less" scoped>
.body {
  padding: 10px 30px;
  background: #fff;
  /deep/.ant-steps-item-finish
    .ant-steps-item-icon
    > .ant-steps-icon
    .ant-steps-icon-dot {
    background: skyblue;
  }
  /deep/.ant-steps-item-finish > .ant-steps-item-tail:after {
    background-color: skyblue;
  }
  /deep/.ant-steps-item-title {
    font-weight: bold;
    font-size: 15px;
  }
  .guide {
    width: 60%;
    margin: 0 auto 50px;
  }
}
</style>