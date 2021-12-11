<template>
  <div class="wrap">
    <div class="bj"></div>
    <cloud-carousel class="city" 
      :bringToFront="true" 
      :farScale="0.75" 
      :initIndex="initIndex"
      frontItemClass="front"
      @changed="onChanged"
      @toward="onToward"
    >
      <div v-for="item in districtList" :key="item.value" class="item">{{item.text}}</div>
    </cloud-carousel>
    <div class="diamond"></div>
  </div>
</template>
<script>
import CloudCarousel from '@framework/components/CloudCarousel';
import cloneDeep from "lodash/cloneDeep";
import { mixins } from "../components/minxin";

export default {
  mixins: [mixins],
  components: { CloudCarousel },
  data() {
    return {
      district: this.dictId,
    };
  },
  computed: {
    districtList(){
      let arr = this.$store.getters.dict('usermanage.org.district') || [];
      return [...arr].reverse()
    },
    initIndex(){
      return this.districtList.findIndex(item => item.value == this.dictId);
    }
  },
  methods: {
    onChanged(index) {
      this.dictCode.dictId = this.districtList[index].value;
    },
    onToward(index){
      //TODO sunwen 尝试加载数据，onChanged时数据已经加载完成，可以直接显示数据
    }
  }
};
</script>
<style lang='less' scoped>
@keyframes bounce-down {
  25% {
    transform: translateY(-10px);
  }
  50%, 100% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(10px);
  }
}

.wrap {
  padding: 120px 0px 0px;
  position: relative;
  .bj {
    width: 682px;
    height: 170px;
    background: url("../img/circle.png");
    margin: 0 auto;
  }
  .diamond {
    width: 72px;
    height: 72px;
    background: url("../img/diamond.png");
    position: absolute;
    top: 90px;
    left: 310px;
    animation: bounce-down 1.5s linear infinite;
  }
  .city {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    margin: 0px;
    .item {
      width: 103px;
      height: 41px;
      background: url("../img/city-name.png");
      font-size: 20px;
      font-weight: 400;
      line-height: 26px;
      color: #fff;
      text-align: center;
      line-height: 41px;
      position: absolute;
      opacity: 0.6;
      cursor: pointer;
      &.front {
       opacity: 1;
      }
    }
  }
}
</style>