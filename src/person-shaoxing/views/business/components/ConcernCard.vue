<template>
  <div>
    <ul class="left">
      <li
        v-for="(item, index) in deptTotal"
        :key="index"
        @click="chooseDept(item, index)"
        :class="['dept', { active: isActive(index) }]"
      >
        <div class="spin" v-if="spinning"><a-spin /></div>
        <div class="total" v-if="!spinning">{{ item.number }}</div>
        <div class="name" :title="item.orgname" v-if="!spinning">{{ item.orgname }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Spin } from "ant-design-vue";
import BooleanValueVue from "../../../../person/views/integratedquery/fields/BooleanValue.vue";
export default {
  props: {
    deptTotal: {
      type: Array,
      default: () => {
        return [];
      },
    },
    spinning: {
      type: Boolean,
    },
  },
  components: {
    ASpin: Spin,
  },
  data() {
    return {
      active: undefined,
    };
  },
  methods: {
    isActive(val) {
      if (this.active === val) {
        return true;
      }
      return false;
    },
    chooseDept(item, val) {
      this.$emit("chooseDept", item, val);
    },
  },
};
</script>
<style lang="less" scoped>
.left {
  margin-bottom: 24px;
  margin-top: 10px;
  padding: @padding-xs;
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  cursor: pointer;
  li {
    flex: 0 1 160px;
    min-width: 160px;
    height: 100px;
    text-align: center;
    margin: 0 @padding-xs;
    border-radius: @border-radius-base;
    box-shadow: 0px 0px 10px 0px #eee;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .spin {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: fade(white, 60%);
      .ant-spin {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .total {
      font-size: 3.1em;
      font-weight: bold;
      color: fade(@primary-color, 80%);
    }
    .name {
      padding: 0 @layout-space-base;
      position: relative;
      top: -5%;
      font-weight: bold;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &:hover {
      background-color: @primary-1;
      .total {
        color: @primary-color;
      }
    }
  }
  li.active {
    background-color: @primary-1;
  }
}
</style>
