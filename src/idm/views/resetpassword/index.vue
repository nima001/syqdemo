<template>
  <a-layout style="height: 100%;min-width: 1200px;">
    <system-header/>
    <a-layout-content :style="{overflowY: 'auto', height: '100%'}">
      <div class="content">
        <div class="content-modal">
          <div class="warp">
            <a-steps :current="current" size="small">
              <a-step v-for="(step, index) in stepList" :key="index" :title="step.title" />
            </a-steps>
            <div>
              <component 
                :is="componentList[current]" 
                @toggle-step="next" 
                @set-info="setInfo" 
                :userInfo="userInfo">
              </component>
            </div>
          </div>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { Layout, Steps } from "ant-design-vue";
import SystemHeader from "@/framework/components/SystemHeader";
import FillAccount from './FillAccount';
import VerifyIdentity from './VerifyIdentity';
import SetNewPwd from './SetNewPwd';
import CompleteReset from './CompleteReset';

export default {
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    ASteps: Steps,
    AStep: Steps.Step,
    SystemHeader,
    FillAccount,
    VerifyIdentity,
    SetNewPwd,
    CompleteReset
  },
  data() {
    return {
      current: 0,
      stepList: [
        { title: '填写账号名', component: 'fillAccount' },
        { title: '验证身份', component: 'VerifyIdentity' },
        { title: '设置新密码', component: 'SetNewPwd' },
        { title: '完成', component: 'CompleteReset' },
      ],
      componentList: ['fillAccount', 'VerifyIdentity', 'SetNewPwd', 'CompleteReset'],
      userInfo: {}
    }
  },
  methods: {
    next(status) {
      if (status == 'next') {
        this.current ++;
      } else {
        this.current --;
      }
    },
    setInfo(info) {
      this.userInfo = info;
    }
  }
};
</script>

<style lang="less" scoped>
.ant-layout{
  .ant-layout-content{
    .content{
      // height: 100%;
      display: flex;
      justify-content: center;
      overflow: hidden;
      .content-modal{
        margin-top: 50px;
        width: 900px;
        padding: @padding-lg;
        background-color: @white;
        border-radius: 5px;
        .warp{
          /deep/.ant-steps{
            .ant-steps-item-icon{
              width: 36px;
              height: 36px;
              line-height: 36px;
              font-size: 16px;
            }
            .ant-steps-item-content{
              .ant-steps-item-title{
                font-size: 16px;
                line-height: 36px;
                font-weight: bolder;
                &::after{
                  top: 20px;
                }
              }
            }
          } 
        }
      }
    }
  }
}
</style>