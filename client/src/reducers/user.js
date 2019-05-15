const initialState = {}
const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'AUTH_STATUS': 
            return {...state, ...{formStatus: action.payload}}
        case 'SAVE_USER': 
            return {...state, ...{auth: action.payload}}
        case 'REMOVE_USER': 
            return {auth: 'false'}
        default: 
            return state
    }
}

export default userReducer