import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { TextField, Button, Typography, Container, Select, MenuItem, InputLabel, FormControl, OutlinedInput, InputAdornment } from '@material-ui/core';
import useStyles from './styles';
import moment from 'moment';
import { createIncome, updateIncome } from '../../actions/incomes';

const IncomeForm = ({ currentId, setCurrentId }) => {
    const incomeCats = useSelector((state) => state.incomeCats)
    const [category, setCategory] = React.useState('');
    const [incomeData, setIncomeData] = useState({
        date: moment(Date.now()).format("yyyy-MM-DD"), category: '', amount: '', description: ''
    });
    const income = useSelector((state) => currentId ? state.incomes.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    let incomeCatsToRender;
    if (incomeCats) {
        incomeCatsToRender = incomeCats.map(incomeCat => {
            return <MenuItem value={incomeCat.name}>{incomeCat.name}</MenuItem>
        });
    }
    Date.prototype.toDateFormat = (function(format) {
        format = format || "mm/yyyy";
        return format.toLowerCase()
    });

    useEffect(() => {
        if(income) setIncomeData(income);
    }, [income])

    const findIncomeCatId = (e) => {
        const incomeCat = incomeCats.find(incomeCat => incomeCat.name === e.target.value);
        setIncomeData({ ...incomeData, category: incomeCat._id });
        setCategory(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentId) {
            dispatch(updateIncome(currentId, { ...incomeData, user: user?.result?._id ? user?.result?._id : user?.result?.googleId }));
        } else {
            dispatch(createIncome({ ...incomeData, user: user?.result?._id ? user?.result?._id : user?.result?.googleId }));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setIncomeData({ date: moment(Date.now()).format("yyyy-MM-DD"), category: '', amount: '', description: '' });
        setCategory(null);
    }

    return (
        <Container className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Enter' } an Income</Typography>
                <TextField size="small" name="date" variant="outlined" type="date" fullWidth value={incomeData.date}
                onChange={(e) => setIncomeData({ ...incomeData, date: e.target.value })}
                />
                <FormControl size="small" fullWidth variant="outlined">
                    <InputLabel className={classes.inputMargin} id="categoryLabel">Category</InputLabel>
                    <Select className={classes.inputMargin} labelId="categoryLabel" size="small" name="category" 
                    variant="outlined" fullWidth value={category} onChange={findIncomeCatId}>
                        {incomeCatsToRender}
                    </Select>
                </FormControl>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel className={classes.inputMargin} >Amount</InputLabel>
                    <OutlinedInput className={classes.inputMargin} size="small" name="amount" 
                    variant="outlined" type="number" label="Amount" fullWidth 
                    startAdornment={<InputAdornment position="start">$</InputAdornment>} value={incomeData.amount}  onChange={(e) => setIncomeData({ ...incomeData, amount: e.target.value })} />
                </FormControl> 
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel className={classes.inputMargin} >Description</InputLabel>
                    <OutlinedInput className={classes.inputMargin} size="small" name="amount" 
                    variant="outlined" type="text" label="Description" fullWidth 
                    value={incomeData.description}  onChange={(e) => setIncomeData({ ...incomeData, description: e.target.value })} />
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

export default IncomeForm;