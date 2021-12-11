<template>
  <Row type="flex" :gutter="gutter">
    <slot/>
  </Row>
</template>
<script>
import { Row, Icon } from 'ant-design-vue'
import { useForm, useFieldSchema } from '@formily/vue'

export default {
  components: {
    Row,
  },
  props: {
    gutter: Number,
  },
  setup(){
    const form = useForm();
    const schema = useFieldSchema()
    return {
      _formComponentType: 'layout',
      form,
      schema
    }
  },
  created(){
    // console.log(this)
  },
}
</script>
<style lang="less" scoped>
.ant-row-flex{
  
}
</style>