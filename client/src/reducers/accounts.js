import { FETCH_ACCOUNTS, CREATE_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from '../constants/actionTypes';
//Reducer is a function that accepts the state and the action
//Based on action type, it will do something.

const accounts = (accounts = [() => {}], action) => {
    switch (action.type) {
        case FETCH_ACCOUNTS:
            return  action.payload;
        case CREATE_ACCOUNT:
            return [ ...accounts, action.payload];
        case UPDATE_ACCOUNT:
            return accounts.map((account) => account._id === action.payload._id ? action.payload : account);
        case DELETE_ACCOUNT:
            return accounts.filter((account) => account._id !== action.payload);
        default:
            return accounts;
    }
}

export default accounts;