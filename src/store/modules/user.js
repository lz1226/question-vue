import {LOGIN, LOGOUT, REFRESH_TOKEN} from "../mutation-types";

const state = {
    token: '',
    user: {},
    sessionId:''
};

const getters = {
    getToken: (state) => {
        return state.token
    },
    isLogin: (state) => {
        return !!state.token
    },
    getUser: (state) => {
        return state.user;
    },
    getSession:(state) =>{
      return state.sessionId;
    }
};

const actions = {
    login({commit}, {token, userId, userName,sessionId}) {
        commit(LOGIN, {token, userId, userName,sessionId})
    },
    logout({commit}) {
        commit(LOGOUT)
    },
    // refreshToken({commit}, token) {
    //     commit(REFRESH_TOKEN, token)
    // },
    refreshToken({commit}, sessionId) {
      commit(REFRESH_TOKEN,sessionId)
    },
};

const mutations = {
    [LOGIN](state, {token, userId, userName,sessionId}) {
        state.token = token;
        state.user.userId = userId;
        state.user.userName = userName;
        state.sessionId = sessionId;
    },
    [LOGOUT](state) {
        state.token = '';
        state.user = {};
        state.sessionId = '';
    },
    [REFRESH_TOKEN](state, token,sessionId) {
        state.token = token;
        state.sessionId = sessionId;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}
