import * as api from '../api';
import { FETCH_BUDGETS, CREATE_BUDGET, UPDATE_BUDGET, DELETE_BUDGET } from '../constants/actionTypes';

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
