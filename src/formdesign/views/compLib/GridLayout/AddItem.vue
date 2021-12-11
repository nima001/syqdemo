<template>
  <div class="add-item">
    <span>{{`共${count}项`}}</span>
    <a-button style="margin-left:10px" size="small" icon="plus" @click="addItem">添加</a-button>
  </div>
</template>
<script>
import { Button, Icon } from 'ant-design-vue'
import PropMixin from '@framework/components/SettingTree/PropMixin'
import { generateCode } from '@/formdesign/utils'

export default {
  components:{
    AButton: Button,
    AIcon: Icon,
  },
  mixins: [PropMixin],
  computed:{
    count(){
      if(this.propValue){
        return Object.keys(this.propValue).length;
      }
      return 0;
    }
  },
  methods: {
    addItem(){
      this.expanded = true;
      this.propValue = {
        ...this.propValue,
        [generateCode()]: {
          type: 'void',
          'x-component': 'GridLayout.Grid',
          'x-component-props': { span: 12 },
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.add-item{
  color: @disabled-color;
  white-space: nowrap;
}
</style>