import axios from "axios"

export const authStatus = (status, css, msg) => {
    return {
        type: 'AUTH_STATUS',
        payload: { status, css, msg }
    }
}

export const saveUser = (user) => {
    return {
        type: 'SAVE_USER',
        payload: user
    }
}

export const startSaveUser = (token) => {
    return (dispatch) => {
        axios.get(`/api/users/token/${token}`)
            .then(response => {
                dispatch(saveUser(response.data))
            })
    }
}

export const removeUser = () => {
    return {
        type: 'REMOVE_USER'
    }
}