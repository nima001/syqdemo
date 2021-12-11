<template>
  <div class="content">
    <TitleSetting v-model="chartData" v-bind="$attrs" v-on="$listeners"/>
    <a-collapse :bordered="false" style="background-color: unset">
      <a-collapse-panel class="head-setting" key="13" header="表头">
        <div class="font-color">
          <span>文字颜色</span>
          <ColorPicker class="color" :color.sync="chartData.settings.table.headColor" />
        </div>
        <div class="head-color">
          <span>背景颜色</span>
          <ColorPicker
            class="color"
            :color.sync="chartData.settings.table.headBackgroundColor"
          />
        </div>
      </a-collapse-panel>
    </a-collapse>
    <a-collapse :bordered="false" style="background-color: unset">
      <a-collapse-panel class="body-setting" key="14" header="表体">
        <div class="font-color">
          <span>文字颜色</span>
          <ColorPicker class="color" :color.sync="chartData.settings.table.bodyColor" />
        </div>
        <div class="body-color">
          <span>背景颜色</span>
          <ColorPicker
            class="color"
            :color.sync="chartData.settings.table.bodyBackgroundColor"
          />
        </div>
      </a-collapse-panel>
    </a-collapse>
    <div class="table-border">
      <span>边框</span>
      <a-switch @click="(check, e) => { e.stopPropagation(); }" v-model="chartData.settings.table.bordered" />
    </div>
    <div class="line-height">
      <span>行高</span>
      <a-input-number v-model="chartData.settings.table.lineHeight" allowClear :min="0" />
    </div>
    <div class="sum-position">
      <span>合计</span>
      <ButtonRadio
        :sumData="sumData"
        :defaultValue.sync="chartData.settings.table.sumPosition"
      />
    </div>
  </div>
</template>

<script>
import { Collapse, InputNumber, Switch } from "ant-design-vue";
import ColorPicker from "./ColorPicker";
import ButtonRadio from "./ButtonRadio";
import TitleSetting from './TitleSetting';
export default {
  props: {
    value: {
      type: Object,
    },
  },
  components: {
    TitleSetting,
    ASwitch: Switch,
    AInputNumber: InputNumber,
    ACollapse: Collapse,
    ACollapsePanel: Collapse.Panel,
    ColorPicker,
    ButtonRadio,
  },
  data() {
    return {
      chartData: this.value,
      titleModel: {
        show: false,
        value: undefined,
        placeholder: undefined,
      },
      sumData: [
        { label: "顶部", value: 1 },
        { label: "底部", value: 0 },
      ],
    };
  },
  watch: {
    chartData: {
      handler(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  .table-border,
  .line-height,
  .sum-position {
    padding-left: 24px;
    margin: 12px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .color {
      height: 30px;
      margin: 0;
      flex: 1;
    }
  }
  .head-setting,
  .body-setting {
    border-bottom: 0;
    /deep/.ant-collapse-content-box {
      padding-left: 24px;
      padding-right: 0;
      .font-color {
        margin-bottom: 12px;
      }
      .head-color,
      .body-color,
      .font-color {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .color {
          height: 30px;
          width: 50%;
          margin-right: 2px;
          // flex: 1;
        }
      }
    }
  }
}
</style>
