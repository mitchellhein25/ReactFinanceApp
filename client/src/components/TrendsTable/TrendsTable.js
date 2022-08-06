import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead ,TableRow, TablePagination, Grid  } from '@material-ui/core';
import useStyles from './styles';
import moment from 'moment';
import { getAccounts } from '../../actions/accounts';
import { getExpenses } from '../../actions/expenses';
import { getIncomes } from '../../actions/incomes';
import { getAccountNames } from '../../actions/accountNames';
import { formatter } from '../../functions/Formatter';

const TrendsTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);
    const expenses = useSelector((state) => state.expenses);
    const incomes = useSelector((state) => state.incomes);
    const accountNames = useSelector((state) => state.accountNames)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const isCashFlow = props.type == "cash_flow";

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        console.log("change rows per");
        setRowsPerPage(+event.target.value);
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
    let expensesEachMonth = new Map();
    let incomesEachMonth = new Map();

    //Find all unique months in the user's accounts list
    accounts.forEach((account, index) => {
        var alreadyPresent = false;
        var currMonth = moment(account.date).month() + 1
        var currYear = moment(account.date).year()
        if (account.date) {
            if (account.date.includes("-11-")) {
                currMonth = 9;
            }
        }
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
        expensesEachMonth.set(`${pair[0]}, ${pair[1]}`, 0);
        incomesEachMonth.set(`${pair[0]}, ${pair[1]}`, 0);
    })

    uniqueMonthYearPairs.forEach((pair, index) => {
        acctNames = []
        accounts.forEach((account, index) => {
            var accountDate = moment(account.date);
            accountDate.date(accountDate.date() + 1);
            accountDate.date(accountDate.month() + 1);
            if (`${accountDate.month()}, ${moment(account.date).year()}` === `${pair[0]}, ${pair[1]}`){
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
        });
        getMonthTotals(expenses, expensesEachMonth, pair);
        getMonthTotals(incomes, incomesEachMonth, pair);
    }); 

    function getMonthTotals(list, listEachMonth, pair) {
        list.forEach((listitem, index) => {
            var listDate = moment(listitem.date);
            listDate.date(listDate.date() + 1);
            listDate.date(listDate.month() + 1);
            if (`${listDate.month()}, ${moment(listitem.date).year()}` === `${pair[0]}, ${pair[1]}`){
                var curr = listEachMonth.get(`${pair[0]}, ${pair[1]}`);
                listEachMonth.set(`${pair[0]}, ${pair[1]}`, curr + listitem.amount);
            }
        });
    }

    accountsEachMonth.forEach((list, month) => {
        if (list.length === 0) {
            delete accountsEachMonth.delete(month);
        }
    });

    expensesEachMonth.forEach((value, month) => {
        if (value === 0) {
            delete expensesEachMonth.delete(month);
        }
    });
    
    // Sort the Months from earliest to most recent
    var accountsEachMonthAscending = sortAscending(accountsEachMonth);
    var accountsEachMonthDescending = sortDescending(accountsEachMonth);
    var expensesEachMonthAscending = sortAscending(expensesEachMonth);
    var expensesEachMonthDescending = sortDescending(expensesEachMonth);

    function sortAscending(listEachMonth) {
        return new Map([...listEachMonth.entries()].sort((a,b) => {
            var aDate = moment().set({month: a[0].match("(.*?),")[1], year: a[0].match(", (.*)")[1]});
            var bDate = moment().set({month: b[0].match("(.*?),")[1], year: b[0].match(", (.*)")[1]});
            return bDate < aDate ?  1 
                : bDate > aDate ? -1 
                : 0;
        }));
    }

    function sortDescending(listEachMonth) {
        return new Map([...listEachMonth.entries()].sort((a,b) => {
            var aDate = moment().set({month: a[0].match("(.*?),")[1], year: a[0].match(", (.*)")[1]});
            var bDate = moment().set({month: b[0].match("(.*?),")[1], year: b[0].match(", (.*)")[1]});
            return bDate > aDate ?  1 
                : bDate < aDate ? -1 
                : 0;
        }));
    }

    var netWorthObjectsAscending = [];
    var netWorthObjectsDescending = [];
    var cashFlowObjectsAscending = [];
    var cashFlowObjectsDescending = [];

    function getNetWorthArray(listEachMonth, finalArray, calculateFunction) {
        Array.from(listEachMonth).map(([key, value]) => (
            finalArray.push({
                month: key,
                netWorth: calculateFunction(value)[0],
                assets: calculateFunction(value)[1],
                debts: calculateFunction(value)[2]
            })
        ))
    }
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
    
    function getCashFlowArray(listEachMonth, finalArray) {
        Array.from(listEachMonth).map(([key, value]) => (
            finalArray.push({
                month: key,
                cashFlow: incomesEachMonth.get(key) - value,
                incomes: incomesEachMonth.get(key),
                expenses: value
            })
        ))
    }

    getNetWorthArray(accountsEachMonthAscending, netWorthObjectsAscending, calculatedNetWorth);
    getNetWorthArray(accountsEachMonthDescending, netWorthObjectsDescending, calculatedNetWorth);
    getCashFlowArray(expensesEachMonthAscending, cashFlowObjectsAscending);
    getCashFlowArray(expensesEachMonthDescending, cashFlowObjectsDescending);

    console.log(cashFlowObjectsDescending)
    useEffect(() => {
        if (isCashFlow) {
            dispatch(getExpenses())
            dispatch(getIncomes())
        }
        else {
            dispatch(getAccounts())
            dispatch(getAccountNames())
        }
    }, [dispatch]);

  return ( 
        <>
            <TableContainer>
                <Typography className={classes.tableHeader} align="center" variant="h4" component="div">
                    {isCashFlow ? "Cash Flow Over Time" : "Wealth Over Time"} 
                </Typography>
                <Table padding='none' aria-label="simple table">
                    <TableHead className={classes.head}>
                    <TableRow>
                        <TableCell align="center" >Month</TableCell>
                        <TableCell align="center" >{isCashFlow ? "Cash Flow" : "Net Worth"}</TableCell>
                        <TableCell align="center" >{isCashFlow ? "Incomes" : "Assets"}</TableCell>
                        <TableCell align="center" >{isCashFlow ? "Expenses" : "Debts"}</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {(isCashFlow ? cashFlowObjectsDescending : netWorthObjectsDescending).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element) => (
                            <TableRow>
                                <TableCell align="center">{element.month}</TableCell>
                                <TableCell align="center">{formatter.format(isCashFlow ? element.cashFlow : element.netWorth)}</TableCell>
                                <TableCell align="center">{formatter.format(isCashFlow ? element.incomes : element.assets)}</TableCell>
                                <TableCell align="center">{formatter.format(isCashFlow ? element.expenses : element.debts)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[12]}
                component="div"
                count={isCashFlow ? cashFlowObjectsDescending.length : netWorthObjectsDescending.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
  );
}

export default TrendsTable;