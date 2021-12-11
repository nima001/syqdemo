<template>
  <a-layout class="accordion-layout">
    <a-layout-sider v-if="!right" class="accordion-sider" theme="light" :trigger="null" :collapsedWidth="0"
      :width="siderWidth" :collapsible="true" v-model="collapsed">
      <a-layout class="body left">
        <div class="title-bar">
          <div class="title-body">
            <div class="title-text" v-if="navTitle != undefined">{{navTitle}}</div>
            <slot v-else name="navTitle"/>
          </div>
          <a :class="'collapse-trigger left ' + (collapsed ? 'collapsed' : 'expanded')" @click="collapsed=!collapsed">
            <a-icon :type="collapsed ? 'double-right' : 'double-left'" />
          </a>
        </div>
        <a-layout-content style="height:100%">
          <slot name="nav"/>
        </a-layout-content>
      </a-layout>
      <div v-if="resizeable" class="move-handle left" v-show="!collapsed" @mousedown.prevent="drag()"></div>
    </a-layout-sider>
    <a-layout-content>
      <slot/>
    </a-layout-content>
    <a-layout-sider v-if="right" class="accordion-sider" theme="light" :trigger="null" :collapsedWidth="0"
      :width="siderWidth" :collapsible="true" v-model="collapsed">
      <a-layout class="body right">
        <div class="title-bar">
          <div class="title-body">
            <div class="title-text" v-if="navTitle != undefined">{{navTitle}}</div>
            <slot v-else name="navTitle"/>
          </div>
          <a :class="'collapse-trigger right ' + (collapsed ? 'collapsed' : 'expanded')" @click="collapsed=!collapsed">
            <a-icon :type="collapsed ? 'double-left' : 'double-right'" />
          </a>
        </div>
        <a-layout-content style="height:100%">
          <slot name="nav"/>
        </a-layout-content>
      </a-layout>
      <div v-if="resizeable" class="move-handle right" v-show="!collapsed" @mousedown.prevent="drag()"></div>
    </a-layout-sider>
  </a-layout>
</template>
<script>
import { Layout, Icon } from 'ant-design-vue';

/**
 * 手风琴布局 
 * 提供导航栏和内容区域，可拖拽调整两个区域的大小，以及收起导航栏
 * 提供两个solt：
 *  nav 导航栏
 *  (default) 内容区域
 * @author sunwen
 */
export default {
  components: {
    ALayout:Layout,
    ALayoutSider:Layout.Sider,
    ALayoutContent:Layout.Content,
    AIcon: Icon,
    ALayout:Layout,
    AIcon:Icon
  },
  props: {
    defaultNavWidth: {//默认导航栏宽度
      type: Number,
      default: 300 
    },
    right: {//导航栏是否靠右 默认false
      type: Boolean,
      default: false,
    },
    navTitle: {//导航栏标题 
      type: String,//或 solt
    },
    resizeable: {//是否可拖拽调整大小
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      siderWidth: this.defaultNavWidth + 10,
      collapsed: false,
    };
  },
  computed: {
    minWidth(){
      return Math.min(310, this.defaultNavWidth + 10);
    }
  },
  methods: {
    drag(){
      //TODO sunwen 优化拖拽功能
      let that = this;
      let startX = event.x;
      let sw = this.siderWidth;
      document.onmousemove = function(){
        let moveX = that.right ? startX - event.x : event.x - startX;
        that.siderWidth = Math.min(610, Math.max(that.minWidth, sw + moveX));;
      };
      document.onmouseup = function(){
        document.onmousemove = null;
        document.onmouseup = null;
      };
      return false;
    }
  }
};
</script>
<style lang="less" scoped>
.accordion-layout {
  height: 100%;
  padding: @layout-space-base;
  overflow: hidden;
  .accordion-sider {
    background: unset;
    .body {
      height: 100%;
      background-color: @white;
      border-radius: @border-radius-base;
      &.left{
        margin-right: @layout-space-base;
      }
      &.right{
        margin-left: @layout-space-base;
      }
      .title-bar {
        height: 40px;
        border-bottom: #ddd solid 1px;
      }
      .title-body{
        height: 40px;
        margin-bottom: -1px;
        padding-right: 40px;
      }
      .title-text{
        font-size: 1.1em;
        text-indent: 20px;
        line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .collapse-trigger {
      position: absolute;
      top: 0;
      height: 40px;
      line-height: 40px;
      padding: 0 5px;
      color: #666;
      z-index: 1000;
      &:hover {
        color: #000;
      }
    }
    .collapse-trigger.expanded {
      &.left{
        right: @layout-space-base + 15;
      }
      &.right{
        right: 15px;  
      }
    }
    .collapse-trigger.collapsed {
      background-color: white;
      &.left{
        left: -10px;
        border-radius: 0 20px 20px 0;
        box-shadow: 2px 0px 6px #c5c5c5;
      }
      &.right{
        right: -10px;
        border-radius: 20px 0 0 20px;
        box-shadow: 0px 2px 6px #c5c5c5;
      }
    }
    .move-handle {
      position: absolute;
      width: @layout-space-base;
      height: 100%;
      top: 0;
      cursor: w-resize;
      &.left{
        right: 0;
      }
      &.right{
        left: 0;
      }
    }
  }
  .ant-layout-content{
    border-radius: @border-radius-base;
  }
}
</style>