<template>
  <div class="wrapper">
    <div class="item" v-for="(item, index) in list" :key="index">
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data() {
    return {
      list: [
        { name: '待办' },
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
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .item{
    width: calc(~'25% - 18px');
    height: 60px;
    background-color: rgb(240,242,245);
    text-align: center;
    line-height: 60px;
    margin: @padding-xs @padding-lg @padding-xs 0;
    cursor: pointer;
    &:nth-child(4n){
      margin-right: 0;
    }
  }
}
</style>