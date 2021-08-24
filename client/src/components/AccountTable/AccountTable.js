import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead ,TableRow, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAccount } from '../../actions/accounts';
import { cleanDate } from '../../functions/CleanDate';
import { formatter } from '../../functions/Formatter';
import { sortBy } from '../../functions/SortBy';

const AccountTable = ({ setCurrentId, date }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const accountNames = useSelector((state) => state.accountNames)
    const accounts = useSelector((state) => state.accounts);
    let acctNames = [];
    let accts = [];

    const accountNameFindName = (account) => {
        if (account.name && account) {
            const accountName = accountNames.find(accountName => accountName._id === account.name)
            if (accountName) {
                return accountName.name;
            }
        }
        return ""
    }

    //Get most recent accounts for current month, 
    accounts.forEach((account, index) => {
        if (moment(account.date).month() == moment(date).month()) {
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
        }
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
      
    accts.sort(sortBy("balance"));  

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