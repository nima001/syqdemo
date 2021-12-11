<template>
  <div class="wrapper">
    <div class="toggle">
      <a-button v-for="(item, index) in tableList" :key="index">
        {{item}}
      </a-button>
    </div>
  </div>
</template>

<script>
import { Button } from "ant-design-vue";

export default {
  props: {},
  components: { AButton: Button },
  data() {
    return {
      tableList: [
        '省属事业单位机构编制质效评估指标体系（S0）',
        '省属事业单位机构编制质效评估指标体系（S0）'
      ]
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.wrapper{
  .toggle{
    button{
      margin-right: 20px;
    }
  }
}
</style>