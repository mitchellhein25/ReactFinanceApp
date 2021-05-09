import * as api from '../api';
import { FETCH_INCOMECATS, CREATE_INCOMECAT, UPDATE_INCOMECAT, DELETE_INCOMECAT } from '../constants/actionTypes';

// Action Creators (functions that return actions)
export const getIncomeCats = () => async (dispatch) => {
    try {
        const { data } = await api.fetchIncomeCats();
        // console.log(data);
        dispatch({ type: FETCH_INCOMECATS, payload: data });
    } catch (error) {
        console.log(error);
    }   
}

export const createIncomeCat = (incomeCat) => async (dispatch) => {
    try {
        const { data } = await api.createIncomeCat(incomeCat);
        dispatch({ type: CREATE_INCOMECAT, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateIncomeCat = (id, incomeCat) => async (dispatch) => {
    try {
        const { data } = await api.updateIncomeCat(id, incomeCat);
        dispatch({ type: UPDATE_INCOMECAT, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteIncomeCat = (id) => async (dispatch) => {
    try {
        await api.deleteIncomeCat(id);
        dispatch({ type: DELETE_INCOMECAT, payload: id });
    } catch (error) {
        console.log(error);
    }
}