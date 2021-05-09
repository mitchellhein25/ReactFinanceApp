import { FETCH_GROUPED_EXPENSES } from '../constants/actionTypes';

export default (groupedExpenses = [() => {}], action) => {
    switch (action.type) {
        case FETCH_GROUPED_EXPENSES:
            return  action.payload;
        default:
            return groupedExpenses;
    }
}