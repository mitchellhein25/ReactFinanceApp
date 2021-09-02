import React, { useState } from 'react';
import { Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
import useStyles from '../styles';
import DatePicker from '../components/DatePicker/DatePicker'
import CashFlow from '../components/CashFlow/CashFlow'
import AllocationPercentage from '../components/AllocationPercentage/AllocationPercentage';
import AllocationPercentBoxes from '../components/AllocationPercentBoxes/AllocationPercentBoxes'
import InfoModal from '../components/InfoModal/InfoModal';

function Allocation() {
    const [date, setDate] = useState(new Date());
    const classes = useStyles();
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const allocationModalHeader = "How to Handle Allocations";
    const allocationInfoButtonText = "How to Handle Allocations";
    const allocationModalText = ( 
        <p id="simple-modal-description">
            <span style={{fontSize:"20px"}}>- <b>Cash Flow</b> is the amount of income left over after all expenses for the month.</span><br></br><br></br>
            <span style={{fontSize:"20px"}}>- The <b>Allocation</b> for each Account Name is the <b>percentage of the cash flow</b> you will put into that account at the end of the month.</span><br></br><br></br>
            <span style={{fontSize:"20px"}}>- When transferring money into each account, you can use the <b>checkboxes</b> to keep track.</span>
        </p>
        )

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
                    <Grid className={classes.infoModalButton} sm={12} md={2}>
                        <InfoModal 
                            modalHeader={allocationModalHeader} 
                            infoButtonText={allocationInfoButtonText}
                            modalText={allocationModalText}
                        />
                    </Grid>
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