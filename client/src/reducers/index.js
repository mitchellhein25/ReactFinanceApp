import { combineReducers } from 'redux';

import expenses from './expenses';
import incomes from './incomes';
import budgets from './budgets';
import incomeCats from './incomeCats';
import accounts from './accounts';

export default combineReducers({expenses, incomes, budgets, incomeCats, accounts})