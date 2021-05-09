import { FETCH_INCOMES, CREATE_INCOME, UPDATE_INCOME, DELETE_INCOME } from '../constants/actionTypes';
//Reducer is a function that accepts the state and the action
//Based on action type, it will do something.

export default (incomes = [() => {}], action) => {
    switch (action.type) {
        case FETCH_INCOMES:
            return  action.payload;
        case CREATE_INCOME:
            return [ ...incomes, action.payload];
        case UPDATE_INCOME:
            return incomes.map((income) => income._id === action.payload._id ? action.payload : income);
        case DELETE_INCOME:
            return incomes.filter((income) => income._id !== action.payload);
        default:
            return incomes;
    }
}