import React, { useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import DatePicker from '../components/DatePicker/DatePicker'
import CashFlow from '../components/CashFlow/CashFlow'
import AllocationPercentBoxes from '../components/AllocationPercentBoxes/AllocationPercentBoxes'

import useStyles from '../styles';
import AllocationPercentage from '../components/AllocationPercentage/AllocationPercentage';

function Allocation() {
    const [currentAccountId, setCurrentAccountId] = useState();
    const [date, setDate] = useState(new Date());
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <Container maxWidth="none">
            <Grid className={classes.appBar} container justify="space-between" alignItems="stretch" spacing={1}>
                    <Grid sm={4}></Grid>
                    <Grid sm={4}>
                        <DatePicker date={date} setDate={setDate}/>
                    </Grid>
                    <Grid sm={4}></Grid>
                    <Grid sm={12} md={5}>
                        <CashFlow date={date} setDate={setDate}/>
                    </Grid>
                    <Grid sm={12} md={2}></Grid>
                    <Grid sm={12} md={5}>
                        <AllocationPercentage />
                    </Grid>
                    <Grid sm={4}></Grid>
                    <Grid sm={4}>
                        <Typography  textAlign="center" variant="h4">
                            Allocation Percentages
                        </Typography>
                    </Grid>
                    <Grid sm={4}></Grid>
                        <AllocationPercentBoxes setCurrentId={setCurrentAccountId} currentId={currentAccountId} date={date} setDate={setDate}/>
                    </Grid>
            
        </Container>
    );
}

export default Allocation;