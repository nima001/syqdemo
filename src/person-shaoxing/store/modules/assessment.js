const assessment = {
  state: {
    //  新增时的评估数据
    assessData: {

    },
    //  新增时每一项的参数
    reportArgs: {},
    configIds: [],
    content: '',
  },
  mutations: {
    setConfigIds: (state, configIds) => {
      state.configIds = configIds;
    },
    setContent: (state, content) => {
      state.content = content;
    },
    setAssessData: (state, payload) => {
      state.assessData = payload;
    },
    setReportArgs: (state, payload) => {
      state.reportArgs = payload;
    },
  }
}

export default assessment