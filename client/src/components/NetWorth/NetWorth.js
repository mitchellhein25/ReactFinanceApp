import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Tooltip } from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import useStyles from './styles';

import { getAccounts } from '../../actions/accounts';

const NetWorth = () => {
    const accounts = useSelector((state) => state.accounts);
    let acctNames = [];
    let accts = [];
    const dispatch = useDispatch();
    const classes = useStyles();
    const netWorthToolTip = (
         <React.Fragment><Typography className={classes.tooltip} >Your net worth is calculated by taking the most recent value from each of your accounts.
         <br></br><br></br>
         <b>Net Worth = Assets - Debts</b></Typography></React.Fragment>
    )

    const getCurrentAccounts = () => {
        accounts.forEach((account, index) => {
            if (acctNames.includes(account.name)) {
                accts.forEach((acct, indexInner) => {
                    if (acct.name === account.name) {
                        if (account.date > acct.date) {
                            accts[indexInner] = account;
                            acctNames[indexInner] = account.name;
                        } 
                    }
                })
            } else {
                accts.push(account);
                acctNames.push(account.name);
            }
        }); 
        return accts;
    }

    //Calculate Net Worth 
    const calculatedNetWorth = () => {
        var accts = getCurrentAccounts();
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

    return (

        <Typography align="center" variant="h2">
            <Tooltip title={netWorthToolTip}>
                <InfoOutlinedIcon style={{fontSize:"30px"}} />
            </Tooltip>
            Net Worth: <span className={classes.yellow}>{formatter.format(calculatedNetWorth())}</span>
        </Typography>
    
    );

}

export default NetWorth;