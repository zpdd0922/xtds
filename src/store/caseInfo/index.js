const state = {
  isPop: false
}

const getters = {
  isPop: state => state.isPop
}

const mutations = {
  changePop(state) {
    state.isPop = !state.isPop
  }
}

export default {
  state,
  getters,
  mutations
}