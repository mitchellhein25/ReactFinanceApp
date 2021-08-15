import React, { useState, useEffect } from 'react';
import { Typography, Grid, OutlinedInput, InputAdornment, Button, TextField } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { getAccounts } from '../../actions/accounts';
import { getAccountNames } from '../../actions/accountNames';
import { getExpenses } from '../../actions/expenses';
import { getIncomes } from '../../actions/incomes';

import useStyles from './styles';
import { updateAccount } from '../../actions/accounts';


const AllocationPercentBoxes = ({ date }) => {
    const [ totalAllocations, setTotalAllocations ] = useState(null);
    const [ id, setId ] = useState(null);
    Date.prototype.toDateInputValue = (function() {
        var local = new Date(this);
        local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    });
    const [accountData, setAccountData] = useState({
        date: new Date().toDateInputValue(), name: "", balance: "", debtOrAsset: null, allocation: ""
    });
    const expenses = useSelector((state) => state.expenses);
    const incomes = useSelector((state) => state.incomes);
    const accounts = useSelector((state) => state.accounts);
    const accountNames = useSelector((state) => state.accountNames);
    const dispatch = useDispatch();

    const momentDate = moment(date);
    const classes = useStyles();

    const accountNameFindName = (account) => {
        if (account.name && account) {
            const accountName = accountNames.find(accountName => accountName._id === account.name)
            if (accountName) {
                return accountName.name;
            }
        }
        return ""
    }

    let acctNames = [];
    let accts = [];
    
    var totalExpensesThisMonth = 0;
        expenses.forEach((expense, index) => {
        if (moment(expense.date).month() === momentDate.month()) {
            totalExpensesThisMonth += expense.amount; 
        }
    });

    var totalIncomesThisMonth = 0;
        incomes.forEach((income, index) => {
        if (moment(income.date).month() === momentDate.month()) {
            totalIncomesThisMonth += income.amount; 
        }
    });

    var totalCashFlowThisMonth = totalIncomesThisMonth - totalExpensesThisMonth;

    async function onLoad() {
        var totalAlloc = 0;
        await accounts.forEach((account, index) => {
            if (acctNames.includes(accountNameFindName(account))) {
                accts.forEach((acct, indexInner) => {
                    if (accountNameFindName(acct) == accountNameFindName(account)) {
                        if (account.date > acct.date) {
                            accts[indexInner] = account;
                            acctNames[indexInner] = accountNameFindName(account);
                        } 
                    }
                })
            } else {
                accts.push(account);
                acctNames.push(accountNameFindName(account));
            }
        });
        await accts.forEach((acct, index) => {
            totalAlloc += acct.allocation;
        });
        setTotalAllocations(totalAlloc);
    }
    onLoad();

    //sort accts by allocation, descending
    function sortByAllocation(a, b) {
        // Use toUpperCase() to ignore character casing
        const alloA = a.allocation;
        const alloB = b.allocation;
      
        let comparison = 0;
        if (alloA > alloB) {
          comparison = 1;
        } else if (alloA < alloB) {
          comparison = -1;
        }
        return comparison * -1;
      }
      
    accts.sort(sortByAllocation); 

    var splitAccts = [];
    async function splitAcctsUp() {
        //Split into groups of 6
        
        var splitIndex = -1;
        await accts.forEach((account, index) => {
            // console.log(index);
            if (index % 6 == 0) {
                splitIndex++;
                splitAccts.push([]);
            }
            splitAccts[splitIndex].push(account);
        });
    }
    splitAcctsUp();


    // Currency formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        dispatch(getAccounts())
        dispatch(getAccountNames())
        dispatch(getExpenses())
        dispatch(getIncomes())
    }, [dispatch]);

    const handleChange = (account, e) => {
        setId(account._id);
        setAccountData({user: account.user, date: account.date, name: account.name, balance: account.balance, debtOrAsset: account.debtOrAsset, allocation: parseFloat(e.target.value)});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id == null) {
            alert("Allocation must have a value.");
            
        } else {
            dispatch(updateAccount(id, accountData));
            clear(id);
        }
    }

    const clear = (id) => {
        setAccountData({ date: new Date().toDateInputValue(), name: "", balance: "", debtOrAsset: null, allocation: "" });
        var allo = document.getElementById("allocation" + id);
        allo.value = 0;
        setId(null);
    }

    return (
        <Grid xs={12}>
            
                {splitAccts.map((acct) => {
                    return (
                        <Grid container fullWidth>
                    
                        {acct.map((account) => {
                            return (
                                <Grid className={classes.paddingTop} xs={12} md={(6/acct.length)%6 != 0 ? 6/acct.length%6 + 1 : 2} item>
                            
                                <div className={classes.accountBox} >
                                    <Typography margin="auto" className={classes.accountTitle} textAlign="center" variant="h6">
                                        { accountNameFindName(account) }
                                    </Typography>
                                </div>
                                <form className={classes.marginTop} onSubmit={handleSubmit}>
                                    <Typography className={classes.red} textAlign="center" id={account.id} variant="h5">
                                        {formatter.format(account.allocation/100 * totalCashFlowThisMonth)}
                                    </Typography>
                                    <Typography variant="h6" className={classes.allo}>{account.allocation}%</Typography>
                                    <div className={classes.buttonMarginTop}>
                                        <TextField variant="outlined" style={{ fontSize: '24px' }} id={"allocation" + account._id} size="small" name="allocation" type="number" InputProps={{ inputProps: { min: 0, max: 100, step: 0.01} }} 
                                        label="Edit Allocation" fullWidth onChange={(e) => {handleChange(account, e)}} InputLabelProps={{ shrink: true }}/>
                                    </div>
                                    <div className={classes.buttonMarginTop}>
                                        <Button className={classes.marginTop} variant="contained" color="primary" size="small" type="submit" fullWidth>Edit Allocation</Button>
                                    </div>
                                </form>
                        
                            </Grid>
                        )})}
                    </Grid>
                )})}
        </Grid>
    
    );

}

export default AllocationPercentBoxes;