import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Select, MenuItem, InputLabel, FormControl, FormLabel, Radio, FormControlLabel } from '@material-ui/core';
import useStyles from './styles';

import { useDispatch, useSelector  } from 'react-redux';
import { createAccount, updateAccount } from '../../actions/accounts';

const AccountForm = ({ currentId, setCurrentId }) => {
    const accountNames = useSelector((state) => state.accountNames)

    let accountNamesToRender;
    if (accountNames) {
        accountNamesToRender = accountNames.map(accountName => {
            return <MenuItem value={accountName.name}>{accountName.name}</MenuItem>
        });
    }

    const [expenseData, setExpenseData] = useState({
        date: '', name: '', balance: '', debtOrAsset: ''
    });
    const account = useSelector((state) => currentId ? state.accounts.find((x) => x._id === currentId) : null);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if(account) setAccountData(account);
    }, [account])

    const findAccountId = (e) => {
        const accountName = accountNames.find(accountName => accountName.name === e.target.value);
        setAccountData({ ...accountData, category: accountName._id });
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
        setAccountData({ date: '', name: '', balance: '', debtOrAsset: '' });
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
                <Select size="small" name="name" variant="outlined" fullWidth value={accountData.name} onChange={findAccountNameId}>
                    {accountNamesToRender}
                </Select>
                {/* </FormControl> */}
                <TextField size="small" name="balance" variant="outlined" type="number" label="Amount" fullWidth value={accountData.amount}  onChange={(e) => setAccountData({ ...accountData, balance: e.target.value })} />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Debt or Asset?</FormLabel>
                    <RadioGroup aria-label="debtOrAsset" name="debtOrAsset" value={accountData.debtOrAsset} onChange={(e) => setAccountData({ ...accountData, debtOrAsset: e.target.value })}>
                        <FormControlLabel value="asset" control={<Radio />} label="Asset" />
                        <FormControlLabel value="debt" control={<Radio />} label="Debt" />
                    </RadioGroup>
                </FormControl>
                <div>
                    <Button className={classes.formElement} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 
                    <Button className={classes.formElement} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
                </div>
            </form>
        </Container>
    );
}

export default AccountForm;