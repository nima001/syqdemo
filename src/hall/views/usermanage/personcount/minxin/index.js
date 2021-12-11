export const mixins = {
    data() {
      return {
        chartColor:["#6395F9", "#72C9ED","#F4BE21","#7666F9","#60D9AB","#637697"],
        bjColor:["#6395f933","#72c9ed33","#f4be2133","#7666f933","#60d9ab33","#63769733"]
      }
    },
    methods: {
      countTotal (list) {
        let total = 0
        for (let i = 0; i < list.length; i++) {
          total += list[i]['count']
        }
        return total
      },
      dataFormate (list) {
        let _this = this
        return list.map(function (item) {
          return {
            item: item.name,
            count: item.count,
            percent: _this.total
              ? Math.floor((item.count / _this.total) * 100)
              : 0
          }
        })
      }
    }
  }
  