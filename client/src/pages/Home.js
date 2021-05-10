import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid, TextField, Paper } from '@material-ui/core';
import DatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { useDispatch } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';

import ExpenseForm from '../components/ExpenseForm/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable/ExpenseTable';
import IncomeForm from '../components/IncomeForm/IncomeForm';
import IncomeTable from '../components/IncomeTable/IncomeTable';
import BudgetForm from '../components/BudgetForm/BudgetForm';
import BudgetTable from '../components/BudgetTable/BudgetTable';
import IncomeCatForm from '../components/IncomeCatForm/IncomeCatForm';

import useStyles from '../styles';

import { getExpenses } from '../actions/expenses';
import { getIncomes } from '../actions/incomes';
import { getBudgets } from '../actions/budgets';
import { getIncomeCats } from '../actions/incomeCats';

function Home() {

    const [currentExpenseId, setCurrentExpenseId] = useState(null);
    const [currentIncomeId, setCurrentIncomeId] = useState(null);
    const [currentBudgetId, setCurrentBudgetId] = useState(null);
    const [currentIncomeCatId, setCurrentIncomeCatId] = useState(null);
    const [date, setDate] = useState(new Date());
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExpenses())
    }, [currentExpenseId, dispatch]);

    // useEffect(() => {
    //     dispatch(getGroupedExpenses())
    // }, [currentGroupedExpenseId, dispatch]);

    useEffect(() => {
        dispatch(getIncomes())
    }, [currentIncomeId, dispatch]);

    useEffect(() => {
        dispatch(getBudgets())
    }, [currentBudgetId, dispatch]);

    useEffect(() => {
        dispatch(getIncomeCats())
    }, [currentIncomeCatId, dispatch]);

    return (
        <Container maxWidth="none">
            {/* <Grow in> */}
                {/* <Container disableGutters='true'> */}
                    <Grid className={classes.appBar} container justify="space-between" alignItems="stretch" spacing={1}>
                        <Grid lg={5}> 
                            <Typography marginTop="20px" variant="h6">
                                <Link to="/#budgets">
                                    Go to Budgets
                                </Link>
                            </Typography> </Grid>
                        <Grid marginBottom="20px" item xs={12} lg={2}>
                            {/* <Typography textAlign="center" variant="h3">
                                Finance App
                            </Typography> */}
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                label="Year and Month"
                                minDate={new Date('2000-01-01')}
                                maxDate={new Date('2050-12-12')}
                                value={date}
                                onChange={(newDate) => {
                                    setDate(newDate);
                                    console.log(date);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    margin="normal"
                                    helperText={null}
                                    variant="standard"
                                    />
                                )}
                            />
                            </LocalizationProvider>
                        </Grid>
                        <Grid lg={5}></Grid>
                        <Grid item xs={12} sm={7}>
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <ExpenseTable setCurrentId={setCurrentExpenseId} date={date}/>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <ExpenseForm currentId={currentExpenseId} setCurrentId={setCurrentExpenseId} budgetID={currentBudgetId}/>
                        </Grid>
                        <Grid id="budgets" item xs={12} sm={2}>
                            <BudgetForm currentId={currentBudgetId} setCurrentId={setCurrentBudgetId} />
                        </Grid>
                        <Grid item xs={12} sm={7}>
                            <IncomeTable setCurrentId={setCurrentIncomeId} date={date}/>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <IncomeForm currentId={currentIncomeId} setCurrentId={setCurrentIncomeId} />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <IncomeCatForm currentId={currentIncomeCatId} setCurrentId={setCurrentIncomeCatId} />
                        </Grid>
                        <Grid lg={1}></Grid>
                        <Grid item xs={12} lg={10}>
                            <BudgetTable setCurrentId={setCurrentBudgetId} date={date}/>
                        </Grid>
                        <Grid lg={1}></Grid>
                        {/* <Grid item xs={12} sm={5}>
                             <IncomeCatTable setCurrentId={setCurrentIncomeCatId}/> 
                        </Grid> */}
                    </Grid>
                {/* </Container> */}
            {/* </Grow> */}
        </Container>
    )
}

export default Home;