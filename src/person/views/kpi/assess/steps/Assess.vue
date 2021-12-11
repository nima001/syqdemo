<template>
  <div class="assess">
    <div class="org">
      <ul>
        <li
          v-for="(item, index) in orgList"
          :key="index"
          @click="onToggleOrg(item)"
          :class="[ currentOrg == item.name ? 'active' : '' ]"
        >
          <span>
            加载中
          </span>
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="assess_system">
      <h1>模拟评估</h1>
    </div>
  </div>
</template>

<script>
import { Button } from "ant-design-vue";
import { queryTemplate } from "@/person/api/kpi";

export default {
  props: {},
  components: {  },
  data() {
    return {
      orgList: [
        { name: '重庆', status: 0, queryList: [] },
        { name: '浙江', status: 0 },
        { name: '四川', status: 0 },
        { name: '北京', status: 0 },
      ],
      currentOrg: '重庆'
    };
  },
  watch: {},
  computed: {},
  created() {
    //     queryTemplate({
//        pagenum: 1,
//         pagesize: 20,
//         total: 0,
//     })
//     .then(res => {
//       console.log(res)
//     })
  },
  mounted() {},
  methods: {
    onToggleOrg(item) {
      this.currentOrg = item.name;
    }
  },
};
</script>
<style lang="less" scoped>
.assess{
  width: 100%;
  display: flex;
  .org{
    width: 200px;
    ul{
      li{
        padding: 8px 24px;
      }
      li.active{
        background-color: @primary-color;
        color: @white;
      }
    }
  }
  .assess_system{
    width: calc(~'100% - 200px');
    border: 1px solid red;
    height: 200px;
  }
}
</style>