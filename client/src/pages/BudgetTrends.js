import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid, MenuItem, Select } from '@material-ui/core';
import { getBudgets } from '../actions/budgets';
import BudgetTrendTable from '../components/BudgetTrendTable/BudgetTrendTable';
import BudgetTrendLineGraph from '../components/BudgetTrendLineGraph/BudgetTrendLineGraph';
import useStyles from '../styles';

function BudgetTrends() {
    const budgets = useSelector((state) => state.budgets)
    const dispatch = useDispatch();
    const classes = useStyles();
    const [budget, setBudget] = useState('');

    let budgetsToRender;
    if (budgets.length > 0) {
        budgetsToRender = budgets.map(budget => {
            return <MenuItem value={budget.name}>{budget.name}</MenuItem>
        });
    } else {
        budgetsToRender = <MenuItem value="">Add Categories using the Budget form.</MenuItem>
    }

    useEffect(() => {
        dispatch(getBudgets());
    }, [dispatch]);

    const handleInputValue = (e) => {
        setBudget(e.target.value);
    }

    const user = JSON.parse(localStorage.getItem('profile'));

    if(!user?.result?._id && !user?.result?.googleId) {
        return (
            <Container>
                <Typography variant="h6" align="center">
                    Sign in to view your budget trends.
                </Typography>
            </Container>
        )
    }  

    return (
        <Container maxWidth="none">
            <Grid container>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4} align="center">
                <Select 
                    key={2}
                    className={classes.inputMargin} 
                    MenuProps={{disableScrollLock: true}}
                    size="small" 
                    name="budget" 
                    variant="outlined" 
                    fullWidth 
                    value={budget} 
                    onChange={handleInputValue}
                    onBlur={handleInputValue} 
                >
                {budgetsToRender}
                </Select>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
            </Grid>
            <BudgetTrendTable budget={budget} />
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={1}>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4} align="center">
                    <BudgetTrendLineGraph budget={budget} />
                </Grid>
                <Grid item xs={12} md={4}></Grid>
            </Grid>
        </Container>
    );
}

export default BudgetTrends;