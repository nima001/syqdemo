<template>
  <div class="wrap">
    <div
      class="listwrap"
      :depth="depth"
      v-bind:class="[depth%2!=0 ? 'yellow' : 'red']"
      v-for="(item, index) in treeData"
      :key="`${index+new Date().getTime()}`"
      :keys="`${keys}_${index}`"
      :position="`${depth}_${index}`"
    >
      <query-items
        v-if="item.customQueryVos"
        :length="item.customQueryVos.filter.criteria.length"
        :depth="depth"
        :searchObj="searchObj"
        :relationop="item.customQueryVos.filter.op"
        :position="`${keys}_${index}`"
        :defaultData="item"
      ></query-items>
      <query-items
        v-else
        :length="lengths"
        :depth="depth"
        :searchObj="searchObj"
        :relationop="relationops"
        :position="`${keys}_${index}`"
        :defaultData="item"
      ></query-items>
    </div>
  </div>
</template>
<script>
import QueryItems from "./QueryItems";
import SelectComponent from "./SelectComponent";
export default {
  name: "QueryLists",
   data() {
    return {
      relationops: "and",
      lengths:0
    }
  },
  props: {
    treeData: Array,
    searchObj: {
      type: String,
      required: true
    },
    depth: [Number],
    keys: [String, Number]
  },
  computed: {
    addDepth() {
      return parseInt(this.depth) + 1;
    }
  },
  created() {
  },
  components: {
    QueryItems,
    SelectComponent
  },
  methods: {
    time() {
      return new Date().getTime();
    },
    union(e) {
      let position = e.target.getAttribute("keys");
      let op = e.target.getAttribute("relationop");
      this.$store.commit({
        type: "UNION",
        op,
        position
      });
    },
    split(e) {
      let position = e.target.getAttribute("keys");
      this.$store.commit({
        type: "SPLIT",
        position
      });
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  height: 100%;
  margin: 2px auto;
  overflow: hidden;
  overflow-y: auto;
}
.listwrap {
  width: 96%;
  padding-left: 12px;
  margin: 8px auto;
  &.red {
    border: 1px solid #BEBEBE;
  }
 
}
.relation {
  display: flex;
  align-items: center;
  margin: 15px 0px;
  span {
    width: 72px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    background: #9e9e9e3d;
    border: 1px solid #9e9e9e3d;
    border-radius: 4px;
    cursor: pointer;
    color: #666;
    margin-left: 15px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:hover {
      border-color: @primary-color;
    }
  }
}
</style>