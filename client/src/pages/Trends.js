import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import { getAccounts } from '../actions/accounts';
import { getAccountNames } from '../actions/accountNames';
import TrendsTable from '../components/TrendsTable/TrendsTable';
import NetWorthLineGraph from '../components/NetWorthLineGraph/NetWorthLineGraph';
import useStyles from '../styles';

function Trends() {
    const dispatch = useDispatch();
    const [cashFlow, setcashFlow] = useState(true);
    const classes = useStyles();


    useEffect(() => {
        dispatch(getAccounts())
        dispatch(getAccountNames())
    }, [dispatch]);

    const user = JSON.parse(localStorage.getItem('profile'));

    if(!user?.result?._id && !user?.result?.googleId) {
        return (
            <Container>
                <Typography variant="h6" align="center">
                    Sign in to view your trends.
                </Typography>
            </Container>
        )
    }  

    return (
        <Container maxWidth="none">
            <Grid container>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4} align="center">
                    <Button className={classes.marginTopAndBottom} variant="contained" color="secondary" size="medium" onClick={() => setcashFlow(!cashFlow)}>Toggle Net Worth or Cash Flow</Button> 
                </Grid>
                <Grid item xs={12} md={4}></Grid>
            </Grid>
            <TrendsTable type={cashFlow ? "cash_flow" : "net_worth"} />
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={1}>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4} align="center">
                    <NetWorthLineGraph/>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
            </Grid>
        </Container>
    );
}

export default Trends;