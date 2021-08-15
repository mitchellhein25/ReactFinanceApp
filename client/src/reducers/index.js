import { combineReducers } from 'redux';

import expenses from './expenses';
import incomes from './incomes';
import budgets from './budgets';
import incomeCats from './incomeCats';
import accounts from './accounts';
import accountNames from './accountNames';
import auth from './auth';

export default combineReducers({expenses, incomes, budgets, incomeCats, accounts, accountNames, auth})