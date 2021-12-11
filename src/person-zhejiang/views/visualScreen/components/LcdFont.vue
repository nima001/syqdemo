<template>
  <!--液晶字体-->
  <div class="lcdfont">
    <span class="fake" :style="fakeStyle">
      <span v-for="index in length" :key="index">0<span class="dot">.</span></span>
    </span>
    <span class="real" :style="realStyle">
      <span v-for="(item, index) in numbers" :key="index" class="num">{{item}}<span class="dot" :class="{
        show: numbers.intLen === undefined || index == numbers.intLen - 1
      }">.</span></span>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    length: {// 液晶字体长度
      type: Number,
      required: true
    },
    realNumber: { // 液晶字体数值
      
    },
    fakeStyle: {// 底色样式
      type: Object,
      default: () => {
        return {};
      }
    },
    realStyle: {// 液晶字体样式
      type: Object,
      default: () => {
        return {};
      }
    },
    precision: {//精度
      type: Number,
      default: 0,
    },
    smooth: {
      type: Boolean,
      default: true
    },
    speed: {
      type: Number,
      default: 6,
    }
  },
  data(){
    return {
      num: 0,
      destNum: undefined,
      numbers: [],
      timer: 0,
      fps: 30,
      lastTime: undefined,
    }
  },
  computed: {
    precisionValue(){
      if(this.precision < 0){
        return 1;
      }else{
        return 1/Math.pow(10, this.precision)
      }
    }
  },
  watch: {
    realNumber: {
      immediate: true,
      handler(num){
        let n = Number(num);
        if(isNaN(n)){
          this.destNum = undefined;
        }else{
          if(this.precision >= 0){//指定精度
            n = Number(n.toFixed(this.precision));
          }
          if(n >= Math.pow(10, this.length) 
            || n <= -Math.pow(10, this.length - 1)){
            this.destNum = NaN;
          }else{
            this.destNum = n;
          }
        }
        this.play();
      }
    }
  },
  methods: {
    play(){
      if(this.destNum === undefined){
        this.num = 0;
        this.numbers = [];
        this.pause();
      }else if(isNaN(this.destNum)){
        this.num = 0;
        this.numbers = Array(this.length).fill(8);
        this.pause();
      }else{
        if( this.timer === 0 ){
          this.scheduleNextFrame();
        }
      }
    },
    scheduleNextFrame() {
      if(this.smooth){
        this.lastTime = this.time();
        this.timer = setTimeout( this.playFrame, 1000 / this.fps );
      }else{
        this.num = this.destNum;
        this.playFrame();
      }
    },
    playFrame() {
      var rem = this.destNum - this.num;
      var now = this.time();
      var dt = (now - this.lastTime) * 0.002;
      this.lastTime = now;


      if( Math.abs(rem) <= this.precisionValue) {//差值小于精度
        this.num = this.destNum;
        this.pause();
      } else {
        this.num = this.destNum - rem / (1 + (this.speed * dt))
        this.scheduleNextFrame();
      }

      let n = this.num.toFixed(this.precision);//这里小数点末尾的0不能省略，保证数字变化过程中位数不变
      let arr = [], intLen = 0;
      for(let i = 0; i<n.length; i++){
        let s = n.charAt(i);
        if(arr.length >= this.length){
          break;
        }
        if(s == '.'){
          intLen = i;
        }else{
          arr.push(s);
        }
      }
      arr.intLen = intLen;
      this.numbers = arr;
    },
    pause(){
      clearTimeout(this.timer);
      this.timer = 0;
    },
    time(){
      if(!window.performance || !window.performance.now){
        return +new Date();
      }else{
        return window.performance.now();
      }
    },
  }
};
</script>
<style lang='less' scoped>
@font-face {
  font-family: LESLIEB;
  src: url("../../../assets/img/screen/LESLIEB_.TTF") format("truetype");
}
.lcdfont {
  position: relative;
  display: inline-block;
  & > span {
    font-family: LESLIEB;
    height: 48px;
    font-size: 48px;
    font-weight: 400;
    line-height: 48px;
    opacity: 1;
  }
  .dot{
    visibility: hidden;
    &.show{
      visibility: visible;
    }
  }
  .fake {
    color: #343434;
  }
  .real {
    color: #8fc7ff;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    text-align: right;
  }
}
</style>