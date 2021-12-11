export const mixins = {
  inject: ['treeNode'],
  computed: {
    nodeData () {
      return this.treeNode && this.treeNode.data
    }
  },
  watch: {
    nodeData: {
      handler (v) {
        this.getData(v)
      },
      deep: true
    }
  }
}
