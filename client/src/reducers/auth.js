import { AUTH, LOGOUT } from '../constants/actionTypes';
//Reducer is a function that accepts the state and the action
//Based on action type, it will do something.

const auth = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        default:
            return state;
    }
}

export default auth;
