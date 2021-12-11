<template>
  <div class="assess">
    <div class="wrapper">
      <div class="container">
        <div class="top">
          <div class="left">
            <span 
            v-for="(item, index) in tabs" 
            :key="index"
            :class="[ current == index ? 'active' : '' ]"
            @click="toggle(index)"
            >
              {{item.name}}
            </span>
          </div>
        </div>
        <div class="content">
          <component 
            :is="tabs[current].component" 
          >
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Table, Pagination, Input } from "ant-design-vue";
import HistoryAssess from "./HistoryAssess.vue";
import StartAssess from "./StartAssess.vue";

export default {
  props: {},
  components: {
    AButton: Button,
    ATable: Table,
    APagination: Pagination,
    AInput: Input,
    HistoryAssess,
    StartAssess
  },
  data() {
    return {
      tabs: [
        { name: '开始评估', component: 'StartAssess' },
        { name: '历史记录', component: 'HistoryAssess' }
      ],
      current: 0,
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    toggle(index) {
      this.current = index;
    }
  }
};
</script>
<style lang="less" scoped>
.assess{
  height: 100%;
  .wrapper{
    height: 100%;
    padding: 10px;
    .container{
      height: 100%;
      background-color: @white;
      padding: 0 @padding-lg;
      .top{
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        .left{
          span{
            display: inline-block;
            line-height: 32px;
            border-radius: 5px;
            padding: 0 @padding-lg;
            margin-right: 10px;
            cursor: pointer;
          }
          span.active{
            color: @white;
            background-color: @primary-color;
          }
        }
        .right{
          .queryitem{
            margin-left: 20px;
          }
        }
      }
      // .content{
      //   padding: 10px 0;
      // }
    }
  }
}
</style>