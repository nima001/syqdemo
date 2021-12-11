<template>
  <a-layout class="main">
    <a-layout-sider class="sider">
      <a-menu mode="inline" :default-selected-keys="[key]" @click="toggle">
      <!-- <a-menu mode="inline" :default-selected-keys="[key]" @click="toggle"> -->
        <a-menu-item key="1">
          <router-link to="/zfw/overview/index">
            <a-icon type="user" />
            <span class="nav-text">
              数据概览
            </span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="team" /><span>自然人用户</span></span>
          <a-menu-item key="2">
            <router-link to="/zfw/overview/naturalreg">用户注册</router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/zfw/overview/naturallogin">用户登录</router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '230px' }">
      <!-- <div class="layout_header">
        <SelectCondition></SelectCondition>
      </div> -->
      <!-- <a-layout-content :style="{ margin: '16px', overflow: 'initial' }">
      </a-layout-content> -->
        <router-view></router-view>
    </a-layout>
  </a-layout>
</template>

<script>
import { Layout, Menu, Icon } from "ant-design-vue";
import SelectCondition from '@/zfw/components/overview/SelectCondition';

export default {
  props: {},
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ALayoutSider: Layout.Sider,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ASubMenu: Menu.SubMenu,
    AIcon: Icon,
    SelectCondition
  },
  data() {
    return {
      key: '1'
    };
  },
  watch: {
    '$route.path': {
      handler(val) {
        switch(val) {
          case '/zfw/overview/naturalreg':
            this.key = '2';
            break;
          case '/zfw/overview/naturallogin':
            this.key = '3';
            break;
          default: 
            this.key = '1';
        }
      },
      immediate: true
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toggle({item, key, keyPath}) {
      this.key = key + '';
    }
  },
};
</script>
<style lang="less" scoped>
.main{
  /deep/.sider{
    overflow: auto;
    position: fixed;
    left: 0;
    height: 100vh;
    width: 230px !important;
    max-width: 230px !important;
    background-color: @white;
    -moz-box-shadow:4px 0px 8px #E7E7E7; 
    -webkit-box-shadow:4px 0px 8px #E7E7E7; 
    box-shadow:4px 0px 8px #E7E7E7;
    .ant-layout-sider-children{
      ul{
        margin-top: @padding-lg;
        border-right: none;
        li{
          margin: 0;
          height: 50px;
        }
      }
    }
  }
}
</style>