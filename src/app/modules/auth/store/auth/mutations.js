
// export const myAction = ( state ) => {

// }

export const loginSuccess = ( state, user ) => {

    state.initialState.status.loggedIn = true
    state.user = user

}

export const loginFailure = ( state ) => {

    state.initialState.status.loggedIn = false
    state.user = null

}

export const logout = ( state ) => {

    state.initialState.status.loggedIn = false
    state.user = null

}

export const registerSuccess = ( state ) => {

    state.initialState.status.loggedIn = false

}

export const registerFailure = ( state ) => {

    state.initialState.status.loggedIn = false

}