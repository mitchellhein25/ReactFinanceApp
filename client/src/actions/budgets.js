import * as api from '../api';
import { FETCH_BUDGETS, CREATE_BUDGET, UPDATE_BUDGET, DELETE_BUDGET, FETCH_GROUPED_EXPENSES } from '../constants/actionTypes';

// Action Creators (functions that return actions)
export const getBudgets = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBudgets();
        dispatch({ type: FETCH_BUDGETS, payload: data });
    } catch (error) {
        console.log(error);
    }   
}

export const createBudget = (budget) => async (dispatch) => {
    try {
        const { data } = await api.createBudget(budget);
        dispatch({ type: CREATE_BUDGET, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const updateBudget = (id, budget) => async (dispatch) => {
    try {
        const { data } = await api.updateBudget(id, budget);
        dispatch({ type: UPDATE_BUDGET, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteBudget = (id) => async (dispatch) => {
    try {
        await api.deleteBudget(id);
        dispatch({ type: DELETE_BUDGET, payload: id });
    } catch (error) {
        console.log(error);
    }
}

//Get the expenses grouped on category
export const getGroupedExpenses = () => async (dispatch) => {
    try {
        const { data } = await api.fetchGroupedExpenses();
        dispatch({ type: FETCH_GROUPED_EXPENSES, payload: data });
    } catch (error) {
        console.log(error);
    }   
}