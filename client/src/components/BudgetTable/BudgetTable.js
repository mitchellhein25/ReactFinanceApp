import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead ,TableRow, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteBudget } from '../../actions/budgets';

const BudgetTable = ({ setCurrentId, date }) => {
    const budgets = useSelector((state) => state.budgets);
    const expenses = useSelector((state) => state.expenses);
    // const groupedExpenses = useSelector((state) => state.groupedExpenses);
    const classes = useStyles();
    const dispatch = useDispatch();
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

    const getOverUnder = (budgetAmount, expenseAmount) => {
        return budgetAmount - expenseAmount;

    }

    const getBudgetColor = (budget) => {
        var difference = getOverUnder(budget.amount, getExpenseAmount(budget.name));

        if (difference === 0) {
            return classes.gold;
        } else if (difference > 0) {
            return classes.green;
        } else {
            return classes.red;
        }
        
    }

    // const totalBudgets = () => {
    //     var totalBudget = 0;
    //     var totalExpense = 0;
    //     budgets.forEach(budget => {
    //         totalBudget += budget.amount;
    //         totalExpense += getExpenseAmount(budget.name);
    //     });
    //     return [totalBudget, totalExpense];
    // }

    return (
        <TableContainer className={classes.tableContainerFull}>
            <Typography className={classes.tableHeader} variant="h4" component="div">
                Budgets
            </Typography>
      <Table padding='none' aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
            <div hidden>
                <TableCell className={classes.tableColumn} hidden>Id</TableCell>
            </div>
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
                    <div hidden>
                        <TableCell className={classes.tableColumn} component="th" scope="row" hidden>{budget._id}</TableCell>
                    </div>
                    <TableCell  className={classes.tableColumn} component="th" scope="row">{budget.name}</TableCell>
                    <TableCell className={classes.tableColumn} >{formatter.format(budget.amount)}</TableCell>
                    <TableCell className={classes.tableColumn} >{formatter.format(getExpenseAmount(budget.name))}</TableCell>
                    <TableCell  className={getBudgetColor(budget)} >
                        <b>{formatter.format(getOverUnder(budget.amount, getExpenseAmount(budget.name)))}</b>
                    </TableCell>
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