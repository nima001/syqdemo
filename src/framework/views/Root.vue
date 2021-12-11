<template>
  <div></div>
</template>
<script>
export default {
  created(){
    this.redirectHome();
  },
  methods: {
    async redirectHome(){
      let homePage;
      try {
        let config = await this.$store.dispatch('loadConfig');
        homePage = config['home.page'];
      } catch (error) {
        //ignore
      }
      this.$router.replace(homePage || '/main');
    }
  }
}
</script>