import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead ,TableRow, TablePagination, Grid  } from '@material-ui/core';
import useStyles from './styles';
import moment from 'moment';
import { getAccounts } from '../../actions/accounts';
import { getAccountNames } from '../../actions/accountNames';
import { formatter } from '../../functions/Formatter';

const TrendsTable = ({}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);
    const accountNames = useSelector((state) => state.accountNames)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        console.log("change rows per");
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
    let uniqueMonthYearPairs = [];
    //key: [month, year], value: [list of accounts]
    let accountsEachMonth = new Map();

    //Find all unique months in the user's accounts list
    accounts.forEach((account, index) => {
        var alreadyPresent = false;
        var currMonth = moment(account.date).month() + 1
        var currYear = moment(account.date).year()
        uniqueMonthYearPairs.forEach((pair, index) => {
            if (pair[0] === currMonth && pair[1] === currYear) {
                alreadyPresent = true;
            }
        })
        if (!alreadyPresent) {
            uniqueMonthYearPairs.push([currMonth, currYear]);
        }
    })

    //Add each unique month,year pair to  map
    uniqueMonthYearPairs.forEach((pair, index) => {
        accountsEachMonth.set(`${pair[0]}, ${pair[1]}`, []);
    })

    uniqueMonthYearPairs.forEach((pair, index) => {
        acctNames = []
        accounts.forEach((account, index) => {
            if (`${moment(account.date).month() + 1}, ${moment(account.date).year()}` === `${pair[0]}, ${pair[1]}`){
                if (acctNames.includes(accountNameFindName(account))) {
                    accts.forEach((acct, indexInner) => {
                        if (accountNameFindName(acct) === accountNameFindName(account)) {
                            if (account.date > acct.date) {
                                var list = accountsEachMonth.get(`${pair[0]}, ${pair[1]}`);
                                list.push(account);
                                accountsEachMonth.set(`${pair[0]}, ${pair[1]}`, list);
                                accts[indexInner] = account;
                                acctNames[indexInner] = accountNameFindName(account);
                            } 
                        }
                    })
                } else {
                    var list = accountsEachMonth.get(`${pair[0]}, ${pair[1]}`);
                    list.push(account);
                    accountsEachMonth.set(`${pair[0]}, ${pair[1]}`, list);
                    accts.push(account);
                    acctNames.push(accountNameFindName(account));
                }
            }
        })
    }); 

    // Sort the Months from earliest to most recent
    var accountsEachMonthAscending = new Map([...accountsEachMonth.entries()].sort((a,b) => {
        var aDate = moment().set({month: a[0].match("(.*?),")[1], year: a[0].match(", (.*)")[1]});
        var bDate = moment().set({month: b[0].match("(.*?),")[1], year: b[0].match(", (.*)")[1]});
        return bDate < aDate ?  1 
            : bDate > aDate ? -1 
            : 0;
    }));

    //Calculate Net Worth 
    const calculatedNetWorth = (accts) => {
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
        return [netWorth, assets, debts];
    }

    var netWorthObjectsAscending = [];
    var netWorthObjectsDescending = [];
    Array.from(accountsEachMonthAscending).map(([key, value]) => (
        netWorthObjectsAscending.push({
            month: key,
            netWorth: calculatedNetWorth(value)[0],
            assets: calculatedNetWorth(value)[1],
            debts: calculatedNetWorth(value)[2]
        })
    ))
    Array.from(accountsEachMonth).map(([key, value]) => (
        netWorthObjectsDescending.push({
            month: key,
            netWorth: calculatedNetWorth(value)[0],
            assets: calculatedNetWorth(value)[1],
            debts: calculatedNetWorth(value)[2]
        })
    ))

    useEffect(() => {
        dispatch(getAccounts())
        dispatch(getAccountNames())
    }, [dispatch]);
  return ( 
        <>
            <TableContainer>
                <Typography className={classes.tableHeader} align="center" variant="h4" component="div">
                    Wealth Over Time 
                </Typography>
                <Table padding='none' aria-label="simple table">
                    <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell align="center" >Time</TableCell>
                        <TableCell align="center" >Net Worth</TableCell>
                        <TableCell align="center" >Assets</TableCell>
                        <TableCell align="center" >Debts</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(accountsEachMonth).map(([key, value]) => (
                            <TableRow>
                                <TableCell align="center">{key}</TableCell>
                                <TableCell align="center">{formatter.format(calculatedNetWorth(value)[0])}</TableCell>
                                <TableCell align="center">{formatter.format(calculatedNetWorth(value)[1])}</TableCell>
                                <TableCell align="center">{formatter.format(calculatedNetWorth(value)[2])}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[12]}
                component="div"
                count={Array.from(accountsEachMonth).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
  );
}

export default TrendsTable;