<template>
  <accordion-layout nav-title="组织架构">
    <keep-alive>
      <router-view />
    </keep-alive>
  </accordion-layout>
</template>
<script>
import AccordionLayout from '@/framework/components/AccordionLayout'
export default {
  components: {
    AccordionLayout
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>