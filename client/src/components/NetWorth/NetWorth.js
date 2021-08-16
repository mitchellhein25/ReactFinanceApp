import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';

import { getAccounts } from '../../actions/accounts';
import { getAccountNames } from '../../actions/accountNames';

import useStyles from './styles';


const NetWorth = ({ date }) => {
    const accounts = useSelector((state) => state.accounts);
    const accountNames = useSelector((state) => state.accountNames)
    const dispatch = useDispatch();

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

    accounts.forEach((account, index) => {
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

    //Calculate Net Worth 
    const totalAssets = () => {
        var assets = 0;
        var debts = 0;
        var netWorth = 0;

        //Iterate through accounts if it is an asset add if debts delete
        accts.forEach((acct, index) => {
            if (acct.debtOrAsset === true) {
                assets += acct.balance;
            } else {
                debts += acct.balance;
            }
        })
        netWorth = assets - debts;
        return netWorth;
    }


    // Currency formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        dispatch(getAccounts())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAccountNames())
    }, [dispatch]);

    return (

        <Typography align="center" variant="h2">
            Net Worth: <span className={classes.yellow}>{formatter.format(totalAssets())}</span>
        </Typography>
    
    );

}

export default NetWorth;