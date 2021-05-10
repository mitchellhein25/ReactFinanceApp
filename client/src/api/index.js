import axios from 'axios';

const url = 'http://localhost:5000';

//Home Api calls
export const fetchExpenses = () => axios.get(`${url}/expenses`);
export const createExpense = (newExpense) => axios.post(`${url}/expense`, newExpense);
export const updateExpense = (id, updatedExpense) => axios.patch(`${url}/expense${id}`, updatedExpense);
export const deleteExpense = (id) => axios.delete(`${url}/expense${id}`);
export const fetchIncomes = () => axios.get(`${url}/incomes`);
export const createIncome = (newIncome) => axios.post(`${url}/income`, newIncome);
export const updateIncome = (id, updatedIncome) => axios.patch(`${url}/income${id}`, updatedIncome);
export const deleteIncome = (id) => axios.delete(`${url}/income${id}`);
export const fetchBudgets = () => axios.get(`${url}/budgets`);
export const createBudget = (newBudget) => axios.post(`${url}/budget`, newBudget);
export const updateBudget = (id, updatedBudget) => axios.patch(`${url}/budget${id}`, updatedBudget);
export const deleteBudget = (id) => axios.delete(`${url}/budget${id}`);
export const fetchIncomeCats = () => axios.get(`${url}/incomecats`);
export const createIncomeCat = (newIncomeCat) => axios.post(`${url}/incomecat`, newIncomeCat);
export const updateIncomeCat = (id, updatedIncomeCat) => axios.patch(`${url}/incomecat${id}`, updatedIncomeCat);
export const deleteIncomeCat = (id) => axios.delete(`${url}/incomecat${id}`);

//Accounts page Api calls
export const fetchAccounts = () => axios.get(`${url}/accounts`);
export const createAccount = (newAccount) => axios.post(`${url}/account`, newAccount);
export const updateAccount = (id, updatedAccount) => axios.patch(`${url}/account${id}`, updatedAccount);
export const deleteAccount = (id) => axios.delete(`${url}/account${id}`);