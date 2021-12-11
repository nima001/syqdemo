<template>
  <a-select disabled @change="opChange" v-if="defaultData.opList" :value="defaultData.op">
    <a-select-option
      :value="item.value"
      v-for="(item,index) in filterList"
      :key="index+Math.random()"
    >{{item.text}}</a-select-option>
  </a-select>
</template>
<script>
import { queryfields } from "@/person/api/integratedquery";
import { sortArrByKey } from "@/person/utils/index";
import { showError, eachArray } from "@/framework/utils/index";
import {Select} from 'ant-design-vue';
export default {
  name: "OpSelect",
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
    ASelect:Select,
    ASelectOption:Select.Option
  },
  computed: {
    filterList() {
      // 过滤 组织多选和人员多选(组织多选和人员单选组件暂未开发)
      let list = this.defaultData.opList;
      if (this.defaultData.field.datatype == 3) {
        list = list.filter(e => {
          return e.value != "in" && e.value != "nin";
        });
      }
      return list;
    }
  },
  methods: {
    opChange(value) {
      this.$store.commit({
        type: "SET_OP",
        position: this.position,
        op: value
      });
      if (
        this.defaultData.field.datatype == 4 &&
        this.defaultData.field.inputtype == 1
      ) {
        this.getQueryFields(value);
      }
    },
    getQueryFields(value) {
      let data = {
        key: "",
        modelNs: this.searchObj,
        op: value,
        filterKey: this.defaultData.field.key
      };
      queryfields(data)
        .then(res => {
          this.fieldsTwo = sortArrByKey(res.result);
          this.$store.commit({
            type: "SET_FIELDS_TWO",
            data: this.fieldsTwo
          });
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
</style>