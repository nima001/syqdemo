<template>
  <div class="container">
    <a-input-group compact>
      <a-select v-model="input.type" :showArrow="false">
        <a-select-option value="">值</a-select-option>
        <a-select-option value="$"><custom-icon type="fx"/></a-select-option>
        <a-select-option value="#"><custom-icon color="#f39c2b" type="fx"/></a-select-option>
      </a-select>
      <template v-if="input.type">
        <a-input :value="_value"
          read-only
          @click="showExprEditor = true"
        />
      </template>
      <dict-select v-else
        v-model="input.value"
        :dict="key" 
        :allowClear="true"
        placeholder="(空)"
      />
    </a-input-group>
    <equation-editor v-if="showExprEditor" :selfFields='contextFields' :fnData="input.value" namespace="query" @finish="onEditExper"/>
  </div>
</template>
<script>
import { Select, Input } from "ant-design-vue";
import CustomIcon from "@/framework/components/CustomIcon";
import DictSelect from "@/framework/components/DictSelect";

//时间
export default {
  name: "DictValue",
  components: {
    AInput: Input,
    AInputGroup: Input.Group,
    ASelect: Select,
    ASelectOption: Select.Option,
    DictSelect,
    CustomIcon,
    EquationEditor:() => import('@person/components/EquationEditor/index')
  },
  props: {
    value: {
      // type: Object,
    },
    criterion: {
      type: Object,
    }
  },
  inject:['contextFields'],
  data() {
    return {
      input: this.initInput(this.value),
      oldValue: undefined,
      showExprEditor: false,
    };
  },
  computed: {
    key() {
      return this.criterion.field.datasource;
    },
    _value(){
      let {type, value} = this.input;
      if(type && value){
        return type + '{' + value + '}';;
      }else{
        return value;
      }
    }
  },
  watch: {
    'input.type'(vt, ovt){
      if(!ovt != !vt){
        let v = this.oldValue;
        this.oldValue = this.input.value;
        this.input.value = v;
      }
    },
    _value(value){
      this.$emit('input', value);
    },
  },
  methods: {
    onEditExper(type, data){
      this.showExprEditor = false;
      if (type == "ok") {
        this.input.value = data;
      }
    },
    initInput(v){
      if(typeof(v) == 'string'){
        if(v.startsWith('${') && v.endsWith('}')){
          return { type: '$', value: v.substring(2, v.length-1) };
        }else if(v.startsWith('#{') && v.endsWith('}')){
          return { type: '#', value: v.substring(2, v.length-1) };
        }
      }
      return { type: '', value: v};
    }
  }
};
</script>
<style lang="less" scoped>
.container{
  width: 300px;
  .ant-input-group-compact{
    display: flex;
  }
}
</style>