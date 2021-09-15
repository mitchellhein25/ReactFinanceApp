import { UPDATE_NAME } from '../constants/actionTypes';
//Reducer is a function that accepts the state and the action
//Based on action type, it will do something.

const user = (state = { authData: null }, action) => {
    switch (action.type) {
        case UPDATE_NAME:
        case UPDATE_EMAIL:
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        default:
            return user;
    }
}

export default user;