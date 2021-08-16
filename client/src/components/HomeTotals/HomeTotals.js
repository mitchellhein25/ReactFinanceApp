import React from 'react';
import { Divider, Typography, Container } from '@material-ui/core';

import { useSelector } from 'react-redux';
import useStyles from './styles';
import moment from 'moment';


const HomeTotals = ({ date, setDate }) => {
    const expenses = useSelector((state) => state.expenses)
    const incomes = useSelector((state) => state.incomes)
    const momentDate = moment(date);
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    // Currency formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    var totalExpensesThisMonth = 0;
        expenses.forEach((expense, index) => {
        if (moment(expense.date).month() === momentDate.month()) {
            totalExpensesThisMonth += expense.amount; 
        }
    });

    var totalIncomesThisMonth = 0;
        incomes.forEach((income, index) => {
        if (moment(income.date).month() === momentDate.month()) {
            totalIncomesThisMonth += income.amount; 
        }
    });

    var totalCashFlowThisMonth = totalIncomesThisMonth - totalExpensesThisMonth;
    if(!user?.result?._id && !user?.result?.googleId) {
        return (
            <Container>
                <Typography variant="h6" align="center">
                    Sign in to view your Cash Flow.
                </Typography>
            </Container>
        )
    } 
    return (
        <div>
            <Typography align="center" variant="h4">
            Totals in {momentDate.format("MMMM")}
            </Typography>
            <Typography className={classes.totals} variant="h6">
                Total Income: <span className={classes.green}>{ formatter.format(totalIncomesThisMonth) } </span>
            </Typography>
            <Typography className={classes.totals} variant="h6">
                Total Expenses: <span className={classes.red}>{ formatter.format(totalExpensesThisMonth) } </span>
            </Typography>
            <Divider className={classes.divider} variant="middle" />
            <Typography className={classes.totals} variant="h6">
                Cash Flow: <span className={totalCashFlowThisMonth > 0 ? classes.green : classes.red}>{ formatter.format(totalCashFlowThisMonth) } </span>
            </Typography>
        </div>
    
    );

}

export default HomeTotals;