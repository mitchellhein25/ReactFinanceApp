import * as api from '../api';
import { FETCH_INCOMES, CREATE_INCOME, UPDATE_INCOME, DELETE_INCOME } from '../constants/actionTypes';

// Action Creators (functions that return actions)
export const getIncomes = () => async (dispatch) => {
    try {
        const { data } = await api.fetchIncomes();
        dispatch({ type: FETCH_INCOMES, payload: data });
    } catch (error) {
        console.log(error);
    }   
}

export const createIncome = (income) => async (dispatch) => {
    try {
        const { data } = await api.createIncome(income);
        dispatch({ type: CREATE_INCOME, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateIncome = (id, income) => async (dispatch) => {
    try {
        const { data } = await api.updateIncome(id, income);
        dispatch({ type: UPDATE_INCOME, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteIncome = (id) => async (dispatch) => {
    try {
        await api.deleteIncome(id);
        dispatch({ type: DELETE_INCOME, payload: id });
    } catch (error) {
        console.log(error);
    }
}