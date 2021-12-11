<template>
  <div class="data-table">
    <h2 v-if="mainTitle.visible!==false" :style="{ ...style }" v-html="mainTitle.value"/>
    <h3 v-if="subTitle.visible!==false" :style="{ margin: 0, ...subStyle }" v-html="subTitle.value"/>
    <a-table
      :columns="columns"
      :rowKey="(row)=>row.k0"
      :bordered="bordered"
      :dataSource="dataSource"
      :pagination="dataSource.length<20?false:true"
    />
  </div>
</template>
<script>
import { Table } from 'ant-design-vue'
import { cloneDeep, has, map, reduce, assign } from 'lodash';
import BaseMixin from "@person/components/chart/BaseMixin"

/**
 * 统计数据表
 */
export default {
  icon: 'table',
  compts: ['table', 'title', 'header', 'body'],
  components: {
    ATable: Table,
  },
  mixins: [BaseMixin],
  data() {
    return {
      valueCol: [],
    }
  },
  computed: {
    sumPosition() {
      if(this.settings.table) {
        return this.settings.table&&this.settings.table.sumPosition;
      }
    },
    bordered() {
      if(this.settings.table) {
        return this.settings.table&&this.settings.table.bordered;
      }
    },
    style() {
      let v = assign(this.fontColor, this.position, this.fontWeight, this.fontSize, this.fontFamily);
      return v;
    },
    subStyle() {
      let v = assign(this.subFontColor, this.position, this.subFontWeight, this.subFontSize, this.fontFamily);
      return v;
    },
    fontSize() {
      if(this.mainTitle) {
        let { fontSize } = this.mainTitle;
        if(fontSize) {
          return {fontSize: fontSize+'px'};
        }
      }
      return {}
    },
    fontWeight() {
      if(this.mainTitle) {
        let { fontWeight } = this.mainTitle;
        if(fontWeight) {
          return { fontWeight: 'bold' };
        }
      }
      return {}
    },
    fontColor() {
      if(this.mainTitle) {
        let { color } = this.mainTitle;
        if(color) {
          return {color: color};
        }
      }
      return {}
    },
    fontFamily() {
      if(this.settings.title&&this.settings.title.fontFamily) {
        let { fontFamily } = this.settings.title;
        return { fontFamily: fontFamily };
      }else{
        return {}
      }
    },
    subFontSize() {
      if(this.subTitle) {
        let { fontSize } = this.subTitle;
        if(fontSize) {
          return {fontSize: fontSize+'px'};
        }
      }
      return {}
    },
    subFontWeight() {
      if(this.subTitle) {
        let { fontWeight } = this.subTitle;
        if(fontWeight) {
          return { fontWeight: 'bold' };
        }
      }
      return {}
    },
    subFontColor() {
      if(this.subTitle) {
        let { color } = this.subTitle;
        if(color) {
          return {color: color};
        }
      }
      return {}
    },
    position() {
      if(this.settings.title&&this.settings.title.position) {
        let { position } = this.settings.title;
        return { textAlign: position };
      }else{
        return { textAlign: 'center' }
      }
    },
    mainTitle() {
      let { title, context = {}} = this.settings;
      if(this.settings.title&&this.settings.title.main) {
        let { main } = this.settings.title;
        if(!main) {
          return  {
            visible: true,
            value: undefined,
          }
        }
        if(!has(main,'visible')) {
          main.visible = true;
        }
        return main;
      }else if(title&&typeof title=='string'){
				for(let key in context){
					title = title.replace(new RegExp('\\$\\{' + key + '\\}', 'g'), context[key]);
				}
				return {
          visible: true,
          value: title,
        }
			}else{
        return {
          visible: true,
          value: undefined,
        }
      }
    },
    subTitle() {
      let { subtitle, context = {}} = this.settings;
      if(this.settings.title&&this.settings.title.sub) {
        let { sub } = this.settings.title;
        if(!sub) {
          return  {
            visible: true,
            value: undefined,
          }
        }
        if(!has(sub,'visible')) {
          sub.visible = true;
        }
        return sub;
      }else if(subtitle&&typeof title=='string'){
				for(let key in context){
					subtitle = subtitle.replace(new RegExp('\\$\\{' + key + '\\}', 'g'), context[key]);
				}
				return {
          visible: true,
          value: subtitle,
        }
			}else{
        return {
          visible: true,
          value: undefined,
        }
      }
    },
    headBackground() {
      if(this.settings&&this.settings.header) {
        return this.settings.header.background;
      }
    },
    bodyBackground() {
      if(this.settings&&this.settings.body) {
        return this.settings.body.background;
      }
    },
    headerColor() {
      if(this.settings&&this.settings.header) {
        return this.settings.header.color;
      }
    },
    bodyColor() {
      if(this.settings&&this.settings.body) {
        return this.settings.body.color;
      }
    },
    lineHeight() {
      if(this.settings) {
        return this.settings.table&&this.settings.table.lineHeight;
      }
    },
    columns(){
      if(!this.data){
        return [];
      }
      let that = this;
      function convert(cols){
        if(cols){
          return cols.map(item => ({
            title: item.showname, 
            align: 'center', 
            dataIndex: item.column,
            customCell: that.customCell,
            filters: [
              {
                text: '只显示有值行',
                value: 0
              }
            ],
            sorter: (a, b) => {
              if(a.k0!='合计'&&b.k0!='合计') {
               return a[item.column]-b[item.column];
              }
            },
            onFilter: (value, record) => {
              return record[item.column]!==0;
            },
            // onFilter: (value, record) => record.address.indexOf(value) === 0,
            customHeaderCell: that.customHeaderCell,
            children: convert(item.columns),
          }))
        }
      }
      let {keyCols = [], valueCols = []} = this.data;
      return [
         ... keyCols.map(item => ({
          title: item.showname, 
          dataIndex: item.column,
          customCell: this.customCell,
          customHeaderCell: this.customHeaderCell,
        })),
        ... convert(valueCols)
      ]
    },
    dataSource(){
      let dataSource = cloneDeep(this.data);
      this.valueCol = map(dataSource.valueCols, 'column');
      let sum = {};
      if(dataSource&&dataSource.rows) {
        //计算总数
        this.valueCol.forEach((item)=> {
          //处理空值
          map(dataSource.rows, (row)=>{
            if(!row[item]) {
              row[item] = 0;
            }
          });
          //计算
          let total = reduce(dataSource.rows, (sum, n)=>{
            return sum+n[item];
          },0);
          let rowTotal = {};
          rowTotal.k0 = '合计';
          rowTotal[item] = total;
          assign(sum, rowTotal)
        })
        if(this.sumPosition===1) {//顶部显示合计
          dataSource.rows.unshift(sum);
        }else if(this.sumPosition===0){//底部显示合计
          dataSource.rows.push(sum);
        }
        return dataSource && dataSource.rows;
      }
    }
  },
  methods: {
    customCell(record, index) {
      return {
        style: {
          'background-color': this.bodyBackground,
          'lineHeight': `${this.lineHeight}px`,
          'color': this.bodyColor,
        },
      }
    },
    customHeaderCell(record, index) {
      return {
        style: {
          'background-color': this.headBackground,
          'lineHeight': `${this.lineHeight}px`,
          'color': this.headerColor,
        },
      }
    },
  }
}
</script>
<style lang="less" scoped>
/deep/.ant-table-thead {
  tr:not(:last-child)>th {
    border-bottom: 1px solid #e8e8e8;
  }
  th {
    border-right: 1px solid #e8e8e8;
    &:last-child {
      // border-right: none;
    }
  }
}
</style>