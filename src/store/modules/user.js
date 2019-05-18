import {LOGIN, LOGOUT, REFRESH_TOKEN} from "../mutation-types";

const state = {
    token: '',
    user: {},
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
    }
};

const actions = {
    login({commit}, {token, userId, userName}) {
        commit(LOGIN, {token, userId, userName})
    },
    logout({commit}) {
        commit(LOGOUT)
    },
    refreshToken({commit}, token) {
        commit(REFRESH_TOKEN, token)
    },
};

const mutations = {
    [LOGIN](state, {token, userId, userName}) {
        state.token = token;
        state.user.userId = userId;
        state.user.userName = userName;
    },
    [LOGOUT](state) {
        state.token = '';
        state.user = {};
    },
    [REFRESH_TOKEN](state, token) {
        state.token = token;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}