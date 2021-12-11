<template>
  <ReoprtTable :orgid="orgid" namespace="xiaocezi2"/>
</template>
<script>
import ReoprtTable from './components/ReoprtTable'

export default {
  props: ["loadData"],
  components: {
    ReoprtTable
  },
  data() {
    return {
      orgid: undefined,
    };
  },
  created() {
    if (this.loadData && this.loadData.node && this.loadData.node.data) {
      this.orgid = this.loadData.node.data._id;
    }
  },
  watch: {
    loadData: function(data) {
      if (this.loadData && this.loadData.node && this.loadData.node.data) {
        this.orgid = this.loadData.node.data._id;
      }
    }
  },
};
</script>