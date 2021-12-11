<template>
  <a-data-picker v-if="isDate"
    v-model="desplayValue"
    :placeholder="placeholder"
    @change="convertOut"
  />
  <a-input-number v-else 
    v-model="desplayValue"
    :placeholder="placeholder"
    @change="convertOut"
  />
</template>
<script>
import { InputNumber, DatePicker } from 'ant-design-vue'
import moment from 'moment';
/**
 * 区间值
 */
export default {
  components: {
    AInputNumber: InputNumber,
    ADataPicker: DatePicker,

  },
  props: {
    value: Number,
    isDate: Boolean,
    placeholder: String,
    fillEnd: {//时间缺失时，默认选择日期的结束时间
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      inputValue: undefined,
      desplayValue: undefined,//展示的值
    }
  },
  created(){
    this.convertIn();
  },
  watch: {
    fillEnd(){
      this.convertOut();
    },
    value(newVal){
      if(newVal !== this.inputValue){//当触发input事件导致值变更，不执行convertIn
        this.convertIn();  
      }
    }
  },
  methods: {
    convertIn(){
      let v = this.value;
      if(v && v !== 0){
        if(this.isDate){
          v = moment(v);
        }
      }else{
        v = null;
      }
      this.inputValue = v;
      this.desplayValue = v;
    },
    convertOut(){
      let v = this.desplayValue;
      if(v){
        if(this.isDate){
          if(this.fillEnd){
            v.hour(23);
            v.minute(59);
            v.second(59);
            v.millisecond(999);
          }else{
            v.hour(0);
            v.minute(0);
            v.second(0);
            v.millisecond(0);
          }
          v = v.valueOf();
        }else{
          v = this.desplayValue;
        }
      }else{
        v = null; 
      }
      this.inputValue = v;
      this.$emit('input', v);
    }
  }
}
</script>