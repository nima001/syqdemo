<template>
  <svg class="icon" aria-hidden="true">
    <use xlink:href="#orgaaa" />
  </svg>
</template>
<script>
const req = require.context('../map', false, /\.svg$/);
req.keys().map(req);

export default {
  
}
</script>

<style>

</style>