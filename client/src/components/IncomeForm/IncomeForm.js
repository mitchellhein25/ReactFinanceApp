import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { TextField, Button, Typography, Container, Select, MenuItem, InputLabel, FormControl, OutlinedInput, InputAdornment, useMediaQuery } from '@material-ui/core';
import useStyles from './styles';
import moment from 'moment';
import { createIncome, updateIncome } from '../../actions/incomes';

const IncomeForm = ({ currentId, setCurrentId }) => {
    const incomeCats = useSelector((state) => state.incomeCats)
    const [category, setCategory] = React.useState('');
    const [incomeData, setIncomeData] = useState({
        date: moment(Date.now()).format("yyyy-MM-DD"), category: '', amount: '', description: ''
    });
    const [errors, setErrors] = useState({});
    const income = useSelector((state) => currentId ? state.incomes.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
    const validate = () => {
        let temp = { ...errors }
    
        if ("date" in incomeData)
          temp.date = incomeData.date ? "" : "Income date is required."
    
        if ("category" in incomeData)
            temp.category = incomeData.category ? "" : "Income category is required."

        if ("amount" in incomeData)
            temp.amount = /^\d*(\.\d{1,2})?$/.test(incomeData.amount)
            ? ""
            : "Amount is not valid."

        formIsValid();  
        setErrors({
          ...temp
        });
      }

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        if ([name] == 'category')
            findIncomeCatId(e)
        else {
            setIncomeData({ ...incomeData, [name]: value });
        }
        validate();  
    }

    const formIsValid = () => {
        const isValid =
            incomeData.date &&
            incomeData.amount &&
            incomeData.category &&
            Object.values(errors).every((x) => x === "");
    
        return isValid;
    };

    useEffect(() => {
        if(income) {
            var incomeCat = incomeCats.find(incomeCat => incomeCat._id === income.category);
            var incomeDate = moment(income.date);
            incomeDate.date(incomeDate.date() + 1);
            var incomeDateFormatted = incomeDate.format("YYYY-MM-DD");
            setIncomeData({ date: incomeDateFormatted, category: incomeCat, amount: income.amount, description: income.description });
            setCategory(incomeCat.name);
        } 
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
        <Container className={classes.paper} style={isMobile ? {paddingLeft: '.5rem'} : {paddingLeft: '2rem'}}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Enter' } an Income</Typography>
                <TextField 
                    size="small" 
                    name="date" 
                    variant="outlined" 
                    type="date" 
                    fullWidth 
                    value={incomeData.date}
                    onChange={(e) => setIncomeData({ ...incomeData, date: e.target.value })}
                />
                <FormControl size="small" fullWidth variant="outlined">
                    <InputLabel className={classes.inputMargin} id="categoryLabel">Category</InputLabel>
                    <Select 
                        className={classes.inputMargin} 
                        labelId="categoryLabel" 
                        size="small" 
                        name="category" 
                        variant="outlined" 
                        fullWidth 
                        value={category} 
                        onChange={findIncomeCatId}
                    >
                        {incomeCatsToRender}
                    </Select>
                </FormControl>
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel className={classes.inputMargin} >Amount</InputLabel>
                    <OutlinedInput 
                        className={classes.inputMargin} 
                        size="small" 
                        name="amount" 
                        variant="outlined" 
                        type="number" 
                        label="Amount" 
                        fullWidth 
                        startAdornment={<InputAdornment position="start">$</InputAdornment>} 
                        value={incomeData.amount}  
                        onChange={(e) => setIncomeData({ ...incomeData, amount: e.target.value })} />
                </FormControl> 
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel className={classes.inputMargin} >Description</InputLabel>
                    <OutlinedInput 
                        className={classes.inputMargin} 
                        size="small" 
                        name="amount" 
                        variant="outlined" 
                        type="text" 
                        label="Description" 
                        fullWidth 
                        value={incomeData.description}  
                        onChange={(e) => setIncomeData({ ...incomeData, description: e.target.value })} />
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

export default IncomeForm;