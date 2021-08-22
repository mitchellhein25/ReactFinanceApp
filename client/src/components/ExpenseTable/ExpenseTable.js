import React, { useState } from 'react';
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../../actions/expenses';
import { formatter } from '../../functions/Formatter';
import { cleanDate } from '../../functions/CleanDate';

export default function ExpenseTable({ setCurrentId, date }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const expenses = useSelector((state) => state.expenses);
  const budgets = useSelector((state) => state.budgets);
  const momentDate = moment(date);

  const columns = [
    { id: 'category', label: 'Category', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 190 },
    { id: 'amount', label: 'Amount', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 100, },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

const budgetFindName = (expense) => {
    if (expense.category && expense) {
        const budget = budgets.find(budget => budget._id === expense.category)
        if (budget) {
            return budget.name;
        }
    }
    return ""
}

  return (
    <>
      <Typography className={classes.tableHeader} variant="h4" component="div">
          Expenses
      </Typography>
      <TableContainer className={classes.container}>
        <Table className={classes.table} padding='none' aria-label="sticky table">
          <TableHead>
            <TableRow className={classes.head}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.filter(expense => moment(expense.date).month() === momentDate.month()).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense) => (
                
                <TableRow className={classes.tableRow} key={expense._id}>
                    <div hidden>
                      <TableCell component="th" scope="row">{expense._id}</TableCell>
                    </div>
                    <TableCell >{budgetFindName(expense)}</TableCell>
                    <TableCell >{expense.description}</TableCell>
                    <TableCell >{formatter.format(expense.amount)}</TableCell>
                    <TableCell component="th" scope="row">{cleanDate(expense.date)}</TableCell>
                    <TableCell >
                        <Button size="small" color="primary" onClick={() => dispatch(deleteExpense(expense._id))}>
                            <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                    </TableCell>
                    <TableCell >
                        <Button size="small" color="primary" onClick={() => setCurrentId(expense._id)}>
                            <EditIcon fontSize="small" />
                            Edit
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[30]}
        component="div"
        count={expenses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}