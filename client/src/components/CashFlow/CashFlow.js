import React, { useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import moment from 'moment';

import { getExpenses } from '../../actions/expenses';
import { getIncomes } from '../../actions/incomes';

const CashFlow = ({ date, setDate }) => {

    const expenses = useSelector((state) => state.expenses)
    const incomes = useSelector((state) => state.incomes)
    const momentDate = moment(date);
    const classes = useStyles();
    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(getExpenses())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getIncomes())
    }, [dispatch]);

    return (
        <Grid item xs={12}>
            <Typography className={classes.totals} variant="h2">
                Cash Flow for {momentDate.format("MMMM")}:<br /><b>{formatter.format(totalCashFlowThisMonth)}</b>
            </Typography>
        </Grid>
    
    );

}

export default CashFlow;