import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead ,TableRow, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../../actions/accounts';

const AccountTable = ({ setCurrentId, date }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const user = JSON.parse(localStorage.getItem('profile'));

    const accountNames = useSelector((state) => state.accountNames)

    const accounts = useSelector((state) => state.accounts);

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

    const cleanDate = (date) => {
        if (date) {
            return date.substring(0, 10);
        } else {
            return "";
        }
    }

    // Currency formatter.
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const cleanDebtOrAsset = (debtOrAsset) => {
        if (debtOrAsset === false) {
            return "Debt";
        } else if (debtOrAsset === true) {
            return "Asset";
        } else {
            return "";
        }
    }
    // console.log(accts)

    ////sort accts by allocation, descending
    // function sortByAllocation(a, b) {
    //     // Use toUpperCase() to ignore character casing
    //     const alloA = a.allocation;
    //     const alloB = b.allocation;
      
    //     let comparison = 0;
    //     if (alloA > alloB) {
    //       comparison = 1;
    //     } else if (alloA < alloB) {
    //       comparison = -1;
    //     }
    //     return comparison * -1;
    //   }

   //  sort accts by balance, descending
     function sortByBalance(a, b) {
        // Use toUpperCase() to ignore character casing
        const alloA = a.balance;
        const alloB = b.balance;
      
        let comparison = 0;
        if (alloA > alloB) {
          comparison = 1;
        } else if (alloA < alloB) {
          comparison = -1;
        }
        return comparison * -1;
      }
      
    // const sortAccounts = (value) => {
    //     if (value == "balance") {
    //         console.log("sortedbyBalacnce");
    //         accts.sort(sortByBalance);
    //     } else if (value == "allocation") {
    //         accts.sort(sortByAllocation);
    //     }
        // accounts = accts;
    // }
    accts.sort(sortByBalance);  
    return (
        <TableContainer>
            <Typography className={classes.tableHeader} variant="h4" component="div">
                Accounts 
            </Typography>
            <Table padding='none' aria-label="simple table">
                <TableHead className={classes.head}>
                <TableRow className={classes.tableRow}>
                    <div hidden>
                        <TableCell>Id</TableCell>
                    </div>
                    <TableCell>Name</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Debt or Asset</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell>Allocation</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {accts.map((account) => (

                        <TableRow className={classes.tableRow} key={account._id}>
                            <div hidden>
                                <TableCell>{account._id}</TableCell>
                            </div>
                            <TableCell >{accountNameFindName(account)}</TableCell>
                            <TableCell >{formatter.format(account.balance)}</TableCell>
                            <TableCell>{cleanDebtOrAsset(account.debtOrAsset)}</TableCell>
                            <TableCell>{cleanDate(account.date)}</TableCell>
                            <TableCell>{account.allocation}%</TableCell>
                            <TableCell >
                                <Button size="small" color="primary" onClick={() => dispatch(deleteAccount(account._id))}>
                                    <DeleteIcon fontSize="small" />
                                    Delete
                                </Button>
                            </TableCell>
                            <TableCell >
                                <Button size="small" color="primary" onClick={() => setCurrentId(account._id)}>
                                    <EditIcon fontSize="small" />
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AccountTable;