<template>
  <div class="input">
    <a-input-number
      placeholder="auto"
      :min="min"
      allowClear 
      v-model="value" @change="onChange"/>
    <span class="unit">px</span>
  </div>
</template>

<script>
import { InputNumber } from 'ant-design-vue';
import PropMixin from '@/framework/components/SettingTree/PropMixin'
export default {
  mixins: [PropMixin],
  components: {
    AInputNumber: InputNumber,
  },
  data() {
    return {
    };
  },
  watch: {
    propValue(val) {
      this.value = val;
    }
  },
  computed: {
    defaultValue() {
      if(this.property&&this.property.defaultValue) {
        return this.property.defaultValue;
      }
    },
    value: {
      set(val) {
        this.propValue = val;
      },
      get() {
        if(this.propValue==undefined) {
          this.propValue = this.defaultValue;
        }
        return this.propValue;
      }
    },
    min() {
      if(this.property) {
        return this.property.min||0;
      }
    }
  },
  methods: {
    onChange(val) {
      if(!val) {
        this.value = this.defaultValue;
      }
    },
    updateValue() {
      this.propValue = this.value;
    },
  }
};
</script>
<style lang="less" scoped>
.input {
    display: flex;
    align-items: center;
    justify-content: center;
}
.unit {
    line-height: 32px;
    padding: 0 @padding-xs;
    margin-left: 1px;
    border-radius: @border-radius-base;
    background: #d9d9d9;
}
</style>
