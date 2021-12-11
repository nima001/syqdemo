<template>
  <div class="container">
    <a-popover placement="bottomLeft" trigger="click">
      <template slot="content">
        <div class="popover" :style="{height:'180px',overflow:'auto'}">
          <field-two :fieldsTwo="fieldsTwo" :position="0" :searchObj="searchObj"></field-two>
        </div>
      </template>
      <a-input read-only class="code-one" v-model="showname">
        <a-tooltip slot="suffix">
          <a-icon type="down" style="color: rgba(0,0,0,.25)" />
        </a-tooltip>
      </a-input>
    </a-popover>
    <op-select-two
      v-if="defaultData.opListTwo"
      :defaultData="defaultData"
      :position="position"
      :searchObj="searchObj"
    ></op-select-two>
    <a-input type="number" v-model.number="defaultData.value" @change="handleChange" placeholder="请输入" />
  </div>
</template>
<script>
import FieldTwo from "./FieldTwo";
import OpSelectTwo from "./OpSelectTwo";
import { querylistop } from "@/person/api/integratedquery";
import { debounce,showError } from "@/framework/utils/index";
import {Popover,Input,Tooltip,Select,Icon} from 'ant-design-vue';
export default {
  name: "TypeOne",
  props: {
    position: {
      type: String,
      required: true
    },
    defaultData: {
      type: Object,
      required: true
    },
    searchObj: {
      type: String,
      required: true
    }
  },
  components: {
    APopover:Popover,
    AInput:Input,
    ATooltip:Tooltip,
    ASelect:Select,
    ASelectOption:Select.Option,
    AIcon:Icon,
    FieldTwo,
    OpSelectTwo
  },
  created(){
    if(this.defaultData.op && !this.defaultData.opListTwo){
      this.getListop(this.defaultData.field.key);
    }
  },
  computed: {
    fieldsTwo() {
      return this.$store.getters.fieldstwo;
    },
    showname() {
      return this.defaultData.field2 ? this.defaultData.field2.showname : "";
    }
  },
  provide() {
    return { setFieldTwo: this.setFieldTwo };
  },
  methods: {
    setFieldTwo(res) {
      this.getListop(res.key);
      this.$store.commit({
        type: "ADD_FIELD_TWO",
        position: this.position,
        field: res
      });
    },
    getListop(key) {
      let data = {
        arith: "",
        modelNs: this.searchObj,
        key,
        filterKey: this.defaultData.field.key,
        op: this.defaultData.op
      };
      querylistop(data)
        .then(res => {
          this.$store.commit({
            type: "SET_OP_LIST_TWO",
            position: this.position,
            data: res.result
          });
        })
        .catch(err=>{
          showError(err);
        });
    },
    handleChange: debounce(function(e) {
      let value = parseInt(e.target.value);
      this.$store.commit({
        type: "SET_VALUE",
        position: this.position,
        value
      });
    }, 300)
  }
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex: 3;
  .code-one {
    flex: 1;
    margin-right: 15px;
  }
  .ant-select {
    flex: 1;
    margin-right: 15px;
  }
  .ant-input {
    flex: 1;
  }
}
</style>