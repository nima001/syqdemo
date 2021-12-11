<template>
  <div class="map-wrapper" ref="contaner" :style="{
    transform: rotateX && `rotateX(${rotateX}deg)`
  }">
    <component v-if="distrist" 
      :is="`Map${distrist.adcode}`" 
      class="map"
      :selected="selected"
      @select="onAreaSelect" 
      @enter="onAreaEnter"
      :style="mapStyle"
    />
    <component v-if="overlay" 
      :is="`Map${overlay.adcode}`" 
      class="overlay" 
      :style="overlay.style"
    />
  </div>
</template>
<script>
import Map330000 from './Map330000'
import Map330100 from './Map330100'
import Map330200 from './Map330200'
import Map330300 from './Map330300'
import Map330400 from './Map330400'
import Map330500 from './Map330500'
import Map330600 from './Map330600'
import Map330700 from './Map330700'
import Map330800 from './Map330800'
import Map330900 from './Map330900'
import Map331000 from './Map331000'
import Map331100 from './Map331100'

/**
 * 区域地图
 */
export default {
  components: {
    Map330000,
    Map330100,
    Map330200,
    Map330300,
    Map330400,
    Map330500,
    Map330600,
    Map330700,
    Map330800,
    Map330900,
    Map331000,
    Map331100,
  },
  model: {
    event: 'select'
  },
  props: {
    value: {//v-model 选中的区域或区域编码
      type: [String, Object]
    },
    locationPath: {//(.sync) 当前定位的区域路径
      type: Array
    },
    rotateX: Number,
  },
  data(){
    return {
      path: [{ adcode : '330000', title: '浙江省'}],
      selected: undefined,
      mapStyle: {},
      overlay: undefined
    }
  },
  created(){
    this.$emit('update:locationPath', this.path);
  },
  computed: {
    distrist(){
      if(this.path && this.path.length){
        return this.path[this.path.length-1];
      }
    },
  },
  watch: {
    value(v){
      if(v){
        this.selected = v.adcode || v;
      }
    },
  },
  methods: {
    onAreaEnter({ adcode, title, elem, event }){
      if(this.path.length > 1){//目前只有第一级可双击进入
        return;
      }
      const contaner = this.$refs.contaner;
      const cRect = contaner.getBoundingClientRect();
      const rect = elem.getBoundingClientRect();
      const cScale = cRect.width / contaner.offsetWidth;
      let xs = 1;
      if(this.rotateX){
        xs = Math.cos(Math.PI*this.rotateX/180)
      }
      const offsetX = (cRect.x + cRect.width/2 - (rect.x + rect.width/2)) / cScale, 
            offsetY = (cRect.y + cRect.height/2 - (rect.y + rect.height/2)) / (cScale * xs);
      const scale = Math.min(cRect.width/rect.width, cRect.height/rect.height);
      // console.log(cRect, rect)
      //过渡前的状态
      //1.切换的区域缩放到指定位置
      this.mapStyle = {
        transform: `translate(${-offsetX}px, ${-offsetY}px) scale(${1/scale})`,
      }
      //2.设置切换前的地图为遮照图层
      this.overlay = { 
        adcode: this.distrist.adcode, 
        style: {
          //以选择的区域的中心点为原点进行变换
          transformOrigin: `${(rect.x + rect.width/2 - cRect.x)/cScale}px ${(rect.y + rect.height/2 - cRect.y)/(cScale * xs)}px`
        }
      };
      //过渡样式
      this.$nextTick(() => {
        this.mapStyle = {};
        this.overlay.style = {
          transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`,
          opacity: 0,
        }
      });
      //800毫秒后过渡完成删除遮照图层
      setTimeout(() => {
        this.overlay = undefined;
      }, 800)
      this.path.push({ adcode, title });
      this.$emit('update:locationPath', this.path);
    },
    onAreaSelect({ adcode, title, elem, event }){
      this.$emit('select', {adcode, title});
    },
  }
}
</script>
<style lang="less" scoped>
@keyframes areaBoundaryfadeIn{
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.map-wrapper{
  height: 100%;
  position: relative;
  overflow: hidden;
  /deep/.map{
    width: 100%;
    height: 100%;
    transition: all .8s cubic-bezier(.06,.7,.23,1);
    & > g, & > text{
      animation: areaBoundaryfadeIn .8s linear;// cubic-bezier(0.29, 0.10, 0.69, 0.26) 1,
    }
  }
  .overlay{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    transition: all .8s cubic-bezier(.06,.7,.23,1);
  }
}
</style>