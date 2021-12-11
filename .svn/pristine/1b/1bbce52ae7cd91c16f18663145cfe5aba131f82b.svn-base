export default {
  computed: {
    distList(){
      return this.$store.getters.dict("usermanage.org.district") || [];
    },
  },
  methods: {
    matchCode(code){
      for(let i = (code.length/2) - 1; i >= 0; i--){
        if(+code.substring(i * 2) != 0){
          code = code.substring(0, (i + 1) * 2)
          break          
        }
      }
      let arr = [];
      this.distList.forEach(item => {
        if(item.value.startsWith(code)){
          arr.push(item.value);
        }
      });
      return arr;
    }
  }
}