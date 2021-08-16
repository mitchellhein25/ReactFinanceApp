import React, { useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

import { getAccounts } from '../../actions/accounts';
import { getAccountNames } from '../../actions/accountNames';

const AllocationPercentage = () => {
    const [ totalAllocations, setTotalAllocations ] = useState(null);
    const accounts = useSelector((state) => state.accounts);
    const accountNames = useSelector((state) => state.accountNames);

    const classes = useStyles();
    const dispatch = useDispatch();

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

    async function onLoad() {
        var totalAlloc = 0;
        await accounts.forEach((account, index) => {
            if (acctNames.includes(accountNameFindName(account))) {
                accts.forEach((acct, indexInner) => {
                    if (accountNameFindName(acct) === accountNameFindName(account)) {
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

    useEffect(() => {
        dispatch(getAccounts())
        dispatch(getAccountNames())
    }, [dispatch]);

    return (
        <Grid>
            <div>
                <Typography align="center" variant="h2">
                Total Allocation Percentage:<br /> <b>{ totalAllocations }%</b>
                </Typography>
            </div>
            <Typography className={classes.red} align="center" variant="h5">
                {totalAllocations > 100 ? "Your allocations exceed 100% of your cash flow!" : ""}
            </Typography>
        </Grid>
)};

export default AllocationPercentage;