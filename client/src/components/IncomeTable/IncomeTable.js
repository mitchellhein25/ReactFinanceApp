import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead ,TableRow, Paper, Button, Hidden, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import useStyles from './styles';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteIncome } from '../../actions/incomes';

const IncomeTable = ({ setCurrentId, date }) => {
    const incomeCats = useSelector((state) => state.incomeCats)
    const incomes = useSelector((state) => state.incomes)
    const classes = useStyles();
    const dispatch = useDispatch();

    const cleanDate = (date) => {
        if (date) {
            return date.substring(0, 10)
        } else {
            return "";
        }
    }

    const momentDate = moment(date);

    const incomeCatFindName = (income) => {
        if (income.category && income) {
            const incomeCat = incomeCats.find(incomeCat => incomeCat._id === income.category)
            if (incomeCat) {
                return incomeCat.name;
            }
        }
        return ""
    }

    return (
        <TableContainer>
            <Typography className={classes.tableHeader} variant="h4" component="div">
                Incomes
            </Typography>
      <Table padding='none' aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow>
            <Hidden only={['xs', 'sm', 'md', 'lg', 'xl']}>
                <TableCell className={classes.tableColumn} >Id</TableCell>
            </Hidden>
            <TableCell className={classes.tableColumn} >Category</TableCell>
            <TableCell className={classes.tableColumn} >Amount</TableCell>
            <TableCell className={classes.tableColumn} >Date</TableCell>
            <TableCell className={classes.tableColumn} ></TableCell>
            <TableCell className={classes.tableColumn} ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {incomes.filter(income => moment(income.date).month() === momentDate.month()).map((income) => (
                <TableRow key={income._id}>
                    <Hidden only={['xs', 'sm', 'md', 'lg', 'xl']}>
                        <TableCell className={classes.tableColumn} component="th" scope="row" hidden>{income._id}</TableCell>
                    </Hidden>
                    <TableCell className={classes.tableColumn} >{incomeCatFindName(income)}</TableCell>
                    <TableCell className={classes.tableColumn} >{income.amount}</TableCell>
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
    );
}

export default IncomeTable;