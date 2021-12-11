<template>
  <a-collapse :bordered="false" style="background-color: unset">
    <a-collapse-panel key="8" header="标题">
      <a-collapse v-model="activeKey" :bordered="false" style="background-color: unset;">
        <a-collapse-panel class="second" key="8-1" header="主标题">
          <template v-slot:extra>
            <a-switch @click=" (check, e) => {e.stopPropagation();open('8-1');}" v-model="title.visible"/>
          </template>
          <div class="title">
            <div class="label">内容</div>
            <div class="titlecontent">
              <a-input
                :disabled="!title.visible"
                :read-only="true"
                :value="title.value"
                @click="editTitle({ value: title.value, placeholder: chartData.fields, callback: (value) => (title.value = value), })"
                style="cursor: pointer"
              />
            </div>
          </div>
          <div class="font-size">
            <div class="label">大小</div>
            <a-input-number v-model="fontSize" :min="0" :max="1000"/>
          </div>
          <div class="font-weight">
            <div class="label">加粗</div>
            <a-switch @click=" (check, e) => {e.stopPropagation();}" v-model="fontWeight"/>
          </div>
          <div class="font-color">
            <div class="label">颜色</div>
            <ColorPicker :color.sync="color"/>
          </div>
        </a-collapse-panel>
        <a-collapse-panel class="second" key="8-2" header="副标题">
          <template v-slot:extra>
            <a-switch @click=" (check, e) => {e.stopPropagation();open('8-2');}" v-model="subTitle.visible"/>
          </template>
          <div class="subtitle">
            <div class="label">内容</div>
            <div class="titlecontent">
              <a-input
                :disabled="!subTitle.visible"
                :read-only="true"
                :value="subTitle.value"
                @click="editTitle({ value: subTitle.value, placeholder: chartData.fields, callback: (value) => (subTitle.value = value), })"
                style="cursor: pointer"
              />
            </div>
          </div>
          <div class="font-size">
            <div class="label">大小</div>
            <a-input-number v-model="subFontSize" :min="0" :max="1000"/>
          </div>
          <div class="font-weight">
            <div class="label">加粗</div>
            <a-switch @click=" (check, e) => {e.stopPropagation();}" v-model="subfontWeight"/>
          </div>
          <div class="font-color">
            <div class="label">颜色</div>
            <ColorPicker :color.sync="subColor"/>
          </div>
        </a-collapse-panel>
      </a-collapse>
      <div class="font-family">
        <div class="label">字体</div>
        <a-select v-model="fontFamily" allowClear>
          <a-select-option v-for="item in fonts" :key="item.name" :value='item.value'>{{item.name}}</a-select-option>
        </a-select>
      </div>
      <div class="position">
        <div class="label">位置</div>
        <a-radio-group :value="titleValue" @change="onchange">
          <a-radio-button
            v-for="item in titlePosition"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</a-radio-button
          >
        </a-radio-group>
      </div>
      <!-- 图表标题 -->
      <a-modal v-model="$attrs.titleModel.show" title="标题" @ok="onTitleEdit">
        <a-input v-model="$attrs.titleModel.value" allowClear ref="titleInput"/>
        <div style="margin-top: 10px" v-if="$attrs.titleModel.placeholder">
          <!-- <tags :value="$attrs.titleModel.placeholder" text="name" :deleteable="false" @click="onTagChecked"/> -->
        </div>
      </a-modal>
    </a-collapse-panel>
  </a-collapse>
</template>

