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
import { getMonthDataObjects } from '../../functions/MonthDataObjects';

const TrendsTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);
    const expenses = useSelector((state) => state.expenses);
    const incomes = useSelector((state) => state.incomes);
    const accountNames = useSelector((state) => state.accountNames)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const isCashFlow = props.type == "cash_flow";

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
    };

    var monthDataObjectsDescending = getMonthDataObjects(accounts, expenses, incomes, accountNames, true);

    const getValueSumStringForYear = (monthList, valueString) => 
        formatter.format((monthList)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .reduce((accumulator, month) => accumulator + month[valueString], 0));
    
    const getDiffBetweenFirstAndLastMonth = (monthList, valueString) => {
        const currentYear = (monthList).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        return formatter.format(
            currentYear[0][valueString] - currentYear[currentYear.length - 1][valueString]);
    };

    useEffect(() => {
        dispatch(getExpenses())
        dispatch(getIncomes())
        dispatch(getAccounts())
        dispatch(getAccountNames())
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
                        {(monthDataObjectsDescending).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element) => (
                            <TableRow>
                                <TableCell align="center">{element.month}</TableCell>
                                <TableCell align="center">{formatter.format(isCashFlow ? element.cashFlow : element.netWorth)}</TableCell>
                                <TableCell align="center">{formatter.format(isCashFlow ? element.totalIncome : element.assets)}</TableCell>
                                <TableCell align="center">{formatter.format(isCashFlow ? element.totalExpenses : element.debts)}</TableCell>
                            </TableRow>
                        ))}
                        {/* { isCashFlow ?  */}
                            <TableRow>
                                <TableCell className={classes.foot} align="center" >12 Month Totals</TableCell>
                                <TableCell className={classes.foot} align="center" >
                                    {isCashFlow 
                                        ? getValueSumStringForYear(monthDataObjectsDescending, 'cashFlow') 
                                        : getDiffBetweenFirstAndLastMonth(monthDataObjectsDescending, 'netWorth')}
                                </TableCell>
                                <TableCell className={classes.foot} align="center" >
                                    {isCashFlow 
                                        ? getValueSumStringForYear(monthDataObjectsDescending, 'totalIncome')
                                        : getDiffBetweenFirstAndLastMonth(monthDataObjectsDescending, 'assets')}
                                </TableCell>
                                <TableCell className={classes.foot} align="center" >
                                    {isCashFlow 
                                        ? getValueSumStringForYear(monthDataObjectsDescending, 'totalExpenses')
                                        : getDiffBetweenFirstAndLastMonth(monthDataObjectsDescending, 'debts')}
                                </TableCell>
                            </TableRow> 
                        : <></> 
                        {/* } */}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[rowsPerPage]}
                component="div"
                count={monthDataObjectsDescending.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
  );
}

export default TrendsTable;