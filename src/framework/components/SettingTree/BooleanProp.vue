<template>
  <a-switch v-model="value" v-bind="property.attrs" />
</template>
<script>
import { Switch } from "ant-design-vue";
import PropMixin from './PropMixin'

export default {
  components: {
    ASwitch: Switch,
  },
  mixins: [PropMixin],
  computed: {
    value:{
      get(){
        return this.propValue === undefined ? this.property.defaultValue : this.propValue;
      },
      set(v){
        this.propValue = v;
      },
    }
  },
  created(){
    this.onValueChange(this.realProperty.path, this.value, undefined);
    //console.log(this)
  },
}
</script>
<style lang="less" scoped>
.ant-switch{
  width: 40px;
}
</style>