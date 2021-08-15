import * as api from '../api';
import { FETCH_ACCOUNTS, CREATE_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from '../constants/actionTypes';

// Action Creators (functions that return actions)
export const getAccounts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAccounts();
        dispatch({ type: FETCH_ACCOUNTS, payload: data });
    } catch (error) {
        console.log(error);
    }   
}

export const createAccount = (account) => async (dispatch) => {
    try {
        const { data } = await api.createAccount(account);
        console.log(data);
        dispatch({ type: CREATE_ACCOUNT, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateAccount = (id, account) => async (dispatch) => {
    try {
        const { data } = await api.updateAccount(id, account);
        dispatch({ type: UPDATE_ACCOUNT, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteAccount = (id) => async (dispatch) => {
    try {
        await api.deleteAccount(id);
        dispatch({ type: DELETE_ACCOUNT, payload: id });
    } catch (error) {
        console.log(error);
    }
}