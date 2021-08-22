import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead ,TableRow, TablePagination, Button, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';
import moment from 'moment';
import { deleteIncome } from '../../actions/incomes';
import { formatter } from '../../functions/Formatter';
import { cleanDate } from '../../functions/CleanDate';
import { sortByDate } from '../../functions/SortByDate';

const columns = [
    { id: 'category', label: 'Category', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 170 },
    { id: 'amount', label: 'Amount', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 100, },
  ];

const IncomeTable = ({ setCurrentId, date }) => {
    const incomeCats = useSelector((state) => state.incomeCats)
    const incomes = useSelector((state) => state.incomes)
    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const momentDate = moment(date);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        console.log("change rows per");
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const incomeCatFindName = (income) => {
        if (income.category && income) {
            const incomeCat = incomeCats.find(incomeCat => incomeCat._id === income.category)
            if (incomeCat) {
                return incomeCat.name;
            }
        }
        return ""
    }

    incomes.sort(sortByDate); 

    return (
      <>
        <TableContainer>
            <Typography className={classes.tableHeader} variant="h4" component="div">
                Incomes
            </Typography>
        <Table padding='none' aria-label="simple table">
          <TableHead className={classes.head}>
            <TableRow>
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
              {incomes.filter(income => moment(income.date).month() === momentDate.month()).map((income) => (
                  <TableRow key={income._id}>
                    <div hidden>
                      <TableCell className={classes.tableColumn} component="th" scope="row" hidden>{income._id}</TableCell>
                    </div>
                      <TableCell className={classes.tableColumn} >{incomeCatFindName(income)}</TableCell>
                      <TableCell className={classes.tableColumn} >{income.description}</TableCell>
                      <TableCell className={classes.tableColumn} >{formatter.format(income.amount)}</TableCell>
                      <TableCell  className={classes.tableColumn} component="th" scope="row">{cleanDate(income.date)}</TableCell>
                      <TableCell className={classes.tableColumn} >
                          <Button size="small" color="primary" onClick={() => dispatch(deleteIncome(income._id))}>
                              <DeleteIcon fontSize="small" />
                              Delete
                          </Button>
                      </TableCell>
                      <TableCell className={classes.tableColumn} >
                          <Button size="small" color="primary" onClick={() => setCurrentId(income._id)}>
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
        rowsPerPageOptions={[10]}
        component="div"
        count={incomes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
    );
}

export default IncomeTable;