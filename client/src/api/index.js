import axios from 'axios';

var baseUrl = process.env.NODE_ENV === 'production' ? 'https://incontrolfinance.herokuapp.com/' : 'http://localhost:5000';

const API = axios.create({ baseURL: baseUrl });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }

    return req;
});

//Home Api calls
export const fetchExpenses = () => API.get(`/expenses`);
export const createExpense = (newExpense) => API.post(`/expense`, newExpense);
export const updateExpense = (id, updatedExpense) => API.patch(`/expense${id}`, updatedExpense);
export const deleteExpense = (id) => API.delete(`/expense${id}`);
export const fetchIncomes = () => API.get(`/incomes`);
export const createIncome = (newIncome) => API.post(`/income`, newIncome);
export const updateIncome = (id, updatedIncome) => API.patch(`/income${id}`, updatedIncome);
export const deleteIncome = (id) => API.delete(`/income${id}`);
export const fetchBudgets = () => API.get(`/budgets`);
export const createBudget = (newBudget) => API.post(`/budget`, newBudget);
export const updateBudget = (id, updatedBudget) => API.patch(`/budget${id}`, updatedBudget);
export const deleteBudget = (id) => API.delete(`/budget${id}`);
export const fetchIncomeCats = () => API.get(`/incomecats`);
export const createIncomeCat = (newIncomeCat) => API.post(`/incomecat`, newIncomeCat);
export const updateIncomeCat = (id, updatedIncomeCat) => API.patch(`/dincomecat${id}`, updatedIncomeCat);
export const deleteIncomeCat = (id) => API.delete(`/dincomecat${id}`);

//Accounts page Api calls
export const fetchAccounts = () => API.get(`/accounts/accounts`);
export const createAccount = (newAccount) => API.post(`/accounts/account`, newAccount);
export const updateAccount = (id, updatedAccount) => API.patch(`/accounts/account${id}`, updatedAccount);
export const deleteAccount = (id) => API.delete(`/accounts/account${id}`);
export const fetchAccountNames = () => API.get(`/accounts/accountnames`);
export const createAccountName = (newAccountName) => API.post(`/accounts/accountname`, newAccountName);
export const updateAccountName = (id, updatedAccountName) => API.patch(`/accounts/daccountname${id}`, updatedAccountName);
export const deleteAccountName = (id) => API.delete(`/accounts/daccountname${id}`);

//Auth page Api calls
export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);

//User Account page Api calls
export const updateName = (id, user) => API.patch(`/userAccount/updateName${id}`, user);
export const updateEmail = (id, user) => API.patch(`/userAccount/updateEmail${id}`, user);
export const updatePassword = (id, updatedPassword) => API.patch(`/userAccount/updatePassword${id}`, updatedPassword);