import * as api from '../api';
import { AUTH } from '../constants/actionTypes';


export const signin = (formData, history) => async (dispatch) => {
    try {
        // log in the user
        const { data } = await api.signin(formData);
        await dispatch({ type: AUTH, data });
        
        //redirect to home page
        history.push('/');
    } catch (error) {
        if (error.message.includes('400')) 
            return "Password is not correct."
        else if (error.message.includes('404')) 
            return "A user with that email was not found."
        else return error
        
    }   
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // signup the user
        const { data } = await api.signup(formData);

        dispatch({ type: AUTH, data });

        //redirect to home page
        history.push('/');
        
    } catch (error) {
        if (error.message.includes('400')) 
            return "Passwords do not match."
        else if (error.message.includes('404')) 
            return "A user with that email already exists."
        else return error
    }   
}