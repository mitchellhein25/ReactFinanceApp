import { combineReducers } from 'redux';

import expenses from './expenses';
import incomes from './incomes';
import budgets from './budgets';
import incomeCats from './incomeCats';
import groupedExpenses from './groupedExpenses';

export default combineReducers({expenses, incomes, budgets, incomeCats, groupedExpenses})