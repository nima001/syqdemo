<template>
  <div class="layout">
    <div class="content">
      <div class="top">
        <div class="title">
          <span class="name">{{$route.query.code}}</span>
          <span class="back" @click="closestep">返回</span>
        </div>
      </div>
      <a-tabs v-model="activeKey" @change="callback">
        <a-tab-pane key="1" tab="接口信息">
          <service-action-apply :allow="false"></service-action-apply>
        </a-tab-pane>
        <!-- <a-tab-pane key="2" tab="已审核接口">
          <interface-audited></interface-audited>
        </a-tab-pane> -->
      </a-tabs>
    </div>
  </div>
</template>
<script>
import { Tabs, Icon, Button, Modal, Form, Input } from "ant-design-vue";
import ServiceActionApply from "./components/ServiceActionApply";
import InterfaceAudited from '../auditcenter/components/InterfaceAudited';
import { appdetail } from "@/dev/api/app";
export default {
  components: {
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    AIcon: Icon,
    AButton: Button,
    AModal: Modal,
    AForm: Form,
    AFormItem: Form.Item,
    ATextarea: Input.TextArea,
    ServiceActionApply,
    InterfaceAudited
  },
  data() {
    return {
      activeKey: "1",
      refuseVisible: false,
      refusedForm: this.$form.createForm(this)
    };
  },
  methods: {
    callback(key) {
      this.activeKey = key;
    },
    //关闭当前窗口，返回上一级
    closestep() {
      if (this.hasPermit("/dev/audit/service/verify")) {
        this.$router.go(-1);
      } else {
        this.$router.push({
          path: "/dev/manage/app",
          query: {
            id: this.$route.query.appid
          }
        });
      }
    }
  }
};
</script>
<style lang='less' scoped>
.layout {
  width: 100%;
  height: 100%;
  padding: @layout-space-base;
  .content {
    width: 100%;
    height: 100%;
    background: @white;
    padding: @content-padding-v @content-padding-h;
    display: flex;
    flex-direction: column;
    .top {
      .title {
        display: flex;
        justify-content: space-between;
        .name {
          font-size: 18px;
          font-weight: bold;
        }
        .back {
          color: @primary-color;
          cursor: pointer;
        }
      }
    }
  }
}
</style>