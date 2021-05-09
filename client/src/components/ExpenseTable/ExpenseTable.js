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
    console.log("BUDGETS: ", budgets);

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
        <TableContainer component={Paper}>
    <Typography variant="h6" component="div">
          Expenses
    </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <Hidden only={['xs', 'sm', 'md', 'lg', 'xl']}>
                <TableCell className={classes.tableColumn}>Id</TableCell>
            </Hidden>
            <TableCell className={classes.tableColumn}>Category</TableCell>
            <TableCell className={classes.tableColumn}>Amount</TableCell>
            <TableCell className={classes.tableColumn}>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {expenses.filter(expense => moment(expense.date).month() === momentDate.month()).map((expense) => (
                
                <TableRow className={classes.tableRow} key={expense._id}>
                    <Hidden only={['xs', 'sm', 'md', 'lg', 'xl']}>
                        <TableCell className={classes.tableColumn} component="th" scope="row" hidden>{expense._id}</TableCell>
                    </Hidden>
                    <TableCell className={classes.tableColumn} >{budgetFindName(expense)}</TableCell>
                    <TableCell className={classes.tableColumn} >{expense.amount}</TableCell>
                    <TableCell className={classes.tableColumn} component="th" scope="row">{cleanDate(expense.date)}</TableCell>
                    <TableCell className={classes.tableColumn} >
                        <Button size="small" color="primary" onClick={() => dispatch(deleteExpense(expense._id))}>
                            <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                    </TableCell>
                    <TableCell className={classes.tableColumn} >
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