export const mixins = {
  inject: ['dictCode'],
  computed: {
    dictId () {
      return this.dictCode.dictId
    },
    districtName(){
      if(this.dictId){
        let d = this.$store.getters.dictKey('usermanage.org.district', this.dictId);
        return d && d.text;
      }
    }
  }
}
