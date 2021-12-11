<template>
  <div class="wrap">
    <div class="content">
      <div class="header">
        <div class="view">
          <div class="title">{{title}}</div>
        </div>
      </div>
      <div class="body">
        <div class="IndexCont">
          <div class="cityInfo">
            <city-info :dictId="infoId"></city-info>
          </div>
          <div class="map" @click="jump">
            <hot-map @dictId="handlerId"></hot-map>
          </div>
          <div class="hotPot" :style="hotPosition">
            <hot-pot></hot-pot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HotMap from "./index/HotMap";
import HotPot from "./index/HotPot";
import CityInfo from "./index/CityInfo";
export default {
  components: { HotMap, HotPot, CityInfo },
  data() {
    return {
      dictId: undefined,
      infoId: undefined
    };
  },
  methods: {
    jump() {
      this.$router.push({
        path: "/person/screen/detail",
        query: { id: this.dictId}
      });
    },
    handlerId(id) {
      this.dictId = id;
      if(id != '330600'){//市本级不需要显示详情
        this.infoId = id;
      }
    }
  },
  computed: {
    title(){
      return this.$store.getters.getConfig('datascreen.title');
    },
    hotPosition() {
      let style = {};
      switch (this.dictId) {
        case "330603":
          style = { top: "280px", right: "300px" };
          break; // 柯桥
        case "330604":
          style = { top: "120px", right: "175px" };
          break; // 上虞
        case "330683":
          style = { top: "400px", right: "280px" };
          break; // 嵊州
        case "330624":
          style = { top: "510px", right: "175px" };
          break; // 新昌
        case "330602":
          style = { top: "142px", right: "310px" };
          break; // 越城
        case "330681":
          style = { top: "270px", right: "435px" };
          break; // 诸暨
        default:
          style = { display: "none" };
      }
      return style;
    }
  }
};
</script>
<style lang='less' scoped>
@font-face {
  font-family: LESLIEB;
  src: url("./img/LESLIEB_.TTF") format("truetype");
}
.wrap {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #00040a url("./img/bj.png") center center;
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  .content {
    width: 1440px;
    min-height: 900px;
    margin: 0 auto;
    .header {
      height: 156px;
      position: relative;
      padding-top: 16px;
      background: url("./img/header.png") center top;
      .view {
        text-align: center;
        .title {
          height: 35px;
          font-size: 26px;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          line-height: 35px;
          color: #ffffff;
          text-shadow: 0px 0px 16px rgba(28, 28, 30, 0.95);
          letter-spacing: 10px;
        }
      }
    }
    .body {
      margin-top: -56px;
      .IndexCont {
        width: 1070px;
        display: flex;
        justify-content: space-between;
        margin: 80px auto 0px;
        position: relative;
        .map {
          width: 652px;
          height: 596px;
          position: relative;
        }
        .cityInfo {
          width: 328px;
        }
        .hotPot {
          position: absolute;
          pointer-events: none;
        }
      }
    }
  }
}
</style>