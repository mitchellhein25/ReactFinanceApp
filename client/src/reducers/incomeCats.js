import { FETCH_INCOMECATS, CREATE_INCOMECAT, UPDATE_INCOMECAT, DELETE_INCOMECAT } from '../constants/actionTypes';
//Reducer is a function that accepts the state and the action
//Based on action type, it will do something.

export default (incomeCats = [() => {}], action) => {
    switch (action.type) {
        case FETCH_INCOMECATS:
            // console.log(action.payload);
            return  action.payload;
        case CREATE_INCOMECAT:
            return [ ...incomeCats, action.payload];
        case UPDATE_INCOMECAT:
            return incomeCats.map((incomeCat) => incomeCat._id === action.payload._id ? action.payload : incomeCat);
        case DELETE_INCOMECAT:
            return incomeCats.filter((incomeCat) => incomeCat._id !== action.payload);
        default:
            return incomeCats;
    }
}