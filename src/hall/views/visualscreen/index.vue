<template>
  <ScreenPane>
    <Header v-model="activeCmpt"></Header>
    <component :is="activeCmpt"></component>
  </ScreenPane>
</template>
<script>
import Header from "./components/Header";
import BusinessMonitor from "./BusinessMonitor";
import EffectiveAnalyse from "./EffectiveAnalyse";
import ScreenPane from "./components/ScreenPane";
export default {
  components: { BusinessMonitor,Header,ScreenPane, EffectiveAnalyse },
  data() {
    return {
      activeCmpt: "BusinessMonitor"
    };
  }
};
</script>
<style lang='less' scoped>
@font-face {
  font-family: D-DINExp;
  src: url("./assets/font/D-DINExp.otf") format("truetype");
}
@font-face {
  font-family: D-DIN;
  src: url("./assets/font/D-DIN.otf") format("truetype");
}
@font-face {
  font-family: Alibaba;
  src: url("./assets/font/Alibaba-PuHuiTi-Bold.ttf") format("truetype");
}
</style>