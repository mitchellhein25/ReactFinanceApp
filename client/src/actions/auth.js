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
        console.log(error);
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
        console.log(error);
    }   
}