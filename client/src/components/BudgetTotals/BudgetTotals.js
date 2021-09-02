import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Grid } from '@material-ui/core';
import moment from 'moment';
import { formatter } from '../../functions/Formatter';

const BudgetTotals = ({ date }) => {
    const budgets = useSelector((state) => state.budgets);
    const expenses = useSelector((state) => state.expenses);
    const momentDate = moment(date);

    const budgetFindName = (expense) => {
        if (expense.category && expense) {
            const budget = budgets.find(budget => budget._id === expense.category)
            if (budget) {
                return budget.name;
            }
        }
        return ""
    }

    const getOneDayAddedDate = (expense) => {
        var expenseDate = moment(expense.date);
        expenseDate.date(expenseDate.date() + 1);
        return expenseDate;
    }

    const currExpenses = expenses.filter(expense => getOneDayAddedDate(expense).month() === momentDate.month());

    const getExpenseAmount = (budgetName) => {
        var total = 0;
        currExpenses.forEach(expense => {
            if (budgetFindName(expense) === budgetName) {
                total += expense.amount;
            }
        });

        return total;
    }

    const totalBudgets = () => {
        var totalBudget = 0;
        var totalExpense = 0;
        budgets.forEach(budget => {
            totalBudget += budget.amount;
            totalExpense += getExpenseAmount(budget.name);
        });
        return [totalBudget, totalExpense];
    }

    return (
        <Grid>
            <Typography align="center" marginTop="30px" variant="h6">Total Expenses in May: <b>{formatter.format(totalBudgets()[1])}</b></Typography>
            <Typography align="center" variant="h6">Total Budget for May: <b>{formatter.format(totalBudgets()[0])}</b></Typography>
            <Typography align="center" variant="h3">{
                (totalBudgets()[0] - totalBudgets()[1]) > 0 ? formatter.format(totalBudgets()[0] - totalBudgets()[1]) + " under budget" : 
                formatter.format((totalBudgets()[0] - totalBudgets()[1]) * -1) + " over budget"
            }</Typography>
        </Grid>
    );
}

export default BudgetTotals;