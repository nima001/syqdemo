<template>
  <div class="settings">
    <a-collapse v-model="activeKey" :bordered="false" style="background-color:unset;" v-if="chartType=='table'">  
      <a-collapse-panel class="table-setting" key="5" header="表格">
        <TableSetting v-model="chartData" v-bind="$attrs" v-on="$listeners"/>
      </a-collapse-panel>
    </a-collapse>
    <div v-else>
      <!--宽高-->
      <BaseSetting v-model="chartData"/>
      <!--标题-->
      <TitleSetting v-model="chartData" v-bind="$attrs" v-on="$listeners"/>
      <!--提示-->
      <TipSetting v-model="chartData"/>
      <!--图例配置-->
      <LegendSetting v-model="chartData" v-bind="$attrs"/>
      <!--x轴配置-->
      <XaxiSetting  v-model="chartData"/>
      <!--y轴配置-->
      <YaxiSetting  v-model="chartData"/>
      <!--图形属性-->
      <GraphicProperties v-model="chartData" v-bind="$attrs"/>
      <!--数据操作-->
      <DataOperation v-model="chartData" v-bind="$attrs" v-if="chartType!='radar-chart'"/>
    </div>
  </div>
</template>

<script>
import { Collapse, Modal, Input } from 'ant-design-vue'
import CustomIcon from "@/framework/components/CustomIcon";
import BaseSetting from './BaseSetting';
import TableSetting from './TableSetting';
import TitleSetting from './TitleSetting';
import LegendSetting from './LegendSetting';
import XaxiSetting from './XaxiSetting';
import YaxiSetting from './YaxiSetting';
import TipSetting from './TipSetting';
import DataOperation from './DataOperation';
import GraphicProperties from './GraphicProperties';
import Tags from '@framework/components/Tags';
import ColorPicker from './ColorPicker';
import ButtonRadio from './ButtonRadio';
import { cloneDeep } from 'lodash';

export default {
  props: {
    value: {
      type: Object
    },
  },
  components: {
    Tags,
    BaseSetting,
    CustomIcon,
    TipSetting,
    XaxiSetting,
    YaxiSetting,
    TableSetting,
    TitleSetting,
    LegendSetting,
    AInput: Input,
    DataOperation,
    AModal: Modal,
    GraphicProperties,
    ACollapse: Collapse,
    ACollapsePanel: Collapse.Panel,
  },
  data() {
    return {
      show: false,
      colorActive: 0,
      activeKey: undefined,
      chartData: undefined,
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(val){
        return val;
      }
    },
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        this.chartData = val;
        if(typeof this.chartData.settings.title == 'string'){
          let title = this.chartData.settings.title;
          this.$set(this.chartData.settings, 'title', {
            main: {
              visible: true,//false时不显示，不设置就默认显示
              value: title,
            },
            sub: {
              visible: true,//false时不显示，不设置就默认显示
              value: undefined,
            },
            fontFamily: undefined,
            position: undefined,//标题位置-'top'|'left'
          });
        }
        return val;
      }
    },
  },
  computed: {
    chartType() {
      if(this.chartData&&this.chartData.settings){
        if(this.chartData.settings.chartType) {
          return this.chartData.settings.chartType;
        }
      }
      return undefined;
    }
  }
};
</script>
<style lang="less" scoped>
.settings {
  width: 100%;
  overflow-y: auto;
  user-select: none;
  .ant-collapse-item {
    min-height: 52px;
  }
}
</style>
