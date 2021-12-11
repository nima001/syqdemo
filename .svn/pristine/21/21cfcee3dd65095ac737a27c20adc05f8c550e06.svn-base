/**
 * 常量字典
 */
import store from '../../store'
import {loadDict} from '../../api/dict'

const loading = new Map();

const  dict = {
	state: {
		dict: {},
	},
	mutations: {
		addDict(state, dict){
			state.dict = {...state.dict, ...dict}
		},
	},
	actions: {
		loadDict(context, key){
			let loader = loading.get(key);
			if(!loader){
				loader = loadDict(key);
				loading.set(key, loader);
				loader.then(resp => {
					context.commit('addDict', {
						[key]: resp.result
					});
					return resp.result;
				}).finally(() => {
					loading.delete(key);
				})
			}
			return loader;
		},
	},
	getters: {
		dict: (state) => (key) => {
			let s = state.dict[key]
			if(s === undefined){
				store.dispatch("loadDict", key);
			}
			return s;
		},
		dictKey: (state, getters) => (key, value) => {
			let list = getters.dict(key);
			if(list){
				return list.find(item => item.value == value);
			}
		},
	}
}

export default dict