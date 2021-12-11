<template>
  <div>
    <a-radio-group :value="defaultValue" @change="onchange">
      <a-radio-button v-for="item in data" :value="item.value" :key="item.value">{{item.label}}</a-radio-button>
    </a-radio-group>
  </div>
</template>

<script>
import { Radio } from 'ant-design-vue';
export default {
  props: {
    defaultValue: {
      type: Number
    },
    sumData: {
      type: Array,
      default: ()=>{
        return []
      }
    }
  },
  components: {
    ARadioButton: Radio.Button,
    ARadioGroup: Radio.Group,
  },
  data() {
    return {
      data: this.sumData
    };
  },
  methods: {
    onchange(val) {
      this.$emit('update:defaultValue', val.target.value);
    }
  }
};
</script>
<style scoped>
</style>
