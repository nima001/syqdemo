<template>
  <div class="criterion">
    <a-input :value="value.field && value.field.showname" 
      read-only class="field"
      @click.native="showFieldSelect('field')"
    >
      <a-icon slot="suffix" type="select"/>
    </a-input>
    <a-select :value="value.op" @change="onOpChange" class="op-select">
      <a-select-option v-for="item in opList" :key="item.value">{{item.text}}</a-select-option>
    </a-select>
    <template v-if="hasOp2">
      <a-input :value="value.field2 && value.field2.showname" 
        read-only class="field2"
        @click.native="showFieldSelect('field2')">
        <a-icon slot="suffix" type="select"/>
      </a-input>
      <a-select v-model="op2" class="op2">
        <a-select-option v-for="item in opList2" :value="item.value" :key="item.value">{{item.text}}</a-select-option>
      </a-select>
    </template>
    <component v-if="cType" :is="cType" v-model="value.value" :target="target" :criterion="value"/>
    <a-input v-else :read-only="true" class="input-holder"/>
    <a class="remove" @click="$emit('remove')"><custom-icon type="delete"/></a>
    <a-modal v-model="selectField.show" title="字段选择" 
      :destroyOnClose="true" :footer='null' 
      width='500px' :bodyStyle="{height: '600px', padding:'0px'}">
      <select-field :targetid="target.id" v-bind="selectField.params" @finish="onFieldSelected"/>
    </a-modal>
  </div>
</template>
<script>
import { Input, Icon, Select } from "ant-design-vue";
import CustomIcon from "@/framework/components/CustomIcon";
import SelectField from './SelectField';
import { querylistop } from "@person/api/integratedquery";
import NumberArray from '../fields/NumberArray';
import NumberBetween from '../fields/NumberBetween';
import NumberValue from '../fields/NumberValue';
import BooleanValue from '../fields/BooleanValue';
import DateBetween from "../fields/DateBetween";
import DateValue from "../fields/DateValue";
import StringArray from '../fields/StringArray';
import StringValue from "../fields/StringValue";
import DictArray from '../fields/DictArray';
import DictValue from "../fields/DictValue";
import ReferArray from '../fields/ReferArray';
import ReferValue from "../fields/ReferValue";
import { showError } from "@/framework/utils/index";


/**
 * 单个条件
 */
