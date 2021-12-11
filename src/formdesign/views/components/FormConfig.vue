<template>
  <SettingTree :value="value" :properties="properties" @input="onChange"/>
</template>
<script>
import SettingTree from '@framework/components/SettingTree'

export default {
  components: {
    SettingTree,
  },
  model: {
    event: 'change'
  },
  props: {
    value: {},
    decorators: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return {
      properties: undefined,
    }
  },
  created(){
    this.initData();
  },
  watch: {
    decorators(){
      this.initData();
    },
  },
  methods: {
    initData(){
      let properties = {};
      this.decorators.forEach(item => {
        let dProps = item.props;
        for(let name in dProps){
          const v = dProps[name];
          properties['decorators.' + item.name + '.' + name] = { ...v };
        }
      })
      this.properties = properties;
    },
    onChange(v){
      this.$emit('change', v);
    }
  }
}
</script>