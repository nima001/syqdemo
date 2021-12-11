<template>
  <div class="wrapper">
    <component 
      :is="currentName" 
      @toggle-way="toggle"
      @toggle-step="toggleStep" 
      :userInfo="userInfo">
    </component>
  </div>
</template>

<script>
import BackWay from '@/idm/views/resetpassword/stepTwo/BackWay';
import EmailIdcard from '@/idm/views/resetpassword/stepTwo/EmailIdcard';
import PhoneIdcard from '@/idm/views/resetpassword/stepTwo/PhoneIdcard';

export default {
  props: {
    userInfo: {
      type: Object
    }
  },
  components: { BackWay, EmailIdcard, PhoneIdcard },
  data() {
    return {
      currentName: 'BackWay'
    };
  },
  watch: {},
  computed: {

  },
  created() {
  },
  mounted() {},
  methods: {
    toggle(name) {
      this.currentName = name;
    },
    toggleStep(status) {
      if (status == 'ok') {
        this.$emit('toggle-step', 'next');
      } else {
        this.$emit('toggle-step', 'prev');
      }
    }
  },
};
</script>
<style lang="less" scoped>
p{
  margin-bottom: 0;
}
.wrapper{
  width: 100%;
}
</style>