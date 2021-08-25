import React, { useState } from 'react';
import { Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
import useStyles from '../styles';
import DatePicker from '../components/DatePicker/DatePicker'
import CashFlow from '../components/CashFlow/CashFlow'
import AllocationPercentage from '../components/AllocationPercentage/AllocationPercentage';
import AllocationPercentBoxes from '../components/AllocationPercentBoxes/AllocationPercentBoxes'

function Allocation() {
    const [date, setDate] = useState(new Date());
    const classes = useStyles();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

    const user = JSON.parse(localStorage.getItem('profile'));

    if(!user?.result?._id && !user?.result?.googleId) {
        return (
            <Container>
                <Typography variant="h6" align="center">
                    Sign in to view your Allocation.
                </Typography>
            </Container>
        )
    } 

    return (
        <Container maxWidth="none">
            <Grid className={classes.appBar} container justifyContent="space-between" alignItems="stretch" spacing={1}>
                    <Grid sm={4}></Grid>
                    <Grid sm={4}>
                        <DatePicker date={date} setDate={setDate}/>
                    </Grid>
                    <Grid sm={4}></Grid>
                    <Grid style={isMobile ? {borderBottom: 'solid black 2px', padding:'15px 0'} : {}} sm={12} md={5}>
                        <CashFlow date={date}/>
                    </Grid>
                    <Grid sm={12} md={2}></Grid>
                    <Grid style={isMobile ? {borderBottom: 'solid black 2px', padding:'15px 0'} : {}} sm={12} md={5}>
                        <AllocationPercentage />
                    </Grid>
                    <Grid sm={4}></Grid>
                    <Grid sm={4}>
                        <Typography style={isMobile ? {padding:'15px 0'} : {}} align="center" variant="h4">
                            Allocation Percentages
                        </Typography>
                    </Grid>
                    <Grid sm={4}></Grid>
                        <AllocationPercentBoxes date={date} />
                    </Grid>
            
        </Container>
    );
}

export default Allocation;