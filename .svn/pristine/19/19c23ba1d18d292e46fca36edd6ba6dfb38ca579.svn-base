<template>
  <div class="component-selection" :class="{dragging: dragging}">
    <div class="component-tools" @click="e => e.stopPropagation()">
      <a class="handle" draggable="true" 
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        title="按住可拖拽"
      ><a-icon type="drag" /></a>
      <a-dropdown v-model="parentVisible" overlayClassName="component-tools-parents">
        <a><CustomIcon :type="component.icon" style="margin-right: 2px"/>{{component.title}}</a>
        <a-menu v-if="parents && parents.length" slot="overlay" @click="onParentSelect">
          <a-menu-item v-for="(item, index) in parents" :key="index"   
            @mouseenter="$emit('hover', item)"
            @mouseleave="$emit('hover')"
          ><CustomIcon :type="item.icon"/>{{item.title}}</a-menu-item> 
        </a-menu>
      </a-dropdown>
      <template v-if="size > 1">
        <a @click="onMoveUp" :class="{disabled: index == 0}" title="上移"><a-icon type="up"/></a>
        <a @click="onMoveDown" :class="{disabled: index == size - 1}" title="下移"><a-icon type="down"/></a>
      </template>
      <a @click="$emit('delete')" title="删除"><a-icon type="delete"/></a>
    </div>
  </div>
</template>
<script>
import { Dropdown, Menu, Icon } from "ant-design-vue";
import CustomIcon from '@/framework/components/CustomIcon'
import { propsSize, indexOfParent } from "@/formdesign/utils/schema"

/**
 * 组件编辑工具条
 * 事件
 * change    组件变更
 * hover     父组件悬停
 * dragstart 开始拖动
 * dragend   结束拖动
 * move      移动 index
 * delete    删除
 */
export default {
  components: {
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: Menu.Item,
    AIcon: Icon,
    CustomIcon
  },
  props: {
    component: { //操作的组件对象 { name, type, icon, parents, instance }
      type: Object,
    },
  },
  data(){
    return {
      dragging: false,
      parentVisible: false,
    }
  },
  computed: {
    parents(){
      return this.component && this.component.parents;
    },
    size(){
      if(this.component){
        let { instance: { schema } } = this.component;
        return propsSize(schema.parent);
      }
    },
    index(){
      if(this.component){
        let { instance: { schema } } = this.component;
        return indexOfParent(schema);
      }
    },
  },
  methods: {
    onDragStart(e){
      setTimeout(() => this.dragging = true, 0);
      this.$emit('dragstart', e)
    },
    onDragEnd(e){
      this.dragging = false;
      this.$emit('dragend', e)
    },
    onParentSelect({key}){
      this.parentVisible = false;
      this.$emit('change', this.parents[key])
    },
    onMoveUp(e){
      if(this.index > 0){
        this.$emit('move', this.index - 1);
      }
    },
    onMoveDown(e){
      if(this.index < this.size - 1){
        this.$emit('move', this.index + 1);
      }
    }
  }
}
</script>
<style lang="less" scoped>
.component-selection{
  outline: 2px solid fade(@accent-color, 50%);
  pointer-events: none;
  &.dragging{
    background: fade(@accent-color, 10%);
    .component-tools{
      display: none;
    }
  }
}
.component-tools{
  position: absolute;
  margin-top: -22px;
  font-size: 14px;
  line-height: 22px;
  white-space: nowrap;
  pointer-events: all;
  a{
    background: @accent-color;
    border-radius: 2px;
    margin-right: 2px;
    padding: 1px 3px;
    color: fade(@white, 80%);
    &.disabled{
      background: lighten(@accent-color, 20%);
      cursor: not-allowed;
    }
    &:hover{
      color: @white;
    }
  }
  .handle{
    cursor: move;
  }
}

.component-tools-parents{
  .ant-dropdown-menu-item{
    font-size: 14px;
    padding: 2px 8px;
  }
}
</style>