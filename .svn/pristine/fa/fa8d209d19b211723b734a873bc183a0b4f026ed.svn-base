<template>
  <div class="page-container">
    <div>
      <div class="body">
        <slot/>
      </div>
      <div class="prev turn-page">
        <a class="button" @click="$emit('prev')" title="上一页"><a-icon type="left"/></a>
      </div>
      <div class="next turn-page">
        <a class="button" @click="$emit('next')" title="下一页"><a-icon type="right" /></a>
      </div>
      <div class="toolbar" 
        :style="{
          left: `${toolbarLeft + 20}px`,
          display: toolbarLeft ? 'block':'none'
        }"
      >
        <slot name="extraTools"/>
        <a class="button" @click="$emit('refresh')" title="刷新"><a-icon type="reload"/></a>
        <a class="button" @click="$emit('prev')" title="上一页"><a-icon type="left"/></a>
        <a class="button" @click="$emit('next')" title="下一页"><a-icon type="right" /></a>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from "ant-design-vue";

/**
 * 翻页
 */
export default {
  components: {
    AIcon: Icon,
  },
  props: {
    width: Number,
    height: Number,
  },
  data(){
    return {
      toolbarLeft: 0

    }
  },
  mounted(){
    let content = this.$slots.default[0];
    if(content){
      this.toolbarLeft = content.elm.offsetLeft + content.elm.offsetWidth;
    }
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy(){
    window.removeEventListener("resize",this.onResize);
  },
  methods: {
    onResize(){
      let content = this.$slots.default[0];
      if(content){
        this.toolbarLeft = content.elm.offsetLeft + content.elm.offsetWidth;
      }
    }
  }
}
</script>
<style lang="less" scoped>
.page-container{
  display: flex;
  flex-direction: column;
  height: 100%;
  
  & > div{
    overflow: hidden;
    position: relative;
  }
  .body{
    overflow-y: auto;
    height: 100%;
    & > *{
      box-shadow: 0px 0px 15px -4px #dad9d9;
      background-color: white;
      margin: 10px auto;
    }
  }
  .toolbar{
    position: absolute;
    bottom: 20px;
    .button{
      margin-top: 20px;
    }
  }
  .turn-page{
    position: absolute;
    top: 10%;
    display: flex;
    height: 80%;
    width: 60px;
    .button{
      align-self: center;
      display: none;
    }
    &:hover{
      .button{
        display: block;
      }
    }
    &.prev{
      left: 20px;
    }
    &.next{
      right: 20px;
    }
  }
  .button{
    display: block;
    width: 60px;
    height: 60px;
    line-height: 60px;
    border-radius: 50%;
    background: #ddd;
    cursor: pointer;
    text-align: center;
    .anticon{
      font-size: 30px;
      color: #000;
      vertical-align: -0.3em;
    }
    &:hover {
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>