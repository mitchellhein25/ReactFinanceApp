import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import useStyles from './styles';

import { useDispatch, useSelector  } from 'react-redux';
import { createExpense, updateExpense } from '../../actions/expenses';

const ExpenseForm = ({ currentId, setCurrentId }) => {
    const budgets = useSelector((state) => state.budgets)

    let budgetsToRender;
    if (budgets) {
        budgetsToRender = budgets.map(budget => {
            return <MenuItem value={budget.name}>{budget.name}</MenuItem>
        });
    }

    const [expenseData, setExpenseData] = useState({
        date: '', category: '', amount: ''
    });
    const expense = useSelector((state) => currentId ? state.expenses.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if(expense) setExpenseData(expense);
    }, [expense])

    const findBudgetId = (e) => {
        const budget = budgets.find(budget => budget.name === e.target.value);
        setExpenseData({ ...expenseData, category: budget._id });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateExpense(currentId, expenseData));
        } else {
            dispatch(createExpense(expenseData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setExpenseData({ date: '', category: '', amount: '' });
    }

    return (
        <Paper className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Enter' } an Expense</Typography>
                <TextField  name="date" variant="outlined" type="date" fullWidth value={expenseData.date}
                //This ... spreads the data, only changing the property you specify and leaving the others as is
                //Sets the state using an object
                onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
                />
                {/* <FormControl> */}
                {/* <InputLabel>Budget Category</InputLabel> */}
                <Select name="category" variant="outlined" fullWidth value={expenseData.category} onChange={findBudgetId}>
                    {budgetsToRender}
                </Select>
                {/* </FormControl> */}
                <TextField name="amount" variant="outlined" type="number" label="Amount" fullWidth value={expenseData.amount}  onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })} />
                <div>
                    <Button className={classes.formElement} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 
                    <Button className={classes.formElement} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
                </div>
            </form>
        </Paper>
    );
}

export default ExpenseForm;