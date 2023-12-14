import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead ,TableRow, TablePagination, Grid  } from '@material-ui/core';
import useStyles from './styles';
import { getExpenses } from '../../actions/expenses';
import { getBudgets } from '../../actions/budgets';
import { formatter } from '../../functions/Formatter';
import { getBudgetMonthDataObjects } from '../../functions/BudgetMonthDataObjects';

const BudgetTrendTable = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expenses);
    const budgets = useSelector((state) => state.budgets)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
    };

    var monthDataObjectsDescending = getBudgetMonthDataObjects(expenses, props.budget, budgets, true);
    
    const getYearlyAverage = (monthList, valueString) => {
        const currentYear = (monthList).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        let yearlySum = 0;
        for (let x = 0; x < currentYear.length; x++)
        {
            yearlySum += currentYear[x].totalExpenses;
        }
        return formatter.format(yearlySum / currentYear.length);
    };

    useEffect(() => {
        dispatch(getExpenses())
        dispatch(getBudgets());
    }, [dispatch]);

  return ( 
        <>
            <TableContainer>
                <Typography className={classes.tableHeader} align="center" variant="h4" component="div">
                    {props.budget} Spending Over Time
                </Typography>
                <Table padding='none' aria-label="simple table">
                    <TableHead className={classes.head}>
                        <TableRow>
                            <TableCell align="center" >Month</TableCell>
                            <TableCell align="center" >Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(monthDataObjectsDescending).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element) => (
                            <TableRow>
                                <TableCell align="center">{element.month}</TableCell>
                                <TableCell align="center">{formatter.format(element.totalExpenses)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell className={classes.foot} align="center" >12 Month Average</TableCell>
                            <TableCell className={classes.foot} align="center" >
                                {getYearlyAverage(monthDataObjectsDescending)}
                            </TableCell>
                        </TableRow> 
                    : <></> 
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

export default BudgetTrendTable;