import DataSet from '@antv/data-set';
import { groupBy, map, keys, reduce, cloneDeep, xorBy } from 'lodash';
import { foldValueCols } from './utils';

export default {
  	props: {
		data: {// 数据
			type: Object,
		},
		settings: {// 配置
			type: Object,
			default: () => ({})
		},
		allowDrag: {
			type: Boolean,
			default: false
		},
		allowMove: {
			type: Boolean,
			default: false
		}
	},
	inject: ['canvas'],
	data() {
		return {
			dvData: [],
		}
	},
	computed: {
		// title(){
		// 	let { title, context = {}} = this.settings;
		// 	if(title&&typeof title=='string'){
		// 		for(let key in context){
		// 			title = title.replace(new RegExp('\\$\\{' + key + '\\}', 'g'), context[key]);
		// 		}
		// 		return title;
		// 	}
		// 	return undefined;
		// },
		// subtitle() {
		// 	let { subtitle, context = {}} = this.settings;
		// 	if(subtitle&&typeof title=='string'){
		// 		for(let key in context){
		// 			subtitle = subtitle.replace(new RegExp('\\$\\{' + key + '\\}', 'g'), context[key]);
		// 		}
		// 		return subtitle;
		// 	}
		// 	return undefined;
		// },
		muitl(){
			if(this.data){
			  let { keyCols, valueCols, rows } = this.data;
			  return valueCols.length > 1 || keyCols.length > 1;
			}
		},
		range() {
			if(this.settings.sort&&this.settings.sort.range&&this.settings.sort.range.length) {
				return this.settings.sort.range;
			}
			return [];
		},
		sortType() {
			if(this.settings.sort) {
			  let { type } = this.settings.sort;
			  if(type=='ASC'||type=='DESC') {
				return type;
			  }
			}
			return undefined;
		},
		merge() {
			if(this.settings.sort&&this.settings.sort.mergeOther) {
				return this.settings.sort.mergeOther;
			}
			return false;
		}
	},
	methods: {
		// 排序
		sort(dv, keyCols, keysCol, values, attribute, cs) {
			if(this.sortType) {
				if(keyCols.length > 1|| cs.length > 1) {//多个维度
					let keysArray = keys(groupBy(dv.rows,keysCol[0]));
					keysArray.forEach((item)=>{
						let row = dv.rows.filter((row)=>row[keysCol[0]]==item);
						let sum = reduce(row,(sum,n)=>{
							return sum+Number(n[attribute]||0);
						},0);
						map(dv.rows,(row)=>{
							if(row[keysCol[0]]==item) {
								row.total = sum||0;
							}
						});
					});
					dv.transform({
						type: 'sort-by',
						fields: ['total'], // 根据指定的字段集进行排序，与lodash的sortBy行为一致
						order: this.sortType, // 默认为 ASC，DESC 则为逆序
					});
				}else{//单个维度
					dv.transform({
						type: 'sort-by',
						fields: [...values], // 根据指定的字段集进行排序，与lodash的sortBy行为一致
						order: this.sortType, // 默认为 ASC，DESC 则为逆序
					});
				}
				
			}
			return dv.rows;
		},
		//截取
		intercept(dv) {
			if(this.range.length) {
				let that = this;
				dv.transform({
					type: 'filter',
					callback(row,index) {
						return index>=that.range[0]&&index<=that.range[1]
					},
				});
				
			}
			return dv.rows;
		},
		//合并 
		remainder(dv, key, val) {
			if(this.merge) {
				let xors = xorBy(this.dvData, dv.rows, key);
				let sum = reduce(xors, (sum,n)=>{
					return sum+n[val];
				},0);
				let obj = {};
				obj[key] = '合并项';
				obj[val] = sum;
				return [...dv.rows, obj];
			}
			return dv.rows;
		},
		transform(table){
			let { keyCols, valueCols, rows } = table;
			let cs = foldValueCols(valueCols);
			let keysCol = map(keyCols, 'column');
			let values = map(valueCols, 'column');
			const dv = new DataSet.DataView().source(rows);
			if(cs.length > 1){//多个指标
				let fields = [], mapData = {};
				cs.forEach(item => {
					fields.push(item.column);
					mapData[item.column] = item.showname;
				})
				dv.transform({
					type: 'fold',
					fields,
					key: 'col',
					value: 'value',
				});
				dv.transform({
					type: 'map',
					callback: (row) => {
						row.col = mapData[row.col];
						return row;
					},
				});
				
				dv.rows = this.sort(dv, keyCols, keysCol, values, 'value', cs);
				this.dvData = cloneDeep(dv.rows);
				dv.rows = this.intercept(dv);
				dv.rows = this.remainder(dv, keysCol[0], 'value');

				rows = dv.rows;
				keyCols = [...keyCols, { column: 'col' }],
				valueCols = [{ column: 'value' }];
				return {
					keyCols, valueCols, rows
				}
			}

			dv.rows = this.sort(dv, keyCols, keysCol, values, values[0], cs);
			this.dvData = cloneDeep(dv.rows);
			dv.rows = this.intercept(dv);
			dv.rows = this.remainder(dv, keysCol[0], values[0]);
			
			return { keyCols, valueCols, rows: dv.rows };
		}
	},
}