<template>
  <li class="measure-item">
    <a-dropdown :trigger="['click']" overlayClassName="chat-console-axis-menu" :overlayStyle="{'min-width': '180px'}">
      <span class="title">
        {{title}}<a-icon type="close" class="remove" @click.stop="onMeasureMenuClick('remove')"/><a-icon type="caret-down" />
      </span>
      <a-menu slot="overlay" @click="onMeasureMenuClick($event.key)">
        <template v-if="value.type != 'count'">
          <a-menu-item key="sum" :class="{selected: value.type=='sum'}"><span class="icon">●</span>求和</a-menu-item>
          <a-menu-item key="avg" :class="{selected: value.type=='avg'}"><span class="icon">●</span>求平均</a-menu-item>
          <a-menu-divider/>
        </template>
        <template v-if="value.type == 'count' || field">
          <a-menu-item key="alias" :class="{selected: !!alias}">
            <span class="icon">●</span>别名{{alias && `(${alias})`}} 
          </a-menu-item>
          <a-menu-divider/>
        </template>
        <a-menu-item key="remove"><a-icon type="delete"/>删除</a-menu-item>
      </a-menu>
    </a-dropdown>
    <input-modal v-model="aliasSetter.show" v-bind="aliasSetter" />
  </li>
</template>
<script>
import { Modal, Icon, Dropdown, Menu, Input } from 'ant-design-vue'
import InputModal from '@framework/components/InputModal'

/**
 * 指标
 */
export default {
  components: {
    AModal: Modal,
    AIcon: Icon,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    ASubMenu: Menu.SubMenu,
    AMenuDivider: Menu.Divider,
    AInput: Input,
    InputModal,
  },
  props: {
    value: {
      type: Object,
      required: true
    },
    field: Object,
  },
  data(){
    return {
      aliasSetter: {
        show: false,
        title: undefined,
        value: undefined,
        callback: undefined,
      }
    }
  },
  computed: {
    measureName(){
      let {type, showname} = this.value;
      if(type == 'count'){
        return '记录数'
      }else{
        if(this.field){
          showname = this.field.showname;
        }
        return showname
      }
    },
    title(){
      let name = this.measureName;;
      if(this.value.type == 'sum'){
        name += '(求和)'
      }else if(this.value.type == 'avg'){
        name += '(求平均)'
      }
      return name;
    },
    alias: {
      get(){
        return this.value.showname;
      },
      set(v){
        this.value.showname = v;
      }
    },
  },
  methods: {
    setSort(sort){//FIXME sunwen 提供维度 按指标名称分组使用的外部方法
      this.value.sort = sort;
    },
    onMeasureMenuClick(key){
      if(key == 'remove'){
        this.$emit('remove');
      }else if(key == 'alias'){
        this.aliasSetter = { 
          show: true, 
          title: '设置别名',
          value: this.alias,
          callback: (value)=>{
            this.alias = value;
          }
        };
      }else if(this.value.type != 'count'){
        this.value.type = key;
      }
    },
  }
}
</script>
<style lang="less" scoped>
.measure-item{
  display: inline-block;
  position: relative;
  line-height: 1.8em;
  margin-left: 6px;
  background: fade(#5ad8a6, 25%);
  border-radius: 10px 0 10px 0;
  cursor: pointer;
  &:hover{
    background: fade(#5ad8a6, 50%);
    .remove{
      display: block;
    }
  }
  .title{
    padding: 0 10px;
  }
  .remove{
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 10px;
    padding: 1px 1px 3px 3px;
    border-top-right-radius: @border-radius-base;
    border-bottom-left-radius: 10px;
    // background-color: #cfcfcf;
    &:hover{
      color: red;
    }
  }
}
.chat-console-axis-menu{
  .selected{
    color: @primary-color;
    & .icon{
      visibility: visible;
    }
  }
  .icon{
    visibility: hidden;
    display: inline-block;
    width: 14px;
    margin-right: 8px;
    text-align: center;
  }
  .icon.show{
    visibility: visible;
  }
}
</style>