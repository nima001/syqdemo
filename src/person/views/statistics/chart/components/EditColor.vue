<template>
  <div class="color-array">
    <a-space>
      <div
        class="color_list"
        :key="item"
        v-for="(item, index) in colors"
      >
        <div class="colorcontent">
          <ColorPicker :color="item" @change="changeColor($event, index)">
            <div class="del">
              <a-icon type="close" @click="(e)=>del(e,index)"/>
            </div>
          </ColorPicker>
        </div>
      </div>
      <a-button icon="plus" type="primary" ghost @click="add"/>
    </a-space>
  </div>
</template>

<script>
import { Button, Icon, Space } from "ant-design-vue";
import ColorPicker from "./ColorPicker";
import { cloneDeep, concat } from 'lodash';
import PropMixin from '@/framework/components/SettingTree/PropMixin'

export default {
  mixins: [PropMixin],
  components: {
    ColorPicker,
    AIcon: Icon,
    ASpace: Space,
    AButton: Button,
  },
  data() {
    return {
      colors: [],
    };
  },
  watch: {
    propValue: {
      immediate: true,
      handler(val) {
        if(val) {
          this.colors = cloneDeep(val)
        }
      }
    }
  },
  methods: {
    changeColor(color, index) {
      this.$set(this.colors, index, color);
      this.propValue = cloneDeep(this.colors);
    },
    add() {
      // 随机生成一个随机数，然后转为16进制字符串，截取后6位
      this.colors.push('#'+Math.random().toString(16).substr(-6));
      this.propValue = cloneDeep(this.colors);
    },
    del(e,index) {
      e.stopPropagation();
      this.colors.splice(index, 1);
      this.propValue = cloneDeep(this.colors);
    },
    updateValue() {
      let prop = cloneDeep(this.propValue);
      prop = concat(prop, this.colors);
      this.propValue = prop;
    },
  },
};
</script>
<style lang="less" scoped>
.color-array {
  display: flex;
  flex-wrap: wrap;
  .ant-space {
    display: flex;
    flex-wrap: wrap;
    /deep/.ant-space-item {
      margin-right: 1px !important;
    }
  }
  .color_list {
    margin-bottom: 4px;
    .colorcontent {
      /deep/.colorPicker {
        .color_con {
          width: 15px;
          height: 29px;
          margin-top: 0;
          border-radius: 2px;
          overflow: hidden;
          position: relative;
          .del {
            color: #fff;
            border-radius: 50%;
            opacity: 0;
            position: relative;
            transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
            transform: translate(60%, -68%) rotate(-45deg);
            border: solid 12px transparent;
            border-left-color: fade(#000, 40%);
            .anticon {
              font-size: 4px;
              position: absolute;
              left: -7px;
              top: 100%;
              cursor: pointer;
              transform: translate(-60%, -35%) rotate(45deg);
              &:hover {
                color: red;
              }
            }
          }
          &:hover::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: fade(#fff, 40%);
          }
        }
        &:hover .color_con .del {
          opacity: 1;
          transform: translate(18%, -60%) rotate(-45deg) scale(1.3);
          .anticon {
            font-size: 7px;
          }
        }
      }
    }
  }
  .ant-btn {
    width: 14px;
    height: 29px;
    margin-bottom: 4px;
    border-radius: 2px;
    /deep/.anticon {
      font-size: 13px;
    }
  }
}
</style>
