<template>
  <a-select disabled @change="opChange" v-if="defaultData.opListTwo" :value="defaultData.op2">
    <a-select-option
      :value="item.value"
      v-for="(item,index) in defaultData.opListTwo"
      :key="index+Math.random()"
    >{{item.text}}</a-select-option>
  </a-select>
</template>
<script>
import { queryfields } from "@/person/api/integratedquery";
import { showError, eachArray } from "@/framework/utils/index";
import {Select, Icon} from 'ant-design-vue';
export default {
  name: "OpSelectTwo",
  data() {
    return {
      fieldsTwo: []
    };
  },
  props: {
    defaultData: {
      type: Object,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    searchObj: {
      type: String,
      required: true
    }
  },
  components:{
    AIcon:Icon
  },
  methods: {
    opChange(value) {
      this.$store.commit({
        type: "SET_OP_TWO",
        position: this.position,
        op2: value
      });
    }
  }
};
</script>
<style lang="less" scoped>
</style>