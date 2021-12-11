
/**
 * formData ： 表单数据
 */
const workflow = {
	state: {
		formData: {},
		processData: {
			processId: null,
			formatConfigVos: [],
			rkformatConfigVos: [],
			strategy: null,
		}
	},
	mutations: {
		SET_FORM_DATA: (state, payload) => {
			state.formData = payload.data;
		},
		SetProcessId: (state, payload) => {
			state.processData.processId = payload;
		},
		SetFormatConfigVos: (state, payload) => {
			state.processData.formatConfigVos = payload;
		},
		SetrkFormatConfigVos: (state, payload) => {
			state.processData.rkformatConfigVos = payload;
		},
		SetStrategy: (state, payload) => {
			state.processData.strategy = payload;
		},
	}
}

export default workflow;