import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { TextField, Button, Typography, Container, Select, MenuItem, InputLabel, FormControl, InputAdornment, OutlinedInput } from '@material-ui/core';
import useStyles from './styles';
import moment from 'moment';
import { createExpense, updateExpense } from '../../actions/expenses';

const ExpenseForm = ({ currentId, setCurrentId }) => {
    const budgets = useSelector((state) => state.budgets)
    const [category, setCategory] = useState('');
    const [expenseData, setExpenseData] = useState({
        date: moment(Date.now()).format("yyyy-MM-DD"), category: '', amount: '', description: ""
    });
    //Get the current selected expense if currentId has a value
    const expense = useSelector((state) => currentId ? state.expenses.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    let budgetsToRender;
    if (budgets) {
        budgetsToRender = budgets.map(budget => {
            return <MenuItem value={budget.name}>{budget.name}</MenuItem>
        });
    }
    
    // eslint-disable-next-line no-extend-native
    Date.prototype.toDateFormat = (function(format) {
        format = format || "mm/yyyy";
        return format.toLowerCase()
    });

    useEffect(() => {
        if(expense) {
            var budget = budgets.find(budget => budget._id === expense.category);
            var expenseDate = moment(expense.date).format("YYYY-MM-DD");
            setExpenseData({ date: expenseDate, category: budget, amount: expense.amount, description: expense.description });
            setCategory(budget.name);
        }
    }, [expense, budgets])

    const findBudgetId = (e) => {
        const budget = budgets.find(budget => budget.name === e.target.value);
        setExpenseData({ ...expenseData, category: budget._id });
        setCategory(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId) {
            dispatch(updateExpense(currentId, { ...expenseData, user: user?.result?._id ? user?.result?._id : user?.result?.googleId }));
        } else {
            dispatch(createExpense({ ...expenseData, user: user?.result?._id ? user?.result?._id : user?.result?.googleId}));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setExpenseData({ date: moment(Date.now()).format("yyyy-MM-DD"), category: '', amount: '', description: "" });
        setCategory(null);
    }

    return (
        <Container className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Enter' } an Expense</Typography>
                <TextField size="small"  name="date" variant="outlined" type="date" fullWidth value={expenseData.date}
                onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
                />
                <FormControl className={classes.margin} size="small" fullWidth variant="outlined">
                        <InputLabel className={classes.inputMargin} id="categoryLabel">Category</InputLabel>
                        <Select className={classes.inputMargin} MenuProps={{disableScrollLock: true}}size="small" name="category" 
                            variant="outlined" fullWidth value={category} onChange={findBudgetId}>
                            {budgetsToRender}
                        </Select>
                </FormControl>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel className={classes.inputMargin}>Amount</InputLabel>
                    <OutlinedInput className={classes.inputMargin} size="small" name="amount" 
                    variant="outlined" type="number" label="Amount" startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    fullWidth value={expenseData.amount}  onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })} />
                </FormControl>  
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel className={classes.inputMargin} >Description</InputLabel>
                    <OutlinedInput className={classes.inputMargin} size="small" name="description" 
                    variant="outlined" type="text" label="Description"
                    fullWidth value={expenseData.description}  onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })} />
                </FormControl>   
                <div className={classes.buttonRow} >
                    <div className={classes.formElement} >
                        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 
                    </div>
                    <div className={classes.formElement} >
                        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
                    </div>
                </div>
            </form>
        </Container>
    );
}

export default ExpenseForm;