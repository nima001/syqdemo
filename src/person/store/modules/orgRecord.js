/**
 * 台账
 */
const orgRecord = {
	state: {
		step: [],
	},
	mutations: {
		updateRecordEditStep(state, step){
			state.step = [...step];
		},
	},
	getters: {
		recordEditStep: (state) => [...state.step],
	}
}

export default orgRecord