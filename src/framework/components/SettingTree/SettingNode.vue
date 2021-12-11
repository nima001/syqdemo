<template>
  <div class="setting-node" :class="{expandable: expandable, expanded: property._expanded}">
    <div class="header" @click.prevent="property._expanded = !property._expanded">
      <a-icon type="right" v-if="expandable"/>
      <div class="header-content">
        <span class="title" :style="{
          minWidth: depth > 0 ? `calc(37.5% - ${12 * depth}px)` : '37.5%'
        }">{{property.title}}</span>
        <template v-if="valueComponent" >
          <span class="space"/>
          <component :is="valueComponent" class="extra"  
            @click.native="e => e.stopPropagation()"
            :property="property"
            :settings="settings"
          />
        </template>
      </div>
    </div>
    <div v-if="expandable" class="expand-pane">
      <template v-if="propList && propList.length">
        <setting-node v-for="item in propList" :key="item.path" 
          :depth="depth + 1"
          :property="item"
          :settings="settings"
        />
      </template>
      <div v-if="property.content" class="content">
        <component :is="property.content" 
          :property="property"
          :settings="settings"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from 'ant-design-vue'
import BooleanProp from './BooleanProp'
import NumberProp from './NumberProp'
import EnumProp from './EnumProp'
import StringProp from './StringProp'

import { getPropList } from './utils'

export default {
  name: 'SettingNode',
  components: {
    AIcon: Icon,
    BooleanProp,
    NumberProp,
    EnumProp,
    StringProp,
  },
  props: {
    property: Object,
    settings: Object,
    depth: {
      type: Number,
      default: 0,
    },
  },
  data(){
    return {
      valueComponent: undefined,
      propList: undefined,
      expandable: false,
    }
  },
  watch: {
    property: {
      immediate: true,
      handler(prop){
        this.initData();
      }
    }
  },
  methods: {
    initData(){
      let {type, proxy, path, extra, content, properties } = this.property;
      let list = getPropList(properties, path);
      let component = undefined, proxyProperty = undefined;
      if(type == 'object' || type == 'void'){
        if(proxy){
          let index = list.findIndex(item => item.name == proxy);
          if(index >= 0){
            proxyProperty = list[index];
            type = proxyProperty.type;
            extra = proxyProperty.extra;
            list.splice(index, 1);
          }
        }
      }
      if(extra){
        component = extra;
      }else if(type == 'number'){
        component = 'NumberProp';
      }else if(type == 'boolean'){
        component = 'BooleanProp'
      }else if(type == 'enum'){
        component = 'EnumProp'
      }else if(type == 'string'){
        component = 'StringProp'
      }
      this.property.proxy = proxyProperty
      this.valueComponent = component;
      this.propList = list;
      this.expandable = !!(content || (list && list.length));
    },
  }
}
</script>
<style lang="less" scoped>
.setting-node{
  border-bottom: 1px solid @border-color-split;
  &.expandable{
    & > .header{
      cursor: pointer;
    }
  }
  &.expanded{
    & > .header > .anticon /deep/ svg{
      transform: rotate(90deg);
    }
    & > .expand-pane{
      display: block;
    }
  }
  & > .header{
    position: relative;
    padding: 8px 16px;
    & > .anticon{
      position: absolute;
      top: 50%;
      left: 1px;
      transform: translateY(-50%);
      font-size: 12px;
      /deep/ svg{
        transition: transform .24s;
      }
    }
    .header-content{
      display: flex;
      align-items: center;
      min-height: 32px;
      & > .title{
        flex: auto;
        min-width: 37.5%;
        line-height: 1.2em;
      }
      & > .space{
        flex: none;
        width: 10px;
      }
      & > .extra{
        cursor: default;
        flex: 0 1 auto;
        min-width: 1px;
      }
    }
  }
  & > .expand-pane{
    display: none;
    padding-left: 16px;
    .content{
      padding: 4px 16px;
      margin-left: -16px;
      // background-color: @background-color-light;
    }
    .setting-node:last-child{
      border-bottom: none;
    }
  }
}
</style>