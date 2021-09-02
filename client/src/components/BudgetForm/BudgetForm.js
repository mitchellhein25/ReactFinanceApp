import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { TextField, Button, Typography, Container, FormControl, InputLabel, OutlinedInput, InputAdornment, useMediaQuery, Tooltip } from '@material-ui/core';
import useStyles from './styles';
import { createBudget, updateBudget } from '../../actions/budgets';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const BudgetForm = ({ currentId, setCurrentId }) => {
    const [budgetData, setBudgetData] = useState({
        name: '', amount: null
    });
    const [errors, setErrors] = useState({});
    const budget = useSelector((state) => currentId ? state.budgets.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const budgetToolTip = (
        <React.Fragment>
            <Typography className={classes.tooltip} >Edit Your Budgets using the <b>Budgets</b> tab.</Typography>
        </React.Fragment>
   )

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        setBudgetData({ ...budgetData, [name]: value });
        formIsValid();   
    }

    const formIsValid = () => {
        const isValid =
            budgetData.name &&
            /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(budgetData.amount) &&
            budgetData.amount &&
            Object.values(errors).every((x) => x === "");
    
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formIsValid()) {
            if(currentId) {
                dispatch(updateBudget(currentId, { ...budgetData, user: user?.result?._id ? user?.result?._id : user?.result?.googleId }));
            } else {
                dispatch(createBudget({ ...budgetData, user: user?.result?._id ? user?.result?._id : user?.result?.googleId}));
            }
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setBudgetData({ name: '', amount: '' });
    }
    
    useEffect(() => {
        if(budget) setBudgetData(budget);
    }, [budget])

    return (
        <Container className={classes.paper} style={isMobile ? {paddingLeft: '.5rem'} : {paddingLeft: '2rem'}}>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                
                <Typography variant="h6">{ currentId ? 'Editing' : 'Enter' } a Budget</Typography>
                <Tooltip title={budgetToolTip} placement="top">
                    <InfoOutlinedIcon style={{fontSize:"20px", margin: '6px'}} />
                </Tooltip>
                <TextField 
                    key={1}
                    size="small" 
                    name="name" 
                    variant="outlined" 
                    label="Name" 
                    type="name" 
                    fullWidth 
                    value={budgetData.name}
                    onChange={handleInputValue}
                    onBlur={handleInputValue} 
                />
                <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel  className={classes.inputMargin} >Amount</InputLabel>
                    <OutlinedInput 
                        key={2}
                        className={classes.inputMargin} 
                        size="small" 
                        name="amount" 
                        variant="outlined" 
                        type="number" 
                        label="Amount" 
                        fullWidth 
                        error={errors["amount"]}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>} 
                        value={budgetData.amount}  
                        onChange={handleInputValue} 
                        onBlur={handleInputValue} 
                    />
                </FormControl>
                <div className={classes.buttonRow} >
                    <div className={classes.formElement}>
                        <Button variant="contained" color="primary" size="large" type="submit" fullWidth disabled={!formIsValid()}>Submit</Button> 
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