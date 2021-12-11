const Plugin = {
  vm: {},
  install (Vue, options) {
    Vue.directive('appPermit', {
      inserted: function (el, binding, vnode) {
        let uri = binding.value
        if (!this.$store.getters.appHasPermit(uri)) {
          el.style.display = 'none'
        }
      }
    }),
    Vue.mixin({
      methods: {
        appHasPermit: function (uri, type = 0) {
          return this.$store.getters.appHasPermit(uri, type)
        }
      }
    })
  }
}

export default Plugin
