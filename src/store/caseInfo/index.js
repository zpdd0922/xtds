const state = {
  isPop: true
}

const mutations = {
  changePop(state) {
    state.isPop = !state.isPop
  }
}

export default {
  state,
  mutations
}