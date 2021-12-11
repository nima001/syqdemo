<template>
  <div class="layout-intelligent">
    <div class="header">
      <div class="tabs">
        <span
          v-for="item in tabs"
          :key="item.id"
          :class="{ active: active && active.id == item.id }"
          @click="active = item"
          >{{ item.title }}</span
        >
      </div>
    </div>
    <div class="main">
      <component v-if="active" :is="active.component" :typeList="typeList" />
    </div>
  </div>
</template>
<script>
import Documentquery from "./components/Documentquery";
import Termquery from "./components/Termquery";
import Personquery from "./components/Personquery";
import Organizationquery from "./components/Organizationquery";
import Functionquery from "./components/Functionquery";
export default {
  data() {
    return {
      tabs: [],
      active: undefined,
    };
  },
  components: {
    Documentquery,
    Termquery,
    Personquery,
    Organizationquery,
    Functionquery,
  },
  created() {
    this.init();
  },
  computed: {
    typeList() {
      return this.$store.getters.dict("library.doctype");
    },
  },
  methods: {
    init() {
      this.tabs = [
        { id: 1, title: "找机构", component: "Organizationquery" },
        { id: 2, title: "找职能", component: "Functionquery" },
        { id: 3, title: "找人员", component: "Personquery" },
        { id: 4, title: "找文件", component: "Documentquery" },
        { id: 5, title: "找用语", component: "Termquery" },
      ];
      this.active = this.tabs[0];
    },
  },
};
</script>
<style lang="less" scoped>
.layout-intelligent {
  min-height: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  .header {
    background: #ffffff;
    box-shadow: 1px 1px 3px 1px #fdf2f2;
    margin: 0px 10px 3px 10px;
    padding: @layout-space-base @content-padding-h;
    height: 70px;
    align-items: center;
    display: flex;
    .tabs {
      span {
        cursor: pointer;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        padding: 0 12px;
        margin-left: 6px;
        border-radius: @border-radius-base;
        &:hover {
          background: @primary-1;
        }
      }
      span:first-child {
        margin-left: 0;
      }
      span.active {
        background-color: @primary-color;
        color: white;
        &:hover {
          background: lighten(@primary-color, 5%);
        }
      }
    }
  }
  .main {
    flex: 1;
    background: #ffffff;
    margin: 0px 10px 10px 10px;
  }
}
</style>