<template>
  <div class="leg-content">
    <div class="position">
      <!-- <span>方位</span> -->
      <a-radio-group v-model="position">
        <a-radio-button
          v-for="item in positionArray"
          :value="item.value"
          :key="item.value"
        >
          <CustomIcon :type="item.label"/>
        </a-radio-button>
      </a-radio-group>
    </div>
    <div class="horizontal">
      <!-- <span>对齐</span> -->
      <a-radio-group v-model="align">
        <a-radio-button
          v-for="item in alignArray"
          :value="item.value"
          :key="item.value"
        >
          <CustomIcon :type="item.label" />
        </a-radio-button>
      </a-radio-group>
    </div>
  </div>
</template>

<script>
import { Radio } from "ant-design-vue";
import CustomIcon from "@/framework/components/CustomIcon";
import PropMixin from '@/framework/components/SettingTree/PropMixin';

export default {
  props: {
    value: {
      type: Object,
    },
  },
  mixins: [PropMixin],
  components: {
    CustomIcon,
    ARadioGroup: Radio.Group,
    ARadioButton: Radio.Button,
  },
  data() {
    return {
      position: 'top',
      align: 'left',
      positionArray: [
        { label: "chart-iconlegend-above", value: "top" },
        { label: "chart-iconlegend-right", value: "right" },
        { label: "chart-iconlegend-below", value: "bottom" },
        { label: "chart-iconlegend-left", value: "left" },
      ],
      alignVertical: [
        { label: "chart-iconvertical-top", value: "top" },
        { label: "chart-iconvertical-center", value: "center" },
        { label: "chart-iconvertical-bottom", value: "bottom" },
      ],
      alignHorizontal: [
        { label: "chart-iconhorizontal-left", value: "left" },
        { label: "chart-iconhorizontal-center", value: "center" },
        { label: "chart-iconhorizontal-right", value: "right" },
      ],
    };
  },
  computed: {
    alignArray() {
      if(this.position=='left'||this.position=='right') {
        return this.alignVertical;
      }else if(this.position=='top'||this.position=='bottom') {
        return this.alignHorizontal;
      }
    }
  },
  watch: {
    position(val,old) {
      if((val=='left'||val=='right')&&(old=='top'||old=='bottom')) {
        this.align = 'top';
      }else if((val=='top'||val=='bottom')&&(old=='left'||old=='right')) {
        this.align = 'left';
      }
      this.updateValue();
    },
    align(val) {
      this.updateValue();
    }
  },
  created() {
    this.initValue();
  },
  methods: {
    initValue() {
      let defaultValue = undefined;
      if(this.propValue==undefined) {
        defaultValue = this.property.defaultValue.split('-');
      }else{
        defaultValue = this.propValue.split('-');
      }
      if(defaultValue.length==1) {
        defaultValue.push('center');
      }
      this.position = defaultValue[0];
      this.align = defaultValue[1];
    },
    updateValue () {
      if(this.align=='center'||this.position==this.align) {
        this.propValue = this.position;
      }else{
        this.propValue = `${this.position}-${this.align}`;
      }
    },
    legendChange(e) {
      this.directionValue = e.target.value;
    },
    positionChange(e) {
      this.positionValue = e.target.value;
    },
  },
};
</script>
<style lang="less" scoped>
.leg-content {
  width: 100%;
  .position,
  .horizontal {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    & > span {
      line-height: 32px;
      white-space: nowrap;
    }
    & .ant-radio-group {
      width: 100%;
      display: flex;
      .ant-radio-button-wrapper {
        padding: 0;
        text-align: center;
        flex: 1 1 auto;
      }
    }
  }
}
</style>
