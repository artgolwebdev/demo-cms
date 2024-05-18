import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('token'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        response => {
          commit('loginSuccess', response);
          return Promise.resolve(response);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    loginSuccess(state) {
      state.status.loggedIn = true;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
    },
    logout(state) {
      state.status.loggedIn = false;
    },
    registerSuccess(state) {
      state.status.loggedIn = true;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  },
  getters: {
    isLoggedIn(state) {
      return state.status.loggedIn;
    },
  },
};