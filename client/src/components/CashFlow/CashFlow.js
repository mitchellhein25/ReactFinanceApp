import React, { useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';
import moment from 'moment';
import { getExpenses } from '../../actions/expenses';
import { getIncomes } from '../../actions/incomes';
import { formatter } from '../../functions/Formatter';
import { totalExpenses } from '../../functions/TotalExpenses';
import { totalIncome } from '../../functions/TotalIncome';

const CashFlow = ({ date }) => {

    const expenses = useSelector((state) => state.expenses)
    const incomes = useSelector((state) => state.incomes)
    const momentDate = moment(date);
    const classes = useStyles();
    const dispatch = useDispatch();

    var totalExpensesThisMonth = totalExpenses(expenses, date);

    var totalIncomesThisMonth = totalIncome(incomes, date);

    var totalCashFlowThisMonth = totalIncomesThisMonth - totalExpensesThisMonth;

    useEffect(() => {
        dispatch(getExpenses())
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