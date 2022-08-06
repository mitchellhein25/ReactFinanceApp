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
import { getNetWorthObjects } from '../../functions/NetWorthObjects';
import { getCashFlowObjects } from '../../functions/CashFlowObjects';

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
        setRowsPerPage(+event.target.value);
    };

    var netWorthObjectsDescending = getNetWorthObjects(accounts, accountNames, true);
    var cashFlowObjectsDescending = getCashFlowObjects(expenses, incomes, true);

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