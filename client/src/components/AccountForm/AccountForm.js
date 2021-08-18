import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Select, MenuItem, RadioGroup, FormControl, FormLabel, Radio, FormControlLabel, InputLabel, InputAdornment, OutlinedInput } from '@material-ui/core';
import useStyles from './styles';
import moment from 'moment';

import { useDispatch, useSelector  } from 'react-redux';
import { createAccount, updateAccount } from '../../actions/accounts';

const AccountForm = ({ currentId, setCurrentId }) => {
    const accountNames = useSelector((state) => state.accountNames)
    const [name, setName] = React.useState('');
    // const user = JSON.parse(localStorage.getItem('profile'));

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
        // var local = new Date(this);
        // local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        // return local.toJSON().slice(0,10);
    });
    const [accountData, setAccountData] = useState({
        date: moment(Date.now()).format("yyyy-MM-DD"), name: '', balance: '', debtOrAsset: '', allocation: ''
    });
    const account = useSelector((state) => currentId ? state.accounts.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if(account) setAccountData(account);
    }, [account])

    const findAccountNameId = (e) => {
        console.log(e.target.value);
        const accountName = accountNames.find(accountName => accountName.name === e.target.value);
        console.log(accountName._id);
        setAccountData({ ...accountData, name: accountName._id });
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateAccount(currentId, accountData));
        } else {
            console.log(accountData);
            dispatch(createAccount(accountData));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setAccountData({ date: moment(Date.now()).format("yyyy-MM-DD"), name: '', balance: '', debtOrAsset: '', allocation: '' });
        setName(null);
    }

    return (
        <Container className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? 'Editing' : 'Enter' } an Account</Typography>
                <TextField size="small"  name="date" variant="outlined" type="date" fullWidth value={accountData.date}
                //This ... spreads the data, only changing the property you specify and leaving the others as is
                //Sets the state using an object
                onChange={(e) => setAccountData({ ...accountData, date: e.target.value })}
                />
                {/* <FormControl> */}
                {/* <InputLabel>Budget Category</InputLabel> */}
                <FormControl className={classes.margin} size="small" fullWidth variant="outlined">
                    <InputLabel className={classes.inputMargin} id="categoryLabel">Name</InputLabel>
                    <Select className={classes.inputMargin} size="small" name="name" variant="outlined" fullWidth value={name} onChange={findAccountNameId}>
                        {accountNamesToRender}
                    </Select>
                    </FormControl>
                {/* </FormControl> */}
                <FormControl className={classes.margin} fullWidth variant="outlined">
                    <InputLabel className={classes.inputMargin} >Balance</InputLabel>
                    <OutlinedInput className={classes.inputMargin} size="small" name="balance" variant="outlined" type="number" label="Balance" fullWidth value={accountData.balance}  
                    startAdornment={<InputAdornment position="start">$</InputAdornment>} onChange={(e) => setAccountData({ ...accountData, balance: e.target.value })} />
                </FormControl>
                <FormControl className={classes.margin} component="fieldset">
                    <FormLabel className={classes.inputMargin} component="legend">Debt or Asset?</FormLabel>
                    <RadioGroup className={classes.inputMargin} aria-label="debtOrAsset" name="debtOrAsset" value={accountData.debtOrAsset} onChange={(e) => setAccountData({ ...accountData, debtOrAsset: e.target.value })}>
                        <FormControlLabel fullwidth value="1" control={<Radio />} label="Asset" />
                        <FormControlLabel fullwidth value="0" control={<Radio />} label="Debt" />
                    </RadioGroup>
                </FormControl>
                <FormControl className={classes.margin} size="small" fullWidth variant="outlined">
                    <InputLabel className={classes.inputMargin} >Allocation</InputLabel>
                    <OutlinedInput className={classes.inputMargin} size="small" name="allocation" variant="outlined" type="number" min="0" max="100" label="Allocation" fullWidth value={accountData.allocation}  
                    endAdornment={<InputAdornment position="end">%</InputAdornment>} onChange={(e) => setAccountData({ ...accountData, allocation: e.target.value })} />
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

export default AccountForm;