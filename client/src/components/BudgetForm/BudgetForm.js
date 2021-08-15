import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import useStyles from './styles';

import { useDispatch, useSelector  } from 'react-redux';
import { createBudget, updateBudget } from '../../actions/budgets';

const BudgetForm = ({ currentId, setCurrentId }) => {
    const [budgetData, setBudgetData] = useState({
        name: '', amount: ''
    });
    const budget = useSelector((state) => currentId ? state.budgets.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(budget) setBudgetData(budget);
    }, [budget])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateBudget(currentId, { ...budgetData, user: user?.result?._id ? user?.result?._id : user?.result?.googleId }));
        } else {
            dispatch(createBudget({ ...budgetData, user: user?.result?._id ? user?.result?._id : user?.result?.googleId}));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setBudgetData({ name: '', amount: '' });
    }

    return (
        <Container className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Enter' } a Budget</Typography>
                <TextField size="small" name="name" variant="outlined" label="Name" type="name" fullWidth value={budgetData.name}
                //This ... spreads the data, only changing the property you specify and leaving the others as is
                //Sets the state using an object
                onChange={(e) => setBudgetData({ ...budgetData, name: e.target.value })}
                />
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel  className={classes.inputMargin} >Amount</InputLabel>
                    <OutlinedInput className={classes.inputMargin} size="small" name="amount" variant="outlined" type="number" label="Amount" fullWidth 
                    startAdornment={<InputAdornment position="start">$</InputAdornment>} value={budgetData.amount}  onChange={(e) => setBudgetData({ ...budgetData, amount: e.target.value })} />
                </FormControl>
                <div className={classes.buttonRow} >
                    <div className={classes.formElement}>
                        <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 
                    </div>
                    <div className={classes.formElement}>
                        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
                    </div>
                </div>
            </form>
        </Container>
    );
}

export default BudgetForm;