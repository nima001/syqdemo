const Plugin = {
  vm: {},
  install (Vue, options) {
    // TODO 后期完善
    // Vue.directive('permit', {
    //   inserted: function (el, binding, vnode) {
    //     let uri = binding.value
    //     if (!this.$store.getters.hasPermit(uri)) {
    //       el.style.display = 'none'
    //     }
    //   }
    // }),
    Vue.mixin({
      methods: {
        hasPermit: function (uri) {
          return this.$store.getters.hasPermit(uri)
        }
      }
    })
  }
}

export default Plugin
