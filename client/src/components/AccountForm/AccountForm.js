import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { TextField, Button, Typography, Container, Select, MenuItem, RadioGroup, FormControl, FormLabel, Radio, FormControlLabel, InputLabel, InputAdornment, OutlinedInput } from '@material-ui/core';
import useStyles from './styles';
import moment from 'moment';
import { createAccount, updateAccount } from '../../actions/accounts';

const AccountForm = ({ currentId, setCurrentId }) => {
    const accountNames = useSelector((state) => state.accountNames)
    const [name, setName] = useState('');
    const [accountData, setAccountData] = useState({
        date: moment(Date.now()).format("yyyy-MM-DD"), name: '', balance: '', debtOrAsset: ''
    });
    const account = useSelector((state) => currentId ? state.accounts.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();

    let accountNamesToRender;
    if (accountNames) {
        accountNamesToRender = accountNames.map(accountName => {
            return <MenuItem value={accountName.name}>{accountName.name}</MenuItem>
        });
    }
    // eslint-disable-next-line no-extend-native
    Date.prototype.toDateFormat = (function(format) {
        format = format || "mm/yyyy";
        return format.toLowerCase();
    });

    const handleInputValue = (e) => {
        const { name, value } = e.target;
        console.log([name], value)
        if ([name] == 'name')
            findAccountNameId(e)
        else if([name] == 'debtOrAsset')
            setAccountData({ ...accountData, debtOrAsset: parseInt(value) });
        else {
            setAccountData({ ...accountData, [name]: value });
        }
        formIsValid();  
    }

    const formIsValid = () => {
        const isValid =
            accountData.date &&
            accountData.name &&
            /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/.test(accountData.balance) &&
            accountData.balance &&
            (accountData.debtOrAsset === 0 || accountData.debtOrAsset === 1);
    
        return isValid;
    };

    useEffect(() => {
        if(account) {
            var accountName = accountNames.find(accountName => accountName._id === account.name);
            var accountDate = moment(account.date);
            accountDate.date(accountDate.date() + 1);
            var accountDateFormatted = accountDate.format("YYYY-MM-DD");
            setAccountData({ date: accountDateFormatted, name: accountName, balance: account.balance, debtOrAsset: account.debtOrAsset === true ? 1 : 0 });
            setName(accountName.name);
        };
    }, [account])

    const findAccountNameId = (e) => {
        const accountName = accountNames.find(accountName => accountName.name === e.target.value);
        setAccountData({ ...accountData, name: accountName._id });
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateAccount(currentId, accountData));
        } else {
            dispatch(createAccount(accountData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setAccountData({ date: moment(Date.now()).format("yyyy-MM-DD"), name: '', balance: '', debtOrAsset: ''});
        setName(null);
    }

    return (
        <Container className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Enter' } an Account</Typography>
                <TextField 
                    size="small"  
                    name="date" 
                    variant="outlined" 
                    type="date" 
                    fullWidth 
                    value={accountData.date}
                    onChange={handleInputValue}
                    onBlur={handleInputValue} 
                />
                <FormControl className={classes.margin} size="small" fullWidth variant="outlined">
                    <InputLabel className={classes.inputMargin} id="categoryLabel">Name</InputLabel>
                    <Select 
                        className={classes.inputMargin} 
                        size="small" 
                        name="name" 
                        variant="outlined" 
                        fullWidth 
                        value={name} 
                        onChange={handleInputValue}
                        onBlur={handleInputValue} 
                    >
                        {accountNamesToRender}
                    </Select>
                    </FormControl>
                <FormControl className={classes.margin} fullWidth variant="outlined">
                    <InputLabel className={classes.inputMargin} >Balance</InputLabel>
                    <OutlinedInput 
                        className={classes.inputMargin} 
                        size="small" 
                        name="balance" 
                        variant="outlined" 
                        type="number" 
                        label="Balance" 
                        fullWidth 
                        value={accountData.balance}  
                        startAdornment={<InputAdornment position="start">$</InputAdornment>} 
                        onChange={handleInputValue}
                        onBlur={handleInputValue} 
                    />
                </FormControl>
                <FormControl className={classes.margin, classes.inputMargin} component="fieldset">
                    <FormLabel className={classes.inputMargin} component="legend">Debt or Asset?</FormLabel>
                    <RadioGroup 
                        className={classes.inputMargin} 
                        aria-label="debtOrAsset" 
                        name="debtOrAsset" 
                        value={accountData.debtOrAsset} 
                        onChange={handleInputValue}
                        onBlur={handleInputValue}
                    >
                        <FormControlLabel fullwidth checked={accountData.debtOrAsset === 1 ? true : false}
                        value="1" control={<Radio />} label="Asset" />
                        <FormControlLabel fullwidth checked={accountData.debtOrAsset === 0 ? true : false}
                        value="0" control={<Radio />} label="Debt" />
                    </RadioGroup>
                </FormControl>
                <FormControl className={classes.margin} size="small" fullWidth variant="outlined">
                    <div className={classes.buttonRow} >
                        <div className={classes.formElement}>
                            <Button variant="contained" color="primary" size="large" type="submit" fullWidth disabled={!formIsValid()}>Submit</Button> 
                        </div>
                        <div className={classes.formElement}>
                            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
                        </div>
                    </div>
                </FormControl>
            </form>
        </Container>
    );
}

export default AccountForm;