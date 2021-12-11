<template>
  <div class="wrapper">
    <div class="wrapper_main" ref="totalBody">
      <h1 class="name">用户数据统计</h1>
      <div class="total" v-for="(item,index) in pageList" :key="index" :id="item.id">
        <h3 class="title">{{item.question}}</h3>
        <div v-html="item.answer"></div>
      </div>
      <a-anchor v-if="pageList && pageList.length > 1" class="link_total" :getContainer="() => $refs.totalBody">
        <a-anchor-link v-for="item in pageList" :href="`#${item.id}`" :title="item.question" :key="item.id"/>
      </a-anchor>
    </div>
  </div>
</template>

<script>
import { Anchor } from "ant-design-vue";
import { webfaqList } from "@/zfw/api/helps";
import { showError } from '../../../framework/utils';

export default {
  props: {},
  components: { AAnchor: Anchor, AAnchorLink: Anchor.Link,},
  data() {
    return {
      pageList: []
    };
  },
  watch: {},
  computed: {},
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      webfaqList().then(({attr}) => {
        attr.forEach((item, index) => {
          item.id = "total" +  index;
        })
        this.pageList = attr;
      })
      .catch(err => {
        showError(err);
      })
    }
  },
};
</script>
<style lang="less" scoped>
.wrapper{
  width: 100%;
  background-color: @white;
  .wrapper_main{
    padding: 60px 36px 60px 70px;
    position: relative;
    overflow-y: scroll;
    .name{
      margin-bottom: 68px;
    }
    .total{
      width: calc(~"100% - 225px");
      .title{
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 38px;
      }
    }
    .link_total{
      position: fixed;
      right: 10px;
      top: 170px;
      width: 225px;
      background-color: red;
    }
  }
}
</style>