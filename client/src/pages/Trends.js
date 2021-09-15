import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid  } from '@material-ui/core';
import { getAccounts } from '../actions/accounts';
import { getAccountNames } from '../actions/accountNames';
import TrendsTable from '../components/TrendsTable/TrendsTable';
import NetWorthLineGraph from '../components/NetWorthLineGraph/NetWorthLineGraph';

function Trends() {
    const dispatch = useDispatch();
    const accounts = useSelector((state) => state.accounts);
    const accountNames = useSelector((state) => state.accountNames)

    useEffect(() => {
        dispatch(getAccounts())
        dispatch(getAccountNames())
    }, [dispatch]);

    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(user);

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
            <TrendsTable />
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={1}>
                <Grid item xs={12} md={4}></Grid>
                <Grid item xs={12} md={4} align="center">
                    <NetWorthLineGraph accounts={accounts} accountNames={accountNames}/>
                </Grid>
                <Grid item xs={12} md={4}></Grid>
            </Grid>
        </Container>
    );
}

export default Trends;