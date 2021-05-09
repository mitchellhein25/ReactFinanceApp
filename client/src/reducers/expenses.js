import { FETCH_EXPENSES, CREATE_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../constants/actionTypes';
//Reducer is a function that accepts the state and the action
//Based on action type, it will do something.

export default (expenses = [() => {}], action) => {
    switch (action.type) {
        case FETCH_EXPENSES:
            return  action.payload;
        case CREATE_EXPENSE:
            return [ ...expenses, action.payload];
        case UPDATE_EXPENSE:
            return expenses.map((expense) => expense._id === action.payload._id ? action.payload : expense);
        case DELETE_EXPENSE:
            return expenses.filter((expense) => expense._id !== action.payload);
        default:
            return expenses;
    }
}