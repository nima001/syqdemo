<template>
 <a-layout class="main" style="height: 100%;min-width: 1280px;">
    <system-header>
      <template v-slot:zfw>
        <span class="item">
          <router-link to="/zfw/helps/datatotal">
            <a-icon class="question" type="question-circle" />
          </router-link>
        </span>
      </template>
    </system-header>
    <a-layout-content :style="{overflowY: 'auto', height: '100%'}">
      <router-view />
    </a-layout-content>
    <div v-if="isLogined" class="mask">
      <div class="circle"></div>
      <div class="arrow">
        <img src="../assets/img/arrows.png" alt="">
      </div>
      <div class="mask_con">
        <div class="con">
          <p class="tip">点击查看使用指南</p>
          <div class="know">
            <div @click="onToggle">
              我知道了
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-layout>
</template>
<script>
import { Layout, Icon } from "ant-design-vue";
import SystemHeader from "@/framework/components/SystemHeader";

export default {
  components: {
    ALayout: Layout,
    ALayoutContent: Layout.Content,
    SystemHeader,
    AIcon: Icon,
  },
  computed: {
    isLogined() {
      return this.$store.getters.isFristLogin
    }
  },
  methods: {
    onToggle() {
      this.$store.commit('set_isFristLogin', false)
    }
  }
};
</script>

<style scoped lang="less">
.main{
  position: relative;
  .item{
    cursor: pointer;
    letter-spacing: 1px;
    position: relative;
    margin: 0 @padding-xs;
    color: @white;
    a{
      color: @white;
      .question{
        font-size: 16px;
      }
    }
  }
  .mask{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .circle{
      position: fixed;   
      right: 204px;   
      top: 8px;   
      width: 50px;   
      height: 50px;   
      border-radius: 50px;   
      box-shadow: rgba(0,0,0,.5) 0px 0px 0px 2005px;   
      z-index: 100;  
    }
    .arrow{
      position: fixed;
      right: 190px;   
      top: 116px;   
      z-index: 101;
    }
    .mask_con{
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .con{
        width: 260px;
        text-align: center;
        color: @white;
        z-index: 999;
        p{
          font-size: 30px;
          margin-bottom: 34px;
        }
        .know{
          font-size: 20px;
          width: 100%;
          display: flex;
          justify-content: center;
          div{
            width: 140px;
            line-height: 60px;
            border: 3px dashed @white;
            border-radius: 5px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>