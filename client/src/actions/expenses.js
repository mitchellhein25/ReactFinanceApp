import * as api from '../api';
import { FETCH_EXPENSES, CREATE_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../constants/actionTypes';

// Action Creators (functions that return actions)
export const getExpenses = () => async (dispatch) => {
    try {
        const { data } = await api.fetchExpenses();
        dispatch({ type: FETCH_EXPENSES, payload: data });
    } catch (error) {
        console.log(error);
    }   
}

export const createExpense = (expense) => async (dispatch) => {
    try {
        const { data } = await api.createExpense(expense);
        dispatch({ type: CREATE_EXPENSE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateExpense = (id, expense) => async (dispatch) => {
    try {
        const { data } = await api.updateExpense(id, expense);
        dispatch({ type: UPDATE_EXPENSE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteExpense = (id) => async (dispatch) => {
    try {
        await api.deleteExpense(id);
        dispatch({ type: DELETE_EXPENSE, payload: id });
    } catch (error) {
        console.log(error);
    }
}