import * as api from '../api';
import { UPDATE_NAME, UPDATE_EMAIL, UPDATE_PASSWORD } from '../constants/actionTypes';

export const updateName = (user) => async (dispatch) => {
    try {
        const { data } = await api.updateName(user.result._id, user);
        dispatch({ type: UPDATE_NAME, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateEmail = (user) => async (dispatch) => {
    try {
        const { data } = await api.updateEmail(user.result._id, user);
        dispatch({ type: UPDATE_EMAIL, payload: data });
    } catch (error) {
        if (error.message.includes('400')) 
            return "Password is not correct."
        else if (error.message.includes('404')) 
            return "A user with that email was not found."
        else return error
    }
}

// export const updateName = (user) => async (dispatch) => {
//     try {
//         const { data } = await api.updateName(user.result._id, user);
//         dispatch({ type: UPDATE_NAME, payload: data });
//     } catch (error) {
//         console.log(error);
//     }
// }