export default {
  name: "Criterion",
  components: {
    AInput: Input,
    AIcon: Icon,
    ASelect: Select,
    ASelectOption: Select.Option,
    CustomIcon,
    NumberArray,
    NumberBetween,
    NumberValue,
    BooleanValue,
    DateBetween,
    DateValue,
    StringArray,
    StringValue,
    DictArray,
    DictValue,
    ReferArray,
    ReferValue,
    SelectField
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    target: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data(){
    return{
      opList: undefined,
      opList2: undefined,
      op2: undefined,
      selectField: {
        show: false,
        params: {}
      }
    }
  },
  created() {
    if (this.value.field) {
      if(this.value.opList){
        this.opList = this.value.opList;
      }else{
        this.loadOpList(this.value.field.key);
      }
      if(this.isArithOp(this.value.op)){
        if(this.value.opList2){
          this.opList2 = this.value.opList2;
        }else{
          this.loadOpList(this.value.field.key, this.value.op);
        }
      }
    }
    this.op2 = this.value.op2;
  },
  computed: {
    cType() {
      return this.comType(this.value.field, this.value.op);
    },
    hasOp2(){
      return this.isArithOp(this.value.op)
    }
  },
  watch: {
    opList(list){
      this.value.opList = list;//同步缓存到条件对象上，防止条件变化层级时操作列表重复加载
    },
    opList2(list){
      this.value.opList2 = list;
    },
    op2(value){
      this.value.op2 = value;
    }
  },
  methods: {
    showFieldSelect(name){
      this.selectField = {
        show: true,
        params: name == 'field2' ? { field: this.value.field, op: this.value.op } : {},
        name
      }
    },
    onFieldSelected(type, data){
      if(type == 'ok'){
        this.value[this.selectField.name] = data;
        if(this.selectField.name == 'field'){
          this.reset();
        }
      }
      this.selectField.show = false;
    },
    onOpChange(op){
      let value = this.value.value;
      if(this.isArrayOp(this.value.op)){
        if(!this.isArrayOp(op)){
          if(Array.isArray(value)){
            this.value.value = value[0]
          }
        }
      }else if(this.isArrayOp(op)){
        if(value !== undefined && !Array.isArray(value)){
          this.value.value = [value]
        }
      }
      this.value.op = op;
      this.value.field2 = undefined;
      this.value.op2 = undefined;
      
      this.opList2 = undefined;
      if(this.isArithOp(op)){//计算操作符加载第二个操作符列表
        this.loadOpList(this.value.field.key, op);
      }
    },
    reset() {
      this.value.op = undefined;
      this.value.field2 = undefined;
      this.value.op2 = undefined;
      this.value.value = undefined;
      
      this.opList = undefined;
      this.opList2 = undefined;
      if(this.value.field){
        this.loadOpList(this.value.field.key)
      }
    },
    loadOpList(fieldKey, op) {
      querylistop({
        targetid: this.target.id,
        key: fieldKey,
        op
      }).then(({result}) => {
        if(op){//加载第二个操作符
          this.opList2 = result;
          if(!this.value.op2){
            this.value.op2 = result[0].value;
          }
        }else{
          this.opList = result;
          if(!this.value.op){//设置默认操作符
            this.value.op = result[0].value;
          }
        }
      }).catch(error => {
        showError(error);
      });
    },
    isArrayOp(op){
      if(op){
        return ['between', 'in', 'nin'].includes(op);
      }
    },
    isArithOp(op){
      return op == 'add' || op == 'subtract' || op == 'multiply' || op == 'divide';
    },
    comType (field, op) {
      let { datatype, inputtype } = field || {};
      if (datatype == 2) { /** 字典 */
        if (op == 'in' || op == 'nin') {
          return 'DictArray'
        } else if (op) {
          return 'DictValue'
        }
      } else if (datatype == 3) { /** 引用 */
        if (op == 'in' || op == 'nin') {
          // 引用数据多选
          return 'ReferArray'
        } else if (op) {
          // 引用数据
          return 'ReferValue'
        }
      } else if (datatype == 4) { /** 输入 */
        if (inputtype == 1 || inputtype == 2) {
          // 数字
          if(this.isArithOp(op)){
            return 'NumberValue'
          }else if (op == 'in' || op == 'nin') {
            return 'NumberArray'
          } else if (op == 'between') {
            return 'NumberBetween'
          } else if (op) {
            return 'NumberValue'
          }
        } else if (inputtype == 3) {
          // 时间
          if (op == 'between') {
            return 'Date-between'
          } else if (op) {
            return 'DateValue'
          }
        } else if (inputtype == 4) {
          // 布尔
          return 'BooleanValue'
        }else{
          // 字符
          if (op == 'in' || op == 'nin') {
            return 'StringArray'
          } else if (op) {
            return 'StringValue'
          }
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.criterion {
  display: flex;
  align-items: center;
  .field {
    flex: none;
    width: 250px;
    margin-right: 10px;
    cursor: pointer;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }
  .op-select {
    flex: none;
    width: 120px;
    margin-right: 10px;
  }
  .field2{
    width: 250px;
    margin-right: 10px;
    cursor: pointer;
  }
  .op2{
    flex: none;
    width: 120px;
    margin-right: 10px;
  }
  .input-holder{
    width: 300px;
  }
  .remove {
    flex: none;
    color: @primary-color;
    cursor: pointer;
    .icon{
      width: 20px;
      height: 20px;
    }
    &:hover {
      color: fade(@primary-color, 75%);
    }
    &:last-child {
      margin-left: 10px;
    }
  }
}
</style>