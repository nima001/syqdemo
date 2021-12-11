import { Table } from 'ant-design-vue'
import { get } from 'lodash'

export default {
  data () {
    return {}
  },
  props: {
    data: {
      type: Function,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  created () {
    this.loadData()
  },
  components: {
    ATable: Table
  },
  methods: {
    loadData () {
      let res = this.data()
      res.then(res=>{
      })
    }
  },
  render () {
    const on = {
      ...this.$listeners
    }
    const props = {
      ...this.$attrs,
      ...this.$props,
      ...{ dataSource: this.body, columns: this.columns }
    }
    const table = (
      <a-table  props={props} scopedSlots={this.$scopedSlots} on={on} />
    )
    return <div class='dc-table'>{table}</div>
  }
}
