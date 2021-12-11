<template>
  <div class="person-account">
    <div class="container">
      <div class="warp">
        <div class="top">
          <div class="top-link" @click="link">开设{{accountName}}账号，点这里&nbsp;></div>
          <div class="top_step">
            <a-steps :current="current" size="small">
              <a-step v-for="(step, index) in stepList" :key="index" :title="step.title" />
            </a-steps>
          </div>
        </div>
        <div class="center">
          <keep-alive>
            <component 
              @next-step="next" 
              @set-info="setInfo" 
              :is="componentList[current]" 
              :info="info"
              :accountType="accountType"
            />
          </keep-alive>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { Steps } from "ant-design-vue";
import BasicInfo from "./BasicInfo";
import AppImpower from "./AppImpower";
import Inform from "./Inform";

export default {
  props: {
    accountType: {
      type: String
    }
  },
  components: {
    ASteps: Steps,
    AStep: Steps.Step,
    BasicInfo,
    AppImpower,
    Inform
  },
  data() {
    return {
      current: 0,
      stepList: [
        { title: '填写基本信息' },
        { title: '应用授权' },
        { title: '开户通知' },
      ],
      componentList: ['basicInfo', 'appImpower', 'inform'],
      info: {}
    };
  },
  watch: {},
  computed: {
    accountName() {
      return this.accountType == 'person' ? '单位' : '个人';
    }
  },
  created() {},
  mounted() {},
  methods: {
    next(status) {
      if (status === 'next') {
        this.current ++;
      } else {
        this.current --;
      }
    },
    setInfo(info) {
      this.info = info;
    },
    link() {
      let url = this.accountType == 'person' ? '/idm/orgaccount' : '/idm/personalaccount';
      this.$router.push(url);
    }
  },
};
</script>
<style lang="less" scoped>
.person-account{
  min-height: 100%;
  margin: 0 10px;
  background-color: @white;
  .container{
    min-height: 100%;
    .warp{
      width: 1000px;
      margin: 0 auto;
      .top{
        overflow: hidden;
        .top-link{
          text-align: right;
          line-height: 30px;
          color: @primary-color;
          cursor: pointer;
        }
        .top_step{
          width: 600px;
          margin: 10px auto 20px;
        }
      }
    }
  }
}
</style>