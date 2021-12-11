<template>
  <div class="proportion" :class="{
    proportion: true, 
    normal: status == 'normal',
    exception: status == 'exception',
    success: status == 'success',
  }">
    <a-progress type="circle" 
      :percent="percent" 
      strokeColor="" 
      :status="status"
      :format="format" 
    />
    <div class="footer">
      <div class="left">
        <div class="text">{{totalText}}</div>
        <div class="num">{{total ? total : 0}}</div>
      </div>
      <div class="right">
        <div class="text">{{numText}}</div>
        <div class="num">{{num ? num : 0}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Progress } from "ant-design-vue";

/**
 * 占比显示
 */
export default {
  components: {
    AProgress: Progress
  },
  props: {
    num: Number,
    total: Number,
    numText: String,
    totalText: String,
    surplusText: String
  },
  computed: {
    percent(){
      if(this.num > 0 && this.total > 0){
        return (this.num/this.total) * 100
      }
    },
    surplus(){
      return (this.total || 0) - (this.num || 0);
    },
    status() {
      if(this.surplus < 0){
        return 'exception';
      }else if(this.surplus < this.total * 0.01){
        return 'success';
      }
      return 'normal';
    }
  },
  methods: {
    format(percent){
      return <div class="progress"><span class="text">{this.surplusText}</span><br/><span class="num">{this.surplus}</span></div>
    },
  }
}
</script>
<style lang="less" scoped>
@color-default: #8ed306;
@color-error: #e76043;
@color-warn: #fec400;

.proportion{
  min-height: 212px;
  text-align: center;
  &.normal{
    /deep/ .ant-progress-circle-trail{
      stroke: lighten(@color-default, 20%) !important;
    }
    /deep/ .ant-progress-circle-path{
      stroke: @color-default !important;
    }
  }
  &.exception{
    .progress .num,.footer .text::before{
      color: @color-error;
    }
    .footer .left .text::before{
      color: lighten(@color-error, 20%)
    }
  }
  &.success{
    /deep/ .ant-progress-circle-path{
      stroke: lighten(@color-warn, 0) !important;
    }
    /deep/ .ant-progress-circle-path{
      stroke: lighten(@color-warn, 0) !important;
    }
    .progress .num,.footer .text::before{
      color: @color-warn;
    }
    .footer .left .text::before{
      color: lighten(@color-warn, 20%)
    }
  }
  .progress{
    line-height: 1.6em;
    .text{
      color: @text-color;
    }
    .num{
      color: @color-default;
      font-size: 1.5em;
      font-weight: bold;
      transition: color .3s ease 0s;
    }
  }

  .footer{
    overflow: hidden;
    margin-top: 30px;
    .left{
      float: left;
      width: 50%;
      & .text::before{
        color: lighten(@color-default, 20%)
      }
    }
    .right{
      float: right;
      width: 50%;
    }
    .text{
      &::before{
        content: '●';
        margin-right: 4px;
        color: @color-default;
      }
    }
    .num{
      font-weight: bold;
    }
  }
}
</style>