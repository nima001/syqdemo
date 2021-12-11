<template>
  <div style="width:100%;text-align: center;padding: 40px" >
    <!-- <img src="@/assets/img/head-default-70x98.png" width="100px"/> -->
  </div>
</template>
<script>

export default {
  title: '头像',
  icon: 'edit',
  props: {
    name: {
      type: String
    },
    code: {
      type: String
    }
  },
}
</script>