<template>
  <div class="form-panel" ref="formBody">
    <a-row :gutter="24" v-if="initData">
      <template v-for="item in properties">
        <a-col :span="item.span || 24" :key="item.code">
          <component :is="getInputType(item)" ref="inputBox" 
            :value="initData"
            :property="item"
            @change="onChange"
          />
        </a-col>
      </template>
    </a-row>
  </div>
</template>
<script>
import { Row, Col } from 'ant-design-vue';
import InputText from "./InputText";
import InputNumber from "./InputNumber";
import InputDate from "./InputDate";
import InputBool from "./InputBool";
import InputDict from "./InputDict";
import InputRefer from "./InputRefer";

import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';

export default {
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    properties: {
      type: Array,
    },
  },
  components: {
    ARow:Row,
    ACol:Col,
    InputText,
    InputNumber,
    InputDate,
    InputBool,
    InputDict,
    InputRefer,
  },
  data(){
    return {
      initData: this.checkProperty(cloneDeep(this.value)),
    }
  },
  // beforeCreate(){
  //   console.log(this);
  // },
  // created(){
  //   console.log('PropValueForm created', this.initData);
  // },
  watch:{
    value(data) {
      this.initData = this.checkProperty(cloneDeep(data));
    },
    properties(v){
      this.initData = this.checkProperty(cloneDeep(this.value))
    }
  },
  methods: {
    onChange(code, val){
      this.$emit('change', code, val);
      this.$emit('input', this.initData);
    },
    getInputType(item){
      let { datatype, inputtype, datasource, multi} = item;
      if(datatype == 2){
        return 'input-dict';
      }else if(datatype == 3){
        if(datasource == 'organization'){
          return 'input-refer';
        }else if(datasource == 'user'){
          return 'input-refer';  
        }
      }else if(datatype == 4){
        if(inputtype == 1 || inputtype == 2){
          return 'input-number';
        }else if(inputtype == 3){
          return 'input-date';
        }else if(inputtype == 4){
          return 'input-bool';
        }
      }
      return 'input-text';
    },
    getFieldsValue(){
      let obj = {};
      return Promise.all(this.$refs.inputBox.map(ele => {
        return ele.validateField(obj);
      })).then(() => {
        // console.log('getFieldsValue', obj);
        return obj;
      });
    },
    checkProperty(data = {}){
      (this.properties || []).forEach(p => {
        if(get(data, p.code) === undefined){
          set(data, p.code, undefined);
        }
      })
      return data;
    },
  }
};
</script>