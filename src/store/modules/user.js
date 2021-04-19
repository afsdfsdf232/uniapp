const state = {
  token: 'sdijd_dhhh___AAHJC',
  userInfo: {
    name: 'huangpan',
    age: 18,
    token: ''
  }
}

const mutations = {
  SET_TOKEN (state, token) {
    if (token) state.token = token
  },
  SET_USERINFO (state, userInfo) {
    state.userInfo = userInfo
  }

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
