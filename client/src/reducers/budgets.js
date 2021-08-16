import { FETCH_BUDGETS, CREATE_BUDGET, UPDATE_BUDGET, DELETE_BUDGET } from '../constants/actionTypes';
//Reducer is a function that accepts the state and the action
//Based on action type, it will do something.

const budgets = (budgets = [() => {}], action) => {
    switch (action.type) {
        case FETCH_BUDGETS:
            return  action.payload;
        case CREATE_BUDGET:
            return [ ...budgets, action.payload];
        case UPDATE_BUDGET:
            return budgets.map((budget) => budget._id === action.payload._id ? action.payload : budget);
        case DELETE_BUDGET:
            return budgets.filter((budget) => budget._id !== action.payload);
        default:
            return budgets;
    }
}

export default budgets;