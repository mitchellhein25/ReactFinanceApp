import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Grid, Button, TextField, useMediaQuery } from '@material-ui/core';
import { getAccountNames } from '../../actions/accountNames';
import { getExpenses } from '../../actions/expenses';
import { getIncomes } from '../../actions/incomes';
import { updateAccountName } from '../../actions/accountNames';
import useStyles from './styles';
import { formatter } from '../../functions/Formatter';
import { totalExpenses } from '../../functions/TotalExpenses';
import { totalIncome } from '../../functions/TotalIncome';
import { sortBy } from '../../functions/SortBy';

const AllocationPercentBoxes = ({ date }) => {
    const expenses = useSelector((state) => state.expenses);
    const incomes = useSelector((state) => state.incomes);
    const accountNames = useSelector((state) => state.accountNames);
    const [accountData, setAccountData] = useState({ name: "", allocation: "" });
    const [ id, setId ] = useState(null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    // eslint-disable-next-line no-extend-native
    Date.prototype.toDateFormat = (function(format) {
        format = format || "mm/yyyy";
        return format.toLowerCase()
    });
    
    var totalExpensesThisMonth = totalExpenses(expenses, date);
    var totalIncomesThisMonth = totalIncome(incomes, date);
    var totalCashFlowThisMonth = totalIncomesThisMonth - totalExpensesThisMonth;
      
    accountNames.sort(sortBy("allocation")); 
    
    var splitAccts = [];
    async function splitAcctsUp() {
        //Split into groups of 6
        var splitIndex = -1;
        await accountNames.forEach((account, index) => {
            if (index % 6 === 0) {
                splitIndex++;
                splitAccts.push([]);
            }
            splitAccts[splitIndex].push(account);
        });
    }
    splitAcctsUp();

    const handleChange = (account, e) => {
        setId(account._id);
        setAccountData({user: account.user,  name: account.name, allocation: parseFloat(e.target.value)});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id == null) {
            alert("Allocation must have a value.");
        } else {
            dispatch(updateAccountName(id, accountData));
            clear(id);
        }
    }

    const clear = (id) => {
        setAccountData({ name: "", allocation: "" });
        var allo = document.getElementById("allocation" + id);
        allo.value = 0;
        setId(null);
    }

    useEffect(() => {
        dispatch(getAccountNames())
        dispatch(getExpenses())
        dispatch(getIncomes())
    }, [dispatch]);

    return (
        <Grid xs={12}>
            
                {splitAccts.map((acct) => {
                    return (
                        <Grid container fullWidth>
                    
                        {acct.map((account) => {
                            return (
                                <Grid className={classes.paddingTop, classes.marginAuto} xs={12} md={(6/acct.length)%6 !== 0 ? 6/acct.length%6 + 1 : 2} item>
                                <div className={classes.accountBox} >
                                    <Typography margin="auto" className={classes.accountTitle} textAlign="center" variant="h6">
                                        { account.name }
                                    </Typography>
                                </div>
                                <form style={isMobile ? {margin:'0'} : {}} className={classes.marginTop} onSubmit={handleSubmit}>
                                    <Typography className={classes.red} align="center" id={account.id} variant="h5">
                                        {formatter.format(account.allocation/100 * totalCashFlowThisMonth)}
                                    </Typography>
                                    <Typography variant="h6" className={classes.allo}>{account.allocation}%</Typography>
                                    <div className={classes.buttonMarginTop}>
                                        <TextField variant="outlined" style={{ fontSize: '24px' }} id={"allocation" + account._id} size="small" name="allocation" 
                                        type="number" InputProps={{ inputProps: { min: 0, max: 100, step: 0.01} }} 
                                        label="Edit Allocation" fullWidth onChange={(e) => {handleChange(account, e)}} InputLabelProps={{ shrink: true }}/>
                                    </div>
                                    <div className={classes.buttonMarginTop}>
                                        <Button variant="contained" color="primary" size="small" type="submit" fullWidth>Edit Allocation</Button>
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