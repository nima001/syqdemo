<template>
  <p class="fixed">{{property.content}}</p>
</template>
<script>
export default {
  name: "InputText",
  props: {
    property: {
      type: Object,
      required: true
    },
    bindform: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      formData: this.$store.getters.formData,
      code: this.property["code"]
    };
  },
  created() {
    this.formData[this.code] = this.property.content;
    this.$store.commit({
      type: "SET_FORM_DATA",
      data: this.formData
    });
  }
};
</script>
<style lang="less" scoped>
.fixed{
  margin-top:35px;
}
</style>

