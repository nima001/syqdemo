<template>
  <a-col :span="span" :class="{'drag-area': true, empty: empty === true }">
    <slot/>
  </a-col>
</template>
<script>
import { Col } from 'ant-design-vue'
import { connect, mapProps, observer, useForm, useField, useFieldSchema, Schema } from '@formily/vue'
import { computed } from '@vue/composition-api'

export default {
  components: {
    ACol: Col,
  },
  props: {
    span: Number
  },
  setup(){
    const empty = computed((v) => { 
      let props = v.schema.properties;
      return !props || !Object.keys(props).length;
    })
    return {
      _formComponentType: 'layout.pane',
      form: useForm(),
      schema: useFieldSchema(), 
      empty,
    }
  },
  methods: {
    
  }
}
</script>
<style>

</style>