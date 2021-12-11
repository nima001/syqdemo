<template>
  <div class="screen-pane" ref="pane">
    <div class="wrapper" :style="wrapperStyle">
      <slot/>
    </div>
  </div>
</template>
<script>
import { scale } from '@antv/g6/lib/util/math';
export default {
  props: {
    width: {
      type: Number,
      default:1440
    },
    height: {
      type: Number,
      default:900
    }
  },
  data(){
    return {
      screen: undefined
    }
  },
  computed: {
    wrapperStyle(){
      let style = {
        width: this.width + 'px',
        height: this.height + 'px',
      }
      if(this.screen){
        let scale = Math.min(this.screen.width / this.width, this.screen.height / this.height);
        style.transform = `scale(${scale})`, 
        style.transformOrigin = '0 0';
        style.marginLeft = (this.screen.width - this.width * scale)/2 + 'px';
      }else{
        style.visibility = 'hidden';
      }
      return style;
    }
  },
  created(){
    window.addEventListener("resize", this.initScreen, false);
  },
  mounted(){
    this.initScreen();
  },
  destroyed(){
    window.removeEventListener("resize", this.initScreen);
  },
  methods: {
    initScreen(){
      let elem = this.$refs.pane;
      this.screen = {
        width: elem.offsetWidth,
        height: elem.offsetHeight
      }
    },
  }
}
</script>
<style lang="less" scoped>
.screen-pane{
  height: 100%;
  background: radial-gradient(circle, #11368E 0%, #111C39 100%);
  &::before {
    content: "";
    background: url('../assets/img/bj.png') center center no-repeat;
    background-size: cover;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }
}
</style>