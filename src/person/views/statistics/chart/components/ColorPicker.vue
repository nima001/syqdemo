<template>
    <div class="colorPicker">
        <a-popover
            overlayClassName="popover"
            placement="left" 
            trigger="click"
            :destroyTooltipOnHide="true">
            <div slot="content">
                <sketch-picker v-model="value" @input="updateValue"></sketch-picker>
            </div>
            <div class="color_con" :style="{background:value}"><slot/></div>
        </a-popover>
    </div>
</template>

<script>
import { Popover } from 'ant-design-vue';
import { Sketch  } from 'vue-color';
import PropMixin from '@/framework/components/SettingTree/PropMixin'
import { cloneDeep } from 'lodash';
export default {
 mixins: [PropMixin],
 components: {
    'sketch-picker': Sketch,
    APopover: Popover,
  },
  props: {
    color: String,
    default: ()=> {
        return '' 
    },
  },
  data () {
    return {
        value: '#fff',
    }
  },
  created() {
    if(this.color) {
        this.value = cloneDeep(this.color);
    }else{
        this.value = this.property.defaultValue;
    }
  },
  methods:{
    updateValue (val) {
        this.value = val.hex8;
        if(this.color) {
            this.$emit('change', this.value);
        }else{
            this.propValue = this.value;
        }
    },
  }
};
</script>
<style lang="less" scoped>
.colorPicker {
    width: 69.5%;
    .color_con {
        height: 30px;
        border-radius: @border-radius-base;
        box-shadow: 0 0 2px 2px rgba(0,0,0,.2);
        cursor: pointer;
    }
}
/deep/.ant-popover {
    & .ant-popover-inner-content {
        padding: 0 !important;
    }
}

</style>
