<template>
  <accordion-layout nav-title="主题">
    <left-nav @select="onNavSelect" slot="nav"></left-nav>
    <keep-alive include="orgMain">
      <router-view :load-data="selected" />
    </keep-alive>
  </accordion-layout>
</template>
<script>
import AccordionLayout from '@/framework/components/AccordionLayout'
import LeftNav from '@/person-shaoxing/views/monitor/businessHandle/LeftNav'
import Main from "@/person-shaoxing/views/monitor/businessHandle/Main"
export default {
  name: 'monitorIndex',
  components: {
    AccordionLayout,
    LeftNav,
    Main
  },
  data() {
    return {
      selected: undefined
    };
  },
  methods: {
    onNavSelect(data) {
      this.selected = data
    }
  }
};
</script>