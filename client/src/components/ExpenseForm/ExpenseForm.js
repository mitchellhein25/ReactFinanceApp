import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { TextField, Button, Typography, Container, Select, MenuItem, InputLabel, FormControl, InputAdornment, OutlinedInput, useMediaQuery } from '@material-ui/core';
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
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    let budgetsToRender;
    if (budgets.length > 0) {
        budgetsToRender = budgets.map(budget => {
            return <MenuItem value={budget.name}>{budget.name}</MenuItem>
        });
    } else {
        budgetsToRender = <MenuItem value="">Add Categories using the Budget form.</MenuItem>
    }
    
    // eslint-disable-next-line no-extend-native
    Date.prototype.toDateFormat = (function(format) {
        format = format || "mm/yyyy";
        return format.toLowerCase()
    });

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        if ([name] == 'category')
            findBudgetId(e)
        else {
            setExpenseData({ ...expenseData, [name]: value });
        }
        formIsValid();  
    }

    const formIsValid = () => {
        const isValid =
            expenseData.date &&
            /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(expenseData.amount) &&
            expenseData.amount &&
            expenseData.category;
    
        return isValid;
    };

    useEffect(() => {
        if(expense) {
            var budget = budgets.find(budget => budget._id === expense.category);
            var expenseDate = moment(expense.date);
            expenseDate.date(expenseDate.date() + 1);
            var expenseDateFormatted = expenseDate.format("YYYY-MM-DD");
            setExpenseData({ date: expenseDateFormatted, category: budget, amount: expense.amount, description: expense.description });
            setCategory(budget.name);
        }
    }, [expense, budgets])

    const findBudgetId = (e) => {
        const budget = budgets.find(budget => budget.name === e.target.value);
        setExpenseData({ ...expenseData, category: budget ? budget._id : "" });
        setCategory(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formIsValid()) {
            if(currentId) {
                dispatch(updateExpense(currentId, { ...expenseData, user: user?.result?._id ? user?.result?._id : user?.result?.googleId }));
            } else {
                dispatch(createExpense({ ...expenseData, user: user?.result?._id ? user?.result?._id : user?.result?.googleId}));
            }
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setExpenseData({ date: moment(Date.now()).format("yyyy-MM-DD"), category: '', amount: '', description: "" });
        setCategory(null);
    }

    return (
        <Container className={classes.paper} style={isMobile ? {paddingLeft: '.5rem'} : {paddingLeft: '2rem'}}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Enter' } an Expense</Typography>
                <TextField 
                    key={1}
                    size="small"  
                    name="date" 
                    variant="outlined" 
                    type="date" 
                    fullWidth 
                    value={expenseData.date}
                    onChange={handleInputValue}
                    onBlur={handleInputValue} 
                />
                <FormControl className={classes.margin} size="small" fullWidth variant="outlined">
                        <InputLabel className={classes.inputMargin} id="categoryLabel">Category</InputLabel>
                        <Select 
                            key={2}
                            className={classes.inputMargin} 
                            MenuProps={{disableScrollLock: true}}
                            size="small" 
                            name="category" 
                            variant="outlined" 
                            fullWidth 
                            value={category} 
                            onChange={handleInputValue}
                            onBlur={handleInputValue} 
                        >
                        {budgetsToRender}
                        </Select>
                </FormControl>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel className={classes.inputMargin}>Amount</InputLabel>
                    <OutlinedInput
                        key={3}
                        className={classes.inputMargin} 
                        size="small" 
                        name="amount" 
                        variant="outlined" 
                        type="number" 
                        label="Amount" 
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        fullWidth
                        value={expenseData.amount}  
                        onChange={handleInputValue}
                        onBlur={handleInputValue}  
                    />
                </FormControl>  
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <div className={classes.inputMargin} >
                        <TextField 
                            key={4}
                            className={classes.inputMargin} 
                            size="small" 
                            name="description" 
                            variant="outlined" 
                            type="text" 
                            label="Description (Optional)"
                            fullWidth 
                            value={expenseData.description}  
                            onChange={handleInputValue}
                            onBlur={handleInputValue} 
                        />
                    </div>
                </FormControl>   
                <div className={classes.buttonRow} >
                    <div className={classes.formElement} >
                        <Button variant="contained" color="primary" size="large" type="submit" fullWidth disabled={!formIsValid()}>Submit</Button> 
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