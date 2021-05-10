import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead ,TableRow, Paper, Button, Hidden, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteExpense } from '../../actions/expenses';

const ExpenseTable = ({ setCurrentId, date }) => {
    const budgets = useSelector((state) => state.budgets)
    const expenses = useSelector((state) => state.expenses)
    const classes = useStyles();
    const dispatch = useDispatch();
    // console.log("BUDGETS: ", budgets);

    const cleanDate = (date) => {
        if (date) {
            return date.substring(0, 10);
        } else {
            return "";
        }
    }

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

    return (
        <TableContainer>
    <Typography className={classes.tableHeader} variant="h4" component="div">
          Expenses
    </Typography>
      <Table padding='none' aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow className={classes.tableRow}>
            <Hidden only={['xs', 'sm', 'md', 'lg', 'xl']}>
                <TableCell>Id</TableCell>
            </Hidden>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {expenses.filter(expense => moment(expense.date).month() === momentDate.month()).map((expense) => (
                
                <TableRow className={classes.tableRow} key={expense._id}>
                    <Hidden only={['xs', 'sm', 'md', 'lg', 'xl']}>
                        <TableCell component="th" scope="row" hidden>{expense._id}</TableCell>
                    </Hidden>
                    <TableCell >{budgetFindName(expense)}</TableCell>
                    <TableCell >{expense.amount}</TableCell>
                    <TableCell component="th" scope="row">{cleanDate(expense.date)}</TableCell>
                    <TableCell >
                        <Button size="small" color="primary" onClick={() => dispatch(deleteExpense(expense._id))}>
                            <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                    </TableCell>
                    <TableCell >
                        <Button size="small" color="primary" onClick={() => setCurrentId(expense._id)}>
                            <EditIcon fontSize="small" />
                            Edit
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}

export default ExpenseTable;