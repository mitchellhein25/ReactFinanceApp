import { FETCH_ACCOUNTNAMES, CREATE_ACCOUNTNAME, UPDATE_ACCOUNTNAME, DELETE_ACCOUNTNAME } from '../constants/actionTypes';
//Reducer is a function that accepts the state and the action
//Based on action type, it will do something.

export default (accountNames = [() => {}], action) => {
    switch (action.type) {
        case FETCH_ACCOUNTNAMES:
            return  action.payload;
        case CREATE_ACCOUNTNAME:
            return [ ...accountNames, action.payload];
        case UPDATE_ACCOUNTNAME:
            return accountNames.map((accountName) => accountName._id === action.payload._id ? action.payload : accountName);
        case DELETE_ACCOUNTNAME:
            return accountNames.filter((accountName) => accountName._id !== action.payload);
        default:
            return accountNames;
    }
}