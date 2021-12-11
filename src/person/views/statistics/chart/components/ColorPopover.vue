<template>
  <div>
    <a-popover
      v-model="visible"
      :getPopupContainer="(triggerNode) => {return triggerNode.parentNode;}"
      placement="topRight"
      trigger="click"
    >
      <template slot="content">
        <div class="coloritem">
          <div class="title">
            <span>色卡</span>
          </div>
          <div class="color-list">
            <div
              :class="['color', { 'color-active': isActive(colorIndex) }]"
              v-for="(color, colorIndex) in colorArray"
              @click="updateValue(colorIndex)"
            >
              <div
                class="color_con"
                :style="{ background: item }"
                v-for="(item, index) in color"
              />
            </div>
          </div>
        </div>
      </template>
      <div class="color-select">
        <div class="select">
          <div class="selectitem selectone"></div>
          <div class="selectitem selecttwo"></div>
          <div class="selectitem selectthree"></div>
        </div>
        <a-icon type="caret-down" />
      </div>
    </a-popover>
  </div>
</template>

<script>
import { Popover, Icon } from "ant-design-vue";
import { cloneDeep } from 'lodash';
import PropMixin from '@/framework/components/SettingTree/PropMixin'
export default {
  mixins: [PropMixin],
  components: {
    AIcon: Icon,
    APopover: Popover,
  },
  data() {
    return {
      visible: false,
      colorsActive: 0,
      colorArray: [
        ["#4c84ff", "#72c2ff", "#82e1fc", "#1dbb8a", "#8fe94e", "#fbc800", "#ed9421", "#f25f93", "#ef8bcf", "#c562f1"],
        ["#D15456", "#5488D1", "#EDBA55", "#D48265", "#91C7AE", "#749F83", "#BDA29A", "#6E7074", "#585470", "#706254"]
      ]
    };
  },
  created() {
    this.updateValue(0);
  },
  methods: {
    updateValue (index) {
      this.visible = false;
      this.colorsActive = index;
      this.propValue = this.colorArray[index];
    },
    isActive(choose) {
      if (this.colorsActive == choose) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="less" scoped>
.ant-popover {
  .ant-popover-content .ant-popover-inner .coloritem {
    width: 150px;
    height: 120px;
    & .color-list {
      & .color {
        width: 100%;
        margin: @padding-xs auto;
        display: flex;
        align-items: center;
        justify-content: center;
        &.color-active {
          box-shadow: 0 0 2px 2px fade(#000, 30%);
        }
        & .color_con {
          width: 15px;
          height: 32px;
          cursor: pointer;
          position: relative;
        }
      }
    }
  }
}
.color-select {
  display: flex;
  align-items: center;
  padding: @padding-xs / 2;
  cursor: pointer;
  &:hover {
    background: #f1eaff;
  }
  & .select {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    line-height: 1;
    overflow: hidden;
    & .selectitem {
      width: 33.3333%;
      height: 100%;
      display: inline-block;
    }
    & .selectone {
      background-color: rgb(91, 143, 249);
      color: rgb(91, 143, 249);
    }
    & .selecttwo {
      background-color: rgb(205, 221, 253);
      color: rgb(205, 221, 253);
    }
    & .selectthree {
      background-color: rgb(97, 221, 170);
      color: rgb(97, 221, 170);
    }
  }
  & .anticon {
    height: 16px;
    color: #873bf4;
  }
}
</style>
