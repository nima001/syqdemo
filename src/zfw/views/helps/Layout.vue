<template>
  <a-layout class="main">
    <a-layout-sider class="sider">
      <a-menu mode="inline" :default-selected-keys="[2]">
        <a-menu-item v-for="(item, index) in menuList" :key="index + 1">
            <router-link :to="item.link">
          <span class="nav-text">
            {{item.name}}
          </span>
            </router-link>
        </a-menu-item>
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

export default {
  props: {},
  components: {
    ALayout: Layout,
    ALayoutHeader: Layout.Header,
    ALayoutContent: Layout.Content,
    ALayoutSider: Layout.Sider,
    AMenu: Menu,
    AMenuItem: Menu.Item,
  },
  data() {
    return {
      menuList: [
        { link: '/zfw/helps/datatotal', name: '概述' },
        { link: '/zfw/helps/datatotal', name: '用户数据统计' },
        { link: '/zfw/helps/datatotal', name: '业务中心' },
        { link: '/zfw/helps/datatotal', name: '消息中心' },
        { link: '/zfw/helps/datatotal', name: '常见问题' },
      ]
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.main{
  height: 100%;
  /deep/.sider{
    overflow: auto;
    position: fixed;
    left: 0;
    height: 100vh;
    width: 230px !important;
    max-width: 230px !important;
    background-color: @white;
    // -moz-box-shadow:4px 0px 8px #E7E7E7; 
    // -webkit-box-shadow:4px 0px 8px #E7E7E7; 
    // box-shadow:4px 0px 8px #E7E7E7;
    .ant-layout-sider-children{
      ul{
        margin-top: @padding-lg;
        // border-right: none;
        li{
          margin: 0;
          height: 50px;
        }
      }
    }
  }
}
</style>