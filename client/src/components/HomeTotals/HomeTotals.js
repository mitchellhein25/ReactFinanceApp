import React from 'react';
import { Divider, Typography, Container } from '@material-ui/core';
import { useSelector } from 'react-redux';
import useStyles from './styles';
import moment from 'moment';
import { formatter } from '../../functions/Formatter';
import { totalExpenses } from '../../functions/TotalExpenses';
import { totalIncome } from '../../functions/TotalIncome';

const HomeTotals = ({ date }) => {
    const expenses = useSelector((state) => state.expenses)
    const incomes = useSelector((state) => state.incomes)
    const momentDate = moment(date);
    const classes = useStyles();

    var totalCashFlowThisMonth = totalIncome(incomes, date) - totalExpenses(expenses, date);

    return (
        <div>
            <Typography align="center" variant="h4">
            Totals in {momentDate.format("MMMM")}
            </Typography>
            <Typography className={classes.totals} variant="h6">
                Total Income: <span className={classes.green}>{ formatter.format(totalIncome(incomes, date)) } </span>
            </Typography>
            <Typography className={classes.totals} variant="h6">
                Total Expenses: <span className={classes.red}>{ formatter.format(totalExpenses(expenses, date)) } </span>
            </Typography>
            <Divider className={classes.divider} variant="middle" />
            <Typography className={classes.totals} variant="h6">
                Cash Flow: <span className={totalCashFlowThisMonth > 0 ? classes.green : classes.red}>
                    { formatter.format(totalCashFlowThisMonth) } </span>
            </Typography>
        </div>
    );
}

export default HomeTotals;