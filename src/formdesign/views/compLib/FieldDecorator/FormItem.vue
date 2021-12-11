<template>
  <div class="decorator" :class="[feedbackLayout, labelLayout]">
    <div v-if="labelLayout != 'inset' && showLabel && label" 
      class="decorator-label" :style="labelStyle"
    >
      <label :class="{ required: required, colon: colon }" >{{label}}</label>
    </div>
    <div class="decorator-control" :class="{
      'has-error': validateStatus == 'error',
      'has-warning': validateStatus == 'warning',
      'has-success': validateStatus == 'success',
      'no-border': noBorder
    }">
      <div class="decorator-control-children" :class="{'no-border': labelLayout == 'inset'}">
        <div class="decorator-label-wrapper" v-if="labelLayout == 'inset' && showLabel && label">
          <div class="decorator-label" :style="labelStyle">
            <label :class="{ required: required, colon: colon }">{{label}}</label>
          </div>
        </div>
        <a-tooltip :placement="labelLayout == 'vertical' ? 'bottomLeft' : 'topLeft'" 
          :title="feedbackLayout == 'popover' ? help : ''"
          :destroyTooltipOnHide="true"
        >
          <div class="decorator-field"><slot/></div>
        </a-tooltip>
      </div>
      <div v-if="feedbackLayout == 'loose' || (feedbackLayout == 'terse' && help)" 
        class="decorator-explain">{{help}}</div>
    </div>
  </div>
</template>
<script>
import { Form, Tooltip } from 'ant-design-vue'
import { connect, mapProps, observer, useForm, useField, useFieldSchema } from '@formily/vue'
import { watch } from '@vue/composition-api';

export default {
  components: {
    AFormItem: Form.Item,
    ATooltip: Tooltip,
  },
  props: {
    label: String,
    required: Boolean,
    showLabel: { //是否显示标签
      type: Boolean,
      default: true,
    },
    labelLayout: { //标签布局 'vertical' | 'horizontal' | 'inset'
      type: String,
      default: 'vertical'
    },
    lableAlign: String, //标签对齐方式 'left' | 'right'
    lableMinWidth: [Number, String], //标签最小字宽
    lableMaxWidth: [Number, String], //标签最大字宽
    feedbackLayout: { // 反馈布局 'loose' | 'terse' | 'popover'
      type: String,
      default: 'loose'
    }, //反馈信息布局 'popover' | 'bottom'
    noBorder: Boolean, //是否显示边框
    colon: {  //是否需要冒号
      type: Boolean,
      default: true,
    },
    validateStatus: String,
    help: String,
  },
  setup(){
    const form = useForm();
    const schema = useFieldSchema()
    // const field = useField();
    // watch(schema, (a, b) => {
    //   console.log('watch', a.title, b.title)
    // })
    // console.log(useField())
    return {
      _formComponentType: 'decorator',
      form,
      schema,
    }
  },
  created(){
    // console.log('create', this.schema.name, this)
  },
  computed: {
    labelStyle(){
      let style = { textAlign: this.lableAlign }
      if(this.lableMinWidth > 0){
        style.minWidth = `${this.lableMinWidth}em`;
      }
      if(this.lableMaxWidth > 0){
        style.maxWidth = `${this.lableMaxWidth}em`;
      }
      return style;
    }
  },
}
</script>
<style lang="less" scoped>
.decorator{
  .decorator-label{
    box-sizing: content-box;
    padding: 0 .5em;
    line-height: 32px;
    overflow: hidden;
    label{
      white-space: nowrap;
      &.required{
        margin-left: -.5em;
        &::before{
          content: "*";
          display: inline-block;
          width: .5em;
          color: #f5222d;
          text-align: center;
          font-family: SimSun,sans-serif;
          line-height: 1;
        }
      }
      &.colon {
        margin-right: -.5em;
        &::after{  
          content: ":";
          display: inline-block;
          width: .5em;
          text-align: center;
        }
      }
    }
  }
  .decorator-field{
    line-height: 32px;
  }
  .decorator-explain{
    margin: 2px 0;
    line-height: 1.2em;
  }

  //标签布局
  &.vertical{//label垂直排列
    .decorator-label{
      label{
        // margin-left: -.5em;
      }
    }
  }
  &.horizontal{//label水平排列
    display: flex;
    padding: 4px 0;
    .decorator-label{
      flex: none;
      margin-right: 4px;
    }
    .decorator-control{
      flex: 1 1 100%;
    }
  }
  &.inset{//label内嵌
    padding: 4px 0;
    .no-border{
      .decorator-control-children{
        border: none;
        &:focus-within{
          box-shadow: none !important;
        }
        .decorator-label-wrapper{
          border: none;
          background-color: unset;
        }
        .decorator-label{
          line-height: 32px;
        }
        .decorator-field{
          line-height: 32px;
        }
      }
    }
    .decorator-control-children{
      display: flex;
      border: 1px solid @border-color-base;
      border-radius: @border-radius-base;
      transition: all 0.3s;
      &:hover{
        border-color: @primary-color;
        .decorator-label-wrapper{
          border-color: @primary-color;
        }
      }
      &:focus-within{
        border-color: lighten(@primary-color, 5%);
        box-shadow: 0 0 0 2px @primary-2;
        .decorator-label-wrapper{
          border-color: lighten(@primary-color, 5%);
        }
      }
      .decorator-label-wrapper{
        flex: none;
        padding: 0 3px;
        background-color: @background-color-light;
        border-radius: @border-radius-base 0 0 @border-radius-base;
        border-right: 1px solid @border-color-base;
        transition: all 0.3s;
      }
      .decorator-label{
        line-height: 30px;
      }
      .decorator-field{
        flex: 1 1 100%;
        line-height: 30px;
      }
    }
  }

  //反馈布局样式
  &.loose{//紧凑模式 提示信息只在有值的时候显示
    .decorator-explain{
      min-height: 20px;
    }
  }

  //校验状态样式
  .has-error{
    .decorator-explain{
      color: @error-color;
    }
    .decorator-control-children.no-border{
      border-color: @error-color;
      &:focus-within{
        box-shadow: 0 0 0 2px fade(@error-color, 20%);
      }
      .decorator-label-wrapper{
        border-color: @error-color;
      }
    }
  }
  .has-warning{
    .decorator-explain{
      color: #faad14;
    }
    .decorator-control-children.no-border{
      border-color: #faad14;
      &:focus-within{
        box-shadow: 0 0 0 2px fade(#faad14, 20%);
      }
      .decorator-label-wrapper{
        border-color: #faad14;
      }
    }
  }
  // .has-success{
  //   .decorator-explain{
  //     color: inherit;
  //   }
  // }
}
</style>