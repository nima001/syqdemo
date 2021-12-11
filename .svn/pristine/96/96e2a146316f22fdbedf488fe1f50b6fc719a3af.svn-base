<template>
  <div class="detail-info">
    <div class="tabs">
      <div class="tabs-wrapper">
        <ul>
          <li
            v-for="item in tabs"
            :key="item.components"
            :class="{
              active: item.components == active,
            }"
            @click="active = item.components"
          >
            <span>{{ item.title }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <component :is="active" :isRetire="true " :lcdTitle="'近一个月预计退休人数'" :orgid="orgid" />
    </div>
  </div>
</template>
<script>
import QuickRetire from "../components/QuickRetire";
import RetireTrend from "../components/RetireTrend";

export default {
  components: {
    QuickRetire,
    RetireTrend,
  },
  props: {
    orgid: String,
  },
  data() {
    return {
      active: "QuickRetire",
      tabs: [
        { components: "QuickRetire", title: "退休详情" },
        { components: "RetireTrend", title: "人员退休趋势" },
      ]
    };
  },
};
</script>
<style lang="less" scoped>
.detail-info {
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
  font-size: 16px;
  & > .tabs {
    flex: none;
    background: linear-gradient(
      to right,
      rgba(78, 120, 244, 0.24),
      rgba(143, 248, 255, 0.24)
    );
    height: 74px;
    .tabs-wrapper {
      height: 100%;
      background: url("../img/tab-bg.png") no-repeat;
    }
    ul {
      margin: 0;
      overflow: hidden;
    }
    li {
      float: left;
      padding: 0 24px;
      color: fade(#fff, 80%);
      font-weight: bold;
      font-size: 1.1em;
      line-height: 74px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
      &.active {
        background: url("../img/tab-active-bg.png") no-repeat center center;
        color: #fff;
      }
    }
  }
  & > .content {
    flex: auto;
    min-height: 1px;
  }
}
</style>