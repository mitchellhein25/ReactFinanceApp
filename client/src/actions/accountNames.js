import * as api from '../api';
import { FETCH_ACCOUNTNAMES, CREATE_ACCOUNTNAME, UPDATE_ACCOUNTNAME, DELETE_ACCOUNTNAME } from '../constants/actionTypes';

// Action Creators (functions that return actions)
export const getAccountNames = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAccountNames();
        dispatch({ type: FETCH_ACCOUNTNAMES, payload: data });
    } catch (error) {
        console.log(error);
    }   
}

export const createAccountName = (accountName) => async (dispatch) => {
    try {
        const { data } = await api.createAccountName(accountName);
        dispatch({ type: CREATE_ACCOUNTNAME, payload: data });
    } catch (error) {
        if (error.toString().includes("409"))
            alert("There is already an account with that name.");
        console.log(error);
    }
}

export const updateAccountName = (id, accountName) => async (dispatch) => {
    try {
        const { data } = await api.updateAccountName(id, accountName);
        dispatch({ type: UPDATE_ACCOUNTNAME, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteAccountName = (id) => async (dispatch) => {
    try {
        await api.deleteAccountName(id);
        dispatch({ type: DELETE_ACCOUNTNAME, payload: id });
    } catch (error) {
        console.log("ACTION ERROR", error);
    }
}