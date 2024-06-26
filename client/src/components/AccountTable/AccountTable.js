import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead ,TableRow, Button, Typography, useMediaQuery } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';
import { deleteAccount } from '../../actions/accounts';
import { cleanDate } from '../../functions/CleanDate';
import { formatter } from '../../functions/Formatter';
import { sortBy } from '../../functions/SortBy';

const AccountTable = ({ setCurrentId, date }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const accountNames = useSelector((state) => state.accountNames)
    const accounts = useSelector((state) => state.accounts);
    let accts = [];
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const accountNameFindName = (account) => {
        if (account.name && account) {
            const accountName = accountNames.find(accountName => accountName._id === account.name)
            if (accountName) {
                return accountName.name;
            }
        }
        return ""
    }

    accounts.forEach((account, index) => {
        var accountNameMatches = accts.filter(acct => acct.name === account.name);
        if (accountNameMatches.length > 0) {
            accts.forEach((acct, indexInner) => {
                if (acct.name === account.name) {
                    if (account.date > acct.date)
                        accts[indexInner] = account;
                }
            })
        } else 
            accts.push(account);
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
                    {isMobile ? 
                    (
                        <>
                            <TableCell>Name</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell style={{textAlign: 'center'}}>Debt or Asset</TableCell>
                        </>
                    ) : (
                        <>
                            <TableCell>Name</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell>Debt or Asset</TableCell>
                            <TableCell>Last Updated</TableCell>
                        </>
                    )}
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
                            {isMobile ? 
                            (
                                <>
                                    <TableCell>{accountNameFindName(account)}</TableCell>
                                    <TableCell>{formatter.format(account.balance)}</TableCell>
                                    <TableCell style={{textAlign: 'center'}}>{cleanDebtOrAsset(account.debtOrAsset)}</TableCell>
                                </>
                            ) : (
                                <>
                                    <TableCell >{accountNameFindName(account)}</TableCell>
                                    <TableCell >{formatter.format(account.balance)}</TableCell>
                                    <TableCell>{cleanDebtOrAsset(account.debtOrAsset)}</TableCell>
                                    <TableCell>{cleanDate(account.date)}</TableCell>  
                                </>
                            )}
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