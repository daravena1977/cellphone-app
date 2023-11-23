import AuthService from '@/services/auth-service'


// export const myAction = async ({ commit }) => {


// }

export const login = ({ commit }, user) => {
        
    return AuthService.login(user)
        .then(
            user => {
                commit('loginSuccess', user)
                return Promise.resolve(user)
            },
            error => {
                commit('loginFailure')
                return Promise.reject(error)
            }
        )
}

export const logout = ({ commit }) => {
    AuthService.logout()
    commit('logout')
}

export const register = ({ commit }, newUser) => {


    return AuthService.register(newUser)
        .then(
            response => {
                commit('registerSuccess');
                return Promise.resolve(response.data);
              },
              error => {
                commit('registerFailure');
                return Promise.reject(error);
              }
        )


}

