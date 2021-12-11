<template>
  <div>
    <!-- <a-button type="primary" @click="show=true"><img src="@/assets/img/stamp.jpg" style="margin-right:8px"/>{{name}}</a-button> -->
    <a-modal v-model="show" :width="300" title="测试"/>
  </div>
</template>
<script>
import { Button, Modal} from "ant-design-vue";

export default {
  title: '签章',
  icon: 'edit',
  props: {
    name: {
      type: String
    },
    code: {
      type: String
    }
  },
  components: {
    AButton: Button,
    AModal: Modal,
  },
  data(){
    return {
      show: false
    }
  }
}
</script>
<style lang="less" scoped>

</style>