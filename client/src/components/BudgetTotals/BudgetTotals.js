import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import moment from 'moment';
import { useSelector } from 'react-redux';

const BudgetTotals = ({ date }) => {
    const budgets = useSelector((state) => state.budgets);
    const expenses = useSelector((state) => state.expenses);
    const momentDate = moment(date);

    // Currency formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const budgetFindName = (expense) => {
        if (expense.category && expense) {
            const budget = budgets.find(budget => budget._id === expense.category)
            if (budget) {
                return budget.name;
            }
        }
        return ""
    }

    const currExpenses = expenses.filter(expense => moment(expense.date).month() === momentDate.month());

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