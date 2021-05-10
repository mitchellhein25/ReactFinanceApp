import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead ,TableRow, Paper, Button, Hidden, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteBudget } from '../../actions/budgets';

const BudgetTable = ({ setCurrentId, date }) => {
    const budgets = useSelector((state) => state.budgets);
    const expenses = useSelector((state) => state.expenses)
    // const groupedExpenses = useSelector((state) => state.groupedExpenses);
    const classes = useStyles();
    const dispatch = useDispatch();
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

    const currExpenses = expenses.filter(expense => moment(expense.date).month() === momentDate.month());

    const getExpenseAmount = (budgetName) => {
        var total = 0;
        currExpenses.forEach(expense => {
            console.log("budgetFindName(expense): ", budgetFindName(expense));
            console.log("budgetName: ", budgetName);
            if (budgetFindName(expense) == budgetName) {
                total += expense.amount;
            }
        });

        return total;
    }

    const getOverUnder = (budgetAmount, expenseAmount) => {
        return budgetAmount - expenseAmount;

    }
    return (
        <TableContainer>
            <Typography className={classes.tableHeader} variant="h4" component="div">
                Budgets
            </Typography>
      <Table padding='none' aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
            <Hidden only={['xs', 'sm', 'md', 'lg', 'xl']}>
                <TableCell className={classes.tableColumn} >Id</TableCell>
            </Hidden>
            <TableCell className={classes.tableColumn} >Name</TableCell>
            <TableCell className={classes.tableColumn} >Amount</TableCell>
            <TableCell className={classes.tableColumn} >Amount Spent</TableCell>
            <TableCell className={classes.tableColumn} >Remaining Budget</TableCell>
            <TableCell className={classes.tableColumn} ></TableCell>
            <TableCell className={classes.tableColumn} ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {budgets.map((budget) => (
                <TableRow key={budget._id}>
                    <Hidden only={['xs', 'sm', 'md', 'lg', 'xl']}>
                        <TableCell className={classes.tableColumn} component="th" scope="row" hidden>{budget._id}</TableCell>
                    </Hidden>
                    <TableCell  className={classes.tableColumn} component="th" scope="row">{budget.name}</TableCell>
                    <TableCell className={classes.tableColumn} >{budget.amount}</TableCell>
                    <TableCell className={classes.tableColumn} >{getExpenseAmount(budget.name)}</TableCell>
                    <TableCell color='white !important' className={getOverUnder(budget.amount, getExpenseAmount(budget.name)) > 0 ? classes.green : classes.red} >{getOverUnder(budget.amount, getExpenseAmount(budget.name))}</TableCell>
                    <TableCell className={classes.tableColumn} >
                        <Button size="small" color="primary" onClick={() => dispatch(deleteBudget(budget._id))}>
                            <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                    </TableCell>
                    <TableCell className={classes.tableColumn} >
                        <Button size="small" color="primary" onClick={() => setCurrentId(budget._id)}>
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

export default BudgetTable;