<template>
  <draggable class="item-list"
    v-model="items" 
    tag="ul"
    handle='.drag-handle'
    :animation="200"
    ghost-class="ghost"
  >
    <transition-group>
      <li v-for="(item, index) in items" :key="item.name">
        <a-icon type="menu" class="drag-handle"/>
        <number-prop class="span" :settings="item" :property="{
          path: 'x-component-props.span', title: '占位格数', required: true,
          attrs: {min: 1, max: 24, precision: 0, placeholder: '占位格数'}
        }"/>
        <a v-if="items.length > 1" 
          @click="deleteItem(item, index)"
          class="delete"
        ><a-icon type="minus-circle"/></a>
      </li>
    </transition-group>
  </draggable>
</template>
<script>
import { Icon } from 'ant-design-vue'
import draggable from 'vuedraggable'
import NumberProp from '@framework/components/SettingTree/NumberProp'
import { getOrderProperties } from '../../../utils/schema'
import PropMixin from '@framework/components/SettingTree/PropMixin'
import { reactive } from '@vue/composition-api'
 
export default {
  components: {
    draggable,
    AIcon: Icon,
    NumberProp,
  },
  mixins: [PropMixin],
  computed: {
    items: {
      get(){
        return getOrderProperties(this.propValue);
      },
      set(value){
        let obj = {};
        if(Array.isArray(value)){
          for(let item of value){
            obj[item.name] = item;
          }
        }
        this.propValue = obj;
      },
    }
  },
  methods: {
    deleteItem(item, idx){
      this.items.splice(idx, 1);
      this.items = [...this.items]//FIXME sunwen 数组操作响应性丢失 先简单处理下
    }
  }
}
</script>
<style lang="less" scoped>
.item-list{
  margin: 0;
  li{
    display: flex;
    padding: 5px 0;
    align-items: center;
    .drag-handle{
      cursor: move;
    }
    .span{
      width: 120px;
      margin: 0 10px;
    }
    .delete{
      &:hover{
        color: @error-color;
      }
    }
  }
}
</style>