<script>
import { Collapse, Input, Switch, Radio, InputNumber, Select } from "ant-design-vue";
import ColorPicker from './ColorPicker';
import { showError } from '@/framework/utils';
export default {
  props: {
    value: {
      type: Object,
    },
  },
  components: {
    ColorPicker,
    ASelect: Select,
    ASelectOption: Select.Option,
    ASwitch: Switch,
    AInput: Input,
    AInputNumber: InputNumber,
    ACollapse: Collapse,
    ACollapsePanel: Collapse.Panel,
    ARadioButton: Radio.Button,
    ARadioGroup: Radio.Group,
  },
  data() {
    return {
      activeKey: undefined,
      fontFamily: 'FangSong',
      fontSize: undefined,
      subFontSize: undefined,
      fontWeight: true,
      subfontWeight: true,
      color: ['#000'],
      subColor: ['#000'],
      titleValue: "center",
      chartData: this.value,
      fonts: [
        { name:'宋体', value: 'SimSun' },
        { name:'黑体', value: 'SimHei' },
        { name:'微软雅黑', value: 'Microsoft YaHei' },
        { name:'微软正黑体', value: 'Microsoft JhengHei' },
        { name:'新宋体', value: 'NSimSun' },
        { name:'新细明体', value: 'PMingLiU' },
        { name:'细明体', value: 'MingLiU' },
        { name:'标楷体', value: 'DFKai-SB' },
        { name:'仿宋', value: 'FangSong' },
        { name:'楷体', value: 'KaiTi' },
        { name:'仿宋_GB2312', value: 'FangSong_GB2312' },
        { name:'楷体_GB2312', value: 'KaiTi_GB2312' }
      ],
      titlePosition: [
        { label: "左", value: "left" },
        { label: "居中", value: "center" },
        { label: "右", value: "right" },
      ],
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.$emit("input", val);
      },
    },
    show(val) {
      if(val) {
        this.$nextTick(()=>{
          this.$refs.titleInput.focus();
        })
      }
    },
    color: {
      immediate: true,
      handler(val) {
        if(val.length) {
          this.$set(this.chartData.settings.title.main, "color", val[0]);
        }
      }
    },
    subColor: {
      immediate: true,
      handler(val) {
        if(val.length) {
          this.$set(this.chartData.settings.title.sub, "color", val[0]);
        }
      }
    },
    fontSize: {
      immediate: true,
      handler(val) {
        this.$set(this.chartData.settings.title.main, "fontSize", val);
      }
    },
    fontWeight: {
      immediate: true,
      handler(val) {
        this.$set(this.chartData.settings.title.main, "fontWeight", val);
      }
    },
    subfontWeight: {
      immediate: true,
      handler(val) {
        this.$set(this.chartData.settings.title.sub, "fontWeight", val);
      }
    },
    subFontSize: {
      immediate: true,
      handler(val) {
        this.$set(this.chartData.settings.title.sub, "fontSize", val);
      }
    },
    fontFamily: {
      immediate: true,
      handler(val) {
        this.$set(this.chartData.settings.title, "fontFamily", val);
      }
    } 
  },
  computed: {
    title() {
      let { main } = this.chartData.settings.title;
      return main;
    },
    subTitle() {
      let { sub } = this.chartData.settings.title;
      return sub;
    },
    show() {
      return this.$attrs.titleModel.show;
    }
  },
  methods: {
    onchange(val) {
      this.titleValue = val.target.value;
      this.$set(this.chartData.settings.title, "position", this.titleValue);
    },
    onTitleEdit() {
      this.$emit('onTitleEdit');
    },
    editTitle(val) {
      this.$emit('editTitle',{ show: true, ...val });
    },
    open(key){
      if(this.activeKey&&this.activeKey.length) {
        let index = this.activeKey.indexOf(key);
        if(index>=0) {
          this.activeKey.splice(index,1);
        }
      }
    },
    onTagChecked(field){
      let dom = this.$refs.titleInput.$el;
      if(dom.tagName != 'INPUT'){
        dom = dom.getElementsByTagName('input')[0];
      }
      let start = dom.selectionStart, end = dom.selectionEnd;
      let text = this.titleModel.value || '';
      this.titleModel.value = text.substr(0, start) + '${' + field.code + '}' + text.substr(end);
      this.$nextTick(() => {
        dom.setSelectionRange(start, start + field.code.length + 3);
        dom.focus();
      })
    },
  },
};
</script>
<style lang="less" scoped>
.ant-collapse-item {
  border-bottom: 0;
  /deep/&.second {
    & .ant-collapse-header {
      padding-right: 0;
    }
    & .ant-collapse-content-box {
      padding-right: 0;
    }
  }
  .font-weight {
    line-height: 32px;
    padding-left: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title, .subtitle, .font-color, .font-family, .font-size, .position {
    padding-left: 25px;
    .label {
      line-height: 32px;
    }
    .titlecontent {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .ant-switch {
        position: relative;
        right: -10px;
      }
    }
    .ant-select {
      width: 100%;
      &:first-child {
        margin-bottom: @padding-sm;
      }
    }
    .ant-input-number {
      width: 100%;
    }
    /deep/.colorPicker {
      width: 100%;
      .color_con {
        margin-top: 0;
      }
    }
  }
}
</style>
