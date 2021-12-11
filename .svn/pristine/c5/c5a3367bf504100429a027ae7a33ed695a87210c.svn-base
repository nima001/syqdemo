<template>
  <div class="container">
    <a-input disabled read-only placeholder="请输入" v-model="userName" @click="clickHandler" />
    <!--组织选择-->
    <a-modal title="人员选择" :visible="visible" @cancel="visible=false" :footer="null">
      <!-- <people-sc @submitUser="selectUser" :ptype="1"></people-sc> -->
    </a-modal>
  </div>
</template>
<script>
import { debounce } from "@/framework/utils/index";
import {Input,Modal} from 'ant-design-vue';
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "TypeFourteen",
  data() {
    return {
      visible: false
    };
  },
  props: {
    position: {
      type: String,
      required: true
    },
    defaultData: {
      type: Object,
      required: true
    }
  },
  components:{
    AInput:Input,
    AModal:Modal
  },
  computed: {
    userName() {
      return this.defaultData.value ? this.defaultData.value.username : "";
    }
  },
  methods: {
    selectUser(data) {
      this.visible = false;
      let value = cloneDeep(data);
      this.$store.commit({
        type: "SET_VALUE",
        position: this.position,
        value
      });
    },
    clickHandler() {
      this.visible = true;
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  flex: 1;
}
</style>