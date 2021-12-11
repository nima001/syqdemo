<template>
  <div class="wrap">
    <loading v-if="loading" />
    <swiper-ant v-else :size="2" :pretBtn="{visibility:'hidden'}" :nextBtn="{visibility:'hidden'}">
      <template slot="swiper0">
        <power-change :list="PowerList"></power-change>
      </template>
      <template slot="swiper1">
        <power-all :list="AllList"></power-all>
      </template>
    </swiper-ant>
  </div>
</template>
<script>
import PowerAll from "./PowerAll";
import PowerChange from "./PowerChange";
import SwiperAnt from "../components/SwiperAnt";
import { powerAll, powerChange } from "@/person-shaoxing/api/orgStaffReport";
import { showError } from "@/framework/utils/index";
import Loading from "../components/Loading";
export default {
  components: { PowerAll, PowerChange, SwiperAnt, Loading },
  data() {
    return {
      AllList: [],
      PowerList: [],
      loading: true
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getResult(res) {
      let { keyCols, rows, valueCols } = res;
      let list = rows.map(item => {
        let v = this.$store.getters.dictKey(
          keyCols[0]["key"],
          item[keyCols[0]["column"]]
        );
        return {
          district: v && v.text,
          value: item[valueCols[0]["column"]]
        };
      });
      return list;
    },
    getList() {
      Promise.all([powerAll(), powerChange()])
        .then(res => {
          this.AllList = this.getResult(res[0].result.data);
          this.PowerList = this.getResult(res[1].result.data);
          this.loading = false;
        })
        .catch(err => {
          showError(err);
        });
    }
  }
};
</script>
<style lang='less' scoped>
.wrap {
  position: relative;
  height: 282px;
  /deep/ svg {
    top: 143px;
  }
}
</style>