import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Select, MenuItem } from '@material-ui/core';
import useStyles from './styles';

import { useDispatch, useSelector  } from 'react-redux';
import { createIncome, updateIncome } from '../../actions/incomes';

const IncomeForm = ({ currentId, setCurrentId }) => {
    const incomeCats = useSelector((state) => state.incomeCats)

    let incomeCatsToRender;
    if (incomeCats) {
        incomeCatsToRender = incomeCats.map(incomeCat => {
            return <MenuItem value={incomeCat.name}>{incomeCat.name}</MenuItem>
        });
    }

    const [incomeData, setIncomeData] = useState({
        date: '', category: '', amount: ''
    });
    const income = useSelector((state) => currentId ? state.incomes.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if(income) setIncomeData(income);
    }, [income])

    const findIncomeCatId = (e) => {
        const incomeCat = incomeCats.find(incomeCat => incomeCat.name === e.target.value);
        setIncomeData({ ...incomeData, category: incomeCat._id });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateIncome(currentId, incomeData));
        } else {
            dispatch(createIncome(incomeData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setIncomeData({ date: '', category: '', amount: '' });
    }

    return (
        <Paper className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Enter' } an Income</Typography>
                <TextField  name="date" variant="outlined" type="date" fullWidth value={incomeData.date}
                //This ... spreads the data, only changing the property you specify and leaving the others as is
                //Sets the state using an object
                onChange={(e) => setIncomeData({ ...incomeData, date: e.target.value })}
                />
                <Select name="category" variant="outlined" fullWidth value={incomeData.category} onChange={findIncomeCatId}>
                    {incomeCatsToRender}
                </Select>
                <TextField name="amount" variant="outlined" type="number" label="Amount" fullWidth value={incomeData.amount}  onChange={(e) => setIncomeData({ ...incomeData, amount: e.target.value })} />
                <div>
                    <Button className={classes.formElement} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 
                    <Button className={classes.formElement} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
                </div>
            </form>
        </Paper>
    );
}

export default IncomeForm;