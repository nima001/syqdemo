<template>
  <div>
    <a-button :disabled="!maxValue" @click="showModal">截取</a-button>
    <a-modal
      v-if="max"
      width="450px"
      title="选择截取区间"
      v-model="show"
      :destroyOnClose="true"
      @ok="close"
      @cancel="close"
    >
      <a-slider
        range
        v-model="propValue"
        :min="0"
        :max="max"
        :tooltip-visible="false"
        :getPopupContainer="(triggerNode) => triggerNode.parentNode"
      />
      <div class="range">
        <a-input-number v-model="propValue[0]" :min="0" :max="max" />
        <span>~</span>
        <a-input-number v-model="propValue[1]" :min="0" :max="max" />
      </div>
    </a-modal>
  </div>
</template>

<script>
import { Button, Modal, Slider, InputNumber } from "ant-design-vue";
import PropMixin from "@/framework/components/SettingTree/PropMixin";
import { get } from 'lodash';
export default {
  mixins: [PropMixin],
  components: {
    AButton: Button,
    AModal: Modal,
    ASlider: Slider,
    AInputNumber: InputNumber,
  },
  data() {
    return {
      show: false,
      maxValue: 0,
    };
  },
  computed: {
    max() {
        if(this.propValue&&this.propValue.length>1){
            if(this.propValue[1]>this.maxValue) {
                this.maxValue = this.propValue[1];
            } 
        }
        return this.maxValue;
    }
  },
  methods: {
    showModal() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
  },
};
</script>
<style lang="less" scoped>
/deep/.ant-modal-body {
  margin: auto;
  .range {
    display: table;
    .ant-input-number {
      width: 50%;
      display: table-cell;
    }
  }
}
</style>
